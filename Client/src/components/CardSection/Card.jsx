import Button from "./Button"

export default function Card({ product }){

    return(
        <div className="Card">
            <div className="wrapper">
                <div className="card-photo">
                    <img src={`http://localhost:3000/uploads/${product.Product_image_url}`} alt="" />
                </div>

                <div className="Content">

                <div className="card-title">
                    <h2>{product.Product_title}</h2>
                    
                </div>

                <div className="card-description">
                    <p>{product.Product_description}</p>
                </div>

                <div className="card-prise">
                    <span>{product.Product_price}{` ₽`}</span>
                </div>

                <Button product={product}/>
                </div>
            </div>

        </div>
    )
}