import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Recession } from '../interfaces/recession';

@Component({
  selector: 'app-recession-search',
  templateUrl: './recession-search.component.html',
  styleUrl: './recession-search.component.css'
})
export class RecessionSearchComponent {
  recessions: Array<Recession> = [];
  selectRecession: Recession | undefined;


  search(): void {

  }

  select(r: Recession): void {
    this.selectRecession = r;
  }
}