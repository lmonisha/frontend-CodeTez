import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SalaryComponent } from './salary/salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path:'',component:LoginComponent,
  },
  {
    path:'dashboard',component:SideNavComponent
  },
  {
    path:'Employees',component:EmployeeComponent
  },
  {
    path:'NewEmployee',component:EmpNewComponent
  },
  {
    path:'Salary',component:SalaryComponent
  },
  {
    path:'viewSalary',component:SalaryViewComponent
  },{
    path:'login',component:LoginComponent

  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
