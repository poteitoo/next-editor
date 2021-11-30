import React from 'react';

type IconProps = {
  onClick: () => void;
  className?: string;
  disable?: boolean;
  icon: React.ReactNode;
};

export const Icon: React.FC<IconProps> = ({
  onClick,
  icon,
  disable = false,
  ...props
}) => {
  return (
    <button
      className="p-3 rounded hover:bg-gray-600 border border-gray-600"
      onClick={onClick}
      disabled={disable}
      {...props}
    >
      {icon}
    </button>
  );
};
