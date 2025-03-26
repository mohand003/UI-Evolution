import { Component, ElementRef } from '@angular/core';
import { ThreeBackgroundService } from '../services/three-background.service';
import * as THREE from 'three';

@Component({
  selector: 'app-three-background',
  imports: [],
  templateUrl: './three-background.component.html',
  styleUrl: './three-background.component.scss'
})
export class ThreeBackgroundComponent {
  constructor(
    private threeBackgroundService: ThreeBackgroundService,
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('.three-container');
    this.threeBackgroundService.init(container);
  }
}
