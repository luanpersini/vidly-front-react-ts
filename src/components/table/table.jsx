import React from "react";
import styled from 'styled-components';
import { TableBody, TableHeader } from "./";

export const StyledTable = styled.div`
  
  color: ${props => props.theme.colors.text}; 
  background: ${props => props.theme.colors.background};  
  a, td, th {
    color: ${props => props.theme.colors.text};
  }

`

export const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <StyledTable>
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
    </StyledTable>
  );
};

