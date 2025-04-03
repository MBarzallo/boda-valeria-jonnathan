"use client";
import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

import { db } from "../../../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Confirmar() {
  const router = useRouter();

  const [nombrePrincipal, setNombrePrincipal] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [nombresAcompanantes, setNombresAcompanantes] = useState([""]);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "asistencias"), {
        nombrePrincipal,
        cantidad,
        acompanantes: nombresAcompanantes,
        fecha: Timestamp.now(),
      });

      setLoading(false);
      setEnviado(true);
      setNombrePrincipal("");
      setCantidad(1);
      setNombresAcompanantes([""]);
    } catch (error) {
      setLoading(false);
      console.error("Error al guardar la asistencia:", error);
      alert("Ocurrió un error al confirmar. Intenta de nuevo.");
    }
  };

  const handleCantidadChange = (value: number) => {
    setCantidad(value);
    const nuevos = Array.from(
      { length: value - 1 },
      (_, i) => nombresAcompanantes[i] || ""
    );
    setNombresAcompanantes(nuevos);
  };

  const handleAcompananteChange = (i: number, value: string) => {
    const nuevos = [...nombresAcompanantes];
    nuevos[i] = value;
    setNombresAcompanantes(nuevos);
  };

  const cerrarModal = () => {
    setEnviado(false);
    
      router.push("/");
    
  };

  return (
    <div className="min-h-screen px-6 md:px-20 flex flex-col-reverse md:flex-row gap-8 items-center bg-white/10 backdrop-blur-md py-10">
      <div className="grid grid-cols-8 grid-rows-6 gap-4 w-full h-auto md:h-[450px]">
        <img
          src="/static/risas.jpg"
          alt="Risas"
          className="col-span-4 row-span-3 object-cover rounded-2xl shadow-sm"
        />
        <img
          src="/static/abrazito.jpg"
          alt="Abrazito"
          className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
        />
        <img
          src="/static/afuera.webp"
          alt="Fuera"
          className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
        />
        <img
          src="/static/montana.jpg"
          alt="Montana"
          className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
        />
        <img
          src="/static/escaleras.jpg"
          alt="Escaleras"
          className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
        />
        <img
          src="/static/fogata.webp"
          alt="Fogata"
          className="col-span-4 row-span-3 object-cover rounded-2xl shadow-sm"
        />
      </div>

      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-8 rounded-2xl shadow-md"
        >
          <h1 className="text-3xl font-serif text-center mb-6">
            Confirmar asistencia
          </h1>

          <input
            type="text"
            placeholder="Tu nombre completo"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={nombrePrincipal}
            onChange={(e) => setNombrePrincipal(e.target.value)}
            disabled={loading}
            required
          />

          <select
            value={cantidad}
            onChange={(e) => handleCantidadChange(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            disabled={loading}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num === 1 ? "Sólo yo" : `${num} personas`}
              </option>
            ))}
          </select>

          {cantidad > 1 && (
            <div className="space-y-2">
              {nombresAcompanantes.map((nombre, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Acompañante ${i + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  value={nombre}
                  onChange={(e) => handleAcompananteChange(i, e.target.value)}
                  disabled={loading}
                  required
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl transition-all disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Confirmar asistencia"}
          </button>
        </form>
      </div>

      {/* Modal elegante de confirmación */}
      <Transition appear show={enviado} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={cerrarModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md rounded-xl bg-white/70 p-6 backdrop-blur-2xl text-center transition-all`}
                style={{ fontFamily: 'var(--font-great-vibes)' }}
              >
                <h2 className="text-5xl text-amber-600 mb-4 leading-tight">¡Gracias!</h2>
                <p className="text-lg text-gray-700 font-sans">
                  Tu asistencia ha sido confirmada.
                </p>
                <p className="text-sm text-gray-500 font-sans mt-1">
                  ¡Nos hace muy felices compartir este día contigo!
                </p>
                <button
                  onClick={cerrarModal}
                  className="mt-8 bg-amber-500/50 hover:bg-amber-600 text-white py-2 px-8 rounded-full transition-all font-sans border border-amber-600"
                >
                  Cerrar
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
