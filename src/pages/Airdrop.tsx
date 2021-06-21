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
        <div className="airdropsList">
          {chainId &&
            airdrops[chainId].map((ad) => (
              <AirdropClaim
                airdropAddress={chainId && ad.address[chainId]}
                title={ad.name}
                key={chainId && ad.address[chainId]}
                balances={ad.balances}
              />
            ))}

          {(!chainId || airdrops[chainId].length === 0) && (
            <div> No airdrop is available at the moment.</div>
          )}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Airdrop
