"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ReferralRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const details = [
      `Name: ${String(values.get("name") || "Not provided")}`,
      `Preferred contact: ${String(values.get("contact") || "Not provided")}`,
      `County or town: ${String(values.get("location") || "Not provided")}`,
      `Preferred format: ${String(values.get("format") || "No preference")}`,
      `Support area: ${String(values.get("support") || "Not provided")}`,
      `Budget preference: ${String(values.get("budget") || "Not provided")}`,
    ].join("\n");
    const subject = encodeURIComponent("EmoEase referral request");
    const body = encodeURIComponent(`Hello EmoEase,\n\nI would like help finding a mental-health professional or service.\n\n${details}\n\nI understand EmoEase is a referral and community service, not emergency or clinical care.`);
    window.location.href = `mailto:emoease23@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border bg-card p-6 shadow-soft sm:p-8">
      <h2 className="text-2xl font-bold">Tell us what would help</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Do not include detailed personal history, diagnoses, or crisis information here. This request opens in your email app; nothing is stored on this website.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Name or preferred name<input name="name" autoComplete="name" className="h-11 rounded-xl border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
        <label className="grid gap-2 text-sm font-semibold">How should we contact you?*<input name="contact" required placeholder="Phone number or email" className="h-11 rounded-xl border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
        <label className="grid gap-2 text-sm font-semibold">County or town*<input name="location" required placeholder="For example, Nairobi" className="h-11 rounded-xl border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
        <label className="grid gap-2 text-sm font-semibold">Preferred format<select name="format" defaultValue="No preference" className="h-11 rounded-xl border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"><option>No preference</option><option>In person</option><option>Online</option></select></label>
        <label className="grid gap-2 text-sm font-semibold">What support are you looking for?*<select name="support" required defaultValue="" className="h-11 rounded-xl border bg-background px-3 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="" disabled>Select one</option><option>Individual counselling or therapy</option><option>Relationship or family support</option><option>Stress, low mood, or anxiety support</option><option>Substance-use support</option><option>Not sure yet</option></select></label>
        <label className="grid gap-2 text-sm font-semibold">Budget preference<select name="budget" defaultValue=""><option value="">Not sure / discuss options</option><option>Low-cost or subsidised</option><option>Private pay</option><option>Insurance-covered, if possible</option></select></label>
      </div>
      <Button type="submit" className="mt-7"><Mail className="h-4 w-4" aria-hidden="true" />Prepare referral email</Button>
      <p className="mt-4 text-sm leading-6 text-muted-foreground" aria-live="polite">{submitted ? "Your email app is opening. Review the details, then send when you are comfortable." : "By sending, you ask EmoEase to respond about possible referral options. We cannot guarantee availability, cost, or clinical fit."}</p>
    </form>
  );
}
