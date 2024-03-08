import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private empservice: EmployeeService,private router:Router ,private toastr: ToastrService) { }
  employeeList: any

  ngOnInit() {
    this.getAllEmployess()
  }


  addEmployee() {
    this.router.navigate(['/NewEmployee'])
  }
  getAllEmployess() {
    this.empservice.getAllEmployees().subscribe((data) => {
      console.log(data)
      this.employeeList = data.result;
      // Initialize editMode property for each employee object
      this.employeeList.forEach((emp: any) => {
        emp.editMode = false; // Set initial value to false
      });
      let message=data?.message||''
      this.toastr.success(message, 'Success')

      // this.employeeList =[{ 
      //   firstName: 'John',
      //   lastName: 'Doe',
      //   gender: 'Male',
      //   role: 'Developer',
      //   salary: 50000,
      //   email: 'john@example.com',
      //   phone: '123-456-7890',
      //   editMode: false, // Initialize editMode property
      //   deleteMode: false
      // }]
    })
  }

  toggleEditMode(emp: any) {
    if (emp.editMode) {
      console.log('emp.editMode------------->', emp.editMode)
      console.log('eployeeeeee------------->', emp)
      this.empservice.updateEmployee(emp).subscribe((data:any) => {
        console.log('data from update------>', data)
        let message=data?.message||''
        this.toastr.success(message, 'Success')
      })
    }
    emp.editMode = !emp.editMode

  }

  toggledeleteMode(emp: any) {
    console.log('eployeeeeee------------->', emp)

    this.empservice.deleteEmploye(emp).subscribe((data:any) => {
      console.log('data from update------>', data)
      let message=data?.message||''
      this.toastr.success(message, 'Success')
    })


  }
}
