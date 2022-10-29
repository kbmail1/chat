import { Time } from '@angular/common';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'm-progress-bar',
  templateUrl: './m-progress-bar.component.html',
  styleUrls: ['./m-progress-bar.component.scss']
})
export class MProgressBarComponent implements OnInit, AfterContentInit {

  @Input() width!: number
  @Input() pgDuration!: number

  timeLeftSeconds!: number
  pgBarWidthLeft!: number
  percentRemaining: number = 100

  x: number = 0
  y: number = 0
  top: number = 0
  left: number = 0

  pgBarTipValue: number = 0;
  pgBarTipVisible: boolean = false

  pgBarXPosition: number = 0

  constructor() {
    this.timeLeftSeconds = this.pgDuration
    this.pgBarWidthLeft = this.width
  }

  ngOnInit(): void {
    this.timeLeftSeconds = this.pgDuration

  }

  ngAfterContentInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    this.pgBarXPosition = this.width - this.pgBarWidthLeft + this.left
    const rect = document.getElementById('idPgBarContainer')?.getBoundingClientRect()
    this.x = rect!.x
    this.y = rect!.y
    this.top = rect!.top
    this.left = rect!.left

    this.pgBarXPosition = 0
    this.pgBarTipVisible = true


    console.log(`rect: ${rect}`)

    setInterval(() => {
      this.percentRemaining = 100 * this.timeLeftSeconds / this.pgDuration
      const windowWidthLeft = window.innerWidth * this.percentRemaining / 100

      this.pgBarWidthLeft = this.width * windowWidthLeft / window.innerWidth
      this.pgBarXPosition = this.width - this.pgBarWidthLeft + this.left

      this.timeLeftSeconds -= 1
      if (this.timeLeftSeconds === 0) {
        this.timeLeftSeconds = this.pgDuration
      }
    }, 1000);
  }
}


