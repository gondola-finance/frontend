import { BigNumber } from "@ethersproject/bignumber"
import avalancheLogo from "../assets/icons/network/avalanche.png"
import bscLogo from "../assets/icons/network/binanceSmartChain.png"
import btcLogo from "../assets/icons/wbtc.svg"
import daiLogo from "../assets/icons/dai.svg"
import ethLogo from "../assets/icons/eth.svg"
import gondolaLogo from "../assets/icons/brand_logo.png"
import tsdLogo from "../assets/icons/tsd.png"
import usdcLogo from "../assets/icons/usdc.svg"
import usdtLogo from "../assets/icons/usdt.svg"
import zeroLogo from "../assets/icons/icon_zero.png"
export const NetworkContextName = "NETWORK"

export const GAS_PRICE_DEFAULT = true // use default gas price from metamask. if false, use GAS_PRICE_BIGNUMBER
export const GAS_PRICE = 470 // in nAVAX
export const GAS_PRICE_BIGNUMBER = BigNumber.from(GAS_PRICE).mul(
  BigNumber.from(10).pow(9),
)

export enum ChainId {
  AVALANCHE = 43114,
  FUJI = 43113,
  BSC = 56,
}

export const SUPPORTED_CHAINS = [ChainId.AVALANCHE, ChainId.BSC]
export class Network {
  readonly chainId: string
  readonly chainName: string
  readonly rpcUrls: string[]
  readonly blockExplorerUrls: string[]
  readonly nativeCurrency: { name: string; symbol: string; decimals: number }

  constructor(
    chainId: string,
    chainName: string,
    currencyName: string,
    currencySymbol: string,
    currencyDecimals: number,
    rpcUrls: string[],
    blockExplorerUrls: string[],
  ) {
    this.chainId = chainId
    this.chainName = chainName
    this.rpcUrls = rpcUrls
    this.blockExplorerUrls = blockExplorerUrls
    this.nativeCurrency = {
      name: currencyName,
      symbol: currencySymbol,
      decimals: currencyDecimals,
    }
  }
}

export const NETWORKS: {
  [id in ChainId]: Network
} = {
  [ChainId.AVALANCHE]: new Network(
    "0xa86a",
    "Avalanche",
    "Avalanche",
    "AVAX",
    18,
    ["https://api.avax.network/ext/bc/C/rpc"],
    ["https://cchain.explorer.avax.network/"],
  ),
  [ChainId.FUJI]: new Network(
    "0xa869",
    "Avalanche Testnet",
    "Avalanche",
    "AVAX",
    18,
    ["https://api.avax.network/ext/bc/C/rpc"],
    ["https://cchain.explorer.avax-test.network/"],
  ),
  [ChainId.BSC]: new Network(
    "0x38",
    "Binance Smart Chain",
    "Binance",
    "BNB",
    8,
    [
      "https://bsc-dataseed.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
    ],
    ["https://bscscan.com"],
  ),
}

export const CHAINS_LOGO: { [id in ChainId]: string } = {
  [ChainId.AVALANCHE]: avalancheLogo,
  [ChainId.BSC]: bscLogo,
  [ChainId.FUJI]: avalancheLogo,
}

export class Token {
  readonly addresses: { [chainId in ChainId]: string }
  readonly decimals: { [chainId in ChainId]: number }
  readonly symbol: string
  readonly name: string
  readonly icon: string
  readonly geckoId: string

  constructor(
    addresses: { [chainId in ChainId]: string },
    decimals: { [chainId in ChainId]: number },
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
  [ChainId.BSC]: "",
}

export const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x0FB54156B496b5a040b51A71817aED9e2927912E",
  [ChainId.FUJI]: "0xb465Fd2d9C71d5D6e6c069aaC9b4E21c69aAA78f",
  [ChainId.BSC]: "",
}

export const GONDOLA_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0xD606199557c8Ab6F4Cc70bD03FaCc96ca576f142",
  [ChainId.FUJI]: "0x899A5336c9F9335f387cdFCC59aB02a7c6A3128F",
  [ChainId.BSC]: "",
}

export const TSD_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.AVALANCHE]: "0x4fbf0429599460D327BD5F55625E30E4fC066095",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

// tokens

