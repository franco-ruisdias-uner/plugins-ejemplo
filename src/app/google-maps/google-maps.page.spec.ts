import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsPage } from './google-maps.page';

describe('GoogleMapsPage', () => {
  let component: GoogleMapsPage;
  let fixture: ComponentFixture<GoogleMapsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
