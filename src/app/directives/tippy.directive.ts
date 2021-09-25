import { Directive, Input, ElementRef, OnInit } from "@angular/core";
import tippy from "tippy.js";

const tippyOptions: any = {
  arrow: true,
  size: "large",
  interactive: true,
  placement: "bottom",
  delay: [200, 600]
};

@Directive({
  selector: "[tippy]"
})
export class TippyDirective implements OnInit {
  // @Input('tippyOptions') public tippyOptions: object;

  constructor(private el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
    // tippy(this.el.nativeElement, this.tippyOptions || {});
    tippy(this.el.nativeElement, tippyOptions);
  }
}
