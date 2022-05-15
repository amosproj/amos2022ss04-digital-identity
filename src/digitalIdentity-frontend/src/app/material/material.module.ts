import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

const MaterialComponents = [MatButtonModule, MatInputModule, MatCardModule, MatDividerModule, MatIconModule, MatSelectModule]
const MaterialDatePicker = [ MatDatepickerModule, MatNativeDateModule]
@NgModule({
  imports: [
    MaterialComponents,
    MaterialDatePicker
  ],
  exports: [
    MaterialComponents,
    MaterialDatePicker
  ]
})
export class MaterialModule { }
