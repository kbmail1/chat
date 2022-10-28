import { MoleculeSearchService } from './molecule-search.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, pipe, Subscription, take, takeWhile, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'molecule-search',
  templateUrl: './molecule-search.component.html',
  styleUrls: ['./molecule-search.component.scss']
})
export class MoleculeSearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInput!: ElementRef;
  @Input() minCharCount!: number;
  @Output() lensClickEventEmitter = new EventEmitter()

  constructor(
    protected httpClient: HttpClient,
    public moleculeSearchService: MoleculeSearchService,
  ) {
  }

  ngOnInit(): void {
    console.log(`ngOnInit: ${this.minCharCount}`)
  }

  ngAfterViewInit(): void {
    // https://fireflysemantics.medium.com/debouncing-your-angular-search-field-ce6686cf54b3
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        filter((event: any) => { return this.searchInput.nativeElement.value.includes(event.target.value) }),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text: any) => {
          this.moleculeSearchService.getSearchResults(this.searchInput.nativeElement.value, this.minCharCount)
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    //
  }

  onSampleSelected = (word: any) => {
    console.log(`sample: ${word}`)
    // this.searchText = word;
    this.searchInput.nativeElement.value = word;
  }

  onLensClick (event: Event) {
    console.log('searchClicked: ' + this.searchInput.nativeElement.value);
    console.log('but event not reaching emitter')
    this.lensClickEventEmitter.emit(this.searchInput.nativeElement.value)
  }

}
