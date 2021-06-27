import React from "react";
import ComponentWrapper from "../components/ComponentWrapper";
import Title from "../components/Title";
import { Table } from "react-bootstrap";

const ListBills = () => {
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
          </thead>
        </Table>
      </div>
    </ComponentWrapper>
  );
};

export default ListBills;
