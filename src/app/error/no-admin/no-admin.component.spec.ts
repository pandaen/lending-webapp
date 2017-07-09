import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAdminComponent } from './no-admin.component';

describe('NoAdminComponent', () => {
  let component: NoAdminComponent;
  let fixture: ComponentFixture<NoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
