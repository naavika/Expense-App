import React, { useState, useEffect } from "react";
import "../styles/ExpensePageStyles.css";
import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null); // Store the expense being edited
  const [editModalVisible, setEditModalVisible] = useState(false); // State for modal visibility
  const [form] = Form.useForm(); // Use form instance

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/api/v1/expense/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post('/api/v1/expense/expensepage', values);
      if (res.data.success) {
        message.success('Expense added successfully!');
        fetchExpenses();
        form.resetFields(); // Reset form fields after successful submission
      }
    } catch(error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const onDeleteExpense = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/expense/expenses/${id}`);
      if (res.data.success) {
        message.success('Expense deleted successfully!');
        fetchExpenses();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const onEditExpense = (expense) => {
    setEditingExpense(null); // Clear previous expense data first
    setTimeout(() => { // Allow UI to refresh
      setEditingExpense(expense);
      setEditModalVisible(true);
    }, 0);
  };

  const onEditModalClose = () => {
    setEditModalVisible(false);
    setEditingExpense(null);
  };

  const onFinishEdit = async (values) => {
    try {
      const res = await axios.put(`/api/v1/expense/expenses/${editingExpense.id}`, values);
      if (res.data.success) {
        message.success('Expense updated successfully!');
        setEditModalVisible(false);
        fetchExpenses();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <>
      <div className="form-container">
        <Form form={form} layout="vertical" onFinish={onFinishHandler} className="expense-app">
          <h3>EXPENSE APP</h3>
          <Form.Item label="Description" name="description">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input type="number" required />
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">Submit</button>
        </Form>
      </div>

      <div>
        <h2>Expense List</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
                  <button onClick={() => onEditExpense(expense)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Edit Expense"
        visible={editModalVisible}
        onCancel={onEditModalClose}
        footer={null}
      >
        {editingExpense && (
          <Form layout="vertical" onFinish={onFinishEdit} initialValues={editingExpense} key={editingExpense.id}>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Amount" name="amount">
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <button className="btn btn-primary" type="submit">Update</button>
          </Form>
        )}
      </Modal>
    </>
    );
  };

  export default ExpensePage;
