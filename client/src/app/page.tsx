"use client";

import type {NextPage} from "next";
import styled from "styled-components";
import {useRouter} from "next/navigation";
import {AppDispatch} from "@/redux/store";
import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {login, toggleDarkMode} from "@/redux/slices/authSlice";

const AppPage: NextPage = () => {
 const [currentSlide, setCurrentSlide] = useState<number>(0);
 const [dir, setDir] = useState<"left" | "right">("right");

 const {push} = useRouter();

 useEffect(() => {
  const timer = setInterval(() => {
   if (dir === "right") setCurrentSlide(currentSlide + 1);
   if (dir === "left") setCurrentSlide(currentSlide - 1);
  }, 4000);

  if (currentSlide > 1) setDir("left");
  if (currentSlide < 1) setDir("right");

  return () => clearInterval(timer);
 }, [currentSlide, dir]);

 useEffect(() => {
  document.title = "Welcome";
 }, []);

 const dispatch: AppDispatch = useDispatch();

 useEffect(() => {
  function checkAuth() {
   const user = localStorage.getItem("shopping-user");
   if (user) dispatch(login(JSON.parse(user)));
   const darkMode = localStorage.getItem("shopping-darkmode");
   if (darkMode) dispatch(toggleDarkMode("yes")); 
  };

  checkAuth();
 }, []);

 return (
  <Main>
   <Left>
	<Slider y={-currentSlide * 33.33}>
	{imageList().map((item, index) => (
	 <Image
	  src={item} alt={``} 
	  key={String(`Img${index}`)}
	 />
	))}
	</Slider>
   </Left>
   <Right>
	<div>
	 <Title>Your One Stop Shopping Center</Title>
	 <Btn show={true} onClick={() => push("/home")}>Explore Now</Btn>
	</div>
   </Right>
   <Btn show={false} onClick={() => push("/home")}>Explore Now</Btn>
  </Main>
  );
};

export default AppPage;

const Main = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
`;

const Left = styled.div`
    flex: 1;
	height: 100%;
	overflow: hidden;
`;

const Slider = styled.div<{y: number}>`
    height: max-content;
	width: 100%;
	display: flex;
	flex-direction: column;
	transition: all 1s ease-in-out;
	transform: ${({y}) =>`translateY(${y}%)`};
`;

const Image = styled.img`
    height: 100vh;
	object-fit: cover;
	width: 100%;
`;

const Right = styled.div`
    flex: 1;
    background-color: #111;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 960px) {
		display: none;
	}
`;

const Title = styled.p`
	color: #fff;
	text-align: center;
	margin-bottom: 20px;
	font-size: 57px;
	font-family: "Castoro Titling", cursive;

	@media screen and (max-width: 680px) {
	  font-size: 30px;
	}

	@media screen and (min-width: 950px) and (max-width: 1070px) {
		font-size: 40px;
	}
`;

const Btn = styled.button<{show?: boolean}>`
	background-color: #E3AD8B;
	border: 3px solid #363636;
	border-radius: 4px;
	padding: 12px 25px;
	outline: none;
	box-shadow: 4px 4px 0 #111;
	display: block;
	margin: auto;
	transition: all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	cursor: pointer;
	font-size: 16px;
	font-weight: 500;
	letter-spacing: 3px;

	:hover {
	  color: #111;
	  background-color: #fff;
	}

	@media screen and (max-width: 960px) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@media screen and (min-width: 960px) {
		display: ${({show}) => show ? "block" : "none"};
	}
`;

function imageList() {
 return [
  "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://plus.unsplash.com/premium_photo-1672883551968-dd15ceb7f802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
 ];
};