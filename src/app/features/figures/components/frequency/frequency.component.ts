import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FiguresService } from "src/app/features/figures/figures.service";
import { ChartFinderService } from "src/app/features/figures/chartFinder.service"
import { Observable, Subject } from "rxjs";
import { switchMap, tap, takeUntil } from "rxjs/operators";
import { Movie } from "../../types";

import { drawChart } from '../../d3logic.js'

@Component({
  selector: "app-frequency",
  template: `
  <app-heading [_title]="movie.title">
    <!-- <p>frequency works!</p> -->
    <div ngModel #charts></div>
  </app-heading>
  `,
  styles: [``]
})
export class FrequencyComponent implements OnInit {
  @ViewChild('charts', { static: true }) charts; 

  movie: Movie;

  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private figuresService: FiguresService,
    private chartFinder: ChartFinderService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap) => {
        this.movie = this.figuresService.getMetadata(params.get("slug"));
        this.draw(
          this.charts.nativeElement, 
          this.chartFinder.getChartsByPrimary(this.movie.slug)
        )
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  draw(el: HTMLElement, files: Array<string>) {
    for (const [idx, file] of files.entries()) drawChart(el, file, idx);
  }
}
