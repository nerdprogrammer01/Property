import React, { Component } from 'react';
import {Text, View,StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerAuthLogin } from '../../actions';
import { BallIndicator,BarIndicator,DotIndicator,MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

//const urlImg='https://images.unsplash.com/photo-1562423130-8947ff8cdf59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1864&q=80';
const urlImg='https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80';
class Login extends Component{
    state={
       email:'',
       password:'',
       Indicator:false,
       Quote:'',
       Author:'',
       Image:'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
    }
     
 
    componentDidMount=async()=>{
     
      await this.Quote();
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
      };

     }

     Quote=async()=>{
      try {
        let response = await fetch(
          'https://property-exchange.herokuapp.com/quotes'
        );
        let json = await response.json();
        console.log(json.data) 
     await   this.setState({
          Quote:json.data.quote,
          Author:json.data.author
        })
        return JSON.stringify(json);
      } catch (error) {
         console.error(error);
      }
     }
    
 
    
      onLogin = () => {
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
        this.props.triggerAuthLogin(body, this.onLoginSuccess, this.onLoginError);
      } 
      onLoginSuccess=(data)=>{
        this.setState({
            Indicator:false
        })
        this.props.navigation.navigate('SignUp');
          console.log(data)
      }
       
      onLoginError=(data)=>{
          alert("Login In Failed")
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
                <View style={styles.InImageView}>
                <Text style={styles.SignUpHere}>Login Here.</Text> 
                    <TextInput
                    onChangeText={(val)=>this.setState({email:val})}
                     style={styles.TextInput1}
                    placeholder="Enter Email address"/>
                        <TextInput
                     style={styles.TextInput2}
                     onChangeText={(val)=>this.setState({password:val})}
                    placeholder="password"/>
                    {/* <Button title="Sign In"
                    style={styles.button}
                    /> */}
                    <TouchableOpacity 
                     onPress={this.onLogin}
                     style={styles.Touchable}>
                      { this.state.Indicator===true ?<DotIndicator color='white' size={10} />
                      : <Text style={styles.Texts}>LOGIN</Text>  }                       
                    </TouchableOpacity>
                    <View style={styles.createAcc}>
                    <Text style={styles.text1}>Don't Have Account?</Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}><Text style={styles.text2}> Sign Up Here</Text></TouchableOpacity>
                    </View>
                </View>
              </ImageBackground>
             
            </View>
            <View style={styles.qouteView}>
            <Text style={{alignSelf:'center',fontWeight:'bold',color:'#2da5ad',fontSize:18}}>{this.state.Quote}</Text>
            <Text style={{marginLeft:'35%',width:'70%',fontWeight:'bold',color:'#2da5ad',fontSize:18}}>- {this.state.Author}</Text>
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
      height:'40%'
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
    },
    createAcc:{
      width:'100%',
      alignContent:'space-around', 
      flexDirection:'row',
      alignSelf:'center',
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
    },
    text1:{
      color:'white',
      fontSize:17
    },
    text2:{
       fontWeight:'bold',
       color:'blue',
       fontSize:17,
       textDecorationLine: 'underline'
    },
    qouteView:{
      marginBottom:'1%',
      alignSelf:"center",
      width:'90%',
      height:'20%'
    }
}) 


const mapStateToProps = (state) => {
    let {
      loginObj
    } = state.authReducer
  
  
    return { loginObj }
  }

  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      triggerAuthLogin
    }, dispatch)
  }
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(Login);