"use client";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;

  loading?: boolean;
}

export default function NotifyDialog({
  isOpen,
  title = "Are you sure?",
  description,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
