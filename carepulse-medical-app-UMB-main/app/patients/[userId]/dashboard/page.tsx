import Image from "next/image";
import Link from "next/link";

import { Doctors } from "@/constants";
import { getPatientAppointments } from "@/lib/actions/appointment.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import { formatDateTime } from "@/lib/utils";

const PatientDashboard = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const appointmentsData = await getPatientAppointments(userId);

  const appointments = appointmentsData?.documents || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Confirmada
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Pendiente
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            Cancelada
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-300 font-sans text-white">
      {/* Barra Superior de Navegación */}
      <header className="sticky top-0 z-20 border-b border-dark-500/70 bg-dark-200/80 px-[5%] py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2">
              <Image
                src="/assets/icons/logo-icon.svg"
                height={28}
                width={28}
                alt="CarePulse"
                className="h-6 w-6"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-wide text-white">
                CarePulse
              </span>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                Portal Paciente
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-dark-500 bg-dark-400 px-3.5 py-2 text-xs md:text-sm font-medium text-dark-700 hover:bg-dark-500 hover:text-white transition"
            >
              ← Volver al inicio
            </Link>
            <Link
              href={`/patients/${userId}/new-appointment`}
              className="rounded-lg bg-blue-500 px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-blue-600 transition shadow-md shadow-blue-500/20"
            >
              + Nueva Cita
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-[5%] py-10">
        {/* Tarjeta de Bienvenida e Información del Paciente */}
        <section className="flex flex-col justify-between gap-6 rounded-2xl border border-dark-500/70 bg-dark-400/40 p-6 md:flex-row md:items-center md:p-8 shadow-lg">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Expediente Clínico Activo
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Hola, {patient?.name || "Paciente"} 👋
            </h1>
            <p className="text-sm text-dark-700">
              Consulta el estado de tus citas médicas y recibe confirmaciones automáticas por SMS.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl border border-dark-500/60 bg-dark-300/70 p-4 text-xs md:text-sm">
            <div>
              <p className="text-dark-600">Documento</p>
              <p className="font-semibold text-white">
                {patient?.identificationNumber || "Registrado"}
              </p>
            </div>
            <div>
              <p className="text-dark-600">EPS / Aseguradora</p>
              <p className="font-semibold text-white">
                {patient?.insuranceProvider || "Particular"}
              </p>
            </div>
            <div>
              <p className="text-dark-600">Teléfono SMS</p>
              <p className="font-semibold text-emerald-400">
                {patient?.phone || "Sin teléfono"}
              </p>
            </div>
            <div>
              <p className="text-dark-600">Médico Cabecera</p>
              <p className="font-semibold text-white">
                {patient?.primaryPhysician || "Por asignar"}
              </p>
            </div>
          </div>
        </section>

        {/* Contadores de Estado */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-dark-400/40 p-6 shadow">
            <p className="text-3xl font-bold text-emerald-400">
              {appointmentsData?.scheduledCount || 0}
            </p>
            <p className="mt-1 text-sm font-medium text-dark-700">
              Citas Confirmadas
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-dark-400/40 p-6 shadow">
            <p className="text-3xl font-bold text-blue-400">
              {appointmentsData?.pendingCount || 0}
            </p>
            <p className="mt-1 text-sm font-medium text-dark-700">
              Citas Pendientes
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-dark-400/40 p-6 shadow">
            <p className="text-3xl font-bold text-red-400">
              {appointmentsData?.cancelledCount || 0}
            </p>
            <p className="mt-1 text-sm font-medium text-dark-700">
              Citas Canceladas
            </p>
          </div>
        </section>

        {/* Historial de Citas del Paciente */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Mis Citas Médicas ({appointments.length})
            </h2>
          </div>

          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-dark-500 bg-dark-400/20 py-14 text-center">
              <p className="text-base font-semibold text-white">
                Aún no tienes citas registradas
              </p>
              <p className="mt-1 max-w-md text-sm text-dark-700">
                Agenda tu primera consulta médica y recibirás la notificación directamente en tu celular.
              </p>
              <Link
                href={`/patients/${userId}/new-appointment`}
                className="mt-5 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition"
              >
                Agendar mi primera cita
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-dark-500/70 bg-dark-400/30 shadow-lg">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-dark-500/70 bg-dark-200/70 text-xs uppercase text-dark-700">
                  <tr>
                    <th className="px-6 py-4">Especialista</th>
                    <th className="px-6 py-4">Fecha y Hora</th>
                    <th className="px-6 py-4">Motivo</th>
                    <th className="px-6 py-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-500/50">
                  {appointments.map((apt: any) => {
                    const doctor = Doctors.find(
                      (doc) => doc.name === apt.primaryPhysician
                    );
                    return (
                      <tr
                        key={apt.$id}
                        className="hover:bg-dark-400/50 transition"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {doctor?.image && (
                              <Image
                                src={doctor.image}
                                width={34}
                                height={34}
                                alt={apt.primaryPhysician}
                                className="rounded-full border border-dark-500 object-cover"
                              />
                            )}
                            <span className="font-semibold text-white">
                              Dr(a). {apt.primaryPhysician}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-dark-700">
                          {formatDateTime(apt.schedule).dateTime}
                        </td>
                        <td className="px-6 py-4 text-white">
                          {apt.reason || "Consulta general"}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(apt.status)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;