import {
  ChainId,
  GDL_TOKEN,
  GONDOLA_ADDRESS,
  ZDAI_DAI_POOL_TOKENS,
  ZETH_ETH_POOL_TOKENS,
  ZUSDT_USDT_POOL_TOKENS,
} from "../constants"
import { AppDispatch } from "../state"
import axios from "axios"
import retry from "async-retry"
import { updateTokensPricesUSD } from "../state/application"

const coinGeckoAPI = "https://api.coingecko.com/api/v3/simple/price"

interface CoinGeckoReponse {
  [tokenSymbol: string]: {
    usd: number
  }
}

interface PangolinAPIToken {
  symbol: string
  derivedETH: string
}

interface PangolinAPIResponse {
  data: {
    tokens: PangolinAPIToken[]
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
    .concat(["ethereum", "bitcoin", "keep-network", "avalanche"])
  void retry(
    () =>
      fetch(`${coinGeckoAPI}?ids=${encodeURIComponent(
        tokenIds.join(","),
      )}&vs_currencies=usd
    `)
        .then((res) => res.json())
        .then(async (body: CoinGeckoReponse) => {
          const gdlPriceResponse = await axios
            .post<PangolinAPIResponse>(
              "https://api.thegraph.com/subgraphs/name/dasconnor/pangolin-dex",
              {
                operationName: "tokens",
                query: `query tokens { tokens(where: {id: "${GONDOLA_ADDRESS[
                  ChainId.AVALANCHE
                ].toLowerCase()}"}) { symbol  derivedETH  } }`,
              },
            )
            .then(({ data }) => data)

          const gdlToAVAX = Number(
            gdlPriceResponse.data.tokens[0]?.derivedETH || "0.1",
          )
          const avaxPriceUSD = body?.avalanche?.usd || 1
          const gdlToUSD = gdlToAVAX * avaxPriceUSD

          const result = tokens.reduce(
            (acc, token) => {
              return { ...acc, [token.symbol]: body?.[token.geckoId]?.usd }
            },
            {
              ETH: body?.ethereum?.usd,
              AVAX: avaxPriceUSD,
              BTC: body?.bitcoin?.usd,
              KEEP: body?.["keep-network"].usd,
              [GDL_TOKEN.symbol]: Math.round(gdlToUSD * 1000000) / 1000000,
            },
          )
          dispatch(updateTokensPricesUSD(result))
        }),
    { retries: 3 },
  )
}
