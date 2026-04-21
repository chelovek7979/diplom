
import Header_left from "./Header-left/Header-left"
import Header_right from "./Header-right.jsx/Header-right"
import "./Header_style.scss"


export default function Header({bascket}) {
  
  return (

    <div className="header">
        <Header_left bascket={bascket} />
        <Header_right bascket={bascket} />
    </div>

      


  );
}