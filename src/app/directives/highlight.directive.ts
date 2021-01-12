import { element } from 'protractor';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private renderer : Renderer2,
    private el : ElementRef) { }

    @HostListener('mouseenter') onMouseEnter(){
      this.renderer.addClass(this.el.nativeElement, 'highlight');
    }  
    @HostListener('mouseleave') onMouseLeave(){
      this.renderer.removeClass(this.el.nativeElement, 'highlight');
    }
}