export const ETH = new Token(
  {
    [ChainId.AVALANCHE]: "0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "ETH",
  "ethereum",
  "ETH",
  ethLogo,
)

export const ZETH = new Token(
  {
    [ChainId.AVALANCHE]: "0xf6f3eea905ac1da6f6dd37d06810c6fcb0ef5183",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0x7c815bbc21fed2b97ca163552991a5c30d6a2336",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "zETH",
  "ethereum",
  "zETH",
  ethLogo,
)

export const DWETH = new Token(
  {
    [ChainId.AVALANCHE]: "0xbF61c387c9A9535140eCC572eeB22C7aa3FcF7A9",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DWETH",
  "ethereum",
  "DWETH",
  ethLogo,
)

export const WETHE = new Token(
  {
    [ChainId.AVALANCHE]: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "WETHE",
  "ethereum",
  "WETH.e",
  ethLogo,
)
export const WBTC = new Token(
  {
    [ChainId.AVALANCHE]: "0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 8,
    [ChainId.FUJI]: 8,
    [ChainId.BSC]: 8,
  },
  "WBTC",
  "bitcoin",
  "WBTC",
  btcLogo,
)

export const WBTCE = new Token(
  {
    [ChainId.AVALANCHE]: "0x50b7545627a5162f82a992c33b87adc75187b218",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 8,
    [ChainId.FUJI]: 8,
    [ChainId.BSC]: 8,
  },
  "WBTCE",
  "bitcoin",
  "WBTC.e",
  btcLogo,
)
export const ZBTC = new Token(
  {
    [ChainId.AVALANCHE]: "0xc4f4Ff34A2e2cF5e4c892476BB2D056871125452",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 8,
    [ChainId.FUJI]: 8,
    [ChainId.BSC]: 8,
  },
  "zBTC",
  "bitcoin",
  "zBTC",
  btcLogo,
)

export const DAI = new Token(
  {
    [ChainId.AVALANCHE]: "0xba7deebbfc5fa1100fb055a87773e1e99cd3507a",
    [ChainId.FUJI]: "0x4D0e868E77895B697DBa91cb969C26E1fA2F111c",
    [ChainId.BSC]: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DAI",
  "dai",
  "DAI",
  daiLogo,
)

export const DAIE = new Token(
  {
    [ChainId.AVALANCHE]: "0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DAIE",
  "dai",
  "DAI.e",
  daiLogo,
)

export const ZDAI = new Token(
  {
    [ChainId.AVALANCHE]: "0x12f108e6138d4a9c58511e042399cf8f90d5673f",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0x7e7baff135c42ed90c0edab16eae48ecea417018",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "zDAI",
  "dai",
  "zDAI",
  daiLogo,
)

export const USDT = new Token(
  {
    [ChainId.AVALANCHE]: "0xde3a24028580884448a5397872046a019649b084",
    [ChainId.FUJI]: "0x9ccCC500A9E025450D1823af61fbc2e6586A4Ce3",
    [ChainId.BSC]: "0x55d398326f99059ff775485246999027b3197955",
  },
  {
    [ChainId.AVALANCHE]: 6,
    [ChainId.FUJI]: 6,
    [ChainId.BSC]: 18,
  },
  "USDT",
  "tether",
  "USDT",
  usdtLogo,
)

export const ZUSDT = new Token(
  {
    [ChainId.AVALANCHE]: "0x650cecafe61f3f65edd21efacca18cc905eef0b7",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0xbf7e0761417f49b3fafae564c842823f5f79db15",
  },
  {
    [ChainId.AVALANCHE]: 6,
    [ChainId.FUJI]: 6,
    [ChainId.BSC]: 6,
  },
  "zUSDT",
  "tether",
  "zUSDT",
  usdtLogo,
)
export const USDTE = new Token(
  {
    [ChainId.AVALANCHE]: "0xc7198437980c041c805a1edcba50c1ce5db95118",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 6,
    [ChainId.FUJI]: 6,
    [ChainId.BSC]: 6,
  },
  "USDTE",
  "tether",
  "USDT.e",
  usdtLogo,
)
export const DUSDT = new Token(
  {
    [ChainId.AVALANCHE]: "0x017801B52F3e40178C75C4B4f19f1a0c8F8A0b78",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 6,
    [ChainId.FUJI]: 6,
    [ChainId.BSC]: 6,
  },
  "DUSDT",
  "tether",
  "DUSDT",
  usdtLogo,
)

export const USDC = new Token(
  {
    [ChainId.AVALANCHE]: "",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USDC",
  "usd-coin",
  "USDC",
  usdcLogo,
)

export const ZUSDC = new Token(
  {
    [ChainId.AVALANCHE]: "",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0x4022afeb287052e6e587d39ba99f79cafc47b570",
  },
  {
    [ChainId.AVALANCHE]: 6,
    [ChainId.FUJI]: 6,
    [ChainId.BSC]: 6,
  },
  "zUSDC",
  "usd-coin",
  "zUSDC",
  usdcLogo,
)

export const RENBTC = new Token(
  {
    [ChainId.AVALANCHE]: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 8,
    [ChainId.FUJI]: 8,
    [ChainId.BSC]: 8,
  },
  "RenBTC",
  "bitcoin",
  "RenBTC",
  btcLogo,
)

export const TSD = new Token(
  TSD_ADDRESS,
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "TSD",
  "tsd",
  "TSD",
  tsdLogo,
)

export const USDCE = new Token(
  {
    [ChainId.AVALANCHE]: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 6,
    [ChainId.FUJI]: 6,
    [ChainId.BSC]: 6,
  },
  "USDCE",
  "usd-coin",
  "USDC.e",
  usdcLogo,
)

// pool contracts addresses

export const DUSDT_USDT_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x0074fB889F98D177B86619A7f19b5d3C26a1109A",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const ZUSDT_USDT_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x3CE2B891071054ee10d4b5eD5a9446f9016F90d8",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "0xC9777e24dfE6eB3E72f78AE115c9C586afc33DE0",
}

export const ZUSDC_USDC_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "0x793ce655d5908318A65E89B3e0570BC72e60E23e",
}

export const ZBTC_WBTC_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x6212db4C20A1870d232aaFd58c65d8B56490fDD7",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const ZDAI_DAI_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x9D43f28C5Fce24D0c8B653E5c5859E0421Af7783",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const ZETH_ETH_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0xed986f982269e0319F710EC270875dE2b2A443d2",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "0x9c14f329E30e59cA5fDd0DbDA95Fcd58b790d1F7",
}

export const RENBTC_WBTC_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x3121c59AFfb3c5Df5fA8EeEFb5064d1fC1166A0F",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const DWETH_ETH_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0xA160Db9366E7DaB6399D2E77Dcc5c89F15E9B4f4",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const USDT_DAI_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x8ce4d6749684aEe27d7f75cff18fa9A4cC8Fe9b3",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const ETH_WETHE_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x7408DE8334C03321AFFF953F1318d0B04cdF2601",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const WBTC_WBTCE_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x0792ca636c917177AB534BD2D86aDa5535D97369",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const USDT_USDTE_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0xAE5a60BB105e38A4986017A711c6A6CC1D1a0f36",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const DAI_DAIE_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x159E2fE53E415B163bC5846DD70DDD2BC8d8F018",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const DAIE_USDTE_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0xCF97190fAAfea63523055eBd139c008cdb4468eB",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const USDCE_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x4B941276eb39d114c89514791D073A085aCBa3c0",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

export const TSD_SWAP_CONTRACT_ADDRESSES: {
  [chainId in ChainId]: string
} = {
  [ChainId.AVALANCHE]: "0x83e4eE7b24bA92b3437F382b0b3C1BFA10445354",
  [ChainId.FUJI]: "",
  [ChainId.BSC]: "",
}

// pool lp tokens

export const DUSDT_USDT_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x431E163ded08c6167055960c1C128cfc2abE7C86",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DUSDT LP",
  "gondolaDUSDT",
  "Gondola DUSDT/USDT LP",
  gondolaLogo,
)
export const USDT_DAI_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x4b9C05D3E6cD5D2F19D1c7ee9a7efe847f347770",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USDT DAI LP",
  "gondolaUSDTDAI",
  "Gondola USDT/DAI LP",
  gondolaLogo,
)

export const WBTC_WBTCE_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x5CC6Ca58Ae2c07b54B732fbAEE046176cbe743BC",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "WBTC.e LP",
  "gondolaWBTCE",
  "Gondola WBTC/WBTC.e LP",
  gondolaLogo,
)

export const ETH_WETHE_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xa5AbEeA9f5fb7850038e91aeb5F3f5ffdeeDF7B7",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "WETH.e LP",
  "gondolaWETHE",
  "Gondola ETH/WETH.e LP",
  gondolaLogo,
)

export const USDT_USDTE_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x56dF40732eC09bd9BEA6B3eb73E48E00D2c537AB",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USDT.e LP",
  "gondolaUSDTE",
  "Gondola USDT/USDT.e LP",
  gondolaLogo,
)

