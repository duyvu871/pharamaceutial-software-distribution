'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/debounced/debonced'; // Đường dẫn tới file hook vừa tạo
import {  Autocomplete, AutocompleteProps, Paper, Text, useMantineTheme } from '@mantine/core';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // Debounce 500ms
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const updateLocalStorage = (newProducts: any[]) => {
    // Lấy dữ liệu hiện tại từ localStorage
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  
    // Kiểm tra xem sản phẩm mới có trùng với sản phẩm đã có trong lịch sử hay không
    const updatedHistory = newProducts
      .filter(newProduct => !history.some((product: any) => product.id === newProduct.id)) // Loại bỏ sản phẩm trùng theo id
      .concat(history) // Thêm những sản phẩm không trùng vào đầu danh sách
      .slice(0, 3); // Giữ tối đa 3 sản phẩm gần nhất
  
    // Cập nhật lại localStorage
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };
  

  // Fetch API và xử lý kết quả
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery) {
        // Nếu không có query, lấy dữ liệu từ localStorage để hiển thị
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchResults(history);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(debouncedQuery)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.products);

          // Cập nhật localStorage với dữ liệu mới
          updateLocalStorage(data.products);
        } else {
          console.error('Error during search');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery]);
  const productsData = searchResults.reduce((acc, product) => {
    acc[product.name] = {
      description: product.description,
      price: product.price,
    };
    return acc;
  }, {});

  const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => (
    <Paper radius="md" shadow="sm" style={{ width: '100%' }} className="autocomplete-option">
    <div className="product-info">

    <Text size="sm" w={500}>{`Tên: ${option.value}`}</Text>
    <Text size="xs" c="dimmed">{`Mô tả: ${productsData[option.value].description}`}</Text>
    <Text size="xs" c="dimmed">{`Giá: ${productsData[option.value].price} VND`}</Text>
    </div>

  </Paper>
  );
  
  return (
      <Autocomplete
        radius="lg"
        size="lg"
        value={query}
        onChange={setQuery}
        maxDropdownHeight={300}
        placeholder="Search products"
        maw="100%"
        data={searchResults.map((product) => ({
          value: product.name,  // 'value' vẫn là tên sản phẩm để tìm kiếm
         
        }))}
        renderOption={renderAutocompleteOption}  // Sử dụng renderOption để hiển thị chi tiết
      />
  );
}