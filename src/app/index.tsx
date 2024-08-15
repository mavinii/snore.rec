import { View, Text, Image, ScrollView } from 'react-native';
import { Mic, MoveRight, Scroll } from 'lucide-react-native';
import { Audio } from 'expo-av';

import { colors } from '@/styles/colors';
import { Button } from '@/components/button';
import { useState } from 'react';
import { Modal } from '@/components/modal';
import Loading from '@/components/loading';
import { Recording } from 'expo-av/build/Audio';
import MemosListItem from '@/components/memoListItem';

 export default function Index() {
   const [isLoading, setIsLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [recording, setRecording] = useState<Recording>();
   const [permissionResponse, requestPermission] = Audio.usePermissions();
   const [memos, setMemos] = useState<string[]>([]);

   async function startRecording() {
     try {
      if (permissionResponse && permissionResponse.status !== 'granted') {
         console.log('Requesting permission..');
         await requestPermission();
       }
       await Audio.setAudioModeAsync({
         allowsRecordingIOS: true,
         playsInSilentModeIOS: true,
       });
 
       console.log('Starting recording..');
       const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
       );
       setRecording(recording);
       console.log('Recording started');
     } catch (err) {
       console.error('Failed to start recording', err);
     }
   }

   async function stopRecording() {
      if (!recording) {
        console.error('No recording found');
        return;
      }

      setIsLoading(true); // Show the loading indicator

      setTimeout(() => {
         setIsLoading(false); // Hide the loading indicator
         setShowModal(true); // Show the modal after loading
     }, 1000);

      console.log('Stopping recording..');
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      );
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);

      if (uri) {
        setMemos((existingMemos) => [uri, ...existingMemos]);
      }
    }

   // Save the audio recorded
   async function saveAudio() {
      // Save the audio recorded
      console.log('Audio saved');
   }

   function handleCloseModal() {
      setShowModal(false);
   }

    return (
      <View className='flex-1 items-center justify-center px-5'>
         <Image 
            source={require('@/assets/logo.png')} 
            className='h-12'
            resizeMode='contain'
         />
         
         <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
            Do you speak during the night?{"\n"}Hear what you said with this new app.
         </Text>

         <View className='w-full bg-zinc-900 p-4 rounded-xl m-8 border border-zinc-800'>
            {recording ? (
               <>
                  <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
                     Recording in progress... Have a good night!
                  </Text>
                  <View className='p-3'>
                     <Button onPress={stopRecording}>
                        <Button.Title>STOP RECORDING</Button.Title>
                        <View className='size-4 rounded-full bg-red-500 animate-pulse' />
                     </Button>
                  </View>
               </>
            ) : (
               <>
                  {/* Show loading */}
                  {isLoading && <Loading />}
                  
                  <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
                     Press record and go to sleep.{"\n"}We'll take care of the rest.
                  </Text>
                  <View className='p-3'>
                     <Button onPress={startRecording} variant='secondary' disabled={isLoading}>
                        <Button.Title>START RECORDING</Button.Title>
                        <Mic color={colors.zinc[900]} size={18} />
                     </Button>
                  </View>
               </>
            )}

            {/* Modal */}
            {showModal && (
            <Modal
               title='Recording Details'
               subtitle='Know more about the recording you made last night.'
               visible={showModal}
               onClose={handleCloseModal}
            >
               <View className='gap-4 mt-5'>
                  <Text className='text-zinc-400 font-regular text-lg'>Audio:</Text>
                  {memos.map((uri) => (
                     <MemosListItem key={uri} uri={uri} />
                  ))}
                  <Text className='text-zinc-400 font-regular text-lg'>Date:</Text>
                  <Text className='text-white font-medium text-sm'>April 15, 2022</Text>

                  <Text className='text-zinc-400 font-regular text-lg'>Duration:</Text>
                  <Text className='text-white font-medium text-sm'>8 hours and 30 minutes</Text>
                  
                  <Text className='text-zinc-400 font-regular text-lg'>Quality:</Text>
                  <Text className='text-white font-medium text-sm'>Good</Text>
                  
                  <Text className='text-zinc-400 font-regular text-lg'>Transcription:</Text>
                  <Text className='text-white font-medium text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                  
                  <View className='my-2 flex-wrap border-b border-zinc-800 items-start' />
                  <Button onPress={saveAudio} variant='secondary'>
                     <Button.Title>SAVE</Button.Title>
                     <MoveRight color={colors.zinc[900]} size={18} />
                  </Button>
               </View>
            </Modal>
         )}

         </View>

         <Text className='text-zinc-500 font-regular text-center text-sm'>
            By using this app, you agree to our{"\n"}
            <Text className='text-zinc-300 underline'>Terms of Service</Text> and {""}
            <Text className='text-zinc-300 underline'>Privacy Policy</Text>.
         </Text>
      </View>
    );
 }