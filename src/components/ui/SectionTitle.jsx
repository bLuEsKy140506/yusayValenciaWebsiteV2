import colors from "@/constants/colors";

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}) {
  const alignment = {
    left: "text-left",
    center: "text-center",
  };

  return (
    <div className={`mb-12 ${alignment[align]}`}>
      {subtitle && (
        <p
          className="mb-2 text-sm font-semibold uppercase tracking-[0.3em]"
          style={{ color: colors.secondary }}
        >
          {subtitle}
        </p>
      )}

      <h2
        className="text-3xl font-bold lg:text-5xl"
        style={{ color: colors.primary }}
      >
        {title}
      </h2>
    </div>
  );
}