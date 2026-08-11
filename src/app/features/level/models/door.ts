import { signal, WritableSignal } from '@angular/core';
import { Tile } from './tile';
import { Interaction } from '../../../shared/services/interaction';

export class Door implements Tile {
  source: WritableSignal<string>;
  interactible: boolean = true;
  walkable: boolean = false;

  constructor() {
    this.source = signal('./sprites/door.png');
  }

  description(): string {
    return this.walkable ? '' : 'Porte fermée';
  }

  interaction(): Interaction {
    return {};
  }

  open(): void {
    console.info('La clé a ouvert la(les) porte(s)');
    this.walkable = true;
    this.source = signal('./sprites/floor.png');
  }
}
