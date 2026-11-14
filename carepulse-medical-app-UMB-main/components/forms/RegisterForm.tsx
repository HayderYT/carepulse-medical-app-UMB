// @ts-nocheck
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";

export const RegisterForm = ({ user }: { user: any }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onInvalid = (errors: any) => {
    const firstKey = Object.keys(errors)[0];
    const firstMsg =
      errors[firstKey]?.message || "Revisa los campos obligatorios";
    setSubmitError(`Campo pendiente (${firstKey}): ${firstMsg}`);
  };

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    setSubmitError(null);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
        router.refresh();
      } else {
        setSubmitError(
          "No se pudo guardar el registro en Appwrite. Verifica los datos e intenta nuevamente."
        );
      }
    } catch (error: any) {
      console.error("Error al registrar paciente:", error);
      setSubmitError(
        error?.message || "Ocurrió un error al guardar el paciente."
      );
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="flex-1 space-y-8 font-sans"
      >
        {/* Cabecera Principal */}
        <section className="space-y-2 border-b border-dark-500/70 pb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-400">
            EXPEDIENTE CLÍNICO DIGITAL
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Registro de Paciente
          </h1>
          <p className="text-sm md:text-base text-dark-700">
            Completa tu perfil médico para habilitar el agendamiento prioritario y notificaciones SMS.
          </p>
        </section>

        {/* Tarjeta 01: Información Personal */}
        <section className="space-y-6 rounded-2xl border border-dark-500/70 bg-dark-400/30 p-6 md:p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-dark-500/60 pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-sm font-bold text-blue-400 border border-blue-500/30">
              01
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">
                Información Personal
              </h2>
              <p className="text-xs text-dark-700">
                Datos básicos de contacto y ubicación
              </p>
            </div>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nombre completo"
            placeholder="Ej: Hayder Duvan Carreño Ramos"
            iconSrc="/assets/icons/user.svg"
            iconAlt="usuario"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Correo electrónico"
              placeholder="ejemplo@correo.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="correo"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Número de teléfono"
              placeholder="318 408 0875"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Fecha de nacimiento"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Género"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-4 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          htmlFor={option}
                          className="cursor-pointer font-medium text-white"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Dirección de residencia"
              placeholder="Ej: Carrera 7 # 45-12, Bogotá"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Ocupación"
              placeholder="Ej: Ingeniero de Software"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Contacto de emergencia"
              placeholder="Nombre del familiar o acudiente"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Teléfono de emergencia"
              placeholder="300 123 4567"
            />
          </div>
        </section>

        {/* Tarjeta 02: Información Médica */}
        <section className="space-y-6 rounded-2xl border border-dark-500/70 bg-dark-400/30 p-6 md:p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-dark-500/60 pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-bold text-emerald-400 border border-emerald-500/30">
              02
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">
                Información Médica y EPS
              </h2>
              <p className="text-xs text-dark-700">
                Especialista de cabecera y antecedentes clínicos
              </p>
            </div>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Médico especialista de cabecera"
            placeholder="Selecciona un especialista"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-3 py-0.5">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-emerald-500/40 object-cover"
                  />
                  <p className="font-medium text-white">Dr(a). {doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Aseguradora / EPS"
              placeholder="Ej: Sura, Sanitas, Compensar, Salud Total"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Número de afiliación / Póliza"
              placeholder="Ej: 1029384756"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Alergias conocidas (si aplica)"
              placeholder="Ej: Penicilina, Ibuprofeno, Polen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Medicamentos actuales"
              placeholder="Ej: Losartán 50mg, Acetaminofén"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Antecedentes médicos familiares"
              placeholder="Ej: Hipertensión, Diabetes tipo 2"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Antecedentes médicos personales"
              placeholder="Ej: Apendicectomía, Fracturas previas"
            />
          </div>
        </section>

        {/* Tarjeta 03: Identificación y Documentación */}
        <section className="space-y-6 rounded-2xl border border-dark-500/70 bg-dark-400/30 p-6 md:p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-dark-500/60 pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-400 border border-purple-500/30">
              03
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">
                Identificación y Documentación
              </h2>
              <p className="text-xs text-dark-700">
                Validación de identidad del paciente
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Tipo de documento"
              placeholder="Selecciona el tipo de documento"
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Número de documento"
              placeholder="Ej: 1012345678"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Copia escaneada del documento de identidad"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        {/* Tarjeta 04: Consentimiento y Privacidad */}
        <section className="space-y-5 rounded-2xl border border-dark-500/70 bg-dark-400/30 p-6 md:p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-dark-500/60 pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-sm font-bold text-amber-400 border border-amber-500/30">
              04
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white">
                Consentimiento y Privacidad
              </h2>
              <p className="text-xs text-dark-700">
                Autorización de tratamiento de datos clínicos (Ley 1581 de 2012)
              </p>
            </div>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="Acepto recibir atención médica y procedimientos clínicos necesarios."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Autorizo el uso y divulgación de mi historia clínica con fines asistenciales."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Acepto los términos, condiciones y políticas de privacidad del portal."
          />
        </section>

        {submitError && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm font-medium text-red-400">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 disabled:opacity-50"
        >
          {isLoading ? "Guardando expediente..." : "Completar Registro y Continuar →"}
        </button>
      </form>
    </Form>
  );
};

export default RegisterForm;