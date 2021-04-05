import { Component, OnInit } from '@angular/core';
import { HRManagers } from '../HRManagers';
import { Admin } from '../admin';
import { Router } from '@angular/router';
import { AdminLoginService } from '../admin-login.service';
import { HrLoginService } from '../hr-login.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  div1:boolean=true;
  div2:boolean=false;
  theHrManager : HRManagers = new HRManagers();
  theAdmin : Admin = new Admin();
  responseFromHrLoginApi: any;
  hrLoginResult:string="";
  responseFromAdminLoginApi: any;
  adminLoginResult:string="";

  constructor(private router:Router,
    private theHrLoginService : HrLoginService,
    private theAdminLoginService : AdminLoginService,
    private toastr: ToastrService,
    private header:AppComponent) { }

  ngOnInit(): void {
    this.header.ngOnInit();
    }

  ActivateHrLogin(){
    this.div1=true;
    this.div2=false;
    document.getElementById('hrLogindiv').style.backgroundColor='blanchedalmond';
    document.getElementById('adminLogindiv').style.backgroundColor='royalblue';
  }

  ActivateAdminLogin(){
    this.div2=true;
    this.div1=false;
    document.getElementById('adminLogindiv').style.backgroundColor='blanchedalmond';
    document.getElementById('hrLogindiv').style.backgroundColor='royalblue';
  }

  hrManagerLogin(pageName:string):void{
    let responseDataBack =  this.theHrLoginService.hrManagerLogin(this.theHrManager);
      responseDataBack.subscribe((responseData) =>{
      this.responseFromHrLoginApi = responseData;
        console.log(responseData);
        this.hrLoginResult=this.responseFromHrLoginApi.loginResult;
        console.log("Login Result: "+this.hrLoginResult);
        if(this.hrLoginResult=="Login Successful"){
          console.log("success");
          localStorage.setItem('loginStatus',this.hrLoginResult);
          this.toastr.success(this.hrLoginResult, "Success");
          this.router.navigate([`${pageName}`])
          this.header.ngOnInit();
        }
        else{
          console.log("fail");
          this.toastr.error(this.hrLoginResult, "Error");
          //alert("Login Failed due to below Reason:\n"+this.hrLoginResult);
        }
      });
    
  }

  adminLogin(pageName:string):void{
    let responseDataBack =  this.theAdminLoginService.adminLogin(this.theAdmin);
      responseDataBack.subscribe((responseData) =>{
      this.responseFromAdminLoginApi = responseData;
        console.log(responseData);
        this.adminLoginResult=this.responseFromAdminLoginApi.loginResult;
        console.log("Login Result: "+this.adminLoginResult);
        if(this.adminLoginResult=="Login Successfully"){
         

          this.router.navigate([`${pageName}`])
        }
        else{
          alert("Login Failed due to below Reason:\n"+this.adminLoginResult);
        }
      });
  

  }
}
