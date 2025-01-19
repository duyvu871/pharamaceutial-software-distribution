import React, { useEffect, useState } from 'react';
import { Modal, TextInput, Button, Group, Select, Box } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
// import {  StatItems } from '@/app/schema/stat';
import { DatePickerInput } from '@mantine/dates';
import { StatItems } from '@schema/test/stat.ts';

interface EditAdminProps {
    opened: boolean;
    onClose: () => void;
    currentElement: StatItems | null;
  }
  
  const EditAdmin: React.FC<EditAdminProps> = ({ opened, onClose, currentElement }) => {
    const { control, handleSubmit, setValue } = useForm();
        const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentElement) {
      setValue('account_id', currentElement.username);
      setValue('firstName', currentElement.fullName);
      setValue('phone_number', currentElement.phoneNumber);
      setValue('address', currentElement.address);
      setValue('email', currentElement.email);
      setValue('gender', currentElement.gender);
      setValue('birthDate', currentElement.birthDate||null);
      console.log(setValue)
    }
  }, [currentElement, setValue]);

  const onSubmit = (data:unknown  ) => {
    console.log("Dữ liệu sau khi cập nhật: ", data);
    
  };

  return (
    <Modal opened={opened} onClose={onClose} size="55rem" withCloseButton={false}>
        <Modal.Header>
              <Modal.Title>Danh Sách Admin - Chỉnh Sửa</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit(onSubmit)}>
       
        <Controller
        name="account_id"
        control={control}
        render={({ field }) => (
            <TextInput disabled  label="Tài khoản" placeholder="Sửa Tài khoản" {...field} />
        )}
        />
 <TextInput
        withAsterisk
        label="Mật Khẩu"
        placeholder="Nhập mật khẩu"
        type={showPassword ? 'text' : 'password'} 
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

        <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
            <TextInput label="Tên đầy đủ" placeholder="Sửa tên đầy đủ" {...field} />
        )}
        />

        <Controller
        name="phone_number"
        control={control}
        render={({ field }) => (
            <TextInput label="Số điện thoại" placeholder="Sửa số điện thoại" {...field} />
        )}
        />
      </Group>

        <Controller
        name="address"
        control={control}
        render={({ field }) => (
            <TextInput label="Địa chỉ" placeholder="Sửa địa chỉ" {...field} />
        )}
        />
         <Controller
        name="email"
        control={control}
        render={({ field }) => (
            <TextInput label="Email" placeholder="Sửa email" {...field} />
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
                     { value: 'male', label: 'Nam' },
                     { value: 'female', label: 'Nữ' },
                     { value: 'other', label: 'Khác' },
                   ]}
                   {...field}
                 />
        )}
        />

        <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
        <DatePickerInput

        label="Ngày Sinh"
        placeholder="dd/mm/yyyy"
        {...field}
      />        )}
        />
      </Group>
          <Box p="lg"></Box>

        <Group >
          <Button type="submit">Lưu</Button>
        </Group>
      </form>
      </Modal.Body>

    </Modal>

  );
}

export default EditAdmin;
