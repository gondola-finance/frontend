import {
  BLOCK_TIME,
  DAI,
  ETH,
  Token,
  USDT,
  ZDAI,
  ZDAI_DAI_SWAP_TOKEN,
  ZETH,
  ZETH_ETH_SWAP_TOKEN,
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
  const usdtTokenBalance = useTokenBalance(USDT)
  const zdaiTokenBalance = useTokenBalance(ZDAI)
  const zethTokenBalance = useTokenBalance(ZETH)
  const zusdtTokenBalance = useTokenBalance(ZUSDT)
  // lpTokens
  const zdaiDaiSwapTokenBalance = useTokenBalance(ZDAI_DAI_SWAP_TOKEN)
  const zethEthSwapTokenBalance = useTokenBalance(ZETH_ETH_SWAP_TOKEN)
  const zusdtUsdtSwapTokenBalance = useTokenBalance(ZUSDT_USDT_SWAP_TOKEN)

  const poolTokensBalances = useMemo(
    () => ({
      [DAI.symbol]: daiTokenBalance,
      [ETH.symbol]: ethTokenBalance,
      [USDT.symbol]: usdtTokenBalance,
      [ZDAI.symbol]: zdaiTokenBalance,
      [ZETH.symbol]: zethTokenBalance,
      [ZUSDT.symbol]: zusdtTokenBalance,
      [ZDAI_DAI_SWAP_TOKEN.symbol]: zdaiDaiSwapTokenBalance,
      [ZETH_ETH_SWAP_TOKEN.symbol]: zethEthSwapTokenBalance,
      [ZUSDT_USDT_SWAP_TOKEN.symbol]: zusdtUsdtSwapTokenBalance,
    }),
    [
      daiTokenBalance,
      ethTokenBalance,
      usdtTokenBalance,
      zdaiTokenBalance,
      zethTokenBalance,
      zusdtTokenBalance,
      zdaiDaiSwapTokenBalance,
      zethEthSwapTokenBalance,
      zusdtUsdtSwapTokenBalance,
    ],
  )

  return poolTokensBalances
}
