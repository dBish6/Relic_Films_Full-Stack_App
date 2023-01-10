import React from "react";
import moment from "moment";

const Footer = () => {
  const today = moment();

  // Use flex-wrap: wrap here.
  return (
    <footer>
      <p>Copyright &copy; {today.year()} Movies Galore Inc.</p>
    </footer>
  );
};

export default Footer;
