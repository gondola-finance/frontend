import {
  BLOCK_TIME,
  DAI,
  DAIE,
  DAIE_USDTE_SWAP_TOKEN,
  DAI_DAIE_SWAP_TOKEN,
  DUSDT,
  DUSDT_USDT_SWAP_TOKEN,
  DWETH,
  DWETH_ETH_SWAP_TOKEN,
  ETH,
  ETH_WETHE_SWAP_TOKEN,
  RENBTC,
  Token,
  USDC,
  USDT,
  USDTE,
  USDT_DAI_SWAP_TOKEN,
  USDT_USDTE_SWAP_TOKEN,
  WBTC,
  WBTCE,
  WBTC_WBTCE_SWAP_TOKEN,
  WETHE,
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
  const wbtceTokenBalance = useTokenBalance(WBTCE)
  const wetheTokenBalance = useTokenBalance(WETHE)
  const usdteTokenBalance = useTokenBalance(USDTE)
  const daieTokenBalance = useTokenBalance(DAIE)
  // lpTokens
  const zdaiDaiSwapTokenBalance = useTokenBalance(ZDAI_DAI_SWAP_TOKEN)
  const zethEthSwapTokenBalance = useTokenBalance(ZETH_ETH_SWAP_TOKEN)
  const dwethEthSwapTokenBalance = useTokenBalance(DWETH_ETH_SWAP_TOKEN)
  const zusdtUsdtSwapTokenBalance = useTokenBalance(ZUSDT_USDT_SWAP_TOKEN)
  const dusdtUsdtSwapTokenBalance = useTokenBalance(DUSDT_USDT_SWAP_TOKEN)
  const usdtDaiSwapTokenBalance = useTokenBalance(USDT_DAI_SWAP_TOKEN)
  const wbtcWbtceSwapTokenBalance = useTokenBalance(WBTC_WBTCE_SWAP_TOKEN)
  const ethWetheSwapTokenBalance = useTokenBalance(ETH_WETHE_SWAP_TOKEN)
  const usdtUsdteSwapTokenBalance = useTokenBalance(USDT_USDTE_SWAP_TOKEN)
  const daiDaieSwapTokenBalance = useTokenBalance(DAI_DAIE_SWAP_TOKEN)
  const daieUsdteSwapTokenBalance = useTokenBalance(DAIE_USDTE_SWAP_TOKEN)
  const poolTokensBalances = useMemo(
    () => ({
      [DAI.symbol]: daiTokenBalance,
      [DWETH.symbol]: dwethTokenBalance,
      [DUSDT.symbol]: dusdtTokenBalance,
      [WBTC.symbol]: wbtcTokenBalance,
      [RENBTC.symbol]: renbtcTokenBalance,
      [ETH.symbol]: ethTokenBalance,
      [WBTCE.symbol]: wbtceTokenBalance,
      [WETHE.symbol]: wetheTokenBalance,
      [USDTE.symbol]: usdteTokenBalance,
      [DAIE.symbol]: daieTokenBalance,
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
      [USDT_DAI_SWAP_TOKEN.symbol]: usdtDaiSwapTokenBalance,
      [WBTC_WBTCE_SWAP_TOKEN.symbol]: wbtcWbtceSwapTokenBalance,
      [ETH_WETHE_SWAP_TOKEN.symbol]: ethWetheSwapTokenBalance,
      [USDT_USDTE_SWAP_TOKEN.symbol]: usdtUsdteSwapTokenBalance,
      [DAI_DAIE_SWAP_TOKEN.symbol]: daiDaieSwapTokenBalance,
      [DAIE_USDTE_SWAP_TOKEN.symbol]: daieUsdteSwapTokenBalance,
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
      daieTokenBalance,
      usdteTokenBalance,
      wbtceTokenBalance,
      wetheTokenBalance,
      zdaiDaiSwapTokenBalance,
      zethEthSwapTokenBalance,
      zusdtUsdtSwapTokenBalance,
      usdtDaiSwapTokenBalance,
      wbtcWbtceSwapTokenBalance,
      ethWetheSwapTokenBalance,
      usdtUsdteSwapTokenBalance,
      daiDaieSwapTokenBalance,
      daieUsdteSwapTokenBalance,
    ],
  )

  return poolTokensBalances
}
