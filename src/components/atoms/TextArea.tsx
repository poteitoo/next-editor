import React from 'react';

type TextAreaProps = {
  onChangeText: (text: string) => void;
  className: string;
  value: string;
  placeholder?: string;
};

export const TextArea: React.FC<TextAreaProps> = ({
  onChangeText,
  ...props
}) => {
  return (
    <textarea
      onChange={(e) => onChangeText(e.target.value)}
      rows={10}
      {...props}
    />
  );
};