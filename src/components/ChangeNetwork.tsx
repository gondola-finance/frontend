import "./ChangeNetwork.scss"

import { CHAINS_LOGO, NETWORKS, SUPPORTED_CHAINS } from "../constants"
import React, { ReactElement } from "react"
import addNetwork from "../utils/addNetwork"

interface Props {
  onClose: () => void
}

function ChangeNetwork({ onClose }: Props): ReactElement {
  return (
    <div className="changeNetwork">
      <h3>Change network</h3>
      <div className="networkList">
        {SUPPORTED_CHAINS.map((chainId) => (
          <button
            key={NETWORKS[chainId].chainName}
            onClick={(): void => {
              addNetwork(NETWORKS[chainId])
              onClose()
            }}
          >
            <span>{NETWORKS[chainId].chainName}</span>
            <img src={CHAINS_LOGO[chainId]} alt="icon" className="icon" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ChangeNetwork
