import { z } from "zod";

export const signatureSchema = z.object({
  student_id: z
    .string()
    .min(1, "学籍番号は必須です")
    .regex(/^[A-Za-z0-9]+$/, "学籍番号は半角英数字で入力してください"),
  name: z.string().min(1, "氏名は必須です").max(100, "氏名が長すぎます"),
  agreed: z.literal(true, {
    errorMap: () => ({ message: "同意チェックが必要です" }),
  }),
});

export type SignatureInput = z.infer<typeof signatureSchema>;
