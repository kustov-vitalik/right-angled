import { Component } from '@angular/core';
import { fetchMethod, disposeOnReload, filter, REGULAR_LIST_DIRECTIVES, REGULAR_LIST_PROVIDERS, NgListService } from '../../right-angled';

import { SHARED_DIRECTIVES, AirportsService } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES, REGULAR_LIST_DIRECTIVES],
    moduleId: module.id,
    providers: [REGULAR_LIST_PROVIDERS],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    @filter()
    public airportName: string;
    @disposeOnReload() public items: Array<any> = new Array<any>();
    constructor(public airportsService: AirportsService, public ngListService: NgListService) {
        this.ngListService.wrap(this);
    }
    @fetchMethod()
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsRegular(requestParams).then((result: any) => {
            this.items = result.items;
            return result;
        });
    };
}
