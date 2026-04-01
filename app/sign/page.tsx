"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ApiResponse = {
  message: string;
  emailSent?: boolean;
};

export default function SignPage() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/signatures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId.trim(),
          name: name.trim(),
          email: email.trim(),
          agreed,
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok) {
        setError(data.message || "送信に失敗しました");
        return;
      }

      setSuccess(data.message || "署名が完了しました");
      setStudentId("");
      setName("");
      setEmail("");
      setAgreed(false);
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="rounded-2xl border border-brand-100 bg-white/95 p-6 shadow-md sm:p-8">
        <h1 className="text-2xl font-bold text-brand-900">署名フォーム</h1>
        <p className="mt-2 text-sm text-slate-600">必要事項を入力し、署名にご参加ください。</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="student_id" className="mb-1 block text-sm font-medium text-slate-700">
              学籍番号（半角英数字）
            </label>
            <input
              id="student_id"
              name="student_id"
              type="text"
              inputMode="text"
              autoComplete="off"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
              氏名
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-brand-500 focus:ring"
              required
            />
          </div>

          <label className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4"
              required
            />
            <span>プライバシーポリシーに同意し、署名内容は適切に管理されることを理解しました。</span>
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {success && <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "送信中..." : "この署名に賛成する"}
          </button>
        </form>

        <div className="mt-6 text-sm">
          <Link href="/" className="text-brand-700 hover:underline">
            トップページに戻る
          </Link>
        </div>
      </section>
    </main>
  );
}
