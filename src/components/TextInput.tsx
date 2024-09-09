import { ChangeEvent, useRef } from "react";
import { Label } from "./Label";

type TextInputProps = {
  label: string;
  error?: string | undefined;
  onChangeText?: (text: string) => void;
} & JSX.IntrinsicElements["input"];

export function TextInput({
  error,
  label,
  onChange,
  onChangeText,
  className,
  ...props
}: TextInputProps) {
  const inputRef = useRef(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    if (onChangeText) onChangeText(event.target.value);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <Label label={label} />
      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        className={`bg-transparent border ${
          error ? "border-red-600" : ""
        } outline-none rounded-md px-4 py-2 transition-colors focus:border-neutral-200 dark:focus:border-neutral-600`}
        {...props}
      />
      <p className={`text-red-500 leading-6 text-sm transition-colors`}>
        {error ?? ""}
      </p>
    </div>
  );
}
