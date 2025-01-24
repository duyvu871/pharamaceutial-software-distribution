import { Button, TextInput, Group, Select } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema } from '@schema/user-schema.ts';

// Zod Schema
export const userSchema = z.object({
	id: z.string().optional(),
	username: z
		.string()
		.nonempty({ message: 'Tên tài khoản không được để trống' })
		.min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
	password: z
		.string()
		.min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
	address: z.string().optional(),
	phone_number: z.string()
		.min(10, { message: 'SDT phải có ít nhất 10 ký tự' }),
	email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
	notes: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm = ({
													 onSubmit,
													 onClose,
													 data
												 }: {
	onSubmit: (values: UserFormValues) => void;
	onClose: () => void;
	data?: NullableProperties<UserSchema>
}) => {
	const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<UserFormValues>({
		resolver: zodResolver(userSchema),
		mode: "onBlur",
		defaultValues: {
			username: "",
			password: undefined,
			address: "",
			phone_number: undefined,
			email: undefined,
		},
	});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (data) {
			setValue("username", data.username ?? "");
			setValue("password", data.password ?? "");
			setValue("address", data.address ?? "");
			setValue("phone_number", data.phone_number ?? "");
			setValue("email", data.email ?? undefined);
			setValue("notes", data.notes ?? "");
		}
	}, [data]);

	return (
		<form
			onSubmit={handleSubmit((values) => {
				onSubmit({
					...values,
					id: data?.id ?? undefined
				});
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
							required
							{...field}
							error={errors.phone_number?.message}
						/>
					)}
				/>
			</Group>
			<Controller
				name="notes"
				control={control}
				render={({ field }) => (
					<TextInput
						label="Ghi Chú"
						placeholder="Nhập Ghi Chú"
						{...field}
						error={errors.notes?.message}
					/>
				)}
			/>

			<Group mt="md">
				<Button variant="default" onClick={onClose}>
					Hủy
				</Button>
				<Button type="submit" color={"var(--main-color)"}>
					{data ? "Cập nhật" : "Tạo mới"}
				</Button>
			</Group>
		</form>
	);
};