import { useState } from "react";
import styles from "./styles.module.scss";
import useAuthCtx from "../../AuthCtx";
import { Products } from "../../custom.types";

const { container, fieldwrapper, preview } = styles;

// dummy data
const someProducts = {
  apple: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "red",
    category: "vegetable",
  },
  banana: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "yellow",
    category: "vegetable",
  },
  table: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "white",
    category: "furniture",
  },
  chair: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "green",
    category: "furniture",
  },
  bigtable: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "white",
    category: "furniture",
  },
  blackbaer: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "dark",
    category: "animal",
  },

  keyboard: {
    description: "Lorem ipsum dolor sit amet consectetur.",
    color: "white",
    category: "tech",
  },
};

const ProductCreate = ({
  setallproducts,
  allproducts,
}: {
  setallproducts: React.Dispatch<React.SetStateAction<Products>>;
  allproducts: Products;
}) => {
  const [open, setOpen] = useState(false);
  const { username } = useAuthCtx();

  // form-data states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product: Products = {
      [name]: {
        category,
        color,
        description,
      },
    };

    Object.assign(allproducts, product);
    localStorage.setItem(username, JSON.stringify({ products: allproducts }));
    console.log("new single Prod", product);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setallproducts(JSON.parse(localStorage.getItem(username)).products);
  };

  // not really a part of the app
  const addsomeProducts = (e: React.MouseEvent) => {
    e.preventDefault();

    const myNewObj = Object.assign(allproducts, someProducts);
    console.log("newobj", myNewObj);

    localStorage.setItem(username, JSON.stringify({ products: myNewObj }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setallproducts(JSON.parse(localStorage.getItem(username)).products);
    setOpen((open) => !open);
  };

  return (
    <div className={container}>
      <div onClick={() => setOpen((open) => !open)} className={preview}>
        <div>Add Product</div>
        <div>{open ? `x` : "open"}</div>
      </div>

      {open && (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <div className={fieldwrapper}>
            <label>
              Name
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                type='text'
              />
            </label>
            <label>
              Description
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                type='text'
              />
            </label>
            <label>
              Category
              <input
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
                type='text'
              />
            </label>
            <label>
              Color
              <input
                onChange={(e) => setColor(e.target.value)}
                value={color}
                required
                type='text'
              />
            </label>

            <button type='submit'>Create Product</button>
            <button
              onClick={(e) => {
                addsomeProducts(e);
              }}>
              add some random products
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductCreate;
