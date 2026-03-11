import { Toaster } from "sonner";
import QRForm from "../components/QRForm";

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
