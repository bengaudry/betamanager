import { getFirebaseDb } from "@/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const appName = params.get("app-name");
  if (!appName || appName === "")
    return new Response("Parameter <app-name> was not provided or was empty.", {
      status: 400,
    });

  const currUid = params.get("curr-uid");
  if (!currUid || currUid === "")
    return new Response("Parameter <curr-uid> was not provided or was empty.", {
      status: 400,
    });

  const collectionRef = collection(getFirebaseDb(), "projects");
  const q = query(collectionRef, where("name", "==", appName), where("userId", "==", currUid));
  const querySnapshot = await getDocs(q);

  const docs: any = [];
  querySnapshot.forEach((doc) => {
    if (!doc.exists()) return;
    docs.push(doc);
  });

  const response = docs.length >= 1 ? docs[0] : null;
  return Response.json(response, { status: 200 });
}
