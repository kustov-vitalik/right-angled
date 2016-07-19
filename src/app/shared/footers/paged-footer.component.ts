import { Component } from '@angular/core';
import { ListComponent } from '../../../right-angled/list-directives/list.component';
import { PAGED_FOOTER_DIRECTIVES } from '../../../right-angled/list-directives';
import { MISC_DIRECTIVES } from '../../../right-angled/misc-directives';

@Component({
    directives: [PAGED_FOOTER_DIRECTIVES, MISC_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-paged-footer',
    templateUrl: 'paged-footer.component.html'
})
export class PagedFooterComponent {
    constructor(public hostList: ListComponent) {
    }
}
