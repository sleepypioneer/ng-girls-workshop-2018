import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
​import { StorageService } from './storage.service';


const todoListStorageKey = 'Todo_List';
​
const defaultTodoList = [
  {title: 'find a treasure map'},
  {title: 'find a crew of swashbuckling pirates'},
  {title: 'mop the deck'},
  {title: 'walk the plank'},
  {title: 'find long lost treasure'},
  {title: 'have a parrot'},
  {title: 'sail the high seas!'},
];
​

@Injectable()
export class TodoListService {
​
  todoList: TodoItem[];

  constructor(private storageService: StorageService) {
    this.todoList =
      storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  getTodoList() {
    return this.todoList;
  }

  saveList() {
      this.storageService.setData(todoListStorageKey, this.todoList);
  }

  addItem(item: TodoItem) {
    this.todoList.push(item);
    this.saveList()
  }

  updateItem(item: TodoItem, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList()
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

}
