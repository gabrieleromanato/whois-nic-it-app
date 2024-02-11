import {Component} from '@angular/core';
import {WhoisService} from '../../core/services/whois.service';
import {StorageService} from "../../core/services/storage.service";
import {WhoisResponseModel} from '../../core/models/whois-response.model';
import {WhoisResponseDto} from '../../core/dto/whois-response.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WhoisService, StorageService]
})
export class HomeComponent {

  domain = '';
  whoisResponse: WhoisResponseModel = {} as WhoisResponseModel;
  errorMessage = '';
  showLoader = false;

  constructor(private whoisService: WhoisService, private storageService: StorageService) {
  }

  handleWhoisSearch() {
    this.errorMessage = '';
    this.whoisResponse = {} as WhoisResponseModel;
    this.showLoader = true;

    if (this.storageService.isDomainInStorage(this.domain)) {
      this.whoisResponse = this.storageService.getDomainFromStorage(this.domain);
      this.showLoader = false;
      return;
    }
    this.whoisService.getWhoisData(this.domain).subscribe({
      next: (response: WhoisResponseDto) => {
        this.whoisResponse = this.whoisService.parseWhoisData(response.result);
        this.showLoader = false;
        this.storageService.addDomainToStorage(this.domain, this.whoisResponse);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.error.error;
        this.showLoader = false;
      }
    });
  }
}
