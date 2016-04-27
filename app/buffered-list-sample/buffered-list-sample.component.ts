import {Component} from 'angular2/core';
import {AirportsService} from '../airportsService';
import {filter} from 'e2e4/src/filterAnnotation';
import {RECTANGLE_DIRECTIVES, NgBufferedListService} from '../rectangle/main';
import {FooterComponent} from '../footers/footer.component';

@Component({
    directives: [RECTANGLE_DIRECTIVES, FooterComponent],
    providers: [AirportsService, NgBufferedListService],
    templateUrl: 'app/buffered-list-sample/buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    @filter()
    airportName: string;
    airportsService: AirportsService;
    ngBufferedListService: NgBufferedListService;
    items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngBufferedListService: NgBufferedListService) {
        this.airportsService = airportsService;
        this.ngBufferedListService = ngBufferedListService.wrap(this, this.loadData);
    }
    loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsBuffered(requestParams).then(result => {
            this.items.push(...result.items);
            return result;
        });
    };
}
