import { HiArrowRight, HiCheckCircle } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import colors from "@/constants/colors";

export default function FinancingCard({
  image,
  title,
  description,
  features,
  buttonText,
}) {
  return (
    <article
      className="
        group
        mx-auto
        flex
        h-full
        w-full
        max-w-[460px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* Poster */}

      <div className="p-3">

  <div
    className="
      flex
      h-64
      items-center
      justify-center
      overflow-hidden
      rounded-2xl
      border
      border-gray-100
      bg-white
      p-2
    "
  >
    <img
      src={image}
      alt={title}
      className="
        max-h-full
        max-w-full
        object-contain
        transition-transform
        duration-500
        group-hover:scale-[1.02]
      "
    />
  </div>

</div>

      {/* Content */}

      <div className="flex flex-1 flex-col px-5 pb-5">

        <h3
          className="text-xl font-bold lg:text-2xl"
          style={{
            color: colors.primary,
          }}
        >
          {title}
        </h3>

        <p className="mt-2 text-[15px] leading-6 text-gray-600">
          {description}
        </p>

        <ul className="mt-4 space-y-2">

          {features.map((feature) => (

            <li
              key={feature}
              className="flex items-center gap-2"
            >
              <HiCheckCircle
                className="text-base shrink-0"
                style={{
                  color: colors.primary,
                }}
              />

              <span className="text-sm text-gray-700">
                {feature}
              </span>

            </li>

          ))}

        </ul>

        <div className="mt-auto pt-5">

          <Button
            variant="secondary"
            className="flex w-full items-center justify-center gap-2"
          >
            {buttonText}

            <HiArrowRight className="text-base" />
          </Button>

        </div>

      </div>
    </article>
  );
}