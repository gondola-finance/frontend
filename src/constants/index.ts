import daiLogo from "../assets/icons/dai.svg"
import gondolaLogo from "../assets/icons/brand_logo.png"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"

export const NetworkContextName = "NETWORK"
export const STABLECOIN_POOL_NAME = "Stablecoin Pool"
export type PoolName = typeof STABLECOIN_POOL_NAME

export const GAS_PRICE = 470

export enum ChainId {
  AVALANCHE = 43114,
  FUJI = 43113,
}

export class Token {
  readonly addresses: { [chainId in ChainId]: string }
  readonly decimals: number
  readonly symbol: string
  readonly name: string
  readonly icon: string
  readonly geckoId: string

  constructor(
    addresses: { [chainId in ChainId]: string },
    decimals: number,
    symbol: string,
    geckoId: string,
    name: string,
    icon: string,
  ) {
    this.addresses = addresses
    this.decimals = decimals
    this.symbol = symbol
    this.geckoId = geckoId
    this.name = name
    this.icon = icon
  }
}

export const BLOCK_TIME = 3000

export const MASTERCHEF_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "",
  [ChainId.FUJI]: "0x18D45d68de514cC81e822a2B6568289668B17267",
}

export const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x0FB54156B496b5a040b51A71817aED9e2927912E",
  [ChainId.FUJI]: "0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f",
}

export const GONDOLA_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "",
  [ChainId.FUJI]: "0xe9eAdD6873EacCF1b88c9eeC4dC9957FA88840c7",
}

export const STABLECOIN_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x4f6A43Ad7cba042606dECaCA730d4CE0A57ac62e",
  [ChainId.FUJI]: "0xa818a4E693132CFf3E9677474a1F57f0F7D2fe8d",
}

export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "AVALANCHETestAccounts.json",
  [ChainId.FUJI]: "FUJI.json",
}

export const STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "",
  [ChainId.FUJI]: "0x748e67353306b3183E8Bc9C27fE60a017E99d4D4",
}

export const STABLECOIN_SWAP_TOKEN = new Token(
  STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "saddleUSD",
  "saddleusd",
  "Saddle DAI/USDC/USDT",
  gondolaLogo,
)

// Stablecoins
const DAI_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0xba7deebbfc5fa1100fb055a87773e1e99cd3507a",
  [ChainId.FUJI]: "0xBF967f44dB44380CD38B76AaD850f8B2f98a29aD",
}
export const DAI = new Token(
  DAI_CONTRACT_ADDRESSES,
  18,
  "DAI",
  "dai",
  "Dai",
  daiLogo,
)

const USDC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "",
  [ChainId.FUJI]: "0x6275B63A4eE560004c34431e573314426906cee9",
}
export const USDC = new Token(
  USDC_CONTRACT_ADDRESSES,
  6,
  "USDC",
  "usd-coin",
  "USDC Coin",
  usdcLogo,
)

const USDT_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0xde3a24028580884448a5397872046a019649b084",
  [ChainId.FUJI]: "0xa6c062F1F8EAbEC4384bB2c2f65abBf710cd2998",
}
export const USDT = new Token(
  USDT_CONTRACT_ADDRESSES,
  6,
  "USDT",
  "tether",
  "Tether",
  usdtLogo,
)

export const STABLECOIN_POOL_TOKENS = [DAI, USDC, USDT]

// maps a symbol string to a token object
export const TOKENS_MAP: {
  [symbol: string]: Token
} = STABLECOIN_POOL_TOKENS.reduce(
  (acc, token) => ({ ...acc, [token.symbol]: token }),
  {},
)

export const POOLS_MAP: {
  [poolName in PoolName]: {
    lpToken: Token
    poolTokens: Token[]
  }
} = {
  [STABLECOIN_POOL_NAME]: {
    lpToken: STABLECOIN_SWAP_TOKEN,
    poolTokens: STABLECOIN_POOL_TOKENS,
  },
}

export const TRANSACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  SWAP: "SWAP",
}

export const POOL_FEE_PRECISION = 10

export const DEPLOYED_BLOCK: { [chainId in ChainId]: number } = {
  [ChainId.AVALANCHE]: 11656944,
  [ChainId.FUJI]: 10000,
}

export const POOL_STATS_URL: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "https://ipfs.saddle.exchange/pool-stats.json",
  [ChainId.FUJI]:
    "https://mehmeta-team-bucket.storage.fleek.co/pool-stats-dev.json",
}
