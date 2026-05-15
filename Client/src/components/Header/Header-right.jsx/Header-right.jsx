import User from '../../../assets/User_cicrle_light.svg'
import Baskett from '../../../assets/Basket_alt_3_light.svg'
import { useCart } from '../../Card-contecst/CartProvider'
import './Header-right.scss'



export default function Header_right({bascket,openLogin }){
    const { totalCount } = useCart();

    return(
        <div className="header_right">
            <img src={User}
            alt=""
            onClick={openLogin} />
            <img src={Baskett} alt="" onClick={() => bascket('basket')}/>
            <span>{totalCount}</span>
            
        </div>
    )
}