export const DAI_DAIE_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xF2fC2836882bCf7eb00Feb05729a248106fBfDdE",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DAI.e LP",
  "gondolaDAIE",
  "Gondola DAI/DAI.e LP",
  gondolaLogo,
)

export const DAIE_USDTE_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xD7D4a4c67E9C1f5a913Bc38E87e228f4B8820e8A",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DAI.e USDT.e LP",
  "gondolaDAIEUSDTE",
  "Gondola DAI.e/USDT.e LP",
  gondolaLogo,
)

export const ZUSDT_USDT_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xE586dB7Db75B87A3E84110a73b99960F5f106c6A",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0xcEECDfA4bfe0De6E157289F5b6507A62Ae5A0cFB",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USDT LP",
  "gondolaUSDT",
  "Gondola zUSDT/USDT LP",
  gondolaLogo,
)

export const ZUSDC_USDC_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0xE16126Be6Dc796eaE4689B292A8A1D43572496e7",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USCT LP",
  "gondolaUSDC",
  "Gondola zUSDC/USDC LP",
  gondolaLogo,
)

export const ZBTC_WBTC_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x078e3dDe72B3FeF804a5d5DBb133D537f9D9805F",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "BTC LP",
  "gondolaBTC",
  "Gondola zBTC/WBTC LP",
  gondolaLogo,
)

