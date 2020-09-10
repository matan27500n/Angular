import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  public isDev = true;

  constructor() {}
  public setDev(isDev: boolean): void {
    this.isDev = isDev;
  }
  public getDev(): boolean {
    return this.isDev;
  }
}
