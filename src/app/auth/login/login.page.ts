import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import AppUtils from '../../utils/app.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  data: any = { username: "", password: "" };

  error: string;


  constructor(private router: Router, private appUtils: AppUtils) {
  }

  ngOnInit() {

  }

  login() {
    var requestBody = { user_name: '', user_pass: '' };
    requestBody.user_name = this.data.username;
    requestBody.user_pass = this.data.password;
    var postData = "myData=" + JSON.stringify(requestBody);
    var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8' } }
    this.appUtils.callHttpApi('http://qna.ravindrababuravula.com/source/c/ClientCtrl.php/login', postData, headers, "POST").subscribe(data => {
      console.log("Login Success " + JSON.stringify(data));
      if(data.status == "success"){
        this.router.navigateByUrl("areas");
      }else{
        this.error="Invalid username and password";        
      }
      
    });
  }
  
}
