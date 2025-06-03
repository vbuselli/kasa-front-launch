import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Asset } from "types/models";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get user session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("User:", user);

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Fetching asset tokens for user:", user.id);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const accessToken = (await supabase.auth.getSession()).data.session
      ?.access_token;

    const urls = [
      `${supabaseUrl}/functions/v1/get-my-asset-tokens`,
      `${supabaseUrl}/functions/v1/get-all-assets`,
    ];

    const [myTokensResult, allAssetsResult] = await Promise.allSettled(
      urls.map((url) =>
        fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )
    );

    if (myTokensResult.status !== "fulfilled" || !myTokensResult.value.ok) {
      const errorData =
        myTokensResult.status === "fulfilled"
          ? await myTokensResult.value.json()
          : {};
      return NextResponse.json(
        { error: errorData.error || "Failed to get asset tokens" },
        {
          status:
            myTokensResult.status === "fulfilled"
              ? myTokensResult.value.status
              : 500,
        }
      );
    }

    if (allAssetsResult.status !== "fulfilled" || !allAssetsResult.value.ok) {
      const errorData =
        allAssetsResult.status === "fulfilled"
          ? await allAssetsResult.value.json()
          : {};
      return NextResponse.json(
        { error: errorData.error || "Failed to get all assets" },
        {
          status:
            allAssetsResult.status === "fulfilled"
              ? allAssetsResult.value.status
              : 500,
        }
      );
    }

    const myTokensData = await myTokensResult.value.json();
    const allAssetsData = await allAssetsResult.value.json();

    // Popula la data de assets dentro de cada token
    const enrichedTokens = Array.isArray(myTokensData)
      ? myTokensData.map((token) => ({
          ...token,
          asset: allAssetsData.find(
            (asset: Asset) => asset.id === token.asset_id
          ),
        }))
      : myTokensData;

    const data = enrichedTokens;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in asset_tokens endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
