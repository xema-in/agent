import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({

  exports: [
    MatButtonModule, MatCardModule, MatDialogModule, MatTableModule, MatSortModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule,
    MatTabsModule, MatSidenavModule, MatBadgeModule, MatFormFieldModule, MatIconModule,
    MatToolbarModule, MatDividerModule, MatGridListModule, MatSelectModule, MatProgressBarModule,
    MatChipsModule, MatPaginatorModule, MatMenuModule,
  ],

})
export class AppMaterialComponentsModule { }
