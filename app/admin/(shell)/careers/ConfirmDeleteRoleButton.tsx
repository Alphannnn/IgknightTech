"use client";

import { Trash2 } from "lucide-react";
import { deleteRoleAction } from "./actions";

export default function ConfirmDeleteRoleButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <form
      action={deleteRoleAction}
      onSubmit={(e) => {
        if (!window.confirm(`Delete the "${label}" role? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Delete"
        aria-label="Delete role"
        className="group/btn w-8 h-8 rounded-md hover:bg-red-50 flex items-center justify-center transition-colors"
      >
        <Trash2 className="w-4 h-4 text-slate-500 group-hover/btn:text-red-600 transition-colors" strokeWidth={1.8} />
      </button>
    </form>
  );
}
