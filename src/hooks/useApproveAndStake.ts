import {
  GAS_PRICE_BIGNUMBER,
  GAS_PRICE_DEFAULT,
  POOLS_MAP,
  PoolName,
  TRANSACTION_TYPES,
} from "../constants"
import { useLPTokenContract, useMasterChefContract } from "./useContract"

import { AppState } from "../state"
import { BigNumber } from "@ethersproject/bignumber"
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade"
import { getFormattedTimeString } from "../utils/dateTime"
import { updateLastTransactionTimes } from "../state/application"
import { useActiveWeb3React } from "."
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useToast } from "./useToast"

interface ApproveAndStakeStateArgument {
  lpTokenAmountToStake: BigNumber
}

export function useApproveAndStake(
  poolName: PoolName,
): (state: ApproveAndStakeStateArgument) => Promise<void> {
  const POOL = POOLS_MAP[poolName]

  const dispatch = useDispatch()
  const masterChefContract = useMasterChefContract()
  const lpTokenContract = useLPTokenContract(poolName)

  const { account } = useActiveWeb3React()
  const { addToast, clearToasts } = useToast()
  const { allowInfiniteApproval } = useSelector((state: AppState) => state.user)

  return async function approveAndStake(
    state: ApproveAndStakeStateArgument,
  ): Promise<void> {
    try {
      if (!account) throw new Error("Wallet must be connected")
      if (!masterChefContract)
        throw new Error("MasterChef Contract contract is not loaded")
      if (state.lpTokenAmountToStake.isZero()) return
      if (lpTokenContract == null) return

      // approve MasterChefContract to spend lpToken
      await checkAndApproveTokenForTrade(
        lpTokenContract,
        masterChefContract.address,
        account,
        state.lpTokenAmountToStake,
        allowInfiniteApproval,
        {
          onTransactionStart: () => {
            return addToast(
              {
                type: "pending",
                title: `${getFormattedTimeString()} Approving spend for lpToken`,
              },
              {
                autoDismiss: false, // TODO: be careful of orphan toasts on error
              },
            )
          },
          onTransactionSuccess: () => {
            return addToast({
              type: "success",
              title: `${getFormattedTimeString()} Successfully approved spend for lpToken`,
            })
          },
          onTransactionError: () => {
            throw new Error("Your transaction could not be completed")
          },
        },
      )

      const clearMessage = addToast({
        type: "pending",
        title: `${getFormattedTimeString()} Starting your deposit...`,
      })

      const spendTransaction = await masterChefContract.deposit(
        POOL.poolId,
        state.lpTokenAmountToStake._hex,
        GAS_PRICE_DEFAULT
          ? {}
          : {
              gasPrice: GAS_PRICE_BIGNUMBER,
            },
      )
      await spendTransaction.wait()
      dispatch(
        updateLastTransactionTimes({
          [TRANSACTION_TYPES.DEPOSIT]: Date.now(),
        }),
      )
      clearMessage()
      addToast({
        type: "success",
        title: `${getFormattedTimeString()} LP Token staked, giddyup! 🤠`,
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
