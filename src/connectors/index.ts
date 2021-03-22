import { ChainId } from "../constants"
import { InjectedConnector } from "@web3-react/injected-connector"
import { NetworkConnector } from "@web3-react/network-connector"
import { Web3Provider } from "@ethersproject/providers"

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
export const NETWORK_CHAIN_ID: number = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID)
  : ChainId.AVALANCHE

if (typeof NETWORK_URL === "undefined") {
  throw new Error(
    `REACT_APP_NETWORK_URL must be a defined environment variable`,
  )
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  defaultChainId: NETWORK_CHAIN_ID,
})

// eslint-disable-next-line @typescript-eslint/unbound-method
const { getProvider } = network

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(getProvider))
}

export const injected = new InjectedConnector({
  // mainnet, fuji
  supportedChainIds: [ChainId.AVALANCHE, ChainId.FUJI],
})
