import "../styles/global.scss"

import {
  BLOCK_TIME,
  ChainId,
  DAIE_USDTE_POOL_NAME,
  DAI_DAIE_POOL_NAME,
  DUSDT_USDT_POOL_NAME,
  DWETH_ETH_POOL_NAME,
  ETH_WETHE_POOL_NAME,
  RENBTC_WBTC_POOL_NAME,
  TSD_POOL_NAME,
  USDCE_POOL_NAME,
  USDT_DAI_POOL_NAME,
  USDT_USDTE_POOL_NAME,
  WBTC_WBTCE_POOL_NAME,
  ZBTC_WBTC_POOL_NAME,
  ZDAI_DAI_POOL_NAME,
  ZETH_ETH_POOL_NAME,
  ZUSDC_USDC_POOL_NAME,
  ZUSDT_USDT_POOL_NAME,
} from "../constants"
import React, { ReactElement, Suspense, useCallback } from "react"
import { Route, Switch } from "react-router-dom"

import AddAvaxBSCNetwork from "./AddAvaxBSCNetwork"
import Airdrop from "./Airdrop"
import { AppDispatch } from "../state"
import Deposit from "./Deposit"
import Pools from "./Pools"
import Risk from "./Risk"
import Stake from "./Stake"
import StakeInactive from "./StakeInactive"
import Swap from "./Swap"
import ToastsProvider from "../providers/ToastsProvider"
import Web3ReactManager from "../components/Web3ReactManager"
import Withdraw from "./Withdraw"
import fetchGasPrices from "../utils/updateGasPrices"
import fetchTokenPricesUSD from "../utils/updateTokenPrices"
import { useActiveWeb3React } from "../hooks"
import { useDispatch } from "react-redux"
import usePoller from "../hooks/usePoller"

