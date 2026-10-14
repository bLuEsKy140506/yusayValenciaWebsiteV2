import TrustPoint from "./TrustPoint";
import whyChooseData from "./whyChooseData";

import colors from "@/constants/colors";

export default function WhyChooseYCFC() {
  return (
    <section className="bg-[#F8FAF9] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p
            className="
              mb-3
              text-sm
              font-bold
              uppercase
              tracking-[0.35em]
            "
            style={{
              color: colors.primary,
            }}
          >
            WHY CHOOSE YCFC
          </p>

          <h2 className="text-4xl font-extrabold tracking-tight text-[#28352E] lg:text-5xl">
            Experience You Can Trust.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            For generations, we've been committed to providing
            dependable financing and personalized service to
            the communities we serve.
          </p>

        </div>

        {/* Trust Points */}

        <div
          className="
            mx-auto
            mt-12
            grid
            max-w-6xl
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {whyChooseData.map((item) => (
            <TrustPoint
              key={item.title}
              {...item}
            />
          ))}
        </div>

        {/* Bottom Statement */}

        <div className="mx-auto mt-12 max-w-3xl text-center">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-gray-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              shadow-sm
            "
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: colors.accent,
              }}
            />

            Trusted service. Personal attention. Financial solutions.
          </div>

        </div>

      </div>
    </section>
  );
}