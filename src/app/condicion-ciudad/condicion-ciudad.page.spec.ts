import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondicionCiudadPage } from './condicion-ciudad.page';

describe('CondicionCiudadPage', () => {
  let component: CondicionCiudadPage;
  let fixture: ComponentFixture<CondicionCiudadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CondicionCiudadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
