import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Heart, MagnifyingGlass } from 'phosphor-react-native';

const OBRAS_MOCK = [
    {
        id: 1,
        nome: 'Cyrela On The Park',
        construtora: 'Cyrela',
        porcentagem_concluida: 75,
        video_drone_url: 'https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4',
    },
    {
        id: 2,
        nome: 'MRV Parque das Flores',
        construtora: 'MRV',
        porcentagem_concluida: 35,
        video_drone_url: 'https://videos.pexels.com/video-files/1721294/1721294-hd_1920_1080_30fps.mp4',
    },
];

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-[#0F172A] pt-14">
            <ScrollView>
                <View className="px-5 mb-6">
                    <Text className="text-gray-400 text-base">Olá, Lucas</Text>
                    <Text className="text-white text-2xl font-bold">Encontre sua próxima obra</Text>
                </View>

                <View className="flex-row items-center bg-[#1E293B] mx-5 p-3 rounded-xl mb-6">
                    <MagnifyingGlass size={20} color="#94A3B8" />
                    <Text className="text-gray-400 ml-2">Buscar por nome, cidade...</Text>
                </View>

                <Text className="text-white text-xl font-bold px-5 mb-4">Obras em Destaque</Text>
                <FlatList
                    data={OBRAS_MOCK}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="bg-[#1E293B] mx-5 mb-5 rounded-2xl overflow-hidden">
                            <Video
                                source={{ uri: item.video_drone_url }}
                                style={{ width: '100%', height: 180 }}
                                shouldPlay
                                isLooping
                                isMuted
                                resizeMode={ResizeMode.COVER}
                            />
                            <View className="p-4">
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-white text-lg font-bold">{item.nome}</Text>
                                    <TouchableOpacity>
                                        <Heart size={24} color="#FFB800" weight="fill" />
                                    </TouchableOpacity>
                                </View>
                                <Text className="text-gray-400 mt-1">{item.construtora}</Text>
                                <View className="w-full bg-gray-700 h-2 rounded-full mt-3">
                                    <View
                                        className="bg-[#0B6BCB] h-2 rounded-full"
                                        style={{ width: `${item.porcentagem_concluida}%` }}
                                    />
                                </View>
                                <Text className="text-right text-gray-400 text-xs mt-1">{item.porcentagem_concluida}% concluído</Text>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
}