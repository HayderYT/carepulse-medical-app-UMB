import Image from "next/image";

import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen bg-dark-300 font-sans text-white">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* Header Institucional CarePulse UMB */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-inner">
              <Image
                src="/assets/icons/logo-icon.svg"
                height={1000}
                width={1000}
                alt="CarePulse Logo"
                className="h-7 w-fit"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-wide">
                CarePulse
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
                UMB 2026
              </span>
            </div>
          </div>

          <RegisterForm user={user} />

          <p className="copyright py-12 text-dark-600">
            © 2026 CarePulse UMB - Universidad Manuela Beltrán
          </p>
        </div>
      </section>

      {/* Imagen Lateral con Degradado Profesional */}
      <div className="hidden md:block relative max-w-[390px] w-full h-full">
        <Image
          src="/assets/images/register-img.png"
          height={1500}
          width={1500}
          alt="Registro de Paciente"
          className="side-img object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-300 via-transparent to-transparent opacity-90" />
      </div>
    </div>
  );
};

export default Register;