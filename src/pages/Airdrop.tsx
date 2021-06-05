import "./Airdrop.scss"

import React, { ReactElement } from "react"
import AirdropClaim from "../components/AirdropClaim"
import Footer from "../components/Footer"
import TopMenu from "../components/TopMenu"
import airdrops from "../constants/airdrops"
import { useActiveWeb3React } from "../hooks"

function Airdrop(): ReactElement {
  const { chainId } = useActiveWeb3React()
  return (
    <div className="airdropPage">
      <TopMenu activeTab={"airdrop"} />
      <div className="content">
        {airdrops.map((ad) => (
          <AirdropClaim
            airdropAddress={chainId && ad.address[chainId]}
            title={ad.name}
            key={chainId && ad.address[chainId]}
            balances={ad.balances}
          />
        ))}
        <Footer />
      </div>
    </div>
  )
}

export default Airdrop