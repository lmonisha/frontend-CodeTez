import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router:Router) { }
  isLoggedIn:boolean=false
  
  loginCheck(userEmailId:any,password:any){
    if (userEmailId == 'lmonisha12@gmail.com' && password == 'xxxxxxxxyyyyy') {
      this.isLoggedIn=true; 
    }
    console.log('this.isLoggedIn------------>',this.isLoggedIn)
      return this.isLoggedIn
    
  }

}
