import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Modal,
  Nav,
  Navbar,
  Table,
} from "react-bootstrap";
import ComponentWrapper from "../components/ComponentWrapper";

interface IItem {
  _id?: string;
  name: string;
  price: number;
  quantity?: number;
}

interface IErrors {
  name: boolean;
  price: boolean;
}

const ItemList = () => {
  const defaultValues: IItem = {
    name: "",
    price: 0,
  };
  const [items, setItems] = useState([] as IItem[]);
  const [newItem, setNewItem] = useState(defaultValues as IItem);
  const [errors, setErrors] = useState({
    name: false,
    price: false,
  } as IErrors);
  const [show, setShow] = useState(false as boolean);

  const getAllItems = async () => {
    const response = await axios.get("http://localhost:4000/api/item");
    setItems(response.data.data);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleInputChange = (event: any) => {
    event.persist();
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value,
    });
    const validation = formValidation();
    console.log("=======", errors);
  };

  const formValidation = () => {
    if (newItem.name.length < 1) {
      console.log("inside name validation");
      setErrors({
        ...errors,
        name: true,
      });
    } else {
      setErrors({
        ...errors,
        name: false,
      });
    }
    if (newItem.price < 1) {
      console.log("inside price");

      setErrors({
        ...errors,
        price: true,
      });
    } else {
      setErrors({
        ...errors,
        price: false,
      });
    }

    return errors.name || errors.price;
  };

  const handleSubmit = async () => {
    console.log("from validation", errors);
    if (!formValidation()) {
      console.log("inside validation");
      const response = await axios.post(
        "http://localhost:4000/api/item",
        newItem
      );
      setNewItem({
        name: "",
        price: 0,
      });
      setShow(false);
      getAllItems();
      return;
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);
  return (
    <ComponentWrapper>
      <div className="titleWrapper">
        <p className="title">Items List</p>
        <Button
          onClick={() => {
            setShow(true);
          }}
          variant="primary"
        >
          ADD
        </Button>
      </div>
      <div className="tableWrapper">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr>
                <td>{index}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button variant="warning">Edit</Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-body">
          <div className="input-wrapper">
            <label>Product Name</label>
            <input
              className={errors.name || !newItem.name ? "input-error" : ""}
              value={newItem.name}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Product Name"
              name="name"
            />
            {(errors.name || !newItem.name) && (
              <p className="form-error">Please Enter Product Name</p>
            )}
          </div>
          <div className="input-wrapper">
            <label>Product Price</label>
            <input
              className={errors.price || !newItem.price ? "input-error" : ""}
              value={newItem.price}
              onChange={handleInputChange}
              type="number"
              placeholder="Enter Product Price"
              name="price"
            />
            {(errors.price || !newItem.price) && (
              <p className="form-error">Please Enter Product Price</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </ComponentWrapper>
  );
};

export default ItemList;
