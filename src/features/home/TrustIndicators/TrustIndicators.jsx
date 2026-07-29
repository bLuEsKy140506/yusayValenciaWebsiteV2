import trustData from "./trustData";
import TrustCard from "./TrustCard";

export default function TrustIndicators() {
  return (
    <section className="bg-[#F8F9FA] py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="font-semibold text-green-700">
            WHY CHOOSE YCFC
          </span>

          <h2 className="mt-3 text-4xl font-black text-[#28352E]">
            Trusted by Generations
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            For more than six decades, Yusay Credit and
            Finance Corporation has helped individuals
            and families achieve their financial goals
            through reliable and personalized lending.
          </p>

        </div>

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {trustData.map((item) => (
            <TrustCard
              key={item.label}
              {...item}
            />
          ))}
        </div>

      </div>

    </section>
  );
}