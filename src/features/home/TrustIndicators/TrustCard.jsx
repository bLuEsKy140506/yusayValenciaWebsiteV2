import colors from "@/constants/colors";

export default function TrustCard({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        bg-white
        p-8
        text-center
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      <div
        className="
          mx-auto
          mb-5
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
        "
        style={{
          backgroundColor: `${colors.secondary}`,
        }}
      >
        <Icon
          className="text-3xl"
          style={{
            color: colors.primary,
          }}
        />
      </div>

      <h3
        className="text-3xl font-black"
        style={{
          color: colors.primary,
        }}
      >
        {value}
      </h3>

      <p className="mt-2 text-gray-600">
        {label}
      </p>
    </div>
  );
}