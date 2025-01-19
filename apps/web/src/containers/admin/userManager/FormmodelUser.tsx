import { Button, TextInput, Group, Select } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { UserSchema } from '@schema/admin/admin-schema';
// import { zodResolver } from 'mantine-form-zod-resolver';
// import { UserSchema } from '@/schemas/UserMode';

export const UserForm = ({ onSubmit, onClose }: { onSubmit: (values: unknown) => void; onClose: () => void }) => {
        const form = useForm({
          mode: 'uncontrolled',
          initialValues: {
          },
          validate: zodResolver(UserSchema),
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
        label="Đại Lý"
        placeholder="Nhập Đại Lý"
        {...form.getInputProps('User')}
      />
      <TextInput
        withAsterisk
        label="Tên Cửa Hàng"
        placeholder="Nhập Tên Cửa Hàng"
        {...form.getInputProps('store')}
      />
       <Group grow>

        <TextInput
        withAsterisk
        label="Tài khoản"
        placeholder="Nhập Tài khoản"
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
      </Group>

       <Group grow>
       <TextInput label="Mã kết nối" placeholder="Nhập Mã kết nối" {...form.getInputProps('ConnectID')} />

        <TextInput label="Tài Khoản Kết Nối" placeholder="Nhập Tài Khoản Kết Nối" {...form.getInputProps('ConnectName')} />
        <TextInput label="Mật Khẩu Kết Nối" placeholder="Nhập Mật Khẩu Kết Nối" {...form.getInputProps('ConnectPasswork')} />
      </Group>
    <TextInput label="Địa Chỉ" placeholder="Nhập địa chỉ" {...form.getInputProps('address')} />
    <Group grow>
        <TextInput label="Email" placeholder="Nhập Email" {...form.getInputProps('Email')} />
        <TextInput label="Số Điện Thoại" placeholder="Nhập Số Điện Thoại" {...form.getInputProps('Phonenumber')} />
      </Group>
      <Group grow>
        <TextInput label="Họ Và Tên" placeholder="Nhập Họ Và Tên" {...form.getInputProps('Name')} />

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
    <DatePickerInput

        label="Ngày Sinh"
        placeholder="dd/mm/yyyy"
        {...form.getInputProps('birthDate')}
      /> 
      </Group>

        <TextInput label="Gia hạn đến ngày" placeholder="" {...form.getInputProps('Enddate')} />
      <Group  mt="md">
        <Button variant="default" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Tạo Mới</Button>
      </Group>
    </form>
  );
};
