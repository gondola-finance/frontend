import "./Pools.scss"

import {
  ChainId,
  DAIE_USDTE_POOL_NAME,
  DAI_DAIE_POOL_NAME,
  DUSDT_USDT_POOL_NAME,
  DWETH_ETH_POOL_NAME,
  ETH_WETHE_POOL_NAME,
  RENBTC_WBTC_POOL_NAME,
  USDT_DAI_POOL_NAME,
  USDT_USDTE_POOL_NAME,
  WBTC_WBTCE_POOL_NAME,
  ZBTC_WBTC_POOL_NAME,
  ZDAI_DAI_POOL_NAME,
  ZETH_ETH_POOL_NAME,
  ZUSDT_USDT_POOL_NAME,
} from "../constants"
import React, { ReactElement } from "react"
import Footer from "../components/Footer"
import PoolOverview from "../components/PoolOverview"

import { SimpleGrid } from "@chakra-ui/react"
import TopMenu from "../components/TopMenu"
import { useActiveWeb3React } from "../hooks"
import usePoolData from "../hooks/usePoolData"
import { useTranslation } from "react-i18next"

function Pools({
  action,
}: {
  action: "deposit" | "withdraw" | "swap"
}): ReactElement | null {
  const { chainId } = useActiveWeb3React()
  const [renbtcPoolData] = usePoolData(RENBTC_WBTC_POOL_NAME)
  const [btcPoolData] = usePoolData(ZBTC_WBTC_POOL_NAME)
  const [daiPoolData] = usePoolData(ZDAI_DAI_POOL_NAME)
  const [ethPoolData] = usePoolData(ZETH_ETH_POOL_NAME)
  const [dwethPoolData] = usePoolData(DWETH_ETH_POOL_NAME)
  const [usdtPoolData] = usePoolData(ZUSDT_USDT_POOL_NAME)
  const [dusdtPoolData] = usePoolData(DUSDT_USDT_POOL_NAME)
  const [usdtDaiPoolData] = usePoolData(USDT_DAI_POOL_NAME)
  const [wbtcWbtcePoolData] = usePoolData(WBTC_WBTCE_POOL_NAME)
  const [ethWethePoolData] = usePoolData(ETH_WETHE_POOL_NAME)
  const [usdtUsdtePoolData] = usePoolData(USDT_USDTE_POOL_NAME)
  const [daiDaiePoolData] = usePoolData(DAI_DAIE_POOL_NAME)
  const [daieUsdtePoolData] = usePoolData(DAIE_USDTE_POOL_NAME)
  const { t } = useTranslation()

  return (
    <div className="poolsPage">
      <TopMenu activeTab={action} />
      <div className="content">
        <h3 className="title">{t("Select a Pool")}</h3>
        <SimpleGrid width="90%" columns={[2, 2, 2, 3]} minChildWidth="300px">
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={wbtcWbtcePoolData} to={`/${action}/wbtce`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={ethWethePoolData} to={`/${action}/wethe`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={usdtUsdtePoolData} to={`/${action}/usdte`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={daiDaiePoolData} to={`/${action}/daie`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview
              data={daieUsdtePoolData}
              to={`/${action}/daieusdte`}
            />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={daiPoolData} to={`/${action}/dai`} />
          )}
          <PoolOverview data={ethPoolData} to={`/${action}/eth`} />
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={dwethPoolData} to={`/${action}/dweth`} />
          )}
          <PoolOverview data={usdtPoolData} to={`/${action}/usdt`} />
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={dusdtPoolData} to={`/${action}/dusdt`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={btcPoolData} to={`/${action}/btc`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={renbtcPoolData} to={`/${action}/renbtc`} />
          )}
          {chainId && chainId === ChainId.AVALANCHE && (
            <PoolOverview data={usdtDaiPoolData} to={`/${action}/usdtdai`} />
          )}
        </SimpleGrid>
      </div>
      <div className="footerDiv">
        <Footer />
      </div>
    </div>
  )
}

export default Pools
