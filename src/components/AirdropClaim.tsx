import "./AirdropClaim.scss"

import React, { ReactElement, useEffect, useState } from "react"
import { AddressZero } from "@ethersproject/constants"
import { BigNumber } from "@ethersproject/bignumber"
import { Button } from "@chakra-ui/react"
import { formatBNToString } from "../utils"
import { parseBalanceMap } from "../utils/parse-balance-map"
import { useActiveWeb3React } from "../hooks"
import { useAirdropContract } from "../hooks/useContract"

type balancesOldFormat = { [account: string]: number | string }

interface Props {
  airdropAddress: string
  title: string
  balances: balancesOldFormat
}

function AirdropClaim({
  airdropAddress,
  title,
  balances,
}: Props): ReactElement {
  const { account } = useActiveWeb3React()
  const [isClaimed, setIsClaimed] = useState(false)
  const airdropContract = useAirdropContract(airdropAddress)

  const merkleInfo = parseBalanceMap(balances)
  const merkleInfoClaim = merkleInfo.claims[account || AddressZero]

  useEffect(() => {
    async function checkIsClaimed() {
      const hasUserClaimed = await airdropContract?.isClaimed(
        merkleInfoClaim.index,
      )
      setIsClaimed(hasUserClaimed || false)
    }
    void checkIsClaimed()
  }, [airdropContract, merkleInfoClaim])

  async function claimeBalance() {
    if (!merkleInfoClaim) {
      return
    }
    await airdropContract?.claim(
      merkleInfoClaim.index,
      account || AddressZero,
      merkleInfoClaim.amount,
      merkleInfoClaim.proof,
    )
  }

  let unclaimedAmountStr = formatBNToString(
    BigNumber.from(merkleInfoClaim?.amount || 0),
    18,
  )

  unclaimedAmountStr = "2000"

  return (
    <div className="airdropClaim">
      <div className="table">
        <h4 className="title"> {title} </h4>
        {merkleInfoClaim ? (
          isClaimed ? (
            <div>
              Your {unclaimedAmountStr} GDL reward has been sent to you. Please
              check your wallet.
            </div>
          ) : (
            <div>You are eligible for {unclaimedAmountStr} GDL</div>
          )
        ) : (
          <div>
            Sorry, your account is not eligible for this airdrop. Please check
            the address you are using. Follow our social media to be informed
            about the upcoming campaigns.
          </div>
        )}
        {!!merkleInfoClaim && !isClaimed && (
          <Button variant="primary" size="lg" onClick={claimeBalance}>
            Claim {unclaimedAmountStr} GDL
          </Button>
        )}
      </div>
    </div>
  )
}

export default AirdropClaim
