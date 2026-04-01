import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { signatureSchema } from "@/lib/validators";

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = signatureSchema.safeParse(body);

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "入力内容を確認してください";
    return NextResponse.json({ message: first }, { status: 400 });
  }

  const { student_id, name, email } = parsed.data;

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ message: "サーバー設定が未完了です" }, { status: 500 });
  }

  const { error } = await supabaseAdmin.from("signatures").insert({
    student_id,
    name,
    email,
  });

  if (error) {
    if (error.code === "23505") {
      const errorText = `${error.message} ${error.details ?? ""}`;
      if (errorText.includes("student_id")) {
        return NextResponse.json({ message: "この学籍番号は既に署名済みです" }, { status: 409 });
      }
      if (errorText.includes("email")) {
        return NextResponse.json({ message: "このメールアドレスは既に署名済みです" }, { status: 409 });
      }
      return NextResponse.json({ message: "既に署名済みの情報です" }, { status: 409 });
    }

    return NextResponse.json({ message: "署名の保存に失敗しました" }, { status: 500 });
  }

  if (!resend || !emailFrom) {
    return NextResponse.json(
      {
        message: "署名は完了しました。現在メール送信の設定が未完了です。",
        emailSent: false,
      },
      { status: 200 }
    );
  }

  try {
    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "署名完了のお知らせ",
      text: "あなたは署名に参加しました。ご賛同いただきありがとうございます。",
    });

    return NextResponse.json({ message: "署名が完了しました", emailSent: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "署名は完了しましたが、確認メールの送信に失敗しました。",
        emailSent: false,
      },
      { status: 200 }
    );
  }
}
