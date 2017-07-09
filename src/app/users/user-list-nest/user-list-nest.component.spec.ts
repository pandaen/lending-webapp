import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListNestComponent } from './user-list-nest.component';

describe('UserListNestComponent', () => {
  let component: UserListNestComponent;
  let fixture: ComponentFixture<UserListNestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListNestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListNestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
