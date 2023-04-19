import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOldPropsComponent } from './user-old-props.component';

describe('UserOldPropsComponent', () => {
  let component: UserOldPropsComponent;
  let fixture: ComponentFixture<UserOldPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOldPropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOldPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
