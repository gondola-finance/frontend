import "./TokenInput.scss"

import React, { ReactElement } from "react"

import Button from "./Button"
import { TOKENS_MAP } from "../constants"
import classNames from "classnames"
import { useTranslation } from "react-i18next"

interface Props {
  symbol: string
  icon: string
  max?: string
  max2?: string
  maxButton1Name?: string
  maxButton2Name?: string
  inputValue: string
  onChange: (value: string) => void
  disabled?: boolean
}

function TokenInput({
  symbol,
  icon,
  max,
  max2,
  maxButton1Name,
  maxButton2Name,
  inputValue,
  onChange,
  disabled,
}: Props): ReactElement {
  const { t } = useTranslation()
  function onClickMax(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    onChange(String(max))
  }
  function onClickMax2(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    onChange(String(max2))
  }
  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const { decimals } = TOKENS_MAP[symbol]
    const parsedValue = parseFloat("0" + e.target.value)
    const periodIndex = e.target.value.indexOf(".")
    const isValidInput = e.target.value === "" || !isNaN(parsedValue)
    const isValidPrecision =
      periodIndex === -1 || e.target.value.length - 1 - periodIndex <= decimals
    if (isValidInput && isValidPrecision) {
      // don't allow input longer than the token allows
      onChange(e.target.value)
    }
  }

  return (
    <div className="tokenInput">
      <img alt="icon" style={{ width: "20px" }} src={icon} />
      <span>{symbol}</span>
      <input
        disabled={disabled ? true : false}
        className={classNames({ hasMaxButton: max })}
        value={inputValue}
        onChange={onChangeInput}
        placeholder={max || "0"}
        onFocus={(e: React.ChangeEvent<HTMLInputElement>): void =>
          e.target.select()
        }
      />
      <div className="tokenBtnContainer">
        {max != null && (
          <Button
            onClick={onClickMax}
            size="small"
            kind="ternary"
            disabled={disabled}
          >
            {maxButton1Name || t("max")}
          </Button>
        )}
        {max2 != null && (
          <div style={{ marginLeft: 10 }}>
            <Button
              onClick={onClickMax2}
              size="small"
              kind="ternary"
              disabled={disabled}
            >
              {maxButton2Name || t("max")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenInput
