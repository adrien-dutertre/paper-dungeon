import { Component, computed, inject } from '@angular/core';
import { Dice } from '../services/dice';

@Component({
  selector: 'app-dice-object',
  imports: [],
  templateUrl: './dice-object.html',
  styleUrl: './dice-object.css',
})
export class DiceObject {
  roll = inject(Dice);

  private readonly faces = new Map([
    [1, 'face1'],
    [2, 'face2'],
    [3, 'face3'],
    [4, 'face4'],
    [5, 'face5'],
    [6, 'face6'],
  ]);

  visibleFace = computed(() => this.faces.get(this.roll.currentRoll()));
}
