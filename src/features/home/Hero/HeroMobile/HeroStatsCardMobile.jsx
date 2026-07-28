import colors from "@/constants/colors";

export default function HeroStatsCardMobile() {
  return (
    <div
      className="
        w-full
        rounded-3xl
        px-6
        py-6
        shadow-xl
      "
      style={{
        backgroundColor: colors.primary,
      }}
    >
      <h2 className="text-center text-5xl font-black leading-none text-white">
        65+
      </h2>

      <p className="mt-1 text-center text-sm font-semibold text-white">
        Years of Trusted Service
      </p>

      <div className="my-4 h-px bg-white/20" />

      <div className="space-y-2 text-center text-xs text-white/95">
        <p>Established 1960</p>
        <p>Valencia Branch since 2004</p>
      </div>
    </div>
  );
}