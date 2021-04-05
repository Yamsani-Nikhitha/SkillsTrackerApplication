import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../admin-login.service';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  theAdmin : Admin = new Admin();
  responseFromAdminLoginApi: any;
  adminLoginResult:string="";
  constructor(private router:Router,
    private theAdminLoginService : AdminLoginService,private toastr: ToastrService,private header:AppComponent) { }

  ngOnInit(): void {
    this.header.ngOnInit();
  }
  adminLogin(pageName:string):void{
    let responseDataBack =  this.theAdminLoginService.adminLogin(this.theAdmin);
      responseDataBack.subscribe((responseData) =>{
      this.responseFromAdminLoginApi = responseData;
        console.log(responseData);
        this.adminLoginResult=this.responseFromAdminLoginApi.loginResult;
        console.log("Login Result: "+this.adminLoginResult);
        if(this.adminLoginResult=="Login Successfully"){
          this.toastr.success(this.adminLoginResult, "Success");
          this.router.navigate([`${pageName}`])
        }
        else{
          this.toastr.error(this.adminLoginResult, "Error");
          //alert("Login Failed due to below Reason:\n"+this.adminLoginResult);
        }
      });
  }
}


