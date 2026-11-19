export function getFieldInputClass({ invalid = false, accentFocus = false } = {}) {
  const base =
    'w-full px-4 py-3 rounded-xl border focus:ring-3 focus:ring-[#21699B]/15 outline-none transition-all text-base sm:text-sm text-slate-900 placeholder:text-slate-500';

  if (invalid) {
    return `${base} bg-white border-rose-400 ring-3 ring-rose-400/15`;
  }

  if (accentFocus) {
    return `${base} bg-white border-[#21699B]`;
  }

  return `${base} bg-[#FAF9F6] hover:bg-white focus:bg-white focus:border-[#21699B] border-slate-300/90`;
}
