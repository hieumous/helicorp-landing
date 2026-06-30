import { z } from "zod";

export const subscribeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập ít nhất 2 ký tự")
    .max(60, "Tên quá dài"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
  // Honeypot field - phải để trống (chống bot spam)
  website: z.string().max(0).optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
