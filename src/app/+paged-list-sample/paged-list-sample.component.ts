import { Component } from '@angular/core';
import { fetchMethod, disposeOnReload, filter, PAGED_LIST_DIRECTIVES, PAGED_LIST_PROVIDERS, NgPagedListService } from '../../right-angled';

import { SHARED_DIRECTIVES, AirportsService } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, PAGED_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [PAGED_LIST_PROVIDERS],
    templateUrl: 'paged-list-sample.component.html'
})
export class PagedListSampleComponent {
    @filter()
    public airportName: string;
    public airportsService: AirportsService;
    public ngPagedListService: NgPagedListService;

    @disposeOnReload()
    public items: Array<any> = new Array<any>();

    constructor(airportsService: AirportsService, ngPagedListService: NgPagedListService) {
        this.airportsService = airportsService;
        this.ngPagedListService = ngPagedListService.wrap(this);
    }
    @fetchMethod()
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsPaged(requestParams).then((result: any) => {
            this.items = result.items;
            return result;
        });
    };
}