import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen bg-dark-300">
      {isAdmin && <PasskeyModal />}

      {/* Columna Izquierda: Formulario e Información */}
      <section className="remove-scrollbar container my-auto flex flex-col justify-between py-10">
        <div className="sub-container max-w-[496px] my-auto">
          {/* Logo y Marca Académica */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
                <Image
                  src="/assets/icons/logo-icon.svg"
                  height={1000}
                  width={1000}
                  alt="CarePulse Logo"
                  className="h-7 w-fit"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-wide block leading-none">
                  CarePulse
                </span>
                <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase">
                  Plataforma Médica
                </span>
              </div>
            </div>

            <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/20">
              UMB 2026
            </span>
          </div>

          {/* Tarjeta Contenedora del Formulario */}
          <div className="bg-dark-400/60 backdrop-blur-md p-8 rounded-2xl border border-dark-500/80 shadow-2xl">
            <PatientForm />
          </div>

          {/* Footer de Créditos e Ingreso Admin */}
          <div className="mt-8 pt-6 border-t border-dark-500/60 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                Proyecto Ingeniería Web II
              </p>
              <div className="text-[12px] text-dark-700 space-y-0.5">
                <p>• Heidy Valeria Asprilla Rubiano</p>
                <p>• Hayder Duvan Carreño Ramos</p>
                <p>• Paula Valentina Román Yepes</p>
              </div>
            </div>

            <Link
              href="/?admin=true"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-400 border border-dark-500 hover:border-blue-500/50 text-xs font-medium text-blue-400 hover:text-blue-300 transition-all shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Columna Derecha: Imagen Lateral */}
      <div className="hidden md:block relative max-w-[50%] w-full h-full">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="Equipo Médico CarePulse"
          className="side-img object-cover object-center w-full h-full"
        />
        {/* Degradado oscuro para integrar la imagen con el fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-300 via-transparent to-transparent opacity-90" />
      </div>
    </div>
  );
};

export default Home;