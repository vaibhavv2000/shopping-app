"use client";

import {product} from "@/redux/slices/productSlice";
import {RootState} from "@/redux/store";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import Filter from "./Filter";
import {IoIosFunnel, IoMdStar} from "react-icons/io";
import styled from "styled-components";
import {ImPriceTag} from "react-icons/im";
import Link from "next/link";

const ProductsPage = (data: any): JSX.Element => {
 const [products, setProducts] = useState<product[]>([]);
 const [title, setTitle] = useState<string>("");
 const [list, setList] = useState<product[]>([]);

 const [rating, setRating] = useState<number>(0);
 const [order, setOrder] = useState<string>("");
 const [showFilter, setShowFilter] = useState<boolean>(false);

 const {type} = data.searchParams as {type: string};

 const allProducts = useSelector((state: RootState) => state.product.products);

 const {isDarkMode} = useSelector((state: RootState) => state.auth);

 useEffect(() => {
  const filter = [...allProducts].filter((p) => p.type === type);

  setProducts(filter);
  setList(filter);
 }, [allProducts, type]);

 useEffect(() => {
  if (type === "watch") setTitle("Watches For you");
  if (type === "clothes") setTitle("Clothes");
  if (type === "mobile") setTitle("Mobiles For you");
 }, [type]);

 useEffect(() => {
  if (order === "Ascending") {
   setProducts((p) => [...p.sort((a, b) => a.price - b.price)]);
  };
  if (order === "Descending") {
   setProducts((p) => [...p.sort((a, b) => b.price - a.price)]);
  };
 }, [order]);

 useEffect(() => {
  const filter = [...list].filter((p) => p.rating >= rating);
  setProducts(filter);
 }, [rating, list]);

 useEffect(() => {
   document.title = `Products - ${type}`;
 }, [type]);

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	<div>
	{showFilter && (
	 <Filter
	   order={order}
	   rating={rating}
	   setOrder={setOrder}
	   setRating={setRating}
	   setShowFilter={setShowFilter}
	  />
	)}
	 <div>
	  <Header>
	   <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>{title}</HeadTitle>
		<IoIosFunnel
		 name='filter'
		 color={"#d5d5d5"}
		 size={24}
		 style={{cursor: "pointer"}}
		 onClick={() => setShowFilter(true)}
		/>
	  </Header>
	  <Products>
	  {products.map((item) => (
	    <Link
		 key={String(Math.random())}
		 href={{pathname: "/home/singleproduct",query: {id: item.id}}}>
		  <Product bg={isDarkMode ? "#111" : "#f4f4f4"}>
		   <Image src={item.image} alt='' />
			<Info>
			 <Title cl={isDarkMode ? "#fff" : "#111"}>
				{item.product_name}
			 </Title>
			 <div style={{height : "100px", display:"flex", flexDirection:"column", gap:"10px"  }}>
			  <Description cl={isDarkMode ? "#fff" : "#444"}>
				{item.description.slice(0, 100)}...
			  </Description>
			  <PriceHolder>
			   <ImPriceTag
				size={16}
				color={isDarkMode ? "#fff" : "#585858"}
			   />
			   <Price cl={isDarkMode ? "#fff" : "#555"}>
				 {item.price}
			   </Price>
			  </PriceHolder>
			  <RatingHolder>
			   <IoMdStar
				size={22}
				color={isDarkMode ? "#e8e8e8" : "#4b4b4b"}
			   />
			   <Rating cl={isDarkMode ? "#e8e8e8" : "#222"}>
				{item.rating}
			   </Rating>
			  </RatingHolder>
			 </div>
			 <div>
			  <TypeHolder>
			   <Type>{item.type}</Type>
			  </TypeHolder>
			 </div>
			</Info>
		   </Product>
		  </Link>
		))}
	   </Products>
	  </div>
	 </div>
    </ProductBox>
  </Main>
 );
};

export default ProductsPage;

const Main = styled.div<{isDarkMode: boolean}>`
	display: flex;
	margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
	padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
	background-color: ${({isDarkMode}) => isDarkMode ? "#181818" : "#fff"};
	justify-content: center;
	min-height: calc(100vh - 60px);
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
	color: ${({cl}) => cl};
`;

const Products = styled.div`
	display: grid;
	padding: 10px;
	gap: 20px;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Product = styled.div<{bg: string}>`
	display: flex;
	flex-direction: column;
	min-height: 380px;
	gap: 10px;
	border-radius: 5px;
	background-color: ${({bg}) => bg};
`;

const Image = styled.img`
	height: 200px;
	object-fit: cover;
	border-radius: 5px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	height: 250px;
	padding: 0 5px;
`;

const Title = styled.h3<{cl: string}>`
	color: ${({cl}) => cl};
	font-weight: 500;
	font-size: 18px;
	height: 60px;
`;

const Description = styled.p<{cl: string}>`
	color: ${({cl}) => cl};
	font-size: 14px;
`;

const PriceHolder = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Price = styled.span<{cl: string}>`
	color: ${({cl}) => cl};
	font-weight: 600;
	font-size: 14px;
`;

const RatingHolder = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	margin: -5px 0px;
`;

const Rating = styled.span<{cl: string}>`
	color: ${({cl}) => cl};
	font-size: 14px;
	font-weight: 600;
`;

const TypeHolder = styled.div`
	background-color: #f0acac;
	border-radius: 30px;
	padding: 4px 8px;
	width: max-content;
`;

const Type = styled.span`
	color: #ca1c1c;
	font-weight: 700;
	font-size: 12px;
`;
