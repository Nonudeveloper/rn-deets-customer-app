import React from 'react';
import { Animated } from 'react-native';
import DetailList from './DetailList';


export default class ServiceContantsList extends React.Component {

    toutPositions = []
    render() {
      return (
        <Animated.View>
          <DetailList 
              servicesList={this.props.item.included_adds_on} 
              addonsList={this.props.item.excluded_adds_on}
              showServices={this.props.showServices}
              service={this.props.item}
              // getSelectedItems={this.props.getSelectedItems}
          />
        </Animated.View>
      );
    }
  }
