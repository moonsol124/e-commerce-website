import '../../css/home.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <div className="div-home">
            <div className="home-page-1">
                some gif
            </div>
            <div className="home-page-3">
                <h1> New Arrivals </h1>
                <ul className="home-item-ul">
                    <li className="item-li">
                        <div className="item-info">
                            <div className="item-img">img</div>
                            <div className="item-name">name 1</div>
                        </div>
                    </li>
                    <li className="item-li">
                        <div className="item-info">
                            <div className="item-img">img</div>
                            <div className="item-name">name 2</div>
                        </div>
                    </li>
                    <li className="item-li">
                        <div className="item-info">
                            <div className="item-img">img</div>
                            <div className="item-name">name 3</div>
                        </div>
                    </li>
                </ul>
                <div className="button-container">
                    <Link to="/woman/new_arrival"><button>view all</button></Link>
                </div>
            </div>
            <div className="home-page-4">
                <h1> Seasonal special</h1>
                <p> Create Memories </p>
            </div>
            <div className="home-page-5">
                <h1> Trends </h1>
                <ul className="home-item-ul">
                    <li className="item-li">
                        <div className="item-info">
                            <div className="item-img">img</div>
                            <div className="item-name">name 1</div>
                        </div>
                    </li>
                    <li className="item-li">
                        <div className="item-info">
                            <div className="item-img">img</div>
                            <div className="item-name">name 2</div>
                        </div>
                    </li>
                    <li className="item-li">
                        <div className="item-info">
                            <div className="item-img">img</div>
                            <div className="item-name">name 3</div>
                        </div>
                    </li>
                </ul>
                <div className="button-container">
                    <Link to="/woman/trend"><button>view all</button></Link>
                </div>
            </div>
            <div className="home-page-2">
                <h1> Category </h1>
                <div className="home-category">
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                    <div className="category-item">
                        <div className="category-img">img</div>
                        <div className="button-container category-btn">button</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;