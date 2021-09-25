import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SectionComponent } from "./components/section/section.component";
import { HeadingComponent } from "./components/heading/heading.component";

@NgModule({
  declarations: [SectionComponent, HeadingComponent],
  imports: [CommonModule],
  exports: [SectionComponent, HeadingComponent]
})
export class SharedModule {}
