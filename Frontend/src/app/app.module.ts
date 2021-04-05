import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchAssociateComponent } from './search-associate/search-associate.component';
import { UpdateAssociateComponent } from './update-associate/update-associate.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddAssociateComponent } from './add-associate/add-associate.component';
import { UpdateAssociateDetailsComponent } from './update-associate-details/update-associate-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { CreateHrDetailsComponent } from './create-hr-details/create-hr-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MessageBoxComponent } from './message-box/message-box.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddNewHRComponent } from './add-new-hr/add-new-hr.component';
import { EditHrDetailsComponent } from './edit-hr-details/edit-hr-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchAssociateComponent,
    UpdateAssociateComponent,
    BarGraphComponent,
    AddSkillComponent,
    AddAssociateComponent,
    UpdateAssociateDetailsComponent,
    LoginPageComponent,
    CreateHrDetailsComponent,
    DialogBoxComponent,
    MessageBoxComponent,
    AdminLoginComponent,
    AddNewHRComponent,
    EditHrDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ChartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
  
  ],
  entryComponents:[DialogBoxComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
