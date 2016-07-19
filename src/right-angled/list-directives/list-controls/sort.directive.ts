import { SkipSelf, Renderer, HostListener, Directive, ElementRef, Input, DoCheck, IterableDiffers, OnInit } from '@angular/core';
import { SortDirection, SortParameter } from 'e2e4';

import { Defaults } from './defaults';
import { ListComponent } from '../list.component';

@Directive({
    selector: '[rtSort]'
})
export class SortDirective implements DoCheck, OnInit {
    private nativeEl: HTMLElement;
    private differ: any;
    @Input('rtSort') public fieldName: string;
    constructor( @SkipSelf() private listHost: ListComponent, private renderer: Renderer, el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.nativeEl = el.nativeElement;
    }
    public ngOnInit(): void {
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortable, true);
        this.listHost.serviceInstance.sortingsService.sortings.some((sortParameter: SortParameter) => {
            if (sortParameter.fieldName === this.fieldName) {
                this.setSortClasses(sortParameter);
                return true;
            }
            return false;
        });
    }
    @HostListener('click', ['$event'])
    public clickHandler(evt: MouseEvent): void {
        if (this.listHost.serviceInstance.ready) {
            this.listHost.serviceInstance.sortingsService.setSort(this.fieldName, evt.ctrlKey);
            this.listHost.serviceInstance.reloadData();
        }
    }
    public ngDoCheck(): void {
        let changes = this.differ.diff(this.listHost.serviceInstance.sortingsService.sortings);
        if (changes) {
            changes.forEachRemovedItem(this.sortItemRemovedCallback);
            changes.forEachAddedItem(this.sortItemAddedCallback);
        }
    }
    private sortItemRemovedCallback = (removedItem: any): void => {
        if (removedItem.item && removedItem.item.fieldName === this.fieldName) {
            this.removeSortClasses(removedItem.item);
        }
    }
    private sortItemAddedCallback = (addedItem: any): void => {
        if (addedItem.item && addedItem.item.fieldName === this.fieldName) {
            this.setSortClasses(addedItem.item);
        }
    }
    private removeSortClasses(sortParameter: any): void {
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, Defaults.classNames.sortDesc, false);
    }
    private setSortClasses(sortParameter: any): void {
        const direction = sortParameter.direction;
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortDesc : Defaults.classNames.sortAsc, false);
        this.renderer.setElementClass(this.nativeEl, direction === SortDirection.Asc ? Defaults.classNames.sortAsc : Defaults.classNames.sortDesc, true);
    }
}
