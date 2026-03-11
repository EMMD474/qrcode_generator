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
    <main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111111",
            color: "#f5f0e8",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "2px",
            fontFamily: "'DM Mono', monospace",
          },
        }}
      />
      <QRForm />
    </main>
  );
}
