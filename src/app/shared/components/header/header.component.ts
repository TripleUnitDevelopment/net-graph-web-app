import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/http/common/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('NavBar', { static: true }) navBar: ElementRef;

  isLoggedin: boolean = false;
  constructor(private renderer: Renderer2, private authService: AuthService,private router:Router) { 
    this.isLoggedin = this.authService.isAuthenticated();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 10) {
      this.renderer.addClass(this.navBar.nativeElement, 'Fixedtop');
    } else {
      this.renderer.removeClass(this.navBar.nativeElement, 'Fixedtop');
    }
  }


  Signout(){
    this.authService.removeToken();
    this.isLoggedin = false;
    this.router.navigate(['/home']);
  }

}
