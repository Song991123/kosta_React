export default function Article(props) {
    return (
        <>
            <h2 className={props.titleClass}>{props.title}</h2>
            <p className={props.bodyClass}>이번 여름에 바다가 있는 테마 여행을 시작합니다.</p>
            <p className={props.bodyClass}>{props.body}</p>
        </>
    );
}