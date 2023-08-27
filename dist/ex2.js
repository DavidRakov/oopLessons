"use strict";
class Person {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
}
class Patient extends Person {
    constructor(id, first, last) {
        super(first, last);
        this.patientID = id;
    }
    printPatientest() {
        return this;
    }
}
class Doctor extends Person {
    constructor(doctorID, specialization, first, last) {
        super(first, last);
        this.doctorID = doctorID;
        this.specialization = specialization;
    }
    printDoctor() {
        return this;
    }
}
class Appointment {
    constructor(patient, doctor, date, time) {
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
    constructor(hospitalName) {
        this.hospitalName = hospitalName;
        this.allPatients = [];
        this.allDoctors = [];
        this.allAppointments = [];
    }
    addPatient(patient) {
        this.allPatients.push(patient);
    }
    addDoctors(doc) {
        this.allDoctors.push(doc);
    }
    addAppointment(appoint) {
        this.allAppointments.push(appoint);
    }
    printAllAppointments() {
        console.log(this.allAppointments);
    }
    printAllAppointmentsByDocID(id) {
        return this.allAppointments.filter((appointment) => appointment.doctor.doctorID === id);
    }
    printAllAppointmentsByPaiID(id) {
        return this.allAppointments.filter((appointment) => appointment.patient.patientID === id);
    }
    printAllAppointmentsByDate() {
        return this.allAppointments.filter((appointment) => appointment.date === new Date().toDateString());
    }
}
// console.log(new Date().getDate().toLocaleString());
let patient = new Patient(1, "david", "re");
let doctor = new Doctor(5, "doc", "clara", "leon");
// console.log(patient, doctor);
let patient2 = new Patient(1, "david", "re");
let cc = new Appointment(patient, doctor, "27-08-23", "14:40");
let nn = new Appointment(patient2, doctor, "27-08-23", "14:55");
let hospital = new Hospital("soroka");
hospital.addDoctors(doctor);
hospital.addPatient(patient);
hospital.addPatient(patient2);
hospital.addAppointment(cc);
hospital.addAppointment(nn);
hospital.printAllAppointments();
let a = hospital.printAllAppointmentsByDocID(5);
console.log(a);
