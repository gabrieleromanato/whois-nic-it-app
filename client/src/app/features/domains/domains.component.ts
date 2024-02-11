import { Component } from '@angular/core';
import { StorageService } from "../../core/services/storage.service";
import { WhoisStorageModel } from "../../core/models/whois-storage.model";
import { WhoisService } from "../../core/services/whois.service";
import { WhoisResponseModel } from "../../core/models/whois-response.model";
import { WhoisResponseDto } from "../../core/dto/whois-response.dto";

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
  providers: [StorageService, WhoisService]
})
export class DomainsComponent {
    data: WhoisStorageModel = {} as WhoisStorageModel;
    loaderVisible = false;

    constructor(private storageService: StorageService, private whoisService: WhoisService) {
    }

    removeDomain(domain: string) {
      this.storageService.removeDomainFromStorage(domain);
      this.data = this.storageService.getDomainsFromStorage();
      window.location.href = '/domains';
    }

    updateDomain(domain: WhoisResponseModel) {
      const domainName = domain.domain;
      this.loaderVisible = true;
      this.whoisService.getWhoisData(domainName).subscribe({
        next: (response: WhoisResponseDto) => {
          const whoisResponse = this.whoisService.parseWhoisData(response.result);
          this.storageService.updateDomainInStorage(whoisResponse);
          this.data = this.storageService.getDomainsFromStorage();
          this.loaderVisible = false;
        },
        error: (error) => {
          console.log(error);
          this.loaderVisible = false;
        }
      });
    }

    ngOnInit() {
      this.data = this.storageService.getDomainsFromStorage();
    }
}
