import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment-dev';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private collectionName = 'scores';

  constructor(private angularFirestore: AngularFirestore) {}

  getScores(): Observable<any[]> {
    return this.angularFirestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  createScore(data: any): Promise<void> {
    const id = this.angularFirestore.createId();
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(id)
      .set(data);
  }

  updateScore(id: string, data: any): Promise<void> {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(id)
      .update(data);
  }

  deleteScore(id: string): Promise<void> {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
  }

  getTopScores(): Observable<any[]> {
    return this.angularFirestore
      .collection(this.collectionName, (ref) =>
        ref.orderBy('score', 'desc').limit(10)
      )
      .valueChanges({ idField: 'id' });
  }
}
