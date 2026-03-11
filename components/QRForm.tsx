"use client";

import React, { useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Download,
  Link2,
  QrCode,
  ScanLine,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

const toastStyles = {
  backgroundColor: "#0A111E",
  border: "1px solid rgba(248, 241, 231, 0.12)",
  color: "#F8F1E7",
};

const QRForm = () => {
  const [inputError, setInputError] = useState(false);
  const [value, setValue] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("QR code downloaded", {
      icon: <Check size={18} color="green" />,
      style: toastStyles,
    });
  };

  const generateQRCode = async () => {
    setIsGenerating(true);

    try {
      const qr = await QRCode.toDataURL(value, {
        width: 900,
        margin: 2,
        color: {
          dark: "#0A111E",
          light: "#F7F0E7",
        },
      });
      setQrCodeUrl(qr);
    } catch (error) {
      console.error(error);
      toast.error("Could not generate QR code", {
        icon: <XCircle size={18} color="red" />,
        style: toastStyles,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === "") {
      setInputError(true);
      toast.error("Enter a URL or text value", {
        icon: <XCircle size={18} color="red" />,
        style: toastStyles,
      });
      return;
    }

    setInputError(false);
    toast.success("QR code generated", {
      icon: <BadgeCheck size={18} color="green" />,
      style: toastStyles,
    });
    void generateQRCode();
  };

  const clearForm = () => {
    setValue("");
    setQrCodeUrl("");
    setInputError(false);
  };

  return (
    <section className="glass-panel rounded-[2rem] p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-white/45">Generator</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#f8f1e7] sm:text-3xl">
            Build your QR image
          </h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-[#ffb08f]">
          <QrCode className="h-6 w-6" />
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3 text-sm text-white/62">
          <Link2 className="h-4 w-4 text-[#43adc0]" />
          Paste a destination, message, or any short shareable value.
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <label className="text-sm font-medium text-[#f8f1e7]" htmlFor="qr-input">
            Content
          </label>
          <div
            className={`rounded-[1.25rem] border px-4 py-3 transition ${
              inputError
                ? "border-red-400/70 bg-red-500/8"
                : "border-white/10 bg-[#0b1526]/80 focus-within:border-[#43adc0]/70"
            }`}
          >
            <input
              id="qr-input"
              type="text"
              placeholder="Enter text or URL"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (inputError && e.target.value.trim() !== "") {
                  setInputError(false);
                }
              }}
              className="w-full bg-transparent text-base text-[#f8f1e7] outline-none placeholder:text-white/30"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-[#f7f0e7] px-5 py-3 text-sm font-semibold text-[#07101d] transition hover:bg-[#fff7ef] disabled:cursor-wait disabled:opacity-70"
            >
              {isGenerating ? "Generating..." : "Generate code"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-white/72 transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>

          <p className="text-sm leading-6 text-white/45">
            Works well for links, portfolio cards, event check-ins, and quick phone-to-phone sharing.
          </p>
        </form>
      </div>

      <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-[#091321]/90 p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-white/40">Preview</p>
            <h3 className="mt-2 text-lg font-medium text-[#f8f1e7]">Scan-ready output</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/55">
            <ScanLine className="h-3.5 w-3.5" />
            PNG Export
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] px-4 py-6 sm:px-8">
          {qrCodeUrl ? (
            <>
              <div className="rounded-[1.65rem] bg-[#f7f0e7] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <Image
                  src={qrCodeUrl}
                  alt="Generated QR code"
                  width={280}
                  height={280}
                  unoptimized
                  className="h-auto w-full max-w-[280px] rounded-[1.1rem]"
                />
              </div>
              <button
                onClick={downloadQRCode}
                className="mt-5 inline-flex items-center gap-2 rounded-[1.15rem] border border-white/10 bg-white/8 px-5 py-3 text-sm font-medium text-[#f8f1e7] transition hover:bg-white/12"
              >
                Download PNG
                <Download className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-[1.4rem] border border-white/10 bg-white/6 p-4 text-[#43adc0]">
                <QrCode className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-medium text-[#f8f1e7]">
                Your QR preview will appear here
              </h4>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/50">
                Submit your content to render a high-contrast QR code optimized for quick
                scanning.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/52">
          <span>High contrast layout for better scan reliability.</span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/38">
            01 / Export
          </span>
        </div>
      </div>
    </section>
  );
};

export default QRForm;
