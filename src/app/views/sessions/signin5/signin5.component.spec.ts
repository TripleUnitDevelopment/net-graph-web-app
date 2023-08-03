import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signin5Component } from './signin5.component';

describe('Signin5Component', () => {
  let component: Signin5Component;
  let fixture: ComponentFixture<Signin5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Signin5Component]
    });
    fixture = TestBed.createComponent(Signin5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
