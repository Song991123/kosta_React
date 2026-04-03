import HawaiiImg from '../../assets/Hawaii.jpg';

export default function Trip({ imgClass }){
    return(
        <>
            <img className={imgClass} src={HawaiiImg} alt="하와이" />
        </>
    );
}
