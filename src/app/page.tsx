'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1800,
      once: true, 
      offset: 200, 

    });
  }, []);
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
        <div className="md:w-1/2 text-center md:text-end " data-aos="fade-right">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight" >
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
            <div className="overflow-hidden rounded-lg shadow-lg" data-aos="fade-right">
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
          “El amor no mira con los ojos, sino con el alma."
          <br />
          <span className="block mt-2 text-2xl">— William Shakespeare</span>
        </blockquote>
      </section>
    </div>
  );
}
