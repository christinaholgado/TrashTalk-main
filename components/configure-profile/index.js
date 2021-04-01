import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const ConfigureProfile = props => {
  const [currentStep, setCurrentStep] = useState('get-name');
  const [userName, setUserName] = useState('');
  const [photoURL, setPhotoURL] = useState(null);

  const completeNameStep = () => {
    if (userName.length > 0) {
      getRandomPhoto(userName);
      setCurrentStep('photo');
    }
  }

  //get a random photo from wikipedia based on the name entered by the user
  //create the getRandomPhoto function here
  const getRandomPhoto = searchTerm => {
    let pic = '';
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=user|timestamp|url|canonicaltitle&aisort=name&aiprefix=' + searchTerm + '&origin=*&format=json')
    .then(results => results.json())
    .then(data => {
          if (data.query.allimages.length <= 0) {
               getRandomPhoto(userName.substr(0,1));
          } else {
               for (var x=0;x<data.query.allimages.length;x++) {
                    pic = data.query.allimages[x].url;
                    if ((pic.indexOf('.jpg') > 0) || (pic.indexOf('.jpeg') > 0) || (pic.indexOf('.png') > 0)) {
                          break;
                    } else {
                          pic = '';
                    }
               }

               if (pic === '') {
                    pic = 'https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg';
               }

               props.Auth().currentUser.updateProfile({
                    displayName: userName,
                    photoURL: pic,
               });
               setPhotoURL(pic);
          }
    });
};

  if (currentStep === 'get-name') {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Image source={require('./images/NameImage.png')} style={styles.nameImage} />
            <Text style={styles.headline}>
              {"Who are you?"}
            </Text>
            <View style={styles.textInputRow}>
              <TextInput style={styles.textInput} value={userName} onChangeText={text => setUserName(text)} placeholder="Michael Scott" placeholderTextColor="#A682FF" />
            </View>
            <TouchableOpacity style={userName.length > 0 ? styles.primaryButton : styles.primaryButtonDisabled} onPress={() => completeNameStep()}>
              <Text style={userName.length > 0 ? styles.primaryButtonText : styles.primaryButtonDisabledText}>
                {"Next"}
              </Text>
              <Icon name="chevron-right" size={24} color="#302853" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  } else if (currentStep === 'photo') {
    return (
      <View style={{...styles.container, alignItems: "center", justifyContent: "center"}}>
        <View style={{flex: 1}} />
        <Text style={styles.headline}>
          {"Nice to meet you, " + userName + ". We chose a profile picture for you."}
        </Text>
        <Image source={photoURL ? {uri: photoURL} : require('./images/PlaceholderAvatar.png')} style={styles.avatar} />
        <View style={{flex: 1}} />
        <TouchableOpacity style={{...styles.primaryButton, marginRight: 0, alignSelf: "center"}} onPress={() => props.updateScreen('join-or-create')}>
          <Text style={styles.primaryButtonText}>
            {"Done"}
          </Text>
          <Icon name="check" size={24} color="#302853" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#302853",
  },
  innerContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  nameImage: {
    width: "100%",
    flex: 1,
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#A682FF",
    resizeMode: "cover",
  },
  headline: {
    fontFamily: "Roboto-Black",
    fontSize: 24,
    color: "#D7F75B",
    textAlign: "center",
    marginBottom: 12,
    marginHorizontal: 24,
  },
  textInputRow: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 12,
    alignSelf: "stretch",
  },
  textInput: {
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "left",
    borderRadius: 2,
    alignSelf: "stretch",
    flex: 1,
    backgroundColor: "rgba(67, 65, 135, 0.6)",
  },
  primaryButton: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7F75B",
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 24,
    alignSelf: "flex-end",
    marginRight: 24,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: "#302853",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
    marginRight: 6,
  },
  primaryButtonDisabled: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BDBDBD",
    borderRadius: 2,
    marginBottom: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 24,
    alignSelf: "flex-end",
    marginRight: 24,
  },
  primaryButtonDisabledText: {
    color: "#515151",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
    marginRight: 6,
  },
  secondaryButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 210,
    height: 44,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#A682FF",
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#C9B3FF",
    textAlign: "center",
  },
});

export default ConfigureProfile;
