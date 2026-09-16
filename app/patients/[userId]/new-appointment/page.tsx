import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen bg-dark-300">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          {/* Header con Marca Institucional UMB */}
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner">
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
              <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/20">
                UMB
              </span>
            </div>
          </div>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12 text-dark-600">
            © 2026 CarePulse UMB - Universidad Manuela Beltrán
          </p>
        </div>
      </section>

      {/* Imagen Lateral con Degradado Continuo */}
      <div className="hidden md:block relative max-w-[390px] w-full h-full">
        <Image
          src="/assets/images/appointment-img.png"
          height={1500}
          width={1500}
          alt="Agendamiento Médico"
          className="side-img object-cover object-center w-full h-full"
        />
        {/* Capa de sombra para desvanecer el borde izquierdo de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-300 via-transparent to-transparent opacity-90" />
      </div>
    </div>
  );
};

export default Appointment;