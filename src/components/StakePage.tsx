import "./StakePage.scss"

import React, { ReactElement } from "react"
import {
  ZDAI_DAI_POOL_NAME,
  ZETH_ETH_POOL_NAME,
  ZUSDT_USDT_POOL_NAME,
} from "../constants"

import Footer from "./Footer"
import StakePool from "./StakePool"
import TopMenu from "./TopMenu"

const StakePage = (): ReactElement => {
  return (
    <div className="stake">
      <TopMenu activeTab={"stake"} />

      <div className="content">
        <StakePool poolName={ZDAI_DAI_POOL_NAME} />
        <StakePool poolName={ZETH_ETH_POOL_NAME} />
        <StakePool poolName={ZUSDT_USDT_POOL_NAME} />
        <StakePool poolName="GDL Pool" />
        <Footer />
      </div>
    </div>
  )
}

export default StakePage
