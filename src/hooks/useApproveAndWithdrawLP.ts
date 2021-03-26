import { PoolName, TRANSACTION_TYPES } from "../constants"
import { useLPTokenContract, useMasterChefContract } from "./useContract"

import { AppState } from "../state"
import { BigNumber } from "@ethersproject/bignumber"
import { GasPrices } from "../state/user"
import { getFormattedTimeString } from "../utils/dateTime"
import { parseUnits } from "@ethersproject/units"
import { updateLastTransactionTimes } from "../state/application"
import { useActiveWeb3React } from "."
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
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
  const { gasStandard, gasFast, gasInstant } = useSelector(
    (state: AppState) => state.application,
  )
  const { gasPriceSelected, gasCustom } = useSelector(
    (state: AppState) => state.user,
  )

  return async function approveAndWithdrawLP(
    state: ApproveAndWithdrawLPStateArgument,
  ): Promise<void> {
    try {
      if (!account) throw new Error("Wallet must be connected")
      if (!masterChefContract)
        throw new Error("MasterChef Contract contract is not loaded")
      if (state.lpTokenAmountToWithdraw.isZero()) return
      if (lpTokenContract == null) return

      const clearMessage = addToast({
        type: "pending",
        title: `${getFormattedTimeString()} Starting your withdrawal...`,
      })
      let gasPrice
      if (gasPriceSelected === GasPrices.Custom) {
        gasPrice = gasCustom?.valueSafe
      } else if (gasPriceSelected === GasPrices.Fast) {
        gasPrice = gasFast
      } else if (gasPriceSelected === GasPrices.Instant) {
        gasPrice = gasInstant
      } else {
        gasPrice = gasStandard
      }
      gasPrice = parseUnits(String(gasPrice) || "45", 9)

      const withdrawTransaction = await masterChefContract.withdraw(
        0, // pool id=0 for stablecoin pool
        state.lpTokenAmountToWithdraw._hex,
        {
          gasPrice,
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
