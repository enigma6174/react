import { useState } from "react";

import Item from "../item/item.component";

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortKey, setSortKey] = useState("input");

  let sortedItems;

  if (sortKey === "input") sortedItems = items;

  if (sortKey === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortKey === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
        <div className="actions">
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onClearList}>Clear List</button>
        </div>
      </div>
    </>
  );
}

export default PackingList;
