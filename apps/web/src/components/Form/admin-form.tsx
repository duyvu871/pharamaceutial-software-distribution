import { Button, TextInput, Group, Select } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminCreateSchema, adminSchema, AdminType } from '@schema/admin/admin-schema.ts';


export const AdminForm = (
	{ onSubmit, onClose, data}: {
	onSubmit: (values: AdminCreateSchema) => void;
	onClose: () => void;
	data?: NullableProperties<AdminType>;
}) => {
	const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<AdminCreateSchema>({
		resolver: zodResolver(adminSchema),
		mode: "onBlur",
		defaultValues: {
			username: "",
			password: undefined,
			address: undefined,
			phone_number: undefined,
			first_name: undefined,
			last_name: undefined,
			postal_code: undefined,
			email: undefined,
			gender: "other",
			dob: undefined,
		},
	});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (data) {
			setValue("username", data.username ?? "");
			setValue("password", data.password ?? "");
			setValue("address", data.address ?? "");
			setValue("phone_number", data.phone_number ?? "");
			setValue("last_name", data.last_name ?? "");
			setValue("first_name", data.first_name ?? "");
			setValue("postal_code", data.postal_code ?? "");
			setValue("email", data.email ?? "");
			setValue("dob", data.dob ?? "");
			setValue("gender", data.gender ?? "other");
		}
	}, [data]);

	return (
		<form
			onSubmit={handleSubmit((values) => {
				onSubmit(values);
				// onClose();
			})}
		>
			<Group grow>
				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<TextInput
							withAsterisk
							label="Tài khoản"
							placeholder="Nhập Tài khoản"
							disabled={!!data}
							{...field}
							error={errors.username?.message}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextInput
							withAsterisk
							label="Mật Khẩu"
							placeholder="Nhập mật khẩu"
							type={showPassword ? "text" : "password"}
							{...field}
							error={errors.password?.message}
							rightSection={
								<Button
									variant="subtle"
									onClick={() => setShowPassword(!showPassword)}
									styles={{
										root: {
											color: "white",
											backgroundColor: "transparent", // Nền trong suốt
											padding: "0px 0px",
											fontWeight: "bold",
										},
									}}
								>
									{showPassword ? "Ẩn" : "Hiện"}
								</Button>
							}
						/>
					)}
				/>
			</Group>

			<Group grow>
				<Controller
					name="first_name"
					control={control}
					render={({ field }) => (
						<TextInput
							withAsterisk
							label="Họ"
							placeholder="Nhập Họ"
							{...field}
							error={errors.username?.message}
						/>
					)}
				/>
				<Controller
					name="last_name"
					control={control}
					render={({ field }) => (
						<TextInput
							withAsterisk
							label="Tên"
							placeholder="Nhập Tên"
							{...field}
							error={errors.password?.message}
						/>
					)}
				/>
			</Group>

			<Group grow>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextInput
							label="Email"
							placeholder="Nhập Email"
							{...field}
							error={errors.email?.message}
						/>
					)}
				/>
				<Controller
					name="phone_number"
					control={control}
					render={({ field }) => (
						<TextInput
							label="Số Điện Thoại"
							placeholder="Nhập Số Điện Thoại"
							{...field}
							error={errors.phone_number?.message}
						/>
					)}
				/>
			</Group>

			<Controller
				name="address"
				control={control}
				render={({ field }) => (
					<TextInput
						label="Địa Chỉ"
						placeholder="Nhập địa chỉ"
						{...field}
						error={errors.address?.message}
					/>
				)}
			/>

			<Controller
				name="postal_code"
				control={control}
				render={({ field }) => (
					<TextInput
						label="Mã Bưu Điện"
						placeholder="Nhập Mã Bưu Điện"
						{...field}
						error={errors.postal_code?.message}
					/>
				)}
			/>

			<Group grow>
				<Controller
					name="gender"
					control={control}
					render={({ field }) => (
						<Select
							label="Giới Tính"
							placeholder="Chọn giới tính"
							data={[
								{ value: "male", label: "Nam" },
								{ value: "female", label: "Nữ" },
								{ value: "other", label: "Khác" },
							]}
							{...field}
							error={errors.gender?.message}
						/>
					)}
				/>
				<Controller
					name="dob"
					control={control}
					render={({ field }) => (
						<DatePickerInput
							label="Ngày Sinh"
							placeholder="dd/mm/yyyy"
							{...field}
							error={errors.dob?.message}
							value={field.value ? new Date(field.value) : null}
							onChange={(value) => {
								field.onChange(value?.toISOString());
							}}
						/>
					)}
				/>
			</Group>

			<Group mt="md">
				<Button w={100} variant="outline" color={"var(--main-color)"} onClick={onClose}>
					Hủy
				</Button>
				<Button w={150} type="submit" color={"var(--main-color)"}>Tạo Mới</Button>
			</Group>
		</form>
	);
};