import { zodResolver } from '@hookform/resolvers/zod';
import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Branch, BranchType, createBranchSchema, CreateBranchType } from '@schema/branch-schema.ts';
import { Loader2, Plus } from "lucide-react";
import { createBranch } from '@api/branch.ts';
import useToast from '@hook/client/use-toast-notification.ts';
import { upperFirst } from '@mantine/hooks';
import { userProfileAtom } from '@store/state/profile/user-profile.ts';
import { useAtom } from 'jotai';

const CreateBranch = () => {
	const toast = useToast();
	const [userProfile, setUserProfile] = useAtom(userProfileAtom);

	const {
		getValues,
		handleSubmit,
		formState,
		setValue,
		setError,
		clearErrors,
		reset
	} = useForm<CreateBranchType>({
		resolver: zodResolver(createBranchSchema),
	});


	const [loading, setLoading] = useState<boolean>(false);

	const clearForm = () => {
		// setValue('branch_name', '');
		// setValue('address', '');
		// setValue('phone_number', '');
		// setValue('branch_status', 'active');
		// clearErrors();
		// reset();
	}

	const onSubmit = () => {
		// handle form submission
		return handleSubmit((value, e) => {
			e?.preventDefault();
			// call login function
			setLoading(true);
			createBranch(value).then((data) => {
				if (data?.errorCode) {
					toast.showErrorToast(data.errorMessage || 'Có lỗi xảy ra');
					return;
				}
				console.log(data);
				setLoading(false);
				clearForm();
				toast.showSuccessToast('Thêm chi nhánh thành công');

				if (data.branch_id && userProfile) {
					setUserProfile({
						...userProfile,
						branches: [
							data as unknown as BranchType,
							...userProfile.branches,
						]
					});
				}
			});
			console.log(value);
		}, (errors) => {
			console.log(errors);
			Object.values(errors).forEach(item => toast.showErrorToast(item.message || ''));
		});
	};

	return (
		<form onSubmit={onSubmit()}>
			<TextInput
				// value={getValues('branch_name')}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				withAsterisk
				label="Tên chi nhánh"
				error={formState.errors?.branch_name?.message}
				onChange={(event) => setValue('branch_name', event.currentTarget.value)}
			/>
			<TextInput
				// value={getValues('address')}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				withAsterisk
				mt="sm"
				label="Địa chỉ"
				placeholder=""
				error={formState.errors?.address?.message}
				onChange={(event) => setValue('address', event.currentTarget.value)}
			/>
			<TextInput
				// value={getValues('phone_number') || ''}
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect="off"
				withAsterisk
				mt="sm"
				label="Điện thoại"
				placeholder=""
				min={10}
				max={12}
				error={formState.errors?.phone_number?.message}
				onChange={(value) => setValue('phone_number', value.currentTarget.value)}
			/>
			<Select
				// value={getValues('branch_status')}
				label={'Trạng thái'}
				placeholder="Trạng thái chi nhánh"
				data={[
					{ value: 'active', label: 'Hoạt động' },
					{ value: 'inactive', label: 'Không hoạt động' },
				]}
				// defaultValue="user"
				radius="sm"
				mt="sm"
				onChange={(event) => {
					console.log('event', event);
					setValue('branch_status', event as any)
				}}
			/>
			<Button type="submit" mt="lg" className={"w-full !bg-[var(--main-color)] hover:bg-opacity-70 transition-colors"}>
				{loading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Đang thêm chi nhánh...
					</>
				) : <>
					<Plus className="mr-2 h-4 w-4"/>
					{upperFirst('thêm chi nhánh') ?? 'Thêm chi nhánh'}
				</>}
			</Button>
		</form>
	);
};

