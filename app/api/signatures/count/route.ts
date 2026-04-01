import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  let supabaseAdmin;

  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ message: "サーバー設定が未完了です" }, { status: 500 });
  }

  const { count, error } = await supabaseAdmin
    .from("signatures")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ message: "署名数の取得に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ count: count ?? 0 }, { status: 200 });
}
