export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-[#28352E] text-white hover:opacity-90",

    secondary:
      "bg-[#F6E84A] text-[#28352E] hover:opacity-90",

    danger:
      "bg-[#E53935] text-white hover:opacity-90",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}