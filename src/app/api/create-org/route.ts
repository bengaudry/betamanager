import { getFirebaseDb } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const uid = params.get("uid");
  if (!uid || uid === "")
    return new Response("Parameter <uid> was not provided or was empty.", {
      status: 400,
    });

  const organizationName = params.get("organization-name");
  if (!organizationName || organizationName === "" || organizationName.length < 3)
    return new Response(
      "Parameter <organization-name> was not provided or was empty or was too short (3 chars min).",
      {
        status: 400,
      }
    );

  const docRef = doc(getFirebaseDb(), "organizations", uid);

  const organization = await getDoc(docRef);
  if (organization.exists()) return Response.json(null, { status: 200 });

  const organizationData = {
    uid,
    organizationName,
    isPremium: false,
    premiumExpiration: null
  }
  setDoc(docRef, organizationData);

  return Response.json(organizationData, { status: 200 });
}
