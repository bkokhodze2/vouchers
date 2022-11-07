import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"
import img from "/public/images/images/offerItem.png"
import Link from "next/link";
import Lari from "../../../../public/images/icons/lari";
import "antd/dist/antd.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import InStock from "../../UI/in-stock";
import slider from "../../../../public/images/images/mainSlider.png";
import _ from 'lodash';
import dynamic from 'next/dynamic'
import {useDispatch, useSelector} from "react-redux";
import {addToFavourites, getTotalsFavourite} from "../../slices/favouritesSlice";
import ContentLoader from "react-content-loader"

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
}


const OfferItem = ({data}: IOfferItem) => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);
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


  const InnerSlider = () => {
    return <div className="carousel-wrapper h-[220px]" onClick={(e) => {
      e.stopPropagation()
    }}>
      <Carousel infiniteLoop showThumbs={false} swipeable={true} className={"h-[220px]"}>

        {
          _.get(data, 'additionalInfo[0].attachments', []).length === 0 ?
              <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
                <div className={"relative"}>
                  <img src={slider?.src}
                       alt={"slider img"}
                       height={220}
                       width={360}
                       onLoad={() => {
                         setIsLoaded(true)
                       }}
                      // quality={10}
                      // blurDataURL={IMAGES.placeholder.src}
                       placeholder="blur"
                       style={{objectFit: "cover"}}
                      // layout={"fill"}
                       loading="lazy"
                      // priority={true}
                       className="carousel-wrapper !h-[220px] object-cover rounded-t-xl"/>
                </div>
              </Link>
              :
              _.get(data, 'additionalInfo[0].attachments', []).slice(0, 4).map((item: any, index: number) => {

                return <Link href={`/company/${companySlug}/voucher/${voucherSlug}`} key={index}>
                  <div>

                    <img src={item?.path}
                         alt={"slider img"}
                         height={220}
                         width={360}
                         onLoad={() => {
                           setIsLoaded(true)
                         }}
                        // quality={50}
                        // blurDataURL={IMAGES.placeholder.src}
                         placeholder="blur"
                         style={{objectFit: "cover"}}
                        // layout={"fill"}
                         loading="lazy"
                        // priority={true}
                         className="carousel-wrapper !h-[220px] object-cover rounded-t-xl"/>


                  </div>
                </Link>

              })
        }

      </Carousel>
    </div>
  }

  return (
      <div>
        <Link href={`/company/${companySlug}/voucher/${voucherSlug}`} style={{}}>
          <div style={{
            // display: isLoaded === false ? "flex" : "unset",
            width: !isLoaded ? "0px" : "100%",
            opacity: !isLoaded ? "0" : "1",
            height: !isLoaded ? "0px" : "unset",


          }} className={" flex-col items-start bg-[transparent] relative select-none w-full"}>

            <div
                className={"h-[40px] z-10 bg-orange absolute top-5 left-4 px-[21px] rounded-[100px] flex items-center"}>
              <p className={"text-[white] text-base"}>- {Math.round(_.get(data, 'additionalInfo[0].percentage', 0))}
                %</p>
            </div>

            <div onClick={(e) => {
              e.stopPropagation()
              addFav(data)
            }}
                 className={"w-12 h-12 z-10 rounded-[50%] bg-[white] opacity-[0.5] absolute top-4 right-4 flex justify-center items-center cursor-pointer"}>
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

            {/*h-[220px] w-full max-w-[360px] flex*/}
            <div className={"h-full h-[220px] w-full max-w-[360px] relative relative "}>
              {/*<OfferItemSlider/>*/}
              {/*<img src={slider.src} alt={"slider img"} className={"object-cover rounded-xl bg-no-repeat"}/>*/}

              <InnerSlider/>

              {/*<Test/>*/}

            </div>

            <div className={"flex flex-col w-full bg-[white] px-[20px] pb-[24px] rounded-b-xl max-w-[360px]"}>
              <p className={"text-clip overflow-hidden text-start mt-3 font-bold leading-[27px] text-[#383838] text-[22px] min-h-[54px] textDots2"}>
                {_.get(data, 'additionalInfo[0].provider.name', "")}
              </p>
              <div className={"flex flex-row space-x-3 items-center mt-3"}>
                <p className={"font-bold text-[#E35A43] text-[21px] flex items-center"}>
                  <Lari color={"#E35A43"}
                        classes={"mr-[5px]"}/>
                  {_.get(data, 'entries[0].entryAmount', 0)}
                </p>
                <p className={"text-[#7B92DC] text-sm "}>
                <span
                    className={"text-[#383838] text-[12px] mr-[8px]"}>OR</span>
                  {Math.round(_.get(data, 'entries[0].entryAmount', 0) * _.get(data, 'entries[0].multiplier', 0))} P
                </p>

              </div>
              <p className={"text-[#38383899] text-start text-base leading-[23px] font-[400] mt-3 textDots2 min-h-[47px]"}>
                {_.get(data, 'additionalInfo[0].subTitles[0].description', "")}
              </p>
              <div className={"flex justify-between w-full mt-3"}>
                <p className={"text-purple text-base font-[500] mr-5"}>
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
