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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />

      <div className="relative z-10 w-full max-w-xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            QR Generator
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Simple, professional, and clutter-free QR codes.
          </p>
        </header>

        <section className="fade-up">
          <QRForm />
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500">
          Clean output • No tracking • High contrast
        </footer>
      </div>
    </main>
  );
}
