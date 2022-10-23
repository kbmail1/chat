import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, pipe, Subscription, take, takeWhile, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'molecule-search',
  templateUrl: './molecule-search.component.html',
  styleUrls: ['./molecule-search.component.scss']
})
export class MoleculeSearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchResults: any = []
  searchText: string = ''

  constructor(
    protected httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    // https://fireflysemantics.medium.com/debouncing-your-angular-search-field-ce6686cf54b3
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.searchInput.nativeElement.value)
        })
      )
      .subscribe();


  }
}
