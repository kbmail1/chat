import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MoleculeSearchComponent } from './molecules/molecule-search/molecule-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // search bar
  minCharCount = 4
  constructor() {}

  searchWord(word: any) {
    console.log(`app: search clicked event: ${word}`)
  }


  pgWidth = 350
  pgDuration = 20
  // progress bar

}
