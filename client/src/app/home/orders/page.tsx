"use client";

import NotAuth from "@/app/components/NotAuth";
import {API} from "@/lib/API";
import {addToHistory, changeQuantity, emptyBag,removeFromBag} from "@/redux/slices/userSlice";
import {AppDispatch, RootState} from "@/redux/store";
import {useState, useEffect} from "react";
import {ImPriceTag} from "react-icons/im";
import {IoMdStar} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {GoPlus} from "react-icons/go";
import {HiMinus} from "react-icons/hi2";
import styled from "styled-components";
import Link from "next/link";

const OrdersPage = (): JSX.Element => {
 const [totalPrice, setTotalPrice] = useState<number>(0);
 const {my_orders} = useSelector((state: RootState) => state.user);
 const {isAuth, user, isDarkMode} = useSelector((state: RootState) => state.auth);

 const dispatch: AppDispatch = useDispatch();

 const removeFromOrder = async (id: number) => {
  dispatch(removeFromBag((id)));
  await API.post("/product/removefromorder", {
	userId: user.id,
	productId: id,
	del: true,
  });
 };

 useEffect(() => {
	document.title = `My orders`;
 }, []);

 useEffect(() => {
  let total = 0;

  for(let i of my_orders) {
   const p = i.quantity * i.price;
   total += p;
  };

  setTotalPrice(total);
 }, [my_orders]);

 const changeProductQuantity = async (id: number, opt: "incr" | "decr", pId: number) => {
  const data = {opt, id};

  try {
   if(opt === "incr") {
    dispatch(changeQuantity(data));
	 
    await API.post("/product/addorder",{
	  productId: id, 
	  userId: user.id, 
	  incr: true
	});
   };
	 
   if(opt === "decr") {
    dispatch(changeQuantity(data));
	 
    await API.post("/product/addorder",{
	  productId: id, 
	  userId: user.id, 
	  decr: true
    });
   };
  } catch (error) {
	console.log(error);
  };
 };

 const checkout = async () => {
  try {
	const res = await API.post("/product/confirmorder", {userId: user.id});
	const data = await res.data;
	dispatch(addToHistory(my_orders));
	dispatch(emptyBag());
	setTotalPrice(0);
  } catch (error) {
	console.log(error);
  };
 };

 if (!isAuth) return <NotAuth />;

 if (my_orders.length < 1) return <NotAuth title='Empty Bag' />;

 return (
  <Main isDarkMode={isDarkMode}>
   <ProductBox>
	<Top>
	 <Header>
	  <HeadTitle cl={isDarkMode ? "#fff" : "#111"}>Your Orders</HeadTitle>
	 </Header>
	 <OrderDetails>
	  <Checkout>
	   <TotalPriceHolder>
	    <PriceTitle cl={isDarkMode ? "#fff" : "#111"}>Total Price</PriceTitle>
	    <TotalPrice cl={isDarkMode ? "#fff" : "#111"}>{totalPrice}</TotalPrice>
	   </TotalPriceHolder>
	   <CheckoutBtn bg={isDarkMode ? "#222" : "#111"} onClick={checkout}>
		Checkout
	   </CheckoutBtn>
	  </Checkout>
	 </OrderDetails>	
	</Top>
	<Products>
	 {my_orders.map((p) => (
	  <Product
	   bg={isDarkMode ? "#111" : "#fff"}
	   key={String(Math.random())}>
	    <Image src={p.image} alt='' />
	    <Info>
		 <Link href={{pathname: "/home/singleproduct",query: {id: p.id}}}>
		  <Title cl={isDarkMode ? "#fff" : "#111"}>
		   {p.product_name}
		  </Title>
	     </Link>
		 <Description cl={isDarkMode ? "#999" : "#444"}>
		   {p.description.slice(0, 100)}...
		 </Description>
		 <PriceHolder>
		   <ImPriceTag size={18} color={isDarkMode ? "#fff" : "#555"} />
		   <Price cl={isDarkMode ? "#fff" : "#555"}>{p.price}</Price>
		 </PriceHolder>
		 <RatingHolder>
		   <IoMdStar size={24} color={isDarkMode ? "#fff" : "#555"} />
		   <Rating cl={isDarkMode ? "#fff" : "#222"}>{p.rating}</Rating>
		 </RatingHolder>
		 <QuantityHolder>
		  <QuantityOpt 
		   bg={isDarkMode ? "dodgerblue" : "#1E90FF"} 
		   onClick={() => changeProductQuantity(p.id, "decr", p)}
		  >
			<HiMinus size={20} color='#fff' />
		  </QuantityOpt>
		  <Quantity cl={isDarkMode ? "#fff" : "#111"}>
			{p.quantity}
		  </Quantity>
		  <QuantityOpt 
		   bg={isDarkMode ? "dodgerblue" : "#1E90FF"} 
		   onClick={() => changeProductQuantity(p.id, "incr", p)}
		   >
			<GoPlus size={20} color='#fff' />
		  </QuantityOpt>
		 </QuantityHolder>
		 <RemoveProduct>
		  <RemoveBtn
			bg={isDarkMode ? "#181818" : "dodgerblue"}
			onClick={() => removeFromOrder(p.id)}>
			Remove From cart
		  </RemoveBtn>
		 </RemoveProduct>
		</Info>
	  </Product>
	 ))}
	</Products>
   </ProductBox>
  </Main>
 );
};

