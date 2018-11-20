import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from '@angular/fire/database';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import {LogHistory}  from '../models/log-history';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<{} | null>;

  user: Observable<{} | null>;
  userUid: string;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {

    this.user = this.afAuth.authState.switchMap((user) => {
      if (user) {
        this.userUid = user.uid;
        console.log('SWITCHMAP');
        console.log(user);
        console.log('SWITCHMAP');
        return this.db.object(`users/${user.uid}`).update({email: user.email}).then( () => {
          return this.db.object(`users/${user.uid}`).valueChanges();
        }).catch( (error) => {
          console.log('ERROR UPDATING USER EMAIL');
          console.log(error);
          console.log('ERROR UPDATING USER EMAIL');
        });
      } else {
        return Observable.of(null);
      }
    });
  }

  getUid(){
    return this.userUid;
  };

  inAdminList(uid:string){
    return this.db.database.ref(`admins`).once('value').then((snapshot)=>{
      let adminList =  snapshot.val();
      return Object.keys(adminList).includes(uid);
    })
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        this.userUid = auth.user.uid;
        console.log(auth.user.uid, " sign in!");
        const createdAt = firebase.database.ServerValue.TIMESTAMP;
        const systemTime = firebase.database.ServerValue.TIMESTAMP;
        // const sessionKey = this.db.database
        //                 .ref(`sessions`)
        //                 .push({
        //                   userUid: auth.user.uid
        //                 }).key;
        // const sessionPayload: any = {
        //   createdAt: createdAt,
        //   userUid: auth.user.uid,
        //   currentSessionKey: sessionKey,
        // };
        const log: LogHistory = new LogHistory();
        log.activity = "Log in";
        log.time = createdAt;
        // const sessionPayloads: any = {};
        // sessionPayloads[`currentSession/${auth.user.uid}`] = sessionPayload;
        // sessionPayloads[`users/${auth.user.uid}/logHistory/${sessionKey}`] = {'createdAt': createdAt};
        // return this.db.database.ref().update(sessionPayloads);
        // const payload: any = {};
        // payload[`users/${auth.user.uid}/logHistory`] = log;
        return  this.db.database.ref(`users/${auth.user.uid}/logHistory`).push(log);
      })
      .catch(error => {
        throw error;
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(
        (newUser) => {
          console.log('new user created!');
          this.userUid = newUser.user.uid;
          const createdAt = firebase.database.ServerValue.TIMESTAMP;
          const systemTime = (new Date()).toISOString();
          console.log(systemTime)
          const log: LogHistory = new LogHistory();
          log.activity = "Sign up";
          log.time = createdAt;
          const payload: any = {};
          this.db.database.ref(`users/${newUser.user.uid}/logHistory`).push(log);
          //add the user to the whitelist of the history.
          // payload[`admins/${newUser.user.uid}`] = true;
          return this.db.database.ref().update(payload);
        })
      .catch(
        (error) => {
          console.log(error);
          throw error;
        });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
