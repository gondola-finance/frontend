/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BLOCK_TIME } from "../constants"

import { BigNumber } from "@ethersproject/bignumber"
import { Zero } from "@ethersproject/constants"
import { useActiveWeb3React } from "../hooks"
import { useMasterChefContract } from "./useContract"
import usePoller from "./usePoller"
import { useState } from "react"

export function useStakedTokenBalance(): BigNumber {
  const { account, chainId } = useActiveWeb3React()
  const [balance, setBalance] = useState<BigNumber>(Zero)

  const masterChefContract = useMasterChefContract()

  usePoller((): void => {
    async function pollBalance(): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userInfo = account
        ? await masterChefContract?.userInfo(0, account)
        : { amount: Zero }

      if (userInfo?.amount !== undefined && userInfo?.amount !== balance) {
        setBalance(userInfo?.amount)
      }
    }

    if (account && chainId) {
      void pollBalance()
    }
  }, BLOCK_TIME * 10)
  return balance
}
