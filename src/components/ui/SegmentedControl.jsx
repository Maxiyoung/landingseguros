import { useRef } from 'react';

const VARIANT_STYLES = {
  card: {
    container: 'p-1.5 bg-[#F5F2EB] rounded-2xl border border-stone-200/90',
    indicator:
      'top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-[#0F172A] shadow-[0_6px_16px_-4px_rgba(15,23,42,0.38)] duration-300',
    buttonBase: 'py-3 px-3 rounded-xl text-sm font-bold',
    activeText: 'text-white',
    inactiveText: 'text-slate-600 hover:text-slate-900',
    activeIcon: 'text-[#6DA6C9]',
    inactiveIcon: 'text-slate-500'
  },
  pill: {
    container:
      'p-1 bg-white rounded-full border border-stone-300/80 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)]',
    indicator: 'top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#0F172A] shadow-sm duration-300',
    buttonBase: 'px-4 py-2 rounded-full text-xs sm:text-sm font-bold',
    activeText: 'text-white',
    inactiveText: 'text-slate-600 hover:text-slate-900',
    activeIcon: 'text-[#6DA6C9]',
    inactiveIcon: 'text-slate-500'
  },
  pillCream: {
    container: 'p-1 bg-[#F5F2EB] rounded-full border border-stone-200/90',
    indicator: 'top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#0F172A] shadow-xs duration-300',
    buttonBase: 'px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold',
    activeText: 'text-white',
    inactiveText: 'text-slate-700 hover:text-slate-900',
    activeIcon: 'text-[#6DA6C9]',
    inactiveIcon: 'text-[#6DA6C9]'
  },
  mini: {
    container: 'p-0.5 bg-[#F5F2EB] rounded-full border border-slate-300/90',
    indicator: 'top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-[#21699B] shadow-xs duration-250',
    buttonBase: 'px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap',
    activeText: 'text-white',
    inactiveText: 'text-slate-600 hover:text-slate-900',
    activeIcon: 'text-white',
    inactiveIcon: 'text-slate-500'
  }
};

/**
 * Control segmentado reutilizable (2 opciones) con indicador deslizante y soporte de teclado.
 */
export default function SegmentedControl({
  options,
  value,
  onChange,
  variant = 'pill',
  mode = 'tablist',
  ariaLabel,
  ariaLabelledBy,
  className = '',
  buttonClassName = ''
}) {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.pill;
  const buttonRefs = useRef([]);
  const selectedIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value)
  );
  const isTablist = mode === 'tablist';

  const handleKeyDown = (e, idx) => {
    let nextIdx = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (idx + 1) % options.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (idx - 1 + options.length) % options.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = options.length - 1;
    }

    if (nextIdx !== null) {
      e.preventDefault();
      const target = options[nextIdx];
      onChange(target.value);
      buttonRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div
      role={isTablist ? 'tablist' : 'radiogroup'}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`relative inline-grid grid-cols-2 ${styles.container} ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className={`absolute transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] ${styles.indicator} ${
          selectedIndex === 1 ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {options.map((opt, idx) => {
        const isSelected = opt.value === value;
        const Icon = opt.icon;
        const roleProps = isTablist
          ? {
              role: 'tab',
              'aria-selected': isSelected,
              'aria-controls': opt.controls,
              tabIndex: isSelected ? 0 : -1
            }
          : {
              role: 'radio',
              'aria-checked': isSelected,
              tabIndex: isSelected ? 0 : -1
            };

        return (
          <button
            key={opt.value}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            id={opt.id}
            type="button"
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 transition-colors cursor-pointer ${
              styles.buttonBase
            } ${isSelected ? styles.activeText : styles.inactiveText} ${buttonClassName}`.trim()}
            {...roleProps}
          >
            {Icon && (
              <Icon
                aria-hidden="true"
                className={`w-4 h-4 shrink-0 transition-colors ${
                  opt.iconClassName || ''
                } ${isSelected ? styles.activeIcon : styles.inactiveIcon}`.trim()}
              />
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
