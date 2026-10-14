import colors from "@/constants/colors";

export default function TrustPoint({
  icon: Icon,
  value,
  title,
  description,
}) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          transition-all
          duration-300
          group-hover:scale-105
        "
        style={{
          backgroundColor: `${colors.primary}12`,
        }}
      >
        <Icon
          className="text-2xl"
          style={{
            color: colors.primary,
          }}
        />
      </div>

      {/* Value */}

      <p
        className="mt-5 text-2xl font-black tracking-tight"
        style={{
          color: colors.primary,
        }}
      >
        {value}
      </p>

      {/* Title */}

      <h3 className="mt-1 text-lg font-bold text-[#28352E]">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {description}
      </p>
    </div>
  );
}