import { Injectable, signal } from '@angular/core';
import { DiceModalConfig } from './dice-modal-config';

@Injectable({
  providedIn: 'root',
})
export class Dice {
  result = signal<number>(0);
  currentRoll = signal<number>(0);
  private MAX_DICE = 6;

  modal = signal<boolean>(false);
  modalTitle: string = 'Titre';
  modalMessage: string | undefined = 'Message';
  modalButtonLabel: string = 'Label';

  // Fonction aléatoire de lancement de dé 6
  private random(): number {
    return Math.floor(Math.random() * this.MAX_DICE) + 1;
  }

  // Lancer de dé
  roll(config: DiceModalConfig, threshold?: number): boolean {
    // Configuration de la modale
    this.modalTitle = config.title;
    this.modalMessage = config.message;
    this.modalButtonLabel = config.buttonLabel;
    this.modal.set(true);

    this.currentRoll.set(this.random());
    if (this.currentRoll() < (threshold ?? 0)) {
      return false;
    }
    return true;
  }

  // Fermer la modale
  closeModal(): void {
    this.result.set(this.currentRoll());
    this.modal.set(false);
  }
}
