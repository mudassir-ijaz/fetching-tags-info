import React from 'react';
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Alert,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import Test from "./Test"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { connect } from "react-redux";
import {setUserInfo} from "../../redux/actions/login"
import { bindActionCreators } from 'redux';
import {setUser} from "../../redux/actions/userDetail"
const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 2,
    borderColor: 'indigo',
    // padding: 10,
    marginBottom: -3,
    marginTop: 1,
    height: hp('8%'), // 70% of height device screen
    width: wp('84%'),
    
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const validationSchema = yup.object().shape({
    // name: yup
    //     .string()
    //     .label('Username')
    //     .required(),
    // .min(5, 'username cannnot be <= 2')
    // .max(15, 'please enter a username =< 15'),
    // email: yup
    //     .string()
    //     .label('Email')
    //     .email()
    //     .required(),
    email: yup
    .string()
    .label('Email')
    .email()
    .required(),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(5, 'password should be greater than 5'),
        // .max(15, 'password cannot be >= 15'),
    // confirmPassword: yup
    //     .string()
    //     .required()
    //     // .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    //     // .required('Confirm Password is required')
    //     .label('Confirm password')
    //     .test('passwords-match', 'Passwords must match', function(value) {
    //     return this.parent.password === value;
    //     }),
//   agreeToTerms: yup
//     .boolean()
//     .label('Terms')
//     .test(
//       'is-true',
//       'Must agree to terms to continue',
//       value => value === true
//     ),
});

class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        errorMsg: ""
      }
    }
    async loginCall(JsonObj) {

      
        const url = 'https://space-rental.herokuapp.com/users/sign_in_call';     
        try {
            const response = await fetch(url, {
              method: 'POST', 
              body: JSON.stringify(JsonObj), 
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const json = await response.json();
          
            if(json.success){
              
              console.log('Results:', JSON.stringify(json));
              console.log("json login",json.success)
              console.log("ID", json.user.first_name)
              this.props.settingUserData(json.user)
              this.toHome()
            }else{
              
                // const {e} = this.props.setLoginData.errorMsg
                // console.log("ERROR: ", errorMsg)
                this.setState({
                  errorMsg: json.message
                })

            }
            
        } 
        catch (error) {
            console.error('Error:', error);
        }
      
    
  }
    
    async handleSubmit(values) {
      if (values){
        // let {em, p} = this.props.setLoginData
        var obj = {};
        // em = values.email
        // p = values.password
        console.log("EMAIL: ", values.email)
        console.log("PASSWORD: ", values.password)
        obj["email"] = values.email;
        obj["password"] = values.password; 
        this.loginCall(obj);
        // console.log(obj.email)
        
    }

    
    }
   
    toHome(){
      Actions.home()
    }
    test() {
	  	Actions.test()
    }
    simplemapping(){
      Actions.simpleMap()
    }
    maps(){
      Actions.maps()
    }
    maptest(){
      Actions.maptest()
    }
    map(){
      Actions.map()
    }
    signup(){
      Actions.signup()
    }
    goProfile(){
      Actions.profile()
    }
    render(){
      // const {name} = this.state
      // console.log(name)
        return(
            <SafeAreaView style={styles.container}>
                {/* <View style={styles.textWrapper}>
                <Text style={styles.myText}>Login</Text>

                </View> */}
                
                {/* <Text style={{ textAlign: "center"}}>Please enter "testuser" in both fields</Text> */}
                <Formik
                initialValues={this.state}
                // initialValues={{
                //   name: '',
                //   email: '',
                //   password: '',
                //   confirmPassword: ''
                // }}
                onSubmit={this.handleSubmit.bind(this)}

                validationSchema={validationSchema}
                >
                {formikProps => (
                    <React.Fragment>
                    {/* <StyledInput 
                        label="Username"
                        formikProps={formikProps}
                        formikKey="name"
                        placeholder="  Username"
                        // autoFocus
                        // onChangeText={(name) => this.setState({ name })}
                        // value={this.state.name}

                    /> */}
                    {/* <StyledInput
                        label="Email"
                        formikProps={formikProps}
                        formikKey="email"
                        placeholder="Email"
                        autoFocus
                    /> */}
                      <Text style={styles.error}>{this.state.errorMsg}</Text>
                      <StyledInput 
                          label="Email"
                          formikProps={formikProps}
                          formikKey="email"
                          placeholder="  Email"
                          // autoFocus
                          // onChange={this.handlerEmail}
                          // onChangeText={(email) => this.setState({ email })}

                      />
                    <StyledInput 
                        label="Password"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="  Password"
                        secureTextEntry
                        // onChangeText={(password) => this.setState({ password })}
                        // value={this.state.password}

                    />

                    {/* <StyledInput
                        label="Confirm Password"
                        formikProps={formikProps}
                        formikKey="confirmPassword"
                        placeholder="confirm password"
                        secureTextEntry
                    /> */}

                    {/* <StyledSwitch
                        label="Agree to Terms"
                        formikKey="agreeToTerms"
                        formikProps={formikProps}
                    /> */}

                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (
                      <Button  color="white" style={styles.buttonMenu}  onPress={formikProps.handleSubmit} >Login</Button>
                      // <Button title="Submit" onPress={this.showData()} />
                        // <Button title="Submit" onPress={this.onSubmitHandler()} />
                        
                        //  <Button color="white" style={styles.buttonMenu} onPress={this.onLogin.bind(this)}>Login</Button>


                    )}
                    <Text style={styles.info}>Don't have an account?</Text>
                    <TouchableOpacity style={styles.info} onPress={this.signup}><Text>Click here to Signup</Text></TouchableOpacity>
                    
                    </React.Fragment>
                )}
                </Formik>
            </SafeAreaView>
        )
    }
  
}
const mapStateToProps = (state) => {
  return {
     sU: state.userSet
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  settingUserData: payload => setUser(payload),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = StyleSheet.create ({

  container: {
  //  width: "100%",
  //  aspectRatio: 2,
  //  backgroundColor: "green",
  //  height: "100%"
  flex: 1,
  marginTop: 10

},
  boldText: {
     fontSize: 30,
     color: 'red',
  },
  
  textWrapper: {
    height: hp('10%'), // 70% of height device screen
    width: wp('100%'),   // 80% of width device screen
    backgroundColor: "blue"
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  },
  info: {
    marginLeft: 20,
    marginTop: 5
  },
  // button:{
  //   width: wp("50%"),
  //   color: "blue"
  // }
  buttonMenu:{
    backgroundColor: "indigo",
    marginBottom: 10,
    width: wp("40%"),
    marginLeft: 20
  }
  ,
  error:{
    color: "red"
  }
});