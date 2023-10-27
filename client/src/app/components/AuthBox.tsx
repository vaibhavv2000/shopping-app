"use client";

import {AppDispatch, RootState} from "@/redux/store";
import {useState, ChangeEvent, FormEvent, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {login as login_user, toggleShowAuth} from "@/redux/slices/authSlice";
import {sm} from "@/lib/responsive";
import {API} from "@/lib/API";
import {HiXMark} from "react-icons/hi2";

const AuthBox = (): JSX.Element => {
 const [aOpt, setAOpt] = useState<"left" | "right">("left");
 const [register, setRegister] = useState({
	name: "",
	email: "",
	password: "",
 });
 const [login, setLogin] = useState({
	email: "",
	password: "",
 });
 const [loginError, setLoginError] = useState<string>("");
 const [registerError, setRegisterError] = useState<string>("");

 const dispatch: AppDispatch = useDispatch();

 const {showAuth, isDarkMode} = useSelector((state: RootState) => state.auth);

 useEffect(() => {
  if (loginError) setTimeout(() => setLoginError(""), 5000);
	if (registerError) setTimeout(() => setRegisterError(""), 5000);
 }, [loginError, registerError]);

 const AuthOpts = (opt: string) => {
  if (opt === "left") setAOpt("left");
  else setAOpt("right");
 };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
   if (aOpt === "left") {
	const {email, name, password} = register;

	if (email && name && password) {
	 const res = await API.post(`/auth/register`, register);
	 localStorage.setItem("shopping-user", JSON.stringify(res.data.user));

	 dispatch(login_user(res.data.user));
	 setTimeout(() => {
	  dispatch(toggleShowAuth(false));
	 }, 2000);
	}
   } else {
	 const {email, password} = login;

	 if (email && password) {
	  const res = await API.post(`/auth/login`, login);
	  localStorage.setItem("shopping-user", JSON.stringify(res.data.user));

	  dispatch(login_user(res.data.user));
	  setTimeout(() => {
	   dispatch(toggleShowAuth(false));
	  }, 2000);
	 }
	}
  } catch (error: any) {
	 if (aOpt === "left") setRegisterError(error.response.data.error);
	 else setLoginError(error.response.data.error);
	}
 };

 if (!showAuth) return <div></div>;

 return (
  <Main>
   <Box bg={isDarkMode ? "black" : "#fff"}>
	<div style={{display: "flex", alignItems: "center"}}>
	 <HeaderTitle cl={isDarkMode ? "#fff" : "#111"}>Auth</HeaderTitle>
	  <HiXMark
		size={28}
		color={isDarkMode ? "#fff" : "#111"}
		style={{cursor: "pointer"}}
		onClick={() => dispatch(toggleShowAuth(false))}
	  />
	</div>
	<AuthOptions dm={isDarkMode}>
	 <AuthTitle
	   cl={isDarkMode ? "#fff" : "#111"}
	   onClick={() => AuthOpts("left")}>
	   Register
	 </AuthTitle>
	 <AuthTitle
	   cl={isDarkMode ? "#fff" : "#111"}
	   onClick={() => AuthOpts("right")}>
	   Login
	 </AuthTitle>
	 <AuthSlider dm={isDarkMode} opt={aOpt}></AuthSlider>
	</AuthOptions>
	<div style={{width: "300px", overflowX: "hidden"}}>
	 <AuthOpt opt={aOpt}>
	  <Register onSubmit={handleSubmit}>
	   <Input
		 placeholder='Name'
		 name='name'
		 dm={isDarkMode}
		 onChange={(e: ChangeEvent<HTMLInputElement>) =>
		  setRegister((p) => ({...p, [e.target.name]: e.target.value}))
		 }
	   />
	   <Input
		 dm={isDarkMode}
		 placeholder='Email'
		 name='email'
		 onChange={(e: ChangeEvent<HTMLInputElement>) =>
		   setRegister((p) => ({...p,[e.target.name]: e.target.value,}))
		 }
	   />
	   <Input
		placeholder='Password'
		type='password'
		dm={isDarkMode}
		name='password'
		onChange={(e: ChangeEvent<HTMLInputElement>) =>
		 setRegister((p) => ({...p,[e.target.name]: e.target.value,}))
		}
	   />
	   {registerError && <ErrorShow>{registerError}</ErrorShow>}
	   <Button bg={isDarkMode}>Register</Button>
	  </Register>
	  <Login onSubmit={handleSubmit}>
	   <Input
		placeholder='Email'
		name='email'
		dm={isDarkMode}
		onChange={(e: ChangeEvent<HTMLInputElement>) =>
		 setLogin((p) => ({...p, [e.target.name]: e.target.value,}))
		}
	   />
	   <Input
		dm={isDarkMode}
		placeholder='Password'
		type='password'
		name='password'
		onChange={(e: ChangeEvent<HTMLInputElement>) =>
	     setLogin((p) => ({...p,[e.target.name]: e.target.value,}))
		}
	   />
	   {loginError && <ErrorShow>{loginError}</ErrorShow>}
	   <Button bg={isDarkMode}>Login</Button>
	  </Login>
	 </AuthOpt>
	</div>
   </Box>
  </Main>
 );
};

