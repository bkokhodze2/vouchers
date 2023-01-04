import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"
import Link from "next/link";
import {Form, Input} from 'antd';
import PulseLoader from "react-spinners/PulseLoader";
import {useRouter} from "next/router";
import axios from "axios";
import useDocumentHeight from "../../UI/useDocumentHeight";
import _ from "lodash";
import offerItem from "/public/images/images/offerItem.png";
// @ts-ignore
import Lari from "/public/images/icons/lari";

interface Isearch {
  isOpenSearch: boolean
  setIsOpenSearch: any
}

const SearchDrawer = ({isOpenSearch, setIsOpenSearch}: Isearch) => {
  const baseApi = process.env.baseApi;

  const [term, setTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [findData, setFindData] = useState<[]>([]);
  const hasWindow = typeof window !== 'undefined';
  const [searchForm] = Form.useForm();
  const Router = useRouter();
  const use = useDocumentHeight();
  // useOnScreenKeyboardScrollFix();


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
    const handleScroll = () => {
      if (isOpenSearch) {
        hasWindow && window.scrollTo(0, 0)
      }
    }

    hasWindow && window.addEventListener('scroll', handleScroll)

    return () => {
      hasWindow && window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpenSearch])

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

  const resetFields = () => {
    searchForm.resetFields();
    setTerm('');
  }
  const onChange = (values: any) => {
    let data = searchForm.getFieldsValue();
    setTerm(data.search);
  }


  const onFinish = (values: any) => {
    // resetFields();
    //
    // if (term && term.trim().length !== 0) {
    //   Router.push(`/search/${values.search}`)
    // }
  };

  const SearchItem = ({data}: any) => {

    let companySlug = _.get(data, 'additionalInfo[0].provider.name', "").replaceAll(' ', '-');
    let voucherSlug = _.get(data, 'additionalInfo[0].genericTransactionTypeId', "");

    if (!data) {
      return <p className={"aveSofBold"}>erroor</p>
    }

    return <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
      <div className={"flex py-2 w-full"}>
        <div className={"w-full max-w-[166px] min-w-[166px] max-h-[102px] h-[102px] mr-3 relative"}>
          {
            <img
                src={_.get(data, 'additionalInfo[0].attachments[0].path', offerItem.src)}
                height={102}
                width={166}
                placeholder="blur"
                loading={'lazy'}
                alt={"product image"}
                className={"rounded-xl w-full max-h-[102px]"}
                style={{objectFit: "cover"}}/>
          }

          <div
              className={"absolute top-[8px] left-[8px] z-20 flex justify-center items-center bg-[#8338EC] rounded-[100px] h-[25px]"}>
            <p className={"text-[white] text-[12px] px-[12px] aveSofRegular"}>- {Math.round(_.get(data, 'additionalInfo[0].percentage', 0))} %</p>
          </div>
        </div>
        <div className={"w-full overflow-hidden flex flex-col justify-between"}>
          <h3 className={"text-[#383838] font-bold text-base font-bold aveSofBold"}>
            {getHighlightedText(_.get(data, 'additionalInfo[0].provider.name', ""), term)}
          </h3>
          <div className={"flex w-full justify-between mt-1"}>

            <p className={"text-purple text-[21px] leading-[21px] font-[500] whitespace-nowrap aveSofRegular flex"}>
              <Lari color={"#3838384d"} classes={"mr-1"}/>
              {_.get(data, 'entries[0].entryAmount', 0)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  }


  return (
      <div className={"fixed z-50 bg-[#EDEEEF] w-full"}
           style={{
             overflow: "hidden",
             transition: "all 0.3s ease-in-out 0s",
             right: isOpenSearch ? "0%" : "0%",
             top: isOpenSearch ? "calc(0% + 107px)" : "100%",
             // @ts-ignore
             height: isOpenSearch ? use - 105 : "0%"
           }}
      >

        <div className={"w-full overflow-y-scroll flex flex-col justify-between"}
             style={{
               height: "100%"
             }}
        >
          {term === "" && <div className={"h-full flex flex-col justify-end items-center"}>
            {!term && <p className={"mb-[22px] text-base font-[500] text-[#000000] aveSofMedium"}>What are you looking
							for?</p>}
            {!term && <Image
								src={IMAGES.lookingFor}
								quality={100}
								blurDataURL={IMAGES.placeholder.src}
								loading={"lazy"}
								width={258}
								height={164}
								layout={"fixed"}
								alt={"looking for"}
								className={"cursor-pointer"}
						/>
            }
					</div>}


          {
            findData.length && term !== "" && !isLoading && findData.length > 0 ?
                <div className={"flex flex-col mt-4 px-4 overflow-scroll"}
                     style={{
                       height: isOpenSearch ? use - 80 : "0%"
                     }}>
                  {findData?.map((item: any, index: number) => {
                    return <SearchItem data={item} key={index}/>
                  })}
                </div> : ""
          }

          {
              term !== "" && !isLoading && findData.length === 0 &&
							<div className={"h-full flex flex-col justify-end items-center"}>
								<div className={"w-full flex flex-col justify-end items-center h-[300px]"}>
									<p className={"mb-[22px] text-base font-[500] text-[#000000] aveSofMedium"}>No result found</p>
									<Image
											src={IMAGES.notFoundMobile}
											quality={60}
											blurDataURL={IMAGES.placeholder.src}
											placeholder="blur"
											loading={"lazy"}
											width={258}
											height={151}
									/>
								</div>
							</div>
          }
          {isLoading && <div className={"h-full flex flex-col justify-center items-center"}>
						<div className={"flex flex-col w-full justify-center items-center mt-2 h-full"}>
							<img className={"h-[300px] w-auto"} src={IMAGES.gif.src} style={{objectFit: "cover"}}
							     alt={"skeleton animation"}/>
							<div className={"flex items-end mt-10"}>
								<p className={"text-[#383838] text-[24px] aveSofMedium"}>Loading</p>
								<PulseLoader size={5} color="#383838" speedMultiplier={0.7} className={"mb-1.5 ml-1.5 "}/>
							</div>
						</div>
					</div>
          }


          {/*<div className={"h-[300px] max-h[300px] overflow-y-scroll"}>*/}
          {/*  <p>45678</p> <br/>*/}
          {/*  <p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/>*/}
          {/*  <p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/>*/}
          {/*  <p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/><p>45678</p> <br/>*/}
          {/*  <p>45678</p> <br/>*/}

          {/*</div>*/}

          <div className={"p-4 py-[6px] pl-0 bg-[white] flex"}>
            <div className={"min-w-[56px] justify-center items-center flex"} onClick={() => setIsOpenSearch(false)}>
              <Image
                  src={ICONS.prev}
                  quality={30}
                  blurDataURL={IMAGES.placeholder.src}
                  loading={"lazy"}
                  width={20}
                  height={20}
                  layout={"fixed"}
                  alt={"left arrow"}
                  className={"cursor-pointer"}
              />
            </div>
            <Form
                form={searchForm}
                name="basic"
                // initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                onChange={onChange}
                className={"flex w-full justify-start relative"}
                style={{
                  width: ""
                }}
            >

              <Form.Item
                  className={"w-full max-w-[622px] searchInput mb-0"}
                  name="search"
              >

                <Input className={"h-[44px] rounded-[8px] bg-[#D9D9D94D] border-none rounded-bl-[12px]"}
                       placeholder={"Type Here..."}/>


              </Form.Item>
              {
                  term && <div className={"absolute right-6 top-3 cursor-pointer"} onClick={(e) => {
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


            </Form>
          </div>

        </div>
      </div>
  )
}

export default SearchDrawer;
