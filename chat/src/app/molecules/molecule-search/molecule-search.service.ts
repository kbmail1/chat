import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, pipe, Subscription, take, takeWhile, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoleculeSearchService {

  searchX: Map<number, string> = new Map<number, string>();
  searchResults: string[] = []
  constructor(
    public httpClient: HttpClient,
  ) { }


  // TODO: do not invoke http when length if less than equal minChatCount
  getSearchResults = (searchText: string, minCharCount: number) => {
    console.log(`getSearchResults for text: ${searchText}`)
    console.log(`minCharCount: ${minCharCount}`)
    this.httpClient.get(`http://localhost:3000/data`)
      .pipe(
        map((data: any) => {
          return data.filter((item: any) => {
            return (item.toLowerCase().includes(searchText.toLowerCase()) && searchText.length >= minCharCount)
          })
        }))
      .subscribe({
        next: (data: any) => {
          this.searchResults = data
          console.log(`subscribe next: data: ${data}`)
        }
      })
  }
}
