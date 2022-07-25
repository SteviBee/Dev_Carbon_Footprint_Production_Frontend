import { useState, useEffect } from "react";

// Creating a custom useState like hook to initally check LS for token. 
// If not found, then return null
const useLocalStorage = (key, firstVal = null) => {
  // Try to get LS key if not populate firstVal
  const initialVal = localStorage.getItem(key) || firstVal;
  // Create state managed here - lsToken will be actual token or null
  const [lsToken, setlsToken] = useState(initialVal);

  // Manage updating
  useEffect(() => {
    if (lsToken === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, lsToken)
    }

  }, [key, lsToken]);

  return [lsToken, setlsToken]

};

export default useLocalStorage;
