"use client";

import {
  useState,
  useRef,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from "react";
import Image from "next/image";
import {
  ImagePlus,
  Loader2,
  Trash2,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const UPLOAD_URL = "/api/admin/upload";

// Match the server-side enforcement in /api/admin/upload/route.ts.
const ALLOWED_MIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

type UploadState =
  | { kind: "idle" }
  | { kind: "uploading"; progress: number }
  | { kind: "error"; message: string }
  | { kind: "success" };

type UploadResponse =
  | { ok: true; id: string; url: string; mime: string; size: number }
  | { ok: false; reason: string; message: string };

/**
 * Wraps an XHR upload in a Promise so we can `await` it AND surface
 * upload-progress events to the UI. fetch() can't do progress yet.
 */
function xhrUpload(
  url: string,
  formData: FormData,
  onProgress: (percent: number) => void,
): Promise<UploadResponse> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      let body: UploadResponse;
      try {
        body = JSON.parse(xhr.responseText) as UploadResponse;
      } catch {
        body = {
          ok: false,
          reason: "bad_response",
          message: `Upload service returned status ${xhr.status} but no JSON body.`,
        };
      }
      resolve(body);
    });

    xhr.addEventListener("error", () => {
      resolve({
        ok: false,
        reason: "network",
        message: "Network error while uploading. Check your connection and retry.",
      });
    });

    xhr.addEventListener("abort", () => {
      resolve({
        ok: false,
        reason: "aborted",
        message: "Upload cancelled.",
      });
    });

    xhr.open("POST", url);
    xhr.send(formData);
  });
}

/**
 * Featured-image control for the blog form. Uploads via plain FormData to
 * `/api/admin/upload`, which stores bytes in Postgres. Drag-drop or click,
 * live progress, preview, remove, and a URL-paste fallback for hosted images.
 *
 * Writes the final URL to a hidden input named `image` so the existing
 * `savePostAction` picks it up unchanged.
 */