export const ZDAI_DAI_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x2036C0EB5C42eF7f1ca06dF57D07F79eb3a2e0C8",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DAI LP",
  "gondolaDAI",
  "Gondola zDAI/DAI LP",
  gondolaLogo,
)

export const ZETH_ETH_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xc37ECFA7Bbf1dF92Da7C4A3d92d8CF8657D1FF7f",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "0x30d2BA15eA9333D67b884dCBa8A25Ef191Ff7461",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "ETH LP",
  "gondolaETH",
  "Gondola zETH/ETH LP",
  gondolaLogo,
)

export const DWETH_ETH_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x0Ca4eb327a9515406a7Ea49230C696C31DFc2404",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "DWETH LP",
  "gondolaDWETH",
  "Gondola DWETH/ETH LP",
  gondolaLogo,
)

export const RENBTC_WBTC_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x4760Cf6cff26828b3D8b9AFc28230eda50C73CBc",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "RenBTC-WBTC LP",
  "",
  "RenBTC-WBTC LP",
  gondolaLogo,
)

export const GDL_TOKEN = new Token(
  GONDOLA_ADDRESS,
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "GDL",
  "",
  "GDL",
  gondolaLogo,
)

export const PANGOLIN_AVAX_GDL_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xc5ab0c94bc88b98f55f4e21c1474f67ab2329cfd",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "PANGOLIN AVAX-GDL LP",
  "",
  "PANGOLIN AVAX-GDL LP",
  gondolaLogo,
)

export const ZERO_GDL_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x158ede7f02475aa067fa35f4ff26c6cd86129429",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "ZERO-GDL LP",
  "",
  "ZERO-GDL LP",
  zeroLogo,
)

export const USDCE_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0x4dc5a6308338e540AA97FAaB7fd2E03876075413",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USDT.e-USDC.e LP",
  "",
  "USDT.e-USDC.e LP",
  gondolaLogo,
)

export const TSD_SWAP_TOKEN = new Token(
  {
    [ChainId.AVALANCHE]: "0xbE29D10EBDfBd5A82Eb54D4db4a224c060BDBD96",
    [ChainId.FUJI]: "",
    [ChainId.BSC]: "",
  },
  {
    [ChainId.AVALANCHE]: 18,
    [ChainId.FUJI]: 18,
    [ChainId.BSC]: 18,
  },
  "USDT.e-TSD LP",
  "",
  "USDT.e-TSD LP",
  gondolaLogo,
)

