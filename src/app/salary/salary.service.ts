import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http:HttpClient) { }

  getAllSalary(){
    return this.http.get<any>('http://localhost:8000/getAllSalary')
  }

  updateSalary(emp:any){
    let body={}
    return this.http.post('http://localhost:8000/updateSalary',emp)
  }

  deleteSalary(emp:any){
    return this.http.post('http://localhost:8000/deleteSalary',emp)

  }

  createSalary(emp:any){
    return this.http.post('http://localhost:8000/createSalary',emp)
  }

}
