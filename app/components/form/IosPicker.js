import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    PickerIOS,
    Dimensions
} from 'react-native' ;

const PickerItemIOS = PickerIOS.Item;

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class IosPicker extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { 
            options: this.props.options,
            labels: this.props.labels || this.props.options,
            color: this.props.color || '#007AFF',
            modalVisible: false,
            selectedOption: 'Option1'
          };
        console.log(this.state);

    }
    show() {
        this.setState({modalVisible: true});
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={{marginTop: 22}}>
            
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {
                        alert('Modal has been closed.');
                      }}>


                <View style={styles.basicContainer}>
                    <View style={styles.modalContainer}>
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{color:this.state.color}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                    if(this.props.onSubmit) this.props.onSubmit(this.state.selectedOption);
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{color:this.state.color}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainBox}>
                            {/*Model body*/}
                            <PickerIOS
                                ref={'picker'}
                                style={styles.bottomPicker}
                                selectedValue={this.state.selectedOption}
                                onValueChange={(option) => this.setState({selectedOption: option})}
                                >
                                {this.props.children}
                            </PickerIOS>
                        </View>

                    </View>
                </View>
            </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    basicContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer:{
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding:0,
        backgroundColor: '#F5FCFF',
    },
    buttonView:{
        width:SCREEN_WIDTH,
        padding: 8,
        borderTopWidth:0.5,
        borderTopColor:'lightgrey',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
    mainBox: {
    }
});