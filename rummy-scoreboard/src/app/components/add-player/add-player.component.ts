import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.scss'
})
export class AddPlayerComponent {

  public readonly newPlayerForm = this.formBuilder.group({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  })

constructor(private playersService: PlayersService, private formBuilder: FormBuilder){}

public addPlayer(): void{
  this.playersService.addPlayer({name: this.newPlayerForm.controls['name'].value, scores: []});
  this.newPlayerForm.controls['name'].setValue('');
}
}
