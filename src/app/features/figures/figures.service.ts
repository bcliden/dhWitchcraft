import { Injectable, OnInit } from "@angular/core";
import { Movie, Links } from "./types";
import slugify from 'slugify'

const slug = str => slugify(str, {
  replacement: '_',
  // lower: true,
  remove: /[*+~.()'"!:@]/g
})

@Injectable({
  providedIn: "root"
})
export class FiguresService {
  private movies: Movie[] = [
    { id: 1, slug: slug("Halloweentown"), title: "Halloweentown", frequency: true },
    { id: 2, slug: slug("Harry Potter and the Sorcerer's Stone"), title: "Harry Potter and the Sorcerer's Stone", frequency: true },
    { id: 3, slug: slug("Blair Witch Project"), title: "Blair Witch Project", frequency: true },
    { id: 4, slug: slug("Snow White and the Seven Dwarfs"), title: "Snow White and the Seven Dwarfs", frequency: true },
    { id: 5, slug: slug("The Craft"), title: "The Craft", frequency: true },
    { id: 6, slug: slug("Witches of Eastwick"), title: "Witches of Eastwick", frequency: true }
  ];

  constructor() { }

  getLinks(): Links {
    return {
      frequency: this.movies.filter(el => el.frequency)
    };
  }

  getMetadata(slug: string): Movie {
    return this.movies.find(el => el.slug === slug);
  }
}
