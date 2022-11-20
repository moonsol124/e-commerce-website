import '../../css/admin.css';
import { useState, useEffect } from 'react';
import { Link, Location, Outlet, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

function ItemUpdateForm(props) {
    const [message, setMessage] = useState("");
    console.log (props.fields);

    function onSubmit(e) {
        e.preventDefault();
        const url = `http://localhost:3000/admin/${props.endpointSingle}/${props.id}/update`;
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
            console.log (response);
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
            {props.fields.map(item=> {
                console.log (item.value);
                return (
                    <div className="item-form-div">
                        <label htmlFor={item.name}>{item.label}</label>
                        <input type={item.type} name={item.name} id={item.name} value={item.value}></input>
                    </div>
                )
            })}
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
    const [fields, setFields] = useState([]);
    const fieldsToUpdate = props.fields;
    for (let i = 0; i < fieldsToUpdate.length; i++) {
        for (const key in props.item) {
            if (fieldsToUpdate[i].name === key) {
                fieldsToUpdate[i]['value'] = props.item[key]; 
            }
        }
    }
    
    // for (const [key, value] of Object.entries(props.item)) {
    //     console.log (key, value);
    // }

    useEffect(() => {
        const array = [];
        for (const [key, value] of Object.entries(props.item)) {
            const obj = {}
            obj[key] = value;
            array.push(obj);
        }
        setFields(array);
    }, [])

    function toggleForm() {
        if (formToggled) {
            setFormToggled(false);
        }
        else {
            setFormToggled(true);
        }
    }
    
    function deleteItem() {
        const url = `http://localhost:3000/admin/${props.endpointSingle}/${props.item['_id']}/delete`;
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
            {fields.map(item => {
                const key = Object.keys(item)[0];
                const value = Object.values(item)[0];

                return (
                    <li key={uniqid} className="li-grid-two-colums">
                        <span>{key}</span>
                        <span>{value}</span>
                    </li>
                )
            })}
            <li className="button-container">
                <button onClick={toggleForm}> Update </button>
                <button onClick={deleteItem}> Delete </button>
            </li>
            <li>
                {message}
            </li>
            {(formToggled)?<ItemUpdateForm fields={fieldsToUpdate} endpointSingle={props.endpointSingle} renderOnItemAdded={props.renderOnItemAdded} id={props.item['_id']} />:null}
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
            {(descriptionToggled)?<Description fields={props.fields} renderOnItemAdded={props.renderOnItemAdded} endpointSingle={props.endpointSingle} item={props.item}/>:null}
        </li>
    )
}

function ItemForm(props) {
    const [message, setMessage] = useState("");
    
    function onSubmit(e) {
        e.preventDefault();
        const url = `http://localhost:3000/admin/${props.endpointSingle}/create`;
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
        <form className="form-container" onSubmit={onSubmit}>
            {props.fields.map(item=> {
                return (
                    <div className="item-form-div">
                        <label htmlFor={item.name}>{item.label}</label>
                        <input type={item.type} name={item.name} id={item.name}></input>
                    </div>
                )
            })}
            <div className="button-container">
                <button type="submit"> Submit </button>
            </div>
        </form>
    )
}

function Item(props) {
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
        console.log (props.endpointMultiple);
        fetch(`http://localhost:3000/admin/${props.endpointMultiple}`)
        .then(data => data.json())
        .then(response => {
            if (response.status === 200) {
                setItems(response.items.items);
            }
        })
    }, [newItemAdded])

    return (
        <ul className="items-ul">
            <li><button onClick={openItemForm}>Add Item</button></li>
            {(addFormToggled)?<ItemForm fields={props.fields} endpointSingle={props.endpointSingle} renderOnItemAdded={renderOnItemAdded}/>:null}
            {items.map((item, index) => {
                return (
                    <Detail fields={props.fields} endpointSingle={props.endpointSingle} endpointMultiple={props.endpointMultiple} renderOnItemAdded={renderOnItemAdded} key={uniqid()} index={index+1} item={item}/>
            )})}
        </ul>
    )
}

export default Item;