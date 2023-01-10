import { useState } from "react";

const useFormLoader = () => {
  const [loading, showLoading] = useState(false);

  const toggleLoader = (trueOrFalse) => {
    if (trueOrFalse === true) {
      showLoading(true);
    } else {
      showLoading(false);
    }
  };

  return [loading, toggleLoader];
};

export default useFormLoader;
