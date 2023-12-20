import { View, Text, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import ContentItem from './ContentItem'
import COLORS from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';


export default function Content({ content, onChapterFinish }) {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);

    console.log('Content Component - Received content:', content)
    let contentRef;
    const onNextBtnPress = (index) => {
        if (index == content.length - 1) {
            // navigation.goBack();
            onChapterFinish();
            return;
        }
        else {

            contentRef.scrollToIndex({ animated: true, index: index + 1 })
        }
        setActiveIndex(index + 1);
    }

    return (
        <ScrollView>
            <View style={{ padding: 10, height: '100%' }}>
                <ProgressBar contentLength={content?.length} contentIndex={activeIndex} />
                <FlatList
                    data={content}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={(ref) => {
                        contentRef = ref
                    }}
                    renderItem={({ item, index }) => (
                        console.log('FlatList - Rendering Item:', item),
                        <View View style={{
                            width: Dimensions.get('screen').width, padding: 20,
                        }}>
                            <Text style={{
                                fontFamily: 'bold',
                                fontSize: 20,
                                marginTop: 5
                            }}>{item.heading}</Text>
                            <ContentItem
                                description={item?.description?.html}
                                output={item?.output?.html}
                            />
                            <TouchableOpacity style={{ marginTop: 15 }}
                                onPress={() => onNextBtnPress(index)}>
                                <Text style={{
                                    padding: 15, backgroundColor: COLORS.GREEN,
                                    color: COLORS.PRIMARY, borderRadius: 15,
                                    fontFamily: 'bold',
                                    textAlign: 'center',
                                    fontSize: 17
                                }}>
                                    {
                                        index == content.length - 1 ? "Finish" : "Next"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ScrollView >
    )
}
