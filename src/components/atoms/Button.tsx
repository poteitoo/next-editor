import React from 'react';

type ButtonProps = {
  onClick: () => void;
  className?: string;
  addClassName?: string;
  disable?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  addClassName,
  disable = false,
  ...props
}) => {
  return (
    <button
      className={`p-3 mt-2 rounded hover:bg-gray-600 bg-gray-500 ${addClassName}`}
      onClick={onClick}
      disabled={disable}
      {...props}
    >
      {children}
    </button>
  );
};
