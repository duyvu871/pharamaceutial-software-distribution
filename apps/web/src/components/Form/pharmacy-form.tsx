import { Button, Stack, TextInput, Select, Grid, Group } from '@mantine/core';
// import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { z } from 'zod';
import RegionAutocomplete from '@component/Autocomplete/region-autocomplete.tsx';
import { useEffect, useState } from 'react';
import { BranchDetails, branchDetailsSchema } from '@schema/branch-schema.ts';
import { getBranchDetail, updateBranchDetail, upsertBranchDetail } from '@api/branch.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import { Loader2 } from 'lucide-react';
import useToast from '@hook/client/use-toast-notification.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function PharmacyForm() {
	const {branchId} = useDashboard();

	const { showErrorToast, showSuccessToast } = useToast();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const [region, setRegion] = useState<{ tinh: string, huyen: string }>({ tinh: '', huyen: '' });

	const form = useForm<BranchDetails>({
		resolver: zodResolver(branchDetailsSchema),
		defaultValues: {
			so_dang_ky: '',
			ten_nha_thuoc: '',
			loai_hinh: 'Bán lẻ',
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
		upsertBranchDetail(branchId, values)
			.then((response) => {
				if (response) {
					console.log(response);
					setIsSubmitting(false);
					showSuccessToast('Cập nhật thông tin nhà thuốc thành công');
				}
			})
			.catch((error) => {
				console.log(error);
				setIsSubmitting(false);
				showErrorToast(error.message || "Có lỗi xảy ra khi cập nhật thông tin nhà thuốc");
			});
	};

	useEffect(() => {
		getBranchDetail(branchId)
			.then((response) => {
				if (response) {
					form.reset(response);
					setRegion({
						tinh: response.tinh,
						huyen: response.huyen,
					});
				}
			})
			.catch((error) => {
				console.log(error);
				showErrorToast(error.message || "Có lỗi xảy ra khi lấy thông tin nhà thuốc");
			});
	}, []);

	return (
		<Stack w={"100%"} maw={"50vw"}>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				Thông tin nhà thuốc
			</Typography>

			<form onSubmit={form.handleSubmit(handleSubmit, (e) => console.log(e))} className="p-5 pt-3">
				<Stack gap="md">
					<Grid>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Số đăng ký"
								placeholder="Nhập số đăng ký"
								{...form.register('so_dang_ky')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Tên nhà thuốc"
								placeholder="Nhập tên nhà thuốc"
								{...form.register('ten_nha_thuoc')}
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
								onChange={(value) => form.setValue('loai_hinh', value || 'Bán lẻ')}
								defaultValue={form.getValues('loai_hinh')}
								error={form.formState.errors.loai_hinh?.message}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<TextInput
								required
								label="Số chứng chỉ hành nghề"
								placeholder="Nhập số chứng chỉ hành nghề"
								{...form.register('so_chung_chi_hanh_nghe')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={12}>
							<Group wrap={"nowrap"}>
								<RegionAutocomplete
									makeOptional={true}
									// fieldValue={{
									// 	tinh: region.tinh,//form.getValues('tinh'),
									// 	huyen: region.huyen//form.getValues('huyen'),
									// }}
									setValue={(region) => {
										form.setValue('tinh', region.tinh);
										form.setValue('huyen', region.huyen);
									}}
									fieldShow={{
										tinh: true,
										huyen: true,
										xa: false,
									}}
								/>
							</Group>
						</Grid.Col>
					</Grid>

					<TextInput
						required
						label="Địa chỉ"
						placeholder="Nhập địa chỉ chi tiết"
						{...form.register('dia_chi')}
					/>

					<Grid>
						<Grid.Col span={12}>
							<TextInput
								required
								label="Người đại diện"
								placeholder="Nhập tên người đại diện"
								{...form.register('nguoi_dai_dien')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={12}>
							<TextInput
								required
								label="Người chịu trách nhiệm"
								placeholder="Nhập tên người chịu trách nhiệm"
								{...form.register('nguoi_chiu_trach_nhiem')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={12}>
							<TextInput
								required
								label="Người chịu trách nhiệm chuyên môn"
								placeholder="Nhập tên người chịu trách nhiệm chuyên môn"
								{...form.register('nguoi_chiu_trach_nhiem_chuyen_mon')}
							/>
						</Grid.Col>
					</Grid>

					<Button
						type="submit"
						color="var(--main-color)"
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

