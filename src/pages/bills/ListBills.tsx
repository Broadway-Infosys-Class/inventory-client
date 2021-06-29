import React, { useEffect, useState } from "react";
import ComponentWrapper from "../components/ComponentWrapper";
import Title from "../components/Title";
import { Table } from "react-bootstrap";
import { IBill } from "../../interfaces";
import axios from "axios";

const ListBills = () => {
  const [bills, setBills] = useState([] as IBill[]);

  const fetchAllBills = async () => {
    const response = await axios.get("http://localhost:4000/api/bills");
    console.log("=============", response.data.bills);
    setBills(response.data.bills);
  };

  const getItemfromItemId = async (id: string) => {
    const response = await axios.get(`http://localhost:4000/api/item/${id}`);
    return response.data.data.name;
  };

  // const getItemName = (itemId: string) => {
  //   const response = getItemfromItemId(itemId);
  //   // return response.data.data.name;
  //   console.log(response.data.data.name);
  //   return "Product Name";
  // };

  useEffect(() => {
    fetchAllBills();
  }, []);
  return (
    <ComponentWrapper>
      <Title heading="Bills List" />
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
                {/* {console.log(bill.item)} */}
                <td>{index + 1}</td>
                <td>{bill.billNo}</td>
                <td> {bill.vendor} </td>
                {/* <td> Product Name </td> */}
                <td>
                  {() => {
                    getItemfromItemId(bill.item);
                  }}
                </td>
                <td> {bill.quantity} </td>
                <td>Operations</td>
              </tr>
            ))}
          </thead>
        </Table>
      </div>
    </ComponentWrapper>
  );
};

export default ListBills;
