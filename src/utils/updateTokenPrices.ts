import {
  ZDAI_DAI_POOL_TOKENS,
  ZETH_ETH_POOL_TOKENS,
  ZUSDT_USDT_POOL_TOKENS,
} from "../constants"
import { AppDispatch } from "../state"
import retry from "async-retry"
import { updateTokensPricesUSD } from "../state/application"

const coinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price"

interface CoinGeckoReponse {
  [tokenSymbol: string]: {
    usd: number
  }
}

export default function fetchTokenPricesUSD(dispatch: AppDispatch): void {
  const tokens = [
    ...ZUSDT_USDT_POOL_TOKENS,
    ...ZDAI_DAI_POOL_TOKENS,
    ...ZETH_ETH_POOL_TOKENS,
  ]
  const tokenIds = tokens
    .map(({ geckoId }) => geckoId)
    .concat(["ethereum", "bitcoin", "keep-network"])
  void retry(
    () =>
      fetch(`${coinGeckoAPI}?ids=${encodeURIComponent(
        tokenIds.join(","),
      )}&vs_currencies=usd
    `)
        .then((res) => res.json())
        .then((body: CoinGeckoReponse) => {
          const result = tokens.reduce(
            (acc, token) => {
              return { ...acc, [token.symbol]: body?.[token.geckoId]?.usd }
            },
            {
              ETH: body?.ethereum?.usd,
              BTC: body?.bitcoin?.usd,
              KEEP: body?.["keep-network"].usd,
              GDL: 10.4 /** @todo retrieve from api */,
            },
          )
          dispatch(updateTokensPricesUSD(result))
        }),
    { retries: 3 },
  )
}
