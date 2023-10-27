"use client";

import styled from "styled-components";
import {AppDispatch, RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {MdSunny, MdNightlight} from "react-icons/md";
import {HiOutlineBars3} from "react-icons/hi2";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {toggleDarkMode, toggleNav} from "@/redux/slices/authSlice";
import {useRouter} from "next/navigation";

const Navbar = (): JSX.Element => {
 const {isDarkMode} = useSelector((state: RootState) => state.auth);
 const {push} = useRouter();
 const dispatch: AppDispatch = useDispatch();
  
 const changeDarkMode = () => {
  if (isDarkMode) {
   dispatch(toggleDarkMode("no"));
   localStorage.removeItem("shopping-darkmode");
  } else {
   dispatch(toggleDarkMode("yes"));
   localStorage.setItem("shopping-darkmode", "yes");
  }
 };

 return (
  <Nav isDarkMode={isDarkMode}>
   <Left>
	<HiOutlineBars3
	 size={28}
	 color={!isDarkMode ? "#111" : "#fff"}
	 style={{cursor: "pointer"}}
	 onClick={() => dispatch(toggleNav())}
	/>
	<Logo isDarkMode={isDarkMode} onClick={() => push("/home")}>ShopCart</Logo>
   </Left>
   <Right>
	<div>
	 <AiOutlineShoppingCart
	  size={32}
	  cursor={"pointer"}
	  color={!isDarkMode ? "#111" : "#fff"}
	  onClick={() => push("/home/orders")}
	 />
	</div>
	<DarkMode onClick={changeDarkMode}>
	 {isDarkMode ? (<MdSunny size={27} color={"gold"} />) : (<MdNightlight size={27} color={"gold"} />)}
	</DarkMode>
   </Right>
  </Nav>
 );
};

export default Navbar;

const Nav = styled.nav<{isDarkMode: boolean}>`
	background-color: ${({isDarkMode}) => (isDarkMode ? "#111" : "#fff")};
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 4px 8px #e5e5e5;
`;

const Logo = styled.h1<{isDarkMode: boolean}>`
	color: ${({isDarkMode}) => (!isDarkMode ? "#111" : "#fff")};
	font-weight: 500;
	font-size: 24px;
	cursor: pointer;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 0 10px;

	@media screen and (min-width: 670px) {
	  gap: 20px;
	  padding: 0 20px;
	}
`;

const DarkMode = styled.div`
	padding: 5px;
	cursor: pointer;
	height: 40px;
	width: 40px;
	display: grid;
	place-items: center;
	border-radius: 100%;
	background-color: transparent;
`;
