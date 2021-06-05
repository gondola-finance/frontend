/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "./AddAvaxBSCNetwork.scss"

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

export const BSC_MAINNET_PARAMS = {
  chainId: "0x38", // A 0x-prefixed hexadecimal chainId
  chainName: "Binance Smart Chain",
  nativeCurrency: {
    name: "Binance",
    symbol: "BNB",
    decimals: 8,
  },
  rpcUrls: [
    "https://bsc-dataseed.binance.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
  ],
  blockExplorerUrls: ["https://bscscan.com"],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addNetwork(networkParams: any) {
  void injected.getProvider().then((provider) => {
    console.log("hi")
    if (!provider) return
    console.log("hiii")

    provider
      .request({
        method: "wallet_addEthereumChain",
        params: [networkParams],
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  })
}

function AddAvaxBSCNetwork(): ReactElement {
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
            installed and connect to the Avalanche/Binance Smart Chain network.
          </div>
        </Center>

        <Center width="100%" pt={6}>
          <Button
            variant="primary"
            size="lg"
            onClick={(): void => {
              addNetwork(AVALANCHE_MAINNET_PARAMS)
            }}
          >
            Switch to Avalanche network
          </Button>
        </Center>

        <Center width="100%" py={6}>
          <Button
            variant="primary"
            size="lg"
            onClick={(): void => {
              addNetwork(BSC_MAINNET_PARAMS)
            }}
          >
            Switch to Binance Smart Chain
          </Button>
        </Center>
        <Footer />
      </div>
    </div>
  )
}

export default AddAvaxBSCNetwork
