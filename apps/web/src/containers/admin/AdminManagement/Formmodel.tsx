import { Button, TextInput, Group,  Select } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { AdminSchema } from '@schema/admin/admin-schema.ts';
// import { zodResolver } from 'mantine-form-zod-resolver';
// import { AdminSchema } from '@/schemas/adminModel';

export const AdminForm = ({ onSubmit, onClose }: { onSubmit: (values: unknown) => void; onClose: () => void }) => {
        const form = useForm({
          mode: 'uncontrolled',
          initialValues: {
            email: '',
          },
          validate: zodResolver(AdminSchema),
        });
        const [showPassword, setShowPassword] = useState(false);
      
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
        onClose();
      })}
    >
      <TextInput
        withAsterisk
        label="Tài Khoản"
        placeholder="Nhập tài khoản"
        {...form.getInputProps('username')}
      />

      <TextInput
        withAsterisk
        label="Mật Khẩu"
        placeholder="Nhập mật khẩu"
        type={showPassword ? 'text' : 'password'} 
        {...form.getInputProps('password')}
        rightSection={
          <Button
            variant="subtle"
            onClick={() => setShowPassword(!showPassword)} 
            styles={{
              root: {
                color: 'white', 
                backgroundColor: 'transparent', // Nền trong suốt
                padding: '0px 0px', 
                fontWeight: 'bold', 
              },
            }}
          >
            {showPassword ? 'Ẩn' : 'Hiện'} 
          </Button>
        }
      />
      <Group grow>
        <TextInput label="Họ" placeholder="Nhập họ" {...form.getInputProps('lastName')} />
        <TextInput label="Tên" placeholder="Nhập tên" {...form.getInputProps('firstName')} />
      </Group>
      <Group grow>

      <TextInput label="Địa Chỉ" placeholder="Nhập địa chỉ" {...form.getInputProps('address')} />

      <TextInput
        label="Mã Bưu Chính"
        placeholder="Nhập mã bưu chính"
        {...form.getInputProps('postalCode')}
      />
      </Group>

      <Group grow>

    <DatePickerInput

        label="Ngày Sinh"
        placeholder="dd/mm/yyyy"
        {...form.getInputProps('birthDate')}
      />

      <TextInput
        label="Số Điện Thoại"
        placeholder="Nhập số điện thoại"
        {...form.getInputProps('phoneNumber')}
      />
      </Group>

      <TextInput label="Email" placeholder="Nhập email" {...form.getInputProps('email')} />

      <Select
        label="Giới Tính"
        placeholder="Chọn giới tính"
        data={[
          { value: 'male', label: 'Nam' },
          { value: 'female', label: 'Nữ' },
          { value: 'other', label: 'Khác' },
        ]}
        {...form.getInputProps('gender')}
      />

      <Group  mt="md">
        <Button variant="default" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Tạo Mới</Button>
      </Group>
    </form>
  );
};
