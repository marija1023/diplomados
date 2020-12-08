import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router,
              public authService: AuthService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }

  handleChatClicked(modalNotLoggedIn) {
    if (!this.authService.loggedIn) {
      this.modalService.open(modalNotLoggedIn, { centered: true });
    }
  }

}