export const GDL_POOL_NAME = "GDL Pool"
export const GDL_POOL_ID = 11

export const ZDAI_DAI_POOL_NAME = "zDAI-DAI Pool"
export const ZDAI_DAI_POOL_ID = 9

export const ZUSDT_USDT_POOL_NAME = "zUSDT-USDT Pool"
export const ZUSDT_USDT_POOL_ID = 8

export const DUSDT_USDT_POOL_NAME = "DUSDT-USDT Pool"
export const DUSDT_USDT_POOL_ID = 1 /** @todo update pool id */

export const ZETH_ETH_POOL_NAME = "zETH-ETH Pool"
export const ZETH_ETH_POOL_ID = 7

export const ZBTC_WBTC_POOL_NAME = "zBTC-WBTC Pool"
export const ZBTC_WBTC_POOL_ID = 13

export const PANGOLIN_AVAX_GDL_POOL_NAME = "Pangolin AVAX-GDL Pool"
export const PANGOLIN_AVAX_GDL_POOL_ID = 12

export const ZERO_GDL_POOL_NAME = "ZERO-GDL Pool"
export const ZERO_GDL_POOL_ID = 10

export const RENBTC_WBTC_POOL_NAME = "RenBTC-WBTC Pool"
export const RENBTC_WBTC_POOL_ID = 14

export const ZUSDC_USDC_POOL_NAME = "zUSDC-USDC Pool"
export const ZUSDC_USDC_POOL_ID = 1 /** @todo update pool id */

export const DWETH_ETH_POOL_NAME = "DWETH-ETH Pool"
export const DWETH_ETH_POOL_ID = 1 /** @todo update pool id */

export const USDT_DAI_POOL_NAME = "USDT-DAI Pool"
export const USDT_DAI_POOL_ID = 15

export const ETH_WETHE_POOL_NAME = "ETH-ETH.e Pool"
export const ETH_WETHE_POOL_ID = 16

export const WBTC_WBTCE_POOL_NAME = "WBTC-WBTC.e Pool"
export const WBTC_WBTCE_POOL_ID = 20

export const DAI_DAIE_POOL_NAME = "DAI-DAI.e Pool"
export const DAI_DAIE_POOL_ID = 18

export const USDT_USDTE_POOL_NAME = "USDT-USDT.e Pool"
export const USDT_USDTE_POOL_ID = 17

export const DAIE_USDTE_POOL_NAME = "DAI.e-USDT.e Pool"
export const DAIE_USDTE_POOL_ID = 19

export const USDCE_POOL_NAME = "USDT.e-USDC.e Pool"
export const USDCE_POOL_ID = 22

export const TSD_POOL_NAME = "USDT.e-TSD Pool"
export const TSD_POOL_ID = 21

export type PoolName =
  | typeof GDL_POOL_NAME
  | typeof ZDAI_DAI_POOL_NAME
  | typeof DUSDT_USDT_POOL_NAME
  | typeof ZUSDT_USDT_POOL_NAME
  | typeof ZUSDC_USDC_POOL_NAME
  | typeof ZETH_ETH_POOL_NAME
  | typeof ZBTC_WBTC_POOL_NAME
  | typeof RENBTC_WBTC_POOL_NAME
  | typeof PANGOLIN_AVAX_GDL_POOL_NAME
  | typeof ZERO_GDL_POOL_NAME
  | typeof DWETH_ETH_POOL_NAME
  | typeof USDT_DAI_POOL_NAME
  | typeof ETH_WETHE_POOL_NAME
  | typeof WBTC_WBTCE_POOL_NAME
  | typeof USDT_USDTE_POOL_NAME
  | typeof DAI_DAIE_POOL_NAME
  | typeof DAIE_USDTE_POOL_NAME
  | typeof USDCE_POOL_NAME
  | typeof TSD_POOL_NAME

