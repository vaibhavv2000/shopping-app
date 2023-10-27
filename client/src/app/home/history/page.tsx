"use client";

import NotAuth from "@/app/components/NotAuth";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {IoMdStar} from "react-icons/io";
import {MdOutlineProductionQuantityLimits} from "react-icons/md";
import {ImPriceTag} from "react-icons/im";
import Link from "next/link";
import { useEffect } from "react";

const HistoryPage = (): JSX.Element => {
 const {order_history} = useSelector((state: RootState) => state.user);
 const {isAuth, isDarkMode} = useSelector((state: RootState) => state.auth);

 useEffect(() => {
	document.title = `Order history`;
 }, []);

 if (!isAuth) return <NotAuth />;

 if (order_history.length < 1) return <NotAuth title='No Order History' />;

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	<Header>
	 <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>My Order History</HeadTitle>
	</Header>
	<Products>
	 {order_history.map((p) => (
	  <Product
		bg={isDarkMode ? "#111" : "#fff"}
		key={String(Math.random())}>
	  <Link href={{pathname: "/home/singleproduct",query: {id: p.id}}}>
	   <Top>
		<Image src={p.image} alt='' />
	   </Top>
	   <Info>
		<Title cl={isDarkMode ? "#fff" : "#111"}>
		  {p.product_name}
		</Title>
		<QuantityHolder>
		 {/* <QuantityTitle style={{color: "#fff"}}>Quantity</QuantityTitle> */}
		 <MdOutlineProductionQuantityLimits size={18} color={isDarkMode ? "#fff" : "#111"} />
		 <Quantity cl={isDarkMode ? "#fff" : "#555"}>{p.quantity}</Quantity>
		</QuantityHolder>
		<PriceHolder>
		 <ImPriceTag size={16} color={isDarkMode ? "#fff" : "#111"} />
		 <Price cl={isDarkMode ? "#fff" : "#555"}>{p.price}</Price>
		</PriceHolder>
		<RatingHolder>
		 <IoMdStar size={22} color={isDarkMode ? "#fff" : "#111"} />
		 <Rating cl={isDarkMode ? "#fff" : "#222"}>{p.rating}</Rating>
		</RatingHolder>
		 <Description cl={isDarkMode ? "#999" : "#444"}>
		 {p.description.slice(0, 100)}...
		</Description>
	   </Info>
	  </Link>
	  </Product>
	 ))}
	</Products>
   </ProductBox>
  </Main>
 );
};

export default HistoryPage;

const Main = styled.div<{isDarkMode: boolean}>`
  display: flex;
  margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
  padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
  min-height: calc(100vh - 60px);
  justify-content: center;
  background-color: ${({isDarkMode}) => (isDarkMode ? "#181818" : "#fff")};
`;

const ProductBox = styled.div`
	max-width: 800px;
	height: 50px;
	width: 100%;
	height: max-content;
`;

const Header = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	padding: 7px 10px;
`;

const HeadTitle = styled.h2<{cl: string}>`
	font-size: 22px;
	font-weight: 500;
	color: ${({cl}) => cl};
`;

const Products = styled.div`
	display: grid;
	padding: 10px;
	gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Product = styled.div<{bg: string}>`
	display: flex;
	flex-direction: column;
	gap: 10px;
	border-radius: 4px;
	box-shadow: 3px 3px 5px #00000020;
	cursor: pointer;
	background-color: ${({bg}) => bg};

	:hover {
	  opacity: 0.7;
    }
`;

const Top = styled.div`
	position: relative;
`;

const Image = styled.img`
	height: 250px;
	object-fit: cover;
	border-radius: 5px;
	width: 100%;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 5px;
`;

const Title = styled.h3<{cl: string}>`
	color: ${({cl}) => cl};
	cursor: pointer;
`;

const QuantityHolder = styled.div`
    display: flex; 
	align-items: center; 
	gap: 10px;
`;

const QuantityTitle = styled.span``;

const Quantity =  styled.span<{cl: string}>`
    color: ${({cl}) => cl};
	font-weight: 500;
	font-size: 12px;
`;

const Description = styled.p<{cl: string}>`
	color: ${({cl}) => cl};
	font-size: 16px;
`;

const PriceHolder = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Price = styled.span<{cl: string}>`
	color: ${({cl}) => cl};
	font-weight: 500;
	font-size: 12px;
`;

const RatingHolder = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin: -5px 0px;
`;

const Rating = styled.span<{cl: string}>`
	color: ${({cl}) => cl};
	font-weight: 500;
	font-size: 12px;
`;
