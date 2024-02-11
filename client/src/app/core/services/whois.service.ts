import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WhoisResponseDto } from "../dto/whois-response.dto";
import { environment } from "../../../environments/environment";
import { WhoisResponseModel } from "../models/whois-response.model";

@Injectable({
  providedIn: 'root'
})
export class WhoisService {

  private readonly apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  public parseWhoisData(whoisResult: string): WhoisResponseModel {
      const lines = whoisResult.split('\n');
      const response : WhoisResponseModel = {
        domain: '',
        status: '',
        created: '',
        updated: '',
        expires: '',
        registrar: {
          organization: '',
          name: '',
          web: ''
        }
      };
      for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('Domain:')) {
          response.domain = line.split(':')[1].trim();
        }
        if (line.includes('Status:')) {
          response.status = line.split(':')[1].trim();
        }
        if (line.includes('Created:')) {
          response.created = line.replace(/\d{2}:\d{2}:\d{2}/g, '').split(':')[1].trim();
        }
        if (line.includes('Last Update:')) {
          response.updated = line.replace(/\d{2}:\d{2}:\d{2}/g, '').split(':')[1].trim();
        }
        if (line.includes('Expire Date:')) {
          response.expires = line.split(':')[1].trim();
        }
        if (/Registrant|Admin|Contacts|Registrar/gi.test(line)) {
          continue;
        }
        if(line.includes('Organization:')) {
          response.registrar.name = line.split(':')[1].trim();
        }
        if(line.includes('Name:')) {
          response.registrar.organization = line.split(':')[1].trim();
        }
        if(line.includes('Web:')) {
          response.registrar.web = line.substring(line.indexOf(':') + 1).trim();
        }
      }
      return response;
  }

  public getWhoisData(domain: string): Observable<WhoisResponseDto> {
    return this.http.get<WhoisResponseDto>(`${this.apiUrl}/whois/${domain}`);
  }
}
