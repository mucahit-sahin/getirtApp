import React from 'react';
import {View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const StatusIndicator = ({position}) => {
  const labels = [
    'Kurye\nAranıyor',
    'Alışveriş\nYapılıyor',
    'Sipariş\nYolda',
    'Sipariş\nUlaştı',
    'Sipariş\nTamamlandı',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 15,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 10,
      }}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={position}
        labels={labels}
        stepCount={5}
      />
    </View>
  );
};

export default StatusIndicator;
