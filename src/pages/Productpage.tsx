import { useEffect, useState } from "react";
import useAuthCtx from "../AuthCtx";
import ProductItem from "../components/productitem/ProductItem";
import ProductCreate from "../components/productcreate/ProductCreate";
import { Products } from "../custom.types";

const Productpage = () => {
  const { username } = useAuthCtx();
  const [allProducts, setAllProducts] = useState<Products>({});
  const [filteredProducts, setFilteredProducts] = useState<Products>({});
  const [searchText, setSearchText] = useState("");

  const handleDelClick = (productName: string) => {
    console.log("del ", productName);

    const updatedProducts = { ...allProducts };
    delete updatedProducts[productName];
    setAllProducts(updatedProducts);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localStorage.setItem(
      username,
      JSON.stringify({ products: updatedProducts })
    );
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setAllProducts(JSON.parse(localStorage.getItem(username)).products);
  }, [username]);

  useEffect(() => {
    const filtered = Object.entries(allProducts).filter(([name, product]) => {
      const isMatchingName = name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const isMatchingColor = product.color
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const isMatchingCategory = product.category
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return isMatchingName || isMatchingColor || isMatchingCategory;
    });
    setFilteredProducts(Object.fromEntries(filtered));
  }, [searchText, allProducts]);

  return (
    <div>
      <h3>Search Product</h3>
      <input
        type='text'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder='Enter search text'
      />
      <ProductCreate
        setallproducts={setAllProducts}
        allproducts={allProducts}
      />
      <h3>My Products</h3>
      <div className='listcontainer'>
        {Object.entries(filteredProducts).map((prod) => (
          <ProductItem
            key={prod[0]}
            name={prod[0]}
            description={prod[1].description}
            category={prod[1].category}
            color={prod[1].color}
            ondelete={() => handleDelClick(prod[0])}
            allproducts={allProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default Productpage;
