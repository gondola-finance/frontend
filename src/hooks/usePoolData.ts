import {
  GDL_POOL_NAME,
  GDL_TOKEN,
  MASTERCHEF_ADDRESS,
  POOLS_MAP,
  PoolName,
  TRANSACTION_TYPES,
} from "../constants"
import { One, Zero } from "@ethersproject/constants"
import { useEffect, useState } from "react"

import {
  useGondolaContract,
  useLPTokenContract,
  useMasterChefContract,
  useSwapContract,
} from "./useContract"
import { AddressZero } from "@ethersproject/constants"
import { AppState } from "../state"
import { BigNumber } from "@ethersproject/bignumber"
import { formatBNToPercentString } from "../utils"
import { parseUnits } from "@ethersproject/units"
import { useActiveWeb3React } from "."
import { useSelector } from "react-redux"
import { useStakedTokenBalance } from "../hooks/useStakedTokenBalance"

interface TokenShareType {
  percent: string
  symbol: string
  value: BigNumber
}

export interface PoolDataType {
  adminFee: BigNumber
  apy: string
  totalStakedLpAmountUSD: number
  totalStakedLpAmount: number
  name: string
  reserve: BigNumber
  swapFee: BigNumber
  tokens: TokenShareType[]
  totalLocked: BigNumber
  utilization: string // TODO: calculate
  virtualPrice: BigNumber
  volume: string // TODO: calculate
  keepApr: BigNumber
  lpTokenPriceUSD: BigNumber
}

export interface UserShareType {
  avgBalance: BigNumber
  avgBalanceIncludeStaked: BigNumber
  currentWithdrawFee: BigNumber
  lpTokenBalance: BigNumber
  name: string // TODO: does this need to be on user share?
  share: BigNumber
  shareIncludeStaked: BigNumber
  tokens: TokenShareType[]
  usdBalance: BigNumber
  usdBalanceIncludeStaked: BigNumber
  value: BigNumber
  valueIncludeStaked: BigNumber
  stakedLPTokenBalance: BigNumber
  stakedLPTokenUsdBalance: number
}

export type PoolDataHookReturnType = [PoolDataType | null, UserShareType | null]

/**
 * return pool Data
 * @param poolName pool name
 * @param countStakedLp whether stakedLP should be counted toward user lp. useful for displaying user share.
 * @returns {Array} [PoolDataType, UserShareType]
 */
