"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition, Select } from "@headlessui/react";

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
  
  const [loading, setLoading] = useState(false);
  const [paso, setPaso] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(paso===0){
      setPaso(1);
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "asistencias"), {
        nombrePrincipal,
        cantidad,
        acompanantes: nombresAcompanantes,
        fecha: Timestamp.now(),
      });

      setLoading(false);
      setNombrePrincipal("");
      setCantidad(1);
      setNombresAcompanantes([""]);
      setPaso(2);
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
    setPaso(0);

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
        Con mucho amor les invitamos a celebrar el inicio de este nuevo capítulo
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

      <section id="viaje" className="py-20 px-4 md:px-20 bg-white">
  <div className="max-w-6xl mx-auto flex flex-col justify-center items-center text-center space-y-10">
    <h2 className="text-5xl font-serif text-gray-800">Ceremonia y recepción</h2>

    <div className="grid md:grid-cols-2 gap-10 items-center w-full bg-gray-50 shadow-xl rounded-3xl p-6 md:p-10 transition-all">
      {/* Mapa */}
      <div
        className="overflow-hidden rounded-xl shadow-md"
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

      {/* Detalles */}
      <div className="text-left space-y-4" data-aos="fade-left">
        <h3 className="text-4xl font-serif text-gray-800">Lago Molino</h3>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Dirección:</span> Carr. Panamericana km 9, Cuenca
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Hora:</span> 12h00
        </p>
        <p className="text-md text-gray-600">
          Te pedimos ser puntual para que no te pierdas ningún instante de este día tan especial que hemos preparado con tanto amor.
        </p>
        <a
          href="https://maps.app.goo.gl/ZjH9oyD39NYdVFpm8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-rose-600 hover:text-rose-800 font-semibold underline underline-offset-4 transition-all duration-200"
        >
          Ver en Google Maps
        </a>
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
      <section
        id="confirmacion"
        className="min-h-screen px-6 md:px-20 flex flex-col-reverse md:flex-row gap-8 items-center bg-gray-200 py-10"
      >
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
            
            <h1 className="text-5xl font-serif text-center mb-6" style={{ fontFamily: "var(--font-cookie)" }}>
              Confirmar asistencia
            </h1>

            {paso===0 ?(
              <p className="text-center bg-rose-100 text-rose-800 rounded-xl px-4 py-1  shadow-sm font-serif text-xs  leading-relaxed border border-rose-200">
              Esta confirmación es exclusivamente para las personas mencionadas en la invitación
              <br />
              Para una mejor experiencia para todos los presentes, hemos decidido celebrar este momento sin niños.
              <br />
              Deseamos que esta desición no les impida asistir a nuestra celebración.
  
            </p>
            ):(
              <>
              <input
              type="text"
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a53d3b] text-center"
              value={nombrePrincipal}
              onChange={(e) => setNombrePrincipal(e.target.value)}
              disabled={loading}
              required
            />

            <Select
              value={cantidad}
              onChange={(e) => handleCantidadChange(Number(e.target.value))}
              className={
                'uppercase block w-full  rounded-lg border-1  border-[#bf6e44] bg-[#bf6e44]/30 py-3 px-3 text-sm/6 text-[#bf6e44] focus:outline-none  '
              }
              disabled={loading}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num}   value={num} className="text-center">
                  {num === 1 ? "Solo yo" : `${num} personas`}
                </option>
              ))}
            </Select>

            {cantidad > 1 && (
              <div className="space-y-2">
                {nombresAcompanantes.map((nombre, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Acompañante ${i + 1}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a53d3b] text-center"
                    value={nombre}
                    onChange={(e) => handleAcompananteChange(i, e.target.value)}
                    disabled={loading}
                    required
                  />
                ))}
              </div>
            )}
              </>
            )}
            <button
              type="submit"
              className="w-full bg-[#a53d3b] hover:bg-[#581818] text-white py-3 rounded-xl transition-all disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Enviando..." : paso===0? "Siguiente" :"Confirmar asistencia"}
            </button>
          </form>
        </div>

        {/* Modal elegante de confirmación */}
        <Transition appear show={paso==2} as={Fragment}>
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
                  <h2 className="text-5xl text-[#a53d3b] mb-4 leading-tight">
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
                    className="mt-8 bg-[#bd9792] hover:bg-[#bd9792] text-white py-2 px-20 rounded-sm transition-all font-sans border border-[#bd9792]"
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
