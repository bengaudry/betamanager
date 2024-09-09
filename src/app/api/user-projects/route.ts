import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { checkParameters } from "@/lib/api";

export async function GET(request: NextRequest) {
  const params = checkParameters(request, [
    { name: "username", conditions: { strLength: 3 } },
    { name: "curr-uid", optionnal: true },
  ]);

  if (params instanceof Response) return params;
  const { username: userName, "curr-uid": currentUid } = params;

  const userProjects = await prisma.project.findMany({ where: { userName } });

  const projectsVisibleToCurrentUser = userProjects.filter(
    ({ userId, visibility }) => {
      return visibility === "public" || userId === currentUid;
    }
  );

  return Response.json(projectsVisibleToCurrentUser, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { description, name, userId, userName, visibility } =
      await request.json();

    // TODO : check if user exists and if name corresponds

    await prisma.project.create({
      data: {
        name,
        description,
        userName,
        userId,
        visibility,
      },
    });

    return Response.json(null, { status: 200 });
  } catch (err) {
    return Response.json(
      { code: "server/prisma-error", details: err },
      { status: 500 }
    );
  }
}
