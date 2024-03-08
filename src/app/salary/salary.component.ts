import { Component } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalaryService } from './salary.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {
  constructor(private empservice: EmployeeService, private salservice: SalaryService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }
  employeeTypes!: []
  employeeList: any

  employeeForm!: FormGroup;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  selectedYear: number = new Date().getFullYear(); // default to current year
  years: number[] = this.generateYears();
  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  }
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeType: [''],
      selectedMonth: [''],
      selectedYear: [''],
      DaySalary: [''],
      workingDays: [''],
      totalmonthsalary: [''], totalyearsalary: ['']
      // Add other form controls here
    });
    this.getAllEmployess()
  }


  getAllEmployess() {
    this.empservice.getAllEmployees().subscribe((data) => {
      console.log(data.result)

      let resultArr = data.result
      let firstName = resultArr.map((val: any) => {
        let mapResult = val['firstName'] + '|' + val['id']
        return mapResult
      })
      this.employeeTypes = firstName;
    })
  }
  calculate() {
    const selectedMonth = this.employeeForm.get('selectedMonth')?.value;
    const selectedYear = this.employeeForm.get('selectedYear')?.value;
    console.log('Selected Year:', selectedYear, 'Selected Month:', selectedMonth);
    const monthNumber = getMonthNumber(selectedMonth);
    const totalWorkingDay = this.calculateTotalWorkingDays(selectedYear, monthNumber)
    const totalSalForMonth = this.calculateTotalSalaryForMonth(selectedYear, monthNumber)
    console.log('totalSalForMonth----------------->', totalSalForMonth)
    const totalSalForYear = this.calculateTotalSalaryForYear(selectedYear)
    console.log('totalSalForYear----------------->', totalSalForYear)

    this.employeeForm.patchValue({
      workingDays: totalWorkingDay,
      totalmonthsalary: totalSalForMonth,
      totalyearsalary: totalSalForYear
    })

  }

  calculateTotalWorkingDays(year: number, monthNumber: number) {

    console.log('year----------->', year)
    console.log('month----------->', monthNumber)

    const totalDaysInMonth = new Date(year, monthNumber, 0).getDate();
    console.log('totalDaysInMonth-----------', totalDaysInMonth)

    let totalWorkingDays = 0;
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const currentDate = new Date(year, monthNumber - 1, day);
      // Exclude weekends (Ssaturday and Sunday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        totalWorkingDays++;
      }
    }
    console.log('totalWorkingDays-----------', totalWorkingDays)
    return totalWorkingDays;
  }

  calculateTotalSalaryForMonth(year: number, month: number): number {
    const perDaySalary = this.employeeForm.get('DaySalary')?.value;

    const totalWorkingDays = this.calculateTotalWorkingDays(year, month);
    return perDaySalary * totalWorkingDays;
  }

  calculateTotalSalaryForYear(year: number): number {
    let totalSalary = 0;
    for (let month = 1; month <= 12; month++) {
      totalSalary += this.calculateTotalSalaryForMonth(year, month);
    }
    return totalSalary;
  }
  formsubmit(employeeForm: any) {
    console.log('on for addd employee----->', employeeForm.value)
    let employee = employeeForm.value.employeeType
    console.log('employee-------------->',employee)
    employee = employee.split('|')
    console.log('employee-------------->',employee)

    let obj = {
      empId: employee[1], empName: employee[0],
      DaySalary: employeeForm.value.DaySalary,
      workingDays: employeeForm.value.workingDays,
      totalmonthsalary: employeeForm.value.totalmonthsalary,
      totalyearsalary: employeeForm.value.totalyearsalary,
      selectedMonth: employeeForm.value.selectedMonth,
      selectedYear: employeeForm.value.selectedYear,
    }

    console.log('obj==========>', obj)


    this.salservice.createSalary(obj).subscribe((data:any) => {
      console.log('data==========>', data)
      let message=data?.message||''
      this.toastr.success(message, 'Success')
    })
  }

  View() {
    this.router.navigate(['/viewSalary'])
  }

}


function getMonthNumber(monthName: string): number {
  const months: { [key: string]: number } = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
  };

  return months[monthName];
}