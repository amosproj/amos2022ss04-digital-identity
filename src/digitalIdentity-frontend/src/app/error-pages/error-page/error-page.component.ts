import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  error_code: number = -1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((url: UrlSegment[]) => {
      let string_code: string = url[url.length - 1].toString();
      this.error_code = parseInt(string_code);

      if (isNaN(this.error_code)) {
        this.error_code = 404;
      }
    });
  }

  getStatus(): number {
    return this.error_code;
  }

  getTextStatus(): string {
    switch (this.error_code) {
      case 418:
        return 'I am a teepot :)';
      default:
      case 404:
        return 'Page not found.';
    }
  }
}
