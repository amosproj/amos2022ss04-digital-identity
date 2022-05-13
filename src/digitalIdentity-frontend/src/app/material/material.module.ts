import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';




const MaterialComponets = [MatButtonModule, MatInputModule, MatCardModule, MatDividerModule, MatIconModule, MatSelectModule]

@NgModule({
  imports: [
    MaterialComponets
  ],
  exports: [
    MaterialComponets
  ]
})
export class MaterialModule { }
