import { useState } from "react";
import styles from "./styles.module.scss";
import useAuthCtx from "../../AuthCtx";
import { Products } from "../../custom.types";

const { item, title, titlewrapper, buttonwrapper, del } = styles;

const ProductItem = ({
  name,
  description,
  category,
  color,
  ondelete,
  allproducts,
}: {
  name: string;
  description: string;
  category: string;
  color: string;
  ondelete: () => void;
  allproducts: Products;
}) => {
  const { username } = useAuthCtx();
  const [open, setOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedColor, setEditedColor] = useState(color);

  const handleDeleteClick = () => {
    ondelete();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategory(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedColor(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveClick = () => {
    const product: Products = {
      [editedName]: {
        description: editedDescription,
        color: editedColor,
        category: editedCategory,
      },
    };

    Object.assign(allproducts, product);
    localStorage.setItem(username, JSON.stringify({ products: allproducts }));

    // Get the existing products from local storage
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handleDeleteClick();

    setIsEditing(false);
    setEditedName(name);
    setEditedDescription(description);
    setEditedCategory(category);
    setEditedColor(color);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedDescription(description);
    setEditedCategory(category);
    setEditedColor(color);
  };

  return (
    <div className={item}>
      <div className={titlewrapper} onClick={() => setOpen((open) => !open)}>
        {isEditing ? (
          <input value={editedName} onChange={(e) => handleNameChange(e)} />
        ) : (
          <div className={title}>{name}</div>
        )}
        <div>{open ? `x` : "show details"}</div>
      </div>

      {isEditing ? (
        <>
          <input
            value={editedCategory}
            onChange={(e) => handleCategoryChange(e)}
          />
          <input value={editedColor} onChange={(e) => handleColorChange(e)} />
          <input value={editedDescription} onChange={handleDescriptionChange} />
        </>
      ) : (
        <>
          <div>{category}</div>
          <div>{color}</div>
        </>
      )}

      {/* details */}
      {open && <div>{description}</div>}

      {/* Btn`s */}
      <div className={buttonwrapper}>
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick}>edit</button>
            <button className={del} onClick={handleDeleteClick}>
              delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
