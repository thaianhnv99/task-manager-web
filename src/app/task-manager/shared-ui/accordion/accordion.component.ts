import {AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {AccordionItemDirective} from "./directives/accordion-item.directive";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @ContentChildren(AccordionItemDirective) aItems!: QueryList<AccordionItemDirective>
  expanded = new Set<number>();
  @Input() collapsing = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.aItems.changes.subscribe(res => {
      this.collapseAll();
    })
  }

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  }

  collapseAll() {
    this.expanded.clear();
  }

}
