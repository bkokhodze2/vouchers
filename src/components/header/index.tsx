import React, {useCallback, useEffect, useRef, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image"
import RingLoader from "react-spinners/RingLoader";
import PulseLoader from "react-spinners/PulseLoader";
import {Button as AntButton, Form, Input} from 'antd';
import Button from "../UI/button";
import {coin} from "../../../public/images/images";
import offerItem from "../../../public/images/images/offerItem.png";
import {IMAGES} from "../../../public/images";
import Link from "next/link";
import router, {useRouter} from "next/router";
import CartItem from "../blocks/cart/cart-item";
import axios from "axios";
import OfferItem from "../blocks/offer-item";
import _ from "lodash";

interface category {
  name: string,
  id: number
}

const Header: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [findData, setFindData] = useState<[any]>([{}]);
  const [categories, setCategories] = useState<[any]>([{}]);
  const [categoryVouchers, setCategoryVouchers] = useState<[any]>([null]);
  const [chosenCategory, setChosenCategory] = useState<any>({});
  const baseApi = process.env.baseApi;

  const [term, setTerm] = useState<string>("");

  const listRef = useRef<HTMLDivElement>(null);
  const [searchForm] = Form.useForm();

  const Router = useRouter();

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
    const getData = setTimeout(() => {
      setIsLoading(true)
      axios
          .get(`${baseApi}/vouchers?contractId=662&name=${term}`)
          .then((res) => {
            setFindData(res.data)
            setIsLoading(false)
          });
    }, 500)

    return () => clearTimeout(getData)
  }, [term])


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
    let sum = arr.reduce((prevValue, currValue) => prevValue + currValue?.offersQuantity, 0)

    return <>see all ({sum})</>
  }

  const SearchItem = ({data}: any) => {

    let companySlug = _.get(data, 'additionalInfo[0].provider.name', "").replaceAll(' ', '-');
    let voucherSlug = data?.title?.replaceAll(' ', '-');

    if (!data) {
      return <p>erroor</p>
    }

    return <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
      <div className={"flex py-4 w-full"}>
        <div className={"w-full max-w-[125px] max-h-[76px] mr-4 relative"}>
          {
            <img
                src={_.get(data, 'additionalInfo[0].attachments[0].path', offerItem.src)}
                alt={"product image"} className={"rounded-xl w-full max-h-[76px]"}
                style={{objectFit: "cover"}}/>
          }

          <div
              className={"absolute top-[8px] left-[8px] z-20 flex justify-center items-center bg-[#E35A43] rounded-[100px] h-[25px]"}>
            <p className={"text-[white] text-[12px] px-[12px]"}>- {_.get(data, 'additionalInfo[0].percentage', 0)} %</p>
          </div>
        </div>
        <div className={"w-full"}>
          <h3 className={"text-[#383838] font-bold text-base font-bold"}>
            {getHighlightedText(_.get(data, 'title', ""), term)}
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

  // @ts-ignore
  // @ts-ignore
  return (
      <>
        <div className={"w-full bg-amber-700 h-[44px] bg-[#383838] flex items-center "}>
          <div className={"w-full container m-auto flex justify-between"}>
            <div className={"flex space-x-8"}>
              <Link href={"/"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>E-commerce</span>
              </Link>
              <Link href={"/"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>Medical Card</span>
              </Link>
              <Link href={"/"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>Discount</span>
              </Link>
              <Link href={"/"}>
                <span className={"text-sm text-[#ffffffb3] cursor-pointer"}>Lotto</span>
              </Link>
            </div>

            <div className={"flex"}>
              <Image src={IMAGES.coin} alt={"coin icon"} width={20} height={20}/>
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
              <Link href={"/"}>
                <div className={"flex items-center min-w-[380px] max-h-[48px]"}>
                  <Image src={ICONS.logo} alt={"search"} className={"cursor-pointer"} width={40} height={40}/>
                  <div className={"ml-3 cursor-pointer"}>
                    <p className={"text-[#383838] text-[26px] font-bold leading-[26px]"}>pirveli <sup
                        className={"text-[#E35A43] text-base"}>.com</sup></p>
                    <p className={"text-gray text-sm -translate-y-[5px]"}>ყველაფერი ერთად</p>
                  </div>
                </div>
              </Link>

              {/*logo*/}

              {/*search*/}
              <div className={"flex col-span-3"}>
                <div className={"flex flex-grow justify-center pr-[30px]"}>
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
                                 className={"search flex rounded-tr-[12px] px-[23px] h-[48px] rounded-br-[12px] bg-purple items-center relative"}
                                 htmlType="submit">
                        <Image src={ICONS.search} alt={"search"} width={18} height={18}/>
                        {/*<img src={search?.src} alt={"search icon"} className={"w-[18px] h-[18px]"}/>*/}
                        <p className={"ml-[11px]"}>Search</p>


                      </AntButton>

                      {
                          term && <div className={"absolute -left-8 top-4 cursor-pointer"} onClick={(e) => {
                            resetFields()
                          }}>
														<Image src={ICONS.x} alt={"x"}/>
													</div>
                      }
                    </div>


                    <div
                        ref={listRef}
                        className={"absolute top-[68px] h-[0px] max-w-[745px] w-full px-6 max-h-[400px] overflow-y-scroll bg-[#FFFFFF] rounded-xl z-50 overflow-hidden ase-in duration-300 transition"}
                        style={{
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                          // borderTop: isScrolling ? "2px solid red" : '2px solid transparent',
                          transition: ".3s",
                          // display: term ? "block" : "none",
                          height: term ? "400px" : "0px"
                        }}
                    >
                      {
                          (!!findData?.length && !isLoading) && <div className={"flex items-center my-[20px]"}>
														<p className={"text-[#383838] text-[22px] font-bold capitalize"}>search result</p>
														<div onClick={() => {
                              setTerm("")
                              Router.push(`/search/${term}`)
                            }}>
															<p className={"text-purple text-sm ml-2 cursor-pointer"}>See all</p>
														</div>
													</div>

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
														<Image src={IMAGES.notFound} width={240} height={200}/>
														<p className={"text-[22px] mt-[20px] font-bold"}>No result found</p>
													</div>
                      }

                    </div>
                  </Form>

                </div>
                {/*search*/}

                {/*buttons*/}
                <div className={"flex space-x-[30px] justify-end"}>
                  <Link href={"/cart"}>
                    <div className={"flex flex-col items-center cursor-pointer"}>
                      {/*<img src={cart?.src} alt={"shock offer icon"} className={"w-[18px]"}/>*/}
                      <Image src={ICONS.cart} alt={"shock offer icon"} width={18} height={18}/>

                      <p className={"capitalize mt-[11px] text-base leading-4"}>Basket</p>
                    </div>
                  </Link>

                  <div className={"flex flex-col items-center "}>
                    {/*<img src={heart?.src} alt={"heart icon"} className={"w-[18px]"}/>*/}
                    <Image src={ICONS.heart} alt={"heart icon"} width={18} height={18}/>
                    <p className={"capitalize mt-[11px] text-base leading-4"}>Favorites</p>
                  </div>

                  {/*<div className={"w-[130px] rounded-[12px] flex justify-center items-center h-12 bg-[#383838]"}>*/}
                  {/*  <p className={"capitalize text-base text-[#FFFFFF]"}></p>*/}
                  {/*</div>*/}

                  <Button text={"sign in"} bgColor={"#383838"} classes={""}/>

                </div>
                {/*buttons*/}
              </div>
              {/*logo*/}
              {/*search*/}

            </div>
            <div className={"w-full relative"} onMouseLeave={() => {
              setChosenCategory(null)
            }}>
              <div className={"flex container m-auto w-full h-[48px] overflow-x-auto"}>
                <div className={"flex items-center"}>
                  <Image src={ICONS.shock} alt={"shock offer icon"} width={18} height={18}/>
                  <p className={"ml-[9px] text-[#E35A43] text-base whitespace-nowrap"}>Shock offers</p>
                </div>

                {/*sub categories*/}
                <div className={"flex items-center space-x-[40px] ml-[40px]"}>
                  {
                    categories?.filter(item => item.parentCategoryId === null).map((item, index) => {
                      return <div className={"relative"} key={index} onMouseOver={() => setChosenCategory(item)}>
                        <Link href={`/category/${item.categoryId}`}>
                          <p className={"hover:text-[black] transition text-base whitespace-nowrap capitalize cursor-pointer"}
                             style={{color: item.categoryId === chosenCategory?.categoryId ? "#8338EC" : "#383838b3"}}
                          >
                            {item.categoryName}
                          </p>
                        </Link>
                        {
                            item.categoryId == (chosenCategory?.categoryId || Router.query.id) &&
														<div className={"absolute bg-purple w-full h-[2px] rounded-t-[5px] -bottom-[12px]"}/>
                        }
                      </div>
                    })
                  }
                </div>
                {/*sub categories*/}

              </div>

              {/*category hover*/}
              {chosenCategory?.categoryId && <div
									className={"absolute border-t-[1px] border-[#d9d9d94d] top-[48px] bg-[white] w-[100vw] left-0 h-[500px] z-30"}
									style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)"}}
							>
								<div className={"container m-auto grid grid-rows-1 grid-cols-4 gap-x-[30px] w-full mt-4"}>
									<div>
										<div className={"flex justify-between items-center"}>
											<p className={"font-bold text-[#383838] text-[22px] leading-[22px]"}>{chosenCategory?.categoryName}</p>
											<span className={"text-[#8338EC] text-[14px] cursor-pointer"}>{getSumOffer()}</span>
										</div>

										<div className={"flex flex-col space-y-[20px] mt-[20px]"}>

                      {
                        categories?.filter(item => item.parentCategoryId === chosenCategory?.categoryId).map((item, index) => {
                          return <div className={"flex justify-between items-center"} key={index}>
                            <Link href={"/"}>
                              <p
                                  className={"text-[#383838b3] text-base mr-2 cursor-pointer hover:text-[#8338ecb3] hover:underline decoration-1"}>{item?.categoryName}</p>
                            </Link>
                            <span className={"text-[#383838] text-[14px]"}>{item?.offersQuantity} offer</span>
                          </div>
                        })
                      }

										</div>

									</div>
									<div className={"col-span-3"}>
										<div className={"grid grid-flow-row-dense grid-cols-3 gap-[30px] gap-y-[40px]"}>
                      {
                          categoryVouchers?.length && categoryVouchers?.slice(0, 3).map((item: any, index: number) => {
                            return <OfferItem data={item} key={index}/>
                          })
                      }
										</div>
									</div>
								</div>
							</div>}
              {/*category hover*/}
            </div>

          </div>

        </header>
      </>
  )
}

export default Header;
