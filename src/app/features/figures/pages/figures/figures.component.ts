import { Component, OnInit } from "@angular/core";
import { FiguresService } from "src/app/features/figures/figures.service";

@Component({
  selector: "app-figures",
  template: `
  <section class="contained hero">
    <h1 class="title">Figures</h1>
    <router-outlet></router-outlet>
  </section>
`,
  styles: []
})
export class FiguresPageComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
