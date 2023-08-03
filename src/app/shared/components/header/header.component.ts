import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('NavBar', { static: true }) navBar: ElementRef;

  constructor(private renderer: Renderer2) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 10) {
      this.renderer.addClass(this.navBar.nativeElement, 'Fixedtop');
    } else {
      this.renderer.removeClass(this.navBar.nativeElement, 'Fixedtop');
    }
  }

}
