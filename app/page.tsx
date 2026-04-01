import Link from "next/link";
import SignatureCount from "@/components/SignatureCount";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="rounded-2xl border border-brand-100 bg-white/90 p-6 shadow-md sm:p-10">
        {/* 【テキスト編集用マーカー】BEGIN: HERO_TITLE */}
        <h1 id="EDITABLE_HERO_TITLE" className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">
          学生生活をより良くするための署名
        </h1>
        {/* 【テキスト編集用マーカー】END: HERO_TITLE */}

        {/* 【テキスト編集用マーカー】BEGIN: HERO_DESCRIPTION */}
        <p id="EDITABLE_HERO_DESCRIPTION" className="mt-4 leading-7 text-slate-700">
          このページは、特定の議題に対して賛同の意思を示すための署名サイトです。趣旨にご賛同いただける方は、署名フォームから登録をお願いします。
        </p>
        {/* 【テキスト編集用マーカー】END: HERO_DESCRIPTION */}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-brand-50 p-5">
            {/* 【テキスト編集用マーカー】BEGIN: DETAILS */}
            <h2 id="EDITABLE_DETAILS_TITLE" className="text-xl font-semibold text-brand-900">
              署名の背景と目的
            </h2>
            <p id="EDITABLE_DETAILS_BODY" className="mt-3 text-sm leading-7 text-slate-700">
              ここに議題の背景、要望内容、期待される改善点を記載してください。後からこの文面を直接編集できるよう、固定文として実装しています。
            </p>
            {/* 【テキスト編集用マーカー】END: DETAILS */}
          </div>

          <SignatureCount />
        </div>

        <div className="mt-8">
          <Link
            href="/sign"
            className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-700"
          >
            署名ページへ進む
          </Link>
        </div>
      </section>
    </main>
  );
}
