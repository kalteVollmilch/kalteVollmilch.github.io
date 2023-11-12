import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDto } from '../../interfaces/player-dto';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoundResult } from '../../interfaces/round-result';
import { publishFacade } from '@angular/compiler';

@Component({
  selector: 'app-player-scores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-scores.component.html',
  styleUrl: './player-scores.component.scss'
})
export class PlayerScoresComponent {
  @Input() player?: PlayerDto;

  public scoreForm = this.formBuilder.group({
    score: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]})
  })

  public get result(): RoundResult | null{
    if (!this.player || this.scoreForm.invalid){
      return null;
    }

    return {
      playerName: this.player.name,
      score: this.scoreForm.get('score')!.value
    }
  }

  public get sum(): number {
    if (!this.player){
      return 0;
    }

    return this.player.scores.reduce((sum, score) => (sum ?? 0) + (score ?? 0), 0) ?? 0;
  }

  constructor(private formBuilder: FormBuilder){}
}
