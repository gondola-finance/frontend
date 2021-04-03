import {
  GAS_PRICE_BIGNUMBER,
  PoolName,
  STABLECOIN_POOL_ID,
  TRANSACTION_TYPES,
} from "../constants"
import { useLPTokenContract, useMasterChefContract } from "./useContract"

import { BigNumber } from "@ethersproject/bignumber"
import { getFormattedTimeString } from "../utils/dateTime"
import { updateLastTransactionTimes } from "../state/application"
import { useActiveWeb3React } from "."
import { useDispatch } from "react-redux"
import { useToast } from "./useToast"

interface ApproveAndWithdrawLPStateArgument {
  lpTokenAmountToWithdraw: BigNumber
}

export function useApproveAndWithdrawLP(
  poolName: PoolName,
): (state: ApproveAndWithdrawLPStateArgument) => Promise<void> {
  const dispatch = useDispatch()
  const masterChefContract = useMasterChefContract()
  const lpTokenContract = useLPTokenContract(poolName)

  const { account } = useActiveWeb3React()
  const { addToast, clearToasts } = useToast()

  return async function approveAndWithdrawLP(
    state: ApproveAndWithdrawLPStateArgument,
  ): Promise<void> {
    try {
      if (!account) throw new Error("Wallet must be connected")
      if (!masterChefContract)
        throw new Error("MasterChef Contract contract is not loaded")
      if (lpTokenContract == null) return

      const clearMessage = addToast({
        type: "pending",
        title: `${getFormattedTimeString()} Starting your withdrawal...`,
      })

      const withdrawTransaction = await masterChefContract.withdraw(
        STABLECOIN_POOL_ID,
        state.lpTokenAmountToWithdraw._hex,
        {
          gasPrice: GAS_PRICE_BIGNUMBER,
        },
      )
      await withdrawTransaction.wait()
      dispatch(
        updateLastTransactionTimes({
          [TRANSACTION_TYPES.DEPOSIT]: Date.now(),
        }),
      )
      clearMessage()
      addToast({
        type: "success",
        title: `${getFormattedTimeString()} LP Token withdrawn!`,
      })
      return Promise.resolve()
    } catch (e) {
      console.error(e)
      clearToasts()
      addToast({
        type: "error",
        title: `${getFormattedTimeString()} Unable to complete your transaction`,
      })
    }
  }
}
