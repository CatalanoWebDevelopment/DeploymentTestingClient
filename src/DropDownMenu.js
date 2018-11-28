import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import toRenderProps from "recompose/toRenderProps";
import withState from "recompose/withState";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "./Styles.css";

const WithState = toRenderProps(withState("anchorEl", "updateAnchorEl", null));

function RenderPropsMenu() {
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };

        return (
          <React.Fragment>
            <MenuIcon
              className="white"
              aria-owns={open ? "render-props-menu" : undefined}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            />
            <Menu
              id="render-props-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/" className="black">
                  Hello World
                </Link>
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      }}
    </WithState>
  );
}

export default RenderPropsMenu;
