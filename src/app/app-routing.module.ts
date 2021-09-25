import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./pages/main/main.component";
import { AuthorsPageComponent } from "./pages/authors/authors.component";
import { WorksCitedPageComponent } from "./pages/workcited/workscited.component";

const routes: Routes = [
  { path: "authors", component: AuthorsPageComponent },
  { path: "workscited", component: WorksCitedPageComponent },
  {
    path: "figures",
    loadChildren: () =>
      import("./features/figures/figures.module").then(mod => mod.FiguresModule)
  },
  { path: "", component: MainPageComponent, pathMatch: "full" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
