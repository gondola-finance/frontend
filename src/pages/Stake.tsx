import React, { ReactElement } from "react"
import { BigNumber } from "@ethersproject/bignumber"
import { POOLS_MAP } from "../constants"
import StakePage from "../components/StakePage"
import { Zero } from "@ethersproject/constants"
import { formatBNToString } from "../utils"
import { useApproveAndStake } from "../hooks/useApproveAndStake"
import { useApproveAndWithdrawLP } from "../hooks/useApproveAndWithdrawLP"
import { useGDLTokenBalance } from "../hooks/useGDLTokenBalance"
import { usePoolTokenBalances } from "../state/wallet/hooks"
import { useStakedTokenBalance } from "../hooks/useStakedTokenBalance"
import { useTokenFormState } from "../hooks/useTokenFormState"

function Stake(): ReactElement | null {
  const poolName = "Stablecoin Pool"
  const POOL = POOLS_MAP[poolName]
  const approveAndStake = useApproveAndStake(poolName)
  const approveAndWithdrawLP = useApproveAndWithdrawLP(poolName)
  const [tokenDepositState, updateDepositFormState] = useTokenFormState([
    POOL.lpToken,
  ])

  const [tokenWithdrawState, updateWithdrawFormState] = useTokenFormState([
    POOL.lpToken,
  ])

  const tokenBalances = usePoolTokenBalances(poolName)
  const lpTokenBalance = tokenBalances?.[POOL.lpToken.symbol] || Zero
  const stakedTokenBalance = useStakedTokenBalance()
  const [gdlBalance, gdlUnclaimed] = useGDLTokenBalance()

  const lpTokenDeposit = {
    ...POOL.lpToken,
    max: formatBNToString(lpTokenBalance, POOL.lpToken.decimals),
    inputValue: tokenDepositState[POOL.lpToken.symbol].valueRaw,
  }

  const lpTokenWithdraw = {
    ...POOL.lpToken,
    max: formatBNToString(stakedTokenBalance, POOL.lpToken.decimals),
    inputValue: tokenWithdrawState[POOL.lpToken.symbol].valueRaw,
  }

  const exceedsUnstaked = lpTokenBalance.lt(
    BigNumber.from(tokenDepositState[POOL.lpToken.symbol].valueSafe),
  )

  const exceedsStaked = stakedTokenBalance.lt(
    BigNumber.from(tokenWithdrawState[POOL.lpToken.symbol].valueSafe),
  )

  async function onConfirmStakeLP(): Promise<void> {
    const stakeAmountBN = BigNumber.from(
      tokenDepositState[POOL.lpToken.symbol].valueSafe,
    )
    await approveAndStake({ lpTokenAmountToStake: stakeAmountBN })
    // Clear input after deposit
    updateDepositFormState({ [POOL.lpToken.symbol]: "" })
  }

  async function onConfirmWithdrawLP(): Promise<void> {
    const withdrawAmountBN = BigNumber.from(
      tokenWithdrawState[POOL.lpToken.symbol].valueSafe,
    )
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: withdrawAmountBN })
    // Clear input after deposit
    updateWithdrawFormState({ [POOL.lpToken.symbol]: "" })
  }

  async function onConfirmClaim(): Promise<void> {
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: Zero })
  }

  function updateDepositFormValue(symbol: string, value: string): void {
    updateDepositFormState({ [symbol]: value })
  }

  function updateWithdrawFormValue(symbol: string, value: string): void {
    updateWithdrawFormState({ [symbol]: value })
  }

  return (
    <StakePage
      onConfirmStakeLP={onConfirmStakeLP}
      onConfirmWithdrawLP={onConfirmWithdrawLP}
      onConfirmClaim={onConfirmClaim}
      onChangeDepositValue={updateDepositFormValue}
      onChangeWithdrawValue={updateWithdrawFormValue}
      lpTokenDeposit={lpTokenDeposit}
      lpTokenWithdraw={lpTokenWithdraw}
      exceedsUnstaked={exceedsUnstaked}
      exceedsStaked={exceedsStaked}
      lpTokenBalance={formatBNToString(
        lpTokenBalance,
        POOL.lpToken.decimals,
        4,
      )}
      stakedAmount={formatBNToString(
        stakedTokenBalance,
        POOL.lpToken.decimals,
        4,
      )}
      gdlBalance={formatBNToString(gdlBalance, 18, 4)}
      gdlUnclaimed={formatBNToString(gdlUnclaimed, 18, 4)}
    />
  )
}

export default Stake
