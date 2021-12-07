import React from 'react';

type TextAreaProps = {
  onChangeText: (text: string) => void;
  value: string;
  className?: string;
  placeholder?: string;
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ onChangeText, ...props }, ref) {
    return (
      <textarea
        onChange={(e) => onChangeText(e.target.value)}
        rows={10}
        ref={ref}
        {...props}
      />
    );
  }
);
