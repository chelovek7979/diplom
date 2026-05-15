import { useState } from "react"

import Tab_section from "../Tab-section/Tab-section"
import CardSection from "../CardSection/CardSection"
import DiscontText from "../Discont-text/DiscontText"


export default function Catalog(){

    const [category, setCategory] = useState('electronics')

    return(
        <>
            <Tab_section setCategory={setCategory} category={category} />
            <DiscontText/>
            <CardSection category={category}  />
        </>
    )
}