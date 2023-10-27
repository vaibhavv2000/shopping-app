"use client";

import {product} from "@/redux/slices/productSlice";
import {useDispatch,useSelector} from "react-redux";
import styled from "styled-components";
import {useState, useEffect} from "react";
import {AppDispatch, RootState} from "@/redux/store";
import {addToBag,addToWishlist,removeFromBag,removeFromWishlist} from "@/redux/slices/userSlice";
import {API} from "@/lib/API";
import {AiFillHeart, AiOutlineHeart, AiFillStar} from "react-icons/ai";
import {ImPriceTag} from "react-icons/im";
import {toggleShowAuth} from "@/redux/slices/authSlice";

const Page = (props: any) => {
  const {id} = props.searchParams as {id: string};

  const [product, setProduct] = useState<product>();
  const [isWished, setIsWished] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const products = useSelector((state: RootState) => state.product.products);
  const {wishlist, my_orders} = useSelector((state: RootState) => state.user);
  const {isAuth, user, isDarkMode} = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
	const p = products.find((p) => String(p.id) === String(id));
	setProduct(p);
  }, [products, id]);

  useEffect(() => {
	const pro = wishlist.find((p) => String(p.id) === String(id));
	if (pro) setIsWished(true);
  }, [wishlist, id]);

  useEffect(() => {
	const pro = my_orders.find((p) => String(p.id) === String(id));
	if (pro) setIsInCart(true);
  }, [my_orders, id]);

  const addToCart = async (opt: string) => {
	if (!isAuth) return dispatch(toggleShowAuth(true));

	if (opt === "add") {
	  setIsInCart(true);
	  dispatch(addToBag({...product, quantity: 1}));
	  await API.post("/product/addorder", {
		userId: user.id,
		productId: id,
	  });
	};

	if (opt === "remove"){
	  setIsInCart(false);
	  dispatch(removeFromBag(product?.id));
	  await API.post("/product/removefromorder", {
		userId: user.id,
		productId: id,
		del: true,
	  });
	};
  };

  const addToWish = async (opt: string) => {
	if (!isAuth) return dispatch(toggleShowAuth(true));

	if (opt === "add") {
	  setIsWished(true);
	  dispatch(addToWishlist(product));
	  await API.post("/product/addtowishlist", {
		userId: user.id,
		productId: id,
	  });
	} 
	
	if (opt === "remove"){
	  setIsWished(false);
	  dispatch(removeFromWishlist(product?.id));
	  await API.post("/product/removefromwishlist", {
		userId: user.id,
		productId: id,
	  });
	}
  };

  return (
	<Main isDarkMode={isDarkMode}>
	  <Product bg={isDarkMode ? "#111" : "#fff"}>
		<Image src={product?.image} alt='' />
		  <div style={{
			display: "flex",
			justifyContent: "space-between",
			flexDirection: "column",
			flex: 1,
			padding: "10px",
		  }}>
			<Info>
			  <Header>
				<Title cl={isDarkMode ? "#fff" : "#111"}>
				  {product?.product_name}
				</Title>
				  {isWished ? (
					<AiFillHeart
					  name='heart'
					  size={27}
					  color={"red"}
					  onClick={() => addToWish("remove")}
					  cursor={"pointer"}
					/>
				  ) : (
					<AiOutlineHeart
					  name='heart'
					  size={27}
					  color={"#777"}
					  onClick={() => addToWish("add")}
					  cursor={"pointer"}
					/>
				  )}
			  </Header>
			  <RatingHolder>
			   <AiFillStar color='#5bd450' size={22} />
				<Rating cl={isDarkMode ? "#fff" : "#111"}>
					{product?.rating}
				</Rating>
			  </RatingHolder>
			  <PriceHolder>
				<ImPriceTag color='#62d645' size={18} />
				 <Price cl={isDarkMode ? "#fff" : "#111"}>{product?.price}</Price>
			  </PriceHolder>
			  <Description cl={isDarkMode ? "#fff" : "#555"}>
				{product?.description}
			  </Description>
			</Info>
			{
			  isInCart ? (<AddBtn bg={isDarkMode ? "#5555" : "#111"} onClick={() => addToCart("remove")}>
				Remove From Bag
			  </AddBtn>) : (<AddBtn bg={isDarkMode ? "#5555" : "#111"} onClick={() => addToCart("add")}>
			  Add To Bag
			</AddBtn>)
			}
	    </div>
	  </Product>
    </Main>
 );
};

export default Page;

const Main = styled.div<{isDarkMode: boolean}>`
	display: grid;
	place-items: center;
	background-color: ${({isDarkMode}) => (isDarkMode ? "#181818" : "#fff")};
	height: 100%;

	@media screen and (min-width: 670px) {
	  margin-top: ${({isDarkMode}) => (isDarkMode ? 0 : "20px")};
	  padding-top: ${({isDarkMode}) => (!isDarkMode ? 0 : "20px")};
	  height: calc(100vh - 60px);
	  padding: 15px;
	}
`;

const Product = styled.div<{bg: string}>`
	display: flex;
	flex-direction: row;
	max-width: 700px;
	background-color: ${({bg}) => bg};
	gap: 5px;
	width: 100%;

	@media screen and (max-width: 670px) {
		flex-direction: column;
		width: 100%;
	}
`;

const Image = styled.img`
	width: 350px;
	border-radius: 4px solid red;
	object-fit: cover;

	@media screen and (max-width: 670px) {
		width: 100%;
	}
`;

const Info = styled.div`
	display: flex;
	width: 350px;
	flex-direction: column;
	padding: 5px;
	width: 100%;
	gap: 8px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	padding: 5px 0;
`;

const Title = styled.h3<{cl: string}>`
	color: ${({cl}) => cl};
`;

const RatingHolder = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Rating = styled.span<{cl: string}>`
	font-weight: 400;
	font-size: 14px;
	color: ${({cl}) => cl};
`;

const PriceHolder = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const Price = styled.span<{cl: string}>`
	font-weight: 400;
	font-size: 14px;
	color: ${({cl}) => cl};
`;

const Description = styled.p<{cl: string}>`
	color: ${({cl}) => cl};
`;

const AddBtn = styled.button<{bg: string}>`
	background-color: ${({bg}) => bg};
	border: none;
	outline: none;
	border-radius: 5px;
	color: #fff;
	padding: 12px 22px;
	cursor: pointer;
	margin: 20px 20px;
	font-weight: 600;
`;
