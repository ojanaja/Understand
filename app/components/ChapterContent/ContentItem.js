import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import RenderHtml from 'react-native-render-html';
import COLORS from '../../Utils/Colors';

export default function ContentItem({ description, output }) {
    const { width } = useWindowDimensions();
    const [isRun, setIsRun] = useState(false);

    const descriptionSource = {
        html: description
    }

    const outputSource = {
        html: output
    }


    return description && (
        <ScrollView>
            <View>
                {/* <Text>{description}</Text> */}
                <RenderHtml
                    contentWidth={width}
                    source={descriptionSource}
                    tagsStyles={tagsStyles}
                />

                {output != null ? <TouchableOpacity
                    onPress={() => setIsRun(true)}
                    style={{ marginTop: -15, marginBottom: 20 }}>
                    <Text style={{
                        padding: 10, backgroundColor: COLORS.GREEN, borderRadius: 10, width: 100,
                        fontFamily: 'bold', fontSize: 14, color: COLORS.PRIMARY, textAlign: 'center'
                    }}>Run</Text>
                </TouchableOpacity> : null}

                {isRun ?
                    <>

                        <Text style={{
                            fontFamily: 'bold', fontSize: 17,
                            marginBottom: 10
                        }}>Output</Text>
                        <RenderHtml
                            contentWidth={width}
                            source={outputSource}
                            tagsStyles={outputtagsStyles}
                        />
                    </>
                    : null}
            </View>
        </ScrollView>
    )
}

const tagsStyles = {
    body: {
        fontFamily: 'bold',
        fontSize: 18
    },

    code: {
        backgroundColor: COLORS.BLACK,
        color: COLORS.PRIMARY,
        padding: 20,
        borderRadius: 15,
        width: 350
    }

}

const outputtagsStyles = {
    body: {
        fontFamily: 'bold',
        fontSize: 18,
        backgroundColor: COLORS.BLACK,
        color: COLORS.PRIMARY,
        padding: 20,
        borderRadius: 15,
        width: 350
    },
}