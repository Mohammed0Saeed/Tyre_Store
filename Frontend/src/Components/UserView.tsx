import ProductUserView from "./ProductUserView";
import {useEffect, useState} from "react"
import axios from "axios"

interface Tyre {
    imgSrc: string
    diameter: number
    width: number
    height: number
    season: string
}

interface CheckboxItem {
  id: number;
  d: number | null;
  isChecked: boolean;
}

const token = localStorage.getItem("token");

export default function () {
    const [allTyres, setAllTyres] = useState<Tyre []>([])
    const [apiTyres, setApiTyres] = useState<Tyre []>([])

    const uniqueDiameters = Array.from(new Set(apiTyres.map(tyre => tyre.diameter).sort())); // Use uniqueDiameters
    const initialItems: CheckboxItem[] = uniqueDiameters.map((diameter, i) => ({
        id: i + 1,
        d: diameter,
        isChecked: false
    }))

    const [items, setItems] = useState<CheckboxItem[]>(initialItems)

    

    const handleChange = (id : number) => {
        console.log(id)
        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id ? {...item, isChecked: !item.isChecked} : item
            )
        )
    }

    useEffect(() => {
            const uniqueDiameters = Array.from(new Set(allTyres.map(tyre => tyre.diameter))).sort((a, b) => a - b)
            const newItems: CheckboxItem[] = uniqueDiameters.map((diameter, i) => ({
                id: i + 1,
                d: diameter,
                isChecked: false
            }))
            setItems(newItems)
        }, [allTyres])
    

    useEffect(() => {
        const baseURL = "http://localhost:8080/api/tyres"
        axios.get(baseURL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                        setApiTyres(response.data)
                        setAllTyres(response.data)
            }).catch(err => console.error("Error: ", err))
        }, [])

    useEffect(() => {
        const checkedDiameters = items
            .filter(item => item.isChecked)
            .map(item => item.d);

        if (checkedDiameters.length === 0) {
            setApiTyres(allTyres);
        } else {
            setApiTyres(allTyres.filter(tyre => checkedDiameters.includes(tyre.diameter)));
        }
    }, [items]);


    return (
        <div className="user-view d-flex">
            <div className="w-75 h-100 d-flex gap-2 justify-content-start flex-wrap">
                {apiTyres.map(item => (
                    <ProductUserView
                    imgSrc={item.imgSrc}
                    diameter={item.diameter}
                    width={item.width}
                    height={item.height}
                    season={item.season}/>
                ))}
            </div>
            <div className="w-25 fixed">
                <div className="w-25 fixed mt-3">
                <div className="diameter">
                    <h5>Diameter: </h5>
                    {items.map(item => (
                            <div key={item.id}>
                                <input type="checkbox" className="form-check-input" onChange={() => handleChange(item.id)} checked={item.isChecked} />
                                <label className="form-check-label ms-3"> {item.d} </label>
                            </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}