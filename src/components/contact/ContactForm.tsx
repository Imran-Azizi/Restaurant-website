"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        toast.error(json.message || json.error || t.contact.error);
        return;
      }

      toast.success(json.message || t.contact.success);
      reset();
    } catch {
      toast.error(t.contact.error);
    } finally {
      setStatus("idle");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]" htmlFor="name">
          {t.contact.name}
        </label>
        <Input id="name" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-[var(--color-tomato)]">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]" htmlFor="phone">
          {t.contact.phone}
        </label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && (
          <p className="mt-1 text-xs text-[var(--color-tomato)]">
            {errors.phone.message}
          </p>
        )}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]" htmlFor="email">
          {t.contact.email}
        </label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-xs text-[var(--color-tomato)]">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]" htmlFor="message">
          {t.contact.message}
        </label>
        <Textarea id="message" {...register("message")} />
        {errors.message && (
          <p className="mt-1 text-xs text-[var(--color-tomato)]">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-1 w-full sm:w-auto"
        loading={status === "submitting"}
      >
        {status === "submitting" ? t.common.loading : t.contact.send}
      </Button>
    </form>
  );
}
