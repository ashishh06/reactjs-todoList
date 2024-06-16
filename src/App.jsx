import { useState,useEffect } from "react";
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

const [todos,settodos]=useState([])
const [todoValue, setTodoValue] = useState('')

function persistData(newList) {
  localStorage.setItem('todos', JSON.stringify({ todos: newList }))
}

function handleAddTodos(newtodo){
  const newtodolist=[...todos,newtodo];
  settodos(newtodolist);
  persistData(newtodolist)
}

function handleDelete(index){
  const newtodolist=todos.filter((todo,todoIndex)=>{
    return todoIndex!=index
  })
  settodos(newtodolist);
  persistData(newtodolist)
}

function haandleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDelete(index)
}

useEffect(() => {
  if (!localStorage) {
    return
  }

  let localTodos = localStorage.getItem('todos')
  if (!localTodos) {
    return
  }

  console.log(localTodos)
  localTodos = JSON.parse(localTodos).todos
  settodos(localTodos)

}, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={haandleEditTodo} handleDelete={handleDelete} todos={todos}/>
    </>
  )
}

export default App
