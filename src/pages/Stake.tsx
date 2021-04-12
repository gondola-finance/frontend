import React, { ReactElement } from "react"
import { BigNumber } from "@ethersproject/bignumber"
import { POOLS_MAP } from "../constants"
import StakePage from "../components/StakePage"
import { Zero } from "@ethersproject/constants"
import { formatBNToString } from "../utils"
import { useApproveAndStake } from "../hooks/useApproveAndStake"
import { useApproveAndWithdrawLP } from "../hooks/useApproveAndWithdrawLP"
import usePoolData from "../hooks/usePoolData"
import { useStakedTokenBalance } from "../hooks/useStakedTokenBalance"
import { useTokenFormState } from "../hooks/useTokenFormState"
import { useUnclaimedGDLBalance } from "../hooks/useUnclaimedGDLBalance"

function Stake(): ReactElement | null {
  const poolName = "Stablecoin Pool"
  const POOL = POOLS_MAP[poolName]
  const POOL_LPTOKEN = POOL.lpToken
  const approveAndStake = useApproveAndStake(poolName)
  const approveAndWithdrawLP = useApproveAndWithdrawLP(poolName)
  const [tokenDepositState, updateDepositFormState] = useTokenFormState([
    POOL_LPTOKEN,
  ])

  const [tokenWithdrawState, updateWithdrawFormState] = useTokenFormState([
    POOL_LPTOKEN,
  ])

  const poolUserJointData = usePoolData(poolName)
  const userShareData = poolUserJointData[1]

  // stakable pool lp token balance
  const poolLpTokenBalance = userShareData?.lpTokenBalance || Zero
  // staked pool lp token balance
  const stakedTokenBalance = useStakedTokenBalance(POOL.poolId)
  // unclaimed GDL reward from pool
  const [gdlBalance, gdlUnclaimed] = useUnclaimedGDLBalance(POOL.poolId)

  const lpTokenDeposit = {
    ...POOL_LPTOKEN,
    max: formatBNToString(poolLpTokenBalance, POOL_LPTOKEN.decimals),
    inputValue: tokenDepositState[POOL_LPTOKEN.symbol].valueRaw,
  }

  const lpTokenWithdraw = {
    ...POOL_LPTOKEN,
    max: formatBNToString(stakedTokenBalance, POOL_LPTOKEN.decimals),
    inputValue: tokenWithdrawState[POOL_LPTOKEN.symbol].valueRaw,
  }

  const exceedsUnstaked = poolLpTokenBalance.lt(
    BigNumber.from(tokenDepositState[POOL_LPTOKEN.symbol].valueSafe),
  )

  const exceedsStaked = stakedTokenBalance.lt(
    BigNumber.from(tokenWithdrawState[POOL_LPTOKEN.symbol].valueSafe),
  )

  async function onConfirmStakeLP(): Promise<void> {
    const stakeAmountBN = BigNumber.from(
      tokenDepositState[POOL_LPTOKEN.symbol].valueSafe,
    )
    await approveAndStake({ lpTokenAmountToStake: stakeAmountBN })
    // Clear input after deposit
    updateDepositFormState({ [POOL_LPTOKEN.symbol]: "" })
  }

  async function onConfirmWithdrawLP(): Promise<void> {
    const withdrawAmountBN = BigNumber.from(
      tokenWithdrawState[POOL_LPTOKEN.symbol].valueSafe,
    )
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: withdrawAmountBN })
    // Clear input after deposit
    updateWithdrawFormState({ [POOL_LPTOKEN.symbol]: "" })
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
        poolLpTokenBalance,
        POOL_LPTOKEN.decimals,
        4,
      )}
      stakedAmount={formatBNToString(
        stakedTokenBalance,
        POOL_LPTOKEN.decimals,
        4,
      )}
      gdlBalance={formatBNToString(gdlBalance, 18, 4)}
      gdlUnclaimed={formatBNToString(gdlUnclaimed, 18, 4)}
    />
  )
}

export default Stake
