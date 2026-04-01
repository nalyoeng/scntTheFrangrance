
import Login from "./components/Login";
const Login_s=Login
import './App.css'
import Checkout from "./components/payment";
const Checkout_s=Checkout
import Order from "./components/order";
const Order_s=Order

const App = () => {

  

  return (
    <div>
      {/* <Login_s></Login_s> */}
      <Checkout_s></Checkout_s>
      {/* <Order_s></Order_s> */}
    </div>
  );
};

export default App;
 