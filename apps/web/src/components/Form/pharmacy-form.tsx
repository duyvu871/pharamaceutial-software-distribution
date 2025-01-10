import { Button, Stack, TextInput, Select, Grid, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { z } from 'zod';
import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
import { useEffect, useState } from 'react';
import { BranchDetails, branchDetailsSchema } from '@schema/branch-schema.ts';
import { updateBranchDetail } from '@api/branch.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Loader2 } from 'lucide-react';
import useToast from '@hook/client/use-toast-notification.ts';

export default function PharmacyForm() {
	const {branchId} = useDashboard();

	const { showErrorToast, showSuccessToast } = useToast();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const form = useForm<BranchDetails>({
		validate: zodResolver(branchDetailsSchema),
		initialValues: {
			so_dang_ky: '',
			ten_nha_thuoc: '',
			loai_hinh: '',
			tinh: '',
			huyen: '',
			dia_chi: '',
			nguoi_dai_dien: '',
			nguoi_chiu_trach_nhiem: '',
			nguoi_chiu_trach_nhiem_chuyen_mon: '',
			so_chung_chi_hanh_nghe: '',
		},
	});

	const handleSubmit = (values: BranchDetails) => {
		console.log(values);
		// Handle form submission
		setIsSubmitting(true);
		updateBranchDetail(branchId, values).then((response) => {
			if (response) {
				console.log(response);
			}
			setIsSubmitting(false);
		});
	};

	useEffect(() => {
		console.log("PharmacyForm mounted");
	}, []);

	return (
		<Stack maw={"70vw"}>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				Thông tin nhà thuốc
			</Typography>

			<form onSubmit={form.onSubmit(handleSubmit)} className="p-5 pt-3">
				<Stack gap="md">
					<Grid>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Số đăng ký"
								placeholder="Nhập số đăng ký"
								{...form.getInputProps('so_dang_ky')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Tên nhà thuốc"
								placeholder="Nhập tên nhà thuốc"
								{...form.getInputProps('ten_nha_thuoc')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={6}>
							<Select
								required
								label="Loại hình kinh doanh"
								placeholder="Chọn loại hình"
								data={[
									{ value: 'Bán lẻ', label: 'Bán lẻ' },
									{ value: 'Bán buôn', label: 'Bán buôn' },
								]}
								{...form.getInputProps('loai_hinh')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Số chứng chỉ hành nghề"
								placeholder="Nhập số chứng chỉ hành nghề"
								{...form.getInputProps('so_chung_chi_hanh_nghe')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={12}>
							<Group wrap={"nowrap"}>
								<RegionAutocomplete makeOptional={true} setValue={(region) => {
									form.setFieldValue('tinh', region.tinh);
									form.setFieldValue('huyen', region.huyen);
								}}/>
							</Group>
						</Grid.Col>
					</Grid>

					<TextInput
						required
						label="Địa chỉ"
						placeholder="Nhập địa chỉ chi tiết"
						{...form.getInputProps('dia_chi')}
					/>

					<Grid>
						<Grid.Col span={12}>
							<TextInput
								required
								label="Người đại diện"
								placeholder="Nhập tên người đại diện"
								{...form.getInputProps('nguoi_dai_dien')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Người chịu trách nhiệm"
								placeholder="Nhập tên người chịu trách nhiệm"
								{...form.getInputProps('nguoi_chiu_trach_nhiem')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Người chịu trách nhiệm chuyên môn"
								placeholder="Nhập tên người chịu trách nhiệm chuyên môn"
								{...form.getInputProps('nguoi_chiu_trach_nhiem_chuyen_mon')}
							/>
						</Grid.Col>
					</Grid>

					<Button
						type="submit"
						color="teal"
						mt="sm"
						maw={200}
						disabled={isSubmitting}
					>
						{
							isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Đang lưu...
								</>
							) : 'Lưu'
						}
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}

