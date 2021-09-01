import {
  DAI,
  DAIE,
  DAIE_USDTE_POOL_NAME,
  DAIE_USDTE_SWAP_CONTRACT_ADDRESSES,
  DAIE_USDTE_SWAP_TOKEN,
  DAI_DAIE_POOL_NAME,
  DAI_DAIE_SWAP_CONTRACT_ADDRESSES,
  DAI_DAIE_SWAP_TOKEN,
  DUSDT,
  DUSDT_USDT_POOL_NAME,
  DUSDT_USDT_SWAP_CONTRACT_ADDRESSES,
  DUSDT_USDT_SWAP_TOKEN,
  DWETH,
  DWETH_ETH_POOL_NAME,
  DWETH_ETH_SWAP_CONTRACT_ADDRESSES,
  DWETH_ETH_SWAP_TOKEN,
  ETH,
  ETH_WETHE_POOL_NAME,
  ETH_WETHE_SWAP_CONTRACT_ADDRESSES,
  ETH_WETHE_SWAP_TOKEN,
  GONDOLA_ADDRESS,
  MASTERCHEF_ADDRESS,
  MULTICALL_NETWORKS,
  POOLS_MAP,
  PoolName,
  RENBTC,
  RENBTC_WBTC_POOL_NAME,
  RENBTC_WBTC_SWAP_CONTRACT_ADDRESSES,
  RENBTC_WBTC_SWAP_TOKEN,
  TSD,
  TSD_POOL_NAME,
  TSD_SWAP_CONTRACT_ADDRESSES,
  TSD_SWAP_TOKEN,
  Token,
  USDC,
  USDCE,
  USDCE_POOL_NAME,
  USDCE_SWAP_CONTRACT_ADDRESSES,
  USDCE_SWAP_TOKEN,
  USDT,
  USDTE,
  USDT_DAI_POOL_NAME,
  USDT_DAI_SWAP_CONTRACT_ADDRESSES,
  USDT_DAI_SWAP_TOKEN,
  USDT_USDTE_POOL_NAME,
  USDT_USDTE_SWAP_CONTRACT_ADDRESSES,
  USDT_USDTE_SWAP_TOKEN,
  WBTC,
  WBTCE,
  WBTC_WBTCE_POOL_NAME,
  WBTC_WBTCE_SWAP_CONTRACT_ADDRESSES,
  WBTC_WBTCE_SWAP_TOKEN,
  WETHE,
  ZBTC,
  ZBTC_WBTC_POOL_NAME,
  ZBTC_WBTC_SWAP_CONTRACT_ADDRESSES,
  ZBTC_WBTC_SWAP_TOKEN,
  ZDAI,
  ZDAI_DAI_POOL_NAME,
  ZDAI_DAI_SWAP_CONTRACT_ADDRESSES,
  ZDAI_DAI_SWAP_TOKEN,
  ZETH,
  ZETH_ETH_POOL_NAME,
  ZETH_ETH_SWAP_CONTRACT_ADDRESSES,
  ZETH_ETH_SWAP_TOKEN,
  ZUSDC,
  ZUSDC_USDC_POOL_NAME,
  ZUSDC_USDC_SWAP_CONTRACT_ADDRESSES,
  ZUSDC_USDC_SWAP_TOKEN,
  ZUSDT,
  ZUSDT_USDT_POOL_NAME,
  ZUSDT_USDT_SWAP_CONTRACT_ADDRESSES,
  ZUSDT_USDT_SWAP_TOKEN,
} from "../constants"

import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../constants/abis/erc20.json"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import GONDOLA_ABI from "../constants/abis/gondola.json"
import LPTOKEN_ABI from "../constants/abis/lpToken.json"
import { LpToken } from "../../types/ethers-contracts/LpToken"
import MASTERCHEF_ABI from "../constants/abis/masterchef.json"
import MERKLE_DISTRIBUTOR_ABI from "../constants/abis/MerkleDistributor.json"
import MULTICALL_ABI from "../constants/abis/multicall.json"
import { Masterchef } from "../../types/ethers-contracts/Masterchef"
import { MerkleDistributor } from "../../types/ethers-contracts/MerkleDistributor"
import PANGOLIN_AVAX_GDL_ABI from "../constants/abis/pangolinPoolLpToken.json"
import SWAP_ABI from "../constants/abis/swap.json"
import { Swap } from "../../types/ethers-contracts/Swap"
import { getContract } from "../utils"
import { useActiveWeb3React } from "./index"
import { useMemo } from "react"

// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  withSignerIfPossible = true,
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined,
      )
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(
  t: Token,
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  const tokenAddress = chainId ? t.addresses[chainId] : undefined
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useSwapContract(poolName: PoolName): Swap | null {
  const withSignerIfPossible = true
  const { chainId } = useActiveWeb3React()

  const zbtcWbtcSwapContract = useContract(
    chainId ? ZBTC_WBTC_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const renbtcWbtcSwapContract = useContract(
    chainId ? RENBTC_WBTC_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const zdaiDaiSwapContract = useContract(
    chainId ? ZDAI_DAI_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const zusdtUsdtSwapContract = useContract(
    chainId ? ZUSDT_USDT_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const dusdtUsdtSwapContract = useContract(
    chainId ? DUSDT_USDT_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const zusdcUsdcSwapContract = useContract(
    chainId ? ZUSDC_USDC_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const zethEthSwapContract = useContract(
    chainId ? ZETH_ETH_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const dwethEthSwapContract = useContract(
    chainId ? DWETH_ETH_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const usdtDaiSwapContract = useContract(
    chainId ? USDT_DAI_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const wbtcWbtceSwapContract = useContract(
    chainId ? WBTC_WBTCE_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const ethWetheSwapContract = useContract(
    chainId ? ETH_WETHE_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const usdtUsdteSwapContract = useContract(
    chainId ? USDT_USDTE_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const daiDaieSwapContract = useContract(
    chainId ? DAI_DAIE_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const daieUsdteSwapContract = useContract(
    chainId ? DAIE_USDTE_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  const usdceSwapContract = useContract(
    chainId ? USDCE_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )
  const tsdSwapContract = useContract(
    chainId ? TSD_SWAP_CONTRACT_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  return useMemo(() => {
    if (poolName === ZBTC_WBTC_POOL_NAME) {
      return zbtcWbtcSwapContract as Swap
    } else if (poolName === ZDAI_DAI_POOL_NAME) {
      return zdaiDaiSwapContract as Swap
    } else if (poolName === ZETH_ETH_POOL_NAME) {
      return zethEthSwapContract as Swap
    } else if (poolName === DWETH_ETH_POOL_NAME) {
      return dwethEthSwapContract as Swap
    } else if (poolName === ZUSDT_USDT_POOL_NAME) {
      return zusdtUsdtSwapContract as Swap
    } else if (poolName === DUSDT_USDT_POOL_NAME) {
      return dusdtUsdtSwapContract as Swap
    } else if (poolName === RENBTC_WBTC_POOL_NAME) {
      return renbtcWbtcSwapContract as Swap
    } else if (poolName === ZUSDC_USDC_POOL_NAME) {
      return zusdcUsdcSwapContract as Swap
    } else if (poolName === USDT_DAI_POOL_NAME) {
      return usdtDaiSwapContract as Swap
    } else if (poolName === WBTC_WBTCE_POOL_NAME) {
      return wbtcWbtceSwapContract as Swap
    } else if (poolName === ETH_WETHE_POOL_NAME) {
      return ethWetheSwapContract as Swap
    } else if (poolName === USDT_USDTE_POOL_NAME) {
      return usdtUsdteSwapContract as Swap
    } else if (poolName === DAI_DAIE_POOL_NAME) {
      return daiDaieSwapContract as Swap
    } else if (poolName === DAIE_USDTE_POOL_NAME) {
      return daieUsdteSwapContract as Swap
    } else if (poolName === USDCE_POOL_NAME) {
      return usdceSwapContract as Swap
    } else if (poolName === TSD_POOL_NAME) {
      return tsdSwapContract as Swap
    }
    return null
  }, [
    zbtcWbtcSwapContract,
    zdaiDaiSwapContract,
    zethEthSwapContract,
    zusdtUsdtSwapContract,
    renbtcWbtcSwapContract,
    zusdcUsdcSwapContract,
    dwethEthSwapContract,
    dusdtUsdtSwapContract,
    usdtDaiSwapContract,
    wbtcWbtceSwapContract,
    ethWetheSwapContract,
    usdtUsdteSwapContract,
    daiDaieSwapContract,
    daieUsdteSwapContract,
    usdceSwapContract,
    tsdSwapContract,
    poolName,
  ])
}

export function useLPTokenContract(poolName: PoolName): LpToken | null {
  const { chainId } = useActiveWeb3React()

  const pool = POOLS_MAP[poolName]
  const poolLp = pool.lpToken
  return useContract(
    chainId ? poolLp.addresses[chainId] : undefined,
    LPTOKEN_ABI,
  ) as LpToken
}

interface AllContractsObject {
  [x: string]: Swap | Erc20 | null
}
export function useAllContracts(): AllContractsObject | null {
  const wbtcContract = useTokenContract(WBTC) as Erc20
  const daiContract = useTokenContract(DAI) as Erc20
  const ethContract = useTokenContract(ETH) as Erc20
  const dwethContract = useTokenContract(DWETH) as Erc20
  const usdcContract = useTokenContract(USDC) as Erc20
  const usdtContract = useTokenContract(USDT) as Erc20
  const dusdtContract = useTokenContract(DUSDT) as Erc20
  const zdaiContract = useTokenContract(ZDAI) as Erc20
  const zethContract = useTokenContract(ZETH) as Erc20
  const zusdcContract = useTokenContract(ZUSDC) as Erc20
  const zusdtContract = useTokenContract(ZUSDT) as Erc20
  const zbtcContract = useTokenContract(ZBTC) as Erc20
  const renbtcContract = useTokenContract(RENBTC) as Erc20
  const wbtceContract = useTokenContract(WBTCE) as Erc20
  const wetheContract = useTokenContract(WETHE) as Erc20
  const daieContract = useTokenContract(DAIE) as Erc20
  const usdteContract = useTokenContract(USDTE) as Erc20
  const tsdContract = useTokenContract(TSD) as Erc20
  const usdceContract = useTokenContract(USDCE) as Erc20

  const zbtcWbtcSwapTokenContract = useTokenContract(
    ZBTC_WBTC_SWAP_TOKEN,
  ) as Swap
  const zdaiDaiSwapTokenContract = useTokenContract(ZDAI_DAI_SWAP_TOKEN) as Swap
  const zethEthSwapTokenContract = useTokenContract(ZETH_ETH_SWAP_TOKEN) as Swap
  const dwethEthSwapTokenContract = useTokenContract(
    DWETH_ETH_SWAP_TOKEN,
  ) as Swap
  const zusdcUsdcSwapTokenContract = useTokenContract(
    ZUSDC_USDC_SWAP_TOKEN,
  ) as Swap
  const zusdtUsdtSwapTokenContract = useTokenContract(
    ZUSDT_USDT_SWAP_TOKEN,
  ) as Swap
  const dusdtUsdtSwapTokenContract = useTokenContract(
    DUSDT_USDT_SWAP_TOKEN,
  ) as Swap
  const renbtcWbtcSwapTokenContract = useTokenContract(
    RENBTC_WBTC_SWAP_TOKEN,
  ) as Swap
  const usdtDaiSwapTokenContract = useTokenContract(USDT_DAI_SWAP_TOKEN) as Swap
  const wbtcWbtceSwapTokenContract = useTokenContract(
    WBTC_WBTCE_SWAP_TOKEN,
  ) as Swap
  const ethWetheSwapTokenContract = useTokenContract(
    ETH_WETHE_SWAP_TOKEN,
  ) as Swap
  const usdtUsdteSwapTokenContract = useTokenContract(
    USDT_USDTE_SWAP_TOKEN,
  ) as Swap
  const daiDaieSwapTokenContract = useTokenContract(DAI_DAIE_SWAP_TOKEN) as Swap
  const daieUsdteSwapTokenContract = useTokenContract(
    DAIE_USDTE_SWAP_TOKEN,
  ) as Swap
  const usdceSwapTokenContract = useTokenContract(USDCE_SWAP_TOKEN) as Swap
  const tsdSwapTokenContract = useTokenContract(TSD_SWAP_TOKEN) as Swap
  return useMemo(() => {
    return {
      [DAI.symbol]: daiContract,
      [ETH.symbol]: ethContract,
      [DWETH.symbol]: dwethContract,
      [USDC.symbol]: usdcContract,
      [USDT.symbol]: usdtContract,
      [DUSDT.symbol]: dusdtContract,
      [RENBTC.symbol]: renbtcContract,
      [USDTE.symbol]: usdteContract,
      [DAIE.symbol]: daieContract,
      [WBTCE.symbol]: wbtceContract,
      [WETHE.symbol]: wetheContract,
      [WBTC.symbol]: wbtcContract,
      [ZBTC.symbol]: zbtcContract,
      [ZDAI.symbol]: zdaiContract,
      [ZETH.symbol]: zethContract,
      [ZUSDC.symbol]: zusdcContract,
      [ZUSDT.symbol]: zusdtContract,
      [TSD.symbol]: tsdContract,
      [USDCE.symbol]: usdceContract,
      [ZDAI_DAI_SWAP_TOKEN.symbol]: zdaiDaiSwapTokenContract,
      [ZBTC_WBTC_SWAP_TOKEN.symbol]: zbtcWbtcSwapTokenContract,
      [ZETH_ETH_SWAP_TOKEN.symbol]: zethEthSwapTokenContract,
      [DWETH_ETH_SWAP_TOKEN.symbol]: dwethEthSwapTokenContract,
      [ZUSDC_USDC_SWAP_TOKEN.symbol]: zusdcUsdcSwapTokenContract,
      [ZUSDT_USDT_SWAP_TOKEN.symbol]: zusdtUsdtSwapTokenContract,
      [DUSDT_USDT_SWAP_TOKEN.symbol]: dusdtUsdtSwapTokenContract,
      [RENBTC_WBTC_SWAP_TOKEN.symbol]: renbtcWbtcSwapTokenContract,
      [USDT_DAI_SWAP_TOKEN.symbol]: usdtDaiSwapTokenContract,
      [WBTC_WBTCE_SWAP_TOKEN.symbol]: wbtcWbtceSwapTokenContract,
      [ETH_WETHE_SWAP_TOKEN.symbol]: ethWetheSwapTokenContract,
      [USDT_USDTE_SWAP_TOKEN.symbol]: usdtUsdteSwapTokenContract,
      [DAI_DAIE_SWAP_TOKEN.symbol]: daiDaieSwapTokenContract,
      [DAIE_USDTE_SWAP_TOKEN.symbol]: daieUsdteSwapTokenContract,
      [USDCE_SWAP_TOKEN.symbol]: usdceSwapTokenContract,
      [TSD_SWAP_TOKEN.symbol]: tsdSwapTokenContract,
    }
  }, [
    wbtcContract,
    daiContract,
    ethContract,
    dwethContract,
    usdcContract,
    usdtContract,
    renbtcContract,
    zbtcContract,
    zdaiContract,
    zethContract,
    zusdcContract,
    tsdContract,
    usdceContract,
    zusdtContract,
    dusdtContract,
    wbtceContract,
    wetheContract,
    daieContract,
    usdteContract,
    renbtcWbtcSwapTokenContract,
    zbtcWbtcSwapTokenContract,
    zdaiDaiSwapTokenContract,
    zusdcUsdcSwapTokenContract,
    zethEthSwapTokenContract,
    dwethEthSwapTokenContract,
    zusdtUsdtSwapTokenContract,
    dusdtUsdtSwapTokenContract,
    usdtDaiSwapTokenContract,
    wbtcWbtceSwapTokenContract,
    ethWetheSwapTokenContract,
    usdtUsdteSwapTokenContract,
    daiDaieSwapTokenContract,
    daieUsdteSwapTokenContract,
    usdceSwapTokenContract,
    tsdSwapTokenContract,
  ])
}

export function useMasterChefContract(
  withSignerIfPossible?: boolean,
): Masterchef | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MASTERCHEF_ADDRESS[chainId],
    MASTERCHEF_ABI,
    withSignerIfPossible,
  ) as Masterchef
}

/** @todo consider return as LpToken type instead of Erc20 */
export function useGondolaContract(
  withSignerIfPossible = true,
): LpToken | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && GONDOLA_ADDRESS[chainId],
    GONDOLA_ABI,
    withSignerIfPossible,
  ) as LpToken
}

export function usePangolinLpContract(
  withSignerIfPossible = true,
): Erc20 | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && GONDOLA_ADDRESS[chainId],
    PANGOLIN_AVAX_GDL_ABI,
    withSignerIfPossible,
  ) as Erc20
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false,
  )
}

export function useAirdropContract(address?: string): MerkleDistributor | null {
  return useContract(address, MERKLE_DISTRIBUTOR_ABI, true) as MerkleDistributor
}
