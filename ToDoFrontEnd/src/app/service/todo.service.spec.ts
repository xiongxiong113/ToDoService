import { ToDoItem } from './../model/ToDoItem';
import { TestBed } from '@angular/core/testing';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';
import { TodoApiService } from '../api/todo.api.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
const baseUrl='https://localhost:5001/'

describe('TodoService', () => {
  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','get','delete']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers: [
        TodoApiService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(9, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(of({}))
    // when
    service.create(todoItem);
    // then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${baseUrl}todos`,
      todoItem
    );
  });

  it('should response error when create failed', () => {
    // given
    const todoItem = new ToDoItem(9, 'title', 'description', true);
    httpClientSpy.post.and.returnValue(throwError(()=>({errorMessage:'create failed'})))
    // when
    service.create(todoItem);
    // then
    expect(service.errorMessage).toEqual('create failed')
  });

  it('should get todoItem by id via mockHttp get', () => {
    // given
    httpClientSpy.get.and.returnValue(of(new ToDoItem(1,'title', 'description', true)))
    // when
    service.findById(1).subscribe(data=>console.log(data));
    // then
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${baseUrl}todos/1`,
    );
  });

  it('should delete todoItem by id via mockHttp delete', () => {
    // given
    httpClientSpy.delete.and.returnValue(of({}))
    // when
    service.delete(1)
    // then
    expect(httpClientSpy.delete).toHaveBeenCalledWith(
      `${baseUrl}todos?id=1`,
    );
  });
});
