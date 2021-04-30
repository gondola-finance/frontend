import { BigNumber } from "@ethersproject/bignumber"
import daiLogo from "../assets/icons/dai.svg"
import ethLogo from "../assets/icons/eth.svg"
import gondolaLogo from "../assets/icons/brand_logo.png"
import usdtLogo from "../assets/icons/usdt.svg"

export const NetworkContextName = "NETWORK"

export const GAS_PRICE_DEFAULT = true // use default gas price from metamask. if false, use GAS_PRICE_BIGNUMBER
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
  [ChainId.FUJI]: "0x1C6AfEbb1621a35572C4cfBce00ccfB88B047509",
}

export const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x0FB54156B496b5a040b51A71817aED9e2927912E",
  [ChainId.FUJI]: "0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f",
}

export const GONDOLA_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0xD606199557c8Ab6F4Cc70bD03FaCc96ca576f142",
  [ChainId.FUJI]: "0x899A5336c9F9335f387cdFCC59aB02a7c6A3128F",
}

// tokens

export const ETH = new Token(
  {
    [ChainId.AVALANCHE]: "0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15",
    [ChainId.FUJI]: "",
  },
  18,
  "ETH",
  "ethereum",
  "ETH",
  ethLogo,
)

export const ZETH = new Token(
  {
    [ChainId.AVALANCHE]: "0xf6f3eea905ac1da6f6dd37d06810c6fcb0ef5183",
    [ChainId.FUJI]: "",
  },
  18,
  "zETH",
  "ethereum",
  "zETH",
  ethLogo,
)

export const DAI = new Token(
  {
    [ChainId.AVALANCHE]: "0xba7deebbfc5fa1100fb055a87773e1e99cd3507a",
    [ChainId.FUJI]: "0x4D0e868E77895B697DBa91cb969C26E1fA2F111c",
  },
  18,
  "DAI",
  "dai",
  "DAI",
  daiLogo,
)

export const ZDAI = new Token(
  {
    [ChainId.AVALANCHE]: "0x12f108e6138d4a9c58511e042399cf8f90d5673f",
    [ChainId.FUJI]: "",
  },
  18,
  "zDAI",
  "dai",
  "zDAI",
  daiLogo,
)

export const USDT = new Token(
  {
    [ChainId.AVALANCHE]: "0xde3a24028580884448a5397872046a019649b084",
    [ChainId.FUJI]: "0x9ccCC500A9E025450D1823af61fbc2e6586A4Ce3",
  },
  6,
  "USDT",
  "tether",
  "USDT",
  usdtLogo,
)

export const ZUSDT = new Token(
  {
    [ChainId.AVALANCHE]: "0x650cecafe61f3f65edd21efacca18cc905eef0b7",
    [ChainId.FUJI]: "",
  },
  6,
  "zUSDT",
  "tether",
  "zUSDT",
  usdtLogo,
)

// pool contracts addresses

export const ZUSDT_USDT_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x3CE2B891071054ee10d4b5eD5a9446f9016F90d8",
  [ChainId.FUJI]: "",
}

export const ZDAI_DAI_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x9D43f28C5Fce24D0c8B653E5c5859E0421Af7783",
  [ChainId.FUJI]: "",
}

export const ZETH_ETH_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0xed986f982269e0319F710EC270875dE2b2A443d2",
  [ChainId.FUJI]: "",
}

// pool lp tokens

export const ZUSDT_USDT_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xE586dB7Db75B87A3E84110a73b99960F5f106c6A",
    [ChainId.FUJI]: "",
  },
  18,
  "USDT LP",
  "gondolaUSDT",
  "Gondola zUSDT/USDT LP",
  gondolaLogo,
)

export const ZDAI_DAI_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x2036C0EB5C42eF7f1ca06dF57D07F79eb3a2e0C8",
    [ChainId.FUJI]: "",
  },
  18,
  "DAI LP",
  "gondolaDAI",
  "Gondola zDAI/DAI LP",
  gondolaLogo,
)

export const ZETH_ETH_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xc37ECFA7Bbf1dF92Da7C4A3d92d8CF8657D1FF7f",
    [ChainId.FUJI]: "",
  },
  18,
  "ETH LP",
  "gondolaETH",
  "Gondola zETH/ETH LP",
  gondolaLogo,
)

