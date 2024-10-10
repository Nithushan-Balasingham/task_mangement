import React from "react";

const Button = ({ label, icon: Icon, onClick, styles ,type}) => {
  return (
    <button
      onClick={onClick}
      className={styles}
      type={type}
    >
      {Icon && <Icon className="mr-2" />} 
      {label}
    </button>
  );
};

export default Button;
