import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, filter, fromEvent, map, pipe, Subscription, take, takeWhile, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoleculeSearchService {

  searchResults: string[] = []
  constructor(
    public httpClient: HttpClient,
  ) { }


  getSearchResults = (searchText: string) => {
    console.log(`getSearchResults for text: ${searchText}`)
    this.httpClient.get(`http://localhost:3000/data`)
    .pipe(
        map((data: any ) => {
          return data.filter((item: any ) => {
            return item.toLowerCase().includes(searchText.toLowerCase())
          })
        }),
      tap((data: any) => {
        console.log(`data: ${data}`)
        this.searchResults = [...data]
      }))
      .subscribe({
        next: (data: any) => {
          console.log(data)
        },
        error: (error: any) => {
          console.log(error)
          // this.searchResults = []
        },
        complete: () => {
          console.log('complete')
        }
      })
  }
}
