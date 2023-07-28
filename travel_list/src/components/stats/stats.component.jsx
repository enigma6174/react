function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list!</em>
      </p>
    );
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items on your list and you have already packed{" "}
        {packedItems} ({percentagePacked} %)
      </em>
    </footer>
  );
}

export default Stats;
