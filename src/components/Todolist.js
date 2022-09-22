import Todo from './Todo'
export default function Todolist({todos = []}){
    return(
        <div>
            {todos.map((t, i) => <Todo {...t} key ={'todo-' + i} />)}
        </div>
    )
}