export default OrdersPage;

const Main = styled.div<{isDarkMode: boolean}>`
	display: flex;
	justify-content: center;
	margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
	padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
	min-height: calc(100vh - 60px);
	background-color: ${({isDarkMode}) => (isDarkMode ? "#181818" : "#fff")};
`;

const ProductBox = styled.div`
	max-width: 800px;
	height: 50px;
	position: relative;
	padding-bottom: 70px;
	width: 100%;
	height: max-content;
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
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
	gap: 15px;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Product = styled.div<{bg: string}>`
	display: flex;
	flex-direction: column;
	box-shadow: 2px 5px 5px #11111115;
	gap: 10px;
	background-color: ${({bg}) => bg};
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
	gap: 10px;
	padding: 10px 5px;
`;

const Title = styled.h3<{cl: string}>`
	color: ${({cl}) => cl};
	cursor: pointer;
	height: 70px;
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
	font-weight: 500;
	font-size: 14px;
`;

const RemoveProduct = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const RemoveBtn = styled.button<{bg: string}>`
	background-color: ${({bg}) => bg};
	color: #fff;
	padding: 12px 22px;
	border: none;
	outline: none;
	border-radius: 2px;
	font-weight: 500;
	box-shadow: 2px 5px 5px #00000029;
	cursor: pointer;
`;

const QuantityHolder = styled.div`
	display: flex;
	gap: 10px;
	margin: 5px 0;
	align-items: center;
`;

const Quantity = styled.span<{cl: string}>`
	font-weight: 500;
	font-size: 16px;
	color: ${({cl}) => cl};
`;

const QuantityOpt = styled.div<{bg: string}>`
	background-color: ${({bg}) => bg};
	display: grid;
	place-items: center;
	height: 30px;
	width: 30px;
	cursor: pointer;
`;

const OrderDetails = styled.div`
`;

const Checkout = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 15px;
`;

const TotalPriceHolder = styled.div`
   display: flex;
   justify-content: space-between;
   flex-direction: column;
   align-items: flex-end;
   gap: 5px;
`;

const PriceTitle = styled.span<{cl: string}>`
  	color: ${({cl}) => cl};
	font-size: 14px;
	font-weight: 500;
`;

const TotalPrice = styled.h2<{cl: string}>`
	color: ${({cl}) => cl};
	font-size: 24px;
	font-weight: 500;
`;

const CheckoutBtn = styled.button<{bg: string}>`
	background-color: ${({bg}) => bg};
	color: #fff;
	padding: 13px 25px;
	font-weight: 500;
	border: none;
	outline: none;
	font-size: 14px;
	cursor: pointer;
	width: 180px;
	flex: 1;
	border-radius: 5px;
`;
