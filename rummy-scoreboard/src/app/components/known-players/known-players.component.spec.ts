import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownPlayersComponent } from './known-players.component';

describe('KnownPlayersComponent', () => {
  let component: KnownPlayersComponent;
  let fixture: ComponentFixture<KnownPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnownPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnownPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
