import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { View, Text, Picker, TextInput } from 'react-native';
import styles from './styles';
import MyPicker from '../../../components/form/MyPicker';
import RadioButton from 'radio-button-react-native';
import CommonTextInput from '../../../components/form/Input';

class VehicleForm extends React.Component {
    constructor(props) {
          super(props);
          this.state = { 
              year: '',
              color: '',
              type: '',
              make: '',
              model: '',
              license: '',
              value: 0
          };
    }
    
    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    validateForm = () => {
        console.log('validating.. vehicle form!');
    }

    _fetchMakeModel = (year, itemIndex) => {
        //now dispath an action to fetch make and model
        this.setState(() => {
            return {
                year
            };
        }, () => {
            this.props.fetchMakeModel(year);
        });
    }

  _populateModel = (makeID, makeIndex) => {
    
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
    const { pickerStyle, inputStyle } = styles;
    return (
        <View style={styles.formArea}>
            <View style={styles.colContainer}>
                <View style={styles.colOne}>
                    <Field name="year" selectedValue={this.state.year} component={MyPicker} onValueChange={(year, index) => this._fetchMakeModel(year, index)}>
                        <Picker.Item label={'Year'} />
                        { 
                            this.props.vehicleData.year ? 
                            this.props.vehicleData.year.map(
                                (year, i) => <Picker.Item 
                                    key={i} value={year.id} 
                                    label={year.year.toString()} 
                                />) 
                                : [] 
                        }
                    </Field>
                </View>
                <View style={styles.colTwo}>
                    <Field 
                        name="color" 
                        component={MyPicker} 
                        selectedValue={this.state.color}
                        onValueChange={(color) => this.setState(() => {
                            return { color };
                        })}
                    >
                        <Picker.Item label={'Color'} value={1} />
                        { 
                            this.props.vehicleData.color ? 
                            this.props.vehicleData.color.map(
                                (color, i) => <Picker.Item 
                                    key={i} value={color.id} 
                                    label={color.color.toString()} 
                                />) 
                                : [] 
                        }
                    </Field>
                </View>
            </View>
            <View >
                <View style={[inputStyle, { borderBottomWidth: 2 }]}>
                    <Field name="make" selectedValue={this.state.make} component={MyPicker} onValueChange={(make, index) => this._populateModel(make, index)} >
                        <Picker.Item label={'Make'} />
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
                    </Field>
                </View>
                <View style={[inputStyle]}>
                <Field name="model" selectedValue={this.state.model} component={MyPicker} onValueChange={(model) => this.setState(() => { return { model }; })}>
                        <Picker.Item label={'Model'} />
                        { 
                            this.props.models ? 
                            this.props.models.map(
                                (model, i) => <Picker.Item 
                                    key={i} value={model.model_id} 
                                    label={model.model_name} 
                                />) 
                                : [] 
                        }
                    </Field>
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
                        <View style={{ flex: 2 }}><Text>VIN #</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.licenseTextStyle}>
                {this.state.value === 0 ?
                    // <TextInput
                    //     style={{ 
                    //         height: 60,
                    //         borderColor: 'grey',
                    //         color: 'grey',
                    //         marginHorizontal: 10 
                    //     }}
                    //     onChangeText={(license) => this.setState({ license })}
                    //     value={this.state.license}
                    //     placeholder={'License #'}
                    //     placeholderTextColor='grey'
                    //     underlineColorAndroid="transparent"
                    // />
                    <Field
                    name={'license'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'License #'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                />
                    : 
                    // <TextInput
                    //     style={{ 
                    //         height: 60,
                    //         borderColor: 'grey',
                    //         color: 'grey',
                    //         marginHorizontal: 10,
                    //     }}
                    //     onChangeText={(license) => this.setState({ license })}
                    //     value={this.state.license}
                    //     placeholder={'VIN #'}
                    //     placeholderTextColor='grey'
                    //     underlineColorAndroid="transparent"
                    // />
                    <Field
                    name={'vin'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'VIN #'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                />
                }
            </View>
        </View>
    );
  }
}


export default reduxForm({ 
    form: 'vehicleForm',
    validate: (values) => {
        const errors = {};
        errors.year = !values.year
          ? 'Year field is required'
          : undefined;

        errors.color = !values.color
          ? 'Color field is required'
          : undefined;

        errors.make = !values.make
          ? 'Make field is required'
          : undefined;

        errors.model = !values.model
          ? 'Model field is required'
          : undefined;
        
        errors.license = !values.license
          ? 'license or Vin field is required'
          : undefined;
        
        return errors;
    },
})(VehicleForm);
