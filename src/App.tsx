import Cart from "./components/Cart";
import SideBar from "./components/SideBar";
import SortBar from "./components/SortBar";
import {ProductProvider} from "./Context/ProductProvider";

function App() {
  return (
    <ProductProvider>
      <SideBar />
      <SortBar />
      <Cart />
    </ProductProvider>
  );
}

export default App;
