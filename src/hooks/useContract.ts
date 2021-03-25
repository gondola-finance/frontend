import {
  DAI,
  GONDOLA_ADDRESS,
  MASTERCHEF_ADDRESS,
  MULTICALL_NETWORKS,
  PoolName,
  STABLECOIN_POOL_NAME,
  STABLECOIN_SWAP_ADDRESSES,
  STABLECOIN_SWAP_TOKEN,
  Token,
  USDC,
  USDT,
} from "../constants"
import { useMemo, useState } from "react"

import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../constants/abis/erc20.json"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import GONDOLA_ABI from "../constants/abis/gondola.json"
import LPTOKEN_ABI from "../constants/abis/lpToken.json"
import { LpToken } from "../../types/ethers-contracts/LpToken"
import MASTERCHEF_ABI from "../constants/abis/masterchef.json"
import MULTICALL_ABI from "../constants/abis/multicall.json"
import SWAP_ABI from "../constants/abis/swap.json"
import { Swap } from "../../types/ethers-contracts/Swap"
import { getContract } from "../utils"
import { useActiveWeb3React } from "./index"

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
  const stablecoinSwapContract = useContract(
    chainId ? STABLECOIN_SWAP_ADDRESSES[chainId] : undefined,
    SWAP_ABI,
    withSignerIfPossible,
  )

  return useMemo(() => {
    if (poolName === STABLECOIN_POOL_NAME) {
      return stablecoinSwapContract as Swap
    }
    return null
  }, [stablecoinSwapContract, poolName])
}

export function useLPTokenContract(poolName: PoolName): LpToken | null {
  const swapContract = useSwapContract(poolName)
  const [lpTokenAddress, setLPTokenAddress] = useState("")
  void swapContract
    ?.swapStorage()
    .then(({ lpToken }: { lpToken: string }) => setLPTokenAddress(lpToken))
  return useContract(lpTokenAddress, LPTOKEN_ABI) as LpToken
}

interface AllContractsObject {
  [x: string]: Swap | Erc20 | null
}
export function useAllContracts(): AllContractsObject | null {
  const daiContract = useTokenContract(DAI) as Erc20
  const usdcContract = useTokenContract(USDC) as Erc20
  const usdtContract = useTokenContract(USDT) as Erc20
  const stablecoinSwapTokenContract = useTokenContract(
    STABLECOIN_SWAP_TOKEN,
  ) as Swap

  return useMemo(() => {
    if (
      ![
        daiContract,
        usdcContract,
        usdtContract,
        // stablecoinSwapTokenContract, // TODO: add back when contract deployed
      ].some(Boolean)
    )
      return null
    return {
      [DAI.symbol]: daiContract,
      [USDC.symbol]: usdcContract,
      [USDT.symbol]: usdtContract,
      [STABLECOIN_SWAP_TOKEN.symbol]: stablecoinSwapTokenContract,
    }
  }, [daiContract, usdcContract, usdtContract, stablecoinSwapTokenContract])
}

export function useMasterChefContract(
  withSignerIfPossible?: boolean,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MASTERCHEF_ADDRESS[chainId],
    MASTERCHEF_ABI,
    withSignerIfPossible,
  )
}

export function useGondolaContract(
  withSignerIfPossible = true,
): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && GONDOLA_ADDRESS[chainId],
    GONDOLA_ABI,
    withSignerIfPossible,
  )
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false,
  )
}
