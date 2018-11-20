import { Injectable } from '@angular/core';
import { SearchHistory } from '../models/search-history'
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {of} from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase/app';

@Injectable()
export class HistoryService {

  constructor(
    private db: AngularFireDatabase,
    private authService:AuthService,
    private afAuth: AngularFireAuth,
  ) {
  }

  addTranslateHistory(translateContent: string, target: string) {
    console.log('Add one record for translating.');
    var timestamp = (new Date).toISOString();
    var activity = 'Translate(' + target + ')';
    let uid = this.authService.getUid();  
    var record = new SearchHistory(timestamp, activity, translateContent);
    var admin = new SearchHistory(timestamp, activity, translateContent);
    admin.uid = uid;
    this.db.database.ref(`users/${uid}/history/`).push(record);
    this.db.database.ref(`history/`).push(admin);
  }


  addToggleHistory(translateContent: string){
    console.log('iamcalled',translateContent)
    var timestamp = (new Date).toISOString();
    var activity = 'Toggle';
    let uid = this.authService.getUid();  
    var record = new SearchHistory(timestamp, activity, translateContent);
    var admin = new SearchHistory(timestamp, activity, translateContent);
    admin.uid = uid;
    this.db.database.ref(`users/${uid}/history/`).push(record);
    this.db.database.ref(`history/`).push(admin);
  }

  addSearchHistory(keywords: string) {
    console.log('Add one record for searching.');
    var timestamp = (new Date).toISOString();
    var activity = 'Search';
    var record = new SearchHistory(timestamp, activity, keywords);
    let uid = this.authService.getUid(); 
    var admin = new SearchHistory(timestamp, activity, keywords);
    admin.uid = this.authService.getUid();
    this.db.database.ref(`users/${uid}/history/`).push(record);
    this.db.database.ref(`history/`).push(admin);
  }


  getUserRecords() {
    const currentuser = this.afAuth.auth.currentUser.uid;
    const record = this.db.object(`users/${currentuser}/history`).snapshotChanges();
    return record.switchMap(
      (value) => {
        return of(value.payload.val());
      });
  }

  getAdminRecords() {
    const record = this.db.object(`history`).snapshotChanges();
    return record.switchMap(
      (value) => {
        return of(value.payload.val());
      });
  }
}
