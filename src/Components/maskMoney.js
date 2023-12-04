import React from "react";


function MyCustomNumberFormat(props) {
  const format = (numStr) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(numStr);
  };

}

export default MyCustomNumberFormat
