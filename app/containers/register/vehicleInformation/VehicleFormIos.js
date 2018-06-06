import React from 'react';
import { reduxForm, Field, initialize, change } from 'redux-form';
import { View, Text, Picker, TextInput, PickerIOS } from 'react-native';
import styles from './styles';
import IosPicker from '../../../deetscomponents/form/IosPicker';
import CommonTextInput from '../../../deetscomponents/form/Input';
import CommonTypeTextInput from '../../../components/form/Input';
import RadioButton from 'radio-button-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModelPicker from 'react-native-picker';

const avatar = (<Icon name="angle-right" size={16} color="#fff"/>);

class VehicleFormIos extends React.Component {
    constructor(props) {
          super(props);
          this.state = { 
              year: 'Year',
              color: 'Color',
              make: 'Make',
              model: 'Model',
              license: ''
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

    _fetchMakeModel = (year) => {
        console.log(year);
        //now dispath an action to fetch make and model
        this.setState(() => {
            return {
                year
            };
        }, () => {
            this.props.fetchMakeModel(year);
            this.props.dispatch(change('vehicleForm', 'year', year));
        });
    }

    _populateModel = (makeID) => {
        this.setState(() => {
            return {
                make: makeID
            };
        }, () => {
            console.log(this.props);
            this.props.makeModel.data.map((make, i) => {
                if (make.make_id === makeID) {
                    console.log(make);
                    //dispatch an action here and update props
                    this.props.updateModels(make.model);
                    this.props.dispatch(change('vehicleForm', 'make', make.make_name));
                    this.props.dispatch(change('vehicleForm', 'make_id', makeID));
                }
            });
        });
    }

    _colorChanged(colorId) {
        this.props.vehicleData.color.map((color, i) => {
            if (color.id === colorId) {
                //dispatch an action here and update props
                this.props.dispatch(change('vehicleForm', 'color', color.color));
                this.props.dispatch(change('vehicleForm', 'color_id', colorId));
                this.setState({color: color.color})

            }
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
                const initialFormData = {
                    type: data[0] + ', ' + data[1]  
            };
                this.props.dispatch(initialize('vehicleForm', initialFormData, 'type'));

                this.props.vehicleData.type.map((type, i) => {
                    if (type.vehicle_type_name === data[0]) {
                        this.props.dispatch(change('vehicleForm', 'vehicle_type', type.vehicle_type));
                    }
                    type.segment.map((segment, j) => {
                        if (segment.vehicle_segment === data[1]) {
                            this.props.dispatch(change('vehicleForm', 'vehicle_type_segment_id', segment.id));
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

    _modelChanged(modelId) {
        this.setState(() => {
            return {
                model: modelId
            };
        }, () => {
            this.props.models.map((models, i) => {
                if (models.model_id === modelId) {
                    //dispatch an action here and update props
                    this.props.dispatch(change('vehicleForm', 'model', models.model_name));
                    this.props.dispatch(change('vehicleForm', 'model_id', modelId));
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
            this.props.dispatch(change('vehicleForm', 'radio_button_type', value));     
        });
    }

    componentDidUpdate() {
        console.log(this.state);
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
                    <IosPicker ref={'picker'}
                        onSubmit={(option)=> {
                            console.log(option);
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
                    <IosPicker ref={'picker2'}
                        onSubmit={(option) => {
                            this._colorChanged(option)
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

                    <IosPicker ref={'picker3'}
                        onSubmit={(make)=>{
                            this._populateModel(make)
                        }}
                        >
                        <PickerIOS.Item label={'Make'} value={1} />
                            { 
                                this.props.makeModel.data  ? 
                                this.props.makeModel.data.map(
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

                    
                    <IosPicker ref={'picker4'}
                        onSubmit={(option)=>{
                            this._modelChanged(option)
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
                        <View style={{ flex: 10 }}><Text>License Plate #</Text></View>
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
                <Field
                    name={'license'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'License Plate #'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2, borderBottomColor: 'grey' }}
                />
                    : 
                    
                <Field
                    name={'vin'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={' Enter last 8 digits of VIN #'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2, borderBottomColor: 'grey' }}
                />
                }
                
            </View>

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
                    name={'color_id'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'make_id'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'model_id'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'color'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                 <Field
                    name={'year'}
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
        </View>
    );
  }
}


export default reduxForm({ 
    form: 'vehicleForm',
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
})(VehicleFormIos);
