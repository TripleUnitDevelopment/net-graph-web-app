import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup5Component } from './signup5.component';

describe('Signup5Component', () => {
  let component: Signup5Component;
  let fixture: ComponentFixture<Signup5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Signup5Component]
    });
    fixture = TestBed.createComponent(Signup5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
