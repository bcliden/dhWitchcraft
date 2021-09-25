import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FiguresPageComponent } from "./pages/figures/figures.component";
import { FrequencyComponent } from "./components/frequency/frequency.component";
import { ListComponent } from "./components/list/list.component";

const routes: Routes = [
  {
    path: "",
    component: FiguresPageComponent,
    children: [
      { path: "", component: ListComponent },
      { path: "frequency/:slug", component: FrequencyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiguresRoutingModule {}
