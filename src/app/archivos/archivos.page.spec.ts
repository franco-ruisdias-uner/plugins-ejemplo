import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivosPage } from './archivos.page';

describe('ArchivosPage', () => {
  let component: ArchivosPage;
  let fixture: ComponentFixture<ArchivosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
