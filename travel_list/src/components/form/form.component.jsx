import { useState } from "react";

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [numberOfItems, setNumberOfItems] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      description,
      numberOfItems,
      packed: false,
      id: Date.now(),
    };
    onAddItem(newItem);

    setDescription("");
    setNumberOfItems(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select
          value={numberOfItems}
          onChange={(e) => setNumberOfItems(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          disabled={!description}
          style={!description ? { backgroundColor: "#ebebe4" } : {}}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default Form;
