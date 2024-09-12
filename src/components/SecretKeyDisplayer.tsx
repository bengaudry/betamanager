"use client";
import { useState } from "react";
import { Label } from "./Label";
import { TextInputBase } from "./TextInput";

export const SecretKeyDisplayer = ({ key }: { key: string }) => {
  const [keyHidden, setKeyHidden] = useState(true);

  return (
    <div>
      <Label label="Project key" />
      <div className="flex items-center gap-2">
        <TextInputBase
          value={keyHidden ? "***********************" : key}
        />
        {keyHidden ? "hidden" : "not hidden"}
        <button
          className="h-full aspect-square rounded-md items-center bg-zinc-800 px-3 py-2"
          onClick={() => setKeyHidden((h) => !h)}
        >
          <i
            className={`fi fi-rr-${
              keyHidden ? "eye" : "eye-crossed"
            } inline-block translate-y-0.5`}
          />
        </button>
        <button className="h-full aspect-square rounded-md items-center bg-zinc-800 px-3 py-2">
          <i className="fi fi-rr-copy inline-block translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
