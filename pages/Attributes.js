import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Coins from './Coins';

const Attributes = ({
  
  productivityCoins,
  setProductivityCoins,
  healthCoins,
  setHealthCoins,
  financeCoins,
  setFinanceCoins,
  hobbyCoins,
  setHobbyCoins,
}) => {
  const [productivityLevel, setProductivityLevel]=useState(0);
  const [healthLevel,setHealthLevel]=useState(0);
  const [financeLevel,setFinanceLevel]=useState(0);
  const[hobbyLevel,
  setHobbyLevel] = useState(0);
  const incrementAttribute = (levelSetter, coinSetter, coins) => {
     console.log('coinssssssssssssssss1',coins);
    if (coins > 0) {
      console.log('coinssssssssssssssss',coins);
      levelSetter((prev) => prev + 1);
      coinSetter((prev) => prev - 1);
    }
  };
  

  const buttonStyle = {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  };
 return (
   
    <View>
      <View>
      
        <Text>Productivity: {productivityLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() =>
          
            incrementAttribute(setProductivityLevel, setProductivityCoins, productivityCoins)
            
          }
        >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Health: {healthLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => incrementAttribute(setHealthLevel, setHealthCoins, healthCoins)}
        >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Finances: {financeLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => incrementAttribute(setFinanceLevel, setFinanceCoins, financeCoins)}
        >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Hobbies: {hobbyLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => incrementAttribute(setHobbyLevel, setHobbyCoins, hobbyCoins)}
        >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attributes;