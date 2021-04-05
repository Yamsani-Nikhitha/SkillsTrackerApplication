import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EditHRDetailsServiceService } from '../edit-hrdetails-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-edit-hr-details',
  templateUrl: './edit-hr-details.component.html',
  styleUrls: ['./edit-hr-details.component.css']
})
export class EditHrDetailsComponent implements OnInit {

  theHrManager : any;
  responseFromApi: any;
  hrManagerId : any;
  constructor(private route: ActivatedRoute,
    private theAddService : EditHRDetailsServiceService,
    private httpClient:HttpClient,
    private router:Router,
    private dialog: MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.hrManagerId = params.get('id');
      console.log(this.hrManagerId);
    });
    this.hrManagerFormEditableContent();
  }
  editHrManager(){
    let dialogRef = this.dialog.open(DialogBoxComponent,
      {
        height: "250px",
        width: "400px",
        position: { bottom: "20%" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          let responseDataBack =  this.theAddService.editHrManager(this.theHrManager);
          responseDataBack.subscribe((responseData) =>{
            this.responseFromApi = responseDataBack;
            console.log("Result is: " +responseDataBack);
            // alert("HR Details updated successfully");
            this.toastr.success("HR Details updated successfully...", "Success");
            this.router.navigate(['/HrDetails']);
          });
          }
  
      });
    // let responseDataBack =  this.theAddService.editHrManager(this.theHrManager);
    //   responseDataBack.subscribe((responseData) =>{
    //     this.responseFromApi = responseDataBack;
    //     console.log("Result is: " +responseDataBack);
    //     alert("HR Details updated successfully");
    //     this.router.navigate(['/HrDetails']);
    //   });
}
hrManagerFormEditableContent(){

  //gets details based on associate id 
  let responseDataBack = this.httpClient.get("http://localhost:9095/hrManager/getHrManagerByUserName/"+this.hrManagerId);
  responseDataBack.subscribe((responseData)=>
  {
    this.theHrManager = responseData;
    console.log(responseData);
  });
}

display(userName : any){
  console.log("Welcome " + userName.toString());
}

}