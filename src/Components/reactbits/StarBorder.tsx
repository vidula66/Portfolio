

const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "#e50914", // Heist red glow
  speed = "4s",
  children,
  ...rest
}: any) => {
  return (
    <>
      <style>{`
        @keyframes star-movement-bottom {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(-100%, 0%); opacity: 0; }
        }
        @keyframes star-movement-top {
          0% { transform: translate(0%, 0%); opacity: 1; }
          100% { transform: translate(100%, 0%); opacity: 0; }
        }
        .animate-star-movement-bottom {
          animation: star-movement-bottom linear infinite;
        }
        .animate-star-movement-top {
          animation: star-movement-top linear infinite;
        }
      `}</style>
      <Component
        className={`relative inline-block py-[1px] overflow-hidden rounded-xl group cursor-pointer ${className}`}
        {...rest}
      >
        <div
          className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>
        <div
          className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed,
          }}
        ></div>
        <div className="relative z-1 text-white text-center rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-heist-red/20 px-8 py-3 transition duration-300 group-hover:border-heist-red group-hover:bg-[#1a1a1a]">
          {children}
        </div>
      </Component>
    </>
  );
};

export default StarBorder;
