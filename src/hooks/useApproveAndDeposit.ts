import {
  GAS_PRICE_BIGNUMBER,
  GAS_PRICE_DEFAULT,
  POOLS_MAP,
  PoolName,
  TRANSACTION_TYPES,
  Token,
} from "../constants"
import { useAllContracts, useSwapContract } from "./useContract"

import { AppState } from "../state"
import { BigNumber } from "@ethersproject/bignumber"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import { NumberInputState } from "../utils/numberInputState"
import checkAndApproveTokenForTrade from "../utils/checkAndApproveTokenForTrade"
import { formatDeadlineToNumber } from "../utils"
import { getFormattedTimeString } from "../utils/dateTime"
import { subtractSlippage } from "../utils/slippage"
import { updateLastTransactionTimes } from "../state/application"
import { useActiveWeb3React } from "."
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useToast } from "./useToast"

interface ApproveAndDepositStateArgument {
  [tokenSymbol: string]: NumberInputState
}

export function useApproveAndDeposit(
  poolName: PoolName,
): (state: ApproveAndDepositStateArgument) => Promise<void> {
  const dispatch = useDispatch()
  const swapContract = useSwapContract(poolName)
  const tokenContracts = useAllContracts()
  const { account } = useActiveWeb3React()
  const { addToast, clearToasts } = useToast()

  const {
    slippageCustom,
    slippageSelected,
    transactionDeadlineCustom,
    transactionDeadlineSelected,
    allowInfiniteApproval,
  } = useSelector((state: AppState) => state.user)
  const POOL = POOLS_MAP[poolName]

  return async function approveAndDeposit(
    state: ApproveAndDepositStateArgument,
  ): Promise<void> {
    if (!account) throw new Error("Wallet must be connected")
    if (!swapContract) throw new Error("Swap contract is not loaded")

    const approveSingleToken = async (token: Token): Promise<void> => {
      const spendingValue = BigNumber.from(state[token.symbol].valueSafe)
      if (spendingValue.isZero()) return
      const tokenContract = tokenContracts?.[token.symbol] as Erc20
      if (tokenContract == null) return
      await checkAndApproveTokenForTrade(
        tokenContract,
        swapContract.address,
        account,
        spendingValue,
        allowInfiniteApproval,
        {
          onTransactionStart: () => {
            return addToast(
              {
                type: "pending",
                title: `${getFormattedTimeString()} Approving spend for ${
                  token.name
                }`,
              },
              {
                autoDismiss: false, // TODO: be careful of orphan toasts on error
              },
            )
          },
          onTransactionSuccess: () => {
            return addToast({
              type: "success",
              title: `${getFormattedTimeString()} Successfully approved spend for ${
                token.name
              }`,
            })
          },
          onTransactionError: () => {
            throw new Error("Your transaction could not be completed")
          },
        },
      )
    }
    try {
      // For each token being deposited, check the allowance and approve it if necessary
      await Promise.all(
        POOL.poolTokens.map((token) => approveSingleToken(token)),
      )

      // "isFirstTransaction" check can be removed after launch
      const poolTokenBalances: BigNumber[] = await Promise.all(
        POOL.poolTokens.map(async (token, i) => {
          return await swapContract.getTokenBalance(i)
        }),
      )
      const isFirstTransaction = poolTokenBalances.every((bal) => bal.isZero())
      let minToMint: BigNumber
      if (isFirstTransaction) {
        minToMint = BigNumber.from("0")
      } else {
        minToMint = await swapContract.calculateTokenAmount(
          account,
          POOL.poolTokens.map(({ symbol }) => state[symbol].valueSafe),
          true, // deposit boolean
        )
      }

      minToMint = subtractSlippage(minToMint, slippageSelected, slippageCustom)
      const clearMessage = addToast({
        type: "pending",
        title: `${getFormattedTimeString()} Starting your deposit...`,
      })
      const deadline = formatDeadlineToNumber(
        transactionDeadlineSelected,
        transactionDeadlineCustom,
      )

      const spendTransaction = await swapContract.addLiquidity(
        POOL.poolTokens.map(({ symbol }) => state[symbol].valueSafe),
        minToMint,
        Math.round(new Date().getTime() / 1000 + 60 * deadline),
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
        title: `${getFormattedTimeString()} Liquidity added, giddyup! 🤠`,
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