export default function App(): ReactElement {
  const dispatch = useDispatch<AppDispatch>()
  const fetchAndUpdateTokensPrice = useCallback(() => {
    fetchTokenPricesUSD(dispatch)
  }, [dispatch])
  const fetchAndUpdateGasPrice = useCallback(() => {
    void fetchGasPrices(dispatch)
  }, [dispatch])
  usePoller(fetchAndUpdateGasPrice, BLOCK_TIME)
  usePoller(fetchAndUpdateTokensPrice, BLOCK_TIME * 3)
  const { chainId } = useActiveWeb3React()
  const ALLOW_TESTNET = false

  let page
  if (
    chainId &&
    chainId !== ChainId["AVALANCHE"] &&
    chainId !== ChainId["BSC"] &&
    !ALLOW_TESTNET
  ) {
    // wrong network
    page = <AddAvaxBSCNetwork />
  }

  return (
    <Suspense fallback={null}>
      <Web3ReactManager>
        <ToastsProvider>
          {page || (
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Pools action="swap" {...props} />}
              />
              {/* swapping */}
              <Route
                exact
                path="/swap/btc"
                render={(props) => (
                  <Swap {...props} poolName={ZBTC_WBTC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/renbtc"
                render={(props) => (
                  <Swap {...props} poolName={RENBTC_WBTC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/dai"
                render={(props) => (
                  <Swap {...props} poolName={ZDAI_DAI_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/eth"
                render={(props) => (
                  <Swap {...props} poolName={ZETH_ETH_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/dweth"
                render={(props) => (
                  <Swap {...props} poolName={DWETH_ETH_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/usdc"
                render={(props) => (
                  <Swap {...props} poolName={ZUSDC_USDC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/usdtdai"
                render={(props) => (
                  <Swap {...props} poolName={USDT_DAI_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/wbtce"
                render={(props) => (
                  <Swap {...props} poolName={WBTC_WBTCE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/wethe"
                render={(props) => (
                  <Swap {...props} poolName={ETH_WETHE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/usdte"
                render={(props) => (
                  <Swap {...props} poolName={USDT_USDTE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/daie"
                render={(props) => (
                  <Swap {...props} poolName={DAI_DAIE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/daieusdte"
                render={(props) => (
                  <Swap {...props} poolName={DAIE_USDTE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/usdt"
                render={(props) => (
                  <Swap {...props} poolName={ZUSDT_USDT_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/dusdt"
                render={(props) => (
                  <Swap {...props} poolName={DUSDT_USDT_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/usdce"
                render={(props) => (
                  <Swap {...props} poolName={USDCE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/swap/tsd"
                render={(props) => <Swap {...props} poolName={TSD_POOL_NAME} />}
              />
              {/* deposit */}
              <Route
                exact
                path="/deposit"
                render={(props) => <Pools action="deposit" {...props} />}
              />
              <Route
                exact
                path="/deposit/btc"
                render={(props) => (
                  <Deposit {...props} poolName={ZBTC_WBTC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/renbtc"
                render={(props) => (
                  <Deposit {...props} poolName={RENBTC_WBTC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/eth"
                render={(props) => (
                  <Deposit {...props} poolName={ZETH_ETH_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/dweth"
                render={(props) => (
                  <Deposit {...props} poolName={DWETH_ETH_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/dai"
                render={(props) => (
                  <Deposit {...props} poolName={ZDAI_DAI_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/usdc"
                render={(props) => (
                  <Deposit {...props} poolName={ZUSDC_USDC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/usdt"
                render={(props) => (
                  <Deposit {...props} poolName={ZUSDT_USDT_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/dusdt"
                render={(props) => (
                  <Deposit {...props} poolName={DUSDT_USDT_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/usdtdai"
                render={(props) => (
                  <Deposit {...props} poolName={USDT_DAI_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/wbtce"
                render={(props) => (
                  <Deposit {...props} poolName={WBTC_WBTCE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/wethe"
                render={(props) => (
                  <Deposit {...props} poolName={ETH_WETHE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/usdte"
                render={(props) => (
                  <Deposit {...props} poolName={USDT_USDTE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/daie"
                render={(props) => (
                  <Deposit {...props} poolName={DAI_DAIE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/daieusdte"
                render={(props) => (
                  <Deposit {...props} poolName={DAIE_USDTE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/usdce"
                render={(props) => (
                  <Deposit {...props} poolName={USDCE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/deposit/tsd"
                render={(props) => (
                  <Deposit {...props} poolName={TSD_POOL_NAME} />
                )}
              />
              {/* withdraw */}
              <Route
                exact
                path="/withdraw"
                render={(props) => <Pools action="withdraw" {...props} />}
              />
              <Route
                exact
                path="/withdraw/btc"
                render={(props) => (
                  <Withdraw {...props} poolName={ZBTC_WBTC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/renbtc"
                render={(props) => (
                  <Withdraw {...props} poolName={RENBTC_WBTC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/dai"
                render={(props) => (
                  <Withdraw {...props} poolName={ZDAI_DAI_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/eth"
                render={(props) => (
                  <Withdraw {...props} poolName={ZETH_ETH_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/dweth"
                render={(props) => (
                  <Withdraw {...props} poolName={DWETH_ETH_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/usdtdai"
                render={(props) => (
                  <Withdraw {...props} poolName={USDT_DAI_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/wbtce"
                render={(props) => (
                  <Withdraw {...props} poolName={WBTC_WBTCE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/wethe"
                render={(props) => (
                  <Withdraw {...props} poolName={ETH_WETHE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/usdte"
                render={(props) => (
                  <Withdraw {...props} poolName={USDT_USDTE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/daie"
                render={(props) => (
                  <Withdraw {...props} poolName={DAI_DAIE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/daieusdte"
                render={(props) => (
                  <Withdraw {...props} poolName={DAIE_USDTE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/usdc"
                render={(props) => (
                  <Withdraw {...props} poolName={ZUSDC_USDC_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/usdt"
                render={(props) => (
                  <Withdraw {...props} poolName={ZUSDT_USDT_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/dusdt"
                render={(props) => (
                  <Withdraw {...props} poolName={DUSDT_USDT_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/usdce"
                render={(props) => (
                  <Withdraw {...props} poolName={USDCE_POOL_NAME} />
                )}
              />
              <Route
                exact
                path="/withdraw/tsd"
                render={(props) => (
                  <Withdraw {...props} poolName={TSD_POOL_NAME} />
                )}
              />
              <Route exact path="/stake" render={() => <Stake />} />
              <Route
                exact
                path="/stakeinactive"
                render={() => <StakeInactive />}
              />
              <Route exact path="/airdrop" render={() => <Airdrop />} />
              <Route exact path="/risk" component={Risk} />
            </Switch>
          )}
        </ToastsProvider>
      </Web3ReactManager>
    </Suspense>
  )
}
