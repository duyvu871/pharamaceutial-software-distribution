export enum FinancialLedgerType {
	EXPENSE = 1,
	INCOME = 0,
	EXPENSE_FROM_PROVIDER = 2,
	INCOME_FROM_PROVIDER = 3,
	EXPENSE_FROM_CUSTOMER = 4,
	INCOME_FROM_CUSTOMER = 5,
}

export const FinancialLedgerTypeLabel = {
	[FinancialLedgerType.EXPENSE]: 'Chi',
	[FinancialLedgerType.INCOME]: 'Thu'
}

export enum FinancialLedgerStatus {
	PENDING = 'pending',
	APPROVED = 'approved',
	REJECTED = 'rejected'
}

export enum FinancialLedgerPaymentMethod {
	CASH = 0,
	BANK_TRANSFER = 1,
	CREDIT_CARD = 2,
}