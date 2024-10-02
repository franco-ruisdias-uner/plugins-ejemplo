import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavegadorPage } from './navegador.page';

describe('NavegadorPage', () => {
  let component: NavegadorPage;
  let fixture: ComponentFixture<NavegadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
