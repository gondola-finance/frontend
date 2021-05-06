import "./StakePage.scss"

import {
  GDL_POOL_NAME,
  PANGOLIN_AVAX_GDL_POOL_NAME,
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

const StakePage = (): ReactElement => {
  const [daiTvl, setDaiTvl] = useState(0)
  const [ethTvl, setEthTvl] = useState(0)
  const [usdtTvl, setUsdtTvl] = useState(0)
  return (
    <div className="stake">
      <TopMenu activeTab={"stake"} />

      <div className="content">
        <Box my={10}>
          <h3>
            Total Value Locked: &nbsp;
            {formatUSDNumber(daiTvl + ethTvl + usdtTvl)}
          </h3>
        </Box>

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
        <StakePool poolName={GDL_POOL_NAME} />
        <StakePool poolName={PANGOLIN_AVAX_GDL_POOL_NAME} />
        <StakePool poolName={ZERO_GDL_POOL_NAME} />
        <Footer />
      </div>
    </div>
  )
}

export default StakePage