export default function FeaturedImageUpload({
  initial,
}: {
  initial: string;
  /** kept for backwards-compat with BlogForm — no longer needed but harmless */
  slug?: string;
}) {
  const [value, setValue] = useState(initial);
  const [state, setState] = useState<UploadState>({ kind: "idle" });
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_MIME.includes(file.type)) {
      return `Unsupported file type (${file.type || "unknown"}). Use JPG, PNG, WebP, AVIF, or GIF.`;
    }
    if (file.size > MAX_BYTES) {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      return `File is ${mb} MB — max is 4 MB.`;
    }
    if (file.size === 0) {
      return "That file is empty.";
    }
    return null;
  };

  const handleUpload = useCallback(async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setState({ kind: "error", message: error });
      return;
    }

    setState({ kind: "uploading", progress: 0 });

    const fd = new FormData();
    fd.append("file", file);

    const result = await xhrUpload(UPLOAD_URL, fd, (percent) => {
      setState({ kind: "uploading", progress: percent });
    });

    if (!result.ok) {
      setState({ kind: "error", message: result.message });
      return;
    }

    setValue(result.url);
    setState({ kind: "success" });
    // Auto-clear the success badge — leave the preview in place.
    setTimeout(() => setState({ kind: "idle" }), 2500);
  }, []);

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleUpload(file);
    // Reset so the same file can be re-selected later.
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleUpload(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragOver) setDragOver(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    setDragOver(false);
  };

  const applyUrl = () => {
    const trimmed = urlDraft.trim();
    if (!trimmed) return;
    setValue(trimmed);
    setUrlDraft("");
    setShowUrlInput(false);
    setState({ kind: "idle" });
  };

  const removeImage = () => {
    setValue("");
    setState({ kind: "idle" });
  };

  return (
    <div className="space-y-3">
      {/* Hidden input that the savePostAction reads. */}
      <input type="hidden" name="image" value={value} />

      {value ? (
        /* ─── Preview state ─── */
        <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 group">
          <div className="relative w-full aspect-[16/9] bg-slate-100">
            <Image
              src={value}
              alt="Featured cover preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              // For data-URLs or arbitrary remote hosts not in remotePatterns,
              // skip the Image Optimization pipeline so the preview never breaks.
              unoptimized={
                !value.startsWith("/") && !value.startsWith("https://")
              }
              onError={() => {
                setState({
                  kind: "error",
                  message: "Couldn't load that image. Check the URL.",
                });
              }}
            />
          </div>

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 pointer-events-none">
            <div className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md font-mono">
              {value.length > 48 ? value.slice(0, 48) + "…" : value}
            </div>
            <div className="pointer-events-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-md transition-colors"
              >
                <ImagePlus className="w-3.5 h-3.5" strokeWidth={2} />
                Replace
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="inline-flex items-center justify-center w-8 h-8 text-white bg-red-500/90 hover:bg-red-600 rounded-md transition-colors"
                title="Remove image"
                aria-label="Remove image"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Upload-in-progress overlay (centered) */}
          {state.kind === "uploading" && (
            <UploadingOverlay progress={state.progress} />
          )}
        </div>
      ) : (
        /* ─── Empty / drag-drop state ─── */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`relative aspect-[16/9] rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            dragOver
              ? "border-blue-400 bg-blue-50/70 scale-[1.01]"
              : "border-slate-300 bg-slate-50/60 hover:border-slate-400 hover:bg-slate-50"
          } ${state.kind === "uploading" ? "pointer-events-none" : ""}`}
        >
          {state.kind === "uploading" ? (
            <UploadingOverlay progress={state.progress} inline />
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 shadow-sm">
                <ImagePlus
                  className="w-6 h-6 text-slate-500"
                  strokeWidth={1.8}
                />
              </div>
              <p className="text-slate-900 text-sm font-semibold">
                {dragOver ? "Drop to upload" : "Drag & drop or click to upload"}
              </p>
              <p className="text-slate-500 text-xs mt-1">
                JPG, PNG, WebP, AVIF, GIF · up to 4 MB
              </p>
              <p className="text-slate-400 text-[11px] mt-2">
                Recommended 1600×900 or larger (16:9)
              </p>
            </>
          )}
        </div>
      )}

      {/* Hidden native file input — controlled by drop zone + buttons. */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_MIME.join(",")}
        onChange={onFileSelect}
        className="hidden"
      />

      {/* ─── Status messages ─── */}
      {state.kind === "error" && (
        <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2} />
          <span>{state.message}</span>
        </div>
      )}
      {state.kind === "success" && (
        <div className="flex items-start gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2} />
          <span>Upload complete.</span>
        </div>
      )}

      {/* ─── URL paste fallback ─── */}
      <div>
        {showUrlInput ? (
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder="https://example.com/cover.jpg or /local-path.jpg"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyUrl();
                }
              }}
            />
            <button
              type="button"
              onClick={applyUrl}
              className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              Use URL
            </button>
            <button
              type="button"
              onClick={() => {
                setShowUrlInput(false);
                setUrlDraft("");
              }}
              className="text-slate-500 hover:text-slate-900 text-sm font-semibold px-2 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <LinkIcon className="w-3 h-3" strokeWidth={2} />
            Or paste an image URL
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-component: uploading overlay with progress bar ─── */

function UploadingOverlay({
  progress,
  inline,
}: {
  progress: number;
  inline?: boolean;
}) {
  const wrapper = inline
    ? "flex flex-col items-center"
    : "absolute inset-0 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center";

  return (
    <div className={wrapper}>
      <Loader2 className="w-8 h-8 text-slate-700 animate-spin" strokeWidth={1.8} />
      <p className="mt-3 text-slate-900 text-sm font-semibold">
        Uploading… {progress}%
      </p>
      <div className="mt-2 w-44 h-1 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-slate-900 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
