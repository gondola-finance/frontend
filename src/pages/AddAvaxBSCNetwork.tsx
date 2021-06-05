/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import "./AddAvaxBSCNetwork.scss"

import { Button, Center } from "@chakra-ui/react"
import { ChainId, NETWORKS } from "../constants"
import React, { ReactElement } from "react"
import Footer from "../components/Footer"
import TopMenu from "../components/TopMenu"
import addNetwork from "../utils/addNetwork"

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
              addNetwork(NETWORKS[ChainId.AVALANCHE])
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
              addNetwork(NETWORKS[ChainId.BSC])
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
