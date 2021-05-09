import "./Airdrop.scss"

import React, { ReactElement } from "react"
import AirdropClaim from "../components/AirdropClaim"
import Footer from "../components/Footer"
import TopMenu from "../components/TopMenu"
import airdrops from "../constants/airdrops"

function Airdrop(): ReactElement {
  return (
    <div className="airdropPage">
      <TopMenu activeTab={"airdrop"} />
      <div className="content">
        {airdrops.map((ad) => (
          <AirdropClaim
            airdropAddress={ad.address}
            title={ad.name}
            key={ad.address}
            balances={ad.balances}
          />
        ))}
        <Footer />
      </div>
    </div>
  )
}

export default Airdrop
