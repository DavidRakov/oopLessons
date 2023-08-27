class Person {
  firstName: string;
  lastName: string;

  constructor(first: string, last: string) {
    this.firstName = first;
    this.lastName = last;
  }
}
class Patient extends Person {
  patientID: number;

  constructor(id: number, first: string, last: string) {
    super(first, last);
    this.patientID = id;
  }

  printPatientest() {
    return this;
  }
}

class Doctor extends Person {
  doctorID: number;
  specialization: string;

  constructor(
    doctorID: number,
    specialization: string,
    first: string,
    last: string
  ) {
    super(first, last);
    this.doctorID = doctorID;
    this.specialization = specialization;
  }

  printDoctor() {
    return this;
  }
}

type time = string | number;
class Appointment {
  patient: Patient;
  doctor: Doctor;
  date: time;
  time: time;

  constructor(patient: Patient, doctor: Doctor, date: time, time: time) {
    this.date = date;
    this.time = time;
    this.doctor = doctor;
    this.patient = patient;
  }
  printAppointment() {
    return this;
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

  addAppointment(appoint: Appointment) {
    this.allAppointments.push(appoint);
  }

  printAllAppointments() {
    console.log(this.allAppointments);
  }

  printAllAppointmentsByDocID(id: number) {
    return this.allAppointments.filter(
      (appointment) => appointment.doctor.doctorID === id
    );
  }

  printAllAppointmentsByPaiID(id: number) {
    return this.allAppointments.filter(
      (appointment) => appointment.patient.patientID === id
    );
  }

  printAllAppointmentsByDate() {
    return this.allAppointments.filter(
      (appointment) => appointment.date === new Date().toDateString()
    );
  }
}

// console.log(new Date().getDate().toLocaleString());
let patient = new Patient(1, "david", "re");
let doctor = new Doctor(5, "doc", "clara", "leon");
// console.log(patient, doctor);
let patient2 = new Patient(1, "david", "re");
let appointment = new Appointment(patient, doctor, "27-08-23", "14:40");
let appointment2 = new Appointment(patient2, doctor, "27-08-23", "14:55");
let hospital = new Hospital("soroka");
hospital.addDoctors(doctor);
hospital.addPatient(patient);
hospital.addPatient(patient2);
hospital.addAppointment(appointment);
hospital.addAppointment(appointment2);
hospital.printAllAppointments();
let allAppointments = hospital.printAllAppointmentsByDocID(5);
console.log(allAppointments);
