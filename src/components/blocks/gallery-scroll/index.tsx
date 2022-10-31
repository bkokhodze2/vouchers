import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import {ScrollContainer} from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import Image from "next/image";
import {IMAGES} from "../../../../public/images";
import {main} from "../../../../public/images/images";
import img from "/public/images/images/mainSlider.png"
import _ from "lodash";

const GalleryScroll = ({data}: any) => {

  console.log("gallery", _.get(data, '[0]additionalInfo[0].attachments', []))
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);


  const images = [
    ..._.get(data, '[0]additionalInfo[0].attachments', [])
  ]

  console.log("images", images)

  const Slide1 = ({idx, data}: any) => {
    return <div className={"min-w-[880px] max-w-[880px] relative ml-[50px] mr-[30px] h-[546px]"}
                style={{marginLeft: `${idx === 0 ? '50px' : '0px'}`}}>
      <img src={_.get(data, 'path', [])} className={"object-cover h-full w-full rounded-xl"} alt={idx.toString()}/>
    </div>
  }

  const Slide4 = ({idx, data}: any) => {
    return <div className={"min-w-[1008px] grid grid-rows-2 grid-cols-2 gap-[28px] mr-[30px]"}>

      {[1, 2, 3, 4].map((e, index) => {
        return images[idx + index + 1] &&
						<img key={idx + index + 1} src={_.get(images, `[${idx + index + 1}].path`, [])}
								 className={"object-cover h-full w-full rounded-xl w-[490px] h-[258px]"}
								 alt={(idx + index + 1).toString()}/>
      })}

    </div>
  }

  // @ts-ignore

  const runCallback = (cb) => {
    return cb();
  };


  return (
      <div className={"w-full bg-[#F5F6F8] overflow-x-auto"}>
        <div className={"flex py-8"}>
          {
            runCallback(() => {
              const galleryItem = [];
              for (let i = 0; i < images.length; i = i + 5) {
                galleryItem.push(
                    <div key={i} className={"flex"}>
                      <Slide1 idx={i} data={images[i]}/>
                      {i + 1 < images.length && <Slide4 idx={i} data={images[i]}/>}
                    </div>
                );
              }
              return galleryItem;
            })
          }
        </div>
      </div>
  )
}

export default GalleryScroll;
