import '../css/home.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Product from './product';

function Home() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:3000/collections';
        fetch(url)
        .then(data => data.json())
        .then(response => {
            setCollections(response.collections.collections);
        })
    }, [])

    return (
        <div className="div-home">
            <div className="home-page-1">
                <div className="home-page-1-texts">
                    <p className="home-page-1-texts-1 italic"> New, provocative, and dangerous.</p>
                    <p className="home-page-1-texts-2 italic"> Wild, romantic, and real. </p>
                    <p className="home-page-1-texts-3 italic"> We are always on our own journey towards to the perfection. </p>
                    <p className="home-page-1-texts-4 italic"> Everything that you feared and desired··· </p>
                    <h3 className="text-center bold"> discover it in our newest arrivales.</h3>
                    <div className="button-container">
                        <button className="white-bg-button"> Shop now.</button>
                    </div>
                </div>
            </div>
            <div className="home-page-2">
                <div className="home-page-2-texts medium-text">
                    <p className="italic"> Fashion means nothing without passion; </p>
                    <p className="italic"> Go try it, put it, wear it </p>
                    <p className="italic"> And most importanly,</p>
                    <p className="big-text bold text-center"> LIVE IT. </p>
                </div>
                <div className="home-category">
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/cute-young-girl-with-dark-wavy-hairstyle-bright-makeup-silk-dress-black-jacket-holding-sunglasses-hands-looking-away-against-beige-building-wall_197531-24462.jpg?w=740&t=st=1669485899~exp=1669486499~hmac=fe04a1424b0c1a81f99ed984ca67ab2be0e8e693f689bd0bfe6e4a425043e2d3")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Dress</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/picture-lady-orange-trousers-with-high-waist-white-top-with-floral-print_197531-17063.jpg?w=740&t=st=1669486381~exp=1669486981~hmac=3dd0b87bca6e02f4ebe680f5190ec34430f0b8e3d4456f0041900217226caf2c")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Top</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/close-up-portrait-shocked-woman-talking-phone_197531-16402.jpg?w=740&t=st=1669486421~exp=1669487021~hmac=a08565de0e0f8b28a5beded39d457ac3f9760d48cc56362376739017b6da8d23")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Jacket</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-round-sunglasses-positive-female-shows-facial-emotions-funny-model-isolated-yellow_158538-15808.jpg?w=740&t=st=1669486499~exp=1669487099~hmac=83b55b211ad81c7aadeab0d07fc328e92b078e4c11c91c774d957deef84f2cfb")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Shorts</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/girl-warm-cloths-studio_1303-5883.jpg?w=740&t=st=1669486538~exp=1669487138~hmac=7127c249ae2ed73176a8e9494f519a8329971663c63e2baadbb8afccb671c54d")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Shoes</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/portrait-woman-full-growth-wearing-white-t-shirt-jeans_197531-16971.jpg?w=740&t=st=1669486560~exp=1669487160~hmac=cb1f1d522339a49c54963349e3957f114140e7b359238aa36b5562af539274e1")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Jean</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/stylish-happy-attractive-smiling-woman-posing-desert-sand-dressed-white-clothes-wearing-straw-hat-sunglasses-sunset_285396-9188.jpg?w=740&t=st=1669486607~exp=1669487207~hmac=0ca4413006e2a8c3599b5c4d53a9f87acefaf1e2c85ced64aa1559098a2b8491")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Shirt</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/young-pretty-magnificent-shy-brunette-young-woman-posing-paris-street-elegant-lady-look-summertime-beige-colors-travel-experience_291049-1756.jpg?w=740&t=st=1669486631~exp=1669487231~hmac=fe63f7f46e98002193839f50f102c79dff5e0cfc1bda10b387037e5a13d25c59")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Bag</button>
                            </div>
                        </div>
                    </div>
                    <div className="category-item">
                        <div className="category-img" style={{backgroundImage: `url("https://img.freepik.com/free-photo/funny-shot-young-lovely-brown-haired-lady-with-bun-hairstyle-showing-cheerfully-tongue-front-while-taking-her-hood-isolated-beige-wall_295783-10747.jpg?w=740&t=st=1669486667~exp=1669487267~hmac=96f5e6826b1dac33238cc3ead8606aa046ecfc5fb69f8bd2ddcb861d0e4c239f")`}}>
                            <div className="button-container category-btn-container">
                                <button className="category-btn">Hoodie</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-page-3">
                <div className="home-page-3-img-container">
                    <div className="home-page-3-img"></div>
                </div>
                <div className="home-page-3-texts text-end medium-text">
                    <p className="italic"> From woman, </p>
                    <p className="italic"> By woman, </p>
                    <p className="italic"> And for woman. </p>
                    <p className="small-text bold underline scale-on-hover"> LEARN MORE </p>
                </div>
                <div className="home-page-3-texts-2 text-center">
                    <p className="big-text"> Designed for woman's comfort. </p>
                    <p className="medium-text"> With the finest materials and technology, we make clothes that last a very long time. 
                        Our goal is simple; it's to make a beautiful clothes in which women of all type, feel comfortable.
                    </p>
                </div>
                <ul className="home-item-ul">
                    {collections.map(c => {
                        return <Product name={c.name} price={c.price} fotoUrl={c.fotoUrl}/>
                    })}
                </ul>
            </div>
            <div className="home-page-4">
                <div className="home-page-4-texts text-shadow-black-white">
                    <p className="italic"> The seasons are beautiful when you know their beauty. </p>
                    <p className="italic"> And life is a gift···</p>
                    <p className="italic"> discover the wonders of seasons with our latest seasonal items. </p>
                    <div className="button-container">
                        <button className="white-bg-button scale-on-hover"> Shop Now. </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;