export const ZUSDT_USDT_POOL_TOKENS = [USDT, ZUSDT]
export const DUSDT_USDT_POOL_TOKENS = [USDT, DUSDT]
export const ZUSDC_USDC_POOL_TOKENS = [USDC, ZUSDC]
export const ZBTC_WBTC_POOL_TOKENS = [WBTC, ZBTC]
export const ZDAI_DAI_POOL_TOKENS = [DAI, ZDAI]
export const ZETH_ETH_POOL_TOKENS = [ETH, ZETH]
export const DWETH_ETH_POOL_TOKENS = [ETH, DWETH]
export const RENBTC_WBTC_POOL_TOKENS = [WBTC, RENBTC]
export const USDT_DAI_POOL_TOKENS = [USDT, DAI]
export const ETH_WETHE_POOL_TOKENS = [ETH, WETHE]
export const WBTC_WBTCE_POOL_TOKENS = [WBTC, WBTCE]
export const USDT_USDTE_POOL_TOKENS = [USDT, USDTE]
export const DAI_DAIE_POOL_TOKENS = [DAI, DAIE]
export const DAIE_USDTE_POOL_TOKENS = [DAIE, USDTE]
export const USDCE_POOL_TOKENS = [USDTE, USDCE]
export const TSD_POOL_TOKENS = [USDTE, TSD]

