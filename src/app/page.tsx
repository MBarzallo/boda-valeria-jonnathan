"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

import { db } from "../../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      once: true,
      offset: 200,
    });
  }, []);
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
    <div className="animate-fade">
      <section className="text-center py-60 px-4 text-white">
        <p className="uppercase tracking-wider text-sm">Nos vamos a casar</p>
        <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-2">
          Valeria & Jonnathan{" "}
        </h1>
        <p className="mt-2 text-lg">
          Sábado, 10 de mayo de 2025
          <br />
          Cuenca, Ecuador
        </p>
      </section>

      <section
        id="nosotros"
        className="bg-gray-100 py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12"
      >
        <div
          className="md:w-1/2 text-center md:text-end "
          data-aos="fade-right"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            El inicio de este nuevo capítulo
            <br /> juntos como esposos
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            Hoy nos encontramos de nuevo, como si las estrellas y el destino
            <br />
            nos hubieran guiado a este momento.
          </p>
        </div>

        <div className="md:w-2/5 overflow-hidden rounded-xl shadow-lg animate-[fadeIn_1.5s_ease-in-out_0.3s]">
          <img
            src="/static/anillo.jpg"
            alt="Anillo"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section id="viaje" className="py-16 px-4 md:px-20 bg-white">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-5xl mb-6 font-serif">Ceremonia y recepción</h2>

          <div className="grid md:grid-cols-2 gap-6 items-center w-full max-w-5xl">
            <div
              className="overflow-hidden rounded-lg shadow-lg"
              data-aos="fade-right"
            >
              <GoogleMapsEmbed
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                height={400}
                width="100%"
                mode="place"
                q="Lago+Molino"
              />
            </div>

            <div className="text-left" data-aos="fade-left">
              <p className="text-3xl font-semibold mb-2">Lago Molino</p>
              <p className="text-md text-gray-600">
                Dirección: Carr. Panamericana km 9, Cuenca
                <br />
                Hora: 12h00
                <br />
                <a
                  href="https://maps.app.goo.gl/ZjH9oyD39NYdVFpm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline mt-2 inline-block"
                >
                  Ver en Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-60 bg-gray-50 px-4 " data-aos="zoom-in">
        <blockquote className="text-center italic text-7xl max-w-xl mx-auto">
          &quot;El amor no mira con los ojos, sino con el alma.&quot;
          <br />
          <span className="block mt-2 text-2xl">— William Shakespeare</span>
        </blockquote>
      </section>
      <section id="confirmacion" className="min-h-screen px-6 md:px-20 flex flex-col-reverse md:flex-row gap-8 items-center bg-gray-200 py-10">
        <div className="grid grid-cols-8 grid-rows-6 gap-4 w-full h-auto md:h-[450px]">
          <img
            src="/static/risas.jpg"
            alt="Risas"
            className="col-span-4 row-span-3 object-cover rounded-2xl shadow-sm"
            data-aos="fade-right"
          />
          <img
            src="/static/abrazito.jpg"
            alt="Abrazito"
            className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
            data-aos="fade-down"
          />
          <img
            src="/static/afuera.webp"
            alt="Fuera"
            className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
            data-aos="fade-down"
          />
          <img
            src="/static/montana.jpg"
            alt="Montana"
            className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
            data-aos="fade-up"
          />
          <img
            src="/static/escaleras.jpg"
            alt="Escaleras"
            className="col-span-2 row-span-3 object-cover rounded-2xl shadow-sm"
            data-aos="fade-up"
          />
          <img
            src="/static/fogata.webp"
            alt="Fogata"
            className="col-span-4 row-span-3 object-cover rounded-2xl shadow-sm"
            data-aos="fade-left"
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
                  style={{ fontFamily: "var(--font-great-vibes)" }}
                >
                  <h2 className="text-5xl text-amber-600 mb-4 leading-tight">
                    ¡Gracias!
                  </h2>
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
      </section>
    </div>
  );
}
