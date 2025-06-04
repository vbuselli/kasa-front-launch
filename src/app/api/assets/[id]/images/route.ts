import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split("/").slice(-2, -1)[0];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-images?bucket=asset-images&folder=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to fetch images" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.images || []);
  } catch (error) {
    console.error("Error in get-asset-by-id endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
