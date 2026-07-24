export default function Button({
  children,
  variant = "primary",
  ...props
}) {
  const styles = {
    primary:
      "bg-[#28352E] text-white hover:opacity-90",

    secondary:
      "bg-[#F6E84A] text-[#28352E] hover:opacity-90",

    danger:
      "bg-[#E53935] text-white hover:opacity-90",
  };

  return (
    <button
      className={`rounded-lg px-6 py-3 font-semibold transition ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}