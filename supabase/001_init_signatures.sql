-- signatures table
create table if not exists public.signatures (
  id bigserial primary key,
  student_id text not null,
  name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint signatures_student_id_key unique (student_id),
  constraint signatures_email_key unique (email)
);

comment on table public.signatures is '署名データ';
comment on column public.signatures.student_id is '学籍番号（半角英数字）';
comment on column public.signatures.name is '氏名';
comment on column public.signatures.email is '連絡先メールアドレス';

-- Row Level Security
alter table public.signatures enable row level security;

create policy "Allow insert signatures for anon"
on public.signatures
for insert
to anon
with check (true);

-- service_role はRLSをバイパスするため、APIルートでは service role key を利用
-- 公開クライアントから署名一覧は読めない設定
