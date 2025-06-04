import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get user session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.formData();

    // Extrae todos los campos del formulario
    const document_type = body.get("document_type") as string;
    const document_number = body.get("document_number") as string;
    const names_first = body.get("names_first") as string;
    const names_last = body.get("names_last") as string;
    const gender = body.get("gender") as string;
    const nationality = body.get("nationality") as string;
    const address = body.get("address") as string;
    const country = body.get("country") as string;
    const region = body.get("region") as string;
    const cci = body.get("cci") as string;
    const account_number = body.get("account_number") as string;
    const front = body.get("front") as File | null;
    const back = body.get("back") as File | null;
    const phone_number = body.get("phone_number") as string;

    // Validación básica
    if (
      !document_type ||
      !document_number ||
      !names_first ||
      !names_last ||
      !gender ||
      !nationality ||
      !address ||
      !country ||
      !region ||
      !cci ||
      !account_number ||
      !front ||
      !back ||
      !phone_number
    ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Prepara FormData para reenviar
    const formData = new FormData();
    formData.append("document_type", document_type);
    formData.append("document_number", document_number);
    formData.append("names_first", names_first);
    formData.append("names_last", names_last);
    formData.append("gender", gender);
    formData.append("nationality", nationality);
    formData.append("address", address);
    formData.append("country", country);
    formData.append("region", region);
    formData.append("cci", cci);
    formData.append("account_number", account_number);
    formData.append("front", front);
    formData.append("back", back);
    formData.append("phone_number", phone_number);

    // Llama al endpoint functions/v1/submit-identity-verification
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await fetch(
      `${supabaseUrl}/functions/v1/submit-identity-verification`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            (
              await supabase.auth.getSession()
            ).data.session?.access_token
          }`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to submit identity verification" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in submit-identity-verification endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
