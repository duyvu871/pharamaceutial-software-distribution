import { atom } from 'jotai';
import { InvoiceType, PrescriptionCreationSchema, PrescriptionFormData } from '@schema/invoice-schema.ts';
import { v4 as uuidV4, v1 as uuid} from 'uuid';
import { generateTimeBasedId } from '@util/uid.ts';
import { CurrentRewardPointSchema, RewardPointSchema } from '@schema/reward-point-schema.ts';
import { DoctorSchema } from '@schema/doctor-schema.ts';

export type InvoiceState = {
	id: string;
	name: string;
	time: Date;
	unit?: string;
	invoiceData: InvoiceType;
}

const defaultInvoice: InvoiceType = {
	branchId: '',
	saleDate: new Date(),
	saleTime: '',
	customerName: '',
	priceList: '',
	point: {
		used: 0,
		pointValue: 0,
	},
	vat: 0,
	isPrescriptionSale: false,
	totalPrice: 0,
	discount: 0,
	otherCharges: [],
	amountDue: 0,
	amountPaid: 0,
	notes: '',
	autoPrintInvoice: false,
	printBatchNumber: false,
	debit: 0,
	user: {
		type: 'user',
		id: '',
	},
	items: [],
}
const defaultInvoiceState: InvoiceState = {
	id: generateTimeBasedId(),//uuidV4(),
	name: 'Hóa đơn 1',
	time: new Date(),
	invoiceData: defaultInvoice,
}

export const invoiceAtom = atom<Record<string, InvoiceState>>({
	[defaultInvoiceState.id]: defaultInvoiceState,
});
export const invoiceHistoryAtom = atom<InvoiceState[]>([]);
export const invoiceActiveTabAtom = atom<string>(defaultInvoiceState.id);

export const invoiceActionAtom = atom(
	(get) => get(invoiceAtom),
	(
		get,
		set,
		action:
			| { type: 'add'; name: string; }
			| { type: 'remove'; id: string }
			| { type: 'update'; id: string; invoice: Partial<InvoiceType> }
			| { type: 'add-item'; id: string; item: InvoiceType['items'][number] }
			| { type: 'update-item'; id: string; itemId: string, item: Partial<InvoiceType['items'][number]> }
			| { type: 'remove-item'; id: string; itemId: string }
			| { type: 'update-invoice-state'; id: string; state: Partial<InvoiceState> }
			| { type: 'clear' }
	) => {
		const currentInvoice = get(invoiceAtom);
		if (action.type === 'add') {
			const { name } = action;
			const invoiceExists = currentInvoice[name];
			if (invoiceExists) {
				return;
			}

			const newTab: InvoiceState = {
				id: generateTimeBasedId(),//uuidV4(),
				name,
				time: new Date(),
				invoiceData: defaultInvoice,
			}

			// add new prescription tab with the same id as the invoice
			set(prescriptionActionAtom, { type: 'add', id: newTab.id});

			set(invoiceAtom, {
				...currentInvoice,
				[newTab.id]: newTab,
			});

			return newTab.id;
		}
		else if (action.type === 'remove') {
			const { id } = action;
			const { [id]: removed, ...rest } = currentInvoice;

			// remove prescription tab with the same id as the invoice
			set(prescriptionActionAtom, { type: 'remove', id });

			set(invoiceHistoryAtom, [
				...get(invoiceHistoryAtom),
				{
					id: removed.id,
					name: removed.name,
					time: removed.time,
					invoiceData: removed.invoiceData,
				}
			])
			set(invoiceAtom, rest);
		}
		else if (action.type === 'update') {
			const { id, invoice } = action;
			if (!currentInvoice[id]) {
				return;
			}


			const updatedInvoice = {
				...currentInvoice[id],
				invoiceData: {
					...currentInvoice[id].invoiceData,
					// ...updatedInvoiceData,
					...invoice,
				},
			}

			const updatedInvoiceData = calculateInvoicePrice(
				updatedInvoice,
				{ type: 'update', invoice }
			)

			updatedInvoice.invoiceData = {
				...updatedInvoice.invoiceData,
				...updatedInvoiceData,
			}

			set(invoiceAtom, {
				...currentInvoice,
				[id]: updatedInvoice,
			});
		}
		else if (action.type === 'add-item') {
			const { id, item } = action;
			const currentInvoiceActive = currentInvoice[id];
			if (!currentInvoiceActive) {
				return;
			}

			const isItemExists = currentInvoiceActive.invoiceData.items.find(i => i.id === item.id);

			const newItems = isItemExists ? currentInvoiceActive.invoiceData.items.map(i =>
				i.id === item.id ? {
					...i,
					quantity: (i.quantity || 0) + 1,
					total: (i.quantity + 1) * (i.price)
				} : i
			) : [...currentInvoiceActive.invoiceData.items, item];

			const updatedInvoiceStateActive = {
				...currentInvoiceActive,
				invoiceData: {
					...currentInvoiceActive.invoiceData,
					items: newItems,
				},
			}

			const updatedInvoice = calculateInvoicePrice(
				updatedInvoiceStateActive,
				{ type: 'add-item', item }
			);

			console.log("updatedInvoice", updatedInvoice);

			updatedInvoiceStateActive.invoiceData = {
				...updatedInvoiceStateActive.invoiceData,
				...updatedInvoice,
			}

			set(invoiceAtom, {
				...currentInvoice,
				[id]: {
					...updatedInvoiceStateActive,
				},
			});
		}
		else if (action.type === 'update-item') {
			const { id, itemId, item } = action;
			const currentInvoiceActive = currentInvoice[id];
			if (!currentInvoiceActive) {
				return;
			}

			const updatedInvoiceStateActive = {
				...currentInvoiceActive,
				invoiceData: {
					...currentInvoiceActive.invoiceData,
					items: currentInvoiceActive.invoiceData.items.map(i =>
						i.id === itemId ? {
							...i,
							...item,
							total: (item.quantity || i.quantity) * (item.price || i.price)
						} : i
					),
				}
			}

			const updatedInvoice = calculateInvoicePrice(
				updatedInvoiceStateActive,
				{ type: 'update-item', itemId, item }
			);
			set(invoiceAtom, {
				...currentInvoice,
				[id]: {
					...updatedInvoiceStateActive,
					invoiceData: {
						...updatedInvoiceStateActive.invoiceData,
						...updatedInvoice,
					},
				},
			});
		}
		else if (action.type === 'remove-item') {
			const { id, itemId } = action;
			const currentInvoiceActive = currentInvoice[id];
			if (!currentInvoiceActive) {
				return;
			}

			const updatedInvoice = calculateInvoicePrice(
				currentInvoiceActive,
				{ type: 'remove-item', itemId }
			);
			set(invoiceAtom, {
				...currentInvoice,
				[id]: {
					...currentInvoiceActive,
					invoiceData: {
						...currentInvoiceActive.invoiceData,
						...updatedInvoice,
						items: currentInvoiceActive.invoiceData.items.filter(i => i.id !== itemId),
					},
				},
			});
		}
		else if (action.type === 'update-invoice-state') {
			const { id, state } = action;
			if (!currentInvoice[id]) {
				return;
			}

			const updatedInvoice = calculateInvoicePrice(
				currentInvoice[id],
				{ type: 'update-invoice-state', state }
			);
			set(invoiceAtom, {
				...currentInvoice,
				[id]: {
					...currentInvoice[id],
					invoiceData: {
						...currentInvoice[id].invoiceData,
						...updatedInvoice,
						...state,
					},
				},
			});
		}
		else if (action.type === 'clear') {
			set(invoiceAtom, {});
		}
	}
);

