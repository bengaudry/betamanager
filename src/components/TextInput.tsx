import { ChangeEvent, LegacyRef, Ref, useRef } from "react";
import { Label } from "./Label";
import { InputBase } from "@mui/material";

type TextInputBaseProps = {
  error?: string | undefined;
  onChangeText?: (text: string) => void;
} & JSX.IntrinsicElements["input"];

type TextInputProps = {
  label: string;
} & TextInputBaseProps;


export function TextInputBase({ error, ...props}: TextInputBaseProps) {
  return (
    <input
      type="text"
      className={`bg-transparent border ${
        error ? "border-red-600" : ""
      } outline-none rounded-md px-4 py-2 transition-colors focus:border-zinc-200 dark:focus:border-zinc-600`}
      {...props}
    />
  );
}

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
      <InputBase
        type="text"
        ref={inputRef}
        onChange={handleChange}
        {...props}
      />
      <p className={`text-red-500 leading-6 text-sm transition-colors`}>
        {error ?? ""}
      </p>
    </div>
  );
}
