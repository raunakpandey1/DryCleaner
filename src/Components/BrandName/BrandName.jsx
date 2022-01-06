import React from "react";
import "./BrandName.scss";

function BrandName({ isFooter = false }) {
  return (
    <div className={`brand ${isFooter === true ? "footer" : ""}`}>
      <span> CLEANERS</span>
    </div>
  );
}

export default BrandName;
