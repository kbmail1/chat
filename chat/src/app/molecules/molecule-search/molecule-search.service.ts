import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, pipe, Subscription, take, takeWhile, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoleculeSearchService {

  private searchTextSub = new BehaviorSubject<string[]>([]);
  readonly searchText$ = this.searchTextSub.asObservable();

  constructor() { }

  getSearchResults = (searchText: string) => {
    const result = {
      body: [
        'one',
        'two',
        'three',
      ]
    }
   return this.searchTextSub.next(result.body);
  }
}
