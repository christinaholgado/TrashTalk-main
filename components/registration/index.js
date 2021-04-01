import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Registration = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(false);
  const [confirmPasswordSecured, setConfirmPasswordSecured] = useState(false);

  const doRegister = () => {
    if ((email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword)) {
      Keyboard.dismiss();
      props.doRegister(email, password);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('./images/RegistrationBackground.png')} style={styles.image}>
          <TouchableOpacity style={styles.backButton} onPress={() => props.updateScreen('greeting')}>
            <Icon size={24} color="#D7F75B" name="arrow-back" />
          </TouchableOpacity>
          <Text style={styles.headline}>
            {"Talk trash with your closest friends."}
          </Text>
          <Text style={styles.fieldLabel}>
            {"Email Address"}
          </Text>
          <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} placeholder="example@example.com" placeholderTextColor="#A682FF" value={email} onChangeText={text => setEmail(text)}/>
          </View>
          <Text style={styles.fieldLabel}>
            {"Password"}
          </Text>
          <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} secureTextEntry={!passwordSecured} value={password} onChangeText={text => setPassword(text)}/>
            <View style={styles.visibilityContainer}>
              <TouchableOpacity onPress={() => setPasswordSecured(!passwordSecured)}>
                <Icon name="visibility" size={24} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.fieldLabel}>
            {"Confirm password"}
          </Text>
          <View style={styles.textInputRow}>
            <TextInput style={styles.textInput} secureTextEntry={!confirmPasswordSecured} value={confirmPassword} onChangeText={text => setConfirmPassword(text)}/>
            <View style={styles.visibilityContainer}>
              <TouchableOpacity onPress={() => setConfirmPasswordSecured(!confirmPasswordSecured)}>
                <Icon name="visibility" size={24} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={(email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) ? styles.primaryButton : styles.primaryButtonDisabled} onPress={() => doRegister()}>
            <Text style={(email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword )? styles.primaryButtonText : styles.primaryButtonDisabledText}>
              {"Register"}
            </Text>
            <Icon name="chevron-right" size={24} color="#434187" style={{marginLeft: 6}} />
          </TouchableOpacity>
          <View style={{flex: 1}} />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#302853",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  backButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#3B3772",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginLeft: 24,
  },
  headline: {
    fontFamily: "Roboto-Black",
    fontSize: 18,
    color: "#D7F75B",
    width: "43%",
    marginLeft: 24,
    marginTop: "20%",
    marginBottom: 24,
  },
  fieldLabel: {
    fontFamily: "Roboto-Light",
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 24,
  },
  textInput: {
    backgroundColor: "rgba(67, 65, 135, 0.6)",
    marginLeft: 24,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#FFFFFF",
    borderRadius: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 24,
    alignSelf: "stretch",
    flexDirection: "row",
    flexGrow: 1,
  },
  primaryButton: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7F75B",
    borderRadius: 2,
    marginBottom: 24,
    marginLeft: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: "#302853",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
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
    marginLeft: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingHorizontal: 24,
  },
  primaryButtonDisabledText: {
    color: "#515151",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
  },
  textInputRow: {
    flexDirection: "row",
    marginRight: 24,
  },
  visibilityContainer: {
    backgroundColor: "rgba(67, 65, 135, 0.6)",
    borderRadius: 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 24,
  }
});

export default Registration;
