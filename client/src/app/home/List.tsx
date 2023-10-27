"use client";

import {product} from "@/redux/slices/productSlice";
import {RootState} from "@/redux/store";
import Link from "next/link";
import {memo} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

interface props {
  title: string;
  bg?: string;
  products: product[];
};

const List = (props: props): JSX.Element => {
 const {title, bg = "#fff", products} = props;
 const {isDarkMode} = useSelector((state: RootState) => state.auth);

 return (
  <ListHolder bg={isDarkMode ? "#181818" : bg}>
   <ListTitle cl={isDarkMode ? "#ececec" : "#454040"}>{title}</ListTitle>
	<Items>
	{products.map((p) => (
	 <Link
	  key={Math.random()}
	  href={{pathname: "/home/products",query: {type: p.type}}}
	  style={{height: "200px", width: "100%"}}>
	  <Item src={p.image} />
	 </Link>
	))}
	</Items>
   </ListHolder>
  );
};

export default memo(List);

const ListHolder = styled.div<{bg: string}>`
  background-color: ${({bg}) => bg};
  padding: 6px;
  margin-bottom: 10px;
`;

const ListTitle = styled.h1<{cl: string}>`
  font-size: 22px;
  margin: 0 0 15px 0;
  font-weight: 500;
  color: ${({cl}) => cl};
`;

const Items = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const Item = styled.img`
  object-fit: cover;
  height: 100%;
  border: 10px;
  border-radius: 7px;
  width: 100%;

  &:hover {
	opacity: 0.6;
  }
`;
