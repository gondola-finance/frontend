import { BigNumber } from "@ethersproject/bignumber"
import { Token } from "../constants"

/** TRANSACTIONS */
export interface TransactionItem {
  token: Token
  amount: BigNumber
  singleTokenPriceUSD: BigNumber
  valueUSD: BigNumber // amount * singleTokenPriceUSD / token.decimals
}

type AggregateValues = {
  totalAmount: BigNumber
  totalValueUSD: BigNumber
}

type SingleItem = { item: TransactionItem } & AggregateValues

type MultipleItems = { items: TransactionItem[] } & AggregateValues

interface _BaseTransaction {
  from: SingleItem | MultipleItems
  to: SingleItem | MultipleItems
  priceImpact: BigNumber
  txnFee?: BigNumber
}

export interface DepositTransaction extends _BaseTransaction {
  from: MultipleItems
  to: SingleItem
  shareOfPool: BigNumber
  isImbalance: boolean
}

export interface WithdrawTransaction extends _BaseTransaction {
  from: SingleItem
  to: MultipleItems
  shareOfPool: BigNumber
}

export interface SwapTransaction extends _BaseTransaction {
  from: SingleItem
  to: SingleItem
  exchangeRate: BigNumber
}
/** TRANSACTIONS END */
