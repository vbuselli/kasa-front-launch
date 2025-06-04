"use client";
import { ReactNode } from "react";

export default function Drawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-1/12 bottom-1/12 right-0 w-full sm:w-[430px] bg-[#101B29] z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          willChange: "transform",
          boxShadow: "0 0 32px 0 rgba(0,0,0,0.25)",
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: "24px",
          maxWidth: "100vw",
        }}
        aria-hidden={!isOpen}
      >
        <button
          className="absolute top-6 right-6 text-white text-2xl focus:outline-none cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar"
          style={{ zIndex: 10 }}
        >
          ✕
        </button>
        <div className="p-6 pt-12 sm:pt-10 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
