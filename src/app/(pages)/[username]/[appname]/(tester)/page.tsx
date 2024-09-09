"use client";
import { Popover } from "@/components/Popover";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const SuggestionForm = () => <>Suggestion</>;

const IssueForm = () => <>Issue</>;

export default function AppBetaPage() {
  const { appname } = useParams();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [popoverContent, setPopoverContent] = useState<"issue" | "suggestion">(
    "issue"
  );

  const baseBtnClassName =
    "group p-2 px-6 sm:px-2 font-medium sm:text-lg flex sm:flex-col items-center sm:justify-center gap-3 rounded-full sm:rounded-xl transition-all w-full sm:aspect-square shadow-xl";

  return (
    <>
      <Popover
        title={
          popoverContent === "suggestion"
            ? "Submit a suggestion"
            : "Report an issue"
        }
        submitLabel={
          popoverContent === "suggestion"
            ? "Submit"
            : "Report"
        }
        opened={popoverOpened}
        onClose={() => setPopoverOpened(false)}
      >
        {popoverContent === "suggestion" ? <SuggestionForm /> : <IssueForm />}
      </Popover>
      <div className="bg-gradient-to-b from-indigo-500/40 to-indigo-500/0 h-screen w-full px-6 py-12">
        <div className="relative bg-white/60 backdrop-blur-md rounded-3xl max-w-screen-md mx-auto px-8 py-16 shadow-xl shadow-neutral-600/20">
          <header className="mb-8">
            <img
              src=""
              className="block mx-auto mb-4 bg-neutral-200 w-24 h-24 rounded-full object-cover"
              width={96}
              height={96}
            />
            <h1 className="text-center text-4xl font-bold">
              {appname[0].toUpperCase() + appname.slice(1)}
            </h1>
            <p className="max-w-sm mx-auto leading-4">
              This is the description of the app. It can be quite long but maybe
              it will be cut.
            </p>
          </header>

          <div className="w-full max-w-[500px] mx-auto">
            <h3 className="text-lg font-semibold mb-1">
              Give us some feedback
            </h3>
            <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-2">
              <button
                className={
                  "bg-red-600/50 hover:bg-red-600/80 shadow-red-600/0 hover:shadow-red-600/20" +
                  " " +
                  baseBtnClassName
                }
                onClick={() => {
                  setPopoverOpened(true);
                  setPopoverContent("issue");
                }}
              >
                <i className="fi fi-rr-shield-exclamation translate-y-0.5 text-lg sm:text-3xl transition-transform group-hover:scale-125" />
                Report an issue
              </button>
              <button
                className={
                  "bg-sky-500/40 hover:bg-sky-500/70 shadow-sky-600/0 hover:shadow-sky-600/20" +
                  " " +
                  baseBtnClassName
                }
                onClick={() => {
                  setPopoverOpened(true);
                  setPopoverContent("suggestion");
                }}
              >
                <i className="fi fi-rr-lightbulb-on translate-y-0.5 text-lg sm:text-3xl transition-transform group-hover:scale-125" />
                Submit a suggestion
              </button>
            </div>
          </div>

          <Link
            href="/"
            className="absolute top-full block right-6 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-b-xl px-3 py-1"
          >
            Made with LaunchFlow
          </Link>
        </div>
      </div>
    </>
  );
}
