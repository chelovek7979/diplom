

export default function Navigate({bascket}){
    return(
        <ul>
            <li  onClick={() => bascket('contact') }>Контакты</li>
            <li onClick={() => bascket('landing')  }>O нас</li>
            <li onClick={()=> bascket('market')}>Наша продукция</li>
        </ul>
    )
}