// maps a symbol string to a token object
export const TOKENS_MAP: {
  [symbol: string]: Token
} = [
  GDL_TOKEN,
  PANGOLIN_AVAX_GDL_TOKEN,
  ZERO_GDL_TOKEN,
  ...DUSDT_USDT_POOL_TOKENS,
  DUSDT_USDT_SWAP_TOKEN,
  ...ZUSDT_USDT_POOL_TOKENS,
  ZUSDT_USDT_SWAP_TOKEN,
  ...ZUSDC_USDC_POOL_TOKENS,
  ZUSDC_USDC_SWAP_TOKEN,
  ...ZBTC_WBTC_POOL_TOKENS,
  ZBTC_WBTC_SWAP_TOKEN,
  ...ZDAI_DAI_POOL_TOKENS,
  ZDAI_DAI_SWAP_TOKEN,
  ...ZETH_ETH_POOL_TOKENS,
  ZETH_ETH_SWAP_TOKEN,
  ...DWETH_ETH_POOL_TOKENS,
  DWETH_ETH_SWAP_TOKEN,
  RENBTC_WBTC_SWAP_TOKEN,
  ...RENBTC_WBTC_POOL_TOKENS,
  USDT_DAI_SWAP_TOKEN,
  ...USDT_DAI_POOL_TOKENS,
  WBTC_WBTCE_SWAP_TOKEN,
  ...WBTC_WBTCE_POOL_TOKENS,
  ETH_WETHE_SWAP_TOKEN,
  ...ETH_WETHE_POOL_TOKENS,
  USDT_USDTE_SWAP_TOKEN,
  ...USDT_USDTE_POOL_TOKENS,
  DAI_DAIE_SWAP_TOKEN,
  ...DAI_DAIE_POOL_TOKENS,
  DAIE_USDTE_SWAP_TOKEN,
  ...DAIE_USDTE_POOL_TOKENS,
  USDCE_SWAP_TOKEN,
  ...USDCE_POOL_TOKENS,
  TSD_SWAP_TOKEN,
  ...TSD_POOL_TOKENS,
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
  [ZBTC_WBTC_POOL_NAME]: {
    poolId: ZBTC_WBTC_POOL_ID,
    lpToken: ZBTC_WBTC_SWAP_TOKEN,
    poolTokens: ZBTC_WBTC_POOL_TOKENS,
    isSwapPool: true,
  },
  [ZDAI_DAI_POOL_NAME]: {
    poolId: ZDAI_DAI_POOL_ID,
    lpToken: ZDAI_DAI_SWAP_TOKEN,
    poolTokens: ZDAI_DAI_POOL_TOKENS,
    isSwapPool: true,
  },
  [DUSDT_USDT_POOL_NAME]: {
    poolId: DUSDT_USDT_POOL_ID,
    lpToken: DUSDT_USDT_SWAP_TOKEN,
    poolTokens: DUSDT_USDT_POOL_TOKENS,
    isSwapPool: true,
  },
  [ZUSDT_USDT_POOL_NAME]: {
    poolId: ZUSDT_USDT_POOL_ID,
    lpToken: ZUSDT_USDT_SWAP_TOKEN,
    poolTokens: ZUSDT_USDT_POOL_TOKENS,
    isSwapPool: true,
  },
  [ZUSDC_USDC_POOL_NAME]: {
    poolId: ZUSDC_USDC_POOL_ID,
    lpToken: ZUSDC_USDC_SWAP_TOKEN,
    poolTokens: ZUSDC_USDC_POOL_TOKENS,
    isSwapPool: true,
  },
  [ZETH_ETH_POOL_NAME]: {
    poolId: ZETH_ETH_POOL_ID,
    lpToken: ZETH_ETH_SWAP_TOKEN,
    poolTokens: ZETH_ETH_POOL_TOKENS,
    isSwapPool: true,
  },
  [DWETH_ETH_POOL_NAME]: {
    poolId: DWETH_ETH_POOL_ID,
    lpToken: DWETH_ETH_SWAP_TOKEN,
    poolTokens: DWETH_ETH_POOL_TOKENS,
    isSwapPool: true,
  },
  [RENBTC_WBTC_POOL_NAME]: {
    poolId: RENBTC_WBTC_POOL_ID,
    lpToken: RENBTC_WBTC_SWAP_TOKEN,
    poolTokens: RENBTC_WBTC_POOL_TOKENS,
    isSwapPool: true,
  },
  [PANGOLIN_AVAX_GDL_POOL_NAME]: {
    poolId: PANGOLIN_AVAX_GDL_POOL_ID,
    lpToken: PANGOLIN_AVAX_GDL_TOKEN,
    poolTokens: [],
    isSwapPool: false,
  },
  [ZERO_GDL_POOL_NAME]: {
    poolId: ZERO_GDL_POOL_ID,
    lpToken: ZERO_GDL_TOKEN,
    poolTokens: [],
    isSwapPool: false,
  },
  [USDT_DAI_POOL_NAME]: {
    poolId: USDT_DAI_POOL_ID,
    lpToken: USDT_DAI_SWAP_TOKEN,
    poolTokens: USDT_DAI_POOL_TOKENS,
    isSwapPool: true,
  },
  [WBTC_WBTCE_POOL_NAME]: {
    poolId: WBTC_WBTCE_POOL_ID,
    lpToken: WBTC_WBTCE_SWAP_TOKEN,
    poolTokens: WBTC_WBTCE_POOL_TOKENS,
    isSwapPool: true,
  },
  [ETH_WETHE_POOL_NAME]: {
    poolId: ETH_WETHE_POOL_ID,
    lpToken: ETH_WETHE_SWAP_TOKEN,
    poolTokens: ETH_WETHE_POOL_TOKENS,
    isSwapPool: true,
  },
  [USDT_USDTE_POOL_NAME]: {
    poolId: USDT_USDTE_POOL_ID,
    lpToken: USDT_USDTE_SWAP_TOKEN,
    poolTokens: USDT_USDTE_POOL_TOKENS,
    isSwapPool: true,
  },
  [DAI_DAIE_POOL_NAME]: {
    poolId: DAI_DAIE_POOL_ID,
    lpToken: DAI_DAIE_SWAP_TOKEN,
    poolTokens: DAI_DAIE_POOL_TOKENS,
    isSwapPool: true,
  },
  [DAIE_USDTE_POOL_NAME]: {
    poolId: DAIE_USDTE_POOL_ID,
    lpToken: DAIE_USDTE_SWAP_TOKEN,
    poolTokens: DAIE_USDTE_POOL_TOKENS,
    isSwapPool: true,
  },
  [USDCE_POOL_NAME]: {
    poolId: USDCE_POOL_ID,
    lpToken: USDCE_SWAP_TOKEN,
    poolTokens: USDCE_POOL_TOKENS,
    isSwapPool: true,
  },
  [TSD_POOL_NAME]: {
    poolId: TSD_POOL_ID,
    lpToken: TSD_SWAP_TOKEN,
    poolTokens: TSD_POOL_TOKENS,
    isSwapPool: true,
  },
}

export const TRANSACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  SWAP: "SWAP",
}

export const POOL_FEE_PRECISION = 10

// export const DEPLOYED_BLOCK: { [chainId in ChainId]: number } = {
//   [ChainId.AVALANCHE]: 11656944,
//   [ChainId.FUJI]: 10000,
// }
