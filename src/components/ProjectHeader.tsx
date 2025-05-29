"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center text-white text-2xl font-bold mb-8">
      <Link href="/investments" className="flex items-center hover:opacity-80">
        <ArrowLeft size={24} className="mr-2" />
        <span>{title}</span>
      </Link>
    </div>
  );
}
