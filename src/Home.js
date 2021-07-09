import { useState, useEffect } from "react";


const Home = () => {

    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const clickMe = (e) => {
        e.preventDefault();
        const task = {title, completed};
        setIsPending(true);

        fetch('http://127.0.0.1:8000/api/task-create/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task)
        }).then(() => {
            console.log('new task added');
            setIsPending(false);
            
        })
    }

    const [lists, setLists] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/task-list')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setLists(data)
            });
    }, [])

    return (
        <div className="home">
            <div className="p-4 h1 text-primary text-center mx-auto display-inline-block">
                <i className="fa fa-check bg-primary text-white rounded p-2"></i>
                <u> TODO List</u>
            </div>

            <div className="row m-1 p-3">
                <div className="col col-11 mx-auto">
                    <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                        <div className="col">
                            <input className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." onChange={e => setTitle(e.target.value)}></input>
                        </div>

                        <div className="col-auto px-0 mx-0 mr-2">
                            {!isPending && <button type="button" onClick={clickMe} className="btn btn-primary">Add Task</button>}
                            {isPending && <button type="button" onClick={clickMe} className="btn btn-primary" disabled>Adding Task...</button>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-2 mx-4 border-black-25 border-bottom"></div>

            <div className="TaskList container">
                

                <div class="table-wrapper">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Todo item</th>
                                
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {lists &&
                        <tbody>
                             {lists.map((list) => (
                            <tr>
                                <td>{list.id}</td>
                               
                                <td className="" key={list.id}>
                                {list.title}
                                </td>
                                
                                
                                <td>
                                    <button className="btn btn-danger" >
                                        Delete
                                    </button>
                                    <button className="btn btn-success" >
                                        Finished
                                    </button>
                                </td>
                            </tr>
                            ))}
                        
                        </tbody>
                        }
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Home;