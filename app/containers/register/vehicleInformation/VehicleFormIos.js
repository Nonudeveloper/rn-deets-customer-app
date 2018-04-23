import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { View, Text, Picker, TextInput, PickerIOS } from 'react-native';
import styles from './styles';
import IosPicker from '../../../components/form/IosPicker';
import RadioButton from 'radio-button-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const avatar = (<Icon name="angle-right" size={16} color="#fff"/>);

const options = ['Option1', 'Option2', 'Option3'];

class VehicleFormIos extends React.Component {
    constructor(props) {
          super(props);
          this.state = { 
              year: 'Year',
              color: 'Color',
              type: 'Type',
              make: 'Make',
              model: 'Model',
              license: '',
              value: 0,
              selectedOption: ''
          };
    }

  _fetchMakeModel = (year) => {
    //now dispath an action to fetch make and model
    this.setState(() => {
        return {
          year
        };
    }, () => {
        this.props.fetchMakeModel(year);
    });
  }

  _populateModel = (makeID) => {
    
    this.setState(() => {
        return {
          make: makeID
        };
    }, () => {
        this.props.makeModel.map((make, i) => {
            if (make.make_id === makeID) {
                //dispatch an action here and update props
                this.props.updateModels(make.model);
            }
        });
    });
  }

  handleOnPress(value) {
    this.setState({ value: value });
  }
    
  render() {
    console.log(this.props)
    const { pickerStyle, inputStyle } = styles;
    return (
        <View style={styles.formArea}>
            <View style={styles.colContainer}>
                <View style={styles.colOne}>
                    <Text
                        style={{color:'white', fontSize: 16, marginTop: 20}}
                        onPress={()=>{
                            this.refs.picker.show();
                        }}>
                       {this.state.year} {avatar}
                    </Text>
                    <IosPicker ref={'picker'} options={options}
                        onSubmit={(option)=>{
                            this._fetchMakeModel(option);
                        }}
                        >
                        <PickerIOS.Item label={'Year'} value={1} />
                            { 
                                this.props.vehicleData.year ? 
                                this.props.vehicleData.year.map(
                                    (year, i) => <PickerIOS.Item 
                                        key={i} value={year.id} 
                                        label={year.year.toString()} 
                                    />) 
                                    : [] 
                            }
                    </IosPicker>
                </View>
                <View style={styles.colTwo}>
                    <Text
                        style={{color:'white', fontSize: 16, marginTop: 20}}
                        onPress={()=>{
                            this.refs.picker2.show();
                        }}>
                        {this.state.color} {avatar}
                    </Text>
                    <IosPicker ref={'picker2'} options={options}
                        onSubmit={(option)=>{
                            this.setState({color: option})
                        }}
                        >
                        <PickerIOS.Item label={'Color'} value={1} />
                            { 
                            this.props.vehicleData.color ? 
                            this.props.vehicleData.color.map(
                                (color, i) => <Picker.Item 
                                    key={i} value={color.id} 
                                    label={color.color.toString()} 
                                />) 
                                : [] 
                            }
                    </IosPicker>
                </View>
            </View>
            <View >
                <View style={[inputStyle]}>
                    <Text
                        style={{color:'white', fontSize: 16, marginTop: 20}}
                        onPress={()=>{
                            this.refs.picker3.show();
                        }}>
                       {this.state.make} {avatar}
                    </Text>

                    <IosPicker ref={'picker3'} options={options}
                        onSubmit={(make)=>{
                            this._populateModel(make)
                        }}
                        >
                        <PickerIOS.Item label={'Make'} value={1} />
                            { 
                                this.props.makeModel.length > 0 ? 
                                this.props.makeModel.map(
                                    (make, i) => <Picker.Item 
                                        key={i} 
                                        value={make.make_id} 
                                        label={make.make_name} 
                                    />) 
                                    : [] 
                            }
                    </IosPicker>
                </View>

                <View style={[inputStyle]}>

                    <Text
                        style={{color:'white', fontSize: 16, marginTop: 20}}
                        onPress={()=>{
                            this.refs.picker4.show();
                        }}>
                       {this.state.model} {avatar}
                    </Text>

                    
                    <IosPicker ref={'picker4'} options={options}
                        onSubmit={(option)=>{
                            this.setState({model: option})
                        }}
                        >
                        <PickerIOS.Item label={'Model'} value={1} />
                            { 
                                this.props.models ? 
                                this.props.models.map(
                                    (model, i) => <Picker.Item 
                                        key={i} value={model.model_id} 
                                        label={model.model_name} 
                                    />) 
                                    : [] 
                            }
                    </IosPicker>
                </View>
                
            </View>
            <View style={styles.licenseStyle}>
                <View style={styles.licenseInnerContainerStyle}>
                    <View style={styles.radio1ContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <RadioButton
                            currentValue={this.state.value}
                            value={0}
                            onPress={this.handleOnPress.bind(this)}
                            outerCircleColor={'#50C900'}
                            outerCircleSize={18}
                            outerCircleWidth={2}
                            innerCircleColor={'#50C900'}
                            innerCircleSize={18}
                        />
                        </View>
                        <View style={{ flex: 10 }}><Text>License #</Text></View>
                    </View>
                    <View style={styles.radio2ContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <RadioButton
                                currentValue={this.state.value}
                                value={1}
                                onPress={this.handleOnPress.bind(this)}
                                outerCircleColor={'#50C900'}
                                outerCircleSize={18}
                                outerCircleWidth={2}
                                innerCircleColor={'#50C900'}
                                innerCircleSize={18}
                            />
                        </View>
                        <View style={{ flex: 2 }}><Text>VPin #</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.licenseTextStyle}>
                {this.state.value === 0 ?
                    <TextInput
                        style={{ 
                            height: 60,
                            borderBottomWidth: 2,
                            borderColor: 'grey',
                            color: 'grey',
                            marginHorizontal: 10 
                        }}
                        onChangeText={(license) => this.setState({ license })}
                        value={this.state.license}
                        placeholder={'License #'}
                        placeholderTextColor='grey'
                        underlineColorAndroid="transparent"
                    />
                    : 
                    <TextInput
                        style={{ 
                            height: 60,
                            borderBottomWidth: 2,
                            borderColor: 'grey',
                            color: 'grey',
                            marginHorizontal: 10,
                        }}
                        onChangeText={(license) => this.setState({ license })}
                        value={this.state.license}
                        placeholder={'Vpin #'}
                        placeholderTextColor='grey'
                        underlineColorAndroid="transparent"
                    />
                }
            </View>
        </View>
    );
  }
}

export default reduxForm({ 
    form: 'vehicleForm',
})(VehicleFormIos);
