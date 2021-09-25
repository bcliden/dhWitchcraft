import { Component, OnInit } from "@angular/core";
import { Links } from "../../types";
import { FiguresService } from "../../figures.service";

@Component({
  selector: "app-list",
  template: `
  <app-heading _title="Word Frequency" classes="blocks">
    <div class="block" *ngFor="let link of links.frequency">
      <a [routerLink]="['frequency', link.slug]">{{ link.title }}</a>
    </div>
  </app-heading>
`,
  styles: []
})
export class ListComponent implements OnInit {
  links: Links;

  constructor(private figuresService: FiguresService) {}

  ngOnInit() {
    this.links = this.figuresService.getLinks();
  }
}
