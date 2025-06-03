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
    const asset_token_id = body.get("asset_token_id") as string;
    const transaction_number = body.get("transaction_number") as string;
    const voucherImage = body.get("voucherImage") as File | null;

    // Validate input
    if (!asset_token_id || !transaction_number || !voucherImage) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: asset_token_id, transaction_number, voucherImage",
        },
        { status: 400 }
      );
    }

    // Prepare FormData for forwarding
    const formData = new FormData();
    formData.append("asset_token_id", asset_token_id);
    formData.append("transaction_number", transaction_number);
    formData.append("voucherImage", voucherImage);

    // Call the create-transaction endpoint
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-transaction`,
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
        { error: errorData.error || "Failed to create transaction" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in create-transaction endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
