import { Component, OnInit } from '@angular/core';
import { HRManagers } from '../HRManagers';
import { CreateHrDetailsService } from '../create-hr-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HRManager } from './HRManager';
import { HttpClient } from '@angular/common/http';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-create-hr-details',
  templateUrl: './create-hr-details.component.html',
  styleUrls: ['./create-hr-details.component.css']
})
export class CreateHrDetailsComponent implements OnInit {
  responseData :  any;
  searchHRValue:string;
  theHRManager:HRManager;
  constructor(private httpClient:HttpClient,private dialog: MatDialog, private router:Router,private toastr: ToastrService) { 
  }
  
  ngOnInit(): void {
    this.displayAllHr();
  }

  createNewHR(){
    this.router.navigate([`${"addNewHrManager"}`])
  }

  displayAllHr(){
    let responseUrl = this.httpClient.get("http://localhost:9095/hrManager/viewAllHRManagers");
    responseUrl.subscribe((responseData) => {
    this.responseData = responseData;
    console.log(responseData); });
  }

  deleteHrManager(hrManagerUserName:string){
    let dialogRef = this.dialog.open(MessageBoxComponent,
      {
        data:{name:"Please refresh this page to see updated data"},
        height: "250px",
        width: "400px",
        position: { bottom: "20%" }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log(hrManagerUserName);
        this.theHRManager=new HRManager(hrManagerUserName);
        console.log(this.theHRManager);
        let responseDataBack = this.httpClient.post<HRManager>("http://localhost:9095/hrManager/deleteHRManager",this.theHRManager);
        responseDataBack.subscribe((responseData) => {

          this.responseData = responseData;
          console.log(responseData); 
          //this.toastr.success("Please refresh this page to see updated data", "Success");
          



        });
      }

    });
    // console.log(hrManagerUserName);
    // this.theHRManager=new HRManager(hrManagerUserName);
    // console.log(this.theHRManager);
    // let responseUrl = this.httpClient.post<HRManager>("http://localhost:9095/hrManager/deleteHRManager",this.theHRManager);
    // responseUrl.subscribe((responseData) => {
    //   this.responseData = responseData;
    //   console.log(responseData); 
    //   this.toastr.success("HR details deleted successfully", "Success");
    // });
      //this.router.navigate(['/HrDetails'])
     
    // alert("Please refresh this page to see updated data");
  }
  
}
