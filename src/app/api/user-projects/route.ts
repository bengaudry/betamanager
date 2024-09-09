import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const userNameParam = params.get("username");
  const currentUid = params.get("curr-uid");

  if (userNameParam === null || userNameParam === "") {
    return new Response(
      "Parameter <username> was not provided or was empty.",
      {
        status: 400,
      }
    );
  }

  const userName = userNameParam;
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

    console.info(`
      [DESCRIPTION]: ${description},
      [NAME]: ${name},
      [ORGANIZATION_ID]: ${userId},
      [ORGANIZATION_NAME]: ${userName},
      [VISIBILITY]: ${visibility}
    `);

    console.log(userId);
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
