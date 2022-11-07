import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import {ScrollContainer} from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import {Image} from 'antd';
import img from "/public/images/images/mainSlider.png"
import _ from "lodash";
import slider from "../../../../public/images/images/mainSlider.png";

const GalleryScroll = ({data}: any) => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);

  const images = [
    ..._.get(data, '[0]additionalInfo[0].attachments', [])
  ]


  const Slide1 = ({idx, data}: any) => {
    return <div className={"min-w-[880px] max-w-[880px] relative ml-[50px] mr-[30px] h-[546px] relative"}
                style={{marginLeft: `${idx === 0 ? '50px' : '0px'}`}}>
      <Image
          src={_.get(data, 'path', [])}
          // blurDataURL={IMAGES.placeholder.src}
          placeholder="loading"
          loading={'lazy'}
          // priority={true}
          // quality={80}
          // layout={"fill"}
          className={"object-cover h-full min-w-[880px] max-w-[880px] w-full h-[546px] rounded-xl"}
          alt={"voucher photo"}/>
    </div>
  }

  const Slide4 = ({idx, data}: any) => {
    return <div className={"min-w-[1008px] grid grid-rows-2 grid-cols-2 gap-[28px] mr-[30px]"}>

      {[1, 2, 3, 4].map((e, index) => {
        return images[idx + index + 1] &&
						<div key={idx + index + 1} className={"h-[258px] w-[490px] relative"}>
								<Image
										src={_.get(images, `[${idx + index + 1}].path`, [])}
                    // blurDataURL={IMAGES.placeholder.src}
										placeholder="loading"
										preview={true}
										loading={'lazy'}
                    // priority={true}
                    // quality={40}
                    // layout={"fill"}
										className={"object-cover h-full w-full rounded-xl w-[490px] h-[258px]"}
										alt={"voucher photo"}/>

						</div>

      })}

      </div>
      }

      // @ts-ignore

      const runCallback = (cb) =>
        {
          return cb();
        }
      ;

      return (
        <div className={"w-full overflow-x-auto"}>
          <div className={"flex py-8 h-[610px]"}>
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
