import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkribblWordListComponent } from './skribbl-word-list.component';

describe('SkribblWordListComponent', () => {
  let component: SkribblWordListComponent;
  let fixture: ComponentFixture<SkribblWordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkribblWordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkribblWordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
