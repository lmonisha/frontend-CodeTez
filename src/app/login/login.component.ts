import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private loginservice: LoginService) { }
  loginForm!: FormGroup
  ngOnInit() {
    this.loginForm = this.fb.group({
      emailId: [''],
      password: ['']
    })
  }

  submit() {
    console.log('loginform values------------>', this.loginForm.value)
    let userEmailId = this.loginForm.value.emailId
    let userPasswrd = this.loginForm.value.password



    let value = this.loginservice.loginCheck(userEmailId, userPasswrd)
    console.log('value---->',value)
    if (value) {
      this.router.navigate(['/dashboard'])

    }
  }
}

