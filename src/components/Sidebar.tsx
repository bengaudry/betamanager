import { SidebarElement } from "./SidebarElement";

const Separator = () => (
  <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 my-2" />
);

export function Sidebar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-r h-full pb-8 pt-4 px-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <SidebarElement title="Dashboard" href="" icon="apps" />
          <Separator />
          {/* <SidebarElement title="Testers" href="testers" icon="users-alt" /> */}
          <SidebarElement
            title="Issues"
            href="issues"
            icon="shield-exclamation"
          />
          <SidebarElement
            title="Suggestions"
            href="suggestions"
            icon="lightbulb-on"
          />
          <Separator />
          <SidebarElement
            title="Customize forms"
            href="customize"
            icon="customize-computer"
            isPremium
          />
        </div>
        <SidebarElement title="Settings" href="settings" icon="settings" />
      </div>
    </nav>
  );
}
