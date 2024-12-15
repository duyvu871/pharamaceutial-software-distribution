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