export const invoiceActiveTabActionAtom = atom(
	(get) => get(invoiceActiveTabAtom),
	(
		get,
		set,
		action:
			| { type: 'set'; id: string }
			| { type: 'next'}
			| { type: 'prev'}
			| { type: 'clear' }
	) => {
		if (action.type === 'set') {
			const { id } = action;
			set(invoiceActiveTabAtom, id);
		}
		else if (action.type === 'next' || action.type === 'prev') {
			const currentInvoice = get(invoiceAtom);
			const tabs = Object.keys(currentInvoice);
			const currentTab = get(invoiceActiveTabAtom);
			const currentIndex = tabs.findIndex((id) => id === currentTab);
			if (currentIndex === 0 && action.type === 'prev') {
				return;
			}
			const nextIndex = currentIndex + (action.type === 'next' ? 1 : -1);
			if (nextIndex >= tabs.length) {
				return;
			}
			set(invoiceActiveTabAtom, tabs[nextIndex]);
		}
		else if (action.type === 'clear') {
			set(invoiceActiveTabAtom, '');
		}
	}
);

export const calculateInvoicePrice = (
	invoiceState: InvoiceState,
	action:
		| { type: 'add-item'; item: InvoiceType['items'][number] }
		| { type: 'update-item'; itemId: string; item: Partial<InvoiceType['items'][number]> }
		| { type: 'update'; invoice: Partial<InvoiceType> }
		| { type: 'remove-item'; itemId: string }
		| { type: 'update-invoice-state'; state: Partial<InvoiceState> }
): {
	totalPrice: number;
	amountDue: number;
	amountPaid: number;
	debit: number;
	discount: number;
	otherCharges: { name: string; value: number }[];
} => {
	let { totalPrice, discount, otherCharges, amountPaid, debit, items, vat, point } = invoiceState.invoiceData;

	switch (action.type) {
		case 'add-item':
			items = [...items];
			// console.log("items", items);
			break;
		case 'update-item':
			items = items.map(i =>
				i.id === action.itemId
					? {
						...i,
						...action.item,
						total: (action.item.quantity || i.quantity) * (action.item.price || i.price)
						}
					: i);
			break;
		case 'update':
			discount = action.invoice.discount ?? discount;
			otherCharges = action.invoice.otherCharges ?? otherCharges;
			amountPaid = action.invoice.amountPaid ?? amountPaid;
			debit = action.invoice.debit ?? debit;
			items = action.invoice.items ?? items;
			break;
		case 'remove-item':
			items = items.filter(i => i.id !== action.itemId);
			break;
		case 'update-invoice-state':
			discount = action.state.invoiceData?.discount ?? discount;
			otherCharges = action.state.invoiceData?.otherCharges ?? otherCharges;
			amountPaid = action.state.invoiceData?.amountPaid ?? amountPaid;
			debit = action.state.invoiceData?.debit ?? debit;
			items = action.state.invoiceData?.items ?? items;
			break;
	}

	totalPrice =
		items.reduce((sum, item) => sum + item.total, 0)
		+ otherCharges.reduce((sum, charge) => sum + charge.value, 0);

	// totalPrice = totalPrice + totalPrice * vat / 100;

	// discount = ( point ? point.used * point.pointValue : 0);

	const amountDue = totalPrice - ( point ? point.used * point.pointValue : 0) + totalPrice * vat / 100;

	console.log("amountDue", amountDue, "point", point);

	debit = amountPaid - amountDue;

	return {
		totalPrice,
		amountDue,
		amountPaid,
		debit,
		discount,
		otherCharges
	};
};

