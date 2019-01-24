import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesPage } from './repositories.page';

describe('RepositoriesPage', () => {
    let component: RepositoriesPage;
    let fixture: ComponentFixture<RepositoriesPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepositoriesPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RepositoriesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
