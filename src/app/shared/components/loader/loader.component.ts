import { Component } from '@angular/core';
import { loaderAnimation } from './loader-animation';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [loaderAnimation],
})
export class LoaderComponent {
  // This is the variable for the component
  state: boolean = false;

  // Injecting the necessary dependencies
  constructor(private loaderService: LoaderService) {
    this.loaderService.loaderState$.subscribe((state) => (this.state = state));
  }
}
