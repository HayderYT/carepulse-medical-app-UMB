# CarePulse — Plataforma de Gestión Médica y Citas

Aplicación web desarrollada para la gestión integral de citas médicas, registro de pacientes e historial clínico, integrada con servicios en la nube para la automatización de notificaciones.

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend & BaaS:** Appwrite (Autenticación, Base de Datos, Storage)
- **Servicios API:** Twilio (Envío automatizado de SMS)
- **Monitoreo:** Sentry

## 🚀 Funcionalidades Principales

- **Registro de Pacientes:** Formulario dinámico para la captura de datos personales, contacto de emergencia e información médica.
- **Carga de Documentos:** Módulo para adjuntar y previsualizar documentos de identidad de forma segura.
- **Agendamiento de Citas:** Selección de médicos especialistas y programación de fecha/hora.
- **Panel de Administración (`/admin`):** Gestión, confirmación y cancelación de citas agendadas.
- **Notificaciones Automáticas:** Confirmación inmediata vía SMS al teléfono del paciente tras la gestión de la cita.