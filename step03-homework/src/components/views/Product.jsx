import a from '../../assets/a.png';
import b from '../../assets/b.jpg';
import c from '../../assets/c.png';
import d from '../../assets/d.jpg';
import styles from '../../styles/Product.module.css';
import Item from '../ui/Item';


const products = [
    { id: 1, imgName: a, text: "당도선별 11brix", price: "25,000" },
    { id: 2, imgName: b, text: "당도선별 11brix", price: "35,000" },
    { id: 3, imgName: c, text: "당도선별 11brix", price: "28,000" },
    { id: 4, imgName: d, text: "당도선별 11brix", price: "20,000" }
]

const Product = () => {
    return (
        <>
            <div className={styles.product}>
                <h3>오늘의 상품</h3>
                <p>새로운 상품을 만나보세요</p>
                {products.map(product => (
                    <Item key={product.id} className={styles.box} imgName={product.imgName} text={product.text} price={product.price} />
                ))}
            </div>
        </>
    );
};

export default Product;
