import { POOLS_MAP, PoolName } from "../constants"
import React, { ReactElement } from "react"
import { BigNumber } from "@ethersproject/bignumber"
import StakePage from "../components/StakePage"
import { Zero } from "@ethersproject/constants"
import { formatBNToString } from "../utils"
import { useApproveAndStake } from "../hooks/useApproveAndStake"
import { usePoolTokenBalances } from "../state/wallet/hooks"
import { useTokenFormState } from "../hooks/useTokenFormState"

interface Props {
  poolName: PoolName
}

function Stake({ poolName }: Props): ReactElement | null {
  const POOL = POOLS_MAP[poolName]
  const approveAndStake = useApproveAndStake(poolName)
  const [tokenDepositState, updateDepositFormState] = useTokenFormState([
    POOL.lpToken,
  ])

  /**@todo uncomment when withdraw is enabled */
  // const [tokenWithdrawState, updateWithdrawFormState] = useTokenFormState([
  //   POOL.lpToken,
  // ])

  const tokenBalances = usePoolTokenBalances(poolName)

  const lpTokenDeposit = {
    ...POOL.lpToken,
    max: formatBNToString(
      tokenBalances?.[POOL.lpToken.symbol] || Zero,
      POOL.lpToken.decimals,
    ),
    inputValue: tokenDepositState[POOL.lpToken.symbol].valueRaw,
  }

  /**@todo uncomment when withdraw is enabled */
  // const lpTokenWithdraw = {
  //   ...POOL.lpToken,
  //   max: formatBNToString(
  //     tokenBalances?.[POOL.lpToken.symbol] || Zero,
  //     POOL.lpToken.decimals,
  //   ),
  //   inputValue: tokenWithdrawState[POOL.lpToken.symbol].valueRaw,
  // }

  const exceedsBalance = (tokenBalances?.[POOL.lpToken.symbol] || Zero).lt(
    BigNumber.from(tokenDepositState[POOL.lpToken.symbol].valueSafe),
  )

  async function onConfirmTransaction(): Promise<void> {
    const stakeAmountBN = BigNumber.from(
      tokenDepositState[POOL.lpToken.symbol].valueSafe,
    )

    await approveAndStake({ lpTokenAmountToStake: stakeAmountBN })
    // Clear input after deposit
    updateDepositFormState({ [POOL.lpToken.symbol]: "" })
  }
  function updateDepositFormValue(symbol: string, value: string): void {
    updateDepositFormState({ [symbol]: value })
  }

  /**@todo uncomment when withdraw is enabled */
  // function updateWithdrawFormValue(symbol: string, value: string): void {
  //   updateWithdrawFormState({ [symbol]: value })
  // }

  return (
    <StakePage
      onConfirmTransaction={onConfirmTransaction}
      onChangeDepositValue={updateDepositFormValue}
      // onChangeWithdrawValue={updateWithdrawFormValue}
      lpTokenDeposit={lpTokenDeposit}
      // lpTokenWithdraw={lpTokenWithdraw}
      exceedsWallet={exceedsBalance}
    />
  )
}

export default Stake
