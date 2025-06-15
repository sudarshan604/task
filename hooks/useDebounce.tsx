"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(
  initialValue: T,
  time: number,
  onDebounce?: (debouncedValue: T) => void
): [T, T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
      if (onDebounce) {
        onDebounce(value);
      }
    }, time);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);

  return [debouncedValue, value, setValue];
}
