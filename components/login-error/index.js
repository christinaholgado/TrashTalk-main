import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginError = props => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/LoginError.png')} style={styles.image}>
        <View style={styles.innerContainer}>
          <Text style={styles.headline}>
            {props.ErrorDetails.errorTitle}
          </Text>
          <Text style={styles.contentText}>
            {props.ErrorDetails.errorDescription}
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => props.updateScreen(props.ErrorDetails.returnScreen)}>
            <Text style={styles.primaryButtonText}>
              {"Try Again"}
            </Text>
            <Icon name="chevron-right" size={24} color="#434187" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#302853",
    flexGrow: 1,
    height: "100%",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    marginTop: "20%",
    marginRight: 12,
    width: "54%",
  },
  headline: {
    fontFamily: "Roboto-Black",
    fontSize: 24,
    color: "#D7F75B",
    textAlign: "center",
    marginBottom: 6,
  },
  contentText: {
    fontFamily: "Roboto-Light",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },
  primaryButton: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    backgroundColor: "#D7F75B",
    flexDirection: "row",
  },
  primaryButtonText: {
    fontFamily: "Roboto-Black",
    fontSize: 14,
    color: "#434187",
    textAlign: "center",
    marginRight: 6,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  }
});

export default LoginError;
