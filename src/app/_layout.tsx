import "@/styles/global.css"

import { View, StatusBar } from "react-native"
import { Slot } from "expo-router"

import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
} from "@expo-google-fonts/inter"

import Loading from "@/components/loading"

export default function Layout() {
    const [fonstsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    })

    if(!fonstsLoaded) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-zinc-950">
            <StatusBar 
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
            />
            <Slot />
        </View> 
    )
}
