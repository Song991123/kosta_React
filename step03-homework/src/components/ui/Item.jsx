export default function Item(props){
    return(
        <div className={props.className}>
            <img src={props.imgName} alt="수박" />

            <h5>{props.text}</h5>
            <span>{props.price}원</span>
        </div>
    );
}