import { useEffect, useState } from 'react';

/**
 * Hook để debounce một giá trị.
 * @param value Giá trị gốc.
 * @param delay Thời gian debounce (ms).
 * @returns Giá trị debounce.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Xóa timeout khi component unmount hoặc value thay đổi
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
