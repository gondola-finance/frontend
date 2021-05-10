import AIRDROP1_BALANCES from "./airdrop1.json"
import AIRDROP2_BALANCES from "./airdrop2.json"
import { ChainId } from ".."
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
  balances: AIRDROP1_BALANCES,
}

const AIRDROP2 = {
  name: "Compensation Airdrop",
  address: {
    [ChainId.AVALANCHE]: "0x2f0b8f614E470E6a21C53C9fda66e8091bBA7cc0",
    [ChainId.FUJI]: "",
  },
  balances: AIRDROP2_BALANCES,
}

const airdrops: AirdropCampaign[] = [AIRDROP1, AIRDROP2]
export default airdrops
