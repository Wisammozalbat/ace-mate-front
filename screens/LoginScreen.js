import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import { FirebaseContext } from '../components/Firebase';

import { KoroInput, KoroProgress } from 'rn-koro-lib'

const LoginScreen = props => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    
    const firebase = useContext(FirebaseContext);

    const login = (e) => {
        e.preventDefault();
        setLoading(true);
        firebase.auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            setLoading(false);
            var user = result.user;
            props.navigation.replace({routeName: 'Main'});
        })
        .catch(function(error) {
            setLoading(false);
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in to continue!</Text>
            <Text>Email:</Text>
            <TextInput
                keyboardType='email-address'
                onChangeText={(text)=>{setEmail(text.trim())}}
                style={{...styles.textInput, borderColor: email !== '' ? 'green': 'red'}}
                value={email}
            />
            <Text>Password:</Text>
            <TextInput
                keyboardType='default'
                onChangeText={(text)=>{setPassword(text.trim())}}
                style={{...styles.textInput, borderColor: password !== '' ? 'green': 'red'}}
                value={password}
            />
            <TouchableOpacity 
                style={styles.loginButton} 
                onPress={login}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black', textAlign: 'center'}}>OR</Text>
            <TouchableOpacity 
                style={styles.registerButton} 
                onPress={()=>{props.navigation.replace({routeName: 'Register'})}}>
                <Text style={styles.registerText}>Sign up</Text>
            </TouchableOpacity>
            <KoroProgress visible={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#ff3888', 
        paddingVertical: 10
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase'
    },
    registerButton: {
        marginVertical: 10,
        backgroundColor: '#f569a1', 
        paddingVertical: 10,
        width: '70%',
        alignSelf: 'center'
    },
    registerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase'
    },
    textInput:{
        height: 40,
        borderBottomWidth: 3,
        borderColor: 'red',
        margin: 5,
        paddingLeft: 10
    },
    container: {
        flex: 1,
        padding: 15
    }, 
    title:{
        fontSize: 20,
        textAlign: 'center',
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15
    }
})

LoginScreen.navigationOptions = {
    headerTitle: 'LOGIN'
}

export default LoginScreen;