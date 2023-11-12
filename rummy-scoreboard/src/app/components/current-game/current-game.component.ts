import { Component, OnInit, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';
import { FormBuilder } from '@angular/forms';
import { PlayerScoresComponent } from '../player-scores/player-scores.component';
import { RoundResult } from '../../interfaces/round-result';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-current-game',
  standalone: true,
  imports: [CommonModule, PlayerScoresComponent],
  templateUrl: './current-game.component.html',
  styleUrl: './current-game.component.scss'
})
export class CurrentGameComponent {

  @ViewChildren(PlayerScoresComponent) playerScores?: PlayerScoresComponent[];

  public readonly allPlayers$ = this.playersService.players$;

  public readonly scoreForm = this.formBuilder.group({});

  constructor(private playersService: PlayersService, private formBuilder: FormBuilder, private fileService: FileService) { }

  public saveScores(): void{
    if (!this.playerScores)
    {
      return;
    }

    const results = this.playerScores.map(s => s.result);
    if (results.some(r => r === null)){
      return;
    }

    this.playersService.addScores(results.filter((r): r is RoundResult => !! r));
  }

  public downloadScores(): void{
this.fileService.downloadScores(this.playersService.players);
  }
}
