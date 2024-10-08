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

  const userName = params.get("user-name");
  if (!userName || userName === "" || userName.length < 3)
    return new Response(
      "Parameter <user-name> was not provided or was empty or was too short (3 chars min).",
      {
        status: 400,
      }
    );

  const docRef = doc(getFirebaseDb(), "users", uid);

  const user = await getDoc(docRef);
  if (user.exists()) return Response.json(null, { status: 200 });

  const userData = {
    uid,
    userName,
    isPremium: false,
    premiumExpiration: null
  }
  setDoc(docRef, userData);

  return Response.json(userData, { status: 200 });
}
