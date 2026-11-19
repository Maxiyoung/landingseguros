export default function BrandLogo({ size = 'normal', darkBg = false }) {
  const isLarge = size === 'large';
  const mainColor = darkBg ? 'text-white' : 'text-[#141414]';
  const subColor = darkBg ? 'text-slate-200' : 'text-[#141414]';

  return (
    <a
      href="#top"
      aria-label="SOMOSMAS Seguros — Ir al inicio"
      className="inline-flex flex-col select-none group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21699B] rounded-md"
    >
      <span className="sr-only">SOMOSMAS Seguros</span>
      <div
        aria-hidden="true"
        className={`${
          isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[28px]'
        } font-serif-brand font-bold leading-none tracking-tight flex`}
      >
        <span className={mainColor}>SOMOS</span>
        <span className="text-[#6DA6C9] transition-colors duration-200 group-hover:text-[#5B94B7]">
          MAS
        </span>
      </div>
      <div
        aria-hidden="true"
        className={`w-full flex justify-between font-serif-brand font-bold leading-none mt-1 ${
          isLarge ? 'text-sm sm:text-base' : 'text-xs sm:text-[13px]'
        } ${subColor}`}
      >
        {'seguros'.split('').map((letra, index) => (
          <span key={index}>{letra}</span>
        ))}
      </div>
    </a>
  );
}
