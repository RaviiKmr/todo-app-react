import { useState, useEffect } from "react";

const Home = () =>{

    const clickMe = () => {
        alert('hello');
      }

    const [lists, setLists] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(res => {
            return res.json();
        })
        .then(data =>{
            setLists(data)
        });
    }, [])

    return (
        <div className="home">
            <form>
                <input placeholder="enter task">
                </input>
                <button type="submit">add</button>
            </form>
            <div className="TaskList">
                {lists && <ul>
                {lists.map((list) =>(
                <div className="list-item" key={list.id}>
                    <li>{ list.title }<button onClick={clickMe}>X</button><button>e</button></li>
                </div>
                ))}
                
                </ul>}
            </div>
            
        </div>
    );
}

export default Home; 