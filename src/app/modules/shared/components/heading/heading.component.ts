import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-heading",
  template: `
  <section [ngClass]="classes">
    <h3>{{ _title }}</h3>
    <ng-content></ng-content>
  </section>
  `,
  styles: [``]
})
export class HeadingComponent implements OnInit {
  @Input() classes: string;
  @Input() _title: string;

  constructor() {}

  ngOnInit() {}
}
