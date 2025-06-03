import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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

    // Call the Supabase Edge Function to get verification status
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-state-identity`,
      {
        headers: {
          Authorization: `Bearer ${
            (
              await supabase.auth.getSession()
            ).data.session?.access_token
          }`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to get verification status" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in KYC status endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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

    // Get form data from request
    const formData = await req.formData();

    // Log received form data
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (key !== "front" && key !== "back") {
        formDataObj[key] = value.toString();
      }
    });
    console.log("Received form data in API:", {
      ...formDataObj,
      files: {
        front: formData.get("front") ? "present" : "missing",
        back: formData.get("back") ? "present" : "missing",
      },
    });

    // Call the Supabase Edge Function to submit verification
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

    const responseData = await response.json();
    console.log("Edge Function response:", responseData);

    if (!response.ok) {
      // Log the full error response for debugging
      console.error("Edge Function error:", {
        status: response.status,
        data: responseData,
      });

      return NextResponse.json(
        {
          error: responseData.error || "Failed to submit verification",
          details: responseData.details || [],
          validation_errors: responseData.details || [],
        },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in KYC submission endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
