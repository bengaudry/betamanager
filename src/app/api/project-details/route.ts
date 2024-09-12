import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { checkParameters } from "@/lib/api";
import { ERROR_TYPES } from "@/constants/errors";

export async function GET(request: NextRequest) {
  try {
    const params = checkParameters(request, [
      { name: "project-name" },
      { name: "curr-uid" },
    ]);

    if (params instanceof Response) return params;
    const { "project-name": projectName, "curr-uid": userId } = params;

    const projects = await prisma.project.findFirst({
      where: { name: projectName, userId },
    });

    return Response.json(projects, { status: 200 });
  } catch (err) {
    return Response.json(ERROR_TYPES["prisma/prisma-unknown-error"], {
      status: 500,
    });
  }
}
