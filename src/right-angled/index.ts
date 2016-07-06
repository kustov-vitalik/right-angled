export * from 'e2e4';

export { NgPagedListService } from './services/ng-paged-list-service.service';
export { NgBufferedListService } from './services/ng-buffered-list-service.service';
export { NgListService } from './services/ng-list-service.service';

import { SELECTION_DIRECTIVES } from './selection-directives/index';
import { LIST_DIRECTIVES } from './list-directives/index';
import { BUFFERED_FOOTER_DIRECTIVES, PAGED_FOOTER_DIRECTIVES, REGULAR_FOOTER_DIRECTIVES } from './list-directives/index';

export var PAGED_LIST_DIRECTIVES: any[] = LIST_DIRECTIVES.concat(PAGED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var BUFFERED_LIST_DIRECTIVES: any[] = BUFFERED_FOOTER_DIRECTIVES.concat(PAGED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));
export var REGULAR_LIST_DIRECTIVES: any[] = REGULAR_FOOTER_DIRECTIVES.concat(PAGED_FOOTER_DIRECTIVES.concat(SELECTION_DIRECTIVES));

import { NgQueryStringStateService } from './services/ng-query-string-state-service';
import { NgPagedListService } from './services/ng-paged-list-service.service';
import { NgBufferedListService } from './services/ng-buffered-list-service.service';
import { NgListService } from './services/ng-list-service.service';

export var PAGED_LIST_PROVIDERS: any[] = [
    NgPagedListService,
    NgQueryStringStateService
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    NgBufferedListService,
    NgQueryStringStateService
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    NgListService,
    NgQueryStringStateService
];
