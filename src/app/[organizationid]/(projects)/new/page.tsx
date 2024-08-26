import { PageWrapper } from "@/components/Page";

export default function NewProjectPage () {
    const FORBIDDEN_PROJECTS_NAMES = [
        "new", "new-project", "index"
    ]
    return <PageWrapper title="New project">
        {/* TODO : Prevent user to name his project with forbidden name */}
    </PageWrapper>
}