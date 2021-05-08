import "./Airdrop.scss"

import React, { ReactElement } from "react"
import AirdropClaim from "../components/AirdropClaim"
import Footer from "../components/Footer"
import TopMenu from "../components/TopMenu"

const airdrop1Balances = {
  "0x432BCB25b19dA14cE697AB3E966F87c90B851f78": "100",
}

function Airdrop(): ReactElement {
  return (
    <div className="airdropPage">
      <TopMenu activeTab={"airdrop"} />
      <div className="content">
        <AirdropClaim
          airdropAddress="0x520A5E14C9DC8404c300a7c16E434F78f166Dc4C"
          title="Airdrop #1"
          balances={airdrop1Balances}
        />
        <AirdropClaim
          airdropAddress="0x520A5E14C9DC8404c300a7c16E434F78f166Dc4C"
          title="Airdrop #2"
          balances={airdrop1Balances}
        />
        <Footer />
      </div>
    </div>
  )
}

export default Airdrop
