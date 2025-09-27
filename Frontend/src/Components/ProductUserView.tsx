import "./Product.css"
import tyreImg from "../assets/tyre-product-example.jpg"
import closeImg from "../assets/close-x.svg"


import { useState } from "react"

interface Tyre {
    imgSrc: string
    diameter: number
    width: number
    height: number
    season: string
}


export default function(tyre:Tyre) {
    let season = ""
    if (tyre.season === "SUMMER") {
        season = "S"
    } else if (tyre.season === "WINTER") {
        season = "W"
    }
    else {
        season = "Y"
    }

    const [isViewed, setIsViewed] = useState(false)

    const handleView = () => {
        setIsViewed(!isViewed)
    }

    return (
        <div className="product shadow position-relative rounded d-flex flex-column justify-content-between align-items-center m-1 ">
            <div className="img-container h-75 overflow-hidden rounded">
                <img src={tyre.imgSrc} className="fit-cover w-100" alt="tyre-product-img"/>
            </div>
            <div className="information w-100 h-25 d-flex justify-content-between align-items-center p-2">
                <div className="name">{tyre.width}/{tyre.height}R{tyre.diameter}{season}</div>
                <button className="btn btn-primary" onClick={handleView}>view</button>
            </div>

            {/* When clicking view */}
            <div className={
                isViewed ? "w-100 h-100 bg-white rounded position-absolute" : "d-none w-100 h-100 bg-white rounded position-absolute"
            }>
                <button className="close d-flex justify-content-center align-items-center rounded-circle m-2" onClick={handleView}>
                    <img src={closeImg} className="close-img" alt="close-png" />
                </button>
                <div className="tyre-info d-flex flex-column p-3">
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <p>Height:</p>
                        <p>{tyre.height}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <p>Width:</p>
                        <p>{tyre.width}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <p>Diameter:</p>
                        <p>{tyre.diameter}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <p>Season:</p>
                        <p>{tyre.season.toLowerCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}