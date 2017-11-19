import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, List, ListItem, ListItemText } from 'material-ui';

class Menu extends PureComponent {
  render() {
    const { headerClass } = this.props;

    return (
      <div>
        <div className={headerClass}>
          Site name
        </div>

        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        {/*<Divider />*/}
        {/*<List>{otherMailFolderListItems}</List>*/}
      </div>
    );
  }
}

Menu.propTypes = {
  headerClass: PropTypes.string.isRequired,
};

Menu.defaultProps = {};

export default Menu;
