"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import HowItWorks from "@/assets/how-it-works/how-it-works.png";

const steps: {
  num: string;
  title: string;
  desc: ReactNode;
}[] = [
  {
    num: "1",
    title: "Eliges tu propiedad",
    desc: (
      <>
        Explora proyectos con alto potencial y adquiere tus fracciones desde
        S/2,000. {""}
        <span className="font-bold">
          Todo desde tu celu, sin complicaciones.
        </span>
      </>
    ),
  },
  {
    num: "2",
    title: "Te haces accionista",
    desc: (
      <>
        Creamos una Sociedad Anónima y tú formas parte como inversionista legal.{" "}
        <span className="font-bold">
          Todo 100% seguro, digital y con respaldo legal.
        </span>
      </>
    ),
  },
  {
    num: "3",
    title: "Recibes tus ganancias",
    desc: (
      <>
        Cobras renta mes a mes, y cuando se vende el inmueble, ganas por su
        valorización. {""}
        <span className="font-bold">
          Tu plata trabaja por ti, tú ni te mueves.
        </span>
      </>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-5 px-5" id="how-it-works">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl italic font-bold mb-8">
          “La nueva forma de invertir en inmuebles{" "}
          <span className="text-primary">sin papeleos”</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_50%] items-center overflow-visible">
          <div className="bg-foreground pl-10 pr-20 py-14 rounded-3xl space-y-10 shadow-button">
            {steps.map((step) => (
              <React.Fragment key={step.num}>
                {step.num === "2" ? (
                  <div className="flex items-start space-x-4 w-[calc(100%+7rem)]">
                    <div className="relative bg-primary p-10 rounded-tl-[30px] rounded-bl-[30px] -left-20 shadow-hero overflow-visible">
                      <h3 className="text-3xl font-extrabold uppercase text-foreground mb-1">
                        {step.num}. {step.title}
                      </h3>
                      <p className="text-base text-foreground leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div>
                      <h3 className="text-3xl font-extrabold uppercase text-white mb-1">
                        {step.num}. {step.title}
                      </h3>
                      <p className="text-base text-gray-300 leading-loose">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="relative overflow-visible h-full -left-12">
            <Image
              src={HowItWorks}
              alt="Ilustración Cómo funciona"
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-3xl inverted-radius-tr shadow-alt"
            />
            <div className="absolute top-0 right-0 pl-3 pb-3 bg-background rounded-bl-[30px] overflow-visible">
              <button className="bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-3 rounded-[30px] text-lg uppercase shadow-button transition cursor-pointer relative">
                ¿Cómo funciona? 👀
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
