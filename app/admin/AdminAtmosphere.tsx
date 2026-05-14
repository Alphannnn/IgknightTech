/**
 * Shared atmospheric backdrop for admin pages — three slow-drifting blobs in
 * brand colors. Fixed-position so it sits behind the main content of the shell.
 * Server component — no client behavior, just decorative.
 */
export default function AdminAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 right-0 w-[640px] h-[640px] rounded-full opacity-[0.10] blur-3xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #2783ED 0%, transparent 70%)",
          animation: "admin-blob-drift-1 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-[260px] w-[520px] h-[520px] rounded-full opacity-[0.10] blur-3xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          animation: "admin-blob-drift-2 22s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="fixed top-1/3 right-1/3 w-[380px] h-[380px] rounded-full opacity-[0.06] blur-3xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
          animation: "admin-blob-drift-1 26s ease-in-out 4s infinite",
        }}
      />
    </>
  );
}
