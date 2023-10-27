"use client";

import {AppDispatch, RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {MdAccountCircle} from "react-icons/md";
import styled from "styled-components";
import {BiStoreAlt, BiBell} from "react-icons/bi";
import {RiAccountCircleLine, RiCoupon2Line} from "react-icons/ri";
import {ImHistory} from "react-icons/im";
import {
	AiOutlineHeart,
	AiOutlineShoppingCart,
	AiOutlineLogin,
	AiOutlineHome,
} from "react-icons/ai";
import {IoArrowBackOutline} from "react-icons/io5";
import {logout, toggleNav, toggleShowAuth} from "@/redux/slices/authSlice";
import {useRouter} from "next/navigation";

var size = 25;

const Sidebar = (): JSX.Element => {
	const auth = useSelector((state: RootState) => state.auth);

	const {user, isAuth, isDarkMode, isNavOpen} = auth;

	const {push} = useRouter();

	const dispatch: AppDispatch = useDispatch();

	return (
		<Nav style={{left: isNavOpen ? "0px" : "-300px"}} dm={isDarkMode}>
			<UserInfo dm={isDarkMode}>
				<div className='profile-holder'>
					<MdAccountCircle size={50} color={"#fff"} />
					<IoArrowBackOutline
						size={23}
						color='#fff'
						style={{cursor: "pointer"}}
						onClick={() => dispatch(toggleNav())}
					/>
				</div>
				<UserTitle>Hello, {isAuth ? user.name : "Guest"}</UserTitle>
			</UserInfo>
			<NavList>
				<ListItem dm={isDarkMode} onClick={() => push("/home")}>
					<AiOutlineHome size={size} color={!isDarkMode ? "#111" : "#fff"} />
					<span>Home</span>
				</ListItem>
				<ListItem dm={isDarkMode} onClick={() => push("/home/wishlist")}>
					<AiOutlineHeart size={size} color={isDarkMode ? "#fff" : "#111"} />
					<span>Wishlist</span>
				</ListItem>
				<ListItem dm={isDarkMode} onClick={() => push("/home/orders")}>
					<AiOutlineShoppingCart
						size={26}
						color={isDarkMode ? "#fff" : "#111"}
					/>
					<span>My Orders</span>
				</ListItem>
				<ListItem dm={isDarkMode} onClick={() => push("/home/history")}>
					<ImHistory size={size} color={isDarkMode ? "#fff" : "#111"} />
					<span>Order History</span>
				</ListItem>
				<ListItem dm={isDarkMode}>
					<RiAccountCircleLine
						size={size}
						color={isDarkMode ? "#fff" : "#111"}
					/>
					<span>My Account</span>
				</ListItem>
				<ListItem dm={isDarkMode}>
					<BiStoreAlt size={size} color={isDarkMode ? "#fff" : "#111"} />
					<span>Trending Stores</span>
					<span className='new'>NEW</span>
				</ListItem>
				<ListItem dm={isDarkMode}>
					<BiBell size={size} color={isDarkMode ? "#fff" : "#111"} />
					<span>Notifications</span>
				</ListItem>
				<ListItem dm={isDarkMode}>
					<RiCoupon2Line size={size} color={isDarkMode ? "#fff" : "#111"} />
					<span>Coupon</span>
				</ListItem>
				{isAuth ? (
					<ListItem
						dm={isDarkMode}
						onClick={() => {
							localStorage.removeItem("shopping-user");
							dispatch(logout());
						}}>
						<AiOutlineLogin size={size} color={isDarkMode ? "#fff" : "#111"} />
						<span>Logout</span>
					</ListItem>
				) : (
					<ListItem
						dm={isDarkMode}
						onClick={() => dispatch(toggleShowAuth(true))}>
						<AiOutlineLogin size={size} color={isDarkMode ? "#fff" : "#111"} />
						<span>Login</span>
					</ListItem>
				)}
			</NavList>
		</Nav>
	);
};

export default Sidebar;

const Nav = styled.nav<{dm: boolean}>`
	width: 270px;
	background-color: ${({dm}) => (dm ? "#151515" : "#fff")};
	position: fixed;
	top: 0;
	box-shadow: 0px 0px 2px #f6f5f5;
	left: -300px;
	height: 100vh;
	z-index: 9999999999;
	transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const NavList = styled.section`
	display: flex;
	flex-direction: column;
`;

const UserInfo = styled.div<{dm: boolean}>`
	display: flex;
	padding: 20px 10px 10px 10px;
	background-color: ${({dm}) => (dm ? "#111" : "dodgerblue")};
	gap: 17px;
	flex-direction: column;

	.profile-holder {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
`;

const UserTitle = styled.p`
	font-weight: 400;
	color: #fff;
	font-size: 20px;
`;

const ListItem = styled.div<{dm: boolean}>`
	display: flex;
	align-items: center;
	padding: 10px;
	gap: 13px;
	margin: 3px 0;
	transition: all 0.4s ease-in-out;
	cursor: pointer;

	:hover {
		background-color: ${({dm}) =>
			!dm ? "rgba(0, 0, 0, 0.04111111)" : "rgba(255, 255, 255, 0.0811111111)"};
	}

	span {
		font-weight: 400;
		font-size: 15px;
		color: ${({dm}) => (dm ? "#fff" : "#111")};
	}

	.new {
		background-color: red;
		padding: 2px 4px;
		font-size: 12px;
		color: #fff;
	}
`;
