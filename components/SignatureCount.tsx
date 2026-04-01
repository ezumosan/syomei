"use client";

import { useEffect, useMemo, useState } from "react";

type CountResponse = {
  count: number;
};

export default function SignatureCount() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const goal = Number(process.env.NEXT_PUBLIC_SIGNATURE_GOAL ?? 500);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const res = await fetch("/api/signatures/count", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("署名数の取得に失敗しました");
        }
        const data = (await res.json()) as CountResponse;
        if (isMounted) {
          setCount(data.count);
          setError("");
        }
      } catch {
        if (isMounted) {
          setError("署名数を取得できませんでした");
        }
      }
    };

    void fetchCount();
    const intervalId = setInterval(() => {
      void fetchCount();
    }, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const progress = useMemo(() => {
    if (count === null || goal <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((count / goal) * 100));
  }, [count, goal]);

  return (
    <section className="rounded-xl border border-brand-100 bg-white/80 p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-brand-900">現在の署名状況</h2>
      <p className="mt-1 text-sm text-slate-600">15秒ごとに最新の署名数へ更新されます。</p>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-brand-100">
        <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-3 text-sm text-slate-700">
        {error ? error : `${count ?? "-"} / ${goal} 件`}
      </p>
    </section>
  );
}
