import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { LevelParser } from './level-parser';
import { Start } from '../models/start';
import { ILevel } from './ilevel';
import { Tile } from '../models/tile';
import { Teleporter } from '../models/teleporter';
import { Door } from '../models/door';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private readonly parserService = inject(LevelParser);
  floor = signal<number>(0);

  levels: ILevel[] = [
    {
      floor: 1,
      shop: false,
      level:
        'w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,,,,w2,,,,w2,,,,,,w1,w1,,,,w2,,,,w2,,,,,,w1,w1,,,,w2,w2,d,w2,w2,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,s,k,,,,,,,,,,,,w1,w1,,x,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,,w1,w1,,,,,,,,,,,,,x,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1',
    },
    {
      floor: 1,
      shop: false,
      level:
        'v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v,v,w1,,c,e,,,,l,w1,v,v,v,v,v,v,w1,h3,,,,,m1,,w1,v,v,v,v,v,v,w1,,,w2,t,w2,,,w1,v,v,v,v,v,v,w1,c,m1,,,,,,w1,v,v,v,v,v,v,w1,,w2,,,,w2,w2,w1,v,v,v,v,v,v,w1,,h1,,,,m3,,w1,v,v,v,v,v,v,w1,,,,s,,,h1,w1,v,v,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v',
    },
    {
      floor: 2,
      shop: false,
      level:
        'v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,w1,w2,,,,t,c,,,w2,w1,v,v,v,v,w1,,m3,,,w2,,m2,,l,w1,v,v,v,v,w1,m1,,,s,w2,,,h3,,w1,v,v,v,v,w1,,,w2,w2,w2,,m2,,,w1,v,v,v,v,w1,,,,,c,,,w2,w2,w1,v,v,v,v,w1,,h2,,,,,,,,w1,v,v,v,v,w1,,,c,,,m1,,,,w1,v,v,v,v,w1,,m3,h1,,w2,e,,,l,w1,v,v,v,v,w1,w2,l,,,w2,,,h3,w2,w1,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v',
    },
    {
      floor: 3,
      shop: false,
      level:
        'w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,m3,,,,h3,w2,,c,,w2,w2,,,w1,w1,,,m3,,,w2,,,,w2,,,,w1,w1,s,,,l,,w2,m1,,c,w2,c,h2,,w1,w1,,,,,,w2,,,,,,m3,,w1,w1,,h2,,,,,,,,,,,,w1,w1,,,,,,w2,,,l,w2,,,,w1,w1,,l,,,,w2,,,,w2,,,,w1,w1,w2,t,,w2,w2,w2,l,w2,t,w2,,,w2,w1,w1,,,,,,m3,t,w2,,,,h3,,w1,w1,,,,,,,h3,w2,,,h1,,,w1,w1,,,,,,,,c,,c,,,,w1,w1,c,c,w2,,h3,,,w2,,,,,e,w1,w1,w2,,,,,,,w2,w2,,,m3,w2,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1',
    },
    {
      floor: 4,
      shop: false,
      level:
        'w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w2,,,,w2,w2,,t,w2,w2,c,m3,,w1,w1,,,c,,w2,,,,,w2,,,,w1,w1,,h,m3,,,,,,,w2,,,,w1,w1,,,s,,,,,,,c,m3,,,w1,w1,c,,c,,w2,,,,,c,h,h3,,w1,w1,h,,,,w2,,,,,w2,,,m3,w1,w1,,,,,w2,,,,,w2,,,,w1,w1,,,,,w2,,,,,w2,h2,,,w1,w1,,,w2,w2,w2,w2,,w2,w2,w2,w2,,w2,w1,w1,,,,,,,,t,,,,,,w1,w1,,m2,,,,,,l,h3,,,,,w1,w1,h1,c,m1,,,w2,,,m3,c,w2,e,t,w1,w1,w2,,,,,w2,w2,,,w2,w2,c,,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1',
    },
    {
      floor: 5,
      shop: false,
      level:
        'w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,,,,,,w2,w2,c,,,,,w2,w1,w1,e,m1,c,c,,w2,,,,,m3,,,w1,w1,,m6,,m5,,,,,,,,,c,w1,w1,,,,,,w2,,c,,,t,,,w1,w1,,,,m1,,w2,,,,,,c,,w1,w1,c,,,h2,,w2,t,m,m6,,m8,,,w1,w1,w2,,,w2,,w2,w2,,w2,w2,w2,,,w1,w1,t,,,w2,,m9,,m3,w2,,,m1,,w1,w1,,,,w2,,,,t,w2,,,w2,,w1,w1,,h2,h3,,,,,,,,,,,w1,w1,,,m9,,,t,,m1,w2,h,s,,,w1,w1,,,,w2,,,,,w2,,,,,w1,w1,w2,,w2,w2,w2,c,,,w2,w2,,,,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1',
    },
    {
      floor: 6,
      shop: true,
      level: '',
    },
    {
      floor: 7,
      shop: false,
      level:
        'v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v,v,v,v,w1,,l,w2,c,h3,w1,v,v,v,v,v,v,v,v,w1,h3,m3,,,,w1,v,v,v,v,v,w1,w1,w1,w1,w2,,,,,w1,w1,w1,w1,v,v,w1,l,,w2,w2,,,m2,,c,m2,,w1,v,v,w1,,,,w2,h1,,w2,w2,,,,w1,v,v,w1,s,,,w2,,,m2,w2,c,,e,w1,v,v,w1,,,,w2,w2,,,w2,,,,w1,v,v,w1,m3,,,c,,,h,w2,w2,h3,h6,w1,v,v,w1,w1,w1,w1,,,,,w2,w1,w1,w1,w1,v,v,v,v,v,w1,,c,c,m3,,w1,v,v,v,v,v,v,v,v,w1,h,l,w2,,,w1,v,v,v,v,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v,v',
    },
    {
      floor: 8,
      shop: false,
      level:
        'v,v,v,v,v,v,v,v,v,v,v,w1,w1,w1,w1,v,v,v,v,v,v,v,v,v,v,v,w1,l,e,w1,v,v,v,v,v,v,v,v,v,v,v,w1,m2,,w1,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,,,w1,v,w1,m1,,,,,c,,,c,,,,w1,v,w1,,,m3,,,,,,,,m1,,w1,v,w1,,c,w2,w2,w2,w2,w2,w2,w2,w2,w2,t,w1,v,w1,c,,w2,l,l,l,c,c,h6,,,,w1,v,w1,,m1,w2,w2,w2,w2,t,w2,w2,w2,w2,w2,w1,v,w1,,,,,,m2,,c,,,,,w1,v,w1,h3,m1,,,,,,,,,m1,,w1,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,,c,w1,v,v,v,v,v,v,v,v,v,v,v,w1,,,w1,v,v,v,v,v,v,v,v,v,v,v,w1,,s,w1,v,v,v,v,v,v,v,v,v,v,v,w1,w1,w1,w1',
    },
    {
      floor: 9,
      shop: false,
      level:
        'v,v,v,v,v,v,v,v,v,w1,w1,w1,w1,w1,w1,v,v,v,v,v,v,v,v,v,w1,l,,,s,w1,v,v,v,v,v,v,v,v,v,w1,h3,,,,w1,v,v,v,v,v,v,v,w1,w1,w1,w2,w2,m1,m1,w1,v,v,v,v,v,v,v,w1,w2,h,c,,,,w1,v,v,v,w1,w1,w1,w1,w1,h1,,,,,,w1,v,v,v,w1,,h3,l,w2,,,,,c,,w1,v,v,v,w1,,,,w2,,m4,w2,,w1,w1,w1,v,v,v,w1,,w2,t,w2,,,,,w1,v,v,w1,w1,w1,w1,,m3,,,c,,,h3,w1,v,v,w1,m3,,,,,,,,w1,w1,w1,w1,v,v,w1,,,,,w2,c,m1,m,w1,v,v,v,v,v,w1,,e,,h1,w2,,w2,,w1,v,v,v,v,v,w1,l,,m1,,w2,l,,,w1,v,v,v,v,v,w1,w1,w1,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v',
    },
    {
      floor: 10,
      shop: false,
      level:
        'v,v,v,w1,w1,w1,w1,w1,w1,w1,w1,v,v,v,v,v,w1,w1,w1,l,,,,,h,w1,v,v,v,v,v,w1,h1,w2,w2,,m5,,,h1,w1,w1,w1,w1,w1,v,w1,,,w2,,,c,,,w2,,,,w1,v,w1,,,t,,,,w2,w2,w2,,l,m3,w1,v,w1,,m2,w2,,,,,,,,c,,w1,v,w1,,,,,,c,,h2,,,h,,w1,v,w1,,c,,h4,,,,,w2,w2,,,w1,v,w1,,m3,,w2,t,t,w1,w1,w1,w2,,m2,w1,v,w1,,,,w2,,,w1,v,w1,,,,w1,v,w1,,,,w2,m5,l,w1,v,w1,,h2,,w1,v,w1,,c,,w1,w1,w1,w1,v,w1,,,,w1,v,w1,s,,h6,w1,v,v,v,v,w1,c,,,w1,v,w1,w1,w1,w1,w1,v,v,v,v,w1,,,e,w1,v,v,v,v,v,v,v,v,v,v,w1,w1,w1,w1,w1',
    },
    {
      floor: 11,
      shop: true,
      level: '',
    },
  ];

  transition: WritableSignal<boolean> = signal(false);

  readonly current = computed(() => {
    const level = this.transform(this.levels[this.floor() - 1].level);
    return this.parserService.parse(level);
  });

  transform(rawLevel: string): string[] {
    return rawLevel.split(',');
  }

  start(): number {
    return this.current().findIndex((tile: Tile) => tile instanceof Start);
  }

  activateTeleporters(): void {
    const teleporters: Teleporter[] = this.current().filter(
      (tile: Tile) => tile instanceof Teleporter,
    );

    if (teleporters.length > 0) {
      const teleporter1Position = this.current().findIndex((tile: Tile) => tile == teleporters[0]);
      const teleporter2Position = this.current().findIndex((tile: Tile) => tile == teleporters[1]);

      teleporters[0].setDestination(teleporter2Position);
      teleporters[1].setDestination(teleporter1Position);
    }
  }

  openDoors(): void {
    const doors: Door[] = this.current().filter((tile: Tile) => tile instanceof Door);
    doors.forEach((door) => door.open());
  }
}
