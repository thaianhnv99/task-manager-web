import {ContentChild, Directive, TemplateRef, ViewChild} from "@angular/core";
import {AccordionContentDirective} from "./accordion-content.directive";
import {AccordionHeaderDirective} from "./accordion-header.directive";

@Directive({
  selector: 'accordion-item'
})

export class AccordionItemDirective {
  @ContentChild(AccordionContentDirective, {static: true, read: TemplateRef}) aContent!: TemplateRef<any>;
  @ContentChild(AccordionHeaderDirective, {static: true, read: TemplateRef}) aHeader!: TemplateRef<any>;
}
