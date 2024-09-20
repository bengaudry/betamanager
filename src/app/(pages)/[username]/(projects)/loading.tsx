import { PageWrapper } from "@/components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProjects()  {
    return (<div className="max-w-screen-xl mx-auto">
        <PageWrapper>
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full w-6 h-6" />
              <div>
                <Skeleton className="font-bold h-4 w-12" />
              </div>
          </div>
        </header>
  
          <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6 mx-auto">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </div>
        </PageWrapper>
      </div>);
}