import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  industry: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000)
}).strict();
