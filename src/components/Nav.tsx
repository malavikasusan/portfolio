"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/info", label: "Info" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <nav
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "var(--space-6) var(--space-6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--color-text)",
          }}
        >
          Portfolio
        </Link>

        {/* Nav links */}
        <ul
          style={{
            display: "flex",
            gap: "var(--space-8)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontSize: "var(--text-sm)",
                    color: active
                      ? "var(--color-text)"
                      : "var(--color-muted)",
                    fontWeight: active ? 500 : 400,
                    transition: `color var(--dur-fast) var(--ease-out)`,
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
