import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const savetols = params => {
    localStorage.setItem("todos", JSON.stringify(params))
  }

  const togglefinished = () => {
  setshowfinished(!showfinished)
}

 useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if (todoString && todoString !== "undefined") {
    try {
      let ltodos = JSON.parse(todoString)
      settodos(ltodos)
    } catch (e) {
      localStorage.removeItem("todos")
    }
  }
}, [])

  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id != id;
    });
    settodos(newtodos);
    savetols(newtodos);
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id != id;
    });
    settodos(newtodos);
    savetols(newtodos);
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

 const handleadd = () => {
  let newtodos = [...todos, { id: uuidv4(), todo, iscompleted: false }];
  settodos(newtodos);
  settodo("");
  savetols(newtodos);   // <-- pass it, and compute it first
}

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos);
    savetols(newtodos);
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-red-300 min-h-[80vh] md:w-[35%]">
      <h1 className="font-bold text-center text-2xl">iTask -Manage your tasks at one place</h1>
        <div className="addtodo flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add Todo</h2>
          <div className="flex">
          <input onChange={handlechange} value={todo} type="text" className="w-full rounded-lg px-5 py-1" />
          <button onClick={handleadd} disabled={todo.length === 0} className="bg-red-200 hover:bg-r p-4 py-2 text-sm disabled:opacity-50 font-bold text-white rounded-full mx-2"> Save </button>
          </div>
        </div>
        <input className="my-4" type="checkbox" onChange={togglefinished} checked={showfinished} /> Show Finished
        <h2 className="text-xl font-bold"> Your Todo List</h2>
        
        <div className="todos">
          {todos.length === 0 && <div className="m-5"> No Todos Added </div>}
          {todos.map(item => {

            return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} />
                <div className={item.iscompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleedit(e, item.id) }} className="bg-red-200 hover:bg-red-400 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"> <FaEdit /> </button>
                <button onClick={(e) => { handledelete(e, item.id) }} className="bg-red-200 hover:bg-red-400 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"> <AiFillDelete /> </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
