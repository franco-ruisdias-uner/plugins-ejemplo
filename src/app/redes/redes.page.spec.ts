import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedesPage } from './redes.page';

describe('RedesPage', () => {
  let component: RedesPage;
  let fixture: ComponentFixture<RedesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
