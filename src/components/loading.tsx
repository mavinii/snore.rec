import React from 'react';
 import { ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';

 export default function Loading() {
    return (
        <ActivityIndicator 
            className='flex-1 justify-center bg-zinc-950 items-center text-zinc-300'
        />
        // <TouchableOpacity style={styles.button} disabled>
        //     <ActivityIndicator style={styles.spinner} size="small" color="#ffffff" />
        //     <Text>Processing...</Text>
        // </TouchableOpacity>
    ); 
 }

//  const styles = StyleSheet.create({
//     button: {
//       backgroundColor: '#4F46E5', // indigo-500
//       padding: 10,
//       borderRadius: 5,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     spinner: {
//       marginRight: 8,
//     },
//     buttonText: {
//       color: '#FFFFFF', // white
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//   });