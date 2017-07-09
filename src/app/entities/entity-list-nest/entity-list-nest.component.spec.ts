import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListNestComponent } from './entity-list-nest.component';

describe('EntityListNestComponent', () => {
  let component: EntityListNestComponent;
  let fixture: ComponentFixture<EntityListNestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityListNestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListNestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
