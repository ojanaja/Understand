// SkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const SkeletonLoader = ({ size }) => {
    return (
        <View style={[styles.container, { width: size.width, height: size.height }]}>
            <ShimmerPlaceholder style={[styles.skeleton, { width: size.width, height: size.height }]} />
            <ShimmerPlaceholder style={[styles.skeleton, { width: size.width, height: size.height }]} />
            <ShimmerPlaceholder style={[styles.skeleton, { width: size.width, height: size.height }]} />
            {/* Add more shimmer placeholders as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    skeleton: {
        borderRadius: 8,
        marginVertical: 5,
        marginRight: 8,
    },
});

export default SkeletonLoader;
