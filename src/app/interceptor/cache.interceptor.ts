import { Injectable } from '@angular/core';
import { HttpResponse, HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpCacheService } from '../service/http-cache.service';

@Injectable()

export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return
    }
}