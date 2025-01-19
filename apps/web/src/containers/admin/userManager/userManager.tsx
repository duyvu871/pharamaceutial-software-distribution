import React, { useEffect, useState } from 'react';
import { Table, TextInput, Button, Group, Pagination, Box, ScrollArea, Text, Switch, Flex } from '@mantine/core';
// import { getAdminData } from '@/app/api/v1/PageAdmin';
// import { Stores } from '@/app/schema/stat';
import UserModal from './ModalCreatUser';
import { IconDotsVertical } from '@tabler/icons-react';
import EditModal from './EditModal';
import { Stores } from '@schema/test/stat.ts';
import { getAdminData } from '@api/admin/get-admin.ts'; // Import Modal chỉnh sửa

const UserManager = () => {
  const [elements, setElements] = useState<Stores[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, setOpened] = useState(false); // Trạng thái mở Modal
  const [currentElement, setCurrentElement] = useState<Stores | null>(null); // Lưu dòng dữ liệu hiện tại
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const data = await getAdminData({ type: 'sub' }, true);
        if (data?.user) {
          setElements(data.user as Stores[]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const totalPages = elements ? Math.ceil(elements.length / rowsPerPage) : 0;
  const currentData = elements ? elements.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : [];

  const rows = currentData.map((element) => {
    if (element && element.username) {
      return (
        <Table.Tr key={element.username}>
          <Table.Td>{element.managerId}</Table.Td>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.phone}</Table.Td>
          <Table.Td w="300px">{element.address}</Table.Td>
          <Table.Td>{element.firstName}</Table.Td>
          <Table.Td>{element.firstName}</Table.Td>
          <Table.Td> Đại lý cấp {element.level}</Table.Td>
          <Table.Td>
            <Switch
              size="md"
              checked={element.active}
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
      );
    } else {
      return null;
    }
  });

  const openEditModal = (element: Stores) => {
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
          Danh Sách Cửa Hàng
        </Text>
        <UserModal />
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
              <Table.Th>Mã Cửa Hàng</Table.Th>
              <Table.Th>Tên Cửa Hàng</Table.Th>
              <Table.Th>Số Điện Thoại</Table.Th>
              <Table.Th>Địa Chỉ</Table.Th>
              <Table.Th>Chủ Cửa Hàng</Table.Th>
              <Table.Th>Chủ Đại Lý</Table.Th>
              <Table.Th>Cấp đại lý</Table.Th>
              <Table.Th>Trạng thái</Table.Th>
              <Table.Th>Tùy Chọn</Table.Th>
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

      {/* Modal Chỉnh Sửa */}
      {currentElement && (
        <EditModal
          opened={opened}
          onClose={closeEditModal}
          currentElement={currentElement}
        />
      )}
    </Box>
  );
};

export default UserManager;
