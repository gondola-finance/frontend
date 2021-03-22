import "./ConfirmTransaction.scss"

import React, { ReactElement } from "react"
import logo from "../assets/icons/brand_logo.png"
import { useTranslation } from "react-i18next"

function ConfirmTransaction(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="confirmTransaction">
      <img style={{ width: "240px", height: "240px" }} alt="logo" src={logo} />
      <h3>
        {t("confirmTransaction")
          .split("\n")
          .map((line, key) => (
            <span key={key}>
              {line}
              <br />
            </span>
          ))}
      </h3>
    </div>
  )
}

export default ConfirmTransaction
