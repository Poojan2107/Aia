import { WaitlistForm } from "@/components/WaitlistForm";

const steps = [
  {
    n: "01",
    title: "Share the Figma",
    body: "Drop a link or export. One frame or a full flow — we work from the file you already have.",
  },
  {
    n: "02",
    title: "We build the page",
    body: "Responsive markup, real type, and production polish. No template that almost matches.",
  },
  {
    n: "03",
    title: "It goes live",
    body: "Ship on GitHub Pages or Vercel. Same design, public URL, ready to share.",
  },
];

const features = [
  {
    title: "Pixel-true layout",
    body: "Spacing, type, and color pulled from the file — not a nearby guess.",
  },
  {
    title: "Ships on day one",
    body: "Static, fast, and indexable. A real URL, not a prototype behind a login.",
  },
  {
    title: "Ready to iterate",
    body: "Clean Next.js + Tailwind so the next pass is a design update, not a rewrite.",
  },
  {
    title: "Mobile included",
    body: "Desktop frame in Figma, phone-ready in the browser. No second project.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(ellipse_at_top,_rgba(212,165,116,0.16),_transparent_60%)]"
      />
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top" className="font-serif text-2xl tracking-tight">
          Aia
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#features" className="hover:text-foreground">
            Product
          </a>
          <a
            href="#waitlist"
            className="rounded-full border border-line px-4 py-2 text-foreground hover:border-accent"
          >
            Get access
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid w-full max-w-6xl gap-16 px-6 pb-24 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-16">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-accent">
              Figma → live page
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              From Figma
              <br />
              to a live page.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Have a Figma file? Aia turns it into a production landing page and
              puts it on the internet. Share the file. We ship the site.
            </p>
            <div className="mt-10" id="waitlist">
              <WaitlistForm id="hero-waitlist" />
              <p className="mt-3 text-sm text-muted">
                No Figma yet? This page is already live-ready — send the file
                when you have it and we match the design.
              </p>
            </div>
          </div>

          <PreviewCard />
        </section>

        <section
          id="how"
          className="border-y border-line bg-white/[0.02] py-20"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n}>
                <p className="font-mono text-xs tracking-[0.2em] text-accent">
                  {step.n}
                </p>
                <h2 className="mt-4 font-serif text-3xl tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">
              Why Aia
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              A landing page that looks like the file, not a theme.
            </h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-line bg-white/[0.03] p-8"
              >
                <h3 className="font-serif text-2xl tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="rounded-[2rem] border border-line bg-gradient-to-br from-white/[0.06] to-transparent px-8 py-14 text-center sm:px-16">
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
              Send the file. We&apos;ll make it live.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Link, export, or screenshot. Once we have the design, the page
              gets rebuilt to match — then published.
            </p>
            <div className="mx-auto mt-8 flex justify-center">
              <WaitlistForm id="footer-waitlist" compact />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted">
          <span className="font-serif text-foreground">Aia</span>
          <span>From design to a URL.</span>
        </div>
      </footer>
    </div>
  );
}

function PreviewCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-accent/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[#161513] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3d3a36]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3d3a36]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          <span className="ml-3 font-mono text-[11px] text-muted">
            aia.live / landing
          </span>
        </div>
        <div className="space-y-5 p-6">
          <div className="h-3 w-20 rounded-full bg-accent/40" />
          <div className="space-y-2">
            <div className="h-8 w-4/5 rounded-lg bg-foreground/90" />
            <div className="h-8 w-3/5 rounded-lg bg-foreground/70" />
          </div>
          <div className="h-16 rounded-2xl bg-white/5" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 rounded-2xl border border-line bg-white/[0.04]" />
            <div className="h-24 rounded-2xl border border-line bg-white/[0.04]" />
            <div className="h-24 rounded-2xl border border-accent/30 bg-accent/10" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 flex-1 rounded-full bg-white/10" />
            <div className="h-10 w-28 rounded-full bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
