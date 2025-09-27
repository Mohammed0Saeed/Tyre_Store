import "./Product.css"
import closeImg from "../assets/close-x.svg"
import removeImg from "../assets/bin-cancel-close-delete-garbage-remove.svg"
import { useState } from "react"
import axios from "axios"

// interface for tyre
interface Tyre {
    id: number
    imgSrc: string
    diameter: number
    width: number
    height: number
    season: string
}

const token = localStorage.getItem("token")

export default function(tyre:Tyre) {
    const [isEdited, setIsEdited] = useState(false)
    const [productProbList, setProductProbList] = useState<Tyre>({... tyre})

    // when clicking edit or closing the edit page
    const handleEdit = () => {
        setIsEdited(!isEdited)
    }

    const handleChange = (field: keyof Tyre, value: string | number) => {
        setProductProbList(prev => ({
            ...prev,
            [field]: typeof value === "string" && field !== "season" && field !== "imgSrc" ? Number(value) : value
        }))
    }

    // when saving the edits on the item
    const handleSave = async () => {
        try {
            axios.put(
                `http://localhost:8080/api/tyres/${productProbList.id}`,
                productProbList,
                { headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                 } }
            );
            // close the window of editing after submittion
            setIsEdited(!isEdited);
        } catch (error) {
            console.error("Error updating tyre:", error);
        }

        window.location.reload();
    };

    // check if the user wants to delete this item
    const handleRemove = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
        try {
            await axios.delete(
                `http://localhost:8080/api/tyres/${productProbList.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (error) {
            console.error("Delete failed:", error)
            alert("Something went wrong while deleting.")
        }
    }

    // reload to save the changes
    window.location.reload()
}


    return (
        <div key={productProbList.id} className="product shadow position-relative rounded d-flex flex-column justify-content-between align-items-center m-1">
            <div className="control-panel position-absolute end-0 m-2 d-flex gap-2">
                <button className="close rounded-circle d-flex" onClick={handleRemove}>
                    <img src={removeImg} className="w-100 h-100 fit-cover" alt="remove" />
                </button>
            </div>
            <div className="img-container h-75 overflow-hidden rounded">
                <img src={productProbList.imgSrc} className="fit-cover w-100" alt="tyre-product-img"/>
            </div>
            <div className="information w-100 h-25 d-flex justify-content-between align-items-center p-2">
                <div className="name">{productProbList.width}/{productProbList.height}R{productProbList.diameter}
                    {productProbList.season === "SUMMER" ? "S" : productProbList.season === "WINTER" ? "W" : "Y"}</div>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
            </div>

            {/** edit the product info after clicking edit*/}
            <div className={
                isEdited ? "w-100 h-100 bg-white rounded position-absolute" : "d-none"
            }>
                <button className="close d-flex justify-content-center align-items-center rounded-circle m-2" onClick={handleEdit}>
                    <img src={closeImg} className="close-img" alt="close-png" />
                </button>
                <div className="tyre-info h-75 d-flex flex-column justify-content-between p-1">
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <label>Height: </label>
                        <input
                            className="w-50"
                            type="number"
                            value={(productProbList.height === 0) ? "" : productProbList.height}
                            onChange={e => handleChange("height", e.target.value)}
                            />
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <label>width: </label>
                        <input
                            className="w-50"
                            type="number"
                            value={(productProbList.width === 0) ? "" : productProbList.width}
                            onChange={e => handleChange("width", e.target.value)}
                            />
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <label>Diameter: </label>
                        <input
                            className="w-50"
                            type="number"
                            value={(productProbList.diameter === 0) ? "" : productProbList.diameter}
                            onChange={e => handleChange("diameter", e.target.value)}
                            />
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <label>Season: </label>
                        <select
                            className="w-50"
                            value={productProbList.season}
                            onChange={e => handleChange("season", e.target.value)}
                        >
                            <option value="SUMMER">Summer</option>
                            <option value="WINTER">Winter</option>
                            <option value="ALLYEAR">All Year</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <label>Image URL: </label>
                        <input
                            type="text"
                            className="w-50"
                            placeholder="Image URL"
                            //value={(productProbList.imgSrc === null) ? "" : productProbList.imgSrc}
                            onChange={e => handleChange("imgSrc", e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center ps-3 pe-3">
                        <button className="btn btn-outline-success m-1" onClick={handleSave}>save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}