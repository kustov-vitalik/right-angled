import { Injectable } from '@angular/core';

import { NgSortingsService, NgFiltersService, NgPagedPager } from './injectables';
import { NgListServiceBase } from './ng-list-service-base';
import { NgQueryStringStateService } from './ng-query-string-state-service';

@Injectable()
export class NgPagedListService extends NgListServiceBase {
    constructor(public pager: NgPagedPager, stateManagementService: NgQueryStringStateService, sortingsService: NgSortingsService, filtersService: NgFiltersService) {
        super(pager, stateManagementService, sortingsService, filtersService);
    }
    public loadData(): Promise<Object> {
        const promise = super.loadData();
        this.destroyReloadDestroyables();
        return promise;
    }
    public wrap(target: any): NgPagedListService {
        super.wrap(target);
        return this;
    }
    public goToFirstPage(): void {
        if (this.pager.pageNumber > 1) {
            (this.pager).pageNumber = 1;
            this.loadData();
        }
    }
    public goToPreviousPage(): void {
        if (this.pager.pageNumber > 1) {
            this.pager.pageNumber -= 1;
            this.loadData();
        }
    }
    public goToNextPage(): void {
        if (this.pager.pageNumber < this.pager.pageCount) {
            this.pager.pageNumber += 1;
            this.loadData();
        }
    }
    public goToLastPage(): void {
        if (this.pager.pageNumber < this.pager.pageCount) {
            this.pager.pageNumber = this.pager.pageCount;
            this.loadData();
        }
    }
}
