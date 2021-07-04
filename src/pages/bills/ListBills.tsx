import React, { useEffect, useState } from "react";
import ComponentWrapper from "../components/ComponentWrapper";
import Title from "../components/Title";
import { Table, Modal, Button, Form, Col } from "react-bootstrap";
import { IBill, IItem } from "../../interfaces";
import axios from "axios";

const ListBills = () => {
  const [bills, setBills] = useState([] as IBill[]);
  const [show, setShow] = useState(false as boolean);
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState([] as IItem[]);

  const handleClose = () => {
    setShow(false);
  };

  const handleAddBtnClicked = () => {
    setShow(true);
  };

  const fetchAllItems = async () => {
    const response = await axios.get("http://localhost:4000/api/item");
    setItems(response.data.data);
  };
  const fetchAllBills = async () => {
    const response = await axios.get("http://localhost:4000/api/bills");
    setBills(response.data.bills);
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      console.log("validation failed");
      event.stopPropagation();
    }
    console.log("validation successful");
    setValidated(true);
  };

  useEffect(() => {
    fetchAllBills();
    fetchAllItems();
  }, []);
  return (
    <ComponentWrapper>
      <Title
        heading="Bills List"
        buttonTitle="Add"
        handleAddClick={handleAddBtnClicked}
      />
      <div className="tableWrapper">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Bill No.</th>
              <th>Vendor</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Operations</th>
            </tr>
            {bills.map((bill, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{bill.billNo}</td>
                <td> {bill.vendor} </td>
                <td>{bill.itemId.name}</td>
                <td> {bill.quantity} </td>
                <td>Operations</td>
              </tr>
            ))}
          </thead>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-body">
          <Form
            action="http://localhost:4000/api/bills"
            method="post"
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Bill No.</Form.Label>
                <Form.Control
                  name="billNo"
                  required
                  type="text"
                  placeholder="Bill No."
                />
                <Form.Control.Feedback type="invalid">
                  This field is required!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control
                  name="vendor"
                  required
                  type="text"
                  placeholder="Vendor Name"
                />
                <Form.Control.Feedback type="invalid">
                  This field is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Item</Form.Label>
                <Form.Control name="itemId" as="select">
                  <option value="">Default select</option>
                  {items.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  This field is required!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  name="quantity"
                  required
                  type="text"
                  placeholder="Quantity"
                />
                <Form.Control.Feedback type="invalid">
                  This field is required!
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Save Changes</Button> */}
        </Modal.Footer>
      </Modal>
    </ComponentWrapper>
  );
};

export default ListBills;
