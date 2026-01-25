import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  contructor() { }
  loginUser(credentials: any) {
    return new Promise((accept, reject ) =>{
      if (
        credentials.email == "viany@gmail.com" &&
        credentials.password == "Viany1031@"
      ){
        accept ("login correcto");
      }else {
        reject("login incorrecto");
      
      }
    })
  }
  
}
