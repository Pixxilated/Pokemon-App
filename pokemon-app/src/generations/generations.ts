import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-generations',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './generations.html',
  styleUrl: './generations.css',
})

export class Generations {
  genArray: string[] = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9"]
}