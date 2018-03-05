import React, { Component } from "react";
import { View } from "react-native";
//Styles
import styles from "./HrStyles";
//Validation
import PropTypes from "prop-types";

export default class Hr extends Component {
  render() {
    return (
      <View style={styles.row}>
        <View
          style={[
            styles.side,
            { height: this.props.width, backgroundColor: this.props.color, marginLeft:this.props.marginleft }
          ]}
        />
        {this.props.children}
        <View
          style={[
            styles.side,
            { height: this.props.width, backgroundColor: this.props.color, marginRight:this.props.marginright }
          ]}
        />
      </View>
    );
  }
}

//Validate all props
Hr.propTypes = {
  width: PropTypes.number,
  color: PropTypes.color,
  marginleft: PropTypes.number,
  marginright: PropTypes.number,
  children: PropTypes.children
};