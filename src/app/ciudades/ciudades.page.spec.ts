import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadesPage } from './ciudades.page';

describe('CiudadesPage', () => {
  let component: CiudadesPage;
  let fixture: ComponentFixture<CiudadesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CiudadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
