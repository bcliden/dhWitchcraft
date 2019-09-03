import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./pages/main/main.component";
import { AuthorsPageComponent } from "./pages/authors/authors.component";
import { WorksCitedPageComponent } from "./pages/workcited/workscited.component";
import { FiguresPageComponent } from "./pages/figures/figures.component";

const routes: Routes = [
  { path: "authors", component: AuthorsPageComponent },
  { path: "workscited", component: WorksCitedPageComponent },
  { path: "figures", component: FiguresPageComponent },
  { path: "", component: MainPageComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
