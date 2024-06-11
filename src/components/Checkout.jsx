 
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { total } = location.state || {};
    console.log(total);
    return (
        <div>
            <h1>grand Total: {total}</h1>
        </div>
    );
};

export default Checkout;