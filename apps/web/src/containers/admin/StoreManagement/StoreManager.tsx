import React, { useEffect, useState } from 'react';
import { Table, TextInput, Button, Group, Pagination, Box, ScrollArea, Text, Switch, Flex } from '@mantine/core';
// import { getAdminData } from '@/app/api/v1/PageAdmin';
// import { StatItem } from '@/app/schema/stat';
import StoreModal from './ModalCreatStore.tsx';
import { IconDotsVertical } from '@tabler/icons-react';
import EditStore from './EditStore.tsx';
import { StatItem } from '@schema/test/stat.ts';
import { getAdminData } from '@api/admin/get-admin.ts';

const StoreManager = () => {
    const [elements, setElements] = useState<StatItem[] | undefined>(undefined);
     const [currentPage, setCurrentPage] = useState(1);
     const [opened, setOpened] = useState(false); // Trạng thái mở Modal
     const [currentElement, setCurrentElement] = useState<StatItem | null>(null); // Lưu dòng dữ liệu hiện tại
     const rowsPerPage = 5;
    
    useEffect(() => {
      const fetchData = async () => {
        console.log("Fetching data...");
        try {
          const data = await getAdminData({ type: 'Branch' }, true);
          if (data?.Store) {
            // Ép kiểu dữ liệu nếu bạn chắc chắn đây là StatItem[]
            setElements(data.Store as StatItem[]);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchData();
    }, []);
    

  // Tính toán số trang
  const totalPages = elements ? Math.ceil(elements.length / rowsPerPage) : 0;
  
  // Lấy dữ liệu hiển thị theo từng trang
  const currentData = elements ? elements.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : [];
  
  // Render các dòng cho bảng
  const rows = currentData.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.phoneNumber}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.birthDate}</Table.Td>
      <Table.Td>
    <Switch
        size="md"
        checked={element.status} // Doan nay chi la hien thi trang thai thoi thay doi thi no thay doi ca db nua nen toi k sua them 
        onLabel="ON"              
        offLabel="OFF"            
    />
    </Table.Td>
    <Table.Td>
            <Button
              variant="subtle"
              size="xs"
              onClick={() => openEditModal(element)} // Mở modal khi click vào dấu 3 chấm
            >
              <IconDotsVertical />
            </Button>
          </Table.Td>
    </Table.Tr>
  ));
  
    const openEditModal = (element: StatItem) => {
      setCurrentElement(element);
      setOpened(true); // Mở modal khi chọn dòng dữ liệu
    };
  
    const closeEditModal = () => {
      setOpened(false); // Đóng modal  
    };
  
  return (
    <Box>
     <Flex justify="space-between" align="center" p="lg">
             <Text fw={700} fz="xl" c="black">
               Danh Sách Store
             </Text>
     
             {/* Modal hoặc nút Admin */}
             <StoreModal />
           </Flex>
      <Group mb="lg" p="lg" align="center" bg="#fff">
        {["Tài Khoản", "Họ và Tên", "Địa chỉ", "Email"].map((placeholder) => (
            <TextInput
            key={placeholder}
            placeholder={placeholder}
            styles={{
                input: {
                backgroundColor: '#fff',
                color: '#000',
                },
            }}
            />
        ))}
        <Button>Tìm kiếm</Button>
        </Group>

      {/* Bảng */}
      <ScrollArea>
        <Table c="black">
          <Table.Thead>
            <Table.Tr>
            <Table.Th>Mã Đại Lý</Table.Th>
              <Table.Th>Tài Khoản</Table.Th>
              <Table.Th>Tên</Table.Th>
              <Table.Th>Số Điện Thoại</Table.Th>
              <Table.Th>Địa chỉ</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Giới tính</Table.Th>
              <Table.Th>Ngày sinh</Table.Th>
              <Table.Th>Trạng thái</Table.Th>
              <Table.Th>Tùy chọn</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Phân trang */}
      <Group mt="lg">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)} 
        />
      </Group>
      {currentElement && (
        <EditStore
          opened={opened}
          onClose={closeEditModal}
          currentElement={currentElement}
        />
      )}
    </Box>
  );
};

export default StoreManager;