export default AuthBox;

const Main = styled.div`
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	position: fixed;
	z-index: 1000000;
	background-color: rgba(0, 0, 0, 0.333);
	display: grid;
	place-items: center;
`;

const Box = styled.div<{bg: string}>`
	background-color: ${({bg}) => bg};
	border-radius: 5px;
	padding: 20px;
`;

const HeaderTitle = styled.h1<{cl: string}>`
	font-size: 26px;
	font-weight: 500;
	color: ${({cl}) => "#69654C"};
	text-align: center;
	flex: 1;
`;

const AuthOptions = styled.div<{dm: boolean}>`
	display: flex;
	cursor: pointer;
	padding: 8px 0;
	margin: 5px 0;
	position: relative;
	box-shadow: 2px 2px 3px ${({dm}) => (dm ? "transparent" : "#e4e3e3")};
`;

const AuthSlider = styled.div<{opt: string; dm: boolean}>`
	position: absolute;
	width: 50%;
	background-color: ${({dm}) => (dm ? "#fff" : "#69654C")};
	height: 3px;
	bottom: 0;
	left: ${({opt}) => (opt === "left" ? 0 : "50%")};
	transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const AuthTitle = styled.p<{cl: string}>`
	flex: 1;
	padding: 10px;
	color: ${({cl}) => cl};
	font-weight: 500;
	text-align: center;

	:hover {
		background-color: rgba(0, 0, 0, 0.0044444);
	}
`;

const AuthOpt = styled.div<{opt: string}>`
	width: max-content;
	transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
	display: flex;
	transform: ${({opt}) =>
		opt === "left" ? "translateX(0)" : "translateX(-300px)"};
	margin-top: 20px;
`;

const Register = styled.form`
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	${sm({width: "300px"})}
`;

const Login = styled.form`
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const Input = styled.input<{dm: boolean}>`
	border: 1px solid ${({dm}) => (dm ? "transparent" : "#999")};
	padding: 15px;
	border-radius: 3px;
	font-size: 18px;
	outline: none;
	background-color: ${({dm}) => (dm ? "#181818" : "transparent")};
	color: ${({dm}) => (dm ? "#fff" : "#111")};
`;

const ErrorShow = styled.p`
	color: red;
	font-size: 13px;
`;

const Button = styled.button<{bg: boolean}>`
	cursor: pointer;
	font-weight: 500;
	background-color: ${({bg}) => (bg ? "#0f0f0f" : "#69654c")};
	border: none;
	outline: none;
	font-size: 16px;
	padding: 15px 22px;
	border-radius: 4px;
	color: #fff;
`;
