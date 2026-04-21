import Button from "../../CardSection/Button";

export default function Tab(props){

    
    return(
        <button 
            className={`Tab ${props.isActive ? 'active' : ''}`}
            onClick={() => props.setCategory(props.value)
            
            
            
            }
        >
            <span className="Tab-text">{props.text}</span>
        </button>
    )
}