const defaultPrescription: PrescriptionCreationSchema = {
	ma_don_thuoc: '',
	ngay_ke: new Date(),
	bac_si_id: '',
	co_so_kham: '',
	chuan_doan: '',
	benh_nhan: '',
	nam_sinh: 0,
	tuoi: 0,
	thang_tuoi: 0,
	can_nang: 0,
	gioi_tinh: 0,
	dia_chi: '',
	nguoi_giam_ho: '',
	cmnd: '',
	dien_thoai: '',
	the_bhyt: '',
}

const defaultDoctor: DoctorSchema = {
	id: '',
	ten_bac_si: '',
	doctor_id: "",
	noi_cong_tac: "",
	chuyen_khoa: "",
	trinh_do: "",
	sdt: "",
	email: "",
	dia_chi: "",
	ghi_chu: "",
	status: 1,
	is_active: true,
	ten_slug: "",
	is_deleted: false,
	loai_so_quy: 0,
	created_at: new Date().toLocaleDateString(),
	updated_at: new Date().toLocaleDateString(),
}

// invoice sale prescription
export const prescriptionSaleAtom = atom<Record<string, PrescriptionCreationSchema>>({
	[defaultInvoiceState.id]: defaultPrescription,
});
// doctor prescription
export const prescriptionDoctorAtom = atom<Record<string, DoctorSchema>>({
	[defaultInvoiceState.id]: defaultDoctor,
});

// prescription action
// prescription sale and doctor are in the same tab and depend on the active tab
export const prescriptionActionAtom = atom(
	(get) => get(prescriptionSaleAtom),
	(
		get,
		set,
		action:
			| { type: 'add'; id?: string; }
			| { type: 'remove'; id: string }
			| { type: 'update'; id?: string; data: Partial<PrescriptionCreationSchema> }
			| { type: 'update-doctor'; id?: string; data: Partial<DoctorSchema> }
	) => {
		const currentPrescription = get(prescriptionSaleAtom);
		const currentDoctor = get(prescriptionDoctorAtom);
		const currentActiveTab = get(invoiceActiveTabAtom);
		const currentId = action.id || currentActiveTab;
		if (action.type === 'add') {
			const { id } = action;
			set(prescriptionSaleAtom, {
				...currentPrescription,
				[currentId]: defaultPrescription,
			});
			set(prescriptionDoctorAtom, {
				...currentDoctor,
				[currentId]: defaultDoctor,
			})
		}
		else if (action.type === 'remove') {
			const { id } = action;
			const { [id]: removed, ...rest } = currentPrescription;
			const { [id]: removedDoctor, ...restDoctor } = currentDoctor;
			set(prescriptionSaleAtom, rest);
			set(prescriptionDoctorAtom, restDoctor);
		}
		else if (action.type === 'update') {
			const { id, data } = action;
			set(prescriptionSaleAtom, {
				...currentPrescription,
				[currentId]: {
					...currentPrescription[currentId],
					...data,
				},
			});
		}
		else if (action.type === 'update-doctor') {
			const { id, data } = action;
			set(prescriptionDoctorAtom, {
				...currentDoctor,
				[currentId]: {
					...currentDoctor[currentId],
					...data,
				},
			});
		}
	}
);


export const rewardPointAtom = atom<RewardPointSchema | null>(null);
export const currentRewardPointAtom = atom<CurrentRewardPointSchema | null>(null);
