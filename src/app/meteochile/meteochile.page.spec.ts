import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeteochilePage } from './meteochile.page';

describe('MeteochilePage', () => {
  let component: MeteochilePage;
  let fixture: ComponentFixture<MeteochilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeteochilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
