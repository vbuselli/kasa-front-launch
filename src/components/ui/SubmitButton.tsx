"use client";

import { useFormStatus } from "react-dom";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      {...props}
      className="bg-primary text-white font-medium rounded-md px-4 py-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {pending ? pendingText : children}
    </button>
  );
}
