import '../css/home.css';

function Product(props) {
    return (
        <li className="item-li">
            <div className="item-content">
                <div className="item-img-container">
                    <div className="item-img" style={{backgroundImage: `url(${props.fotoUrl})`}}></div>
                </div>
                <div className="item-info bold">
                    <div className="item-info-name">
                        <span>{props.name}</span>
                    </div>
                    <p className="text-end">
                        {props.price}$
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Product;