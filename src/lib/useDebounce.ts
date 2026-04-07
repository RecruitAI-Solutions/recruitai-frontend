import { useEffect, useState } from "react";

/**
 * Generic debounce hook — delay update của value sau `delay` ms
 * Dùng trong useSkillSuggest để tránh spam API
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
