import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Greeting = props => {
  const doSignOut = () => {
    props.Auth().signOut();
  }

  return (
    <View style={styles.greetingContainer}>
      <Image source={require('./images/TrashTalkLogo.png')} style={styles.logo} resizeMode="center" />
      {props.Auth().currentUser === null ? (
        <TouchableOpacity style={styles.primaryButton} onPress={() => props.updateScreen('login')}>
          <Text style={styles.primaryButtonText}>{"Sign In"}</Text>
          <Icon name="chevron-right" size={24} color="#302853" style={{marginLeft: 6}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.primaryButton} onPress={() => props.updateScreen('join-or-create')}>
          <Text style={styles.primaryButtonText}>{"Get Started"}</Text>
          <Icon name="chevron-right" size={24} color="#302853" style={{marginLeft: 6}} />
        </TouchableOpacity>
      )}

      {props.Auth().currentUser === null ? (
        <TouchableOpacity style={styles.secondaryButton} onPress={() => props.updateScreen('registration')}>
          <Text style={styles.secondaryButtonText}>{"Sign Up"}</Text>
          <Icon name="chevron-right" size={24} color="#D7F75B" style={{marginLeft: 6}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.secondaryButton} onPress={() => props.doSignOut()}>
          <Text style={styles.secondaryButtonText}>{"Sign Out"}</Text>
          <Icon name="chevron-right" size={24} color="#D7F75B" style={{marginLeft: 6}} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    backgroundColor: "#302853",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  primaryButton: {
    width: 150,
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7F75B",
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
  },
  primaryButtonText: {
    color: "#302853",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
  },
  secondaryButton: {
    width: 150,
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#302853",
    borderWidth: 2,
    borderColor: "#D7F75B",
    borderRadius: 2,
  },
  secondaryButtonText: {
    color: "#D7F75B",
    fontSize: 14,
    fontFamily: "Roboto-Black",
    textAlign: "center",
  },
  logo: {
    marginBottom: 48,
    height: 154,
    width: 259,
  }
});

export default Greeting;
