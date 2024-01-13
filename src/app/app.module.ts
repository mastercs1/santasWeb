import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { NavbarModule } from './nav-bar/nav-bar.module';
import { SelectComponent } from './shared/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { TimepickerComponent } from './shared/timepicker/timepicker.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,    
    CommonModule,
    NavbarModule,
    MatSelectModule,
    TimepickerComponent,
    SelectComponent,
    MatDialogModule,
  ],
  exports:[
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
