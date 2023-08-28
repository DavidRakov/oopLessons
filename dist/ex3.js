"use strict";
const createSchedule = (date, startTime, endTime, timeBetween = 15) => {
    let schedule = [];
    let startDate = new Date(date.year, date.monte, date.date);
    let endDate = new Date(date.year, date.monte, date.date);
    startDate.setHours(parseInt(startTime.hour), parseInt(startTime.minute), 0);
    endDate.setHours(parseInt(endTime.hour), parseInt(endTime.minute), 0);
    while (startDate < endDate) {
        const temp = {
            date: startDate.toLocaleDateString(),
            hour: startDate.toLocaleTimeString(),
            isAvailable: true,
        };
        schedule.push(temp);
        startDate = new Date(startDate.getTime() + timeBetween * 60000);
    }
    return schedule;
};
const date = { year: 2023, monte: 8, date: 22 };
const startHour = { hour: "08", minute: "00" };
const endHour = { hour: "17", minute: "30" };
const check = createSchedule(date, startHour, endHour, 15);
class Person {
    constructor(first, last, age, address) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.address = address;
    }
}
class Patient extends Person {
    constructor(id, first, last, age, address, phone, emergencyContact) {
        super(first, last, age, address);
        this.patientID = id;
        this.phoneNumber = phone;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = [];
    }
    printPatientest() {
        return this;
    }
    addMedicalHistory(appointment) {
        var _a, _b;
        this.medicalHistory.push({
            date: (_a = appointment.appointment) === null || _a === void 0 ? void 0 : _a.date,
            doctor: (_b = appointment.appointment) === null || _b === void 0 ? void 0 : _b.doctor,
        });
    }
}
class MedicalStaff extends Person {
    constructor(first, last, age, address, staffID, position, department) {
        super(first, last, age, address);
        this.staffID = staffID;
        this.position = position;
        this.department = department;
    }
}
class Doctor extends MedicalStaff {
    constructor(doctorID, specialization, first, last, age, address, staffID, position, department, availability, range) {
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
class Appointment {
    constructor() {
        this.appointment = null;
        this.doctorId = null;
        this.patientId = null;
    }
    addAppointment(patient, doctor, date, time) {
        if (patient.age < doctor.range.min || patient.age > doctor.range.max)
            return "not in age range";
        let available = doctor.availability.findIndex((turn) => turn.date === date && turn.hour === time);
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
            }
            else {
                return "Queue not available";
            }
        }
    }
    printAppointment() {
        console.log(appointment);
    }
}
class MedicalRecord {
    constructor(visit, diagnosis, prescription) {
        this.doctorId = visit.doctorId;
        this.patientId = visit.patientId;
        this.visit = visit;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
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
    createMedicalRecord(appoint) {
        this.allAppointments.push(appoint);
    }
    printAllAppointments() {
        console.log(this.allAppointments);
    }
    getDoctorSchedule(id) {
        return this.allAppointments.filter((appointment) => appointment.doctorId === id);
    }
    getMedicalRecords(id) {
        return this.allAppointments.filter((appointment) => appointment.patientId === id);
    }
    printAllAppointmentsByDate() {
        return this.allAppointments.filter((appointment) => { var _a; return ((_a = appointment.appointment) === null || _a === void 0 ? void 0 : _a.date) === new Date().toDateString(); });
    }
}
let patient = new Patient(1, "david", "re", 32, "sdfgks", 559767174, 25867024);
let patient2 = new Patient(12, "davjid", "rei", 42, "sdffgks", 5597675174, 250867024);
let doctor = new Doctor(5, "doc", "clara", "leon", 42, "ghbhhnj", 15, "hbh0", "jnj", check, { min: 15, max: 55 });
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
