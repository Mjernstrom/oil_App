import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dumpBailHeight } from './dumpBailHeight.page';

describe('TabsPage', () => {
  let component: dumpBailHeight;
  let fixture: ComponentFixture<dumpBailHeight>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [dumpBailHeight],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dumpBailHeight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
