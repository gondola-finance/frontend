import "./SwapForm.scss"

import React, { ReactElement } from "react"

import { BigNumber } from "@ethersproject/bignumber"
import Button from "./Button"
import { ChainId } from "../constants"
import ToolTip from "./ToolTip"
import classNames from "classnames"
import { formatBNToString } from "../utils"
import { formatUnits } from "@ethersproject/units"
import { useActiveWeb3React } from "../hooks"
import { useTranslation } from "react-i18next"

interface Props {
  isSwapFrom: boolean
  tokens: Array<{
    name: string
    value: BigNumber
    icon: string
    symbol: string
    decimals: { [chainId in ChainId]: number }
  }>
  selected: string
  inputValue: string
  onChangeSelected: (tokenSymbol: string) => void
  onChangeAmount?: (value: string) => void
}

function SwapForm({
  tokens,
  selected,
  inputValue,
  isSwapFrom,
  onChangeSelected,
  onChangeAmount,
}: Props): ReactElement {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  return (
    <div className="swapForm">
      <div className="head">
        <h4 className="title">{isSwapFrom ? t("from") : t("to")}</h4>
        <div className="inputField">
          <input
            autoComplete="off"
            autoCorrect="off"
            type="text"
            className={classNames({ hasMaxButton: isSwapFrom })}
            value={inputValue}
            placeholder="0.0"
            spellCheck="false"
            onChange={(e): void => onChangeAmount?.(e.target.value)}
            onFocus={(e: React.ChangeEvent<HTMLInputElement>): void => {
              if (isSwapFrom) {
                e.target.select()
              }
            }}
            readOnly={!isSwapFrom}
          />
          {isSwapFrom ? (
            <div className="buttonWrapper">
              <Button
                size="small"
                kind="ternary"
                onClick={(): void => {
                  const token = tokens.find((t) => t.symbol === selected)
                  if (token && onChangeAmount) {
                    onChangeAmount(
                      formatUnits(
                        token.value,
                        token.decimals[chainId || ChainId["FUJI"]],
                      ),
                    )
                  }
                }}
              >
                {t("max")}
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <ul className="tokenList">
        {tokens.map(({ symbol, value, icon, name, decimals }) => {
          const formattedShortBalance = formatBNToString(
            value,
            decimals[chainId || ChainId["FUJI"]],
            6,
          )
          const formattedLongBalance = formatBNToString(
            value,
            decimals[chainId || ChainId["FUJI"]],
          )
          return (
            <div
              className={classNames("tokenListItem", {
                active: selected === symbol,
              })}
              key={symbol}
              onClick={(): void => onChangeSelected(symbol)}
            >
              <img className="tokenIcon" src={icon} alt="icon" />
              <span className="tokenName">{name}</span>
              {isSwapFrom ? (
                <span className="tokenValue">
                  <ToolTip content={formattedLongBalance}>
                    {formattedShortBalance}
                  </ToolTip>
                </span>
              ) : null}
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default SwapForm
