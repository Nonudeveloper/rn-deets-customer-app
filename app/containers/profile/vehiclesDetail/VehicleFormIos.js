import React from 'react';
import { reduxForm, Field, initialize, change } from 'redux-form';
import { View, Text, Picker, TextInput } from 'react-native';
import styles from './styles';
import MyPicker from '../../../deetscomponents/form/AndroidPicker';
import RadioButton from 'radio-button-react-native';
import CommonTextInput from '../../../deetscomponents/form/Input';
import CommonTypeTextInput from '../../../components/form/Input';
import ModelPicker from 'react-native-picker';

class VehicleForm extends React.Component {
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
              initialValue: 0,
              makeName: ''
          };
          console.log(this.props);
    }
    
    validateForm = () => {
        console.log('validating.. vehicle form!');
    }

    _fetchMakeModel = (year, itemIndex) => {
        //now dispath an action to fetch make and model
        console.log(year, this.state.year);
        if (parseInt(year) !== parseInt(this.state.year)) {
            this.setState(() => {
            return {
                year,
                make: 'Make',
                color: 'Color',
                model: 'Model',
                type: 'Type'
            };
        }, () => {
            const result = this.props.makeModelData.find( makeModel => makeModel.id === year);
            if (result === undefined) {
                this.props.fetchVehiclesMakeModelByYear(year);
            }
            this.props.dispatch(change(this.props.form, 'year', year));
            this.props.dispatch(change(this.props.form, 'make', ''));
            this.props.dispatch(change(this.props.form, 'model', ''));
        });  
        }
        
    }

    _populateModel = (makeName) => {
        this.setState(() => {
            return {
                make: makeName
            };
        }, () => {
            this.props.makeModel.data.map((make, i) => {
                if (make.make_name.toString() === makeName.toString()) {
                    //dispatch an action here and update props
                    this.props.updateModels(make.model);
                    this.props.dispatch(change(this.props.form, 'make', make.make_name));
                    this.props.dispatch(change(this.props.form, 'make_id', make.make_id));
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
            this.props.dispatch(change(this.props.form, 'radio_button_type', value));     
        });
    }

    _colorChanged(selectedColor) {
        this.props.vehicleData.color.map((color, i) => {
            if (color.color.toString() === selectedColor.toString()) {
                //dispatch an action here and update props
                this.props.dispatch(change(this.props.form, 'color', color.color));
                this.props.dispatch(change(this.props.form, 'color_id', color.id));
                this.setState({color: color.color})

            }
        });
    }

     _modelChanged(modelName) {
        this.setState(() => {
            return {
                model: modelName
            };
        }, () => {
            this.props.models.map((model, i) => {
                if (model.model_name.toString() === modelName.toString()) {
                    //dispatch an action here and update props
                    this.props.dispatch(change(this.props.form, 'model', model.model_name));
                    this.props.dispatch(change(this.props.form, 'model_id', model.model_id));
                }
            });
        });
    }
    
    componentWillMount() {
        // console.log(this.props);
       
    }
    
    componentDidMount() {
        this.props.onRef(this);
        if (this.props.item !== null) {
            const authVehicleData = this.props.item;
            const vehicleType = authVehicleData.vehicle_type_name + ', ' + authVehicleData.vehicle_type_segment;
            const initialFormData = {
                year: authVehicleData.vehicle_year,
                color: authVehicleData.vehicle_color,
                color_id: authVehicleData.vehicle_color_id,
                model_id: authVehicleData.vehicle_model_id,
                model: authVehicleData.vehicle_model,
                type: vehicleType,
                flag: 2,
                license: parseInt(authVehicleData.license_type) === 2 ? authVehicleData.license : '',
                vin: parseInt(authVehicleData.license_type) === 1 ? authVehicleData.license : '',
                notes: authVehicleData.notes,
                make_id: authVehicleData.vehicle_make_id,
                make: authVehicleData.vehicle_make,
                vehicle_type_segment_id: authVehicleData.vehicle_type_segment_id,
                vehicle_type: authVehicleData.vehicle_type,
                vehicle_id: authVehicleData.vehicle_id,
                radio_button_type: parseInt(authVehicleData.license_type) !== 2 ? 1 : 0
        };
        this.props.fetchVehiclesMakeModelByYear(parseInt(authVehicleData.vehicle_year_id));
        console.log(authVehicleData);
            this.setState({
                year: parseInt(authVehicleData.vehicle_year_id),
                color: authVehicleData.vehicle_color,
                make: authVehicleData.vehicle_make,
                model: authVehicleData.vehicle_model,
                makeName: authVehicleData.vehicle_make,
                value: parseInt(authVehicleData.license_type) !== 2 ? 1 : 0,
                type: authVehicleData.vehicle_type_name + ', ' + authVehicleData.vehicle_type_segment 
            });
            this.props.dispatch(initialize(this.props.form, initialFormData));
        }
        console.log(this.state); 
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    _fetchYear() {
        const years = [];
        const selectedYear = [];
        if (this.props.vehicleData.year) {
            this.props.vehicleData.year.map((year, i) => {
                years.push(year.year.toString());
                if (year.year.toString() === this.state.year) {
                    selectedYear.push(year.year.toString());
                }
            });
        }
        this._loadPicker(years, selectedYear, 'Year');
    }

    _fetchColor() {
        const colors = [];
        const selectedColor = [];
        if (this.props.vehicleData.color) {
            this.props.vehicleData.color.map((color, i) => {
                colors.push(color.color);
                if (color.color === this.state.color) {
                    selectedColor.push(color.color);
                }
            });
        }
        this._loadPicker(colors, selectedColor, 'Color');
    }

     _fetchMake() {
        const makes = [];
        const selectedMake = [];
        if (this.props.makeModelData) {
            this.props.makeModelData.map((items, i) => {
                if ( items.id === this.state.year ) {
                    items.makeModel.data.map((make, i) => {
                        makes.push(make.make_name);
                        if (make.make_name === this.state.make) {
                            selectedMake.push(make.make_name);
                        }
                    });  
                }
            });
        }

        this._loadPicker(makes, selectedMake, 'Make');
    }

    _fetchModel() {
        const models = [];
        const selectedModel = [];
        if (this.props.makeModelData) {
            this.props.makeModelData.map((items, i) => {
                if ( items.id === this.state.year ) {
                    items.makeModel.data.map((make, i) => {
                        if (make.make_name === this.state.make || make.make_id === this.state.makeName) {
                            make.model.map((model,i) => {
                                models.push(model.model_name);
                                if (model.model_name === this.state.model) {
                                    selectedModel.push(model.model_name);
                                }
                            });
                        }
                    });  
                }
            });
        }

        this._loadPicker(models, selectedModel, 'Model');
    }

    _fetchTypes() {
        const types = [];
        const selectedType = [];
        if (this.props.vehicleData.type) {
            this.props.vehicleData.type.map((type, i) => {
                const segments = [];
                type.segment.map((segment, j) => {
                    segments.push(segment.vehicle_segment);
                });
                let _data = {}
                _data[type.vehicle_type_name] = segments;
                types.push(_data);
            });
            this._loadPicker(types, this.state.type.split(',', 2), 'Type');
        }
    }

     _loadPicker(data, selectedValue, type) {
        if (!this.props.editable) return;
        ModelPicker.init({
            pickerData: data,
            selectedValue: selectedValue,
            pickerTitleText: 'Select '+type,
            pickerToolBarFontSize: 18,
            pickerRowHeight: 30,
            pickerFontSize: 18,
            pickerConfirmBtnText: 'Done',
            pickerCancelBtnText: '',
            onPickerConfirm: data => {
                switch (type) {
                    case 'Year' : 
                        this._fetchMakeModel(data[0]);
                        break;
                    case 'Color' : 
                        this._colorChanged(data[0]);
                        break;
                    case 'Make' :
                        this._populateModel(data[0]);
                        break;
                    case 'Model' :
                        this._modelChanged(data[0]);
                        break;
                    case 'Type' :
                        this._updateType(data);
                        break;           
                }
                console.log(data);
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

    _updateType(data) {
        const initialFormData =  data[0] + ', ' + data[1];
        this.setState({type: data[0] + ', ' + data[1]});
        this.props.dispatch(initialize(this.props.form, initialFormData, 'type'));

        this.props.vehicleData.type.map((type, i) => {
            if (type.vehicle_type_name === data[0]) {
                this.props.dispatch(change(this.props.form, 'vehicle_type', type.vehicle_type));
            }
            type.segment.map((segment, j) => {
                if (segment.vehicle_segment === data[1]) {
                    this.props.dispatch(change(this.props.form, 'vehicle_type_segment_id', segment.id));
                }
            });
        }); 
    }

  render() {
    const { pickerStyle, inputStyle } = styles;
    return (
        <View style={styles.formArea}>
            <View style={styles.colContainer}>
                <View style={styles.colOne}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={() => {
                            this._fetchYear();
                        }}>
                       {this.state.year}
                    </Text>
                </View>
                <View style={styles.colTwo}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={() => {
                            this._fetchColor();
                        }}>
                        {this.state.color}
                    </Text>
                </View>
            </View>

            <View>
                <View style={[inputStyle, { borderBottomWidth: 2 }]}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={() => {
                            this._fetchMake();
                        }}>
                       {this.state.make}
                    </Text>
                </View>

                <View style={[inputStyle, { borderBottomWidth: 2 }]}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={() => {
                            this._fetchModel();
                        }}>
                       {this.state.model}
                    </Text>
                </View>

                <View style={[inputStyle, { borderBottomWidth: 2 }]}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={()=>{
                            this._fetchTypes();
                        }}>
                       {this.state.type}
                    </Text>
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
                    name={'radio_button_type'}
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
                <Field
                    name={'flag'}
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
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    validate: (values, props) => {
        if (!props.editable) {
            return null;
        }
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
