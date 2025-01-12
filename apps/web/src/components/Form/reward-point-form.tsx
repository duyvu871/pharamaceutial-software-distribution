import { Button, Stack, NumberInput, Checkbox, Group, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Typography } from '@component/Typography';
import { z } from 'zod';
import { Label } from '@component/label';
import { currentBranchAtom } from '@store/state/overview/branch.ts';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { PointSettingsFormValues, pointSettingsSchema } from '@schema/branch-schema.ts';
import { upsertBranchRewardPoint } from '@api/branch.ts';
import { useDashboard } from '@hook/dashboard/use-dasboard.ts';
import useToast from '@hook/client/use-toast-notification';
import { Loader2 } from 'lucide-react';


export default function RewardPointForm() {
	const [branchDetail] = useAtom(currentBranchAtom);
	const {branchId} = useDashboard()
	const {showErrorToast, showSuccessToast} = useToast()

	const [submitting, setSubmitting] = useState<boolean>(false);
	const form = useForm<PointSettingsFormValues>({
		validate: zodResolver(pointSettingsSchema),
		initialValues: {
			conversionRate: 100000,
			pointValue: 5000,
			applyPoints: false,
		},
	});

	const handleSubmit = (values: PointSettingsFormValues) => {
		// console.log(values);
		setSubmitting(true);
		// Handle form submission
		upsertBranchRewardPoint(branchId, values)
			.then(response => {
				// console.log(response);
				showSuccessToast("Lưu thông tin tích điểm thành công");
			})
			.catch(error => {
				// console.log(error);
				showErrorToast(error.message || 'Lỗi khi lưu thông tin tích điểm \n vui lòng thử lại');
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	useEffect(() => {
		if (branchDetail) {
			form.setValues({
				conversionRate: branchDetail.store.store_reward_point.convert_rate,
				pointValue: branchDetail.store.store_reward_point.point_value,
				applyPoints: branchDetail.enabled_points,
			});
		}
	}, [branchDetail]);

	return (
		<Stack>
			<Typography
				size="h3"
				weight="semibold"
				className="border-b-[3px] border-teal-500 w-fit"
			>
				Thiết lập tích điểm
			</Typography>

			<form onSubmit={form.onSubmit(handleSubmit)} className="p-5 pt-3">
				<Stack gap="md" maw={500}>
					<Stack gap="xs">
						<Label
							label={"Ví dụ: 100,000 VND = 1 điểm"}
							position={"bottom"}
							size={"xs"}
							classNames={{
								label: 'mb-1 text-xs text-zinc-500'
							}}
						>
							<Label
								label={"Tỷ lệ điểm quy đổi"}
								position={"top"}
								classNames={{
									label: 'mb-1'
								}}
							>
								<Group align="center" gap="xs">
									<NumberInput
										placeholder="Nhập số tiền"
										color={"teal"}
										allowNegative={false}
										min={0}
										step={1000}
										{...form.getInputProps('conversionRate')}
										rightSection={<Text size="sm" c="dimmed" className={"select-none"}>VND</Text>}
										rightSectionWidth={50}
									/>
									<Typography size="content" weight={"semibold"} className={"select-none"}>=</Typography>
									<Typography size="content" weight={"semibold"} className={"select-none"}>1 điểm thưởng</Typography>
								</Group>
							</Label>
						</Label>
					</Stack>

					<Stack gap="xs">
						<Label
							label={"Ví dụ: 1 điểm = 5,000 VND khi quy đổi điểm thưởng "}
							position={"bottom"}
							size={"xs"}
							classNames={{
								label: 'mb-1 text-xs text-zinc-500'
							}}
						>
							<Label
								label={"Giá trị quy đổi"}
								position={"top"}
								classNames={{
									label: 'mb-1'
								}}
							>
								<Group align="center" gap="xs">
									<NumberInput
										placeholder="Nhập số tiền"
										allowNegative={false}
										min={0}
										step={1000}
										{...form.getInputProps('pointValue')}
										rightSection={<Text size="sm" c="dimmed" className={"select-none"}>VND</Text>}
										rightSectionWidth={50}
									/>
									<Typography size="content" weight={"semibold"} className={"select-none"}>=</Typography>
									<Typography size="content" weight={"semibold"} className={"select-none"}>1 điểm thưởng</Typography>
								</Group>
							</Label>
						</Label>
					</Stack>

					<Checkbox
						label="Áp dụng tích điểm"
						{...form.getInputProps('applyPoints', { type: 'checkbox' })}
					/>

					<Button
						type="submit"
						color="teal"
						mt="sm"
						maw={200}
						disabled={submitting}
					>
						{
							submitting ? (
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

