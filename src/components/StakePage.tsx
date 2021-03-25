import "./StakePage.scss"

import { Button, Center } from "@chakra-ui/react"
import React, { ReactElement } from "react"

import TokenInput from "./TokenInput"
import TopMenu from "./TopMenu"
import { useTranslation } from "react-i18next"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  onConfirmTransaction: () => Promise<void>
  onChangeDepositValue: (tokenSymbol: string, value: string) => void
  // onChangeWithdrawValue: (tokenSymbol: string, value: string) => void
  lpTokenDeposit: {
    symbol: string
    name: string
    icon: string
    max: string
    inputValue: string
  }
  /**@todo uncomment when withdraw is enabled */
  // lpTokenWithdraw: {
  //   symbol: string
  //   name: string
  //   icon: string
  //   max: string
  //   inputValue: string
  // }
  exceedsWallet: boolean
}

/* eslint-enable @typescript-eslint/no-explicit-any */
const StakePage = (props: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    lpTokenDeposit,
    // lpTokenWithdraw,
    exceedsWallet,
    onChangeDepositValue,
    // onChangeWithdrawValue,
    onConfirmTransaction,
  } = props

  return (
    <div className="stake">
      <TopMenu activeTab={"stake"} />

      <div className="content">
        <div className="left">
          <div className="form">
            <h3>{t("stakeYourGondolaUSD")}</h3>
            {exceedsWallet ? (
              <div className="error">{t("depositBalanceExceeded")}</div>
            ) : null}
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
                void onConfirmTransaction()
                // setCurrentModal("review")
              }}
              /**@todo disabled = not exceed & valid */
              // disabled={exceedsWallet || !validDepositAmount}
              disabled={
                exceedsWallet || Number(lpTokenDeposit.inputValue) === 0
              }
            >
              {t("Stake")}
            </Button>
          </Center>
        </div>

        {/**@todo uncomment when withdraw is enabled */}
        {/* <div className="right">
          <div className="form">
            <h3>{t("Withdraw Gondola USD")}</h3>

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
                // setCurrentModal("review")
              }}
              disabled={!validDepositAmount}
            >
              {t("Withdraw")}
            </Button>
          </Center>
        </div> */}
      </div>
    </div>
  )
}

export default StakePage
