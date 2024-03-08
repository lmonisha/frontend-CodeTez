import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get<any>('http://localhost:8000/getAllEmployee')
  }

  updateEmployee(emp:any){
    let body={}
    return this.http.post('http://localhost:8000/update',emp)
  }

  deleteEmploye(emp:any){
    return this.http.post('http://localhost:8000/delete',emp)

  }

  createUser(emp:any){
    return this.http.post('http://localhost:8000/create',emp)
  }
  
}
