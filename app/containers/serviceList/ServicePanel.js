import React from 'react';
import { View, ScrollView } from 'react-native';
import ServiceList from './ServicesList';
import styles from './styles';
import PropTypes from 'prop-types';

const CONTAINER_PADDING_TOP = 10;

export default class ServicesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection:
        props.activeSection !== undefined
          ? props.activeSection
          : props.initiallyActiveSection,
    };
  }
    setScrollRef = node => {
      if (node) {
        this.scrollViewRef = node;
      }
    }

    measurements = [];
    
    handlePressTout = (servicePanelIndex) => {
      this.scrollViewRef.scrollTo({
        y: this.measurements[servicePanelIndex].pageY - CONTAINER_PADDING_TOP,
      });
    }

    handleLayout = (measurements, servicePanelIndex) => {
      if (!this.measurements[servicePanelIndex]) {
        this.measurements[servicePanelIndex] = measurements;
      }
    }

    toggleState(key) {
      if (this.state.activeSection === key) {
        this.setState({
          activeSection: false
        });
      } else {
        this.setState({
          activeSection: key
        });
      }
    }
  
    render() {
      return (
        <View style={styles.container}>
          <ScrollView
            scrollEventThrottle={20}
            ref={this.setScrollRef}
          >
            <View>
              { this.props.services.length > 0 &&
                this.props.services.map((service, index) => {
                  return (
                    <ServiceList
                      key={index}
                      servicePanelIndex={index}
                      item={service}
                      addons={service.included_adds_on}
                      handleLayout={this.handleLayout}
                      handlePressTout={this.handlePressTout}
                      activeSection={this.state.activeSection}
                      toggleActiveState={this.toggleState.bind(this)}
                    />
                  );
                })
              }
            </View>
          </ScrollView>
        </View>
      );
    }
  }


  ServicesPanel.propTypes = {
    initiallyActiveSection: PropTypes.bool,
    activeSection: PropTypes.oneOfType([
      PropTypes.bool, // if false, closes all sections
      PropTypes.number, // sets index of section to open
    ]),
};
 
ServicesPanel.defaultProps = {
  initiallyActiveSection: false,
};