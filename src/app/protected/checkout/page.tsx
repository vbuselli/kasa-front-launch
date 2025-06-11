"use client";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="bg-foreground py-8 px-8 lg:py-20 lg:px-12 rounded-tl-[30px] w-full h-full flex-1 flex flex-col justify-center items-center">
      <div className="text-center space-y-6">
        <h1 className="text-white text-2xl lg:text-3xl font-semibold">
          Tu carrito está vacío
        </h1>
        
        <Link 
          href="/protected/investments"
          className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}