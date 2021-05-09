import { ChainId } from "."

interface AirdropCampaign {
  name: string
  address: { [chainId in ChainId]: string }
  balances: { [account: string]: string }
}

const AIRDROP1_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "",
  [ChainId.FUJI]: "0x63F9E21D943892269E5c460ae98d8C05588612A2",
}

const AIRDROP1 = {
  name: "Early Staking Airdrop",
  address: AIRDROP1_ADDRESS,
  balances: {
    "0x432BCB25b19dA14cE697AB3E966F87c90B851f78": "1B1AE4D6E2EF500000",
    "0x29c956B9a6a4095a72Fbb2c2Fa41CedE6739476B": "1B1AE4D6E2EF500000",
    "0x803f25859Be3878d80cb9B88cF18A13f8BBb1838": "1B1AE4D6E2EF500000",
    "0x60aAc7E9430383BfB849d691CaB1c3Ddbe729B5b": "1B1AE4D6E2EF500000",
  },
}

const airdrops: [AirdropCampaign] = [AIRDROP1]
export default airdrops
