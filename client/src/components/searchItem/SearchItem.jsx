import "./searchItem.css"
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
    return (
        <div className="searchItem">
            <img src={item.photos[0]}
                alt=""
                className="siImg"
            />
            <div className="siDesc">
                <div className="siTitle">{item.name}</div>
                <div className="siDistance">{item.distance}m from center</div>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">
                    {item.desc}
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails"><div className="siRating">
                <span>Excellent</span>
                <button>8.9</button>
            </div>
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See availability</button>
                    </Link>
                </div></div>
        </div>
    )
}

export default SearchItem