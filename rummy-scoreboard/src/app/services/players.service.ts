import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerDto } from '../interfaces/player-dto';
import { RoundResult } from '../interfaces/round-result';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players$$: BehaviorSubject<PlayerDto[]> = new BehaviorSubject<PlayerDto[]>([]);

  public players$: Observable<PlayerDto[]> = this.players$$.asObservable();
  
  public get players(): PlayerDto[] {
    return this.players$$.value;
  }

  constructor() { }

  public addPlayer(newPlayer: PlayerDto){
    const currentPlayers = this.players$$.value;
    if (currentPlayers.some(p => p.name == newPlayer.name)){
      return;
    }

    this.players$$.next([...currentPlayers, newPlayer]);
  }

  public addScores(results: RoundResult[]){
    const currentPlayers = this.players$$.value;
    if (results.some(r => !currentPlayers.find(c => c.name === r.playerName))){
      return;
    }

    for (const player of currentPlayers){
      const result = results.find(r => r.playerName === player.name);
      if (!result){
        player.scores.push(null);
        return;
      }

      player.scores.push(result.score);
    }

    this.players$$.next(currentPlayers);
  }

  public setScores(scores: PlayerDto[]){
    this.players$$.next(scores);
  }
}
