import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"
import Link from "next/link";
// @ts-ignore
import Lari from "/public/images/icons/lari";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import InStock from "../../UI/in-stock";
import slider from "/public/images/images/mainSlider.webp";
import _ from 'lodash';
import dynamic from 'next/dynamic'
import {useDispatch, useSelector} from "react-redux";
import {addToFavourites} from "../../slices/favouritesSlice";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CountDown = dynamic(
    () => import('../../UI/count-down'),
    {ssr: false}
)

const Skeleton = dynamic(
    () => import('../../blocks/offer-item/skeleton'),
    {ssr: false}
)

interface IOfferItem {
  data: any,
  miniHeight?: boolean
}


const OfferItem = ({data, miniHeight}: IOfferItem) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  let companySlug = _.get(data, 'additionalInfo[0].provider.name', "").replaceAll(' ', '-');
  let voucherSlug = _.get(data, 'additionalInfo[0].genericTransactionTypeId', "");

  const favourites = useSelector((state: any) => state.favourites);

  const dispatch = useDispatch();

  const addFav = (product: any) => {
    dispatch(addToFavourites(product));
  }

  useEffect(() => {
    setIsFavourite(false);
    favourites?.favouritesList?.map((e: any) => {

      if (_.get(e, 'additionalInfo[0].genericTransactionTypeId', 0) === _.get(data, 'additionalInfo[0].genericTransactionTypeId', 0)) {
        setIsFavourite(true);
      }
    })

  }, [favourites, data, dispatch]);

  return (
      <div className={`${miniHeight ? 'miniHeight' : ''} cursor-pointer lg:max-w-[400px] sm:max-w-[400px] max-w-7xl`}>
        <Link href={`/company/${companySlug}/voucher/${voucherSlug}`} style={{}}>
          <div style={{
            // display: isLoaded === false ? "flex" : "unset",
            width: !isLoaded ? "0px" : "100%",
            opacity: !isLoaded ? "0" : "1",
            height: !isLoaded ? "0px" : "unset",
          }} className={" flex-col items-start bg-[transparent] relative select-none w-full"}>

            <div
                className={"sm:h-[40px] h-[34px] z-10 bg-[#8338EC] absolute top-5 left-4 sm:px-[21px] px-4 rounded-[100px] flex items-center"}>
              <p className={"text-[white] text-xs sm:text-base aveSofRegular"}>- {Math.round(_.get(data, 'additionalInfo[0].percentage', 0))}
                %</p>
            </div>

            <div onClick={(e) => {
              e.stopPropagation()
              addFav(data)
            }}
                 className={"sm:w-12 sm:h-12 h-10 w-10 z-10 rounded-[50%] bg-[white] opacity-[0.5] absolute top-4 right-4 flex justify-center items-center cursor-pointer"}>
              {isFavourite ? <Image
                      src={ICONS.heartPurple}
                      quality={60}
                      blurDataURL={IMAGES.placeholder.src}
                      loading={"lazy"}
                      alt={"heart icon"}/> :
                  <Image
                      src={ICONS.heartBlue}
                      quality={60}
                      blurDataURL={IMAGES.placeholder.src}
                      loading={"lazy"}
                      alt={"heart icon"}

                  />}
            </div>

            <div
                className={"img h-full h-[211px] sm:h-[220px] w-full lg:max-w-[400px] sm:max-w-[400px] max-w-7xl relative relative "}>
              <div className="carousel-wrapper " onClick={(e) => {
                e.stopPropagation()
              }}>
                <Carousel infiniteLoop showThumbs={false} swipeable={true} className={""}>
                  {
                    _.get(data, 'additionalInfo[0].attachments', []).length === 0 ?
                        <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
                          <div className={"relative h-full"}>
                            <LazyLoadImage src={slider?.src}
                                           alt={"slider img"}
                                           width={360}
                                           onLoad={() => {
                                             setIsLoaded(true)
                                           }}
                                           style={{objectFit: "cover"}}
                                           loading="lazy"
                                           className="img carousel-wrapper !h-[211px] sm:!h-[220px] object-cover sm:rounded-t-xl sm:rounded-[0px] rounded-xl"/>
                          </div>
                        </Link>
                        :
                        _.get(data, 'additionalInfo[0].attachments', []).slice(0, 4).map((item: any, index: number) => {
                          return <Link href={`/company/${companySlug}/voucher/${voucherSlug}`} key={index}>
                            <div className={"relative h-full"}>
                              <LazyLoadImage src={item?.path}
                                             alt={"slider img"}
                                             width={360}
                                             onLoad={() => {
                                               setIsLoaded(true)
                                             }}
                                             style={{objectFit: "cover"}}
                                             loading="lazy"
                                             className="img carousel-wrapper !h-[211px] sm:!h-[220px] object-cover sm:rounded-t-xl sm:rounded-[0px] rounded-xl"/>
                            </div>
                          </Link>
                        })
                  }
                </Carousel>
              </div>
            </div>

            <div
                className={"flex flex-col w-full sm:bg-[white] bg-[white] sm:px-[20px] sm:pb-6 pb-[18px] px-[14px] rounded-b-xl lg:max-w-[400px] sm:max-w-[400px] max-w-7xl"}>
              <p className={"text-clip overflow-hidden text-start sm:mt-3 mt-2 sm:font-bold font-[500] leading-[27px] text-[#383838] sm:text-[22px] text-base min-h-[54px] textDots2 aveSofBold"}>
                {_.get(data, 'additionalInfo[0].provider.name', "")}
              </p>
              <div className={"flex flex-row space-x-3 items-center sm:mt-3 mt-1 aveSofMedium"}>
                <p className={"font-bold text-[#E35A43] text-[21px] flex items-center aveSofMedium"}>
                  <Lari color={"#E35A43"}
                        classes={"mr-[5px]"}/>
                  {_.get(data, 'entries[0].entryAmount', 0)}
                </p>
                <div className={"text-[#7B92DC] text-sm flex items-center"}>
                <span className={"text-[#383838] text-[12px] mr-[8px] aveSofRegular"}>
                  OR
                </span>
                  {Math.round(_.get(data, 'entries[0].entryAmount', 0) * _.get(data, 'entries[0].multiplier', 0))}
                  <div className={"ml-1.5 flex items-center justify-center"}>
                    <Image
                        src={IMAGES.coin}
                        quality={100}
                        blurDataURL={IMAGES.placeholder.src}
                        loading={"lazy"}
                        width={15}
                        height={15}
                        alt={"coin icon"}
                    />
                  </div>
                </div>

              </div>
              <p className={"text-[#38383899] text-start text-base leading-[23px] font-[400] sm:mt-[14px] mt-1 textDots2 min-h-[47px] aveSofRegular"}>
                {_.get(data, 'additionalInfo[0].subTitles[0].description', "")}
              </p>
              <div className={"flex justify-between w-full sm:mt-3 mt-1"}>
                <p className={"sm:text-purple text-[#383838] text-base font-[500] mr-5"}>
                  <CountDown data={data?.useEndDate}/>
                </p>
                <InStock max={_.get(data, 'additionalInfo[0].limitQuantity', 0)}
                         current={_.get(data, 'additionalInfo[0].soldQuantity', 0)}/>
              </div>
            </div>

          </div>
        </Link>
        {!isLoaded && <Skeleton/>}
      </div>
  )
}

export default OfferItem;
