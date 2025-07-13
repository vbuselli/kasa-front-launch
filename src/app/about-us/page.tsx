// src/app/about-us/page.tsx
export const dynamic = "force-static";

import Image from "next/image";

// 👉 importa las fotos locales (utils/f1.jpg … f5.jpeg)
import f from "./utils/f.png";
import cristhian from "./utils/cristhian.jpg";
import cristina from "./utils/cristina.jpg";
import f1 from "./utils/f1.jpeg";
import f2 from "./utils/f2.jpeg";
import f3 from "./utils/f3.jpeg";
import kasa from "./utils/casa.png"
import Breadcrumb from "@/components/Breadcrumb";
import { link } from "fs";
// --- DATA ---
const timeline = [
  {
    year: "2024",
    title: "Nace Kasa",
    description:
      "Fundamos Kasa para democratizar la inversión inmobiliaria en Latinoamérica.",
  },
  {
    year: "2025",
    title: "Ganadores Startup Perú 11G",
    description:
      "Reconocidos por ProInnovate como una de las startups más prometedoras.",
  },
  {
    year: "2025",
    title: "+200 Kaseros",
    description: "Más de 200 personas ya utilizan nuestra plataforma, y la comunidad de ‘Kaseros’ sigue creciendo.",
  },
];

const values = [
  {
    icon: f1,
    title: "Acceso justo",
    text: "Invierte en bienes raíces desde S/2,000, sin bancos ni papeleos.",
  },
  {
    icon: f2,
    title: "Respaldo legal",
    text: "Cada proyecto se estructura en una S.A. para tu tranquilidad jurídica.",
  },
  {
    icon: f3,
    title: "Comunidad",
    text: "+100 inversionistas que aprenden y crecen juntos.",
  },
];

const pressLogos = [
  "/press/startup-peru.svg",
  "/press/elcomercio.svg",
  "/press/emprendeup.svg",
  "/press/proinnovate.svg",
];

const team = [
  {
    name: "Cristhian Agüero",
    role: "Co‑Founder & CEO",
    img: cristhian,
    link: "https://www.linkedin.com/in/cristhianagueroh/"
  },
  {
    name: "Cristina Vereau",
    role: "Head of Growth",
    img: cristina,
    link: "https://www.linkedin.com/in/cristinavereau/"
  }
];

export default function AboutUsPage() {
  return (
    <section className="w-full overflow-hidden bg-[#111729] text-white rounded-tl-[40px] border">
      <Breadcrumb current="Nosotros" />
      {/* HERO */}

      <div className="relative isolate flex flex-col items-center justify-center gap-4 px-6 pt-4 text-center pb-12">
        <h1 className="flex flex-row text-4xl font-extrabold tracking-tight sm:text-5xl text-white gap-4">

          <p className="pt-[5px]">Somos Kasa</p>
          <Image
            src={kasa}  // Usa la imagen importada
            alt="Kasa logo"
            width={60}   // Ajusta el tamaño que necesites
            height={50}  // Ajusta el tamaño que necesites
            className="inline-block"  // Si quieres que se muestre en línea con el texto
          />
        </h1>
      </div>


      {/* STORY */}
      <div className="mx-auto max-w-3xl px-6 space-y-6 text-base sm:text-lg leading-relaxed flex flex-col justify-center text-justify text-white">
        <p>
          Crecimos con la idea de que algún día tendríamos un depa propio. «Trabaja duro, ahorra y compra tu techo», nos dijeron.
        </p>
        <p>
          Pero cuando haces los números, te das cuenta de que ese «algún día» puede tardar décadas. Precios imposibles. Créditos inaccesibles. Trámites que te quitan las ganas.
        </p>
        <p>
          Y mientras tanto, las oportunidades inmobiliarias siguen siendo para unos pocos.
        </p>

        <p>
          <strong>Por eso creamos Kasa.</strong> Una forma nueva (y justa) de invertir en inmuebles.
        </p>

        <div className="w-full flex justify-center">
          <div className="w-[180%]">
            <Image
              src={f}
              alt="Kasa en prensa y eventos"
              className="rounded-lg object-cover w-[180%] h-auto"
            />
          </div>
        </div>


        <p>
          Agrupamos a personas como tú y como nosotros para comprar propiedades entre todos. Desde <strong>S/. 2,000</strong>, sin bancos, sin burocracia, sin cuentos.
        </p>
        <p className="font-semibold">Tú pones el capital. Nosotros nos encargamos del resto:</p>
        <ul className="list-none space-y-2">
          <li>✔️ Buscamos los mejores inmuebles</li>
          <li>✔️ Creamos la estructura legal</li>
          <li>✔️ Gestionamos los alquileres</li>
          <li>✔️ Y te transferimos mes a mes tu parte de las ganancias</li>
        </ul>
        <p>
          Invertir debería ser parte de todas las conversaciones. Nuestra misión es democratizar la inversión inmobiliaria en Latinoamérica. Romper con el modelo tradicional, eliminar las barreras de entrada y abrir el acceso a más personas.
        </p>
        <p>
          Sin burocracias, sin bancos, sin necesidad de ser millonario. Desde S/. 2,000 y 100 % online. Sin floro. Con respaldo legal. Así de simple.
        </p>
        <p className="text-kasa-100 font-semibold text-lg">🚪 Bienvenid@ a Kasa. La puerta a tu primera inversión inmobiliaria.</p>
        <div className="pt-6 space-y-1 text-sm text-slate-700">
          <p className="text-white">Cristhian Agüero — CEO & Fundador</p>
          <p className="text-white">Cristina Vereau — Head of Growth</p>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-white">Nuestra historia</h2>
        <ol className="relative ml-4 border-l-2 border-dashed border-kasa-500">
          {timeline.map((item, idx) => (
            <li key={idx} className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-kasa-500 text-white">
                {item.year}
              </span>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 text-white">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* VALUES */}
      <div className="py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
          {values.map((v, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow">
              <Image src={v.icon} alt="" width={48} height={48} />
              <h4 className="text-lg text-slate-800 font-semibold">{v.title}</h4>
              <p className="text-sm text-slate-600">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRESS */}
      {/* <div className="mx-auto max-w-6xl px-6 py-16 bg-[#111729] text-white">
        <h2 className="mb-8 text-center text-3xl font-bold">Reconocimientos y prensa</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
          {pressLogos.map((src, idx) => (
            <Image key={idx} src={src} alt="Logo prensa" width={120} height={60} />
          ))}
        </div>
      </div> */}

      {/* TEAM */}
      <div className="bg-[#111729] py-16 ">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">Conoce al equipo</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg backdrop-blur-sm"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={1600}
                  height={160}
                  className="w-full h-64 rounded-2xl object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-slate-800">{member.name}</h3>
                <p className="text-sm text-slate-800">{member.role}</p>

                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[16px] bg-transparent hover:bg-[#0e76a8] text-[#0e76a8] font-semibold hover:text-white py-2 px-4 border border-[#0e76a8] hover:border-transparent rounded"
                >
                  LinkedIn
                </a>
              </div>
            ))}

          </div>
        </div>
      </div>

    </section>
  );
}
