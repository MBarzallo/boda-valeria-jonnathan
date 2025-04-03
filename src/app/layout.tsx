import type { Metadata } from "next";
import { Cookie, Great_Vibes } from "next/font/google";
import "./globals.css";
import NavLink from "./components/NavLink";
import Link from "next/link";
import MobileMenu from "./components/MobileMenu";

const cookie = Cookie({
  weight: "400",
  variable: "--font-cookie",
  subsets: ["latin"],
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Jonnathan & Valeria",
  description: "Hecha por Mateo Barzallo",
};
// === app/layout.tsx ===
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>J-V — Boda</title>
      </head>
      <body
        className={`${cookie.variable} ${greatVibes.variable} bg-white text-black bg-[url(/static/reloj.jpg)] bg-no-repeat  min-h-screen animate-[fadeIn_1s_ease-in-out_forwards]`}
      >
        <header className="flex justify-between p-6 items-center text-sm uppercase text-white">
          <Link href="/" passHref>
            <div
              className="font-extralight text-4xl text-[#D4AF37] cursor-pointer"
              style={{ fontFamily: "var(--font-cookie)" }}
            >
              V&J
            </div>
          </Link>
          <nav className="space-x-6 hidden md:block">
            <NavLink href="#nosotros" label="Nosotros" />
            <NavLink href="#viaje" label="Ceremonia y recepción" />
            <a href="/confirmar">Confirmar</a>
          </nav>

          {/* NAV MOBILE */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white  text-gray-700 py-10 text-sm px-20">
          <p className="text-xl mb-2 font-semibold text-gray-800">
            Contáctanos
          </p>

          <div className="flex flex-col space-y-1">
            <p className="text-xl">
              Valeria:{" "}
              <a
                href="https://wa.me/593984847279"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline"
              >
                +593 98 484 7279
              </a>
            </p>
            <p className="text-xl">
              Jonnathan:{" "}
              <a
                href="https://wa.me/593939799384"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline"
              >
                +593 93 979 9384
              </a>
            </p>
          </div>

          <p className="mt-6 text-xs text-gray-400 flex justify-center">
            © {new Date().getFullYear()} Creado por Mateo Barzallo
          </p>
        </footer>
      </body>
    </html>
  );
}
