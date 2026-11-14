export const GenderOptions = ["Masculino", "Femenino", "Otro"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Masculino" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Cédula de Ciudadanía",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Cédula de Ciudadanía",
  "Tarjeta de Identidad",
  "Cédula de Extranjería",
  "Pasaporte",
  "Permiso por Protección Temporal (PPT)",
  "Registro Civil",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Andrés Felipe Gómez",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Camila Andrea Restrepo",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Santiago Morales Ospina",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Juan Sebastián Vargas",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Valentina Rodríguez Castro",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Carlos Eduardo Ramírez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Natalia Sofía Mendoza",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Laura Fernanda Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Mateo Alejandro Herrera",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};