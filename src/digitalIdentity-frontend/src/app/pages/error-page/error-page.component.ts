import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  error_code: number = -1;
  defined_errors: number[] = [400, 401, 403, 404, 408, 418, 500, 503];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((url: UrlSegment[]) => {
      let string_code: string = url[url.length - 1].toString();
      this.error_code = parseInt(string_code);

      if (!this.defined_errors.includes(this.error_code)) {
        this.error_code = 404;
      }
    });
  }

  getStatus(): number {
    return this.error_code;
  }

  teapot(): string {
    return (
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣈⣮⣿⣿⣯⣎⢌⠈⠀⠀⠀⠀⠀⠀⢈⢈⢈⠈⠀⠀⠀⠀⠀   \n' +
      '⠀⠀⠀⠀⢈⣌⣌⢌⠀⠀⠀⠀⣀⣬⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⢌⢀⣬⡿⠷⠳⠳⡳⣎⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠱⣷⣿⣿⣎⠀⠀⠀⣿⣿⣿⣿⣿⣿⡷⡷⣷⡷⣿⣿⣿⣿⣿⣿⣿⠗⠀⠀⠀⠀⠀⣱⠎⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⡱⣿⣿⣯⢌⠀⣿⣿⣿⣿⣿⣿⣿⣿⢻⢻⣻⣿⣝⣿⣾⣿⣿⠀⠀⠀⠀⠀⠀⣰⠏⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⡱⣿⣿⣿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⢀⣾⠇⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⣳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⢀⣾⠗⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢀⣬⡿⠓⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⣬⣿⠷⠁⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠷⠁⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⡷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠑⠳⠳⡷⡷⡷⡷⡷⠷⠳⠳⠑⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀'
    );
  }
}
