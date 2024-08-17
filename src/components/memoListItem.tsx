import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react-native';
import { View, Button, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const MemosListItem = ({ uri }: { uri: string }) => {
    const [sound, setSound] = useState<Sound>();

    async function loadSoung() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
    }

    useEffect(() =>{
        loadSoung();
    }, [uri]);

    async function playSound() {
        if(!sound){
            return;
        }
      console.log('Playing Sound');
      await sound.playAsync();
    }
  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);





    // // Initialize progress state
    // const [progress, setProgress] = useState(0);
    // const [isPlaying, setIsPlaying] = useState(false);

    // // Function to handle progress update
    // const playBackIndicator = () => {
    //     setIsPlaying(true); // Start updating progress
    // };

    // // useEffect to increment progress every second when playing
    // useEffect(() => {
    //     let interval;
        
    //     if (isPlaying && progress < 100) {
    //         interval = setInterval(() => {
    //             setProgress(prev => {
    //             const newProgress = prev + 1;
    //             if (newProgress >= 100) {
    //                 clearInterval(interval); // Stop when reaching 100%
    //                 setIsPlaying(false);
    //             }
    //             return newProgress;
    //             });
    //         }, 1000); // Update progress every second
    //     }
    //     return () => clearInterval(interval); // Cleanup interval on component unmount
    // }, [isPlaying, progress]);

    
    return (
        <View className='h-20 bg-zinc-200 px-4 rounded-xl flex flex-row items-center gap-3 border border-zinc-50'>
            <TouchableOpacity
                className='fixed inset-0 items-center gap-2'
                onPress={playSound}
                >
                <Play className='bg-zinc-100' size={23} />
            </TouchableOpacity>
    
            <View className='flex-1'>
                <View className='flex flex-row h-1 bg-neutral-300 rounded-sm items-center'>
                    <View
                    className='w-3 aspect-square bg-[royalblue] rounded-full absolute'
                    // style={{ left: `${progress}%` }} // Dynamically update the left position
                    />
                </View>
            </View>
        </View>
    ) 
}

export default MemosListItem;