import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ContentLoader from "react-content-loader"

const Skeleton = () => {

  return (
      <div className={"h-[430px]"}>
        <ContentLoader
            width={"100%"}
            height={"220"}
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
          <rect x="0" y="0" rx="12" ry="12" width="100%" height="220"/>
        </ContentLoader>
        <ContentLoader
            width={"100%"}
            height={34}
            backgroundColor="#383838b3"
            foregroundColor="#fafafa"
        >
          <rect x="10" y="10" rx="12" ry="12" width="calc(100% - 40px)" height="23"/>
        </ContentLoader>

        <div className={"flex"}>
          <ContentLoader
              width={60}
              height={22}
              backgroundColor="#fb53535c"
              foregroundColor="#fafafa"
          >
            <rect x="10" y="6" rx="6" ry="6" width="50" height="15"/>
          </ContentLoader>

          <ContentLoader
              width={50}
              height={22}
              backgroundColor="#383838"
              foregroundColor="#fafafa"
          >
            <rect x="10" y="6" rx="6" ry="6" width="30" height="15"/>
          </ContentLoader>

          <ContentLoader
              width={70}
              height={22}
              backgroundColor="#7B92DC"
              foregroundColor="#fafafa"
          >
            <rect x="10" y="6" rx="6" ry="6" width="60" height="15"/>
          </ContentLoader>

        </div>

        <ContentLoader
            width={"100%"}
            height={24}
            backgroundColor="#3838384d"
            foregroundColor="#fafafa"
        >
          <rect x="10" y="10" rx="12" ry="12" width="calc(100% - 40px)" height="15"/>
        </ContentLoader>

        <ContentLoader
            width={"100%"}
            height={24}
            backgroundColor="#3838384d"
            foregroundColor="#fafafa"
        >
          <rect x="10" y="10" rx="12" ry="12" width="50%" height="15"/>
        </ContentLoader>

        <ContentLoader
            width={"40%"}
            height={24}
            backgroundColor="#8338ec75"
            foregroundColor="#fafafa"
        >
          <rect x="10" y="10" rx="12" ry="12" width="calc(100% - 40px)" height="15"/>
        </ContentLoader>

      </div>
  )
}

export default Skeleton;
