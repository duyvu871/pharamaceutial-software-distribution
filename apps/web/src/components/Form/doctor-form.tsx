"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	TextInput,
	NumberInput,
	Checkbox,
	Select,
	Textarea,
	Box,
	Grid,
} from "@mantine/core";
import {
	doctorCreationSchema,
	DoctorCreationSchema, DoctorSchema,
} from '@schema/doctor-schema';
import { useContext, useEffect, useRef } from "react";
import { upsertDoctor } from "@api/doctor.ts";
import { useDashboard } from "@hook/dashboard/use-dasboard.ts";
import useToast from "@hook/client/use-toast-notification.ts";
import { useHotkeys } from "@mantine/hooks";
import { DoctorDashBoardContext } from '@container/dashboard/partner/doctor-dashboard.tsx';

export default function DoctorCreationForm({ data, submit}: {
	data?: DoctorCreationSchema;
	submit?: (data: DoctorCreationSchema) => void;
}) {
	const { branchId } = useDashboard();
	const { showErrorToast, showSuccessToast } = useToast();

	const submitRef = useRef<HTMLButtonElement>(null);
	const { control, handleSubmit, setValue } = useForm<DoctorCreationSchema>({
		resolver: zodResolver(doctorCreationSchema),
		defaultValues: {
			doctor_id: "",
			ten_bac_si: "",
			noi_cong_tac: "",
			chuyen_khoa: "",
			trinh_do: "",
			sdt: "",
			email: "",
			dia_chi: "",
			ghi_chu: "",
		},
	});

	useHotkeys([
		['F9', () => submitRef.current?.click()],
	]);

	const onSubmit = (dataCreate: DoctorCreationSchema) => {
		// Handle form submission here
		submit && submit(dataCreate);
	};


	useEffect(() => {
		if (data) {
			(Object.keys(data) as (keyof DoctorCreationSchema)[]).forEach((key) => {
				setValue(key, data[key]);
			});
		}
	}, [data]);

	return (
		<Box maw={"70vw"} mx="auto" p={10}>
			{" "}
			{/* Increased max width for better spacing */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid gutter="md" columns={24}>
					<Grid.Col span={6}>
						<Controller
							name="doctor_id"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="ID bác sĩ"
									disabled
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="ten_bac_si"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Tên bác sĩ"
									placeholder="Enter tên bác sĩ"
									required
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Controller
							name="noi_cong_tac"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Nơi công tác"
									required
									placeholder="Enter nơi công tác"
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="chuyen_khoa"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Chuyên khoa"
									placeholder="Enter chuyên khoa"
									required
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="trinh_do"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Trình độ"
									placeholder="Enter trình độ"
									required
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="sdt"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Số điện thoại"
									required
									placeholder="Enter số điện thoại"
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Controller
							name="email"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Email"
									placeholder="Enter email"
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={24}>
						<Controller
							name="dia_chi"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<TextInput
									label="Địa chỉ"
									placeholder="Enter địa chỉ"
									required
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>

					<Grid.Col span={24}>
						{" "}
						{/* Make 'ghi_chu' take full width on this row */}
						<Controller
							name="ghi_chu"
							control={control}
							render={({ field, fieldState: { error } }) => (
								<Textarea
									label="Ghi chú"
									placeholder="Enter ghi chú"
									error={error?.message}
									{...field}
								/>
							)}
						/>
					</Grid.Col>
				</Grid>

				<Button color={"var(--main-color)"} ref={submitRef} type="submit" mt="md">
					{data ? "Cập nhật" : "Tạo mới"} (F9)
				</Button>
			</form>
		</Box>
	);
}
