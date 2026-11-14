import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%] bg-dark-300 font-sans text-white overflow-y-auto">
      <div className="success-img mx-auto max-w-[700px] w-full">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="CarePulse Logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center text-center space-y-4">
          <Image
            src="/assets/gifs/success.gif"
            height={220}
            width={220}
            alt="success"
            unoptimized
          />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-[600px]">
            ¡Tu <span className="text-emerald-400">solicitud de cita</span> ha sido enviada con éxito!
          </h2>
          <p className="text-dark-700 text-sm md:text-base">
            Hemos registrado tu cita y te hemos enviado una notificación de confirmación por SMS.
          </p>
        </section>

        <section className="request-details flex flex-col w-full items-center gap-6 rounded-2xl border border-dark-500/70 bg-dark-400/30 p-6 md:flex-row md:justify-around">
          <p className="text-sm font-semibold text-dark-700">Detalles de la cita:</p>
          
          <div className="flex items-center gap-3">
            {doctor?.image && (
              <Image
                src={doctor.image}
                alt="doctor"
                width={100}
                height={100}
                className="size-8 rounded-full border border-emerald-500/40 object-cover"
              />
            )}
            <p className="whitespace-nowrap font-semibold text-white">
              Dr(a). {doctor?.name || appointment?.primaryPhysician}
            </p>
          </div>

          <div className="flex items-center gap-2 text-dark-700">
            <Image
              src="/assets/icons/calendar.svg"
              height={22}
              width={22}
              alt="calendar"
            />
            <p className="text-sm font-medium text-white">
              {appointment?.schedule ? formatDateTime(appointment.schedule).dateTime : "Fecha por confirmar"}
            </p>
          </div>
        </section>

        {/* Botones de Navegación y Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button variant="outline" className="w-full sm:w-auto h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl border-none shadow-md shadow-blue-500/20" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              + Agendar otra cita
            </Link>
          </Button>

          <Button variant="outline" className="w-full sm:w-auto h-11 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-semibold rounded-xl" asChild>
            <Link href={`/patients/${userId}/dashboard`}>
              📋 Ver mis citas
            </Link>
          </Button>

          <Button variant="outline" className="w-full sm:w-auto h-11 border-dark-500 bg-dark-400 hover:bg-dark-500 text-dark-700 hover:text-white font-medium rounded-xl" asChild>
            <Link href="/">
              ← Volver al inicio
            </Link>
          </Button>
        </div>

        <p className="copyright text-xs text-dark-600">
          © 2026 CarePulse UMB - Universidad Manuela Beltrán
        </p>
      </div>
    </div>
  );
};

export default RequestSuccess;