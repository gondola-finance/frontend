import "./StakePool.scss"

import { Box, Button, Center } from "@chakra-ui/react"
import { POOLS_MAP, PoolName } from "../constants"
import React, { ReactElement, useState } from "react"

import { BigNumber } from "@ethersproject/bignumber"
import InfiniteApprovalField from "./InfiniteApprovalField"
import TokenInput from "./TokenInput"
import { Zero } from "@ethersproject/constants"

import classNames from "classnames"
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
/* eslint-enable @typescript-eslint/no-explicit-any */

const StakePool = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const { poolName } = props

  const POOL = POOLS_MAP[poolName]
  const POOL_LPTOKEN = POOL.lpToken

  // const dispatch = useDispatch<AppDispatch>()
  // const { userPoolAdvancedMode: advanced } = useSelector(
  //   (state: AppState) => state.user,
  // )
  const [poolData, userShareData] = usePoolData(poolName)

  const [advanceMode, setAdvanceMode] = useState(false)
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
    const stakeAmountBN = BigNumber.from(
      formAmountState[POOL_LPTOKEN.symbol].valueSafe,
    )
    await approveAndStake({ lpTokenAmountToStake: stakeAmountBN })
  }

  async function handleWithdraw(): Promise<void> {
    const withdrawAmountBN = BigNumber.from(
      formAmountState[POOL_LPTOKEN.symbol].valueSafe,
    )
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: withdrawAmountBN })
  }

  async function handleClaimGDL(): Promise<void> {
    await approveAndWithdrawLP({ lpTokenAmountToWithdraw: Zero })
  }

  const hasZeroUnclaimed = gdlUnclaimed.isZero()
  const isInvalidAmount =
    isNaN(Number(amountInput.inputValue)) || Number(amountInput.inputValue) <= 0

  return (
    <div className="stakingPool">
      <h3>Staking {POOL.lpToken.name}</h3>
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
          width={240}
          mr={100}
          onClick={(): void => {
            void handleStake()
          }}
          disabled={exceedsStakable || isInvalidAmount}
        >
          {t("Stake")}
        </Button>
        <Button
          variant="primary"
          size="lg"
          width={240}
          onClick={(): void => {
            void handleWithdraw()
          }}
          disabled={exceedsWithdrawable || isInvalidAmount}
        >
          {t("Withdraw")}
        </Button>
      </Center>

      <Box mt={3}>
        <span style={{ fontWeight: "bold" }}>
          Your unclaimed GDL reward: &nbsp;
        </span>
        <span className="value">{formatBNToString(gdlUnclaimed, 18, 4)}</span>
        <Button
          variant="primary"
          size="sm"
          width={160}
          ml={100}
          onClick={(): void => {
            void handleClaimGDL()
          }}
          disabled={hasZeroUnclaimed}
        >
          {t("Claim")}
        </Button>
      </Box>
      <div className="advancedOptions">
        <span
          className="title"
          onClick={() => {
            setAdvanceMode(!advanceMode)
          }}
        >
          {t("advancedOptions")}
          <svg
            className={classNames("triangle", { upsideDown: advanceMode })}
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.8252 0C16.077 0 16.3783 0.827943 15.487 1.86207L8.80565 9.61494C8.35999 10.1321 7.63098 10.1246 7.19174 9.61494L0.510262 1.86207C-0.376016 0.833678 -0.0777447 0 1.17205 0L14.8252 0Z"
              fill="#00f4d7"
            />
          </svg>
        </span>
        <div className="divider"></div>
        <div className={"tableContainer" + classNames({ show: advanceMode })}>
          <div className="parameter">
            <InfiniteApprovalField />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakePool
