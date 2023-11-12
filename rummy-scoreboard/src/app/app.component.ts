import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { KnownPlayersComponent } from './components/known-players/known-players.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { CurrentGameComponent } from './components/current-game/current-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, KnownPlayersComponent, AddPlayerComponent, CurrentGameComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rummy-scoreboard';
}
