/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { injected } from "../connectors"

export default function addNetwork(networkParams: any): void {
  void injected.getProvider().then((provider) => {
    if (!provider) return
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
