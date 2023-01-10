import { useState } from "react";

const useCount = () => {
  const [count, setCount] = useState(0);

  const onCountChange = (e) => {
    setCount(e.target.value.length);
  };

  return [count, onCountChange];
};

export default useCount;
