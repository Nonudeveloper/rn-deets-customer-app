import React from 'react';
import { reduxForm, Field, initialize, change } from 'redux-form';
import { View, Text, Picker, TextInput, PickerIOS } from 'react-native';
import styles from './styles';
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
              license: '',
              type: 'Type'
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
                    this.props.dispatch(change('vehicleForm', 'make', make.make_name));
                    this.props.dispatch(change('vehicleForm', 'make_id', make.make_id));
                }
            });
        });
    }

    _colorChanged(selectedColor) {
        this.props.vehicleData.color.map((color, i) => {
            if (color.color.toString() === selectedColor.toString()) {
                //dispatch an action here and update props
                this.props.dispatch(change('vehicleForm', 'color', color.color));
                this.props.dispatch(change('vehicleForm', 'color_id', color.id));
                this.setState({color: color.color})

            }
        });
    }

    _updateType(data) {
        const initialFormData = {
            type: data[0] + ', ' + data[1]  
        };
        this.setState({type: data[0] + ', ' + data[1]});
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
                    this.props.dispatch(change('vehicleForm', 'model', model.model_name));
                    this.props.dispatch(change('vehicleForm', 'model_id', model.model_id));
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
        if (this.props.makeModel.data) {
            this.props.makeModel.data.map((make, i) => {
                makes.push(make.make_name);
                if (make.make_name === this.state.make) {
                    selectedMake.push(make.make_name);
                }
            });
        }
        this._loadPicker(makes, selectedMake, 'Make');
    }

    _fetchModel() {
        const models = [];
        const selectedModel = [];
        if (this.props.models) {
            this.props.models.map((model, i) => {
                models.push(model.model_name);
                if (model.model_name === this.state.model) {
                    selectedModel.push(model.model_name);
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

    componentWillMount() {
        this.props.dispatch(change('vehicleForm', 'flag', 1));
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
                <View style={[inputStyle]}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={() => {
                            this._fetchMake();
                        }}>
                       {this.state.make}
                    </Text>
                </View>

                <View style={[inputStyle]}>
                    <Text
                        style={{color:'white', fontSize: 16, paddingTop:15, paddingBottom: 15}}
                        onPress={() => {
                            this._fetchModel();
                        }}>
                       {this.state.model}
                    </Text>
                </View>

                <View style={[inputStyle]}>
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
