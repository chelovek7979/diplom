import { useState } from "react"

import Tab_section from "../Tab-section/Tab-section"
import CardSection from "../CardSection/CardSection"
import DiscontText from "../Discont-text/DiscontText"


export default function Catalog(){

    const [category, setCategory] = useState('fourclan')

    return(
        <>
            <Tab_section setCategory={setCategory} category={category} />
            <DiscontText/>
            <CardSection category={category}  />
                  <footer className="footer">
        <p>© 2026 Картонный завод “Петроснабкартон”. Все права защищены.</p>
        <p>Телефон: +7 (981) 798-08-03 | Email: infopetro@gmail.com</p>
      </footer>
        </>
    )
}