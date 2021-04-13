import "./StakePage.scss"

import React, { ReactElement } from "react"
import Footer from "./Footer"
import StakePool from "./StakePool"
import TopMenu from "./TopMenu"

const StakePage = (): ReactElement => {
  return (
    <div className="stake">
      <TopMenu activeTab={"stake"} />

      <div className="content">
        <StakePool poolName="Stablecoin Pool" />
        <StakePool poolName="GDL Pool" />
        <Footer />
      </div>
    </div>
  )
}

export default StakePage
