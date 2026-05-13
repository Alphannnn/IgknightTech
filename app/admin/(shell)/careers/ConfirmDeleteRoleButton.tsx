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
        className="group w-9 h-9 rounded-lg border border-slate-200 bg-white hover:border-red-300 hover:bg-red-50 flex items-center justify-center transition-all"
      >
        <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-600 transition-colors" />
      </button>
    </form>
  );
}
