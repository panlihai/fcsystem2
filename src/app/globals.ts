import { Injectable } from '@angular/core';
import CacheService from 'fccore2/common/cache';

Injectable()
export class Globals {
    userinfo=CacheService.getS('userinfo');
    rptaskperiod=CacheService.get("rptaskperiod");
}
