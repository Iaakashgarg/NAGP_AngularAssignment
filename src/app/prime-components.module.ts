import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import {CarouselModule} from 'primeng/carousel';
import {DividerModule} from 'primeng/divider';
import {StepsModule} from 'primeng/steps';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

const modules = [
  CardModule,
  MenubarModule,
  ButtonModule,
  DataViewModule,
  PanelModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  RippleModule,
  RatingModule,
  FormsModule,
  CarouselModule,
  DividerModule,
  StepsModule,
  ConfirmDialogModule,
  OrganizationChartModule,
  TableModule,
  TooltipModule
];
@NgModule({
  imports: [
    modules
  ],
  exports: [modules]
})
export class PrimeComponentsModule { }
