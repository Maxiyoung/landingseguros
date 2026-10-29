export default function BrandLogo({ size = 'normal', darkBg = false }) {
  const isLarge = size === 'large';
  const mainColor = darkBg ? 'text-white' : 'text-[#141414]';
  const subColor = darkBg ? 'text-slate-200' : 'text-[#141414]';

  return (
    <a href="#" className="inline-flex flex-col select-none group">
      <div className={`${isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[28px]'} font-serif-brand font-bold leading-none tracking-tight flex`}>
        <span className={mainColor}>SOMOS</span>
        <span className="text-[#6DA6C9]">MAS</span>
      </div>
      <div 
        className={`w-full flex justify-between font-serif-brand font-bold leading-none mt-1 ${
          isLarge ? 'text-sm sm:text-base' : 'text-xs sm:text-[13px]'
        } ${subColor}`}
        aria-label="seguros"
      >
        {'seguros'.split('').map((letra, index) => (
          <span key={index}>{letra}</span>
        ))}
      </div>
    </a>
  );
}
