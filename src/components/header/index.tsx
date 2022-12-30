import React, {useEffect, useRef, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image";
import PulseLoader from "react-spinners/PulseLoader";
import {Badge, Button as AntButton, Dropdown, Form, Input} from 'antd';
import offerItem from "/public/images/images/offerItem.png";
// @ts-ignore
import {IMAGES} from "/public/images";
// @ts-ignore
import Home from "/public/images/icons/home";
// @ts-ignore
import Search from "/public/images/icons/search";
// @ts-ignore
import BarHeart from "/public/images/icons/barHeart";
// @ts-ignore
import Menu from "/public/images/icons/menu";
import MenuDrawer from "../blocks/menu-drawer";
import SearchDrawer from "../blocks/search-drawer";
// @ts-ignore
import Basket from "/public/images/icons/orders";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import OfferItem from "../blocks/offer-item";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getTotals} from "../slices/cartSlice";
import {getTotalsFavourite} from "../slices/favouritesSlice";
import {getCategories} from "../slices/categoriesSlice";
// @ts-ignore
import Lari from "/public/images/icons/lari";
import {getUserInfo} from "../slices/userSlice";

interface Icategory {
  categoryId: number,
  categoryName: string,
  offersQuantity: number
  parentCategoryId: number
}

const Header: React.FC = () => {
  const baseApi = process.env.baseApi;
  var timer1: any;

  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<any>("");
  const [points, setPoints] = useState<number>(0);
  const [findData, setFindData] = useState<[]>([]);
  const [categoryVouchers, setCategoryVouchers] = useState<[any]>([null]);
  const [chosenCategory, setChosenCategory] = useState<any>({});
  const [term, setTerm] = useState<string>("");

  const wrapperRef = useRef(null);
  const listRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const Router = useRouter();
  const [searchForm] = Form.useForm();

  const cart = useSelector((state: any) => state.cart);
  const favourites = useSelector((state: any) => state.favourites);
  const categories = useSelector((state: any) => state.categories.categoriesList);
  const userInfo = useSelector((state: any) => state.userInfo.userInfo);

  // axios.interceptors.request.use((config) => {
  //   config.headers = {
  //     ...config.headers,
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2NzIwNzYzMjEsImlhdCI6MTY3MjA0MDMzNSwiYXV0aF90aW1lIjoxNjcyMDQwMzIxLCJqdGkiOiJhYTM3ZjZjNC1iMzI3LTQ2MTQtYjIyOS1mYmMyNTBjMmE5ZDQiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5jb20vcmVhbG1zL3hyYWNvb24tZGVtbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiY2I1NjcyOC1mM2YxLTRmZjgtYTQ3ZC1kNGExOGFjMDgxOGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjcy1jYXJ0Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ2NzM5ZmUwLTRmNGMtNGFkMC1hN2YwLWJkZmVlNzEwNjJmNyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy14cmFjb29uLWRlbW8iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDY3MzlmZTAtNGY0Yy00YWQwLWE3ZjAtYmRmZWU3MTA2MmY3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJ1c2VyX2lkIjoiYmNiNTY3MjgtZjNmMS00ZmY4LWE0N2QtZDRhMThhYzA4MThjIiwibmFtZSI6ImlyYWtsaSBvY2RhbWVydmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJpcmFrbGkyOEBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiaXJha2xpIiwiZmFtaWx5X25hbWUiOiJvY2RhbWVydmUiLCJlbWFpbCI6ImlyYWtsaTI4QGdtYWlsLmNvbSJ9.aZx0oUbHd-J-M6uDPqsrxbASbTey9JL7AZtTYJ-5P1DxVF58DEw_BzPV9ge7hIeNsoEtNhfGUSDNb6XaqJThF1Iqu_hWWcPW2fst8bJvi1IqEgXlPNLY4us74JMeGyrnODc3Oihj7GNZCS_nhZE9wN7tOsURQSkIiX8PemOmr-827yupU7XFgTzB8gqTFLbd7PnQcixHDc2SOY3ZDqGcLiNyKxYUiW-l7bBFbmo6nuZ47yW6XWjtrbz-HSgUphc7naIVzHdGgyiZoFOE1VBF4WWJ5Ik9BHuaSMH04wACwLaJfe3G2R8CPKJWXC4qdxs_skSqNJE6tFTjLKip-KglYQ`
  //   };
  //   return config;
  // });

  const getChosenAvatar = () => {

    switch (parseInt(userInfo?.avatar?.path)) {
      case 1:
        return IMAGES.avatar1.src
      case 2:
        return IMAGES.avatar2.src
      case 3:
        return IMAGES.avatar3.src
      case 4:
        return IMAGES.avatar4.src
      case 5:
        return IMAGES.avatar5.src
      case 6:
        return IMAGES.avatar6.src
      default :
        return IMAGES.avatar1.src
    }

  }

  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          resetFields();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {

    // if (typeof window !== 'undefined') {
    //   document.body.classList.add('active');
    // }

    dispatch(getTotals({}));
    dispatch(getTotalsFavourite({}))
  }, [cart, favourites, dispatch]);

  useEffect(() => {

    // axios
    //     .get(`https://vouchers.pirveli.com/api/user/user/detail-info`)
    //     .then((res) => {
    //       setUserInfo(res.data)
    //     });

    axios
        .get(`${baseApi}/user`)
        .then((res) => {
          setIsLogged(res.data)
        });

    axios
        .get(`${baseApi}/vouchers/get-user-points`)
        .then((res) => {
          setPoints(res.data.amountOfPoints)
        });

    if (categories?.length === 0 || !categories) {
      // @ts-ignore
      dispatch(getCategories())
    }

    if (!userInfo?.details) {
      // @ts-ignore
      dispatch(getUserInfo())
    }

  }, [])

  console.log("user--------", userInfo)

  useEffect(() => {

    if (chosenCategory?.categoryId) {
      axios
          .get(`${baseApi}/vouchers?contractId=662&categoryId=${chosenCategory?.categoryId}&isValid=true`)
          .then((res) => {
            setCategoryVouchers(res.data)
          });
    }

  }, [chosenCategory?.categoryId])

  useEffect(() => {
    let getData: any;
    if (term) {
      getData = setTimeout(() => {
        setIsLoading(true)
        axios
            .get(`${baseApi}/vouchers?contractId=662&name=${term}&isValid=true`)
            .then((res) => {
              setFindData(res.data)
              setIsLoading(false)
            });
      }, 500)
    }

    return () => clearTimeout(getData)
  }, [term])

  useEffect(() => {
    setIsOpenMenu(false)
    setIsOpenSearch(false)
  }, [Router.pathname])

  const resetFields = () => {
    searchForm.resetFields();
    setTerm('');
  }


  const navToProfile = () => {
    typeof window !== 'undefined' && window.open("https://profile.pirveli.com/", '_self');


    // axios
    //     .post(`${baseApi}/logout`)
    //     .then((res) => {
    //       console.log("logout", res.data)
    //
    //     });

  }

  const onFinish = (values: any) => {
    resetFields();

    if (term && term.trim().length !== 0) {
      Router.push(`/search/${values.search}`)
    }
  };

  const onChange = (values: any) => {
    let data = searchForm.getFieldsValue();
    setTerm(data.search);
  }

  const getHighlightedText = (text: any, highlight: any) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return <span className={"aveSofBold"}> {parts?.map((part: any, i: number) =>
        <span className={"aveSofBold"} key={i}
              style={part?.toLowerCase() === highlight?.toLowerCase() ? {color: '#8338EC'} : {}}>
            {part}
        </span>)
    } </span>;
  }

  const getSumOffer = () => {
    let arr = Array.isArray(categories) && categories?.filter((item: any) => item.parentCategoryId === chosenCategory?.categoryId);
    // @ts-ignore
    let sum = Array.isArray(arr) && arr?.reduce((prevValue: any, currValue: any) => prevValue + currValue?.offersQuantity, 0)

    return sum
  }

  const dropdownJsx = () => {
    return <div
        className={"flex rounded-xl flex-col w-[258px] min-h-[250px] bg-[white] px-6  py-5"}>
      <p className={"text-[#383838] text-[18px] leading-[18px]"}>{userInfo?.details?.firstName} {userInfo?.details?.lastName}</p>
      <span
          className={"text-[#00000066] text-[14px] leading-[14px] mt-1"}>{points} ქულა</span>
      <div className={"w-full h-[1px] bg-[#D9D9D94D] my-4"}/>
      <div className={"flex cursor-pointer"} onClick={() => navToProfile()}>
        <Image src={ICONS.liderboard}/>
        <p className={"text-[#383838] text-base ml-2"}>პროფილი</p>
      </div>

      <div className={"flex mt-3 cursor-pointer"}
           onClick={() => navTo("https://profile.pirveli.com/tickets")}>
        <Image src={ICONS.tickets}/>
        <p className={"text-[#383838] text-base ml-2"}>ბილეთები</p>
      </div>
      <div className={"w-full h-[1px] bg-[#D9D9D94D] my-4"}/>

      <div className={"flex cursor-pointer"}
           onClick={() => navTo("https://profile.pirveli.com/orders")}>
        <Image src={ICONS.order}/>
        <p className={"text-[#383838] text-base ml-2"}>შეკვეთების ისტორია</p>
      </div>

      <div className={"flex mt-3 cursor-pointer"}>
        <Image src={ICONS.logout}/>
        <form className={"ml-2"} action="https://vouchers.pirveli.com/logout" method="post">
          <button className={"text-[#E35A43] text-base "} type={"submit"}>გასვლა</button>
        </form>
      </div>

    </div>
  }

  const SearchItem = ({data}: any) => {

    let companySlug = _.get(data, 'additionalInfo[0].provider.name', "").replaceAll(' ', '-');
    let voucherSlug = _.get(data, 'additionalInfo[0].genericTransactionTypeId', 1);

    if (!data) {
      return <p className={"aveSofBold"}>erroor</p>
    }

    return <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
      <div className={"flex py-4 w-full cursor-pointer"}>
        <div className={"w-full max-w-[125px] min-w-[125px] max-h-[76px] min-h-[76px] h-[76px] flex mr-4 relative"}>
          <img
              src={_.get(data, 'additionalInfo[0].attachments[0].path', offerItem.src)}
              height={76}
              width={125}
              placeholder="blur"
              loading={'lazy'}
              alt={"product image"} className={"rounded-xl w-full max-h-[76px]"}
              style={{objectFit: "cover"}}/>

          <div
              className={"absolute top-[8px] left-[8px] z-20 flex justify-center items-center bg-[#8338EC] rounded-[100px] h-[25px]"}>
            <p
                className={"text-[white] text-[12px] px-[12px] aveSofRegular"}>- {Math.round(_.get(data, 'additionalInfo[0].percentage', 0))} %</p>
          </div>
        </div>
        <div className={"w-full overflow-auto"}>
          <h3 className={"text-[#383838] font-bold text-base font-bold aveSofBold"}>
            {getHighlightedText(_.get(data, 'additionalInfo[0].provider.name', ""), term)}
          </h3>
          <div className={"flex w-full justify-between mt-1 "}>
            <p className={"mr-[20px] text-[#38383899] text-sm aveSofRegular"}>
              {_.get(data, 'additionalInfo[0].subTitles[0].description', "")}
            </p>
            <p className={"text-purple text-[21px] flex leading-[21px] font-[500] whitespace-nowrap aveSofMedium"}>
              <Lari color={"#3838384d"} classes={"mr-1"}/>
              {_.get(data, 'entries[0].entryAmount', 0)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  }

  const navTo = (path: string) => {
    setIsOpenMenu(false)
    setIsOpenSearch(false)
    Router.push(path);
  }

  return (
      <>
        <div className={"h-[40px] w-full flex items-center justify-center bg-[white]"}>
          <p className={"aveSofRegular"}>საიტი მუშაობს სატესტო რეჟიმში</p>
        </div>
        <div
            className={"hidden md:flex w-full sticky top-[0px]  h-[44px] min-h-[44px] bg-[#1d1d1e] items-center z-20"}>
          <div className={"w-full container m-auto flex justify-between"}>
            <div className={"flex space-x-8"}>
              <Link href={"https://pirveli.com"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer aveSofRegular "}>მთავარი</span>
              </Link>
              <Link href={"https://shop.pirveli.com"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer aveSofRegular "}>მაღაზია</span>
              </Link>
              <Link href={"https://medical.pirveli.com"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer aveSofRegular"}>მედიქალი</span>
              </Link>
              <Link href={"/"}>
                <div className={"relative flex"}>
                  <span className={"text-sm text-[#8338EC] cursor-pointer aveSofRegular"}>ვაუჩერები</span>
                  <div className={"absolute -bottom-[12px] h-[3px] w-full rounded-t-[3px] bg-[#8338EC]"}/>
                </div>
              </Link>

              <a href={"http://s3.pirveli.com/v1/api/getFile?id=6555"} target={"_blank"} rel="noopener noreferrer">
                <span className={"text-sm text-[#ffffffb3] cursor-pointer aveSofRegular"}>გათამაშება</span>
              </a>

              <a href={"http://s3.pirveli.com/v1/api/getFile?id=6556"} target={"_blank"} rel="noopener noreferrer">
                <span className={"text-sm text-[#ffffffb3] cursor-pointer aveSofRegular"}>თამაშები</span>
              </a>
            </div>

            <div className={"flex"}>
              <Image
                  src={IMAGES.coin}
                  quality={100}
                  blurDataURL={IMAGES.placeholder.src}
                  loading={"lazy"}
                  width={20}
                  height={20}
                  alt={"coin icon"}
              />
              <p
                  className={"text-sm text-[white] mr-8 ml-[5px] capitalize after:content-[''] after:h-[20px] after:bg-[#ffffffb3] after:rounded-[2px] after:ml-4 after:absolute after:w-[1px] after:text-red-500 aveSofRegular"}>
                {points}</p>
              <div className={"flex cursor-pointer"}>
                <img className={"mr-[11px]"} src={ICONS.geoFlag.src} alt={"geo flag"}/>

                <Image src={ICONS.arrowDown} alt={"arrow down"}/>
              </div>
              {/*<p className={"text-sm text-[#ffffffb3] mr-8 capitalize aveSofRegular"}>English</p>*/}
            </div>
          </div>
        </div>
        <header className={"w-full m-auto sticky md:top-[44px] top-[0px] z-20"}>

          <div className={"bg-[white] w-full relative"}>
            {/*flex container max-h-[80px]*/}
            <div className={"max-h-[80px] py-4 container m-auto grid grid-row-1 grid-cols-4"}>
              {/*logo*/}
              <div onClick={() => navTo("/")} className={"min-w-[220px] sm:min-w-[380px] max-h-[48px]"}>
                <div className={"flex items-center min-w-[220px] sm:min-w-[380px] max-h-[48px]"}>
                  <Image
                      src={IMAGES.logo}
                      quality={50}
                      blurDataURL={IMAGES.placeholder.src}
                      loading={"lazy"}
                      width={233}
                      height={43}
                      alt={"logo"}
                      className={"cursor-pointer"}
                  />
                  {/*<div className={"ml-3 cursor-pointer"}>*/}
                  {/*  <p className={"text-[#383838] text-[18px] lg:text-[26px] font-bold leading-[26px]"}>pirveli <sup*/}
                  {/*      className={"text-purple text-sm lg:text-base font-[500]"}>.com</sup></p>*/}
                  {/*  <p className={"text-gray text-sm -translate-y-[5px]"}>ფასდაკლება</p>*/}
                  {/*</div>*/}
                </div>
              </div>

              {/*logo*/}

              {/*search*/}
              <div className={"flex sm:col-span-3 col-span-3 justify-end md:justify-center"} ref={wrapperRef}>
                <div className={"hidden md:flex flex flex-grow justify-center pr-3 lg:pr-[30px]"} onClick={(e) => {
                  e.stopPropagation()
                }}>
                  <Form
                      form={searchForm}
                      name="basic"
                      // initialValues={{remember: true}}
                      onFinish={onFinish}
                      autoComplete="off"
                      onChange={onChange}
                      className={"flex w-full justify-end relative"}
                  >
                    <Form.Item
                        className={"max-w-[622px] lg:w-full w-[50%] searchInput"}
                        name="search"
                    >
                      <Input className={"h-[48px] rounded-tl-[12px] bg-[#D9D9D94D] border-none rounded-bl-[12px]"}
                             placeholder={"რასაც არ უნდა ეძებდე..."}>

                      </Input>
                    </Form.Item>

                    <div className={"relative"}>
                      <AntButton type="primary"
                                 className={"search flex rounded-tr-[12px] px-4 lg:px-[23px] h-[48px] rounded-br-[12px] bg-purple items-center relative"}
                                 htmlType="submit">
                        <Image
                            src={ICONS.search}
                            quality={30}
                            blurDataURL={IMAGES.placeholder.src}
                            loading={"lazy"}
                            width={18}
                            height={18}
                            alt={"search"}
                            layout={"fixed"}
                        />
                        {/*<img src={search?.src} alt={"search icon"} className={"w-[18px] h-[18px]"}/>*/}
                        <p className={"ml-[5px] lg:ml-[11px] lg:text-sm text-xs aveSofRegular"}>ძებნა</p>

                      </AntButton>

                      {
                          term && <div className={"absolute -left-8 top-4 cursor-pointer"} onClick={(e) => {
                            resetFields()
                          }}>
														<Image
																src={ICONS.x}
																quality={30}
																blurDataURL={IMAGES.placeholder.src}
																loading={"lazy"}
																alt={"x"}
														/>
													</div>
                      }
                    </div>

                    {/*categories result/*/}

                    <div
                        ref={listRef}
                        className={"absolute top-[68px] h-[0px] max-w-[745px] w-full px-6 max-h-[400px] overflow-y-scroll bg-[#FFFFFF] rounded-xl z-50 overflow-hidden ase-in duration-300 transition"}
                        style={{
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                          // borderTop: isScrolling ? "2px solid red" : '2px solid transparent',
                          transitionDelay: "1s",
                          transition: ".3s",
                          // display: term ? "block" : "none",
                          height: term ? "400px" : "0px"
                        }}
                    >
                      {
                        (!!findData?.length && !IsLoading) ? <div className={"flex items-center my-[20px]"}>
                          <p className={"text-[#383838] text-[22px] font-bold capitalize aveSofBold"}>ძებნის შედეგი</p>
                          <div onClick={() => {
                            setTerm("")
                            Router.push(`/search/${term}`)
                          }}>
                            <p className={"text-purple text-sm ml-2 cursor-pointer aveSofRegular"}>See all</p>
                          </div>
                        </div> : ""

                      }

                      {
                        IsLoading ? <div className={"flex flex-col w-full justify-center items-center mt-2 h-full"}>
                          <img className={"h-[250px] w-auto"} src={IMAGES.gif.src} style={{objectFit: "cover"}}
                               alt={"skeleton animation"}/>

                          <div className={"flex items-end mt-4"}>
                            <p className={"text-[#383838] text-[24px] aveSofRegular"}>Loading</p>
                            <PulseLoader size={5} color="#383838" speedMultiplier={0.7} className={"mb-1.5 ml-1.5 "}/>
                          </div>
                        </div> : <div className={" flex flex-col mt-4 divide-y divide-[#D9D9D94D]"}>

                          {findData?.map((item: any, index: number) => {
                            return <SearchItem data={item} key={index}/>
                          })}

                        </div>
                      }

                      {
                          (!findData?.length && !IsLoading) &&
													<div className={"w-full flex flex-col justify-center items-center h-[300px]"}>
														<Image
																src={IMAGES.notFound2}
																quality={60}
																blurDataURL={IMAGES.placeholder.src}
																placeholder="blur"
																loading={"lazy"}
																width={240}
																height={200}
														/>
														<p className={"text-[22px] mt-[20px] font-bold aveSofBold"}>No result found</p>
													</div>
                      }
                    </div>
                    {/*categories result/*/}
                  </Form>

                </div>
                {/*search*/}

                {/*buttons*/}
                <div className={"flex space-x-[10px] lg:space-x-[30px]  justify-end"}>
                  <Link href={"/cart"}>
                    <div className={"hidden md:block"}>
                      <Badge count={cart?.productCount} className={"badge-cart"}>
                        <div className={"flex flex-col items-center cursor-pointer"}>
                          <Image
                              src={ICONS.cart}
                              quality={60}
                              blurDataURL={IMAGES.placeholder.src}
                              loading={"lazy"}
                              alt={"cart icon"}
                              width={18}
                              height={18}
                          />


                          <p className={"capitalize mt-[11px] text-sm lg:text-base leading-4 aveSofRegular"}>კალათა</p>
                        </div>
                      </Badge>
                    </div>
                  </Link>

                  <Link href={"/wishlist"}>
                    <div className={"hidden md:block"}>
                      <Badge count={favourites?.favouritesTotalCount} className={"badge-favourites"}>
                        <div className={"flex flex-col items-center cursor-pointer"}>
                          <Image
                              src={ICONS.heart}
                              quality={60}
                              blurDataURL={IMAGES.placeholder.src}
                              loading={"lazy"}
                              width={18}
                              height={18}
                              alt={"heart icon"}
                          />
                          <p className={"capitalize mt-[11px] text-sm lg:text-base leading-4 aveSofRegular"}>ფავორიტები</p>
                        </div>
                      </Badge>
                    </div>
                  </Link>

                  {
                    isLogged ?
                        <Dropdown
                            trigger={['click']}
                            onOpenChange={() => setIsOpenDropdown(!isOpenDropdown)}
                            open={isOpenDropdown}
                            arrow={true}
                            className={"cursor-pointer dropdownMenuJsx "}
                            dropdownRender={() => dropdownJsx()}
                        >
                          <div className={"flex items-center h-[46px] "}>
                            {/*onClick={() => navToProfile()}*/}
                            <div
                                className={"group min-w-[46px] h-[46px] relative flex  items-center justify-center rounded-[50%] pb-[5px] cursor-pointer"}
                                style={{
                                  transition: "0.5s",
                                  backgroundColor: "#" + userInfo?.avatar?.code
                                }}>

                              <img src={getChosenAvatar()}
                                   alt={"avatar"}
                                   style={{objectFit: "cover", height: "100%", width: "auto"}}/>
                            </div>

                            <div className={"h-full flex items-center relative  pl-3"}
                            >
                              <svg style={{
                                transition: '0.5s',
                                transform: isOpenDropdown ? 'rotate(0deg)' : 'rotate(180deg)'
                              }}
                                   width="8" height="5" viewBox="0 0 8 5" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.7" d="M0.75 4.25L4 0.75L7.25 4.25" stroke="#383838" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </Dropdown>
                        : <Link
                            href={"https://auth.pirveli.com/realms/xracoon-demo/protocol/openid-connect/auth?response_type=code&client_id=demo-client&scope=email%20profile%20roles%20openid&state=ozej6dlmtIpneeVt7QoGPy2zXJ9e6BNPdGltyKyn3X4%3D&redirect_uri=https://vouchers.pirveli.com&nonce=KAmXCp0jHrPiUph9D2p5yVwdpT5g3qWO0iCxqJFbiv0"}
                            style={{}}
                            className={`text-[white] !text-[14px] md:!text-[16px] font-normal whitespace-nowrap aveSofRegular`}
                        >
                          <div
                              className={`h-[40px] lg:h-[48px] bg-[#383838] rounded-[8px] lg:rounded-xl px-[23px] lg:px-10 flex justify-center items-center cursor-pointer`}>
                            <p
                                className={"text-[white] !text-[14px] md:!text-[16px] font-normal whitespace-nowrap aveSofRegular"}>
                              შესვლა</p>
                          </div>
                        </Link>
                  }

                </div>
                {/*buttons*/}
              </div>
              {/*logo*/}
              {/*search*/}

            </div>
            <div className={"w-full relative"} onMouseLeave={() => {
              clearTimeout(timer1);
              setChosenCategory(null);
            }}>
              <div className={"flex container m-auto w-full h-[48px] overflow-x-auto hideBar"}>
                <div className={"flex items-center"}>
                  <Image
                      src={ICONS.shock}
                      quality={60}
                      blurDataURL={IMAGES.placeholder.src}
                      loading={"lazy"}
                      width={18}
                      height={18}
                      layout={"fixed"}
                      alt={"shock offer icon"}
                  />
                  <p className={"ml-[9px] text-purple text-base whitespace-nowrap aveSofRegular"}>შოკ შეთავაზება</p>
                </div>

                {/*sub categories*/}
                <div className={"flex items-center space-x-[20px] ml-[20px] sm:space-x-[40px] sm:ml-[40px]"}>
                  {Array.isArray(categories) && categories?.filter((item: any) => item?.parentCategoryId === null).map((item: Icategory, index: number) => {
                    return <div className={"relative"} key={index}
                                onMouseOver={() => {
                                  timer1 = setTimeout(function () {
                                    setChosenCategory(item)
                                  }, 200);
                                }}
                    >
                      <Link href={`/category/${item.categoryId}`}>
                        <p
                            className={"hover:text-[black] transition text-base whitespace-nowrap capitalize cursor-pointer aveSofRegular"}
                            style={{color: item.categoryId === chosenCategory?.categoryId ? "#8338EC" : "#383838b3"}}
                        >{item.categoryName}
                        </p>
                      </Link>
                      {item.categoryId == (chosenCategory?.categoryId || Router.query.id) &&
													<div className={"absolute bg-purple w-full h-[2px] rounded-t-[5px] -bottom-[12px]"}/>}
                    </div>
                  })}
                </div>
                {/*sub categories*/}
              </div>

              {/*category hover*/}
              {<div
                  className={"absolute md:flex hidden border-t-[1px] border-[#d9d9d94d] top-[48px] bg-[white] w-[100%] left-0 right-0 z-30"}
                  style={{
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s cubic-bezier(0, 0.88, 0.83, 0.99) 0s",
                    overflow: "hidden",
                    height: chosenCategory?.categoryId ? "500px" : "0px"
                  }}
              >
                <div className={"container m-auto grid grid-rows-1 grid-cols-4 gap-x-[30px] w-full mt-4"}>
                  <div>
                    <div className={"flex justify-between items-center"}>
                      <p
                          className={"font-bold text-[#383838] text-[22px] leading-[22px] aveSofBold "}>{chosenCategory?.categoryName} ({getSumOffer() + chosenCategory?.offersQuantity})</p>
                      <Link href={`/category/${chosenCategory?.categoryId}`}>
                        <span
                            className={"text-[#8338EC] text-[14px] cursor-pointer aveSofRegular"}>see all </span>
                      </Link>
                    </div>

                    <div className={"flex flex-col space-y-[20px] mt-[20px]"}>
                      {Array.isArray(categories) && categories?.filter((item: any) => item.parentCategoryId === chosenCategory?.categoryId).map((item: any, index: number) => {
                        return <div className={"flex justify-between items-center"} key={index}>
                          <Link href={`/category/${item.categoryId}`}>
                            <p
                                className={"text-[#383838b3] text-base mr-2 cursor-pointer hover:text-[#8338ecb3] hover:underline decoration-1 aveSofRegular"}>{item?.categoryName}</p>
                          </Link>
                          <span
                              className={"text-[#383838] text-[14px] aveSofRegular"}>{item?.offersQuantity} offer</span>
                        </div>
                      })}
                    </div>
                  </div>
                  <div className={"col-span-3"}>
                    <div className={"grid grid-flow-row-dense grid-cols-3 gap-[30px] gap-y-[40px]"}>
                      {categoryVouchers?.length > 0 && categoryVouchers?.slice(0, 3).map((item: any, index: number) => {

                        if (item) {
                          return <OfferItem data={item} key={index}/>
                        }
                        // return
                      })}
                    </div>
                  </div>
                </div>
              </div>}
              {/*category hover*/}
            </div>

          </div>

        </header>
        {/*//burgerMenu*/}
        {!isOpenSearch && !Router.pathname.includes("/company") &&
						<div className={"bar h-[83px] bg-[white] w-full block md:hidden fixed bottom-0"}
						     style={{
                   zIndex: 999
                 }}
						>
							<div className={"grid grid-cols-5 pt-3"}>
								<div onClick={() => navTo("/")}>
									<div className={"flex flex-col items-center justify-between"}
									     onClick={() => {
                         setIsOpenMenu(false)
                         setIsOpenSearch(false)
                       }}
									>
										<Home color={!isOpenMenu && !isOpenSearch && Router.pathname === "/" ? "#8338EC" : "#383838"}/>
										<p className={"mt-[7px] text-[10px] aveSofMedium"}
										   style={{
                         color: !isOpenMenu && !isOpenSearch && Router.pathname === "/" ? "#8338EC" : "#383838"
                       }}
										>Home</p>
									</div>
								</div>

								<div className={"flex flex-col items-center justify-between pt-0.5"}
								     onClick={() => {
                       setIsOpenMenu(false)
                       setIsOpenSearch(true)
                     }}
								>
									<Search color={isOpenSearch ? "#8338EC" : "#383838"}/>
									<p className={"mt-[7px] text-[10px] text-[#383838] aveSofMedium"}
									   style={{
                       color: isOpenSearch ? "#8338EC" : "#383838"
                     }}
									>Search</p>
								</div>
								<div onClick={() => navTo("/wishlist")}>
									<div className={"flex flex-col items-center justify-between"}>
										<BarHeart
												color={!isOpenMenu && !isOpenSearch && Router.pathname === "/wishlist" ? "#8338EC" : "#383838"}/>
										<p
												style={{
                          color: !isOpenMenu && !isOpenSearch && Router.pathname === "/wishlist" ? "#8338EC" : "#383838"
                        }}
												className={"mt-[7px] text-[10px] text-[#383838] aveSofMedium"}
										>Wishlist</p>
									</div>
								</div>
								<div onClick={() => navTo("/cart")}>
									<div className={"flex flex-col items-center justify-between"}>
										<Basket
												color={!isOpenMenu && !isOpenSearch && Router.pathname === "/cart" ? "#8338EC" : "#383838"}/>
										<p
												style={{
                          color: !isOpenMenu && !isOpenSearch && Router.pathname === "/cart" ? "#8338EC" : "#383838"
                        }}
												className={"mt-[7px] text-[10px] text-[#383838] aveSofMedium"}
										>კალათა</p>
									</div>
								</div>
								<div
										onClick={() => {
                      setIsOpenSearch(false)
                      setIsOpenMenu(true)
                    }}
										className={"flex flex-col items-center justify-between"}>
									<Menu color={isOpenMenu ? "#8338EC" : "#383838"}/>
									<p className={"mt-[7px] text-[10px] aveSofMedium"}
									   style={{
                       color: isOpenMenu ? "#8338EC" : "#383838"
                     }}
									>Menu</p>
								</div>
							</div>
						</div>}

        <MenuDrawer isOpenMenu={isOpenMenu}/>

        <SearchDrawer isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch}/>
        {/*//burgerMenu*/}

      </>
  )
}

export default Header;
