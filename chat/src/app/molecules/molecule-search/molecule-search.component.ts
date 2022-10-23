import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, pipe, Subscription, take, takeUntil, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'molecule-search',
  templateUrl: './molecule-search.component.html',
  styleUrls: ['./molecule-search.component.scss']
})
export class MoleculeSearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef;

  @Input('searchCache') searchCache: boolean = false

  searchResults: any = []

  constructor(
    protected httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();

    console.log(`searchCache: ${this.searchCache}`)

    let searchText$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        filter(x => this.searchInput.nativeElement.value.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.searchInput.nativeElement.value)
        })
      )
  }
}
