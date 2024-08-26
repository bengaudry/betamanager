import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const organizationId = params.get("organization-id");
  if (!organizationId || organizationId === "")
    return new Response(
      "Parameter <organization-id> was not provided or was empty.",
      {
        status: 400,
      }
    );

  const response: Array<Project> = [
    {
      id: "trips",
      organizationId,
      name: "Trips",
      description: "An app to simplify the driving learning.",
      nbTesters: 12437,
      version: "0.1.28.7",
    },
    {
      id: "watchlist",
      organizationId,
      name: "Watchlist",
      description: "An app to save movies and series to watch later.",
      nbTesters: 325,
      version: "0.4.12",
    },
  ];
  return Response.json(response, { status: 200 });
}
