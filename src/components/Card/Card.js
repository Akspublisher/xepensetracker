import Button from '../Buttons/Button'
import styles from './Card.module.css'

export default function Card({ title, value, buttonText, buttonType ,handleClick, success=true }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>
                {`${title}: `}
                <span className={success ? styles.success : styles.failure}>
                    {`₹${value}`}
                </span>
            </h3>
            <Button handleClick={handleClick} style={buttonType}>{buttonText}</Button>
        </div>
    )
}
