export function NeonBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-fuchsia-600/15 blur-[100px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
}
