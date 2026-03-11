"use client";

import React, { useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Download,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

const toastStyles = {
  backgroundColor: "#111111",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#f5f0e8",
  fontFamily: "'DM Mono', monospace",
  fontSize: "12px",
  borderRadius: "2px",
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
    toast.success("Downloaded", {
      icon: <Check size={14} color="#86efac" />,
      style: toastStyles,
    });
  };

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const qr = await QRCode.toDataURL(value, {
        width: 900,
        margin: 2,
        color: { dark: "#0f0f0f", light: "#f5f0e8" },
      });
      setQrCodeUrl(qr);
    } catch (error) {
      console.error(error);
      toast.error("Generation failed", {
        icon: <XCircle size={14} color="#f87171" />,
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
      toast.error("Enter a URL or text first", {
        icon: <XCircle size={14} color="#f87171" />,
        style: toastStyles,
      });
      return;
    }
    setInputError(false);
    toast.success("QR code generated", {
      icon: <BadgeCheck size={14} color="#86efac" />,
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;500;600;700;800&display=swap');

        .qr-root {
          font-family: 'DM Mono', monospace;
          background: #0f0f0f;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .qr-card {
          width: 100%;
          max-width: 480px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        /* Corner tick marks — Swiss instrument vibe */
        .qr-card::before,
        .qr-card::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          z-index: 2;
          pointer-events: none;
        }
        .qr-card::before {
          top: -1px; left: -1px;
          border-top: 2px solid rgba(245,240,232,0.4);
          border-left: 2px solid rgba(245,240,232,0.4);
        }
        .qr-card::after {
          bottom: -1px; right: -1px;
          border-bottom: 2px solid rgba(245,240,232,0.4);
          border-right: 2px solid rgba(245,240,232,0.4);
        }

        .qr-header {
          padding: 28px 32px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .qr-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #f5f0e8;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0;
        }

        .qr-subtitle {
          font-size: 10px;
          color: rgba(245,240,232,0.3);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 6px;
        }

        .qr-badge {
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 8px;
          border-radius: 2px;
          margin-top: 2px;
        }

        .qr-body {
          padding: 28px 32px;
        }

        .field-label {
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
          margin-bottom: 10px;
          display: block;
        }

        .input-wrap {
          position: relative;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255,255,255,0.01);
        }
        .input-wrap:focus-within {
          border-color: rgba(245,240,232,0.4);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 0 20px rgba(0,0,0,0.4);
        }
        .input-wrap.error {
          border-color: rgba(248,113,113,0.4);
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }

        .input-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          color: rgba(245,240,232,0.25);
          letter-spacing: 0.05em;
          pointer-events: none;
          user-select: none;
        }

        .qr-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          padding: 14px 14px 14px 40px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #f5f0e8;
          box-sizing: border-box;
          letter-spacing: 0.01em;
        }
        .qr-input::placeholder {
          color: rgba(245,240,232,0.15);
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-generate {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #f5f0e8;
          color: #0f0f0f;
          border: none;
          border-radius: 2px;
          padding: 14px 18px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-generate:hover:not(:disabled) { 
          background: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245,240,232,0.15);
        }
        .btn-generate:active:not(:disabled) { 
          transform: translateY(0); 
        }
        .btn-generate:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .btn-reset {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: rgba(245,240,232,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          padding: 14px 20px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-reset:hover {
          border-color: rgba(255,255,255,0.2);
          color: rgba(245,240,232,0.8);
          background: rgba(255,255,255,0.04);
        }
        .btn-reset:active { transform: scale(0.97); }

        .preview-area {
          margin-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 28px;
        }

        .preview-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .preview-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .preview-box {
          min-height: 320px;
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid overlay on preview box */
        .preview-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .scanner-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f5f0e8, transparent);
          box-shadow: 0 0 15px #f5f0e8;
          top: 0;
          left: 0;
          z-index: 5;
          opacity: 0.5;
          animation: scan 2s linear infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          opacity: 0.6;
        }

        .empty-icon-ring {
          width: 60px;
          height: 60px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-icon-inner {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 2px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 5px;
          padding: 7px;
        }

        .empty-icon-inner span {
          display: block;
          border-radius: 1px;
        }
        .empty-icon-inner span:nth-child(1) { background: rgba(245,240,232,0.2); }
        .empty-icon-inner span:nth-child(2) { background: rgba(245,240,232,0.08); }
        .empty-icon-inner span:nth-child(3) { background: rgba(245,240,232,0.08); }
        .empty-icon-inner span:nth-child(4) { background: rgba(245,240,232,0.2); }

        .empty-text {
          font-size: 11px;
          color: rgba(245,240,232,0.25);
          letter-spacing: 0.08em;
          text-align: center;
          line-height: 1.6;
        }

        .qr-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .qr-image-frame {
          background: #f5f0e8;
          padding: 16px;
          border-radius: 2px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 30px 90px rgba(0,0,0,0.6);
          position: relative;
        }
        .qr-image-frame::after {
          content: '';
          position: absolute;
          inset: -1px;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
        }

        .btn-download {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(245,240,232,0.6);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          padding: 10px 22px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-download:hover {
          color: #f5f0e8;
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .btn-download:active { transform: scale(0.97); }

        .qr-footer {
          padding: 16px 32px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.01);
        }

        .footer-mono {
          font-size: 10px;
          color: rgba(245,240,232,0.2);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${isGenerating ? '#facc15' : qrCodeUrl ? '#86efac' : 'rgba(245,240,232,0.15)'};
          transition: all 0.4s ease;
          box-shadow: ${qrCodeUrl && !isGenerating ? '0 0 12px rgba(134,239,172,0.5)' : 'none'};
          animation: ${isGenerating ? 'pulse 1s infinite' : 'none'};
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="qr-root">
        <div className="qr-card">
          {/* Header */}
          <div className="qr-header">
            <div>
              <h1 className="qr-title">QR Generator</h1>
              <p className="qr-subtitle">Encode any URL or text</p>
            </div>
            <span className="qr-badge">v2.0</span>
          </div>

          {/* Body */}
          <div className="qr-body">
            <form onSubmit={handleSubmit} noValidate>
              <label className="field-label" htmlFor="qr-input">
                Input
              </label>
              <div className={`input-wrap${inputError ? ' error' : ''}`}>
                <span className="input-prefix">~/</span>
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
                  className="qr-input"
                />
              </div>

              <div className="actions">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn-generate"
                >
                  {isGenerating ? "Generating…" : "Generate"}
                  <ArrowRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="btn-reset"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Preview */}
            <div className="preview-area">
              <div className="preview-label">Output</div>
              <div className="preview-box">
                {isGenerating && <div className="scanner-line" />}
                {qrCodeUrl ? (
                  <div className="qr-result">
                    <div className="qr-image-frame">
                      <Image
                        src={qrCodeUrl}
                        alt="Generated QR code"
                        width={200}
                        height={200}
                        unoptimized
                        style={{ display: 'block', width: 200, height: 200 }}
                      />
                    </div>
                    <button onClick={downloadQRCode} className="btn-download">
                      <Download size={11} />
                      Download PNG
                    </button>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon-ring">
                      <div className="empty-icon-inner">
                        <span /><span /><span /><span />
                      </div>
                    </div>
                    <p className="empty-text">
                      Enter a value above<br />to generate your code
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="qr-footer">
            <span className="footer-mono">
              {isGenerating ? 'Processing…' : qrCodeUrl ? 'Ready' : 'Idle'}
            </span>
            <div className="status-dot" />
          </div>
        </div>
      </div>
    </>
  );
};

export default QRForm;