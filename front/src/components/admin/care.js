import '../../css/admin.css';
import { useState, useEffect } from 'react';
import { Link, Location, Outlet, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

function ItemUpdateForm(props) {
    const [message, setMessage] = useState("");
    
    function onSubmit(e) {
        e.preventDefault();
        const url = `http://localhost:3000/admin/care/${props.id}/update`;
        const data = {};
        for (let i = 0; i < e.target.length; i++) {
            const fields = e.target[i];
            if (fields.value.length > 0) {
                data[fields.name] = fields.value;
            }
        }

        const requestOptions = {
            headers: {'Content-Type': 'application/json'},
            method: "PUT",
            body: JSON.stringify(data),
        }

        fetch(url, requestOptions)
        .then(data=>data.json())
        .then(response => {
            if (response.status !== 201) {
                setMessage(response.message);
                return;
            }
            props.renderOnItemAdded();
            for (let i = 0; i < e.target.length; i++) {
                e.target[i].value = "";
            }
        })
    }

    return (
        <form className="form-container item-update-form" onSubmit={onSubmit}>
            <div className="item-form-div">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" defaultValue={props.item.name}></input>
            </div>
            <div>
                <p>{message}</p>
            </div>
            <div className="button-container">
                <button type="submit"> Submit </button>
            </div>
        </form>
    )
}

function Description(props) {
    const [formToggled, setFormToggled] = useState(false);
    const [message, setMessage] = useState("");
    
    function toggleForm() {
        if (formToggled) {
            setFormToggled(false);
        }
        else {
            setFormToggled(true);
        }
    }
    
    function deleteItem() {
        const url = `http://localhost:3000/admin/care/${props.id}/delete`;
        const requestOptions = {
            headers: {"Content-Type": 'applicaiton/json'},
            method: "DELETE",
        }
        fetch(url, requestOptions)
        .then(data=>data.json())
        .then(response=>{
            if (response.status !== 201) {
                setMessage(response.message);
                return;
            }
            props.renderOnItemAdded();
        })
    }

    return (
        <ul className="items-ul">
            <li className="li-grid-two-colums"> Id: <span>{props.id}</span></li>
            <li className="li-grid-two-colums"> name: <span>{props.name}</span></li>
            <li className="button-container">
                <button onClick={toggleForm}> Update </button>
                <button onClick={deleteItem}> Delete </button>
            </li>
            <li>
                {message}
            </li>
            {(formToggled)?<ItemUpdateForm item={props} renderOnItemAdded={props.renderOnItemAdded} id={props.id} />:null}
        </ul>
    )
}

function Detail(props) {
    const [descriptionToggled, setDescriptionToggled] = useState(false);

    function showDetail() {
        if (descriptionToggled) {
            setDescriptionToggled(false);
        }
        else {
            setDescriptionToggled(true);
        }
    }

    return (
        <li key={uniqid()}>
            <div onClick={showDetail} className="items-li">{props.index}. <span> {props.item.name}</span></div>
            {(descriptionToggled)?<Description renderOnItemAdded={props.renderOnItemAdded} id={props.item['_id']} name={props.item.name} rgbValue={props.item.rgbValue}/>:null}
        </li>
    )
}

function ItemForm(props) {
    const [message, setMessage] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:3000/admin/care/create";
        const data = {};
        for (let i = 0; i < e.target.length; i++) {
            const fields = e.target[i];
            if (fields.value.length > 0) {
                data[fields.name] = fields.value;
            }
        }
        
        const requestOptions = {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(data),
        }

        fetch(url, requestOptions)
        .then(data=>data.json())
        .then(response => {
            if (response.status !== 200) {
                console.log (response);
                // setMessage(response.message);
                return;
            }
            props.renderOnItemAdded();
            for (let i = 0; i < e.target.length; i++) {
                e.target[i].value = "";
            }
        })
    }

    return (
        <form className="form-container" onSubmit={onSubmit}>
            <div className="item-form-div">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name"></input>
            </div>
            <div>
                <p>{message}</p>
            </div>
            <div className="button-container">
                <button type="submit"> Submit </button>
            </div>
        </form>
    )
}

function Item() {
    const [items, setItems] = useState([]);
    const [newItemAdded, setNewItemAdded] = useState(false);
    const [addFormToggled, setAddFormToggled] = useState(false);

    function openItemForm() {
        if (addFormToggled) {
            setAddFormToggled(false);
        }
        else {
            setAddFormToggled(true);
        }
    }

    function renderOnItemAdded() {
        setNewItemAdded(true);
        setTimeout(() => {
            setNewItemAdded(false);
        }, 1)
    }

    useEffect(() => {
        fetch("http://localhost:3000/admin/cares")
        .then(data => data.json())
        .then(response => {
            if (response.status === 200) {
                setItems(response.cares.cares);
            }
        })
    }, [newItemAdded])
    return (
        <ul className="items-ul">
            <li><button onClick={openItemForm}>Add Item</button></li>
            {(addFormToggled)?<ItemForm renderOnItemAdded={renderOnItemAdded}/>:null}
            {items.map((item, index) => {
                return (
                    <Detail renderOnItemAdded={renderOnItemAdded} key={uniqid()} index={index+1} item={item}/>
            )})}
        </ul>
    )
}

export default Item;