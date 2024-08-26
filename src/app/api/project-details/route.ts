import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
) {
  const params = request.nextUrl.searchParams;
  const appid = params.get('app-id');
  if (!appid || appid === "")
    return new Response("Parameter <app-id> was not provided or was empty.", {
      status: 400,
    });

  const response = { id: appid, name: "Trips" };
  return Response.json(response, { status: 200 });
}
