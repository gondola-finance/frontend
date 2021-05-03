import "./StakePage.scss"

import {
  GDL_POOL_NAME,
  PANGOLIN_AVAX_GDL_POOL_NAME,
  ZDAI_DAI_POOL_NAME,
  ZERO_GDL_POOL_NAME,
  ZETH_ETH_POOL_NAME,
  ZUSDT_USDT_POOL_NAME,
} from "../constants"

import React, { ReactElement } from "react"
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
        <StakePool poolName={GDL_POOL_NAME} />
        <StakePool poolName={PANGOLIN_AVAX_GDL_POOL_NAME} />
        <StakePool poolName={ZERO_GDL_POOL_NAME} />
        <Footer />
      </div>
    </div>
  )
}

export default StakePage
