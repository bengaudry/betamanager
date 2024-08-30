import { getFirebaseDb } from "@/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const organizationNameParam = params.get("organization-name");
  const currentUid = params.get("curr-uid");

  if (organizationNameParam === null || organizationNameParam === "") {
    return new Response(
      "Parameter <organization-name> was not provided or was empty.",
      {
        status: 400,
      }
    );
  }

  const collectionRef = collection(getFirebaseDb(), "projects");
  const q = query(
    collectionRef,
    where("organizationName", "==", organizationNameParam)
  );
  const querySnapshot = await getDocs(q);

  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    if (!doc.exists()) return;
    const project = { id: doc.id, ...doc.data() } as Project;
    if (
      project.visibility === "public" ||
      project.organizationId === currentUid
    ) {
      projects.push(project);
    }
  });

  return Response.json(projects, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { description, name, organizationId, organizationName, visibility } =
      await request.json();

    if (
      !description ||
      !name ||
      !organizationId ||
      !organizationName ||
      !visibility
    )
      return new Response("Missing required fields.", {
        status: 400,
      });

    if (!["public", "private"].includes(visibility))
      return new Response(
        "Invalid visibility value (expected : `public` | `private`).",
        { status: 400 }
      );

    if (name.length < 3 || name.length > 25)
      return new Response(
        "Project name length should be between 3 characters and 25 characters long (included).",
        {
          status: 400,
        }
      );

    if (description.length < 3 || description.length > 255)
      return new Response(
        "Project description length should be between 3 characters and 255 characters long (included).",
        {
          status: 400,
        }
      );

    // TODO : check if organization exists and if name corresponds

    await addDoc(collection(getFirebaseDb(), "projects"), {
      description,
      name: name.toLowerCase().replaceAll(" ", ""),
      organizationId,
      organizationName,
      visibility,
    });
  } catch (err: any) {
    return new Response(err, {
      status: 500,
    });
  }
}
