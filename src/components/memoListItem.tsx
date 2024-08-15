import { Play } from 'lucide-react-native';
import React from 'react';
import { Text, View, } from 'react-native';

const MemosListItem = ({ uri }: { uri: string }) =>{
    return (
        <View className='h-20 bg-zinc-200 px-4 rounded-xl flex flex-row items-center gap-3 border border-zinc-50'>
            <View className='fixed inset-0 items-center gap-2'>
                <Play className='bg-zinc-100' size={20} />
            </View>

            <View className='flex-1'>
                <View className='h-1 bg-neutral-300 rounded-sm'>
                    <View className='w-3 aspect-square bg-[royalblue] rounded-full absolute' />
                </View>
            </View>
        </View>
    ) 
}

export default MemosListItem;