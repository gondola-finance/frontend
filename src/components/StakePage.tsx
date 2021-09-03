import "./StakePage.scss"

import {
  ChainId,
  DAIE_USDTE_POOL_NAME,
  GDL_POOL_NAME,
  PANGOLIN_AVAX_GDL_POOL_NAME,
  TSD_POOL_NAME,
  USDCE_POOL_NAME,
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
  const [daieUsdteTvl, setdaieUsdteTvl] = useState(0)
  const [gdlTvl, setgdlTvl] = useState(0)
  const [avaxgdlTvl, setavaxgdlTvl] = useState(0)
  const [tsdTvl, settsdTvl] = useState(0)
  const [usdceTvl, setusdceTvl] = useState(0)
  return (
    <div className="stake">
      <TopMenu activeTab={"stake"} />

      <div className="content">
        <Box my={10}>
          <h3>
            Total Value Locked: &nbsp;
            {formatUSDNumber(
              parseFloat(
                Number(
                  daieUsdteTvl + gdlTvl + avaxgdlTvl + usdceTvl + tsdTvl,
                ).toPrecision(3),
              ),
              true,
            )}
          </h3>
        </Box>
        <div className="stakePoolList">
          {chainId && chainId === ChainId.AVALANCHE && (
            <>
              <StakePool
                poolName={GDL_POOL_NAME}
                onTvlUpdate={(gdl) => setgdlTvl(gdl)}
              />
              <StakePool
                poolName={PANGOLIN_AVAX_GDL_POOL_NAME}
                onTvlUpdate={(avaxgdl) => setavaxgdlTvl(avaxgdl)}
              />
              <StakePool
                poolName={TSD_POOL_NAME}
                onTvlUpdate={(tsd) => settsdTvl(tsd)}
              />
              <StakePool
                poolName={USDCE_POOL_NAME}
                onTvlUpdate={(usdce) => setusdceTvl(usdce)}
              />
              <StakePool
                poolName={DAIE_USDTE_POOL_NAME}
                onTvlUpdate={(daieusdte) => setdaieUsdteTvl(daieusdte)}
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
