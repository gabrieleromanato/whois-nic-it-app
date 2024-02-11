export interface WhoisResponseModel {
    domain: string;
    status: string;
    created: string;
    updated: string;
    expires: string;
    registrar: {
      organization: string;
      name: string;
      web: string;
    }
}
