const Todo = require('../lib/todo');
const TodoList = require('../lib/to_do_list');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray outputs an array of todos', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first outputs the first todo item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last outputs the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift removes and returns the first todo', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes and returns the last todo', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns true when all items in the list are done', () => {
    expect(list.isDone()).toBeFalsy();
  });

  test('add throws a TypeError when a non-Todo object is added', () => {
    expect(() => list.add({todo: 'walk dog'})).toThrow(TypeError)
    expect(() => list.add(1)).toThrow(TypeError)
    expect(() => list.add(new TodoList())).toThrow(TypeError)
  });

  test('itemAt should return the todo item at a given index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('markDoneAt should mark an item done at a given index', () => {
    list.markDoneAt(2);
    expect(todo3.isDone()).toBeTruthy();
    expect(todo2.isDone()).toBeFalsy();
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);
  });

  test('markUndoneAt should mark an item not done at a given index', () => {
    list.markDoneAt(2);
    expect(todo3.isDone()).toBeTruthy();

    list.markUndoneAt(2);
    expect(todo3.isDone()).toBeFalsy();

    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);
  });

  test('markAllDone should mark all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBeTruthy();
    expect(todo2.isDone()).toBeTruthy();
    expect(todo3.isDone()).toBeTruthy();
    expect(list.allDone()).toBeTruthy();
  });

  test('removeAt deletes an item in the list at a given index', () => {
    expect(() => list.removeAt(4)).toThrow(ReferenceError);

    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns a string representation of a todo item', () => {
    let string = 
    `--- TodoList ---
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  });

  test('toString shows a done item with an X mark', () => {
    let completedItemString = 
    `--- TodoList ---
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    todo1.markDone();

    expect(list.toString()).toEqual(completedItemString);
  });

  test('toString shows all items as done with an X mark', () => {
    let completedItemString = 
    `--- TodoList ---
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    expect(list.toString()).toEqual(completedItemString);
  });

  test('forEach iterates over each element in the list', () => {
    let items = [];
    list.forEach(item => items.push(item));
    expect(list.toArray()).toEqual(items);
  });

  test('filter works properly and returns a new Todolist object', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(item => item.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

  test('findByTitle returns a todo title given an index', () => {
    expect(list.findByTitle('Buy milk')).toEqual(todo1);
  });
});