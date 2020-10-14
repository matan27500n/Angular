import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevService {
  public isDev = false;

  constructor() {}
  public setDev(isDev: boolean): void {
    this.isDev = isDev;
  }
  public getDev(): boolean {
    return this.isDev;
  }
}