export const GDL_TOKEN = new Token(
  GONDOLA_ADDRESS,
  18,
  "GDL",
  "",
  "GDL",
  gondolaLogo,
)

export const PANGOLIN_AVAX_GDL_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xc5ab0c94bc88b98f55f4e21c1474f67ab2329cfd",
    [ChainId.FUJI]: "",
  },
  18,
  "PANGOLIN AVAX-GDL LP",
  "",
  "PANGOLIN AVAX-GDL LP",
  gondolaLogo,
)

export const GDL_POOL_NAME = "GDL Pool"
export const GDL_POOL_ID = 2

export const ZDAI_DAI_POOL_NAME = "zDAI-DAI Pool"
export const ZDAI_DAI_POOL_ID = 9

export const ZUSDT_USDT_POOL_NAME = "zUSDT-USDT Pool"
export const ZUSDT_USDT_POOL_ID = 8

export const ZETH_ETH_POOL_NAME = "zETH-ETH Pool"
export const ZETH_ETH_POOL_ID = 7

export const PANGOLIN_AVAX_GDL_POOL_NAME = "Pangolin AVAX-GDL Pool"
export const PANGOLIN_AVAX_GDL_POOL_ID = 6

export type PoolName =
  | typeof GDL_POOL_NAME
  | typeof ZDAI_DAI_POOL_NAME
  | typeof ZUSDT_USDT_POOL_NAME
  | typeof ZETH_ETH_POOL_NAME
  | typeof PANGOLIN_AVAX_GDL_POOL_NAME

export const ZUSDT_USDT_POOL_TOKENS = [USDT, ZUSDT]
export const ZDAI_DAI_POOL_TOKENS = [DAI, ZDAI]
export const ZETH_ETH_POOL_TOKENS = [ETH, ZETH]

// maps a symbol string to a token object
export const TOKENS_MAP: {
  [symbol: string]: Token
} = [
  GDL_TOKEN,
  PANGOLIN_AVAX_GDL_TOKEN,
  ...ZUSDT_USDT_POOL_TOKENS,
  ZUSDT_USDT_SWAP_TOKEN,
  ...ZDAI_DAI_POOL_TOKENS,
  ZDAI_DAI_SWAP_TOKEN,
  ...ZETH_ETH_POOL_TOKENS,
  ZETH_ETH_SWAP_TOKEN,
].reduce((acc, token) => ({ ...acc, [token.symbol]: token }), {})

export type POOL = {
  poolId: number
  lpToken: Token
  poolTokens: Token[]
  isSwapPool: boolean
}

// pools
export const POOLS_MAP: {
  [poolName in PoolName]: POOL
} = {
  // GDL pool for staking, no swapping
  [GDL_POOL_NAME]: {
    poolId: GDL_POOL_ID,
    lpToken: GDL_TOKEN,
    poolTokens: [],
    isSwapPool: false,
  },
  [ZDAI_DAI_POOL_NAME]: {
    poolId: ZDAI_DAI_POOL_ID,
    lpToken: ZDAI_DAI_SWAP_TOKEN,
    poolTokens: ZDAI_DAI_POOL_TOKENS,
    isSwapPool: true,
  },
  [ZUSDT_USDT_POOL_NAME]: {
    poolId: ZUSDT_USDT_POOL_ID,
    lpToken: ZUSDT_USDT_SWAP_TOKEN,
    poolTokens: ZUSDT_USDT_POOL_TOKENS,
    isSwapPool: true,
  },
  [ZETH_ETH_POOL_NAME]: {
    poolId: ZETH_ETH_POOL_ID,
    lpToken: ZETH_ETH_SWAP_TOKEN,
    poolTokens: ZETH_ETH_POOL_TOKENS,
    isSwapPool: true,
  },
  [PANGOLIN_AVAX_GDL_POOL_NAME]: {
    poolId: PANGOLIN_AVAX_GDL_POOL_ID,
    lpToken: PANGOLIN_AVAX_GDL_TOKEN,
    poolTokens: [],
    isSwapPool: false,
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
