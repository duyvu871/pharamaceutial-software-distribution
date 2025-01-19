import { Button, TextInput, Group, Select,  } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { StoreSchema } from '@schema/admin/admin-schema.ts';
// import { zodResolver } from 'mantine-form-zod-resolver';
// import { StoreSchema } from '@/schemas/StoreModel';

export const StoreForm = ({ onSubmit, onClose }: { onSubmit: (values: unknown) => void; onClose: () => void }) => {
        const form = useForm({
          mode: 'uncontrolled',
          initialValues: {
          },
          validate: zodResolver(StoreSchema),
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
        label="Tên Cửa Hàng"
        placeholder="Nhập Tên Cửa Hàng"
        {...form.getInputProps('store')}
      />
        <TextInput
        
        label="Địa chỉ"
        placeholder="Nhập Địa chỉ"
        {...form.getInputProps('Address')}
      />
       <Group grow>

        <TextInput
        withAsterisk
        label="Số Điện Thoại"
        placeholder="Nhập số điện thoại"
        {...form.getInputProps('phoneNumber')}
      />
       <TextInput
        
        label="Email"
        placeholder="Nhập Email"
        {...form.getInputProps('Address')}
      />
      </Group>

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
        <TextInput label="Tài Khoản Kết Nối" placeholder="Nhập Tài Khoản Kết Nối" {...form.getInputProps('ConnectName')} />
        <TextInput label="Mật Khẩu Kết Nối" placeholder="Nhập Mật Khẩu Kết Nối" {...form.getInputProps('ConnectPasswork')} />
      </Group>
        <TextInput label="Họ và Tên " placeholder="Nhập họ và tên" {...form.getInputProps('lastName')} />
        <Group grow>

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
