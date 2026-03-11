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
    <div className="glass-panel overflow-hidden rounded-3xl">
      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="qr-input">
              Enter URL or Text
            </label>
            <div
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                inputError
                  ? "border-red-500/50 bg-red-500/5"
                  : "border-white/10 bg-black/20 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20"
              }`}
            >
              <Link2 className="h-4 w-4 text-gray-500" />
              <input
                id="qr-input"
                type="text"
                placeholder="https://example.com"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (inputError && e.target.value.trim() !== "") {
                    setInputError(false);
                  }
                }}
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {isGenerating ? "Generating..." : "Generate QR Code"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 active:scale-[0.98]"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8">
            {qrCodeUrl ? (
              <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="rounded-2xl bg-white p-4 shadow-2xl">
                  <Image
                    src={qrCodeUrl}
                    alt="Generated QR code"
                    width={240}
                    height={240}
                    unoptimized
                    className="h-auto w-full max-w-[240px]"
                  />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4 text-gray-500">
                <div className="rounded-2xl bg-white/5 p-4">
                  <QrCode className="h-8 w-8 opacity-40" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-400">Preview Area</p>
                  <p className="text-xs max-w-[200px]">
                    Your generated QR code will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRForm;
