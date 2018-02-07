import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as $ from 'jquery';

//let $ = require('jquery');
// declare var jquery:any;
// declare var $ :any;

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})


export class ConnectionComponent implements OnInit {

  newLogin:boolean = true;
  loginForm: FormGroup;
  signinForm: FormGroup;
  
  


  constructor(private _connectionService: ConnectionService,private fb: FormBuilder) { 
    this.createloginForm();
    this.createSignInForm();
  }


  createloginForm() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(4)]]
    });
  }

  createSignInForm(){
    this.signinForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required,Validators.email]],
      username: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required,Validators.minLength(4)]],
        passwordConf: ['', [Validators.required,Validators.minLength(4)]]
      }, {validator: this.passwordConfirming})
    });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if(c.get('password').value !== c.get('passwordConf').value) {
        return {invalid: true};
    }
}

  ngOnInit() {
  }
  
  change(){
    this.newLogin = !this.newLogin;
  }

  logIn(){
    if(this.loginForm.valid){
      this._connectionService.login(this.loginForm.value);
    }
  }

  signIn(){
    if(this.signinForm.valid){
      console.log(this.signinForm.value)
      //this._userService.signIn(this.signinForm.value);
    }
  }

}
