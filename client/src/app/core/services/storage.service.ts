import { Injectable } from '@angular/core';
import { WhoisStorageModel } from "../models/whois-storage.model";
import { WhoisResponseModel } from "../models/whois-response.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  addDomainToStorage(domain: string, whoisResponse: WhoisResponseModel) {
    if(this.isDomainInStorage(domain)) {
      return;
    }
    const domains = this.getDomainsFromStorage();
    domains.domains.push(whoisResponse);
    localStorage.setItem('domains', JSON.stringify(domains));
  }

  isDomainInStorage(domain: string): boolean {
    const domains = this.getDomainsFromStorage();
    return domains.domains.some(d => d.domain === domain);
  }

  removeDomainFromStorage(domain: string) {
    if(!this.isDomainInStorage(domain)) {
      return;
    }
    const domains = this.getDomainsFromStorage();
    domains.domains = domains.domains.filter(d => d.domain !== domain);
    localStorage.setItem('domains', JSON.stringify(domains));
  }

  getDomainsFromStorage(): WhoisStorageModel {
    const domains = localStorage.getItem('domains');
    if (domains) {
      return JSON.parse(domains);
    }
    return { domains: [] };
  }

  getDomainFromStorage(domain: string): WhoisResponseModel {
    const domains = this.getDomainsFromStorage();
    if(domains.domains.length > 0) {
      return domains.domains.find(d => d.domain === domain) || {} as WhoisResponseModel;
    }
    return {} as WhoisResponseModel;
  }

  updateDomainInStorage(domain: WhoisResponseModel) {
    const domains = this.getDomainsFromStorage();
    domains.domains = domains.domains.map(d => {
      if(d.domain === domain.domain) {
        return domain;
      }
      return d;
    });
    localStorage.setItem('domains', JSON.stringify(domains));
  }
}
