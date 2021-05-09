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
    [ChainId.AVALANCHE]: "0xc3791e0D7282243D36cC18BE295F38B7bfde8570",
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
