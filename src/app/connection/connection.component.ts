import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services';
import * as $ from 'jquery';

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

  constructor(private _connectionService: ConnectionService) { }

  ngOnInit() {
  }
  
  change(){
    this.newLogin = !this.newLogin;
  }

  logIn(): void {
    var form = $('#loginForm');
    var verif = verifChamps(form);
    if(verif === "OK" && ($("#pwd_sign").val() != $("#pwd_conf").val())){
      verif = "Les password ne sont pas identiques";
    }

    if (verif === "OK") {
      var json = getJsonValues(form);

      //Call service
      this._connectionService.login(json);

    } else {
      //Champs invalides
      console.log("" + verif)
      //this._alertService.error("" + verif);

    }

  }

  signIn(): void {
    var form = $('#signinForm');
    var pass = $(form).find("input[name= 'password']").val();
    var confpass = $(form).find("input[name= 'confirmed_password']").val();

    var verif = verifChamps(form);

    if (pass === confpass && verif === "OK") {

      var json = getJsonValues(form);
      //this._userService.signIn(json);
    } else {
      //Champs invalides
      console.log("" + verif);
      //this._alertService.warning("" + verif);
    }
  }

}

function getJsonValues(form: HTMLElement): object {
  var values = {};

  $(form).find('input').each(function () {
    values[this.name] = $(this).val();
  });

  return values;
}

function verifChamps(form: HTMLElement): String {
  var ret = "OK";
  var pwd = "", pwdc = "";
  
  $(form).find('input').each(function () {

    if (($(this).val() === "") && ret === "OK") {
      ret = "You have to fill all the fields";
    } else if ($(this).attr('name') === "mail" && ret === "OK") {
      var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
      if (!pattern.test($(this).val())) {
        ret = "Invalid mail";
      }
    } else if (ret === "OK" && ($(this).attr('name') === "password")&& $(this).val().length < 4) {
        ret = "Password : 4 characters minimum";
    }
  });

  return ret;
}
