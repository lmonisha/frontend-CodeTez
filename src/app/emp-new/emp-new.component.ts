import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {EmployeeService} from '../employee/employee.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-new',
  templateUrl: './emp-new.component.html',
  styleUrls: ['./emp-new.component.css']
})

export class EmpNewComponent implements OnInit {
  constructor(private fb: FormBuilder,private empservice:EmployeeService ,private toastr: ToastrService) { }
  newempForm!: FormGroup
  ngOnInit() {
    this.newempForm = this.fb.group({
      firstName: [''],
      lastName:[''],
      
      gender: [''],
      role: [''],
      designation: [''],
      phoneno: [''],
      email: [''],
      address:['']
    })
  }

  addUser() {
    console.log('newempForm----->', this.newempForm.value)
    let empValues=this.newempForm.value
    this.empservice.createUser(empValues).subscribe((data:any)=>{
      console.log('data==========>',data)
      let message=data?.message||''
      this.toastr.success(message, 'Success')
    })
  }

}
