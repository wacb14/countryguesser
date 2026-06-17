import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore/lite';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  updateDoc,
} from 'firebase/firestore/lite';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private collectionName = 'scores';
  private firestore = inject(Firestore);

  getScores(): Observable<any[]> {
    return this.collectionValues(collection(this.firestore, this.collectionName));
  }

  createScore(data: any): Promise<void> {
    return addDoc(collection(this.firestore, this.collectionName), data).then(
      () => undefined,
    );
  }

  updateScore(id: string, data: any): Promise<void> {
    return updateDoc(doc(this.firestore, this.collectionName, id), data);
  }

  deleteScore(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, this.collectionName, id));
  }

  getTopScores(): Observable<any[]> {
    const topScoresQuery = query(
      collection(this.firestore, this.collectionName),
      orderBy('score', 'desc'),
      limit(10),
    );

    return this.collectionValues(topScoresQuery);
  }

  private collectionValues(sourceQuery: Query<DocumentData>): Observable<any[]> {
    return from(getDocs(sourceQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        })),
      ),
    );
  }
}
