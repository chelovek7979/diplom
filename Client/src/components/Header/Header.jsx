
import Header_left from "./Header-left/Header-left"
import Header_right from "./Header-right.jsx/Header-right"
import "./Header_style.scss"


export default function Header({bascket,openLogin }) {
  
  return (

    <div className="header">
        <Header_left bascket={bascket} openLogin={openLogin} />
        <Header_right bascket={bascket} openLogin={openLogin} />
    </div>

      


  );
}