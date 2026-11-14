import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search, Check, Plus } from 'lucide-react';

function normalizeText(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function SearchableSelect({
  id,
  ariaLabel,
  value,
  onChange,
  options = [],
  extraOption = null,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  searchable = true,
  disabled = false,
  invalid = false,
  triggerRef = null,
  compact = false,
  align = 'left'
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const internalTriggerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);
  const listboxId = useId();
  const btnRef = triggerRef || internalTriggerRef;

  const normalizedOptions = useMemo(
    () =>
      options.map((opt) =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
      ),
    [options]
  );

  const filteredOptions = useMemo(() => {
    const q = normalizeText(query.trim());
    if (!q) return normalizedOptions;
    return normalizedOptions.filter((opt) =>
      normalizeText(opt.label).includes(q)
    );
  }, [normalizedOptions, query]);

  const allDisplayOptions = useMemo(
    () => (extraOption ? [...filteredOptions, { ...extraOption, isExtra: true }] : filteredOptions),
    [filteredOptions, extraOption]
  );

  const selectedOption = useMemo(() => {
    if (!value) return null;
    if (extraOption && extraOption.value === value) return extraOption;
    return normalizedOptions.find((opt) => opt.value === value) || { value, label: value };
  }, [value, normalizedOptions, extraOption]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(pointer: fine)').matches;

    if (searchable && isFinePointer) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus({ preventScroll: true });
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    const activeItem = listRef.current?.querySelector('[data-active="true"]');
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const openDropdown = () => {
    if (disabled) return;
    setQuery('');
    const baseOptions = extraOption
      ? [...normalizedOptions, { ...extraOption, isExtra: true }]
      : normalizedOptions;
    const currentIdx = baseOptions.findIndex((o) => o.value === value);
    setActiveIndex(currentIdx >= 0 ? currentIdx : 0);
    setOpen(true);
  };

  const handleSelect = (optValue) => {
    onChange(optValue);
    setOpen(false);
    setQuery('');
    btnRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === 'Tab') {
      setOpen(false);
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus({ preventScroll: true });
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        allDisplayOptions.length ? (prev + 1) % allDisplayOptions.length : 0
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        allDisplayOptions.length
          ? (prev - 1 + allDisplayOptions.length) % allDisplayOptions.length
          : 0
      );
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const target = allDisplayOptions[activeIndex];
      if (target) {
        handleSelect(target.value);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative ${open ? 'z-50' : 'z-0'}`}>
      <button
        id={id}
        ref={btnRef}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-2 text-left rounded-xl border outline-none transition-all cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed ${
          compact ? 'pl-3 pr-2.5 py-3' : 'pl-4 pr-3.5 py-3'
        } ${
          open
            ? 'bg-white border-[#21699B] ring-3 ring-[#21699B]/15'
            : invalid
            ? 'bg-rose-50/40 border-rose-400 ring-3 ring-rose-400/15'
            : 'border-slate-300/90 bg-[#FAF9F6] hover:bg-white'
        }`}
      >
        <span
          className={`truncate text-base sm:text-sm ${
            selectedOption ? 'text-slate-900 font-semibold' : 'text-slate-500 font-normal'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#21699B]' : 'text-slate-400'
          }`}
        />
      </button>

      {open && (
        <div
          onKeyDown={handleKeyDown}
          className={`animate-panel-in absolute top-[calc(100%+6px)] z-50 min-w-[215px] rounded-2xl bg-white border border-stone-200/95 shadow-[0_22px_50px_-12px_rgba(15,23,42,0.25)] overflow-hidden ${
            align === 'right' ? 'right-0 left-auto sm:left-0' : 'left-0 right-0'
          }`}
        >
          {searchable && (
            <div className="p-2 border-b border-stone-100 bg-[#FAF9F6]">
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className="w-full pl-8 pr-3 py-2 text-base sm:text-xs rounded-xl bg-white border border-stone-200/90 focus:border-[#21699B] focus:ring-2 focus:ring-[#21699B]/15 outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            className="max-h-56 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5 bg-white"
          >
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2.5 text-xs text-slate-500 text-center">
                No encontramos coincidencias
              </li>
            )}

            {allDisplayOptions.map((opt, idx) => {
              const isSelected = value === opt.value;
              const isHighlighted = activeIndex === idx;

              return (
                <li key={opt.value} role="option" aria-selected={isSelected} data-active={isHighlighted}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                      opt.isExtra
                        ? 'mt-1 border-t border-stone-100 pt-2.5 font-semibold text-[#21699B] hover:bg-[#21699B]/8'
                        : isSelected
                        ? 'bg-[#21699B]/10 text-[#0F172A] font-semibold'
                        : isHighlighted
                        ? 'bg-[#F5F2EB] text-[#0F172A]'
                        : 'text-slate-700 hover:bg-[#F5F2EB]/80'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {opt.isExtra && <Plus className="w-3.5 h-3.5 shrink-0" />}
                      <span className="truncate">{opt.label}</span>
                    </span>
                    {isSelected && !opt.isExtra && (
                      <Check className="w-4 h-4 text-[#21699B] shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
