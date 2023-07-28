import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriendForm, toggleAddFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function toggleAddFriend() {
    toggleAddFriendForm((currentState) => !currentState);
    setSelectedFriend(null);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((curentSelected) =>
      curentSelected?.id === friend.id ? null : friend
    );
    toggleAddFriendForm(false);
  }

  function handleAddFriend(friend) {
    setFriends((currentState) => [...currentState, friend]);
    toggleAddFriendForm(false);
  }

  function handleSplitBill(value) {
    setFriends((currentState) =>
      currentState.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />
        {addFriendForm && <AddFriend handleAddFriend={handleAddFriend} />}

        <Button onClick={toggleAddFriend}>
          {addFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <SplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, selectedFriend, onSelectFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelectFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are settled up!</p>}

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  function handleImageURL(e) {
    setImageURL(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `https://i.pravatar.cc/48?u=${imageURL}`,
      balance: 0,
    };
    handleAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👥 Friend Name</label>
      <input required type="text" value={name} onChange={handleName} />

      <label>📸 Image URL</label>
      <input required type="text" value={imageURL} onChange={handleImageURL} />

      <Button>Add</Button>
    </form>
  );
}

function SplitBill({ selectedFriend, onSplitBill }) {
  const [billAmount, setBillAmount] = useState("");
  const [userAmount, setUserAmount] = useState("");
  const [paidBy, setPaidBy] = useState("user");
  const selectedFriendAmount = billAmount
    ? Number(billAmount) - Number(userAmount)
    : "";

  function handleBillAmount(e) {
    setBillAmount(Number(e.target.value));
  }

  function handleUserExpense(e) {
    setUserAmount((currentValue) =>
      Number(e.target.value) > Number(billAmount)
        ? currentValue
        : Number(e.target.value)
    );
  }

  function handlePaymentSelection(e) {
    setPaidBy(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSplitBill(paidBy === "user" ? selectedFriendAmount : -userAmount);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split Your Bill With {selectedFriend.name}</h2>

      <label>👥 Bill Amount</label>
      <input
        type="text"
        value={billAmount}
        onChange={handleBillAmount}
        required
      />

      <label>💳 Your Share</label>
      <input
        type="text"
        value={userAmount}
        onChange={handleUserExpense}
        required
      />

      <label>💳 {`${selectedFriend.name}'s`} Share</label>
      <input type="text" value={selectedFriendAmount} disabled />

      <label>💵 Paid By</label>
      <select onChange={handlePaymentSelection}>
        <option value="user" label="User" />
        <option value={selectedFriend.name} label={selectedFriend.name} />
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
