import { useState, useEffect } from "react";

const HOST = "http://localhost:1337";

function App() {

  let [inputValue, setInputValue] = useState("");

  let [todoItems, setTodoItems] = useState([]);

  const fetchTodos = async () => {
      const response = await fetch(`${HOST}/api/todo-items`)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      const todoItems = jsonResponse.data.map((todoItemCollection) => {
        return {
          id: todoItemCollection.id,
          name: todoItemCollection.attributes.title,
          completed: todoItemCollection.attributes.completed
        }
      });
      setTodoItems(todoItems)

    }

  useEffect(()=> {
    fetchTodos();
  }, [])


  let deleteTodo = async (id) => {
    const sendDeleteTodoRequest = async () => {
      try {
        const URL = `${HOST}/api/todo-items`
        await fetch(`${URL}/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(error)
      }
   }

   await sendDeleteTodoRequest();
   fetchTodos();
  };

  let completeTodo = async (id) => {
    const sendUpdateTodoRequest = async () => {
      try {
        const URL = `${HOST}/api/todo-items`
        const todoItem = todoItems.find((todoItem) => todoItem.id === id)
        await fetch(`${URL}/${id}`, {
          method: "PUT",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              completed: !todoItem.completed,
            }
          })
        });
        fetchTodos();
      } catch (error) {
        console.error(error)
      }
   }

   await sendUpdateTodoRequest();
   fetchTodos();
  };

  let addTodo = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

   const sendAddTodoRequest = async () => {
    try {
      const URL = `${HOST}/api/todo-items`
      await fetch(URL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            title: inputValue,
          }
        })
      });
    } catch (error) {
      console.error(error)
    }
   }

   await sendAddTodoRequest();
   fetchTodos();

    setInputValue("")
  };

  let style = (item) => {
    return {
      textDecoration: item.completed ? "line-through" : "none",
    };
  };

  let list = todoItems.map((item) => {
    return (
      <li key={item.id} style={style(item)}>
        <input type="checkbox" onChange={() => completeTodo(item.id)} checked={item.completed}/>
        {item.name}
        <button onClick={() => deleteTodo(item.id)}>-X-</button>
      </li>
    );
  });

  let updateValue = (e) => {
    setInputValue(e.target.value);
  };

  const deleteVulgarity = async () => {
    try {
      const URL = `${HOST}/api/delete-vulgarity`
      await fetch(URL, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ test: "example" })
      });
      fetchTodos();
    } catch (error) {
      console.error(error)
    }
  }
    


  return (
    <div>
      <form onSubmit={addTodo}>
        <input type="text" value={inputValue} onChange={updateValue} />
        <input type="submit" />
      </form>
      <ul>{list}</ul>
      <button onClick={deleteVulgarity}>Delete Vulgarity</button>
    </div>
  );
}

export default App;