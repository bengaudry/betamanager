import { NextRequest } from "next/server";

export function checkParameters<N extends string>(
  request: NextRequest,
  expectedParams: Array<{
    name: N;
    optionnal?: boolean;
    conditions?: {
      type?: "string" | "number" | "boolean" | "any";
      min?: number;   // For number types
      max?: number;   // For number types
      strLength?: number; // For string length validation
    };
  }>
): Record<N, any> | Response {
  const params = request.nextUrl.searchParams;
  const returnParams: Record<N, any> = {} as Record<N, any>;

  for (const { name, conditions, optionnal = false } of expectedParams) {
    const paramValue = params.get(name);

    // Handle mandatory parameters
    if (!optionnal && (paramValue === null || paramValue === "")) {
      return new Response(
        `Parameter <${name}> was not provided or was empty.`,
        { status: 400 }
      );
    }

    // If the parameter is optional and not provided, skip validation
    if (paramValue === null) {
      returnParams[name] = null;
      continue;
    }

    let parsedValue: any = paramValue;

    // Type checking and parsing
    if (conditions?.type === "number") {
      parsedValue = parseFloat(paramValue);
      if (isNaN(parsedValue)) {
        return new Response(`Parameter <${name}> should be a valid number.`, { status: 400 });
      }
      // Min/Max validation for number types
      if (conditions.min !== undefined && parsedValue < conditions.min) {
        return new Response(`Parameter <${name}> should be greater than or equal to ${conditions.min}.`, { status: 400 });
      }
      if (conditions.max !== undefined && parsedValue > conditions.max) {
        return new Response(`Parameter <${name}> should be less than or equal to ${conditions.max}.`, { status: 400 });
      }
    } else if (conditions?.type === "boolean") {
      // Boolean parsing
      if (paramValue !== "true" && paramValue !== "false") {
        return new Response(`Parameter <${name}> should be either 'true' or 'false'.`, { status: 400 });
      }
      parsedValue = paramValue === "true";
    } else if (conditions?.type === "string") {
      // String length validation
      if (conditions.strLength !== undefined && paramValue.length !== conditions.strLength) {
        return new Response(`Parameter <${name}> should be exactly ${conditions.strLength} characters long.`, { status: 400 });
      }
    }

    // Add the valid parameter to returnParams
    returnParams[name] = parsedValue;
  }

  return returnParams;
}
