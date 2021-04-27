import "./StakePool.scss"

import { Button, Center } from "@chakra-ui/react"
import { POOLS_MAP, PoolName } from "../constants"
import React, { ReactElement } from "react"
import { BigNumber } from "@ethersproject/bignumber"
import TokenInput from "./TokenInput"
import { Zero } from "@ethersproject/constants"
import { formatBNToString } from "../utils"
import { useApproveAndStake } from "../hooks/useApproveAndStake"
import { useApproveAndWithdrawLP } from "../hooks/useApproveAndWithdrawLP"
import usePoolData from "../hooks/usePoolData"
import { useStakedTokenBalance } from "../hooks/useStakedTokenBalance"
import { useTokenFormState } from "../hooks/useTokenFormState"
import { useTranslation } from "react-i18next"
import { useUnclaimedGDLBalance } from "../hooks/useUnclaimedGDLBalance"

interface Props {
  poolName: PoolName
}

const StakePool = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const { poolName } = props

  const POOL = POOLS_MAP[poolName]
  const POOL_LPTOKEN = POOL.lpToken

  const [poolData, userShareData] = usePoolData(poolName)

  // stakable pool lp token balance = max depositable
  const poolLpTokenBalance = userShareData?.lpTokenBalance || Zero
  // staked pool lp token balance = max withdrawable
  const stakedTokenBalance = useStakedTokenBalance(POOL.poolId)
  // unclaimed GDL reward from pool
  const gdlUnclaimed = useUnclaimedGDLBalance(POOL.poolId)[1]

  const [formAmountState, updateFormAmountState] = useTokenFormState([
    POOL_LPTOKEN,
  ])
  const amountInput = {
    ...POOL_LPTOKEN,
    inputValue: formAmountState[POOL_LPTOKEN.symbol].valueRaw,
  }

  const approveAndStake = useApproveAndStake(poolName)
  const approveAndWithdrawLP = useApproveAndWithdrawLP(poolName)

  const exceedsStakable = poolLpTokenBalance.lt(
    BigNumber.from(formAmountState[POOL_LPTOKEN.symbol].valueSafe),
  )

  const exceedsWithdrawable = stakedTokenBalance.lt(
    BigNumber.from(formAmountState[POOL_LPTOKEN.symbol].valueSafe),
  )

  function updateFormAmountValue(value: string): void {
    updateFormAmountState({ [POOL_LPTOKEN.symbol]: value })
  }

  async function handleStake(): Promise<void> {
    console.log("staking")
    const stakeAmountBN = BigNumber.from(
      formAmountState[POOL_LPTOKEN.symbol].valueSafe,
    )
    await approveAndStake({ lpTokenAmountToStake: stakeAmountBN })
  }

  async function handleWithdraw(): Promise<void> {
    console.log("withdrawing")
    const withdrawAmountBN = BigNumber.from(
      formAmountState[POOL_LPTOKEN.symbol].valueSafe,
    )
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: withdrawAmountBN })
  }

  async function handleClaimGDL(): Promise<void> {
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: Zero })
  }

  const hasZeroUnclaimed = gdlUnclaimed.isZero()

  return (
    <div className="stakingPool">
      <h3>Staking {poolName}</h3>
      {/** @todo add warning message */}
      {/* {exceedsStakable ? (
        <div className="error">Amount exceeds stakable {POOL_LPTOKEN.name}</div>
      ) : null} */}
      <div className="info">
        <span style={{ fontWeight: "bold" }}>Pool APY(%): &nbsp;</span>
        <span className="value">{poolData?.apy}</span>
      </div>
      <div className="info">
        <span style={{ fontWeight: "bold" }}>
          Staked {POOL_LPTOKEN.symbol}: &nbsp;
        </span>
        <span className="value">
          {formatBNToString(stakedTokenBalance, POOL_LPTOKEN.decimals, 10)}
        </span>
      </div>
      <div className="info">
        <span style={{ fontWeight: "bold" }}>
          Stakable {POOL_LPTOKEN.symbol}: &nbsp;
        </span>
        <span className="value">
          {formatBNToString(poolLpTokenBalance, POOL_LPTOKEN.decimals, 10)}
        </span>
      </div>
      <TokenInput
        {...amountInput}
        max={formatBNToString(
          poolLpTokenBalance || Zero,
          POOL_LPTOKEN.decimals,
          10,
        )}
        max2={formatBNToString(
          stakedTokenBalance || Zero,
          POOL_LPTOKEN.decimals,
          10,
        )}
        maxButton1Name="stake max"
        maxButton2Name="withdraw max"
        onChange={(value): void => updateFormAmountValue(value)}
      />
      <Center width="100%" pt={3} pb={6}>
        <Button
          variant="primary"
          size="lg"
          width="240px"
          style={{ marginRight: 100 }}
          onClick={(): void => {
            void handleStake()
          }}
          disabled={
            exceedsStakable ||
            isNaN(Number(amountInput.inputValue)) ||
            Number(amountInput.inputValue) <= 0
          }
        >
          {t("Stake")}
        </Button>
        <Button
          variant="primary"
          size="lg"
          width="240px"
          onClick={(): void => {
            void handleWithdraw()
          }}
          disabled={
            exceedsWithdrawable ||
            isNaN(Number(amountInput.inputValue)) ||
            Number(amountInput.inputValue) <= 0
          }
        >
          {t("Withdraw")}
        </Button>
      </Center>

      <div className="info">
        <span style={{ fontWeight: "bold" }}>
          Your unclaimed GDL reward: &nbsp;
        </span>
        <span className="value">{formatBNToString(gdlUnclaimed, 18, 4)}</span>
        <Button
          variant="primary"
          size="lg"
          width="240px"
          style={{
            marginLeft: 100,
            display: hasZeroUnclaimed ? "none" : "",
          }}
          onClick={(): void => {
            void handleClaimGDL()
          }}
          disabled={hasZeroUnclaimed}
        >
          {t("Claim")}
        </Button>
      </div>
    </div>
  )
}

export default StakePool
