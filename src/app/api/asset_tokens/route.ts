import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: tokens, error: tokensError } = await supabase
      .from("asset_tokens")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (tokensError) {
      console.error("Error fetching asset tokens:", tokensError);
      return NextResponse.json(
        { error: "Failed to fetch asset tokens" },
        { status: 500 }
      );
    }

    return NextResponse.json({ tokens });
  } catch (error) {
    console.error("Error in asset_tokens endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { asset_id, num_shares } = body;

    if (!asset_id || !num_shares) {
      return NextResponse.json(
        { error: "Missing required fields: asset_id and num_shares" },
        { status: 400 }
      );
    }

    if (typeof num_shares !== "number" || num_shares <= 0) {
      return NextResponse.json(
        { error: "Number of shares must be greater than 0" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-asset-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (
              await supabase.auth.getSession()
            ).data.session?.access_token
          }`,
        },
        body: JSON.stringify({ asset_id, num_shares }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to create asset token" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in asset_tokens endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
