import { Button, TextInput, Group, Select } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

// Zod Schema
export const UserSchema = z.object({
  username: z
    .string()
    .nonempty({ message: 'Tên tài khoản không được để trống' })
    .min(2, { message: 'Tên tài khoản phải có ít nhất 2 ký tự' }),
  password: z
    .string()
    .nonempty({ message: 'Mật khẩu không được để trống' })
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  dob: z
    .string()
    .optional()
  ,
  phone: z.string()
    .nonempty({ message: 'SDT không được để trống' })
    .min(10, { message: 'SDT phải có ít nhất 10 ký tự' }),
  store:z.string()
    .nonempty({ message: 'Tên cửa hàng không được để trống' })
    .min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký'}),
  User:z.string()
    .nonempty({ message: 'Tên cửa hàng không được để trống' })
    .min(2, { message: 'Tên cửa hàng phải có ít nhất 2 ký'}),

  email: z
    .string()
    .optional(),
  gender: z.string().optional(),
});

type UserFormValues = z.infer<typeof UserSchema>;

export const UserForm = ({
                           onSubmit,
                           onClose,
                         }: {
  onSubmit: (values: UserFormValues) => void;
  onClose: () => void;
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      store: "",
      User: "",
      address: "",
      phone: "",
      email: "",
      gender: undefined,
      dob: undefined,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
        // onClose();
      })}
    >
      <Controller
        name="User"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Đại Lý"
            placeholder="Nhập Đại Lý"
            {...field}
            error={errors.User?.message}
          />
        )}
      />
      <Controller
        name="store"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Tên Cửa Hàng"
            placeholder="Nhập Tên Cửa Hàng"
            {...field}
            error={errors.store?.message}
          />
        )}
      />
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
          name="phone"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Số Điện Thoại"
              placeholder="Nhập Số Điện Thoại"
              {...field}
              error={errors.phone?.message}
            />
          )}
        />
      </Group>
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
        <Button variant="default" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Tạo Mới</Button>
      </Group>
    </form>
  );
};