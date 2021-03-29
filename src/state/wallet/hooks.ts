import {
  BLOCK_TIME,
  DAI,
  PoolName,
  STABLECOIN_POOL_NAME,
  STABLECOIN_SWAP_TOKEN,
  TUSD,
  Token,
  USDT,
} from "../../constants"

import { BigNumber } from "@ethersproject/bignumber"
import { Erc20 } from "../../../types/ethers-contracts/Erc20"
import { Zero } from "@ethersproject/constants"
import { useActiveWeb3React } from "../../hooks"
import { useMemo } from "react"
import usePoller from "../../hooks/usePoller"
import { useState } from "react"
import { useTokenContract } from "../../hooks/useContract"

export function useTokenBalance(t: Token): BigNumber {
  const { account, chainId } = useActiveWeb3React()
  const [balance, setBalance] = useState<BigNumber>(Zero)

  const tokenContract = useTokenContract(t) as Erc20

  usePoller((): void => {
    async function pollBalance(): Promise<void> {
      const newBalance = account
        ? await tokenContract?.balanceOf(account)
        : Zero
      if (newBalance !== undefined && newBalance !== balance) {
        setBalance(newBalance)
      }
    }
    if (account && chainId) {
      void pollBalance()
    }
  }, BLOCK_TIME * 10)
  return balance
}

export function usePoolTokenBalances(
  poolName: PoolName,
): { [token: string]: BigNumber } | null {
  // pool tokens
  const daiTokenBalance = useTokenBalance(DAI)
  const tusdTokenBalance = useTokenBalance(TUSD)
  const usdtTokenBalance = useTokenBalance(USDT)
  // lpToken
  const lpTokenBalance = useTokenBalance(STABLECOIN_SWAP_TOKEN)

  const stablecoinPoolTokenBalances = useMemo(
    () => ({
      [DAI.symbol]: daiTokenBalance,
      [TUSD.symbol]: tusdTokenBalance,
      [USDT.symbol]: usdtTokenBalance,
      [STABLECOIN_SWAP_TOKEN.symbol]: lpTokenBalance,
    }),
    [daiTokenBalance, tusdTokenBalance, usdtTokenBalance, lpTokenBalance],
  )

  if (poolName === STABLECOIN_POOL_NAME) {
    return stablecoinPoolTokenBalances
  }
  return null
}
