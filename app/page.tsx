import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          {/* Header con Marca Personalizada */}
          <div className="flex items-center gap-3 mb-12">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="h-10 w-fit"
            />
            <span className="text-2xl font-bold text-white tracking-wide">
              CarePulse <span className="text-blue-500">UMB</span>
            </span>
          </div>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between items-end">
            {/* Integrantes del Grupo Académico */}
            <div className="text-left text-dark-600 space-y-1">
              <p className="font-semibold text-light-200">Desarrollado por:</p>
              <p className="text-12-regular text-dark-700">• Heidy Valeria Asprilla Rubiano</p>
              <p className="text-12-regular text-dark-700">• Hayder Duvan Carreño Ramos</p>
              <p className="text-12-regular text-dark-700">• Paula Valentina Román Yepes</p>
              <p className="text-12-regular opacity-50 mt-2">© 2026 CarePulse UMB</p>
            </div>

            <Link href="/?admin=true" className="text-blue-500 font-medium hover:underline">
              Administrador
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;