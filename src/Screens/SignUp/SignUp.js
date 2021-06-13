//

import React, { Component } from 'react';
import {Text, View,StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BallIndicator,BarIndicator,DotIndicator,MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
  import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerAuthRegister } from '../../actions';

//const urlImg='https://images.unsplash.com/photo-1562423130-8947ff8cdf59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1864&q=80';
const urlImg='https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80';
class SignUp extends Component{
     state={
        Indicator:false,
        email:'',
        password:'',
        Image:'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
     };
 
     componentDidMount=async()=>{
      console.log("<><><>");
      try {
        let response = await fetch(
          'https://property-exchange.herokuapp.com/splash'
        );
        let json = await response.json();
        console.log(json.url)
     await   this.setState({
          Image:json.url
        })
        return JSON.stringify(json);
      } catch (error) {
         console.error(error);
      }

     }
    
     onSignUp=()=>{
          this.setState({
              Indicator:true
          });
          console.log("email",this.state.email);
          console.log("pass",this.state.password)
      this.setState({
          Indicator:true
      })
      let body ={
          email:this.state.email,
        password:this.state.password
         }
         console.log("bdy",body)
      this.props.triggerAuthRegister(body, this.onSignUpSuccess, this.onSignUpError);

      }

      onSignUpSuccess=(data)=>{
        this.setState({
            Indicator:false
        })
        this.props.navigation.navigate('Login');
          console.log(data)
      }
       
      onSignUpError=(data)=>{
          alert("Sign Up Failed")
          this.setState({
            Indicator:false
          })
        console.log("log errorr",data)
    }

    render(){
        return(
        <View style={styles.MainView}>
            <View style={styles.MainView1}>
            <ImageBackground
            style={styles.BackgroundImg}
              source={{uri:this.state.Image}}>
                  <ScrollView>
                    
                <View style={styles.InImageView}>
                     <Text style={styles.SignUpHere}>Sign Up Here.</Text> 
                    <TextInput
                     style={styles.TextInput1}
                     onChangeText={(val)=>this.setState({email:val})}
                    placeholder="Enter Email address"/>
                     
                        <TextInput
                     style={styles.TextInput2}
                     onChangeText={(val)=>this.setState({password:val})}
                    placeholder="password"/>
                    {/* <Button title="Sign In"
                    style={styles.button}
                    /> */}
                    <TouchableOpacity 
                     onPress={this.onSignUp}
                     style={styles.Touchable}>
                      { this.state.Indicator===true ?<DotIndicator color='white' size={10} />
                      : <Text style={styles.Texts}>Sign Up</Text>  }                       
                    </TouchableOpacity>
                </View>
                </ScrollView>
              </ImageBackground>
            </View>
        </View>
    )}
}


const styles=StyleSheet.create({
    MainView:{
        backgroundColor:'#b8d2e0',
        flexDirection:'column-reverse',height:'100%',
    },  MainView1:{
        borderTopStartRadius:50,
        borderTopEndRadius:50,
        borderColor:'blue',
        marginLeft:10,
        marginRight:10,
        height:560,
        backgroundColor:'white'
    },
    BackgroundImg:{
        height:"110%",
        width:'100%',
        borderRadius:50,
        overflow:'hidden',
        opacity: 0.9
    },InImageView:{
        alignContent:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'30%',
        width:260,
        height:'60%'
    },
    TextInput1:{
        borderWidth:2,
        borderColor:'#2da5ad',
        width:'100%',
        borderRadius:20,
        backgroundColor:'#fffcfc'

    },
    TextInput2:{
        borderWidth:2,
        borderColor:'#2da5ad',
        width:'100%',
        borderRadius:20,
        marginTop:20,
        marginBottom:30,
        backgroundColor:'#fffcfc'
    },
    Touchable:{
        width:'65%',
     height:'15%',
     alignSelf:'center',
     backgroundColor:'#2da5ad',
     borderRadius:20,
     borderWidth:2,
     borderColor:'white'
    },
    button:{
     marginTop:20,
     height:'70%',
     width:'70%',
     borderRadius:20
    },
    Texts:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:18,
        marginTop:2,
        color:'white',

    },
    SignUpHere:{
        marginTop:'10%',
        marginBottom:'10%',
        fontSize:26,
        fontWeight:'bold',
        color:'white',
        marginLeft:10
    }
}) 


const mapStateToProps = (state) => {
    let {
        registerObj
    } = state.authReducer
  
  
    return { registerObj }
  }

  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        triggerAuthRegister
    }, dispatch)
  }
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(SignUp);