import colors from "@/constants/colors";

const variants = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
    border: "none",
  },

  secondary: {
    backgroundColor: colors.white,
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
  },

  accent: {
    backgroundColor: colors.secondary,
    color: colors.primary,
    border: "none",
  },
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      style={variants[variant]}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        active:translate-y-0
        ${className}
      `}
    >
      {children}
    </button>
  );
}