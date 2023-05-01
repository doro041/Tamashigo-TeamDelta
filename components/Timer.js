import { useEffect, useMemo, useState } from "react";
import {View, Text, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';

const SECOND = 1000; // 1000 milliseconds = 1 second
const MINUTE = SECOND * 60; // 60 seconds = 1 minute
const HOUR = MINUTE * 60; // 60 minutes = 1 hour
const DAY = HOUR * 24; // 24 hours = 1 day

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 1,
    alignSelf: 'flex-start',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#94bfa2',
    margin: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94bfa2',
    marginTop: 20,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94bfa2',
    flexDirection: 'row'
  },
  label: {
    flexDirection: 'row',
    fontSize: 12,
    color: '#94bfa2',
    fontWeight: 'normal',
  },
  pastDeadlineContainer: {
    backgroundColor: 'red',
    padding: 10,
  },
  pastDeadlineText: {
    color: 'white',
  },
  warningContainer: {
    backgroundColor: 'yellow',
    padding: 10,
  },
  touchable: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#94bfa2',
    alignItems: 'center',
  },
  touchableText: {
    color: '#94bfa2',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerRemaining: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    borderColor: '#006400',
    borderWidth: 2,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  
});



const Timer = ({ deadline }) => {
  const [showTimer, setShowTimer] = useState(false);

  const parsedDeadline = useMemo(() => {
    const localDeadline = new Date(deadline);
    const utcDeadline = Date.UTC(
      localDeadline.getFullYear(),
      localDeadline.getMonth(),
      localDeadline.getDate(),
      localDeadline.getHours(),
      localDeadline.getMinutes(),
      localDeadline.getSeconds()
    );
    return utcDeadline;
  }, [deadline]);

  const startTime = useMemo(() => Date.now(), []);

  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    // Update the timer every second until the deadline is reached
    const interval = setInterval(() => setTime(parsedDeadline - Date.now()), 1000);

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  if (!showTimer) {
    return (
      <View>
        <TouchableOpacity style={[styles.touchable, { borderColor: '#0B6623', borderWidth: 2 }]} onPress={() => setShowTimer(true)}>
  <Text style={[styles.touchableText, { color: '#0B6623' }]}>Time Remaining</Text>
</TouchableOpacity>

      </View>
    );
  }
  

  if (time <= 0) {
    return (
      <View style={styles.pastDeadlineContainer}>
        <Text style={styles.pastDeadlineText}>Past Deadline</Text>
      </View>
    );
  }

  const timePassedPercent = (Date.now() - startTime) / (parsedDeadline - startTime);

  const labels = [
    ["D", time / DAY],
    ["H", (time / HOUR) % 24],
    ["M", (time / MINUTE) % 60],
    ["S", (time / SECOND) % 60],
  ];
  return (
    <View style={{ marginBottom: 10 }}>
      {timePassedPercent >= 0.8 && (
        <View style={styles.warningContainer}>
          
          <Text>80% of the time has passed</Text>
        </View>
      )}
      <View style={styles.timerContainer}>
      {labels.map(([label, value]) => (
        
  <View style  key={label} >
    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
      <Text style={styles.value}>{`${Math.floor(value)}`.padStart(2, "0")}</Text>
      <Text style={styles.label}>{`${label} `}</Text>
    </View>
  </View>
))}

      </View>
    </View>
  );
        };  

export default Timer;