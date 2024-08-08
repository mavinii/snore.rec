import { View, Text, Image } from 'react-native';
import { Circle, Mic } from 'lucide-react-native';

import { colors } from '@/styles/colors';

import { Button } from '@/components/button';

 export default function Index() {
    return (
      <View className='flex-1 items-center justify-center px-5'>
         <Image 
            source={require('@/assets/logo.png')} 
            className='h-8'
            resizeMode='contain'
         />
         
         <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
            Do you speak during the night?{"\n"}Hear your voice with this new app.
         </Text>

         <View className='w-full bg-zinc-900 p-4 rounded-xl m-8 border border-zinc-800'>

            <Text className='color-zinc-400 font-regular text-center text-lg mt-4'>
               Record your voice while you sleep.
            </Text>

            <View className='border-b p-3 border-zinc-800'>
               <Button variant='secondary'>
                  <Button.Title>START RECORDING</Button.Title>
                  <Mic color={colors.zinc[200]} size={18} />
               </Button>
            </View>

            <View className='p-3'>
               <Button>
                  <Button.Title>STOP RECORDING</Button.Title>
                  <Circle color={colors.zinc[200]} size={18} />
               </Button>
            </View>
              
         </View>
      </View>
    );
 }