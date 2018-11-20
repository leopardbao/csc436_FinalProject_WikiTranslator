import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikicardComponent } from './wikicard.component';

describe('WikicardComponent', () => {
  let component: WikicardComponent;
  let fixture: ComponentFixture<WikicardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikicardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikicardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
