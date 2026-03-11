import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Toaster } from "sonner";
import QRForm from "../components/QRForm";

const highlights = [
  {
    icon: Zap,
    title: "Instant export",
    copy: "Generate and download a clean QR image in one flow.",
  },
  {
    icon: ShieldCheck,
    title: "No account needed",
    copy: "Open the page, paste your content, and get the code immediately.",
  },
  {
    icon: Sparkles,
    title: "Built for sharing",
    copy: "Useful for links, portfolio cards, event pages, menus, and notes.",
  },
];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 py-8 sm:px-8 lg:px-12">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(10, 17, 30, 0.94)",
            color: "#f8f1e7",
            border: "1px solid rgba(248, 241, 231, 0.12)",
          },
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="float-slow absolute left-[-8rem] top-[-6rem] h-56 w-56 rounded-full bg-[#ff8c69]/40 blur-3xl" />
        <div className="float-slower absolute right-[-6rem] top-16 h-64 w-64 rounded-full bg-[#8b7bff]/20 blur-3xl" />
        <div className="float-slow absolute bottom-[-8rem] right-[-4rem] h-72 w-72 rounded-full bg-[#43adc0]/30 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-10 w-10 rounded-full bg-[#f2d74a]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <section className="fade-up max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-[#ff8c69]" />
            QR Toolkit
          </div>

          <h1 className="max-w-xl text-5xl font-semibold leading-[0.92] text-[#f8f1e7] sm:text-6xl lg:text-7xl">
            Design-ready QR codes without the clutter.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
            Turn a link or short block of text into a sharp QR image with a cleaner interface,
            calmer hierarchy, and a preview that feels intentional on both desktop and mobile.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/78">
            <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2">Links</span>
            <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2">Text snippets</span>
            <span className="rounded-full border border-white/12 bg-white/6 px-4 py-2">Event sharing</span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="glass-panel rounded-3xl p-5">
                <Icon className="mb-4 h-5 w-5 text-[#ffb08f]" />
                <h2 className="text-base font-medium text-[#f8f1e7]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up" style={{ animationDelay: "140ms" }}>
          <QRForm />
        </section>
      </div>
    </main>
  );
}
