import "./TopMenu.scss"

import React, { ReactElement } from "react"

import { AppState } from "../state"
import { Link } from "react-router-dom"
import ThemeChanger from "./ThemeChanger"
import Web3Status from "./Web3Status"
import classNames from "classnames"
import logo from "../assets/icons/brand_logo.png"
import logoDarkMode from "../assets/icons/brand_logo_darkmode.png"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

interface Props {
  activeTab: string
}

function TopMenu({ activeTab }: Props): ReactElement {
  const { t } = useTranslation()
  const { isDarkMode } = useSelector((state: AppState) => state.user)

  return (
    <header className="top">
      <h1>
        <Link to="/">
          <img
            className="logo"
            alt="logo"
            src={isDarkMode ? logoDarkMode : logo}
          />
        </Link>
      </h1>

      <ul className="nav">
        <li>
          <Link to="/" className={classNames({ active: activeTab === "swap" })}>
            {t("swap")}
          </Link>
        </li>
        <li>
          <Link
            to="/deposit"
            className={classNames({ active: activeTab === "deposit" })}
          >
            {t("deposit")}
          </Link>
        </li>
        <li>
          <Link
            to="/withdraw"
            className={classNames({ active: activeTab === "withdraw" })}
          >
            {t("withdraw")}
          </Link>
        </li>
        <li>
          <Link
            to="/stake"
            className={classNames({ active: activeTab === "stake" })}
          >
            {t("Pool (Live)")}
          </Link>
        </li>
        <li>
          <Link
            to="/stakeinactive"
            className={classNames({ active: activeTab === "stakeinactive" })}
          >
            {t("Pool (Finished)")}
          </Link>
        </li>
        <li>
          <Link
            to="/airdrop"
            className={classNames({ active: activeTab === "airdrop" })}
          >
            {t("Airdrop")}
          </Link>
        </li>
        <li>
          <Link
            to="/risk"
            className={classNames({ active: activeTab === t("risk") })}
          >
            {t("risk")}
          </Link>
        </li>
      </ul>
      <Web3Status />
      <ThemeChanger />
    </header>
  )
}

export default TopMenu
