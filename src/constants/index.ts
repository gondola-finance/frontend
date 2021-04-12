import { BigNumber } from "@ethersproject/bignumber"
import daiLogo from "../assets/icons/dai.svg"
import gondolaLogo from "../assets/icons/brand_logo.png"
import usdtLogo from "../assets/icons/usdt.svg"

export const NetworkContextName = "NETWORK"

export const STABLECOIN_POOL_NAME = "Stablecoin Pool"
export const STABLECOIN_POOL_ID = 1

export const GDL_POOL_NAME = "GDL Pool"
export const GDL_POOL_ID = 2

export type PoolName = typeof STABLECOIN_POOL_NAME | typeof GDL_POOL_NAME

export const GAS_PRICE = 470 // in nAVAX
export const GAS_PRICE_BIGNUMBER = BigNumber.from(GAS_PRICE).mul(
  BigNumber.from(10).pow(9),
)

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
  [ChainId.AVALANCHE]: "0x34C8712Cc527a8E6834787Bd9e3AD4F2537B0f50",
  [ChainId.FUJI]: "0x18D45d68de514cC81e822a2B6568289668B17267",
}

export const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x0FB54156B496b5a040b51A71817aED9e2927912E",
  [ChainId.FUJI]: "0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f",
}

export const GONDOLA_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0xD606199557c8Ab6F4Cc70bD03FaCc96ca576f142",
  [ChainId.FUJI]: "0xe9eAdD6873EacCF1b88c9eeC4dC9957FA88840c7",
}

export const STABLECOIN_SWAP_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x898B76a2F6755caecC661de8cf1f789611d50B6c",
  [ChainId.FUJI]: "0xa818a4E693132CFf3E9677474a1F57f0F7D2fe8d",
}

export const MERKLETREE_DATA: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "AVALANCHETestAccounts.json",
  [ChainId.FUJI]: "FUJI.json",
}

export const STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0xDd7b883dF594BFBca3779f75999D5a7D3DD39BBe",
  [ChainId.FUJI]: "0x748e67353306b3183E8Bc9C27fE60a017E99d4D4",
}

export const GDL_TOKEN = new Token(
  GONDOLA_ADDRESS,
  18,
  "GDL Token",
  "",
  "GDL",
  gondolaLogo,
)

export const STABLECOIN_SWAP_TOKEN = new Token(
  STABLECOIN_SWAP_TOKEN_CONTRACT_ADDRESSES,
  18,
  "gondolaUSD",
  "gondolausd",
  "Gondola DAI/USDT",
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

export const STABLECOIN_POOL_TOKENS = [DAI, USDT]

// maps a symbol string to a token object
export const TOKENS_MAP: {
  [symbol: string]: Token
} = [...STABLECOIN_POOL_TOKENS, STABLECOIN_SWAP_TOKEN, GDL_TOKEN].reduce(
  (acc, token) => ({ ...acc, [token.symbol]: token }),
  {},
)

// pools
export const POOLS_MAP: {
  [poolName in PoolName]: {
    poolId: number
    lpToken: Token
    poolTokens: Token[]
    isSwapPool: boolean
  }
} = {
  [STABLECOIN_POOL_NAME]: {
    poolId: STABLECOIN_POOL_ID,
    lpToken: STABLECOIN_SWAP_TOKEN,
    poolTokens: STABLECOIN_POOL_TOKENS,
    isSwapPool: true,
  },
  // GDL pool for staking, no swapping
  [GDL_POOL_NAME]: {
    poolId: GDL_POOL_ID,
    lpToken: GDL_TOKEN,
    poolTokens: [],
    isSwapPool: false,
  },
  /** @todo uncomment when a new pool is added */
  // [NEW_POOL_NAME]: {
  //   lpToken: POOL_LP_TOKEN,
  //   poolTokens: POOL_TOKENS,
  // },
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
