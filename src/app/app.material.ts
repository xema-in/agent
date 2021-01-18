import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatAutocompleteModule, MatTabsModule, MatSidenavModule, MatToolbarModule, MatDividerModule,
  MatGridListModule, MatBadgeModule , MatSelectModule, MatProgressBarModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

@NgModule({

  imports: [
    MatButtonModule, MatCardModule, MatDialogModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatAutocompleteModule, MatTabsModule, MatSidenavModule,
    MatFormFieldModule, MatIconModule, MatBadgeModule, MatSelectModule, MatProgressBarModule
  ],

  exports: [
    MatButtonModule, MatCardModule, MatDialogModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatAutocompleteModule, MatTabsModule, MatSidenavModule, MatBadgeModule,
    MatFormFieldModule, MatIconModule, MatToolbarModule, MatDividerModule, MatGridListModule , MatSelectModule, MatProgressBarModule
  ],

})
export class AppMaterialComponentsModule { }
