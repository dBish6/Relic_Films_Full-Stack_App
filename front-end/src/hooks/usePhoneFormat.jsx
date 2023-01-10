import { useState } from "react";

const usePhoneFormat = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    const formattedPhoneNumber = format(e.target.value);
    setInputValue(formattedPhoneNumber);
  };

  const format = (input) => {
    if (!input) return input;
    const phoneNumber = input.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) {
      return phoneNumber;
    } else if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };

  return [inputValue, handleInput];
};

export default usePhoneFormat;
