// components/Breadcrumb.tsx
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbProps {
  current: string;
  backHref?: string;
  backLabel?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  current,
  backHref = "/",
  backLabel = "Inicio",
}) => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-white bg-transparent px-4 py-3 pt-14">
      <Link
        href={backHref}
        className="flex items-center gap-1 font-bold hover:underline"
      >
        <ChevronLeft size={16} />
        {backLabel}
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-500">{current}</span>
    </div>
  );
};

export default Breadcrumb;
