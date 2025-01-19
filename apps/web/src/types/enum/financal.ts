
export enum FinancalLedgerType {
	income = 0,
	expense = 1,
}

export enum FinancalLedgerPaymentMethod {
	cash = 0,
	bankTransfer = 1,
}

export const financialLedgerLabels = {
	0: 'Thu',
	1: 'Chi',
} as const;