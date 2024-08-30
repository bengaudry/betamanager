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
