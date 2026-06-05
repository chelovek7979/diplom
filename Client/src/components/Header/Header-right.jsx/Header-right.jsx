import User from '../../../assets/User_cicrle_light.svg'
import Baskett from '../../../assets/Basket_alt_3_light.svg'
import { useCart } from '../../Card-contecst/CartProvider'
import './Header-right.scss'
import { useNavigate } from "react-router-dom";


export default function Header_right({bascket,openLogin }){
    const { totalCount } = useCart();

    const navigate = useNavigate()

    return(
        <div className="header_right">
            <img src={User}
            alt=""
            onClick={() =>navigate('/login')} />
            <img src={Baskett} alt="" onClick={() => bascket('basket')}/>
            <span>{totalCount}</span>
            
        </div>
    )
}