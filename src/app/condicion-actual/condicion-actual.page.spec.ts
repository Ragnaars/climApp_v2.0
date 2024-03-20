import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondicionActualPage } from './condicion-actual.page';

describe('CondicionActualPage', () => {
  let component: CondicionActualPage;
  let fixture: ComponentFixture<CondicionActualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CondicionActualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
