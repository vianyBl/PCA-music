import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="app-icon-inline" [attr.aria-hidden]="ariaHidden" [innerHTML]="svgHtml"></div>
  `,
  styles: [
    `:host { display: inline-block; vertical-align: middle; }
     .app-icon-inline { width: 1em; height: 1em; display: inline-block; }
     .app-icon-inline svg { width: 100%; height: 100%; display: block; fill: currentColor; }
    `
  ]
})
export class AppIconComponent implements OnChanges {
  @Input() name: string = 'musical-notes';
  @Input() size = 26; // pixels; host styles can override width/height
  @Input() ariaHidden: 'true' | 'false' = 'true';

  svgHtml: SafeHtml | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name']) {
      this.loadSvg(this.name);
    }
  }

  private loadSvg(name: string) {
    if (!name) { this.svgHtml = null; return; }
    const path = `assets/icons/${name}.svg`;
    this.http.get(path, { responseType: 'text' }).subscribe(
      svgText => this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(svgText),
      () => this.svgHtml = null
    );
  }
}
