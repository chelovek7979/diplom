import { useEffect, useState } from "react";
import Card from "./Card";
import "./CardSection.scss";

export default function CardSection({category}) {
    
    const [data, setData] = useState([]);
   

    

    useEffect(() => {
        fetch("https://diplom-1-54sb.onrender.com/api/diplom_bd")
            .then(res => res.json())
            .then(res => setData(res));
            
    }, []);



    return (
        <div className="Card_section">
            {data
                .filter(item => category === '' || item.Product_category === category)
                
                .map(item => (
                    <Card key={item.idProduct} product={item} />
                    
                ))
                
            }
            
        </div>
    );
}





/*     return (
        <div className="Card_section">
            {data.map((item) => (
                <Card key={item.idProduct} product={item} />
            ))}
        </div>
    ); */