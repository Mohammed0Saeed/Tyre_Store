import { useEffect, useState } from "react"
import ProductAdminView from "./ProductAdminView"
import closeImg from "../assets/close-x.svg"
import axios from "axios"
import "./Product.css"

// interface for tyre
interface Tyre {
  id: number
  imgSrc: string,
  diameter: number
  width: number
  height: number
  season: string
}

// interface for the checkbox in the filter
interface CheckboxItem {
  id: number
  d: number
  isChecked: boolean
}

// get the token from the local storage
const token = localStorage.getItem("token")

export default function TyreView() {
  // useStates for changable elements in the website
  const [shownTyres, setShowenTyres] = useState<Tyre[]>([])
  const [apiTyres, setApiTyres] = useState<Tyre[]>([])
  const [items, setItems] = useState<CheckboxItem[]>([])
  const [addViewOpened, setAddViewOpened] = useState(false)
  const [addTyre, setAddTyre] = useState<Tyre>({
    id: 0,
    imgSrc: "",
    height: 0,
    width: 0,
    diameter: 0,
    season: "SUMMER"
  })

  // when view is clicked
  const handleOpenView = () => {
    setAddViewOpened(!addViewOpened)
  }

  const handleAddTyre = (field: keyof Tyre, value: string | number) => {
    setAddTyre(prev => ({
      ...prev,
      [field]: (typeof value === "string") && (field !== "season" && field !== "imgSrc") ? Number(value) : value
    }))
  }

  // when a tyre is added
  const handlePost = () => {
    const { id, ...tyreWithoutId } = addTyre
    axios.post("http://localhost:8080/api/tyres", tyreWithoutId, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setShowenTyres(prev => [...prev, res.data]) 
      handleOpenView()
    })
    .catch(err => {
      console.error("Error posting tyre:", err)
    })

    // reload to show the updates
    window.location.reload();
  }

  const handleChange = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    )
  }

  // Load tyres from API
  useEffect(() => {
    axios.get("http://localhost:8080/api/tyres", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setShowenTyres(response.data)
      setApiTyres(response.data)
    })
    .catch(err => console.error("Error fetching tyres:", err))
  }, [])

  // update the list of the diametes when the tyres are loaded or updated
  useEffect(() => {
    if (shownTyres.length > 0) {
      const uniqueDiameters = Array.from(new Set(shownTyres.map(tyre => tyre.diameter))).sort((a, b) => a - b)
      const newItems: CheckboxItem[] = uniqueDiameters.map((diameter, i) => ({
        id: i + 1,
        d: diameter,
        isChecked: false
      }))
      setItems(newItems)
    }
  }, [shownTyres])

  // apply the filter of diameters
  useEffect(() => {
    const checkedDiameters = items.filter(item => item.isChecked).map(item => item.d)
    if (checkedDiameters.length === 0) {
      setApiTyres(shownTyres)
    } else {
      setApiTyres(shownTyres.filter(tyre => checkedDiameters.includes(tyre.diameter)))
    }
  }, [items, shownTyres])

  return (
    <div className="user-view d-flex position-relative">
      {/* View Box for the loaded tyres */}
      <div className="w-75 h-100 d-flex gap-2 justify-content-start flex-wrap">
        {apiTyres.map(item => (
          <ProductAdminView
            id={item.id}
            imgSrc={item.imgSrc}
            diameter={item.diameter}
            width={item.width}
            height={item.height}
            season={item.season}
          />
        ))}

        {/** Add new element button */}
        <div className="product shadow position-relative rounded d-flex flex-column justify-content-center align-items-center m-1">
          <button className="btn btn-outline-success w-100 h-100" onClick={handleOpenView}>add</button>
          <div className={addViewOpened ? "w-100 h-100 bg-white rounded position-absolute" : "d-none"}>
            <button className="close d-flex justify-content-center align-items-center rounded-circle m-2" onClick={handleOpenView}>
              <img src={closeImg} className="close-img" alt="close-png" />
            </button>
            <div className="tyre-info h-75 d-flex flex-column justify-content-between p-1">
              <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                <label>Height: </label>
                <input className="w-50" type="number" onChange={e => handleAddTyre("height", e.target.value)} />
              </div>
              <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                <label>Width: </label>
                <input className="w-50" type="number" onChange={e => handleAddTyre("width", e.target.value)} />
              </div>
              <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                <label>Diameter: </label>
                <input className="w-50" type="number" onChange={e => handleAddTyre("diameter", e.target.value)} />
              </div>
              <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                <label>Season: </label>
                <select onChange={e => handleAddTyre("season", e.target.value)}>
                  <option value="SUMMER">Summer</option>
                  <option value="WINTER">Winter</option>
                  <option value="ALLYEAR">AllYear</option>
                </select>
              </div>
              <div className="d-flex justify-content-between align-items-center ps-3 pe-3">
                        <label>Image URL: </label>
                        <input
                            type="text"
                            className="w-50"
                            placeholder="Image URL"
                            //value={(productProbList.imgSrc === null) ? "" : productProbList.imgSrc}
                            onChange={e => handleAddTyre("imgSrc", e.target.value)}
                        />
                    </div>
              <div className="d-flex justify-content-center align-items-center ps-3 pe-3">
                <button className="btn btn-outline-success m-1" onClick={handlePost}>save</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Item */}
      <div className="w-25 fixed mt-3">
        <div className="diameter">
          <h5>Diameter: </h5>
          {items.map(item => (
            <div key={item.id}>
              <input
                type="checkbox"
                className="form-check-input"
                onChange={() => handleChange(item.id)}
                checked={item.isChecked}
              />
              <label className="form-check-label ms-3"> {item.d} </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
