import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

constructor(private httpClient: HttpClient ) { }


  students: Array<Student> = [{
    "id": 1,
    "name": "Nathan",
    "email": "nathan@gmail.com",
    "password": "123456",
    "monthlyPayment": 350,
    "inclusionDate": "2022-04-13T14:32:18.556Z"
  }];

  options = { 
    headers: {
    'Content-Type': 'aplication/json'
  }
}
  

  getDefaultStudent(): Student {
    const dateToday = moment().format('YYYY/MM/DD');
    return {     
      name: '',
      email: '',
      password: '',
      monthlyPayment: 0,
      inclusionDate: dateToday,
      lastMontlyPayment: dateToday,
      validRegistration: true,
      course: ''
    }
  }
  getStudents() {
    return this.httpClient.get<Array<Student>>(environment.baseUrlBackEnd, this.options)
  }

  getStudentByEmailAndPassword(email: string | undefined, password: string | undefined) {
    return this.students.find((student) => student.email === email && student.password === password);
  }

  getStudentById(id: number) {
    return this.httpClient.get<Student>(`${environment.baseUrlBackEnd}/id/${id}`, this.options)
  }


  remove(id: number){
    return this.httpClient.delete<any>(`${environment.baseUrlBackEnd}/remove/${id}`, this.options)
  }

  getStudentByName(name: string) {
    return this.students.find((student) => student.name === name);
  }

  getStudentsByFilterName(name: string) {
    return this.students.filter((student) => student.name.toUpperCase().search(name.toUpperCase()) > -1);
  }

  getStudentsByFilterId(id: number) {
    const student = this.getStudentById(Number(id));
    if(!student) {
      return [];
    }
    return [student];
  }

  createStudent(student: Student) {
    return this.httpClient.post(`${environment.baseUrlBackEnd}/create`, student, this.options)
  }

  updateStudent(id: number, body: {name: string, email: string}){
    return this.httpClient.put<any>(`${environment.baseUrlBackEnd}/update/${id}`, body, this.options)
  }

 }
