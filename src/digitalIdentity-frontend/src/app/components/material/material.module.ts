import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

//module for DD/MM/YYYY date format
import { MAT_DATE_LOCALE } from '@angular/material/core';

const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatSelectModule,
  MatGridListModule,
  MatTableModule,
  MatDialogModule,
  MatTabsModule,
  MatMenuModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatRadioModule,
];
const MaterialDatePicker = [MatDatepickerModule, MatNativeDateModule];
@NgModule({
  imports: [MaterialComponents, MaterialDatePicker],
  exports: [MaterialComponents, MaterialDatePicker],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class MaterialModule {}
