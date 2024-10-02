import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortapapelesPage } from './portapapeles.page';

describe('PortapapelesPage', () => {
  let component: PortapapelesPage;
  let fixture: ComponentFixture<PortapapelesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PortapapelesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
