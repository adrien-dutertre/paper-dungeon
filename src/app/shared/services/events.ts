import { inject, Injectable, signal } from '@angular/core';
import { Dice } from '../components/dice-modal/services/dice';

@Injectable({
  providedIn: 'root',
})
export class Events {
  private dice = inject(Dice);
  readonly events = signal<eventType | null>(null);

  add(newEvent: eventType): void {
    this.events.set(newEvent);
  }

  reset(): void {
    this.events.set(null);
  }

  resolveEvent(event: eventType): void {
    switch (event) {
      case 'MoveDice':
        this.dice.roll({
          title: 'Dé de déplacement',
          buttonLabel: 'Ok',
        });
        break;
      default:
        break;
    }
  }
}

type eventType = 'MoveDice' | 'CloseModal';
