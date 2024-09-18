"use client";
import { CodeBlock, dracula } from "react-code-blocks";

export function CodeDisplayer({
  code,
  ...props
}: {
  code: string;
  language: string;
}) {
  return (
    <CodeBlock
      text={code}
      theme={dracula}
      codeBlockStyle={{ lineHeight: 4 }}
      as="code"
      wrapLongLines
      showLineNumbers
      {...props}
    />
  );
}
