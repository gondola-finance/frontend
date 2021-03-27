import "./StakePage.scss"

import { Button, Center } from "@chakra-ui/react"
import React, { ReactElement } from "react"

import TokenInput from "./TokenInput"
import TopMenu from "./TopMenu"
import { useTranslation } from "react-i18next"

interface Props {
  onConfirmStakeLP: () => Promise<void>
  onConfirmWithdrawLP: () => Promise<void>
  onConfirmClaim: () => Promise<void>
  onChangeDepositValue: (tokenSymbol: string, value: string) => void
  onChangeWithdrawValue: (tokenSymbol: string, value: string) => void
  lpTokenDeposit: {
    symbol: string
    name: string
    icon: string
    max: string
    inputValue: string
  }
  /**@todo uncomment when withdraw is enabled */
  lpTokenWithdraw: {
    symbol: string
    name: string
    icon: string
    max: string
    inputValue: string
  }
  exceedsUnstaked: boolean
  exceedsStaked: boolean
  lpTokenBalance: string
  stakedAmount: string
  gdlBalance: string
  gdlUnclaimed: string
}

const StakePage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    lpTokenBalance,
    lpTokenDeposit,
    lpTokenWithdraw,
    exceedsStaked,
    exceedsUnstaked,
    onChangeDepositValue,
    onChangeWithdrawValue,
    onConfirmStakeLP,
    onConfirmWithdrawLP,
    onConfirmClaim,
    stakedAmount,
    gdlBalance,
    gdlUnclaimed,
  } = props

  return (
    <div className="stake">
      <TopMenu activeTab={"stake"} />

      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("stakeYourGondolaUSD")}</h3>
            {exceedsUnstaked ? (
              <div className="error">
                {t("Amount exceeds unstaked Gondola USD")}
              </div>
            ) : null}
            <div className="info">
              <span style={{ fontWeight: "bold" }}>Staked amount: &nbsp;</span>
              <span className="value">{stakedAmount}</span>
            </div>
            <div className="info">
              <span style={{ fontWeight: "bold" }}>
                Unstaked balance: &nbsp;
              </span>
              <span className="value">{lpTokenBalance}</span>
            </div>
            <TokenInput
              {...lpTokenDeposit}
              onChange={(value): void =>
                onChangeDepositValue(lpTokenDeposit.symbol, value)
              }
            />
          </div>
          <Center width="100%" py={6}>
            <Button
              variant="primary"
              size="lg"
              width="240px"
              onClick={(): void => {
                void onConfirmStakeLP()
              }}
              disabled={
                exceedsUnstaked || Number(lpTokenDeposit.inputValue) === 0
              }
            >
              {t("Stake")}
            </Button>
          </Center>
          <div className="form">
            <h3>{t("Claim GDL Token")}</h3>
            <div className="info">
              <span style={{ fontWeight: "bold" }}>
                Your GDL balance &nbsp;
              </span>
              <span className="value">{gdlBalance}</span>
            </div>
            <div className="info">
              <span style={{ fontWeight: "bold" }}>
                Unclaimed GDL balance: &nbsp;
              </span>
              <span className="value">{gdlUnclaimed}</span>
            </div>
          </div>
          <Center width="100%" py={6}>
            <Button
              variant="primary"
              size="lg"
              width="240px"
              onClick={(): void => {
                void onConfirmClaim()
              }}
              disabled={gdlUnclaimed === "0.0"}
            >
              {t("Claim")}
            </Button>
          </Center>
        </div>

        {/**@todo uncomment when withdraw is enabled */}
        <div className="right">
          <div className="form">
            <h3>{t("Withdraw Gondola USD")}</h3>
            {exceedsStaked ? (
              <div className="error">
                {t("Amount exceeds staked Gondola USD")}
              </div>
            ) : null}
            <div className="info">
              <span style={{ fontWeight: "bold" }}>Staked amount: &nbsp;</span>
              <span className="value">{stakedAmount}</span>
            </div>
            <TokenInput
              {...lpTokenWithdraw}
              onChange={(value): void =>
                onChangeWithdrawValue(lpTokenWithdraw.symbol, value)
              }
            />
          </div>
          <Center width="100%" py={6}>
            <Button
              variant="primary"
              size="lg"
              width="240px"
              onClick={(): void => {
                void onConfirmWithdrawLP()
              }}
              disabled={
                exceedsStaked || Number(lpTokenWithdraw.inputValue) === 0
              }
            >
              {t("Withdraw")}
            </Button>
          </Center>
        </div>
      </div>
    </div>
  )
}

export default StakePage
