import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS, SIZES, icons, FONTS} from '../constants';

function LineDivider() {
  return (
    <View
      style={{
        width: 1,
        paddingVertical: 5,
      }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray2,
          borderLeftWidth: 1,
        }}></View>
    </View>
  );
}

const BookDetail = ({navigation, route}) => {
  const [book, setBook] = useState(null);

  const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

  const indicator = new Animated.Value(0);

  useEffect(() => {
    let {book} = route.params;
    setBook(book);
  }, [book]);
  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={book.bookCover}
          resizeMode="cover"
          style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
        />
        {/* color overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: book.backgroundColor,
          }}></View>

        {/* navigation header */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={{marginLeft: SIZES.base}}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: book.tintColor}}
            />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...FONTS.h3, color: book.navTintColor}}>
              Book Detail
            </Text>
          </View>
          <TouchableOpacity
            style={{marginRight: SIZES.base}}
            onPress={() => console.log('Click More')}>
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: book.navTintColor,
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
        </View>
        {/* book cover */}
        <View
          style={{
            flex: 5,
            paddingTop: SIZES.padding2,
            alignItems: 'center',
          }}>
          <Image
            source={book.bookCover}
            resizeMode="contain"
            style={{flex: 1, width: 150, height: 'auto'}}
          />
        </View>

        {/* book name and author */}
        <View
          style={{flex: 1.8, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...FONTS.h2, color: book.navTintColor}}>
            {book.bookName}
          </Text>
          <Text style={{...FONTS.body3, color: book.navTintColor}}>
            {book.author}
          </Text>
        </View>
        {/* book info  */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            margin: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          {/* rating */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.rating}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Rating</Text>
          </View>
          <LineDivider />

          {/* pages */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.pageNo}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Page No</Text>
          </View>
          <LineDivider />

          {/* language */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.language}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Language</Text>
          </View>
        </View>
      </View>
    );
  }
  const renderBookDescription = () => {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const diffrence =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: SIZES.padding}}>
        {/* custom scrollbar */}
        <View
          style={{
            width: 4,
            height: '100%',
            backgroundColor: COLORS.gray1,
          }}>
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: COLORS.lightGray4,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight,
                  ).interpolate({
                    inputRange: [0, diffrence],
                    outputRange: [0, diffrence],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{paddingLeft: SIZES.padding2}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) =>
            setScrollViewWholeHeight(height)
          }
          onLayout={({
            nativeEvent: {
              layout: {x, y, width, height},
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: indicator}}}],
            {useNativeDriver: false},
          )}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              marginBottom: SIZES.padding,
            }}>
            Description
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.lightGray,
            }}>
            {book.description}
          </Text>
        </ScrollView>
      </View>
    );
  };
  function renderBottomButton() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* bookmark */}
        <TouchableOpacity
          onPress={() => console.log('bookmark')}
          style={{
            width: 60,
            backgroundColor: COLORS.secondary,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={icons.bookmark_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.lightGray2,
            }}
          />
        </TouchableOpacity>
        {/* start reading */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Start Reading')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Start Reading</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (book) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* book cover section */}
        <View style={{flex: 4}}>{renderBookInfoSection()}</View>
        {/* description */}
        <View style={{flex: 2}}>{renderBookDescription()}</View>

        {/* buttons */}
        <View style={{height: 70, marginBottom: 30}}>
          {renderBottomButton()}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default BookDetail;
