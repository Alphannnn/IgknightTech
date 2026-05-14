"use client";

import { Trash2 } from "lucide-react";
import { deletePostAction } from "./actions";

/**
 * Inline delete button with a native confirm() guard. Client component so
 * we can intercept onSubmit; the action still runs as a Server Action.
 */
export default function ConfirmDeleteButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <form
      action={deletePostAction}
      onSubmit={(e) => {
        if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Delete"
        aria-label="Delete"
        className="group/btn w-8 h-8 rounded-md hover:bg-red-50 flex items-center justify-center transition-colors"
      >
        <Trash2 className="w-4 h-4 text-slate-500 group-hover/btn:text-red-600 transition-colors" strokeWidth={1.8} />
      </button>
    </form>
  );
}
