interface DayInterface {
  date: string;
  hour: string;
  isAvailable: boolean;
}

interface timeInterface {
  hour: string;
  minute: string;
}
interface DateInterface {
  year: number;
  monte: number;
  date: number;
}
type scheduleType = (
  date: DateInterface,
  startTime: timeInterface,
  endTime: timeInterface,
  timeBetween: number
) => DayInterface[];

const createSchedule: scheduleType = (
  date,
  startTime,
  endTime,
  timeBetween = 15
) => {
  let schedule: DayInterface[] = [];
  let startDate = new Date(date.year, date.monte, date.date);
  let endDate = new Date(date.year, date.monte, date.date);
  startDate.setHours(parseInt(startTime.hour), parseInt(startTime.minute), 0);
  endDate.setHours(parseInt(endTime.hour), parseInt(endTime.minute), 0);
  while (startDate < endDate) {
    const temp: DayInterface = {
      date: startDate.toLocaleDateString(),
      hour: startDate.toLocaleTimeString(),
      isAvailable: true,
    };
    schedule.push(temp);
    startDate = new Date(startDate.getTime() + timeBetween * 60000);
  }
  return schedule;
};
const date: DateInterface = { year: 2023, monte: 8, date: 22 };
const startHour: timeInterface = { hour: "08", minute: "00" };
const endHour: timeInterface = { hour: "17", minute: "30" };
const check = createSchedule(date, startHour, endHour, 15);

class Person {
  firstName: string;
  lastName: string;
  age: number;
  address: string;

  constructor(first: string, last: string, age: number, address: string) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.address = address;
  }
}

type appointments = {
  date: keyof Appointment;
  doctor: keyof Appointment;
};

class Patient extends Person {
  patientID: number;
  emergencyContact: number;
  phoneNumber: number;
  medicalHistory: unknown[];

  constructor(
    id: number,
    first: string,
    last: string,
    age: number,
    address: string,
    phone: number,
    emergencyContact: number
  ) {
    super(first, last, age, address);
    this.patientID = id;
    this.phoneNumber = phone;
    this.emergencyContact = emergencyContact;
    this.medicalHistory = [];
  }
  printPatientest() {
    return this;
  }

  addMedicalHistory(appointment: Appointment) {
    this.medicalHistory.push({
      date: appointment.appointment?.date,
      doctor: appointment.appointment?.doctor,
    });
  }
}

class MedicalStaff extends Person {
  staffID: number;
  position: string;
  department: string;

  constructor(
    first: string,
    last: string,
    age: number,
    address: string,
    staffID: number,
    position: string,
    department: string
  ) {
    super(first, last, age, address);
    this.staffID = staffID;
    this.position = position;
    this.department = department;
  }
}

class Doctor extends MedicalStaff {
  doctorID: number;
  specialization: string;
  availability: DayInterface[];
  range: { min: number; max: number };

  constructor(
    doctorID: number,
    specialization: string,
    first: string,
    last: string,
    age: number,
    address: string,
    staffID: number,
    position: string,
    department: string,
    availability: DayInterface[],
    range: { min: number; max: number }
  ) {
    super(first, last, age, address, staffID, position, department);
    this.doctorID = doctorID;
    this.specialization = specialization;
    this.availability = availability;
    this.range = range;
  }

  printDoctor() {
    return this;
  }
}

type time = string | number;
type AppointmentType = {
  patient: Patient;
  doctor: { fullName: string; id: number; position: string };
  date: string;
  time: string;
};
class Appointment {
  doctorId: number | null;
  patientId: number | null;
  appointment: AppointmentType | null;

  constructor() {
    this.appointment = null;
    this.doctorId = null;
    this.patientId = null;
  }
  addAppointment(patient: Patient, doctor: Doctor, date: string, time: string) {
    if (patient.age < doctor.range.min || patient.age > doctor.range.max)
      return "not in age range";
    let available = doctor.availability.findIndex(
      (turn) => turn.date === date && turn.hour === time
    );

    if (available) {
      if (doctor.availability[available].isAvailable === true) {
        doctor.availability[available].isAvailable = false;
        this.doctorId = doctor.doctorID;
        this.patientId = patient.patientID;
        this.appointment = {
          patient: patient,
          doctor: {
            fullName: `${doctor.firstName} ${doctor.lastName}`,
            id: doctor.doctorID,
            position: doctor.position,
          },
          date: date,
          time: time,
        };
        patient.addMedicalHistory(appointment);
      } else {
        return "Queue not available";
      }
    }
  }
  printAppointment() {
    console.log(appointment);
  }
}

class MedicalRecord {
  doctorId: number | null;
  patientId: number | null;
  visit: Appointment;
  diagnosis: string;
  prescription: string;

  constructor(visit: Appointment, diagnosis: string, prescription: string) {
    this.doctorId = visit.doctorId;
    this.patientId = visit.patientId;
    this.visit = visit;
    this.diagnosis = diagnosis;
    this.prescription = prescription;
  }
}
class Hospital {
  hospitalName: string;
  allPatients: Patient[];
  allDoctors: Doctor[];
  allAppointments: Appointment[];

  constructor(hospitalName: string) {
    this.hospitalName = hospitalName;
    this.allPatients = [];
    this.allDoctors = [];
    this.allAppointments = [];
  }

  addPatient(patient: Patient) {
    this.allPatients.push(patient);
  }

  addDoctors(doc: Doctor) {
    this.allDoctors.push(doc);
  }

  createMedicalRecord(appoint: Appointment) {
    this.allAppointments.push(appoint);
  }

  printAllAppointments() {
    console.log(this.allAppointments);
  }

  getDoctorSchedule(id: number) {
    return this.allAppointments.filter(
      (appointment) => appointment.doctorId === id
    );
  }

  getMedicalRecords(id: number) {
    return this.allAppointments.filter(
      (appointment) => appointment.patientId === id
    );
  }

  printAllAppointmentsByDate() {
    return this.allAppointments.filter(
      (appointment) =>
        appointment.appointment?.date === new Date().toDateString()
    );
  }
}

let patient = new Patient(1, "david", "re", 32, "sdfgks", 559767174, 25867024);
let patient2 = new Patient(
  12,
  "davjid",
  "rei",
  42,
  "sdffgks",
  5597675174,
  250867024
);
let doctor = new Doctor(
  5,
  "doc",
  "clara",
  "leon",
  42,
  "ghbhhnj",
  15,
  "hbh0",
  "jnj",
  check,
  { min: 15, max: 55 }
);

let appointment = new Appointment();
appointment.addAppointment(patient, doctor, "22.9.2023", "14:45:00");
appointment.printAppointment();

let appointment2 = new Appointment();
appointment2.addAppointment(patient2, doctor, "22.9.2023", "14:15:00");
let visit = new MedicalRecord(appointment, "bbbb", "njmj");
let hospital = new Hospital("soroka");
hospital.addDoctors(doctor);
hospital.addPatient(patient);
hospital.addPatient(patient2);

hospital.createMedicalRecord(appointment2);
hospital.printAllAppointments();
let allAppointments = hospital.getMedicalRecords(1);
console.table(allAppointments);
