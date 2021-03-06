import "./StakePageInactive.scss"

import {
  ChainId,
  DAI_DAIE_POOL_NAME,
  ETH_WETHE_POOL_NAME,
  RENBTC_WBTC_POOL_NAME,
  USDT_DAI_POOL_NAME,
  USDT_USDTE_POOL_NAME,
  WBTC_WBTCE_POOL_NAME,
  ZBTC_WBTC_POOL_NAME,
  ZDAI_DAI_POOL_NAME,
  ZERO_GDL_POOL_NAME,
  ZETH_ETH_POOL_NAME,
  ZUSDT_USDT_POOL_NAME,
} from "../constants"

import React, { ReactElement, useState } from "react"
import { Box } from "@chakra-ui/react"
import Footer from "./Footer"
import StakePool from "./StakePool"
import TopMenu from "./TopMenu"
import { formatUSDNumber } from "../utils"
import { useActiveWeb3React } from "../hooks"

const StakePage = (): ReactElement => {
  const { chainId } = useActiveWeb3React()
  const [ethWetheTvl, setethWetheTvl] = useState(0)
  const [usdtUsdteTvl, setusdtUsdteTvl] = useState(0)
  const [daiTvl, setDaiTvl] = useState(0)
  const [ethTvl, setEthTvl] = useState(0)
  const [usdtTvl, setUsdtTvl] = useState(0)
  const [btcTvl, setbtcTvl] = useState(0)
  const [renBtcTvl, setrenBtcTvl] = useState(0)
  const [usdtDaiTvl, setusdtDaiTvl] = useState(0)
  const [daiDaieTvl, setdaiDaieTvl] = useState(0)
  const [wbtcWbtceTvl, setwbtcWbtceTvl] = useState(0)
  return (
    <div className="stake">
      <TopMenu activeTab={"stakeinactive"} />

      <div className="content">
        <Box my={10}>
          <h3>
            Total Value Locked: &nbsp;
            {formatUSDNumber(
              parseFloat(
                Number(
                  ethWetheTvl +
                    usdtUsdteTvl +
                    daiTvl +
                    renBtcTvl +
                    ethTvl +
                    usdtTvl +
                    btcTvl +
                    usdtDaiTvl +
                    wbtcWbtceTvl +
                    daiDaieTvl,
                ).toPrecision(3),
              ),
              true,
            )}
          </h3>
        </Box>
        <div className="stakePoolList">
          {chainId && chainId === ChainId.AVALANCHE && (
            <>
              <StakePool poolName={ZERO_GDL_POOL_NAME} />
              <StakePool
                poolName={WBTC_WBTCE_POOL_NAME}
                onTvlUpdate={(wbtc) => setwbtcWbtceTvl(wbtc)}
              />
              <StakePool
                poolName={DAI_DAIE_POOL_NAME}
                onTvlUpdate={(daie) => setdaiDaieTvl(daie)}
              />
              <StakePool
                poolName={ETH_WETHE_POOL_NAME}
                onTvlUpdate={(wethe) => setethWetheTvl(wethe)}
              />
              <StakePool
                poolName={USDT_USDTE_POOL_NAME}
                onTvlUpdate={(usdte) => setusdtUsdteTvl(usdte)}
              />
              <StakePool
                poolName={USDT_DAI_POOL_NAME}
                onTvlUpdate={(usdtdai) => setusdtDaiTvl(usdtdai)}
              />
              <StakePool
                poolName={RENBTC_WBTC_POOL_NAME}
                onTvlUpdate={(renBtc) => setrenBtcTvl(renBtc)}
              />
              <StakePool
                poolName={ZBTC_WBTC_POOL_NAME}
                onTvlUpdate={(btc) => setbtcTvl(btc)}
              />
              <StakePool
                poolName={ZDAI_DAI_POOL_NAME}
                onTvlUpdate={(dai) => setDaiTvl(dai)}
              />
              <StakePool
                poolName={ZETH_ETH_POOL_NAME}
                onTvlUpdate={(eth) => setEthTvl(eth)}
              />
              <StakePool
                poolName={ZUSDT_USDT_POOL_NAME}
                onTvlUpdate={(usdt) => setUsdtTvl(usdt)}
              />
            </>
          )}
          {chainId && chainId !== ChainId.AVALANCHE && (
            <>Staking coming soon!</>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default StakePage
