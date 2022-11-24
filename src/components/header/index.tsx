import React, {useEffect, useRef, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image";
import RingLoader from "react-spinners/RingLoader";
import PulseLoader from "react-spinners/PulseLoader";
import {Badge, Button as AntButton, Form, Input} from 'antd';
import offerItem from "../../../public/images/images/offerItem.png";
import {IMAGES} from "../../../public/images";
import Home from "../../../public/images/icons/home";

import Search from "../../../public/images/icons/search";
import BarHeart from "../../../public/images/icons/barHeart";
import Menu from "../../../public/images/icons/menu";
import MenuDrawer from "../blocks/menu-drawer";
import SearchDrawer from "../blocks/search-drawer";
import Basket from "../../../public/images/icons/orders";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import OfferItem from "../blocks/offer-item";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getTotals} from "../slices/cartSlice";
import {getTotalsFavourite} from "../slices/favouritesSlice";


interface Icategory {
  categoryId: number,
  categoryName: string,
  offersQuantity: number
  parentCategoryId: number
}

const Header: React.FC = () => {
  const baseApi = process.env.baseApi;
  var timer1: any;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const [findData, setFindData] = useState<[]>([]);
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [categoryVouchers, setCategoryVouchers] = useState<[any]>([null]);
  const [chosenCategory, setChosenCategory] = useState<any>({});
  const [term, setTerm] = useState<string>("");
  const wrapperRef = useRef(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [searchForm] = Form.useForm();
  const Router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const favourites = useSelector((state: any) => state.favourites);

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
    dispatch(getTotals({}));
    dispatch(getTotalsFavourite({}))
  }, [cart, favourites, dispatch]);

  useEffect(() => {

    if (!!categories) {
      axios
          .get(`${baseApi}/providers/categories`)
          .then((res) => {
            setCategories(res.data)
          });
    }

  }, [])

  useEffect(() => {

    if (chosenCategory?.categoryId) {
      axios
          .get(`${baseApi}/vouchers?contractId=662&categoryId=${chosenCategory?.categoryId}`)
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
            .get(`${baseApi}/vouchers?contractId=662&name=${term}`)
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
    return <span> {parts?.map((part: any, i: number) =>
        <span key={i} style={part?.toLowerCase() === highlight?.toLowerCase() ? {color: '#8338EC'} : {}}>
            {part}
        </span>)
    } </span>;
  }

  const getSumOffer = () => {
    let arr = categories?.filter(item => item.parentCategoryId === chosenCategory?.categoryId);
    let sum = arr?.reduce((prevValue, currValue) => prevValue + currValue?.offersQuantity, 0)

    return sum
  }

  const SearchItem = ({data}: any) => {

    let companySlug = _.get(data, 'additionalInfo[0].provider.name', "").replaceAll(' ', '-');
    let voucherSlug = _.get(data, 'additionalInfo[0].genericTransactionTypeId', 1);

    if (!data) {
      return <p>erroor</p>
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
              className={"absolute top-[8px] left-[8px] z-20 flex justify-center items-center bg-[#db0060] rounded-[100px] h-[25px]"}>
            <p className={"text-[white] text-[12px] px-[12px]"}>- {Math.round(_.get(data, 'additionalInfo[0].percentage', 0))} %</p>
          </div>
        </div>
        <div className={"w-full overflow-auto"}>
          <h3 className={"text-[#383838] font-bold text-base font-bold"}>
            {getHighlightedText(_.get(data, 'additionalInfo[0].provider.name', ""), term)}
          </h3>
          <div className={"flex w-full justify-between mt-1"}>
            <p className={"mr-[20px] text-[#38383899] text-sm"}>
              {_.get(data, 'additionalInfo[0].subTitles[0].description', "")}
            </p>
            <p className={"text-purple text-[21px] leading-[21px] font-[500] whitespace-nowrap"}>$
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
        <div className={"hidden md:flex w-full bg-amber-700 h-[44px] min-h-[44px] bg-[#383838] items-center "}>
          <div className={"w-full container m-auto flex justify-between"}>
            <div className={"flex space-x-8"}>
              <Link href={"https://optimoml.geopay.ge/index.php"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>მაღაზია</span>
              </Link>
              <Link href={"https://medical.pirveli.ge"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>მედიქალი</span>
              </Link>
              <Link href={"/"}>
                <div className={"relative"}>
                  <span className={"text-sm text-[#db0060] cursor-pointer"}>ვაუჩერები</span>
                  <div className={"absolute -bottom-[10px] h-[3px] w-full rounded-t-[3px] bg-[#db0060]"}/>
                </div>
              </Link>
              <Link href={"https://lot51.pirveli.ge"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>ლოტო</span>
              </Link>
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
              <p className={"text-sm text-[white] mr-8 ml-[5px] capitalize after:content-[''] after:h-[20px] after:bg-[#ffffffb3] after:rounded-[2px] after:ml-4 after:absolute after:w-[1px] after:text-red-500"}>
                40,076</p>
              <p className={"text-sm text-[#ffffffb3] mr-8 capitalize"}>English</p>
            </div>
          </div>
        </div>
        <header className={"w-full m-auto sticky top-[0px] z-20"}>

          <div className={"bg-[white] w-full relative"}>
            {/*flex container max-h-[80px]*/}
            <div className={"max-h-[80px] py-4 container m-auto grid grid-row-1 grid-cols-4"}>
              {/*logo*/}
              <div onClick={() => navTo("/")}>
                <div className={"flex items-center min-w-[200px] sm:min-w-[380px] max-h-[48px]"}>
                  <Image
                      src={ICONS.logo}
                      quality={30}
                      blurDataURL={IMAGES.placeholder.src}
                      loading={"lazy"}
                      width={40}
                      height={40}
                      alt={"search"}
                      className={"cursor-pointer"}
                  />
                  <div className={"ml-3 cursor-pointer"}>
                    <p className={"text-[#383838] text-[18px] lg:text-[26px] font-bold leading-[26px]"}>pirveli <sup
                        className={"text-purple text-sm lg:text-base font-[500]"}>.com</sup></p>
                    <p className={"text-gray text-sm -translate-y-[5px]"}>ფასდაკლება</p>
                  </div>
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
                      className={"flex w-full justify-start relative"}
                  >
                    <Form.Item
                        className={"w-full max-w-[622px] searchInput"}
                        name="search"
                    >

                      <Input className={"h-[48px] rounded-tl-[12px] bg-[#D9D9D94D] border-none rounded-bl-[12px]"}
                             placeholder={"Search Offer..."}>

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
                        <p className={"ml-[5px] lg:ml-[11px] lg:text-sm text-xs"}>Search</p>


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
                        (!!findData?.length && !isLoading) ? <div className={"flex items-center my-[20px]"}>
                          <p className={"text-[#383838] text-[22px] font-bold capitalize"}>search result</p>
                          <div onClick={() => {
                            setTerm("")
                            Router.push(`/search/${term}`)
                          }}>
                            <p className={"text-purple text-sm ml-2 cursor-pointer"}>See all</p>
                          </div>
                        </div> : ""

                      }

                      {
                        isLoading ? <div className={"flex flex-col w-full justify-center items-center mt-2 h-full"}>
                          <RingLoader
                              color="#8338EC"
                              size={80}
                              speedMultiplier={1}
                          />
                          <div className={"flex items-end mt-10"}>
                            <p className={"text-[#383838] text-[24px]"}>Loading</p>
                            <PulseLoader size={5} color="#383838" speedMultiplier={0.7} className={"mb-1.5 ml-1.5 "}/>
                          </div>
                        </div> : <div className={" flex flex-col mt-4 divide-y divide-[#D9D9D94D]"}>

                          {findData?.map((item: any, index: number) => {
                            return <SearchItem data={item} key={index}/>
                          })}

                        </div>
                      }

                      {
                          (!findData?.length && !isLoading) &&
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
														<p className={"text-[22px] mt-[20px] font-bold"}>No result found</p>
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


                          <p className={"capitalize mt-[11px] text-sm lg:text-base leading-4"}>Basket </p>
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
                          <p className={"capitalize mt-[11px] text-sm lg:text-base leading-4"}>Favorites</p>
                        </div>
                      </Badge>
                    </div>
                  </Link>
                  <div
                      className={`h-[40px] lg:h-[44px] bg-[#383838] rounded-[8px] lg:rounded-xl px-[23px] lg:px-10 flex justify-center items-center cursor-pointer `}>
                    <p style={{}}
                       className={`text-[white] !text-[14px] md:!text-[16px] font-normal whitespace-nowrap`}
                    >sign in</p>
                  </div>
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
              <div className={"flex container m-auto w-full h-[48px] overflow-x-auto"}>
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
                  <p className={"ml-[9px] text-purple text-base whitespace-nowrap"}>Shock offers</p>
                </div>

                {/*sub categories*/}
                <div className={"flex items-center space-x-[40px] ml-[40px]"}>
                  {categories?.filter(item => item?.parentCategoryId === null).map((item: Icategory, index: number) => {
                    return <div className={"relative"} key={index}
                                onMouseOver={() => {
                                  timer1 = setTimeout(function () {
                                    setChosenCategory(item)
                                  }, 200);
                                }}
                    >
                      <Link href={`/category/${item.categoryId}`}>
                        <p className={"hover:text-[black] transition text-base whitespace-nowrap capitalize cursor-pointer"}
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
                      <p className={"font-bold text-[#383838] text-[22px] leading-[22px]"}>{chosenCategory?.categoryName} ({getSumOffer() + chosenCategory?.offersQuantity})</p>
                      <Link href={`/category/${chosenCategory?.categoryId}`}>
                        <span
                            className={"text-[#8338EC] text-[14px] cursor-pointer"}>see all </span>
                      </Link>
                    </div>

                    <div className={"flex flex-col space-y-[20px] mt-[20px]"}>
                      {categories?.filter(item => item.parentCategoryId === chosenCategory?.categoryId).map((item, index) => {
                        return <div className={"flex justify-between items-center"} key={index}>
                          <Link href={`/category/${item.categoryId}`}>
                            <p
                                className={"text-[#383838b3] text-base mr-2 cursor-pointer hover:text-[#8338ecb3] hover:underline decoration-1"}>{item?.categoryName}</p>
                          </Link>
                          <span className={"text-[#383838] text-[14px]"}>{item?.offersQuantity} offer</span>
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
										<p className={"mt-[7px] text-[10px] "}
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
									<p className={"mt-[7px] text-[10px] text-[#383838]"}
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
												className={"mt-[7px] text-[10px] text-[#383838]"}
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
												className={"mt-[7px] text-[10px] text-[#383838]"}
										>Basket</p>
									</div>
								</div>
								<div
										onClick={() => {
                      setIsOpenSearch(false)
                      setIsOpenMenu(true)
                    }}
										className={"flex flex-col items-center justify-between"}>
									<Menu color={isOpenMenu ? "#8338EC" : "#383838"}/>
									<p className={"mt-[7px] text-[10px] "}
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
