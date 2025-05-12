import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState(''); // State for custom category input

  const categories = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other']; // Example categories

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === 'Other' ? otherCategory : category; // Use custom category if "Other" is selected
    onSubmit({ description, amount: Number(amount), category: finalCategory });
    setDescription('');
    setAmount('');
    setCategory('');
    setOtherCategory(''); // Reset custom category input
  };

  return (
    <div className="card p-3 mb-4">
      <h3 className="card-title">Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {category === 'Other' && (
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
                placeholder="Enter custom category"
                required
              />
            </div>
          )}
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
