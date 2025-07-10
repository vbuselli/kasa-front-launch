"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import HowItWorks from "@/assets/how-it-works/how-it-works.jpg";

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
    title: "Te haces propietario",
    desc: (
      <>
        Creamos una Sociedad Anónima y tú formas parte como socio legal.{" "}
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
        Recibes tus ganancias mes a mes, y cuando se vende el inmueble, ganas por su
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
    <section className="py-5 md:px-5" id="how-it-works">
      <div className="container mx-auto md:px-6">
        <h2 className="text-center text-[20px] md:text-4xl italic font-bold mb-4 md:mb-8 leading-tight md:leading-normal">
          &quot;La nueva forma de invertir en inmuebles{" "}
          <span className="text-primary">sin papeleos&quot;</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_50%] items-center overflow-visible">
          <div className="bg-foreground rounded-3xl shadow-button order-2 lg:order-1 mt-5 lg:mt-0">
            {steps.map((step) => (
              <React.Fragment key={step.num}>
                {step.num === "2" ? (
                  <div className="flex items-start space-x-4 lg:w-[calc(100%+7rem)] lg:pl-10 lg:pr-20">
                    <div className="relative bg-primary p-6 md:p-14 lg:p-10 lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:-left-20 shadow-hero overflow-visible">
                      <h3 className="text-[19px] md:text-[24px] font-extrabold uppercase text-foreground mb-1">
                        {step.num}. {step.title}
                      </h3>
                      <p className="text-[15px] md:text-base text-foreground leading-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4 p-6 pr-8 md:p-14 md:pr-20">
                    <div>
                      <h3 className="text-[19px] md:text-[24px] font-extrabold uppercase text-white mb-1">
                        {step.num}. {step.title}
                      </h3>
                      <p className="text-[15px] md:text-base text-gray-300 leading-loose">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="relative overflow-visible h-full lg:-left-12 order-1 lg:order-2 hidden md:block">
            <Image
              src={HowItWorks}
              alt="Ilustración Cómo funciona"
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-3xl inverted-radius-tr shadow-alt"
            />
            <div className="absolute top-0 right-0 pl-3 pb-3 bg-background rounded-bl-[30px] overflow-visible hidden md:block">
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