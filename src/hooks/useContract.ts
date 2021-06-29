import {
  DAI,
  DWETH,
  DWETH_ETH_POOL_NAME,
  DWETH_ETH_SWAP_CONTRACT_ADDRESSES,
  DWETH_ETH_SWAP_TOKEN,
  ETH,
  GONDOLA_ADDRESS,
  MASTERCHEF_ADDRESS,
  MULTICALL_NETWORKS,
  POOLS_MAP,
  PoolName,
  RENBTC,
  RENBTC_WBTC_POOL_NAME,
  RENBTC_WBTC_SWAP_CONTRACT_ADDRESSES,
  RENBTC_WBTC_SWAP_TOKEN,
  Token,
  USDC,
  USDT,
  WBTC,
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
    } else if (poolName === RENBTC_WBTC_POOL_NAME) {
      return renbtcWbtcSwapContract as Swap
    } else if (poolName === ZUSDC_USDC_POOL_NAME) {
      return zusdcUsdcSwapContract as Swap
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
  const zdaiContract = useTokenContract(ZDAI) as Erc20
  const zethContract = useTokenContract(ZETH) as Erc20
  const zusdcContract = useTokenContract(ZUSDC) as Erc20
  const zusdtContract = useTokenContract(ZUSDT) as Erc20
  const zbtcContract = useTokenContract(ZBTC) as Erc20
  const renbtcContract = useTokenContract(RENBTC) as Erc20

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
  const renbtcWbtcSwapTokenContract = useTokenContract(
    RENBTC_WBTC_SWAP_TOKEN,
  ) as Swap

  return useMemo(() => {
    return {
      [DAI.symbol]: daiContract,
      [ETH.symbol]: ethContract,
      [DWETH.symbol]: dwethContract,
      [USDC.symbol]: usdcContract,
      [USDT.symbol]: usdtContract,
      [RENBTC.symbol]: renbtcContract,
      [WBTC.symbol]: wbtcContract,
      [ZBTC.symbol]: zbtcContract,
      [ZDAI.symbol]: zdaiContract,
      [ZETH.symbol]: zethContract,
      [ZUSDC.symbol]: zusdcContract,
      [ZUSDT.symbol]: zusdtContract,
      [ZDAI_DAI_SWAP_TOKEN.symbol]: zdaiDaiSwapTokenContract,
      [ZBTC_WBTC_SWAP_TOKEN.symbol]: zbtcWbtcSwapTokenContract,
      [ZETH_ETH_SWAP_TOKEN.symbol]: zethEthSwapTokenContract,
      [DWETH_ETH_SWAP_TOKEN.symbol]: dwethEthSwapTokenContract,
      [ZUSDC_USDC_SWAP_TOKEN.symbol]: zusdcUsdcSwapTokenContract,
      [ZUSDT_USDT_SWAP_TOKEN.symbol]: zusdtUsdtSwapTokenContract,
      [RENBTC_WBTC_SWAP_TOKEN.symbol]: renbtcWbtcSwapTokenContract,
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
    zusdtContract,
    renbtcWbtcSwapTokenContract,
    zbtcWbtcSwapTokenContract,
    zdaiDaiSwapTokenContract,
    zusdcUsdcSwapTokenContract,
    zethEthSwapTokenContract,
    dwethEthSwapTokenContract,
    zusdtUsdtSwapTokenContract,
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
