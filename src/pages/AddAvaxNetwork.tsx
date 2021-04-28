/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "./AddAvaxNetwork.scss"

import { Button, Center } from "@chakra-ui/react"
import React, { ReactElement } from "react"
import Footer from "../components/Footer"
import TopMenu from "../components/TopMenu"
import { injected } from "../connectors"

export const AVALANCHE_MAINNET_PARAMS = {
  chainId: "0xa86a", // A 0x-prefixed hexadecimal chainId
  chainName: "Avalanche Mainnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
}

function addAvalancheNetwork() {
  void injected.getProvider().then((provider) => {
    if (!provider) return
    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [AVALANCHE_MAINNET_PARAMS],
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  })
}

function AddAvaxNetwork(): ReactElement {
  return (
    <div className="avaxNetPage">
      <TopMenu activeTab={"swap"} />
      <div className="content">
        <Center width="100%" py={6}>
          <div>
            To use Gondola Dapp, please have{" "}
            <a href="https://metamask.io/" target="__blank">
              metamask
            </a>{" "}
            installed and connect to the Avalanche network.
          </div>
        </Center>

        <Center width="100%" py={6}>
          <Button
            variant="primary"
            size="lg"
            onClick={(): void => {
              addAvalancheNetwork()
            }}
          >
            Switch to Avalanche chain
          </Button>
        </Center>
        <Footer />
      </div>
    </div>
  )
}

export default AddAvaxNetwork
