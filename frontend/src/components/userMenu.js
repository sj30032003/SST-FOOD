import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4 className="bg-success">Dashboard</h4>
          <NavLink
            to="/dashboard/user"
            className="list-group-item list-group-item-action "
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/myOrder"
            className="list-group-item list-group-item-action"
          >
            MyOrders
          </NavLink>
          {JSON.parse(localStorage.getItem("auth"))?.role===1? <NavLink
            to="/dashboard/createItem"
            className="list-group-item list-group-item-action"
          >
            Add Item
          </NavLink>:""}
          {JSON.parse(localStorage.getItem("auth"))?.role===1? <NavLink
            to="/dashboard/createCategory"
            className="list-group-item list-group-item-action"
          >
            Add Category
          </NavLink>:""}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
