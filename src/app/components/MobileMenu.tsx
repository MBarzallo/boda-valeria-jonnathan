// src/app/components/MobileMenu.tsx
"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-white"
        aria-label="Abrir menú"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-end">
          <Dialog.Panel className="bg-white/80 w-64 p-6 space-y-4 uppercase">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menú</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <Link href="/#nosotros" onClick={() => setOpen(false)} className="block text-gray-800 hover:underline">
              Nosotros
            </Link>
            <Link href="/#viaje" onClick={() => setOpen(false)} className="block text-gray-800 hover:underline">
              Ceremonia y recepción
            </Link>
            <Link href="/confirmar" onClick={() => setOpen(false)} className="block text-gray-800 hover:underline">
              Confirmar
            </Link>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
