import React from 'react';
import { reduxForm, Field, initialize, change } from 'redux-form';
import { View, Text, Picker, TextInput } from 'react-native';
import styles from './styles';
import MyPicker from '../../../../deetscomponents/form/AndroidPicker';
import RadioButton from 'radio-button-react-native';
import CommonTextInput from '../../../../deetscomponents/form/Input';
import CommonTypeTextInput from '../../../../components/form/Input';
import ModelPicker from 'react-native-picker';

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
              value: 0,
              initialValue: 0
          };
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
        console.log(makeID);
        console.log(this.props.makeModel);
        this.setState(() => {
            return {
            make: makeID
            };
        }, () => {
            this.props.makeModel.map((make, i) => {
                if (make.make_id === makeID) {
                    //dispatch an action here and update props
                    console.log(make.model)
                    this.props.updateModels(make.model);
                    console.log('ff')
                    this.props.dispatch(change('addEditVehicleForm', 'make', make.make_name));
                }
            });
        });
    }

    handleOnPress(value) {
        this.setState(() => {
            return {
            value
            };
        }, () => {
            this.props.dispatch(change('addEditVehicleForm', 'radio_button_type', value));     
        });
    }

    _createTypeData() {
        const data = [];
        if (this.props.vehicleData.type) {
            this.props.vehicleData.type.map((type, i) => {
            const segments = [];
            type.segment.map((segment, j) => {
                segments.push(segment.vehicle_segment);
            });
            let _data = {}
            _data[type.vehicle_type_name] = segments;
            data.push(_data);
        });
        return data;
        }
    }

    _showPicker() {
        ModelPicker.init({
        pickerData: this._createTypeData(),
        pickerTitleText: 'Select Type..',
        pickerRowHeight: 30,
        pickerFontSize: 18,
        selectedValue: [59],
        onPickerConfirm: data => {
            const typeData = data[0] + ', ' + data[1];
        //     const initialFormData = {
        //         type: data[0] + ', ' + data[1]  
        // };
        //     this.props.dispatch(initialize('addEditVehicleForm', initialFormData, 'type'));
            this.props.dispatch(change('addEditVehicleForm', 'type', typeData));

            this.props.vehicleData.type.map((type, i) => {
                if (type.vehicle_type_name === data[0]) {
                    this.props.dispatch(change('addEditVehicleForm', 'vehicle_type', type.vehicle_type));
                }
                type.segment.map((segment, j) => {
                    if (segment.vehicle_segment === data[1]) {
                        this.props.dispatch(change('addEditVehicleForm', 'vehicle_type_segment_id', segment.id));
                    }
                });
            });
        },
        onPickerCancel: data => {
            console.log(data);
        },
        onPickerSelect: data => {
            console.log(data);
        }
    });
    ModelPicker.show();
    }

    _colorChanged(colorId) {
        this.setState(() => {
            return {
            color: colorId
            };
        }, () => {
            this.props.vehicleData.color.map((color, i) => {
                if (color.id === colorId) {
                    //dispatch an action here and update props
                    this.props.dispatch(change('addEditVehicleForm', 'color', color.color));
                }
            });
        });
    }

    _modelChanged(modelId) {
        this.setState(() => {
            return {
            model: modelId
            };
        }, () => {
            this.props.models.map((models, i) => {
                if (models.model_id === modelId) {
                    //dispatch an action here and update props
                    this.props.dispatch(change('addEditVehicleForm', 'model', models.model_name));
                }
            });
        });
    }
    
    componentWillMount() {
        if (this.props.authVehicleData !== null) {
            const authVehicleData = this.props.authVehicleData;
            const vehicleType = authVehicleData.vehicle_type_name + ', ' + authVehicleData.vehicle_type_segment;
            const initialFormData = {
                access_token: this.props.authUser.access_token,
                year: authVehicleData.vehicle_year,
                color: authVehicleData.vehicle_color,
                flag: 2,
                color_id: authVehicleData.vehicle_color_id,
                model_id: authVehicleData.vehicle_model_id,
                model: authVehicleData.vehicle_model,
                type: vehicleType,
                license: authVehicleData.license,
                vin: authVehicleData.license,
                notes: authVehicleData.notes,
                make_id: authVehicleData.vehicle_make_id,
                make: authVehicleData.vehicle_make,
                vehicle_type_segment_id: authVehicleData.vehicle_type_segment_id,
                vehicle_type: authVehicleData.vehicle_type,
                vehicle_id: authVehicleData.vehicle_id
                
        };
            this._fetchMakeModel(initialFormData.year, initialFormData.year);
            this.setState({
                year: authVehicleData.vehicle_year_id,
                color: authVehicleData.vehicle_color_id,
                make: authVehicleData.vehicle_make_id,
                model: authVehicleData.vehicle_model_id
            });
            this.props.dispatch(initialize('addEditVehicleForm', initialFormData));
        } else {
            const initialFormData = {
                flag: 1,
                // access_token: this.props.accessToken
            };
            this.props.dispatch(initialize('addEditVehicleForm', initialFormData));
            this.props.dispatch(change('addEditVehicleForm', 'access_token', this.props.authUser.access_token));
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.makeModel.length > 0) {
            if (this.state.initialValue === 0) {
             this._populateModel(this.state.make, this.state.make);
             this.setState({
                initialValue: 1,
             });
             return true;
            }
        }
        return true;
    }

  render() {
    const { pickerStyle, inputStyle } = styles;
    return (
        <View style={styles.formArea}>
            <View style={styles.colContainer}>
                <View style={styles.colOne}>
                    <Field name="year" selectedValue={this.state.year} component={MyPicker} onChange={(year, index) => this._fetchMakeModel(year, index)}>
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
                        name="color_id" 
                        component={MyPicker} 
                        selectedValue={this.state.color}
                        onChange={(color) => this._colorChanged(color)}
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
                    <Field name="make_id" selectedValue={this.state.make} component={MyPicker} onChange={(make, index) => this._populateModel(make, index)} >
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
                <View style={[inputStyle, { borderBottomWidth: 2 }]}>
                <Field name="model_id" selectedValue={this.state.model} component={MyPicker} onChange={(model) => this._modelChanged(model)}>
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
            <View style={styles.licenseTextStyle}>
                <Field
                    name={'type'}
                    component={CommonTypeTextInput}
                    props={this.props}
                    placeholder={'Type'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    borderBotmWidth={{ borderBottomWidth: 0 }}
                    onPress={this._showPicker.bind(this)}
                    type="modaltype"
                />
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
                    <View style={{ flex: 2 }}><Text>VIN #</Text></View>
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
                    //     onClick={ console.log('df')}
                    //     value={this.state.license}
                    //     placeholder={'License #'}
                    //     placeholderTextColor='grey'
                    //     underlineColorAndroid="transparent"
                    //     editable={this.state.editable}
                    //     onFocus={Keyboard.dismiss}
                    // />
                <Field
                    name={'license'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'License #'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2, borderBottomColor: 'grey' }}
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
                    borderBotmWidth={{ borderBottomWidth: 2, borderBottomColor: 'grey' }}
                />
                }

                <Field
                    name={'notes'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'Notes'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                />
                <Field
                    name={'color'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'make'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'model'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'vehicle_type'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'vehicle_type_segment_id'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'radio_button_type'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'access_token'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'vehicle_id'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
            </View>
        </View>
    );
  }
}


export default reduxForm({ 
    form: 'addEditVehicleForm',
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
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

        errors.type = !values.type
          ? 'Type field is required'
          : undefined;
        
        if (values.radio_button_type === 1) {
            errors.vin = !values.vin
                ? 'Vin field is required'
                : undefined;
        } else {
            errors.license = !values.license
                ? 'License field is required'
                : undefined;
        }
        
        errors.notes = !values.notes
          ? 'Notes field is required'
          : undefined;

        return errors;
    },
})(VehicleForm);
