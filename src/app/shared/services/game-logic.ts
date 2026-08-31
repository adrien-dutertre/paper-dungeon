import { Interaction } from './interaction';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Hero } from '../../features/hero-sheet/services/hero';
import { Dice } from '../components/dice-modal/services/dice';
import { Tile } from '../../features/level/models/tile';
import { LevelService } from '../../features/level/services/level.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Events } from './events';

@Injectable({
  providedIn: 'root',
})
export class GameLogic {
  private hero = inject(Hero);
  private dice = inject(Dice);
  private level = inject(LevelService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  private eventsService = inject(Events);

  private cardinal_movement = signal<boolean>(true);

  direction = signal<number>(0);
  private readonly moving = new Map([
    [0, -16], // up left
    [1, -15], // up
    [2, -14], // up right
    [3, -1], // left
    [4, 0], // none
    [5, 1], // right
    [6, 14], // down left
    [7, 15], // down
    [8, 16], // down right
  ]);

  allowedDirection = computed<boolean[]>(() => {
    return this.cardinal_movement()
      ? [
          false,
          true && this.canWalkThere(1),
          false,
          true && this.canWalkThere(3),
          false,
          true && this.canWalkThere(5),
          false,
          true && this.canWalkThere(7),
          false,
        ]
      : [
          true && this.canWalkThere(0),
          false,
          true && this.canWalkThere(2),
          false,
          false,
          false,
          true && this.canWalkThere(6),
          false,
          true && this.canWalkThere(8),
        ];
  });

  modifyer_dice: number = 1;

  constructor() {
    effect(() => {
      const event = this.eventsService.events();
      if (!event) {
        return;
      } else {
        this.eventsService.resolveEvent(event);
      }
    });
  }

  // Initier le jeu
  init(): void {
    this.hero.move(this.level.start() + 1);
    this.level.activateTeleporters();
  }

  // Initier un tour
  startTurn(): void {
    this.eventsService.add('MoveDice');
    this.cardinal_movement.set(this.dice.result() % 2 == 0);
    this.hero.moves.set(this.isMovable() ? this.dice.result() : 0);
  }

  // Bouger le héros dans cette direction
  chooseDirection(direction: number): void {
    this.direction.set(direction);
    this.turn();
  }

  // Tour du joueur
  turn(): void {
    while (this.hero.moves() > 0 && this.canWalkThere(this.direction())) {
      if (!this.dice.modal()) {
        this.move();
        this.checkEvent();
      } else {
        return;
      }
    }
  }

  // Mouvement du joueur
  move(): void {
    const newPosition: number = this.hero.position() + (this.moving.get(this.direction()) ?? 0);
    this.hero.move(newPosition);
    this.hero.moves.update((currentNumberOfMoves) => {
      return currentNumberOfMoves - 1;
    });
  }

  // Le joueur peut bouger dans au moins une direction
  isMovable(): boolean {
    return this.allowedDirection().some((direction) => direction == true);
  }

  // Est-ce que le joueur peut se déplacer sur la case ?
  canWalkThere(direction: number): boolean {
    return this.level.current()[this.hero.position() - 1 + (this.moving.get(direction) ?? 0)]
      .walkable;
  }

  // Evènement sur la case
  checkEvent(): void {
    const currentTile: Tile = this.level.current()[this.hero.position() - 1];
    if (currentTile.interactible && currentTile.interaction) {
      this.resolveEvent(currentTile.interaction());
    }
  }

  // Résoudre l'évènement
  resolveEvent(interaction: Interaction): void {
    // Gain de pièces
    if (interaction.coinLoot) {
      let coins = interaction.coins;
      if (coins == undefined) {
        this.dice.roll({
          title: 'Dé de pièces trouvées',
          message: 'Vous gagnez des pièces !',
          buttonLabel: 'Ok',
        });
        coins = this.dice.result();
      }
      this.hero.getCoins(coins);
    }
    // Perte de pièces
    if (interaction.coinLost) {
      let coins = interaction.coins;
      if (coins == undefined) {
        this.dice.roll({
          title: 'Dé de pièces perdues',
          message: 'Vous perdez des pièces...',
          buttonLabel: 'Ok',
        });
        coins = this.dice.result();
      }
      this.hero.loseCoins(coins);
    }
    // Soin du héros
    if (interaction.heroHeal) {
      let health = interaction.health;
      if (health == undefined) {
        this.dice.roll({
          title: 'Dé de gain de vie',
          message: 'Vous gagnez de la vie !',
          buttonLabel: 'Ok',
        });
        health = this.dice.result();
      }
      this.hero.heal(health);
    }
    // Dommages du héros
    if (interaction.heroHit) {
      let damages = interaction.health;
      if (damages == undefined) {
        this.dice.roll({
          title: 'Dé de perte de vie',
          message: 'Vous prenez des dégâts...',
          buttonLabel: 'Ok',
        });
        damages = this.dice.result();
      }
      this.hero.hit(damages);
    }

    // Ouvrir les portes
    if (interaction.key) {
      this.level.openDoors();
    }

    // Téléportation
    if (interaction.teleport && interaction.goTo) {
      console.log('Téléportation !');
      this.hero.move(interaction.goTo + 1);
    }

    // Augmenter l'endurance
    if (interaction.endurance) {
      this.hero.endurance();
    }

    // Arrêt du héros
    if (interaction.heroStop) {
      this.hero.moves.set(0);
    }

    // Fin du niveau
    if (interaction.exit) {
      this.confirmationService.confirm({
        message: 'Voulez-vous quitter le niveau ?',
        header: 'Fin du niveau',
        rejectLabel: 'Non, rester',
        rejectButtonProps: {
          severity: 'secondary',
          outlined: true,
        },
        acceptLabel: 'Oui, quitter',
        accept: () => {
          this.endOfLevel();
        },
      });
    }
  }

  endOfLevel(): void {
    this.level.transition.set(true);
    if (this.checkHero()) {
      this.nextLevel();
    } else {
      this.endOfGame();
    }
  }

  checkHero(): boolean {
    return this.hero.current_hp() > 0;
  }

  nextLevel(): void {
    if (this.hero.current_coins() < 0) {
      this.hero.current_coins.set(0);
    }
    if (this.hero.current_hp() > this.hero.MAX_HP()) {
      this.hero.current_hp.set(this.hero.MAX_HP());
    }
    this.hero.moves.set(0);
    this.hero.current_level++;
    this.router.navigate(['/level', this.hero.current_level]);
  }

  endOfGame(): void {
    this.hero.reset();
    this.router.navigate(['']);
  }
}
