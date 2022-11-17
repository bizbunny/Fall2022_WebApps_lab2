import React, { useEffect, useContext } from 'react';//usecontext
import { useResource } from 'react-request-hook';
import { useParams, useNavigate } from "react-router-dom";
import {StateContext} from "../context";//look at statecontenct
import Todo from "../components/Todo";

export default function TodoPage () {
    const { id } = useParams();
    const {state, dispatch}=useContext(StateContext);

    const navigate = useNavigate();

    const [todo, getTodo] = useResource(()=> ({
        url: `/todo/${todo}`,
        method: "get",
        header: {Authorization: `${state.user.access_token}`},
    }));
    useEffect(getTodo,[id]);

    useEffect(()=>{
        navigate(`/todo/${todo.data._id}`);
    },[todo]);
    return(
        <div>
            {(todo && todo.data)
                ? <Todo {...todo.data} />
                : 'Loading...'
            }
            <hr />
        </div>
    );
}
