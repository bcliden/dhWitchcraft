import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FiguresRoutingModule } from "./figures-routing.module";
import { FiguresPageComponent } from "./pages/figures/figures.component";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { FrequencyComponent } from './components/frequency/frequency.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [FiguresPageComponent, FrequencyComponent, ListComponent],
  imports: [CommonModule, FiguresRoutingModule, SharedModule]
})
export class FiguresModule {}
