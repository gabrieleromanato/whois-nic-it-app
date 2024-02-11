import { Component } from '@angular/core';
import { StorageService } from "../../../core/services/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [StorageService]
})
export class HeaderComponent {

    totalDomainsInStorage = 0;
    constructor(private storageService: StorageService) {
    }

    ngOnInit() {
      this.totalDomainsInStorage = this.storageService.getDomainsFromStorage().domains.length;
    }
}
