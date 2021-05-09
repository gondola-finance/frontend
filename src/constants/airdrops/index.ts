import { ChainId } from ".."
import airdrop1Balances from "./airdrop1.json"
// import airdrop2Balances from "./airdrop2.json"

interface AirdropCampaign {
  name: string
  address: { [chainId in ChainId]: string }
  balances: { [account: string]: string }
}

const AIRDROP1 = {
  name: "Early Staking Airdrop",
  address: {
    [ChainId.AVALANCHE]: "0x4A4C341206ce9B87AB2942D920Ea941eDfaB5a3b",
    [ChainId.FUJI]: "",
  },
  balances: airdrop1Balances,
}

// const AIRDROP2 = {
//   name: "Compensation Airdrop",
//   address: ,
//   balances: airdrop2Balances,
// }

const airdrops: [AirdropCampaign] = [AIRDROP1]
export default airdrops
