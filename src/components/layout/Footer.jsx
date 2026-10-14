import { HiPhone } from "react-icons/hi2";

import company from "@/constants/company";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-3 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-[#28352E]">{company.name} · {company.branch}</p>
        </div>
        <a
          href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center gap-2 font-semibold text-green-800 transition hover:text-green-950 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
        >
          <HiPhone aria-hidden="true" />
          {company.phone}
        </a>
        <p>© {new Date().getFullYear()} Yusay Credit &amp; Finance Corporation</p>
      </div>
    </footer>
  );
}
