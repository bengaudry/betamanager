"use client";
import { createContext, useContext, useState } from "react";
import { Popover } from "./Popover";
import { TextInput } from "./TextInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./Label";
import { Textarea } from "./ui/textarea";
import { FormWrapper } from "./FormWrapper";

const TesterSpaceContext = createContext<{
  popoverOpened: boolean;
  popoverContent: "issue" | "suggestion";
  projectDetails: Project | null;
}>({ popoverOpened: false, popoverContent: "issue", projectDetails: null });

const TesterSpaceProvider = TesterSpaceContext.Provider;

export function TesterSpace({
  projectDetails,
}: {
  projectDetails: Project | null;
}) {
  const [popoverContent, setPopoverContent] = useState<"issue" | "suggestion">(
    "issue"
  );
  const [popoverOpened, setPopoverOpened] = useState(false);

  return (
    <TesterSpaceProvider
      value={{ popoverContent, popoverOpened, projectDetails }}
    >
      <TesterSpacePopover onClose={() => setPopoverOpened(false)} />
      <TesterSpaceButtons
        onOpenPopover={(contentType) => {
          setPopoverContent(contentType);
          setPopoverOpened(true);
        }}
      />
    </TesterSpaceProvider>
  );
}

function TesterSpacePopover({ onClose }: { onClose: () => void }) {
  const { popoverContent, popoverOpened } = useContext(TesterSpaceContext);

  return (
    <Popover
      title={
        popoverContent === "suggestion"
          ? "Submit a suggestion"
          : "Report an issue"
      }
      submitButtonProps={popoverContent === "suggestion" ? {
        label: "Submit",
      } : {
        label: "Report",
        color: "danger"
      }}
      opened={popoverOpened}
      onClose={onClose}
    >
      {popoverContent === "suggestion" ? <SuggestionForm /> : <IssueForm />}
    </Popover>
  );
}

function TesterSpaceButtons({
  onOpenPopover,
}: {
  onOpenPopover: (content: "issue" | "suggestion") => void;
}) {
  const baseBtnClassName =
    "group p-2 px-6 font-medium flex justify-center items-center gap-3 text-lg rounded-full transition-all w-full shadow-xl";

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Give us some feedback</h3>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-2">
        <button
          className={
            "bg-red-600/50 hover:bg-red-600/80 shadow-red-600/0 hover:shadow-red-600/20" +
            " " +
            baseBtnClassName
          }
          onClick={() => {
            onOpenPopover("issue");
          }}
        >
          <i className="fi fi-rr-shield-exclamation translate-y-0.5 text-lg transition-transform group-hover:scale-125" />
          Report an issue
        </button>
        <button
          className={
            "bg-sky-500/40 hover:bg-sky-500/70 shadow-sky-600/0 hover:shadow-sky-600/20" +
            " " +
            baseBtnClassName
          }
          onClick={() => {
            onOpenPopover("suggestion");
          }}
        >
          <i className="fi fi-rr-lightbulb-on translate-y-0.5 text-lg transition-transform group-hover:scale-125" />
          Submit a suggestion
        </button>
      </div>
    </div>
  );
}

const IssueForm = () => {
  const { projectDetails } = useContext(TesterSpaceContext);
  const categories = projectDetails?.issuesCategories ?? [];
  const [formData, setFormData] = useState<{
    title: string;
    category: string | undefined;
    description: string;
  }>({
    title: "",
    category: undefined,
    description: "",
  });

  return (
    <FormWrapper>
      <TextInput
        label="Issue title *"
        placeholder="Your issue in a few words"
        required
        value={formData.title}
        onChangeText={(title) => setFormData((data) => ({ ...data, title }))}
      />
      {categories.length > 0 && (
        <div>
          <Label label="Category *" />
          <Select>
            <SelectTrigger>
              <SelectValue>{formData.category}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-transparent">
              <SelectGroup>
                {categories.map((category, index) => (
                  <SelectItem
                    value={category}
                    key={index}
                    onClick={() =>
                      setFormData((data) => ({ ...data, category }))
                    }
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label label="Description *" />
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((data) => ({
              ...data,
              description: e.target.value,
            }))
          }
        />
      </div>
    </FormWrapper>
  );
};

const SuggestionForm = () => <>Suggestion</>;
