import {Component, OnInit} from 'angular2/core';
import {AirportsService} from '../airportsService';
import {filter} from 'e2e4/src/filterAnnotation';
import {RECTANGLE_DIRECTIVES, NgPagedListService} from '../rectangle/main';

@Component({
    directives: [RECTANGLE_DIRECTIVES],
    providers: [AirportsService, NgPagedListService],
    templateUrl: 'app/paged-list-sample/paged-list-sample.component.html'
})
export class PagedListSampleComponent {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngPagedListService: NgPagedListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngPagedListService: NgPagedListService) {
        this.airportsService = airportsService;
        this.ngPagedListService = ngPagedListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsPaged(requestParams).then(result => {
            this.items = result.items;
            return result;
        });
    };
}