export default memo(CreateBranch);
//
// import React, { useCallback, useMemo } from 'react';
// import { FormBuilder, FormField } from '@component/Form/form-builder.tsx';
// import { AdminGettingBranches, branchDetailsSchema, branchIntegrationSchema } from '@schema/branch-schema.ts';
//
// import useToast from '@hook/client/use-toast-notification';
// import { Group, Tabs } from '@mantine/core';
// import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from "@hookform/resolvers/zod";
// import justMerge from "just-merge";
// import { adminBranchCreationSchema, AminBranchFormFieldCreation } from '@schema/admin/admin-schema.ts';
// import { useProfile } from '@hook/dashboard/use-profile.ts';
//
// type FormProps = {
// 	onSubmit?: (value: AminBranchFormFieldCreation) => void;
// 	defaultValue?: AdminGettingBranches;
// }
//
// function CreateBranch({ defaultValue, onSubmit }: FormProps) {
// 	// const [user_id, setUser_id] = React.useState<string>('');
// 	const {profile} = useProfile()
//
// 	const form = useForm<AminBranchFormFieldCreation>({
// 		resolver: zodResolver(adminBranchCreationSchema),
// 		mode: "onSubmit",
// 		defaultValues: {
// 			branch_name: defaultValue?.branch_name || "",
// 			phone_number: defaultValue?.phone_number || "",
// 			address: defaultValue?.address || "",
// 			branch_status: defaultValue?.branch_status || "active",
// 			branch_details: {
// 				so_dang_ky: defaultValue?.branch_details?.[0].so_dang_ky || '',
// 				loai_hinh: defaultValue?.branch_details?.[0].loai_hinh || '',
// 				dia_chi: defaultValue?.branch_details?.[0].dia_chi || '',
// 				nguoi_dai_dien: defaultValue?.branch_details?.[0].nguoi_dai_dien || '',
// 				nguoi_chiu_trach_nhiem: defaultValue?.branch_details?.[0].nguoi_chiu_trach_nhiem || '',
// 				so_chung_chi_hanh_nghe: defaultValue?.branch_details?.[0].so_chung_chi_hanh_nghe || '',
// 				tinh: defaultValue?.branch_details?.[0].tinh || '',
// 				huyen: defaultValue?.branch_details?.[0].huyen || '',
// 			},
// 			branch_integration: {
// 				integration_id: defaultValue?.branch_integration?.[0].integration_id || '',
// 				integration_account: defaultValue?.branch_integration?.[0].integration_account || '',
// 				integration_password: defaultValue?.branch_integration?.[0].integration_password || '',
// 			}
// 		}
// 	})
//
// 	const toast = useToast();
//
// 	const fields = useMemo(() => {
// 		const fieldsSet: FormField<typeof adminBranchCreationSchema>[]  = [
// 			{
// 				type: 'text',
// 				name: 'branch_name',
// 				label: 'Tên chi nhánh',
// 				placeholder: 'Nhập tên chi nhánh',
// 				required: true,
// 				defaultValue: defaultValue?.branch_name || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'phone_number',
// 				label: 'Số điện thoại',
// 				placeholder: 'Nhập số điện thoại',
// 				required: true,
// 				defaultValue: defaultValue?.phone_number || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'address',
// 				label: 'Địa chỉ',
// 				placeholder: 'Nhập địa chỉ',
// 				required: true,
// 				defaultValue: defaultValue?.address || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'select',
// 				name: 'branch_status',
// 				label: 'Trạng thái',
// 				required: true,
// 				placeholder: 'Chọn trạng thái',
// 				defaultValue: defaultValue?.branch_status || 'active',
// 				colSpan: 6,
// 				options: [
// 					{
// 						label: 'Ngưng hoạt động',
// 						value: 'inactive'
// 					},
// 					{
// 						label: 'Hoạt động',
// 						value: 'active'
// 					}
// 				]
// 			},
//
// 			{
// 				type: 'text',
// 				name: 'branch_details.so_dang_ky',
// 				label: 'Số đăng ký',
// 				placeholder: 'Nhập số đăng ký',
// 				required: false,
// 				defaultValue: defaultValue?.branch_details?.[0]?.so_dang_ky || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_details.loai_hinh',
// 				label: 'Loại hình',
// 				placeholder: 'Nhập loại hình',
// 				required: false,
// 				defaultValue: defaultValue?.branch_details?.[0]?.loai_hinh || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_details.dia_chi',
// 				label: 'Địa chỉ',
// 				placeholder: 'Nhập địa chỉ',
// 				required: false,
// 				defaultValue: defaultValue?.branch_details?.[0]?.dia_chi || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_details.nguoi_dai_dien',
// 				label: 'Tên người đại diện',
// 				placeholder: 'Nhập tên người đại diện',
// 				required: false,
// 				defaultValue: defaultValue?.branch_details?.[0]?.nguoi_dai_dien || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_details.nguoi_chiu_trach_nhiem',
// 				label: 'Người chịu trách nhiệm',
// 				placeholder: 'Nhập người chịu trách nhiệm',
// 				required: false,
// 				defaultValue: defaultValue?.branch_details?.[0]?.nguoi_chiu_trach_nhiem || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_details.so_chung_chi_hanh_nghe',
// 				label: 'Số chứng chỉ hành nghề',
// 				placeholder: 'Nhập số chứng chỉ hành nghề',
// 				required: false,
// 				defaultValue: defaultValue?.branch_details?.[0]?.so_chung_chi_hanh_nghe || '',
// 				colSpan: 6
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_integration.integration_id',
// 				label: 'Mã liên thông',
// 				placeholder: 'Nhập mã liên thông',
// 				required: false,
// 				defaultValue: defaultValue?.branch_integration?.[0]?.integration_id || '',
// 				colSpan: 4
// 			},
// 			{
// 				type: 'text',
// 				name: 'branch_integration.integration_account',
// 				label: 'Tài khoản liên thông',
// 				placeholder: 'Nhập tài khoản liên thông',
// 				required: false,
// 				defaultValue: defaultValue?.branch_integration?.[0]?.integration_account || '',
// 				colSpan: 4
// 			},
// 			{
// 				type: 'password',
// 				name: 'branch_integration.integration_password',
// 				label: 'Mật khẩu liên thông',
// 				placeholder: 'Nhập mật khẩu liên thông',
// 				required: false,
// 				defaultValue: defaultValue?.branch_integration?.[0]?.integration_password || '',
// 				colSpan: 4
// 			},
// 			{
// 				type: 'custom',
// 				name: 'branch_details.tinh',
// 				// label: 'Số điện thoại',
// 				placeholder: 'Nhập số điện thoại',
// 				required: false,
// 			}
// 		]
// 		return fieldsSet;
// 	}, [
// 		defaultValue?.branch_name,
// 		defaultValue?.phone_number,
// 		defaultValue?.address,
// 		defaultValue?.branch_status,
// 		defaultValue?.branch_details,
// 		defaultValue?.branch_integration
// 	]);
//
//
// 	const submit = useCallback((value: AminBranchFormFieldCreation) => {
// 		if (profile?.id || defaultValue?.owner_id) {
// 			const owner_id = profile?.id || defaultValue?.owner_id;
// 			const submitData = justMerge(defaultValue || {}, value);
// 			if (!defaultValue) submitData.user_id = owner_id;
// 			else submitData.branch_id = defaultValue.branch_id;
//
// 			onSubmit && onSubmit(submitData);
// 		} else {
// 			toast.showErrorToast('Vui lòng chọn đại lý');
// 		}
// 	}, [profile?.id, onSubmit, defaultValue, toast])
//
// 	const RegionSelect = useCallback(() => (
// 		<Group wrap={"nowrap"}>
// 			<RegionAutocomplete
// 				makeOptional={true}
// 				fieldValue={{
// 					tinh: defaultValue?.branch_details?.[0]?.tinh || '',
// 					huyen: defaultValue?.branch_details?.[0]?.huyen || '',
// 				}}
// 				setValue={(region) => {
// 					form.setValue('branch_details.tinh', region.tinh);
// 					form.setValue('branch_details.huyen', region.huyen);
// 				}}
// 				fieldShow={{
// 					tinh: true,
// 					huyen: true,
// 					xa: false,
// 				}}
// 			/>
// 		</Group>
// 	), [defaultValue?.branch_details, form])
//
// 	const customComponent = useMemo(() => ({
// 		'branch_details.tinh': RegionSelect
// 	}), [RegionSelect])
//
// 	return (
// 		<FormBuilder
// 			form={form}
// 			gap={0}
// 			color={"var(--main-color)"}
// 			fields={fields}
// 			// schema={creationSchema}
// 			submitText={defaultValue ? 'Cập nhật' : 'Tạo mới'}
// 			cancelText={'Hủy'}
// 			onSubmit={submit}
// 			customComponents={customComponent}
// 		/>
// 	);
// }
//
// export default CreateBranch;