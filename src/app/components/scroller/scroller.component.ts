import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  ChangeDetectionStrategy,
  OnDestroy,
  QueryList
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, debounceTime, takeUntil, tap } from "rxjs/operators";
import { Observable, fromEvent, Subscription, Subject } from "rxjs";
import scrollama from "scrollama";
import { DriftzoomDirective } from "src/app/directives/driftzoom.directive";
import { RequiredRefs } from "src/app/types/driftZoom";
import { Drift } from "src/assets/scripts/Drift";

const getNativeElement = el => el.nativeElement;
const getDriftInstance = directive => directive.drift;

@Component({
  selector: "app-scroller",
  templateUrl: "./scroller.component.html",
  styleUrls: ["./scroller.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollerComponent implements OnInit, AfterViewInit, OnDestroy {
  // this observable is emits true whenever the viewport is <959px
  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map(result => result.matches));

  @ViewChild("scrollContainer", { static: true })
  scrollContainerRef: ElementRef;
  @ViewChild("scrollText", { static: true }) scrollTextRef: ElementRef;
  @ViewChild("scrollGraphic", { static: true }) scrollGraphicRef: ElementRef;
  @ViewChild("chart", { static: true }) chartRef: ElementRef;

  @ViewChildren("step") steps: any;
  @ViewChildren(DriftzoomDirective)
  driftZoomInstances: QueryList<DriftzoomDirective>;

  stepRefs: HTMLElement[];
  imageRefs: HTMLElement[];
  driftInstanceRefs: Drift[];
  driftZoomRefs: RequiredRefs;
  scroller: any; // scrollama instance

  resizeListener: Subscription;
  destroy$ = new Subject();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.driftZoomRefs = {
      scrollGraphic: this.scrollGraphicRef,
      scrollText: this.scrollTextRef,
      chart: this.chartRef
    };
  }

  ngAfterViewInit() {
    this.buildRefArrays();
    this.initScrollama();
    this.windowResizeListener();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleResize() {
    const graphic = this.scrollGraphicRef.nativeElement;
    const text = this.scrollTextRef.nativeElement;
    const chart = this.chartRef.nativeElement;

    // 1. update height of step elems for room between steps

    const stepHeight = Math.floor(window.innerHeight * 0.25);
    this.stepRefs.forEach(function(singleStep) {
      singleStep.style.marginBottom = `${stepHeight}px`;
    });

    // 2. update height of graphic elem

    graphic.style.height = window.innerHeight + "px";

    // 3. update width of chart by subrtacting from text width

    const textWidth = text.offsetWidth;
    const bodyWidth = document.body.offsetWidth;
    const chartWidth = bodyWidth - textWidth - 32;

    // make the height of 1/2 of viewport
    const chartHeight = Math.floor(window.innerHeight * 0.95);

    chart.style.width = chartWidth + "px";
    chart.style.height = chartHeight + "px";

    // zoom factor recalced on resize. smaller screen -> larger zoom
    this.driftInstanceRefs.forEach(drift => {
      if (drift.triggerEl.classList.contains("boxOffice")) {
        drift.zoomFactor = (3.5 / bodyWidth) * 10 ** 3;
      } else if (drift.triggerEl.classList.contains("imageplot")) {
        drift.zoomFactor = (6 / bodyWidth) * 10 ** 3;
      } else {
        drift.zoomFactor = (4 / bodyWidth) * 10 ** 3;
      }
    });

    // 4. tell scrollama to update new elem dimensions
    this.scroller.resize();
  }

  windowResizeListener() {
    this.resizeListener = fromEvent(window, "resize")
      .pipe(
        // debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(this.handleResize.bind(this)); // must bind this to access class props
  }

  /*
    map over the QueryLists and return an array of nativeElements or driftInstances
  */
  buildRefArrays() {
    this.stepRefs = this.steps.map(getNativeElement);
    this.imageRefs = this.driftZoomInstances
      .map(dir => dir.el)
      .map(getNativeElement);
    this.driftInstanceRefs = this.driftZoomInstances.map(getDriftInstance);
  }

  /*
    setup scroller and define utility functions
  */
  initScrollama() {
    this.scroller = scrollama();
    this.scroller
      .setup({
        container: this.scrollContainerRef.nativeElement, // outermost element
        graphic: this.scrollGraphicRef.nativeElement, // the graphic
        text: this.scrollTextRef.nativeElement, // the step container
        step: this.stepRefs, // the steps
        offset: 0.7
      })
      .onStepEnter(response => {
        const { element, index, direction } = response;

        // make next step active
        this.stepRefs[index].classList.add("is-active");

        // make next image(s) active, deactivate all others
        this.imageRefs.forEach(el => {
          if (Number(el.dataset.step) === index) {
            el.classList.add("is-active");
          } else {
            el.classList.remove("is-active");
          }
        });
      })
      .onContainerEnter(response => {
        const graphic = this.scrollGraphicRef.nativeElement;
        graphic.classList.add("is-fixed");
        graphic.classList.remove("is-bottom");
      })
      .onContainerExit(response => {
        const graphic = this.scrollGraphicRef.nativeElement;
        graphic.classList.remove("is-fixed");
        if (response.direction === "down") {
          graphic.classList.add("is-bottom");
        } else {
          graphic.classList.remove("is-bottom");
        }
      });

    // resize only AFTER scrollama is initialized
    this.handleResize();
  }
}
