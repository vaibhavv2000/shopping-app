import React, { memo, useEffect, useRef, useState } from "react";
import { View, Image, useWindowDimensions } from "react-native";
import PagerView from "react-native-pager-view";

const images = imageList();

const SlideImages = () => {
  const { width } = useWindowDimensions();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [dir, setDir] = useState<"left" | "right">("right");

  const pagerRef = useRef<PagerView>(null);

  pagerRef.current && pagerRef.current.setPage(currentSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      if (dir === "right") setCurrentSlide(currentSlide + 1);
      if (dir === "left") setCurrentSlide(currentSlide - 1);
    }, 4000);

    if (currentSlide > 1) setDir("left");
    if (currentSlide < 1) setDir("right");

    return () => clearInterval(timer);
  }, [currentSlide, dir]);

  return (
    <View className="bg-red-800" style={{ height: width }}>
      <PagerView initialPage={0} className="bg-red-200 h-full" ref={pagerRef}>
        {images.map((item, index) => (
          <View key={String(index)}>
            <Image source={{ uri: item }} className="h-full w-full" />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default memo(SlideImages);

function imageList() {
  return [
    "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://plus.unsplash.com/premium_photo-1672883551968-dd15ceb7f802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  ];
}
