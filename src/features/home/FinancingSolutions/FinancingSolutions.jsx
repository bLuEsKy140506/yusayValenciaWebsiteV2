import FinancingCard from "./FinancingCard";
import financingData from "./financingData";

import colors from "@/constants/colors";

export default function FinancingSolutions() {
  return (
    <section className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p
            className="mb-3 text-sm font-bold uppercase tracking-[0.35em]"
            style={{ color: colors.primary }}
          >
            OUR SERVICES
          </p>

          <h2 className="mb-5 text-4xl font-extrabold text-[#28352E] lg:text-5xl">
            Financing Solutions
          </h2>

          <p className="text-lg leading-8 text-gray-600">
            Helping pensioners and property owners achieve their
            financial goals through trusted, personalized, and
            affordable financing.
          </p>

        </div>

        {/* Cards */}

      <div
  className="
    mx-auto
    mt-12
    grid
    max-w-5xl
    gap-6
    md:grid-cols-2
    lg:gap-8
  "
>

          {financingData.map((loan) => (
            <FinancingCard
              key={loan.title}
              {...loan}
            />
          ))}

        </div>

      </div>
    </section>
  );
}