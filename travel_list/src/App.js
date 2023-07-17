import { useState } from "react";

import Logo from "./components/logo/logo.component";
import Form from "./components/form/form.component";
import PackingList from "./components/packingList/packingList.component";
import Stats from "./components/stats/stats.component";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteitem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckBox(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteitem}
          onToggleItem={handleCheckBox}
          onClearList={handleClearList}
        />
        <Stats items={items} />
      </div>
    </>
  );
}

export default App;
