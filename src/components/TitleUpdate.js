import '../App.css';
import React, {Fragment, useRef, useState} from 'react';

const TitleUpdate = () => {
  const inputRef = useRef();
  const [name, setName] = useState('Map!');

  const handleChangeTitle = () => {
    // const foo = { foo: "bar", stuff: "string" };
    // const newFoo = { foo: "werf", stuff: "string", you:"hello" };
    // const updateFoo = { ...newFoo, ...foo }
    // console.log(updateFoo);
    // const input = document.getElementById("my-input");
    // console.log(input.value);
    // console.log(inputRef.current.value);

    setName(inputRef.current.value);
    document.getElementById('my-input').value = '';
  };

  return (
    <Fragment>
      <div className="title">
        <h3 style={{zIndex: 1}}>Welcome to the {name}</h3>
      </div>
      <div className="title-change">
        <div className="button-title">Change Title:</div>
        <input type="text" id="my-input" ref={inputRef} />
        <button onClick={handleChangeTitle}>Change Title</button>
      </div>
    </Fragment>
  );
};

export default TitleUpdate;
/*
function TitleUpdate(props) {
    const [name, setName] = useState("{Insert Title}");
    const [newName, setNewName] = useState(" ");
  
    const handleUpdateInput = (e) => {
      setNewName(e.target.value);
      console.log(setNewName);
    }

    return (
        <div>
            <div className="title">
                <Legacy name={name}/>
                <h1>Welcome to the {name}</h1>
            </div>
            <div className="button-title">
                Change Title:
            </div>
            <input type="text" onChange={handleUpdateInput}></input>
            <button onClick={() => setName(newName)}>Change Title</button>
        </div>
    )
} 
*/

// Declarative Approach
/*
export default () => {
    const inputRef = useRef();
    const [name, setName] = useState("{Insert Title}");

    const handleChangeTitle = () =>  setName(inputRef.current.value);
    
    return (
        <Fragment>
            <div className="title">
                <h1>Welcome to the {name}</h1>
            </div>
            <div className="button-title">
                Change Title:
            </div>
            <input type="text" id="my-input" ref={inputRef} />
            <button onClick={handleChangeTitle}>Change Title</button>
        </Fragment>
    )
}
*/
