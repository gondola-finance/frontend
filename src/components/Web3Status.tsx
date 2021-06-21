import "./Web3Status.scss"

import { CHAINS_LOGO, ChainId, NETWORKS } from "../constants"
import React, { ReactElement, useState } from "react"

import ChangeNetwork from "./ChangeNetwork"
import ConnectWallet from "./ConnectWallet"
import Modal from "./Modal"
import profile from "../assets/icons/profile.svg"
import { useActiveWeb3React } from "../hooks"
import { useTranslation } from "react-i18next"

const Web3Status = (): ReactElement => {
  const { account, chainId } = useActiveWeb3React()
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [netModalOpen, setNetModalOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="walletStatus">
      <button type="button" onClick={(): void => setNetModalOpen(true)}>
        {chainId && chainId !== ChainId.FUJI && (
          <>
            <img src={CHAINS_LOGO[chainId]} alt="icon" className="icon" />
            {NETWORKS[chainId].chainName}
          </>
        )}
      </button>

      <button type="button" onClick={(): void => setWalletModalOpen(true)}>
        {account ? (
          <div className="hasAccount">
            <span>
              {account.substring(0, 6)}...
              {account.substring(account.length - 4, account.length)}
            </span>

            {/* Link real profile image here */}
            <img alt="profile" src={profile} />
          </div>
        ) : (
          <div className="noAccount">{t("connectWallet")}</div>
        )}
      </button>
      <Modal
        isOpen={walletModalOpen}
        onClose={(): void => setWalletModalOpen(false)}
      >
        <ConnectWallet onClose={(): void => setWalletModalOpen(false)} />
      </Modal>

      <Modal isOpen={netModalOpen} onClose={(): void => setNetModalOpen(false)}>
        <ChangeNetwork onClose={(): void => setNetModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default Web3Status
