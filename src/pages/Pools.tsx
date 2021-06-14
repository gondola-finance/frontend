import "./Pools.scss"

import React, { ReactElement } from "react"
import {
  ZBTC_WBTC_POOL_NAME,
  ZDAI_DAI_POOL_NAME,
  ZETH_ETH_POOL_NAME,
  ZUSDT_USDT_POOL_NAME,
} from "../constants"
import Footer from "../components/Footer"
import PoolOverview from "../components/PoolOverview"

import TopMenu from "../components/TopMenu"
import usePoolData from "../hooks/usePoolData"
import { useTranslation } from "react-i18next"

function Pools({
  action,
}: {
  action: "deposit" | "withdraw" | "swap"
}): ReactElement | null {
  const [btcPoolData] = usePoolData(ZBTC_WBTC_POOL_NAME)
  const [daiPoolData] = usePoolData(ZDAI_DAI_POOL_NAME)
  const [ethPoolData] = usePoolData(ZETH_ETH_POOL_NAME)
  const [usdtPoolData] = usePoolData(ZUSDT_USDT_POOL_NAME)
  const { t } = useTranslation()

  return (
    <div className="poolsPage">
      <TopMenu activeTab={action} />
      <div className="content">
        <h3 className="title">{t("Select a Pool")}</h3>
        <div className="poolsList">
          <PoolOverview data={daiPoolData} to={`/${action}/dai`} />
          <PoolOverview data={ethPoolData} to={`/${action}/eth`} />
          <PoolOverview data={usdtPoolData} to={`/${action}/usdt`} />
          <PoolOverview data={btcPoolData} to={`/${action}/btc`} />
        </div>
      </div>
      <div className="footerDiv">
        <Footer />
      </div>
    </div>
  )
}

export default Pools
