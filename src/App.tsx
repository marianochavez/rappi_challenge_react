import Cart from "./components/Cart";
import SideBar from "./components/SideBar";
import {ProductProvider} from "./Context/ProductProvider";

function App() {
  return (
    <ProductProvider>
      <SideBar />
      <Cart />
    </ProductProvider>
  );
}

export default App;
