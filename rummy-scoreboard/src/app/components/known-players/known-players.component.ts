import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-known-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './known-players.component.html',
  styleUrl: './known-players.component.scss'
})
export class KnownPlayersComponent {

  public readonly allPlayers$ = this.playersService.players$;

  constructor(private playersService: PlayersService){};
}
