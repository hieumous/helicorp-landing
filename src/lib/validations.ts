import { z } from "zod";

export function createSubscribeSchema(messages: {
  nameMin: string;
  emailInvalid: string;
}) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin).max(60),
    email: z.string().trim().min(1).email(messages.emailInvalid),
    website: z.string().max(0).optional(),
  });
}

/** @deprecated Use createSubscribeSchema with localized messages */
export const subscribeSchema = createSubscribeSchema({
  nameMin: "Vui lòng nhập ít nhất 2 ký tự",
  emailInvalid: "Email không hợp lệ",
});

export type SubscribeInput = z.infer<ReturnType<typeof createSubscribeSchema>>;
