import "./Pools.scss"

import React, { ReactElement } from "react"
import PoolOverview from "../components/PoolOverview"
import { STABLECOIN_POOL_NAME } from "../constants"

import TopMenu from "../components/TopMenu"
import usePoolData from "../hooks/usePoolData"
import { useTranslation } from "react-i18next"

function Pools({
  action,
}: {
  action: "deposit" | "withdraw"
}): ReactElement | null {
  const [usdPoolData] = usePoolData(STABLECOIN_POOL_NAME)
  const { t } = useTranslation()

  return (
    <div className="poolsPage">
      <TopMenu activeTab={action} />
      <div className="content">
        <h3 className="title">{t("Select a Pool")}</h3>
        <PoolOverview data={usdPoolData} to={`/${action}/usd`} />
        {/** @todo uncomment after adding dai pool */}
        {/* <PoolOverview
          data={daiPoolData}
          to={`/${action}/dai`}
        /> */}
      </div>
    </div>
  )
}

export default Pools
