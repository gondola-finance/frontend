import { ChainId, POOLS_MAP, PoolName } from "../constants"
import React, { ReactElement, useEffect, useState } from "react"
import WithdrawPage, { ReviewWithdrawData } from "../components/WithdrawPage"
import { commify, formatUnits, parseUnits } from "@ethersproject/units"

import { AppState } from "../state"
import { BigNumber } from "@ethersproject/bignumber"
import { Zero } from "@ethersproject/constants"
import { calculatePriceImpact } from "../utils/priceImpact"
import { formatSlippageToString } from "../utils/slippage"
import { useActiveWeb3React } from "../hooks"
import { useApproveAndWithdraw } from "../hooks/useApproveAndWithdraw"
import usePoolData from "../hooks/usePoolData"
import { useSelector } from "react-redux"
import { useSwapContract } from "../hooks/useContract"
import useWithdrawFormState from "../hooks/useWithdrawFormState"

interface Props {
  poolName: PoolName
}
function Withdraw({ poolName }: Props): ReactElement {
  const [poolData, userShareData] = usePoolData(poolName)
  const [withdrawFormState, updateWithdrawFormState] = useWithdrawFormState(
    poolName,
  )
  const { slippageCustom, slippageSelected } = useSelector(
    (state: AppState) => state.user,
  )
  const { tokenPricesUSD } = useSelector((state: AppState) => state.application)
  const approveAndWithdraw = useApproveAndWithdraw(poolName)
  const swapContract = useSwapContract(poolName)
  const { account, chainId } = useActiveWeb3React()
  const POOL = POOLS_MAP[poolName]

  const [estWithdrawBonus, setEstWithdrawBonus] = useState(Zero)
  useEffect(() => {
    // evaluate if a new withdraw will exceed the pool's per-user limit
    async function calculateWithdrawBonus(): Promise<void> {
      if (
        swapContract == null ||
        userShareData == null ||
        poolData == null ||
        account == null
      ) {
        return
      }
      const tokenInputSum = parseUnits(
        POOL.poolTokens
          .reduce(
            (sum, { symbol }) =>
              sum + (+withdrawFormState.tokenInputs[symbol].valueRaw || 0),
            0,
          )
          .toFixed(18),
        18,
      )
      let withdrawLPTokenAmount
      if (poolData.totalLocked.gt(0) && tokenInputSum.gt(0)) {
        withdrawLPTokenAmount = await swapContract.calculateTokenAmount(
          account,
          POOL.poolTokens.map(
            ({ symbol }) => withdrawFormState.tokenInputs[symbol].valueSafe,
          ),
          false,
        )
      } else {
        // when pool is empty, estimate the lptokens by just summing the input instead of calling contract
        withdrawLPTokenAmount = tokenInputSum
      }
      setEstWithdrawBonus(
        calculatePriceImpact(
          withdrawLPTokenAmount,
          tokenInputSum,
          poolData.virtualPrice,
        ),
      )
    }
    void calculateWithdrawBonus()
  }, [
    poolData,
    withdrawFormState,
    swapContract,
    userShareData,
    account,
    POOL.poolTokens,
  ])
  async function onConfirmTransaction(): Promise<void> {
    const {
      withdrawType,
      tokenInputs,
      lpTokenAmountToSpend,
    } = withdrawFormState
    await approveAndWithdraw({
      tokenFormState: tokenInputs,
      withdrawType,
      lpTokenAmountToSpend,
    })
    updateWithdrawFormState({ fieldName: "reset", value: "reset" })
  }

  const tokensData = React.useMemo(
    () =>
      POOL.poolTokens.map(({ name, symbol, icon }) => ({
        name,
        symbol,
        icon,
        inputValue: withdrawFormState.tokenInputs[symbol].valueRaw,
      })),
    [withdrawFormState, POOL.poolTokens],
  )

  const reviewWithdrawData: ReviewWithdrawData = {
    withdraw: [],
    rates: [],
    slippage: formatSlippageToString(slippageSelected, slippageCustom),
    priceImpact: estWithdrawBonus,
  }
  POOL.poolTokens.forEach(({ name, decimals, icon, symbol }) => {
    if (BigNumber.from(withdrawFormState.tokenInputs[symbol].valueSafe).gt(0)) {
      reviewWithdrawData.withdraw.push({
        name,
        value: commify(
          formatUnits(
            withdrawFormState.tokenInputs[symbol].valueSafe,
            decimals[chainId || ChainId["FUJI"]],
          ),
        ),
        icon,
      })
      if (tokenPricesUSD != null) {
        reviewWithdrawData.rates.push({
          name,
          value: formatUnits(
            withdrawFormState.tokenInputs[symbol].valueSafe,
            decimals[chainId || ChainId["FUJI"]],
          ),
          rate: commify(tokenPricesUSD[symbol]?.toFixed(2)),
        })
      }
    }
  })

  return (
    <WithdrawPage
      title={poolName}
      reviewData={reviewWithdrawData}
      tokensData={tokensData}
      poolData={poolData}
      myShareData={userShareData}
      formStateData={withdrawFormState}
      onConfirmTransaction={onConfirmTransaction}
      onFormChange={updateWithdrawFormState}
    />
  )
}

export default Withdraw
