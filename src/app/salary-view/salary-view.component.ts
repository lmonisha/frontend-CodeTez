import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { SalaryService } from '../salary/salary.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrls: ['./salary-view.component.css']
})
export class SalaryViewComponent {
  employeeForm!:FormGroup
  salaryList:any
  constructor(private http:HttpClient,private formBuilder:FormBuilder,private salservice:SalaryService ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeType: [''],
      selectedMonth: [''],
      selectedYear: [''],
      DaySalary: [''],
      workingDays: [''],
      totalmonthsalary: [''],totalyearsalary:['']
      // Add other form controls here
    });
    this.getAllEmployessSalary()
  }

  getAllEmployessSalary(){
    this.salservice.getAllSalary().subscribe((data)=>{
      console.log('data-----',data)

      this.salaryList=data.result
      this.salaryList.forEach((emp: any) => {
        emp.editMode = false; // Set initial value to false
      });
    })
  }

  toggleEditMode(emp: any) {
    if (emp.editMode) {
      let obj = {
        empId: emp.empId, empName: emp.empName,
        DaySalary:emp.dayAmount ,
        workingDays: emp.workingDays ,
        totalmonthsalary:  emp.monthAmount,
        totalyearsalary: emp.yearAmount,
        selectedMonth: emp.monthFromUser,
        selectedYear: emp.yearFromUser ,
      }
  
      console.log('emp.editMode------------->', emp.editMode)
      console.log('eployeeeeee------------->', emp)

    console.log('obj==========>', obj)

      this.salservice.updateSalary(obj).subscribe((data:any) => {
        console.log('data from update------>', data)
        let message=data?.message||''
        this.toastr.success(message, 'Success')
      })
    }
    emp.editMode = !emp.editMode

  }

  
  toggledeleteMode(emp: any) {
    console.log('eployeeeeee------------->', emp)

    this.salservice.deleteSalary(emp).subscribe((data:any) => {
      console.log('data from update------>', data)
      let message=data?.message||''
      this.toastr.success(message, 'Success')
    })


  }


}
