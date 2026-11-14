import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 bg-dark-300 p-6 md:p-10">
      {/* Header Corporativo */}
      <header className="admin-header bg-dark-400/80 backdrop-blur-md border border-dark-500/80 shadow-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="CarePulse Logo"
              className="h-6 w-fit"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-wide">
              CarePulse
            </span>
            <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-500/20">
              UMB
            </span>
          </div>
        </Link>

        <p className="text-16-semibold text-light-200">Panel de Administración</p>
      </header>

      <main className="admin-main space-y-10">
        {/* Encabezado Principal */}
        <section className="w-full space-y-2">
          <h1 className="header text-white">Panel de Control</h1>
          <p className="text-dark-700">
            Gestión y monitoreo de solicitudes de citas médicas en tiempo real.
          </p>
        </section>

        {/* Tarjetas de Métricas Traducidas */}
        <section className="admin-stat gap-6">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Citas Agendadas"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Citas Pendientes"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Citas Canceladas"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        {/* Tabla de Datos */}
        <div className="w-full rounded-2xl bg-dark-400/60 backdrop-blur-md p-4 border border-dark-500/80 shadow-2xl">
          <DataTable columns={columns} data={appointments.documents} />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;