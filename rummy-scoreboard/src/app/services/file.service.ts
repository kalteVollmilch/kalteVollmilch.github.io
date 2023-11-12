import { Injectable } from '@angular/core';
import { PlayerDto } from '../interfaces/player-dto';
import { JsonPipe } from '@angular/common';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private playersService: PlayersService) { }

  public downloadScores(data: PlayerDto[]) {
    let file = new File([JSON.stringify(data)], 'rummy-scores.json', { type: 'application/octet-stream' });
    let url = window.URL.createObjectURL(file);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  public uploadScores(): void{
    
  }
}
