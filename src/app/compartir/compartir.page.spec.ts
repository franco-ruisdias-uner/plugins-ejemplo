import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompartirPage } from './compartir.page';

describe('CompartirPage', () => {
  let component: CompartirPage;
  let fixture: ComponentFixture<CompartirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
