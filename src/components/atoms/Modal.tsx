import React from 'react';

type ModalProps = {
  isOpen?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ children, isOpen = true }) => {
  return <div className={`modal ${isOpen && 'modal-open'}`}>{children}</div>;
};
