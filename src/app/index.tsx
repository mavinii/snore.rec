import { View, Text, Image } from 'react-native';
import { Circle, Mic, MoveRight } from 'lucide-react-native';

import { colors } from '@/styles/colors';
import { Button } from '@/components/button';
import { useState } from 'react';
import { Modal } from '@/components/modal';
import Loading from '@/components/loading';

 export default function Index() {
   const [startRecording, setStartRecording] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showModal, setShowModal] = useState(false);

   function hundleStartRecordingAudio() {
      setStartRecording(true);
   }

   function handleStopRecordingAudio() {
      setStartRecording(false);
      setIsLoading(true); // Show the loading indicator

      setTimeout(() => {
         setIsLoading(false); // Hide the loading indicator
         setShowModal(true); // Show the modal after loading
      }, 3000);
   }

   // function handleStopRecordingAudio() {
   //    setStartRecording(false);

   //    setTimeout(() => {
   //       <Loading />
   //    }, 3000);

   //    // Then show Modal
   //    setShowModal(true);
   // }

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

            {startRecording ? (
            <>
               <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
                  Recording... Have a good night!
               </Text>
               
               <View className='p-3'>
                  <Button onPress={handleStopRecordingAudio}>
                     <Button.Title>STOP RECORDING</Button.Title>
                     <Circle color={colors.zinc[800]} size={18} />
                  </Button>
               </View>
            </>
            ) : (
            <>
              <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
                  Press record and go to sleep.{"\n"}We'll take care of the rest.
               </Text>

               <View className='p-3'>
                  <Button onPress={hundleStartRecordingAudio} variant='secondary'>
                     <Button.Title>START RECORDING</Button.Title>
                     <Mic color={colors.zinc[200]} size={18} />
                  </Button>
               </View>
            </>
            )}

         </View>

         <Text className='text-zinc-500 font-regular text-center text-sm'>
            By using this app, you agree to our{"\n"}
            <Text className='text-zinc-300 underline'>Terms of Service</Text> and {""}
            <Text className='text-zinc-300 underline'>Privacy Policy</Text>.
         </Text>

         {isLoading && <Loading />}
         <Modal
            title='Audio Recorded' 
            subtitle='Know more about the recording you made last night.'
            visible={showModal}
            onClose={handleCloseModal}
            >

            <View className='my-2 flex-wrap border-b border-zinc-800 items-start' />

            <View className='gap-4 mt-5'>
               <Text className='text-zinc-400 font-regular text-sm'>Date</Text>
               <Text className='text-white font-medium text-sm'>April 15, 2022</Text>

               <Text className='text-zinc-400 font-regular text-sm'>Duration</Text>
               <Text className='text-white font-medium text-sm'>8 hours and 30 minutes</Text>

               <Text className='text-zinc-400 font-regular text-sm'>Quality</Text>
               <Text className='text-white font-medium text-sm'>Good</Text>

               <Text className='text-zinc-400 font-regular text-sm'>Transcription</Text>
               <Text className='text-white font-medium text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at nunc ac odio.</Text>
               
               <View className='my-2 flex-wrap border-b border-zinc-800 items-start' />

               <Button variant='secondary'>
                  <Button.Title>SAVE</Button.Title>
                  <MoveRight color={colors.zinc[200]} size={18} />
               </Button>
            </View>
         </Modal>

      </View>
    );
 }