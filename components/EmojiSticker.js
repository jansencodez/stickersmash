import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const EmojiSticker = ({ imageSize, stickerSource }) => {


  const translateX=useSharedValue(0);
  const translateY=useSharedValue(0);

  const scaleImage = useSharedValue(imageSize);

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan()
      .onChange((event)=>{
        translateX.value += event.changeX;
        translateY.value += event.changeY;
      });
      

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {  // Changed from onStart to onEnd
      if (scaleImage.value === imageSize) {
        scaleImage.value = imageSize * 2;
      } else {
        scaleImage.value = imageSize;
      }
    });


    const conatainerStyle = useAnimatedStyle(() => {
      return{
        transform:[
          {
            translateX: translateX.value,
          },
          {
            translateY: translateY.value,
          }
        ],
      };
    });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[conatainerStyle,{top: -350 }]}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}  
        />
      </GestureDetector>
    </Animated.View>
    </GestureDetector>
  );
}

export default EmojiSticker;
