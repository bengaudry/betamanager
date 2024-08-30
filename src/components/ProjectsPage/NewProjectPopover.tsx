"use client";
import { useState } from "react";
import { Popover } from "../Popover";
import { TextInput } from "../TextInput";
import { Label } from "../Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export const NewProjectButton = ({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: () => void;
}) => {
  const { organizationname } = useParams();
  const { data } = useSession();
  const user = data?.user ?? null;

  const canCreateNewProject =
    (user && user.subscription === "premium") ||
    (projects && projects.length <= 2) ||
    !projects;

  /* Show an add button if the visitor of the page is the organization shown */
  if (!data?.user?.name || !organizationname) return null;
  return (
    <button
      onClick={() => {
        if (!canCreateNewProject)
          return alert(
            "You reached the limit of projects for a free account. Please upgrade your plan or remove another project."
          );
        onOpen();
      }}
      className="group relative h-fit w-full xs:h-36 py-2 grid place-content-center justify-items-center rounded-lg border border-neutral-300 hover:bg-neutral-100 transition-colors"
    >
      <p className="text-neutral-500 flex items-center gap-2">
        <span className="xs:hidden">New project</span>
        <i className="inline-block fi fi-rr-plus xs:text-5xl xs:group-hover:scale-125 transition-transform origin-center translate-y-0.5" />
      </p>
      {!canCreateNewProject && (
        <i className="fi fi-rr-rectangle-pro absolute right-2 top-2 block xs:text-xl translate-y-0.5 text-indigo-300" />
      )}
    </button>
  );
};

export function NewProjectPopover({
  opened,
  onClose,
  onSubmit,
}: {
  opened: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    description: string,
    visibility: "public" | "private"
  ) => Promise<any>;
}) {
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Popover
      title="Create new project"
      submitLabel="Create project"
      opened={opened}
      onClose={onClose}
      onAsyncSubmit={() => onSubmit(name, description, visibility)}
    >
      <TextInput
        label="Project name"
        value={name}
        onChangeText={setName}
        placeholder="my-new-project"
      />
      <TextInput
        label="Project description"
        value={description}
        onChangeText={setDescription}
        placeholder="A short description for your project"
      />

      <div>
        <Label label="Visibility" />
        <Select
          onValueChange={(value: "private" | "public") => setVisibility(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={visibility[0].toUpperCase() + visibility.slice(1)}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="private" defaultChecked>
              Private
            </SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Popover>
  );
}

export function NewProjectClient({ projects }: { projects: Project[] }) {
  const { organizationname } = useParams();
  const { data: session } = useSession();
  const user = session?.user ?? null;
  const [opened, setOpened] = useState(false);

  const handleCreateNewProject = async (
    name: string,
    description: string,
    visibility: "public" | "private"
  ) => {
    if (!user) return;
    try {
      fetch("/api/organization-projects", {
        method: "POST",
        body: JSON.stringify({
          organizationId: user.id,
          organizationName: organizationname,
          name,
          description,
          visibility,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NewProjectButton projects={projects} onOpen={() => setOpened(true)} />
      <NewProjectPopover
        opened={opened}
        onClose={() => setOpened(false)}
        onSubmit={handleCreateNewProject}
      />
    </>
  );
}
