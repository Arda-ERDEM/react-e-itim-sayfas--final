import type { ReactNode } from "react";

interface LessonSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tone?: "emerald" | "amber" | "sky";
}

const toneStyles: Record<NonNullable<LessonSectionProps["tone"]>, string> = {
  emerald: "border-emerald-500/40 bg-emerald-500/5",
  amber: "border-amber-500/40 bg-amber-500/5",
  sky: "border-sky-500/40 bg-sky-500/5",
};

export function LessonSection({
  title,
  subtitle,
  children,
  tone = "emerald",
}: LessonSectionProps) {
  return (
    <section className={`rounded-2xl border p-6 md:p-8 ${toneStyles[tone]}`}>
      <header className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 text-muted-foreground">{subtitle}</p> : null}
      </header>
      <div className="space-y-4 text-[15px] leading-7">{children}</div>
    </section>
  );
}
