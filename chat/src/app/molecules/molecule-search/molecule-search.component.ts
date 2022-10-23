import { MoleculeSearchService } from './molecule-search.service';
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
  searchResults: string[] = [];

  constructor(
    protected httpClient: HttpClient,
    public moleculeSearchService: MoleculeSearchService,
  ) { }

  ngOnInit(): void {
    this.moleculeSearchService.searchText$.subscribe((searchResults: string[]) => {
      this.searchResults = searchResults
    })
  }

  ngAfterViewInit(): void {
    // https://fireflysemantics.medium.com/debouncing-your-angular-search-field-ce6686cf54b3
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text: any) => {
          // console.log('hello')
          // console.log(this.searchInput.nativeElement.value)
          // console.log(`value: this.searchInput.nativeElement.value`)
          this.moleculeSearchService.getSearchResults(this.searchInput.nativeElement.value)
        })
      )
      .subscribe()
  }
}