export default function usePoolData(
  poolName: PoolName,
): PoolDataHookReturnType {
  const { account, library, chainId } = useActiveWeb3React()
  const swapContract = useSwapContract(poolName)
  const [poolData, setPoolData] = useState<PoolDataHookReturnType>([null, null])
  const { tokenPricesUSD, lastTransactionTimes } = useSelector(
    (state: AppState) => state.application,
  )

  const POOL = POOLS_MAP[poolName]
  const masterChefContract = useMasterChefContract()
  const lpTokenContract = useLPTokenContract(poolName)
  const gdlContract = useGondolaContract()
  // For swap pool, staked Lp token also count towards userLpTokenBalance
  const stakedTokenBalance = useStakedTokenBalance(POOL.poolId)

  const lastDepositTime = lastTransactionTimes[TRANSACTION_TYPES.DEPOSIT]
  const lastWithdrawTime = lastTransactionTimes[TRANSACTION_TYPES.WITHDRAW]
  const lastSwapTime = lastTransactionTimes[TRANSACTION_TYPES.SWAP]

  useEffect(() => {
    async function getSwapData(): Promise<void> {
      if (
        poolName == null ||
        // swapContract == null ||
        tokenPricesUSD == null ||
        library == null ||
        account == null
      )
        return
      // Swap fees, price, and LP Token data
      const [userCurrentWithdrawFee, swapStorage] = await Promise.all([
        swapContract?.calculateCurrentWithdrawFee(account || AddressZero) ||
          Zero,
        swapContract?.swapStorage(),
      ])

      const { adminFee, swapFee } = swapStorage || {
        adminFee: Zero,
        swapFee: Zero,
      }

      const userLpTokenBalance =
        (await lpTokenContract?.balanceOf(account || AddressZero)) || Zero

      const totalLpTokenBalance = (await lpTokenContract?.totalSupply()) || Zero

      const virtualPrice = totalLpTokenBalance.isZero()
        ? BigNumber.from(10).pow(18)
        : (await swapContract?.getVirtualPrice()) || Zero

      // Pool token data
      const tokenBalances: BigNumber[] = await Promise.all(
        POOL.poolTokens.map(async (token, i) => {
          const balance = await swapContract?.getTokenBalance(i)
          return BigNumber.from(10)
            .pow(18 - token.decimals) // cast all to 18 decimals
            .mul(balance || 0)
        }),
      )
      const tokenBalancesSum: BigNumber = tokenBalances.reduce(
        (sum, b) => sum.add(b),
        Zero,
      )
      const tokenBalancesUSD = POOL.poolTokens.map((token, i) => {
        const balance = tokenBalances[i]

        return balance
          .mul(parseUnits(String(tokenPricesUSD[token.symbol] || 0), 18))
          .div(BigNumber.from(10).pow(18))
      })
      const tokenBalancesUSDSum: BigNumber = tokenBalancesUSD.reduce(
        (sum, b) => sum.add(b),
        Zero,
      )
      let lpTokenPriceUSD = tokenBalancesSum.isZero()
        ? Zero
        : tokenBalancesUSDSum
            .mul(BigNumber.from(10).pow(18))
            .div(tokenBalancesSum)

      const gdlPriceUSD = BigNumber.from(
        // BigNumber.from needs integer
        Math.ceil(Number(tokenPricesUSD[GDL_TOKEN.symbol]) * 10000),
      ).mul(BigNumber.from(10).pow(GDL_TOKEN.decimals - 4))

      // for stake page: non-swap pool stake GDL
      if (poolName === GDL_POOL_NAME) {
        lpTokenPriceUSD = gdlPriceUSD
      } else if (!POOL.isSwapPool) {
        // pair LP: ZERO-GDL or Pangolin AVAX-GDL, etc
        const gdlXPairLpTotal = (await lpTokenContract?.totalSupply()) || One
        const numGdlInPairContract =
          (await gdlContract?.balanceOf(
            lpTokenContract?.address || AddressZero,
          )) || Zero

        // pair LP price = (num GDL * GDL price + num X * X price)/ total supply
        // pair LP price = (num GDL * GDL price * 2)/ total supply
        lpTokenPriceUSD = gdlPriceUSD
          .mul(numGdlInPairContract)
          .mul(2)
          .div(gdlXPairLpTotal)
      }

      // (weeksPerYear * KEEPPerWeek * KEEPPrice) / (BTCPrice * BTCInPool)
      const comparisonPoolToken = POOL.poolTokens[0] || GDL_TOKEN
      const keepAPRNumerator = BigNumber.from(52 * 250000)
        .mul(BigNumber.from(10).pow(18))
        .mul(parseUnits(String(tokenPricesUSD.KEEP), 18))
      const keepAPRDenominator = totalLpTokenBalance
        .mul(
          parseUnits(
            String(tokenPricesUSD[comparisonPoolToken.symbol] || 0),
            6,
          ),
        )
        .div(1e6)

      const keepApr = totalLpTokenBalance.isZero()
        ? keepAPRNumerator
        : keepAPRNumerator.div(
            keepAPRDenominator.isZero() ? 1 : keepAPRDenominator,
          )

      // User share data
      const userShare = userLpTokenBalance
        .mul(BigNumber.from(10).pow(18))
        .div(
          totalLpTokenBalance.isZero()
            ? BigNumber.from("1")
            : totalLpTokenBalance,
        )
      const userPoolTokenBalances = tokenBalances.map((balance) => {
        return userShare.mul(balance).div(BigNumber.from(10).pow(18))
      })
      const userPoolTokenBalancesSum: BigNumber = userPoolTokenBalances.reduce(
        (sum, b) => sum.add(b),
        Zero,
      )
      const userPoolTokenBalancesUSD = tokenBalancesUSD.map((balance) => {
        return userShare.mul(balance).div(BigNumber.from(10).pow(18))
      })
      const userPoolTokenBalancesUSDSum: BigNumber = userPoolTokenBalancesUSD.reduce(
        (sum, b) => sum.add(b),
        Zero,
      )

      /** For swap pool, staked Lp token also count towards userLpTokenBalance */
      const userLpTokenBalanceIncludeStaked = userLpTokenBalance.add(
        stakedTokenBalance,
      )
      const userShareIncludeStaked = userLpTokenBalanceIncludeStaked
        .mul(BigNumber.from(10).pow(18))
        .div(
          totalLpTokenBalance.isZero()
            ? BigNumber.from("1")
            : totalLpTokenBalance,
        )
      const userPoolTokenBalancesIncludeStaked = tokenBalances.map(
        (balance) => {
          return userShareIncludeStaked
            .mul(balance)
            .div(BigNumber.from(10).pow(18))
        },
      )
      const userPoolTokenBalancesSumIncludeStaked: BigNumber = userPoolTokenBalancesIncludeStaked.reduce(
        (sum, b) => sum.add(b),
        Zero,
      )
      const userPoolTokenBalancesUSDIncludeStaked = tokenBalancesUSD.map(
        (balance) => {
          return userShareIncludeStaked
            .mul(balance)
            .div(BigNumber.from(10).pow(18))
        },
      )
      const userPoolTokenBalancesUSDSumIncludeStaked: BigNumber = userPoolTokenBalancesUSDIncludeStaked.reduce(
        (sum, b) => sum.add(b),
        Zero,
      )

      const stakedTokenBalanceJs =
        stakedTokenBalance.div(BigNumber.from(10).pow(10)).toNumber() /
        100000000

      // calculate apy
      const totalAllocPoint =
        (await masterChefContract?.totalAllocPoint()) || One
      const poolAllocPoint =
        (await masterChefContract?.poolInfo(POOL.poolId))?.allocPoint || Zero
      const gondolaPerSec = await (masterChefContract?.gondolaPerSec() || Zero)

      const poolGDLPerSec = gondolaPerSec
        .mul(poolAllocPoint)
        .div(totalAllocPoint)

      // const poolGDLPerDay = poolGDLPerSec.mul(86400)
      const poolGDLPerYear = poolGDLPerSec.mul(3600 * 24 * 365)

      const masterAddress = chainId ? MASTERCHEF_ADDRESS[chainId] : AddressZero
      const totalStakedLpAmount =
        (await lpTokenContract?.balanceOf(masterAddress)) || Zero

      const lpTokenPriceUSDJs =
        lpTokenPriceUSD.div(BigNumber.from(10).pow(10)).toNumber() / 100000000

      const totalStakedLpAmountJs =
        totalStakedLpAmount.div(BigNumber.from(10).pow(15)).toNumber() / 1000
      const totalStakedLpAmountUSDJs = totalStakedLpAmountJs * lpTokenPriceUSDJs

      const totalLpTokenBalanceJs =
        totalLpTokenBalance.div(BigNumber.from(10).pow(15)).toNumber() / 1000
      const totalLpTokenBalanceUSDJs = lpTokenPriceUSDJs * totalLpTokenBalanceJs

      const gdlPriceUSDJs =
        gdlPriceUSD.div(BigNumber.from(10).pow(10)).toNumber() / 100000000

      const poolGDLPerYearJs =
        poolGDLPerYear.div(BigNumber.from(10).pow(15)).toNumber() / 1000

      const gainUsdPerYear = poolGDLPerYearJs * gdlPriceUSDJs
      // simple apy, not compound
      const apy =
        (gainUsdPerYear /
          (totalStakedLpAmountUSDJs || totalLpTokenBalanceUSDJs)) *
        100

      console.debug({
        apy,
        gainUsdPerYear,
        poolGDLPerYearJs,
        poolName,
        gdlPriceUSDJs,
        totalLpTokenBalanceUSDJs,
        totalStakedLpAmountUSDJs,
        lpTokenPriceUSDJs,
        totalLpTokenBalanceJs,
      })

      const poolTokens = POOL.poolTokens.map((token, i) => ({
        symbol: token.symbol,
        percent: formatBNToPercentString(
          tokenBalances[i]
            .mul(10 ** 5)
            .div(
              totalLpTokenBalance.isZero()
                ? BigNumber.from("1")
                : tokenBalancesSum,
            ),
          5,
        ),
        value: tokenBalances[i],
      }))
      const userPoolTokens = POOL.poolTokens.map((token, i) => ({
        symbol: token.symbol,
        percent: formatBNToPercentString(
          tokenBalances[i]
            .mul(10 ** 5)
            .div(
              totalLpTokenBalance.isZero()
                ? BigNumber.from("1")
                : tokenBalancesSum,
            ),
          5,
        ),
        value: userPoolTokenBalances[i],
      }))
      const poolData = {
        name: poolName,
        tokens: poolTokens,
        reserve: tokenBalancesUSDSum,
        totalLocked: totalLpTokenBalance,
        totalStakedLpAmount: totalStakedLpAmountJs,
        totalStakedLpAmountUSD: totalStakedLpAmountUSDJs,
        virtualPrice: virtualPrice,
        adminFee: adminFee,
        swapFee: swapFee,
        volume: "XXX", // TODO
        utilization: "XXX", // TODO
        apy: String(apy.toFixed(2)),
        keepApr,
        lpTokenPriceUSD,
      }
      const userShareData = account
        ? {
            name: poolName,
            share: userShare,
            shareIncludeStaked: userShareIncludeStaked,
            value: userPoolTokenBalancesSum,
            valueIncludeStaked: userPoolTokenBalancesSumIncludeStaked,
            usdBalance: userPoolTokenBalancesUSDSum,
            usdBalanceIncludeStaked: userPoolTokenBalancesUSDSumIncludeStaked,
            avgBalance: userPoolTokenBalancesSum,
            avgBalanceIncludeStaked: userPoolTokenBalancesSumIncludeStaked,
            tokens: userPoolTokens,
            currentWithdrawFee: userCurrentWithdrawFee,
            lpTokenBalance: userLpTokenBalance,
            stakedLPTokenBalance: stakedTokenBalance,
            stakedLPTokenUsdBalance: stakedTokenBalanceJs * lpTokenPriceUSDJs,
          }
        : null

      setPoolData([poolData, userShareData])
    }
    void getSwapData()
  }, [
    chainId,
    gdlContract,
    lpTokenContract,
    masterChefContract,
    lastDepositTime,
    lastWithdrawTime,
    lastSwapTime,
    poolName,
    POOL,
    swapContract,
    tokenPricesUSD,
    account,
    library,
    stakedTokenBalance,
  ])

  return poolData
}
