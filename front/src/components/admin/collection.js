import '../../css/admin.css';
import { useState, useEffect } from 'react';
import { Link, Location, Outlet, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

function ItemUpdateForm(props) {
    const [message, setMessage] = useState("");
    
    function onSubmit(e) {
        e.preventDefault();
        const url = `http://localhost:3000/collection/${props.id}/update`;
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
        const url = `http://localhost:3000/collection/${props.id}/delete`;
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
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [fits, setFits] = useState([]);
    const [cares, setCares] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/admin/colors"),
            fetch("http://localhost:3000/admin/sizes"),
            fetch("http://localhost:3000/admin/materials"),
            fetch("http://localhost:3000/admin/fits"),
            fetch("http://localhost:3000/admin/cares"),
            fetch("http://localhost:3000/admin/genders"),
        ])
        .then(([colors, sizes, materials, fits, cares, genders]) => Promise.all(
            [colors.json(), sizes.json(), materials.json(), fits.json(), cares.json(), genders.json()]
        ))
        .then(([res1, res2, res3, res4, res5, res6]) => {
            setColors(res1.colors.colors);
            setSizes(res2.sizes.sizes);
            setMaterials(res3.materials.materials);
            setFits(res4.fits.fits);
            setCares(res5.cares.cares);
            setGenders(res6.genders.genders);
        })
    }, [])

    function onSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:3000/collection/create";
    
        const data = {};

        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name.length <= 0) {
                break;
            }
            const attr = e.target[i].getAttribute('data-type');
            if (attr === 'array') {
                data[e.target[i].name] = [];
            }
        }
        
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name.length < 0) {
                break;
            }
            const attr = e.target[i].getAttribute('data-type');
            if (attr === 'array') {
                if (e.target[i].checked) {
                    data[e.target[i].name] = [... data[e.target[i].name], e.target[i].value];
                }
            }
            else {
                data[e.target[i].name] = e.target[i].value;
            }
        }
        const dataStringified = JSON.stringify(data);
        console.log(dataStringified);
        const requestOptions = {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: dataStringified,
        }

        fetch(url, requestOptions)
        .then(data=>data.json())
        .then(response => {
            console.log (response);
            if (response.status !== 200) {
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
            <div className="item-form-div">
                <label htmlFor="fotoUrl">Foto url: </label>
                <input type="text" name="fotoUrl" id="fotoUrl"></input>
            </div>
            <div className="item-form-div">
                <label htmlFor="price">Price: </label>
                <input type="text" name="price" id="price"></input>
            </div>
            <div className="item-form-div">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" id="description"></input>
            </div>
            <div className="item-form-div">
                <p>Colors: </p>
                <div className="checkboxes">
                    {colors.map(color=>{
                        return (
                            <div key={uniqid()} className="input-box-for-checkbox">
                                <label htmlFor="color">{color.name}</label>
                                <input type="checkbox" name="color" value={color['_id']} id={color['_id']} data-type='array'></input>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="item-form-div">
                <p>Cares: </p>
                <div className="checkboxes">
                    {cares.map(care=>{
                        return (
                            <div key={uniqid()} className="input-box-for-checkbox">
                                <label htmlFor="color">{care.name}</label>
                                <input type="checkbox" name="care" value={care['_id']} id={care['_id']} data-type='array'></input>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="item-form-div">
                <p>Sizes: </p>
                <div className="checkboxes">
                    {sizes.map(size=>{
                        return (
                            <div key={uniqid()} className="input-box-for-checkbox">
                                <label htmlFor="size">{size.name}</label>
                                <input type="checkbox" name="size" value={size['_id']} id={size['_id']} data-type='array'></input>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="item-form-div">
                <p>Fits: </p>
                <div className="checkboxes">
                    {fits.map(fit=>{
                        return (
                            <div key={uniqid()} className="input-box-for-checkbox">
                                <label htmlFor="fit">{fit.name}</label>
                                <input type="checkbox" name="fit" value={fit['_id']} id={fit['_id']} data-type='array'></input>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="item-form-div">
                <p>Genders: </p>
                <div className="checkboxes">
                    {fits.map(gender=>{
                        return (
                            <div key={uniqid()} className="input-box-for-checkbox">
                                <label htmlFor="gender">{gender.name}</label>
                                <input type="checkbox" name="gender" value={gender['_id']} id={gender['_id']} data-type='array'></input>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="item-form-div">
                <p>Materials: </p>
                <div className="checkboxes">
                    {materials.map(material=>{
                        return (
                            <div key={uniqid()} className="input-box-for-checkbox">
                                <label htmlFor="material">{material.name}</label>
                                <input type="checkbox" name="material" value={material['_id']} id={material['_id']} data-type='array'></input>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                {message}
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
        fetch("http://localhost:3000/collections")
        .then(data => data.json())
        .then(response => {
            if (response.status === 200) {
                setItems(response.collections.collections);
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