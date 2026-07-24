import colors from "@/constants/colors";

export default function HeroStats() {
  return (
    <div className="relative">

      <div
        className="mx-auto w-full max-w-md rounded-3xl p-10 shadow-2xl"
        style={{
          backgroundColor: colors.primary,
        }}
      >
        <h2 className="text-center text-7xl font-black text-white">
          65+
        </h2>

        <p className="mt-2 text-center text-2xl font-bold text-white">
          Years of Trusted Service
        </p>

        <div className="my-8 h-px bg-white/30" />

        <div className="space-y-4 text-white">

          <div className="flex justify-between">
            <span>Established</span>
            <span className="font-semibold">1959</span>
          </div>

          <div className="flex justify-between">
            <span>Valencia Branch</span>
            <span className="font-semibold">2004</span>
          </div>

          <div className="flex justify-between">
            <span>Interest Rate</span>
            <span className="font-semibold">1% / Month</span>
          </div>

        </div>
      </div>

    </div>
  );
}