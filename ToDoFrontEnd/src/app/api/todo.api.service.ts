import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
const baseUrl='https://localhost:5001/'
@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private http: HttpClient) {}

  create(todoitem: ToDoItem): Observable<void>{
    return this.http.post<void>(`${baseUrl}todos`, todoitem)
  }

  findById(id: number): Observable<ToDoItem>{
    return this.http.get<ToDoItem>(`${baseUrl}todos/${id}`)
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${baseUrl}todos?id=${id}`)
  }
}
