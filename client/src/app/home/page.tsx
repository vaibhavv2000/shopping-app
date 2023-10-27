"use client";

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import styled from "styled-components";
import {useState, useEffect} from "react";
import {addProducts, product} from "@/redux/slices/productSlice";
import List from "./List";
import {API} from "@/lib/API";

const HomePage = (): JSX.Element => {
 const [randomProducts, setRandomProducts] = useState<product[]>([]);
 const [watches, setWatches] = useState<product[]>([]);
 const [mobiles, setMobiles] = useState<product[]>([]);
 const [clothes, setClothes] = useState<product[]>([]);

 const {products} = useSelector((state: RootState) => state.product);
 const auth = useSelector((state: RootState) => state.auth);
 const {isDarkMode} = auth;

 const dispatch: AppDispatch = useDispatch();

 useEffect(() => {
	document.title = `Home`;
 }, []);

 useEffect(() => {
  async function getProducts() {
   const res = await API.get("/product/fetchproducts");
   const data = await res.data;
   dispatch(addProducts(data));
  };

  getProducts();
 }, []);

 useEffect(() => {
  const list = [...products];
  const random = list.sort((a, b) => Math.random() - 0.5).slice(0, 4);
  setRandomProducts(random);
 }, [products]);

 useEffect(() => {
  const list = [...products];

  const pro = (type: "watch" | "clothes" | "mobile") => {
	return list
		.filter((m) => m.type === type).sort((a, b) => Math.random() - 0.5).slice(0, 4);
  };

  const w = pro("watch");
  const c = pro("clothes");
  const m = pro("mobile");

  if (mobiles.length < 1) {
   setWatches(w);
   setClothes(c);
   setMobiles(m);
  };
 }, [products]);

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	 <List
	  title='Recommended For you'
	  key={Math.random()}
	  products={[...randomProducts]}
	 />
	 <List
	  title='Brand New Watches'
	  key={Math.random()}
	  products={watches}
	 />
	 <List title='Clothes For you' key={Math.random()} products={clothes} />
	 <List
	  title='Mobiles & Accessories'
	  key={Math.random()}
	  products={mobiles}
	 />
   </ProductBox>
  </Main>
 );
};

export default HomePage;

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
