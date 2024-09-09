import { PropsWithChildren, useEffect, useState } from "react";
import { CTA } from "./CTA";

type PopoverProps = {
  opened: boolean;
  submitLabel?: string;
  title?: string;
  disableClose?: boolean;
  disableSubmit?: boolean;
  onSubmit?: () => void;
  onAsyncSubmit?: () => Promise<any>;
  onClose?: () => void;
} & PropsWithChildren;

export function Popover({
  onClose,
  onSubmit,
  onAsyncSubmit,
  opened,
  title,
  submitLabel,
  children,
}: PopoverProps) {
  const [popoverOpened, setPopoverOpened] = useState(opened);
  const [loading, setLoading] = useState(false);

  const handleClosePopover = () => {
    console.info("Closing popover...");
    setPopoverOpened(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  useEffect(() => {
    if (opened) setPopoverOpened(true);
    if (!opened) handleClosePopover();
  }, [opened]);

  if (!opened) return null;

  return (
    <div
      className={`fixed w-screen h-screen inset-0 flex items-center justify-center z-50`}
    >
      <div
        className={`bg-black/50 backdrop-blur-sm absolute w-full h-full inset-0 ${
          popoverOpened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 text-left cursor-default`}
        onClick={handleClosePopover}
      />

      <div
        className={`mx-8 my-16 bg-white dark:bg-neutral-900 border rounded-xl w-full max-w-screen-md p-8 z-50 ${
          popoverOpened ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } transition-all`}
      >
        <h3 className="font-semibold text-2xl mb-4">{title}</h3>

        <div>{children}</div>

        <div className="flex gap-2 justify-end mt-4">
          <CTA label="Cancel" secondary onClick={handleClosePopover} />
          <CTA
            label={loading ? "..." : submitLabel ?? "Continue"}
            onClick={async () => {
              if (onAsyncSubmit) {
                setLoading(true);
                try {
                  await onAsyncSubmit();
                  handleClosePopover();
                } finally {
                  setLoading(false);
                }
              } else if (onSubmit) {
                onSubmit();
                handleClosePopover();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
