import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const orderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().min(1).max(50),
  unitPrice: z.number().nonnegative(),
});

export const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  fulfillment: z.enum(["pickup", "delivery"]),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  items: z.array(orderItemSchema).min(1),
  total: z.number().nonnegative(),
});

export type OrderInput = z.infer<typeof orderSchema>;
