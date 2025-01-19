import React, { useEffect } from 'react';
import { Modal, TextInput, Switch, Button, Group, Box, Select } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
// import { StatItem } from '@/app/schema/stat';
import { DatePickerInput } from '@mantine/dates';
import { StatItem } from '@schema/test/stat.ts';

interface EditStoreProps {
    opened: boolean;
    onClose: () => void;
    currentElement: StatItem | undefined;
  }
  
  const EditStore: React.FC<EditStoreProps> = ({ opened, onClose, currentElement }) => {
    const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (currentElement) {
      setValue('Id_manager', currentElement.id);
      setValue('account_id', currentElement.username);
      setValue('firstName', currentElement.fullName);
      setValue('phone_number', currentElement.phoneNumber);
      setValue('address', currentElement.address);
      setValue('gender', currentElement.gender);
      setValue('birthDate', currentElement.birthDate||null);
      setValue('email', currentElement.email);
      setValue('active', currentElement.status);
      console.log(setValue)
    }
  }, [currentElement, setValue]);

  const onSubmit = (data:unknown) => {
    console.log("Dữ liệu sau khi cập nhật: ", data);
    
  };

  return (
    <Modal opened={opened} onClose={onClose} size="55rem" withCloseButton={false}>
        <Modal.Header>
              <Modal.Title>Danh Sách Store - Chỉnh Sửa</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
        name="Id_manager"
        control={control}
        render={({ field }) => (
            <TextInput label="Mã cửa hàng" placeholder="Sửa Mã cửa hàng" {...field} />
        )}
        />

        <Controller
        name="account_id"
        control={control}
        render={({ field }) => (
            <TextInput label="Tài khoản" placeholder="Sửa Tài khoản" {...field} />
        )}
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

        <Controller
        name="email"
        control={control}
        render={({ field }) => (
            <TextInput label="Email" placeholder="Sửa email" {...field} />
        )}
        />

        <Box h="20px"></Box>
        <Controller 
          name="active"
          control={control}
          render={({ field }) => (
            <Switch label="Trạng thái" {...field} />
          )}
        />
        <Box h="20px"></Box>

        <Group >
          <Button type="submit">Lưu</Button>
        </Group>
      </form>
      </Modal.Body>

    </Modal>

  );
}

export default EditStore;
