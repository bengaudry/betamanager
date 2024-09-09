import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { checkParameters } from "@/lib/api";
import { ERROR_TYPES } from "@/constants/errors";

export async function GET(request: NextRequest) {
  try {
    const params = checkParameters(request, [{ name: "project-id" }]);

    if (params instanceof Response) return params;
    const { "project-id": projectId } = params;

    const suggestions = await prisma.suggestion.findMany({
      where: {
        projectId,
      },
    });

    return Response.json(suggestions, { status: 200 });
  } catch (err) {
    return Response.json(ERROR_TYPES["prisma/prisma-unknown-error"], {
      status: 500,
    });
  }
}
