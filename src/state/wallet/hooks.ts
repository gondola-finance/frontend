import {
  BLOCK_TIME,
  DAI,
  DUSDT,
  DUSDT_USDT_SWAP_TOKEN,
  DWETH,
  DWETH_ETH_SWAP_TOKEN,
  ETH,
  RENBTC,
  Token,
  USDC,
  USDT,
  WBTC,
  ZBTC,
  ZDAI,
  ZDAI_DAI_SWAP_TOKEN,
  ZETH,
  ZETH_ETH_SWAP_TOKEN,
  ZUSDC,
  ZUSDT,
  ZUSDT_USDT_SWAP_TOKEN,
} from "../../constants"

import { BigNumber } from "@ethersproject/bignumber"
import { Erc20 } from "../../../types/ethers-contracts/Erc20"
import { Zero } from "@ethersproject/constants"
import { useActiveWeb3React } from "../../hooks"
import { useMemo } from "react"
import usePoller from "../../hooks/usePoller"
import { useState } from "react"
import { useTokenContract } from "../../hooks/useContract"

export function useTokenBalance(t: Token): BigNumber {
  const { account, chainId } = useActiveWeb3React()
  const [balance, setBalance] = useState<BigNumber>(Zero)

  const tokenContract = useTokenContract(t) as Erc20

  usePoller((): void => {
    async function pollBalance(): Promise<void> {
      const newBalance = account
        ? await tokenContract?.balanceOf(account)
        : Zero
      if (newBalance !== undefined && newBalance !== balance) {
        setBalance(newBalance)
      }
    }
    if (account && chainId) {
      void pollBalance()
    }
  }, BLOCK_TIME * 10)
  return balance
}

export function usePoolTokenBalances(): { [token: string]: BigNumber } | null {
  // pool tokens
  const daiTokenBalance = useTokenBalance(DAI)
  const ethTokenBalance = useTokenBalance(ETH)
  const dwethTokenBalance = useTokenBalance(DWETH)
  const dusdtTokenBalance = useTokenBalance(DUSDT)
  const usdcTokenBalance = useTokenBalance(USDC)
  const usdtTokenBalance = useTokenBalance(USDT)
  const renbtcTokenBalance = useTokenBalance(RENBTC)
  const wbtcTokenBalance = useTokenBalance(WBTC)
  const zbtcTokenBalance = useTokenBalance(ZBTC)
  const zdaiTokenBalance = useTokenBalance(ZDAI)
  const zethTokenBalance = useTokenBalance(ZETH)
  const zusdcTokenBalance = useTokenBalance(ZUSDC)
  const zusdtTokenBalance = useTokenBalance(ZUSDT)
  // lpTokens
  const zdaiDaiSwapTokenBalance = useTokenBalance(ZDAI_DAI_SWAP_TOKEN)
  const zethEthSwapTokenBalance = useTokenBalance(ZETH_ETH_SWAP_TOKEN)
  const dwethEthSwapTokenBalance = useTokenBalance(DWETH_ETH_SWAP_TOKEN)
  const zusdtUsdtSwapTokenBalance = useTokenBalance(ZUSDT_USDT_SWAP_TOKEN)
  const dusdtUsdtSwapTokenBalance = useTokenBalance(DUSDT_USDT_SWAP_TOKEN)

  const poolTokensBalances = useMemo(
    () => ({
      [DAI.symbol]: daiTokenBalance,
      [DWETH.symbol]: dwethTokenBalance,
      [DUSDT.symbol]: dusdtTokenBalance,
      [WBTC.symbol]: wbtcTokenBalance,
      [RENBTC.symbol]: renbtcTokenBalance,
      [ETH.symbol]: ethTokenBalance,
      [USDC.symbol]: usdcTokenBalance,
      [USDT.symbol]: usdtTokenBalance,
      [ZBTC.symbol]: zbtcTokenBalance,
      [ZDAI.symbol]: zdaiTokenBalance,
      [ZETH.symbol]: zethTokenBalance,
      [ZUSDC.symbol]: zusdcTokenBalance,
      [ZUSDT.symbol]: zusdtTokenBalance,
      [DUSDT.symbol]: dusdtUsdtSwapTokenBalance,
      [ZDAI_DAI_SWAP_TOKEN.symbol]: zdaiDaiSwapTokenBalance,
      [ZETH_ETH_SWAP_TOKEN.symbol]: zethEthSwapTokenBalance,
      [DWETH_ETH_SWAP_TOKEN.symbol]: dwethEthSwapTokenBalance,
      [ZUSDT_USDT_SWAP_TOKEN.symbol]: zusdtUsdtSwapTokenBalance,
    }),
    [
      daiTokenBalance,
      dusdtTokenBalance,
      dusdtUsdtSwapTokenBalance,
      dwethEthSwapTokenBalance,
      dwethTokenBalance,
      ethTokenBalance,
      usdcTokenBalance,
      usdtTokenBalance,
      renbtcTokenBalance,
      wbtcTokenBalance,
      zbtcTokenBalance,
      zdaiTokenBalance,
      zethTokenBalance,
      zusdcTokenBalance,
      zusdtTokenBalance,
      zdaiDaiSwapTokenBalance,
      zethEthSwapTokenBalance,
      zusdtUsdtSwapTokenBalance,
    ],
  )

  return poolTokensBalances
}
