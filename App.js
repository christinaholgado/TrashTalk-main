/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  PermissionsAndroid,
	Platform,
} from 'react-native';

import auth from '@react-native-firebase/auth';
//importing auth creates a local object of authentication
import Greeting from './components/greeting';
import Registration from './components/registration';
import LoginError from './components/login-error';
import Login from './components/login';
import ConfigureProfile from './components/configure-profile';
import CreateOrJoin from './components/create-or-join';
import firestore from '@react-native-firebase/firestore';
import ChatRoom from './components/chat-room';

import Geolocation from '@react-native-community/geolocation';

const App: () => React$Node = () => {
  const [currentScreen, setCurrentScreen] = useState('greeting');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState({errorTitle: '', errorDescription: '', returnScreen: '' });
  const [roomCode, setRoomCode] = useState(null);
  const [roomUsers, setRoomUsers] = useState();
  const [roomMessages, setRoomMessages] = useState();
  const [currentLocation, setCurrentLocation] = useState();



  
 

















  /*//subscribe to authorization events
  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //^this is a listener for auth 
    //properties of auth:
      //app, currentUser, 
    //check for location permissions here
    const checkPermissions = async() => {
      //check for geolocation permissions on Android
      if (Platform.OS == 'android') {
        let granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        //everything after this line has to wait until this line ^ is completed
        if (!granted) {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'TrashTalk would like to access your location',
              message: 'TrashTalk needs access to your location so your friends can see how far away you are.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK'
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          }
        } else {
          getLocation();
        }
      }
    };
  
    checkPermissions();
  

    //destroy the authSubscriber when the component unmounts
    return authSubscriber;
  }, []);

  //when the roomCode state variable changes, cancel any current subscriptions and then create a new one
  //add the roomCode useEffect hook here 
  useEffect(() => {
    let usersSubscriber = null;
    let messagesSubscriber = null;
    if ((roomCode !== null) && (roomCode !== '')) {
          usersSubscriber = firestore()
               .collection('chats')
               .doc(roomCode)
               .collection('users')
               .onSnapshot(usersSnapshot => {
                    let usersArray = [];
                    if (usersSnapshot !== null) {
                          usersSnapshot.forEach(user => {
                               usersArray.push(user.data());
                          });
                    }
                    setRoomUsers(usersArray);
               });

          messagesSubscriber = firestore()
               .collection('chats')
               .doc(roomCode)
               .collection('messages')
               .orderBy('messageDate', 'desc')
               .limit(20)
               .onSnapshot(messagesSnapshot => {
                    let messagesArray = [];
                    if (messagesSnapshot !== null) {
                          messagesSnapshot.forEach(message => {
                               messagesArray.push({key: message.id, data: message.data()});
                          });
                    }
                    setRoomMessages(messagesArray);
               });
    }

    //stop listening for updates when the roomCode changes or when the component unmounts
    return (() => {
          if ((usersSubscriber !== undefined) && (usersSubscriber !== null)) {
               console.log('unsubscribing from users');
               usersSubscriber();
          }
          if ((messagesSubscriber !== undefined) && (messagesSubscriber !== null)) {
               console.log('unsubscribing from messages');
               messagesSubscriber();
          }
    })
}, [roomCode]);


//get user's current location
  //write the getCurrentPosition function here
  const getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position);
      console.log(position);
    },
    error => console.error(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  

  //handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  //register a new account
  const doRegister = (email, password) => {
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      setCurrentScreen('configure-profile');
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        //show error screen
        setError({ errorTitle: 'You shall not pass.', errorDescription: 'Someone has already created an account with this email address. Was it you?', returnScreen: 'registration'});
      } else if (err.code === 'auth/invalid-email') {
        //show error screen
        setError({ errorTitle: 'You shall not pass.', errorDescription: "Whoops. Looks like the email address you provided wasn't valid. Do you want to try again?", returnScreen: 'registration' });
      } else if (err.code === 'auth/operation-not-allowed') {
        setError({ errorTitle: 'You shall not pass.', errorDescription: "Sorry, but we're not accepting new accounts at this time. Please try again later!", returnScreen: 'greeting'});
      } else if (err.code === 'auth/weak-password') {
        setError({ errorTitle: 'You shall not pass.', errorDescription: "Your password isn't strong enough. Please try a new password that uses mixed case letters, numbers, and symbols.", returnScreen: 'registration'});
      }
      setCurrentScreen('error');
    });
  };

  //log in an existing account
  const doSignIn = (email, password) => {
    auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      setCurrentScreen('join-or-create');
    })
    .catch(err => {
      if ((err.code === 'auth/invalid-email') || (err.code === 'auth/wrong-password') || (err.code === 'auth/user-not-found')) {
        setError({ errorTitle: 'You shall not pass.', errorDescription: "The email address or password you've entered don't match our records. Would you like to try again?", returnScreen: 'login' });
      } else if (err.code === 'auth/user-disabled') {
        setError({ errorTitle: 'You shall not pass.', errorDescription: "Your account has been disabled by an administrator.", returnScreen: 'greeting'});
      }
      setCurrentScreen('error');
    });
  };

  //log out a logged in user
  const doSignOut = () => {
    auth().signOut();
  };

  //switch the view to a different screen
  const updateScreen = screen => {
    setCurrentScreen(screen);
  };

  //join a room with a given room code
  //write the joinRoom function here
  const joinRoom = thisRoomCode => {
    setRoomCode(thisRoomCode);
    firestore()
      .collection('chats')
      .doc(thisRoomCode)
      .collection('users')
      .doc(auth().currentUser.uid)
      .set({
        displayName: auth().currentUser.displayName,
        photoURL: auth().currentUser.photoURL,
        location: currentLocation,
        uid: auth().currentUser.uid,
        userTyping: false,
      })
      .then(() => {
        setCurrentScreen('messages');
        //currentScreen is a state variable 
      });
  }; 
  

  //if still waiting on Firebase to authenticate, show a blank screen
  if (initializing) {
    return null;
  }

  /*return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ChatRoom Auth={auth} CurrentLocation={currentLocation} updateScreen={updateScreen} RoomCode="SHKW" RoomUsers={users} Messages={messages}/>
      </SafeAreaView>
    </>
  )*/

  return (
  <View style={styles.container}>
    
    <View style={{flexDirection: 'row'}}>
      <View style={styles.tile} onClick={squareClicked()} />
      <View style={styles.tile} />
      <View style={styles.tile} />
    </View>

    <View style={{flexDirection: 'row'}}>
      <View style={styles.tile} />
      <View style={styles.tile} />
      <View style={styles.tile} />
    </View>

    <View style={{flexDirection: 'row'}}>
      <View style={styles.tile} />
      <View style={styles.tile} />
      <View style={styles.tile} />
    </View>

  </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#CDB0F1',
      alignItems: 'center',
      justifyContent: 'center',
    },

    tile: {
      boarderWidth: 1,
      width: 100,
      height: 100,
    },

    xTile: {
      color: '#000000',
      fontSize: 60,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    oTile: {
      color: '#000000',
      fontSize: 60,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },


});

export default App;
