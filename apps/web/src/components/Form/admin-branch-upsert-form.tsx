import React, { useCallback, useMemo } from 'react';
import { FormBuilder, FormField } from '@component/Form/form-builder.tsx';
import { z } from 'zod';
import { phoneRegex } from '@util/validator.ts';
import { AdminGettingBranches, branchDetailsSchema, branchIntegrationSchema } from '@schema/branch-schema.ts';
import UserAutocomplete from '@component/Autocomplete/user-autocomplete.tsx';
import { Label } from '@component/label';
import useToast from '@hook/client/use-toast-notification';
import { Group, Tabs } from '@mantine/core';
import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import justMerge from "just-merge";
import { adminBranchCreationSchema, AminBranchFormFieldCreation } from '@schema/admin/admin-schema.ts';

type FormProps = {
	onSubmit?: (value: AminBranchFormFieldCreation) => void;
	defaultValue?: AdminGettingBranches;
}

function AdminBranchUpsertForm({ defaultValue, onSubmit }: FormProps) {
	const [user_id, setUser_id] = React.useState<string>('');

	const form = useForm<AminBranchFormFieldCreation>({
		resolver: zodResolver(adminBranchCreationSchema),
		mode: "onSubmit",
		defaultValues: {
			branch_name: defaultValue?.branch_name || "",
			phone_number: defaultValue?.phone_number || "",
			address: defaultValue?.address || "",
			branch_status: defaultValue?.branch_status || "active",
			branch_details: {
				so_dang_ky: defaultValue?.branch_details?.[0].so_dang_ky || '',
				loai_hinh: defaultValue?.branch_details?.[0].loai_hinh || '',
				dia_chi: defaultValue?.branch_details?.[0].dia_chi || '',
				nguoi_dai_dien: defaultValue?.branch_details?.[0].nguoi_dai_dien || '',
				nguoi_chiu_trach_nhiem: defaultValue?.branch_details?.[0].nguoi_chiu_trach_nhiem || '',
				so_chung_chi_hanh_nghe: defaultValue?.branch_details?.[0].so_chung_chi_hanh_nghe || '',
				tinh: defaultValue?.branch_details?.[0].tinh || '',
				huyen: defaultValue?.branch_details?.[0].huyen || '',
			},
			branch_integration: {
				integration_id: defaultValue?.branch_integration?.[0].integration_id || '',
				integration_account: defaultValue?.branch_integration?.[0].integration_account || '',
				integration_password: defaultValue?.branch_integration?.[0].integration_password || '',
			}
		}
	})

	const toast = useToast();

	const fields = useMemo(() => {
		const fieldsSet: FormField<typeof adminBranchCreationSchema>[]  = [
			{
				type: 'text',
				name: 'branch_name',
				label: 'Tên chi nhánh',
				placeholder: 'Nhập tên chi nhánh',
				required: true,
				defaultValue: defaultValue?.branch_name || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'phone_number',
				label: 'Số điện thoại',
				placeholder: 'Nhập số điện thoại',
				required: true,
				defaultValue: defaultValue?.phone_number || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'address',
				label: 'Địa chỉ',
				placeholder: 'Nhập địa chỉ',
				required: true,
				defaultValue: defaultValue?.address || '',
				colSpan: 6
			},
			{
				type: 'select',
				name: 'branch_status',
				label: 'Trạng thái',
				required: true,
				placeholder: 'Chọn trạng thái',
				defaultValue: defaultValue?.branch_status || 'active',
				colSpan: 6,
				options: [
					{
						label: 'Ngưng hoạt động',
						value: 'inactive'
					},
					{
						label: 'Hoạt động',
						value: 'active'
					}
				]
			},

			{
				type: 'text',
				name: 'branch_details.so_dang_ky',
				label: 'Số đăng ký',
				placeholder: 'Nhập số đăng ký',
				required: false,
				defaultValue: defaultValue?.branch_details?.[0]?.so_dang_ky || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'branch_details.loai_hinh',
				label: 'Loại hình',
				placeholder: 'Nhập loại hình',
				required: false,
				defaultValue: defaultValue?.branch_details?.[0]?.loai_hinh || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'branch_details.dia_chi',
				label: 'Địa chỉ',
				placeholder: 'Nhập địa chỉ',
				required: false,
				defaultValue: defaultValue?.branch_details?.[0]?.dia_chi || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'branch_details.nguoi_dai_dien',
				label: 'Tên người đại diện',
				placeholder: 'Nhập tên người đại diện',
				required: false,
				defaultValue: defaultValue?.branch_details?.[0]?.nguoi_dai_dien || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'branch_details.nguoi_chiu_trach_nhiem',
				label: 'Người chịu trách nhiệm',
				placeholder: 'Nhập người chịu trách nhiệm',
				required: false,
				defaultValue: defaultValue?.branch_details?.[0]?.nguoi_chiu_trach_nhiem || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'branch_details.so_chung_chi_hanh_nghe',
				label: 'Số chứng chỉ hành nghề',
				placeholder: 'Nhập số chứng chỉ hành nghề',
				required: false,
				defaultValue: defaultValue?.branch_details?.[0]?.so_chung_chi_hanh_nghe || '',
				colSpan: 6
			},
			{
				type: 'text',
				name: 'branch_integration.integration_id',
				label: 'Mã liên thông',
				placeholder: 'Nhập mã liên thông',
				required: false,
				defaultValue: defaultValue?.branch_integration?.[0]?.integration_id || '',
				colSpan: 4
			},
			{
				type: 'text',
				name: 'branch_integration.integration_account',
				label: 'Tài khoản liên thông',
				placeholder: 'Nhập tài khoản liên thông',
				required: false,
				defaultValue: defaultValue?.branch_integration?.[0]?.integration_account || '',
				colSpan: 4
			},
			{
				type: 'password',
				name: 'branch_integration.integration_password',
				label: 'Mật khẩu liên thông',
				placeholder: 'Nhập mật khẩu liên thông',
				required: false,
				defaultValue: defaultValue?.branch_integration?.[0]?.integration_password || '',
				colSpan: 4
			},
			{
				type: 'custom',
				name: 'branch_details.tinh',
				// label: 'Số điện thoại',
				placeholder: 'Nhập số điện thoại',
				required: false,
			}
		]

		if (!defaultValue) {
			fieldsSet.unshift({
				type: 'custom',
				name: 'user_id',
				label: "Đại lý",
			})
		}

		return fieldsSet;
	}, [
		defaultValue,
		defaultValue?.branch_name,
		defaultValue?.phone_number,
		defaultValue?.address,
		defaultValue?.branch_status,
		defaultValue?.branch_details,
		defaultValue?.branch_integration
	]);


	const submit = useCallback((value: AminBranchFormFieldCreation) => {
		console.log('submit', value);
		if (user_id || defaultValue?.owner_id) {
			const owner_id = user_id || defaultValue?.owner_id;
			const submitData = justMerge(defaultValue || {}, value);
			if (!defaultValue) submitData.user_id = owner_id;
			else submitData.branch_id = defaultValue.branch_id;

			onSubmit && onSubmit(submitData);
		} else {
			toast.showErrorToast('Vui lòng chọn đại lý');
		}
	}, [user_id, onSubmit, defaultValue, toast])

	const UserSelect = useCallback(() =>
		<Label label={"Đại lý"} position={"top"} required>
			<UserAutocomplete
				size={"sm"}
				setValue={(value) => {
					if (value) setUser_id(value.id);
				}}
			/>
		</Label>
		, [setUser_id])

	const RegionSelect = useCallback(() => (
		<Group wrap={"nowrap"}>
			<RegionAutocomplete
				makeOptional={true}
				fieldValue={{
					tinh: defaultValue?.branch_details?.[0]?.tinh || '',
					huyen: defaultValue?.branch_details?.[0]?.huyen || '',
				}}
				setValue={(region) => {
					form.setValue('branch_details.tinh', region.tinh);
					form.setValue('branch_details.huyen', region.huyen);
				}}
				fieldShow={{
					tinh: true,
					huyen: true,
					xa: false,
				}}
			/>
		</Group>
	), [defaultValue?.branch_details, form])

	const customComponent = useMemo(() => ({
		user_id: UserSelect,
		'branch_details.tinh': RegionSelect
	}), [UserSelect, RegionSelect])

	return (
		<FormBuilder
			form={form}
			gap={0}
			color={"var(--main-color)"}
			fields={fields}
			// schema={creationSchema}
			submitText={defaultValue ? 'Cập nhật' : 'Tạo mới'}
			cancelText={'Hủy'}
			onSubmit={submit}
			customComponents={customComponent}
		/>
	);
}

export default AdminBranchUpsertForm;