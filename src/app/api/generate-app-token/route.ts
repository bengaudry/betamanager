import { NextRequest } from "next/server";
import { randomBytes } from "crypto";
import { ERROR_TYPES } from "@/constants/errors";
import { checkParameters } from "@/lib/api";
import { prisma } from "@/lib/db";
import { type Token } from "@prisma/client";

// Generate a token
function generateToken(length: number = 32): string {
  return randomBytes(length).toString("hex"); // Generates a token of specified length in hexadecimal format
}

// Generate expiration date (15 minutes from now)
function generateExpirationDate(minutes: number = 15): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

export async function GET(request: NextRequest) {
  try {
    const params = checkParameters(request, [{ name: "app-id" }]);

    if (params instanceof Response) return params;
    const { "app-id": projectId } = params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project)
      return Response.json({
        error: "No project corresponding to this id seem to exist",
      });

    const prevTokens = await prisma.token.findMany({ where: { projectId } });
    const validPrevTokens: Array<Token> = [];

    // Filter tokens and remove expired ones
    const securityTimeout = 1000 * 90; // 1.5 minute
    prevTokens.map((prevToken) => {
      const now = Date.now();
      const tokenExpirationDate = new Date(prevToken.expiresAt).valueOf();

      if (tokenExpirationDate < now) {
        // Token has expired, remove it from db
        prisma.token.delete({ where: { id: prevToken.id } });
        return;
      }

      if (now + securityTimeout < tokenExpirationDate) {
        // Token is valid, and is not expiring before the security timeout
        validPrevTokens.push(prevToken);
      }
    });

    if (validPrevTokens.length > 0) {
      const reusedToken = validPrevTokens[0] as Token;
      return Response.json({ token: reusedToken.value, expiresAt: reusedToken.expiresAt });
    }

    const token = generateToken();
    const expiresAt = generateExpirationDate();
    await prisma.token.create({ data: { value: token, projectId } });

    return Response.json({ token, expiresAt }, { status: 200 });
  } catch (err) {
    return Response.json(ERROR_TYPES["prisma/prisma-unknown-error"], {
      status: 500,
    });
  }
}
