import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { checkParameters } from "@/lib/api";
import { ERROR_TYPES } from "@/constants/errors";

export async function GET(request: NextRequest) {
  try {
    const params = checkParameters(request, [{ name: "project-id" }]);

    if (params instanceof Response) return params;
    const { "project-id": projectId } = params;

    const issues = await prisma.issue.findMany({
      where: {
        projectId,
      },
    });

    console.info("ISSUES :", issues)

    return Response.json(issues, { status: 200 });
  } catch (err) {
    return Response.json(ERROR_TYPES["prisma/prisma-unknown-error"], {
      status: 500,
    });
  }
}
