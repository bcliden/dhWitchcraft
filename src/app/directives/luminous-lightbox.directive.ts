import { Directive, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { Luminous } from "luminous-lightbox";

const options = {
  // Prefix for generated element class names (e.g. `my-ns` will
  // result in classes such as `my-ns-lightbox`. Default `lum-`
  // prefixed classes will always be added as well.
  namespace: null,
  // Which attribute to pull the lightbox image source from.
  // sourceAttribute: 'href',
  sourceAttribute: "src",
  // Captions can be a literal string, or a function that receives the Luminous instance's trigger element as an argument and returns a string. Supports HTML, so use caution when dealing with user input.
  caption: null,
  // The event to listen to on the _trigger_ element: triggers opening.
  openTrigger: "click",
  // The event to listen to on the _lightbox_ element: triggers closing.
  closeTrigger: "click",
  // Allow closing by pressing escape.
  closeWithEscape: true,
  // Automatically close when the page is scrolled.
  closeOnScroll: false,
  // A selector defining what to append the lightbox element to.
  appendToSelector: "body",
  // If present (and a function), this will be called
  // whenever the lightbox is opened.
  onOpen: null,
  // If present (and a function), this will be called
  // whenever the lightbox is closed.
  onClose: null,
  // When true, adds the `imgix-fluid` class to the `img`
  // inside the lightbox. See https://github.com/imgix/imgix.js
  // for more information.
  includeImgixJSClass: false,
  // Add base styles to the page. See the "Theming"
  // section of README.md for more information.
  injectBaseStyles: true
};

@Directive({
  selector: "[luminousLightbox]"
})
export class LuminousLightboxDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    new Luminous(this.el.nativeElement, options);
  }
}
