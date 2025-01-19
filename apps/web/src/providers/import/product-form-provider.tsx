"use client";

import { createContext } from "react"
import { ProductFormData, productFormSchema } from '@schema/product-schema.ts';
import { useForm , UseFormReturn} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'

export type ImportProductFormContextType = {
	useForm: UseFormReturn<ProductFormData>
	resetForm: () => void
}

export type ImportProductFormProviderProps = {
	children: React.ReactNode
}

export const ImportProductFormContext = createContext<ImportProductFormContextType>({
	useForm: {} as UseFormReturn<ProductFormData>,
	resetForm: () => {}
})

export const ImportProductFormProvider = ({children}: ImportProductFormProviderProps) => {
	const form = useForm<ProductFormData>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			type: 'thuoc',
			code: '',
			purchasePrice: 0,
			sellingPrice: 0,
			// useBefore: '30',
			// vat: '10',
			unit: 'vien',
			largerUnit: '',
		},
	})

	const clearForm = () => {
		// setFiles([])
		const { setValue } = form;
		setValue('name', '')
		setValue('type', 'thuoc')
		setValue('code', '')
		setValue('registrationNumber', '')
		// setValue('purchasePrice', 0)
		// setValue('sellingPrice', 0)
		setValue('manufacturer', '')
		setValue('usage', '')
		setValue('ingredients', '')
		setValue('packaging', '')
		setValue('activeIngredient', '')
		setValue('content', '')
		// setValue('lotNumber', '')
		setValue('expiryDate', new Date())
		setValue('quantity', 0)
		setValue('importDate', new Date())
		// setValue('useBefore', '30')
		// setValue('vat', '0')
		setValue('note', '')
		setValue('unit', 'vien')
		setValue('largerUnit', '')
		setValue('largerUnitValue', '')
	}

	return (
		<ImportProductFormContext.Provider value={{
			useForm: form,
			resetForm: clearForm
		}}>
			{children}
		</ImportProductFormContext.Provider>
	)
}