import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HeartHandshake, ShieldAlert } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { SiteShell } from "@/components/layout/site-shell";
import { getResourceArticle, resourceArticles } from "@/lib/resource-articles";

type ResourceArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return resourceArticles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ResourceArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  return article ? { title: article.title, description: article.description } : {};
}

export default async function ResourceArticlePage({ params }: ResourceArticlePageProps) {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article) notFound();

  const urgent = article.slug === "when-it-feels-urgent";
  return <SiteShell><main id="main-content">
    <article><header className="border-b border-border/70 bg-accent/40 py-14 sm:py-20"><Container className="max-w-4xl"><Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"><ArrowLeft className="h-4 w-4" aria-hidden="true" />All resources</Link><p className="mt-8 text-sm font-bold uppercase tracking-[.16em] text-secondary">{article.topic}</p><h1 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">{article.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{article.description}</p></Container></header>
      <Container className="max-w-4xl py-14 sm:py-20"><p className="text-lg leading-8 text-muted-foreground">{article.introduction}</p>{urgent && <aside className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex gap-3"><ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-red-700" aria-hidden="true" /><div><h2 className="text-xl font-bold">Need urgent support now?</h2><p className="mt-2 leading-7 text-muted-foreground">Use emergency medical help first if there is immediate danger.</p><Link href="/get-help-now" className="mt-3 inline-block font-semibold text-red-800">Go to Get Help Now -&gt;</Link></div></div></aside>}<div className="mt-12 space-y-12">{article.sections.map((section) => <section key={section.heading}><h2 className="text-3xl font-bold">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>)}</section>)}</div>
        <section className="mt-12 rounded-3xl bg-card p-7 shadow-soft sm:p-9"><h2 className="text-3xl font-bold">Small steps for today</h2><ul className="mt-6 space-y-4">{article.smallSteps.map((step) => <li key={step} className="flex gap-3 leading-7 text-muted-foreground"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />{step}</li>)}</ul></section>
        <section className="mt-12 rounded-3xl border border-secondary/25 bg-accent p-7 sm:p-9"><HeartHandshake className="h-7 w-7 text-secondary" aria-hidden="true" /><h2 className="mt-4 text-3xl font-bold">It may be time to reach out when</h2><ul className="mt-5 space-y-3">{article.whenToReachOut.map((reason) => <li key={reason} className="leading-7 text-muted-foreground">{reason}</li>)}</ul><div className="mt-7 flex flex-wrap gap-4"><Link href={urgent ? "/get-help-now" : "/support"} className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">{urgent ? "Get Help Now" : "Talk to EmoEase"}</Link>{!urgent && <Link href="/find-a-therapist" className="rounded-xl border border-border bg-background px-5 py-3 font-semibold text-foreground hover:bg-muted">Find professional support</Link>}</div></section>
        <p className="mt-10 text-sm leading-6 text-muted-foreground">This guide is for general information and is not clinical advice. Further reading: <a href={article.source.href} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:text-primary/80">{article.source.label}</a>.</p>
      </Container></article>
  </main></SiteShell>;
}
