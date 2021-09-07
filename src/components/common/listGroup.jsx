import React from "react";
import styled from 'styled-components';

export const StyledList = styled.div`
  ul li {
  color: #000;   
} 
`

const itemClass = (item, selectedItem) => {
  if( item === selectedItem) {
    return "list-group-item active"
  }
  if(selectedItem._id === item._id) {
    return "list-group-item active"
  }
  return "list-group-item"
}

export const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {  
  return (
    <StyledList>
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            itemClass(item, selectedItem)            
          }
        >
          {item[textProperty]}         
        </li>
      ))}
    </ul>
    </StyledList>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
