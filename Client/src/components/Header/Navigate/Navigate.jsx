

export default function Navigate({bascket}){
    return(
        <ul>
            <li>Контакты</li>
            <li>O нас</li>
            <li onClick={()=> bascket('market')}>Главная</li>
        </ul>
    )
}