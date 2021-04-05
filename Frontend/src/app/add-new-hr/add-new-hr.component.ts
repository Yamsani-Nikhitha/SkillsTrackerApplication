import { Component, OnInit } from '@angular/core';
import { HRManagers } from '../HRManagers';
import { CreateHrDetailsService } from '../create-hr-details.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-hr',
  templateUrl: './add-new-hr.component.html',
  styleUrls: ['./add-new-hr.component.css']
})
export class AddNewHRComponent implements OnInit {

  theHrManager : HRManagers=new HRManagers();
  responseData: any;
  constructor(private theAddService : CreateHrDetailsService,
    private router:Router,
    private httpClient : HttpClient,
    private dialog: MatDialog,
    private toastr: ToastrService
    ) { }
  ngOnInit(): void {
  }
  logout(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }

  addNewHrManager(){
    console.log(this.theHrManager);
    // let responseDataBack =  this.theAddService.addNewHrManager(this.theHrManager);
    let dialogRef = this.dialog.open(DialogBoxComponent,
      {
        height: "250px",
        width: "400px",
        position: { bottom: "20%" }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          let responseDataBack =  this.httpClient.post<HRManagers>("http://localhost:9090/hrManager/addnew",this.theHrManager);
          responseDataBack.subscribe((responseData) => {
            this.toastr.success("New HR Added successfully...", "Success");
            this.router.navigate([`${"HrDetails"}`]);
         
            // if (responseData.statusCode == 200) {
  
            //   this.toastr.success(responseData.message, "Success");
            //   this.router.navigate(['/search-associate'])
            // }
            // else {
            //   this.toastr.error(responseData.message, "Error");
  
            // }
  
  
  
          });
        }
  
      });


  }
}
