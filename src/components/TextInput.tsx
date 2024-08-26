import { ChangeEvent } from "react";

type TextInputProps = {
  onChangeText?: (text: string) => void;
} & JSX.IntrinsicElements["input"];

export function TextInput({
  onChange,
  onChangeText,
  ...props
}: TextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    if (onChangeText) onChangeText(event.target.value);
  };

  return <input type="text" onChange={handleChange} {...props} />;
}
