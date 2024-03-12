import React from 'react';
import {Table} from "reactstrap";
import "../static/css/owner/consultations.css";

const Table2 = ({ children }) => {
  return (
    <Table className="table-header2">
      {children}
    </Table>
  );
};

export default Table2;
