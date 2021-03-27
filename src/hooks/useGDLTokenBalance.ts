import { useGondolaContract, useMasterChefContract } from "./useContract"
import { BLOCK_TIME } from "../constants"

import { BigNumber } from "@ethersproject/bignumber"
import { Zero } from "@ethersproject/constants"
import { useActiveWeb3React } from "../hooks"
import usePoller from "./usePoller"
import { useState } from "react"

export function useGDLTokenBalance(): [BigNumber, BigNumber] {
  const { account, chainId } = useActiveWeb3React()
  const [balance, setBalance] = useState<BigNumber>(Zero)
  const [unclaimedBalance, setUnclaimedBalance] = useState<BigNumber>(Zero)

  const gondolaContract = useGondolaContract()
  const masterChefContract = useMasterChefContract()

  usePoller((): void => {
    async function pollBalance(): Promise<void> {
      const userBalance = account
        ? (await gondolaContract?.balanceOf(account)) || Zero
        : Zero

      const userUnclaimedBalance = account
        ? (await masterChefContract?.pendingSushi(0, account)) || Zero
        : Zero

      if (userBalance !== balance) {
        setBalance(userBalance)
      }
      if (userUnclaimedBalance !== unclaimedBalance) {
        setUnclaimedBalance(userUnclaimedBalance)
      }
    }

    if (account && chainId) {
      void pollBalance()
    }
  }, BLOCK_TIME * 10)
  return [balance, unclaimedBalance]
}
