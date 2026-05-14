

export default function Navigate({bascket}){
    return(
        <ul>
            <li>Контакты</li>
            <li onClick={() => bascket('landing')  }>O нас</li>
            <li onClick={()=> bascket('market')}>Наша продукция</li>
        </ul>
    )
}