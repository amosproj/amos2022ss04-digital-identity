import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteredTableComponent } from './filtered-table/filtered-table.component';
import { EditWindowPopUpComponent } from './pop-up/edit-window-pop-up/edit-window-pop-up.component';
import { InformationPopUpComponent } from './pop-up/information-pop-up/information-pop-up.component';
import { MaterialModule } from '../components/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SchemaPopUpComponent } from './pop-up/schema-pop-up/schema-pop-up.component';
// import { DeleteIconClickableComponent } from './delete-icon-clickable/delete-icon-clickable.component';

// components = [
//   FilteredTableComponent,
//   DeleteIconClickableComponent,
// ]

@NgModule({
  declarations: [
    FilteredTableComponent,
    EditWindowPopUpComponent,
    InformationPopUpComponent,
    SchemaPopUpComponent,
  ],
  exports: [
    FilteredTableComponent,
    EditWindowPopUpComponent,
    InformationPopUpComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class SharedModule {}
