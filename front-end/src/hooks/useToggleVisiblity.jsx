import { useState } from "react";

const useToggleVisiblity = () => {
  const [visible, setToggleVisiblity] = useState(false);

  const toggleVisiblity = () => {
    setToggleVisiblity(visible ? false : true);
  };

  return [visible, toggleVisiblity];
};

export default useToggleVisiblity;
