import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';



const MaterialComponets = [MatButtonModule, MatInputModule, MatCardModule, MatDividerModule]

@NgModule({
  imports: [
    MaterialComponets
  ],
  exports: [
    MaterialComponets
  ]
})
export class MaterialModule { }
