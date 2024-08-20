import React, { useState, useEffect, useCallback } from 'react';
import { Pause, Play } from 'lucide-react-native';
import { View, Button, TouchableOpacity, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const MemosListItem = ({ uri }: { uri: string }) => {
    const [sound, setSound] = useState<Sound>();
    const [status, setStatus] = useState<AVPlaybackStatus>()
    
    async function loadSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri }, undefined, onPlayBackStatusUpdate);
        setSound(sound);
    }

    // Effect to load sound when URI changes
    useEffect(() => {
        loadSound();
        return () => {
        // Cleanup the sound on component unmount
        sound?.unloadAsync();
        };
    }, [uri]);

    const onPlayBackStatusUpdate = useCallback (
        async (newStatus: AVPlaybackStatus) => {
            console.log('Playback Status Updated');
            setStatus(newStatus);
            
            if (!newStatus.isLoaded || !sound) {
                console.log('Sound is not loaded');
                return;
            }
            
            if (newStatus.didJustFinish) {
                await sound?.setPositionAsync(0);
            }
        }, 
        [sound]
    );

    async function playSound() {
        if(!sound){
            return;
        }
      console.log('Playing Sound');
      if (status?.isLoaded && status.isPlaying) {
        console.log('Pausing Sound');
        await sound.pauseAsync();
        return;
      } else {
        await sound.replayAsync();
        return;
        }
    }
  
    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    const isPlaying = status?.isLoaded ? status.isPlaying : false;
    const position = status?.isLoaded ? status.positionMillis : 0;
    const duration = status?.isLoaded ? status.durationMillis : 1;
    const progress = duration ? position / duration : 0;

    // converts milliseconds to hours, minutes, and seconds
    const convertToTime = (ms: number) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor(((ms % 360000) % 60000) / 1000);
        
        return `${hours ? hours + ':' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View className='h-20 bg-zinc-200 px-4 rounded-xl flex flex-row items-center gap-3 border border-zinc-50'>
            <TouchableOpacity
                className='fixed inset-0 items-center gap-2'
                onPress={playSound}
                >
                    {isPlaying ? (
                        <Pause className='bg-zinc-100' size={23} />
                    ) : (
                        <Play className='bg-zinc-100' size={23} />
                    )}
            </TouchableOpacity>
    
            <View className='flex-1'>
                <View className='flex flex-row h-1 bg-neutral-300 rounded-sm items-center'>
                    <View
                        className='w-3 aspect-square bg-[royalblue] rounded-full absolute'
                        style={{ left: `${progress * 100}%` }} // Dynamically update the left position
                    />
                </View>
            </View>
            <Text className='ml-1 color-neutral-500'>
                {convertToTime(position ?? 0)} / {convertToTime(duration ?? 0)}
            </Text>
        </View>
    ) 
}

export default MemosListItem;