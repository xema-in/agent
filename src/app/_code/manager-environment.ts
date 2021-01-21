import { environment } from '../../environments/environment';

export class ManagerEnvironment {
    static getBackendUrl(): string {
        if (environment.backend !== '') {
            return environment.backend;
        } else {
            return localStorage.getItem('backend');
        }
    }
}
