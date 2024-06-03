import { Observable } from "rxjs";

export abstract class ApiRickAndMorty {
    abstract getAll(_page: number): Observable<any>;
    abstract getById(id: string): Observable<any>;
}