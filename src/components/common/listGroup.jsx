import React from "react";

const itemClass = (item, selectedItem) => {
  if( item === selectedItem) {
    return "list-group-item active"
  }
  if(selectedItem._id === item._id) {
    return "list-group-item active"
  }
  return "list-group-item"
}

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {  
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            itemClass(item, selectedItem)
            // item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}         
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
