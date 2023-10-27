"use client";

import {RootState} from "@/redux/store";
import React, {Dispatch, SetStateAction, useState} from "react";
import {HiXMark} from "react-icons/hi2";
import {useSelector} from "react-redux";
import styled from "styled-components";

interface props {
	rating: number;
	order: string;
	setRating: Dispatch<SetStateAction<number>>;
	setOrder: Dispatch<SetStateAction<string>>;
	setShowFilter: Dispatch<SetStateAction<boolean>>;
}

const Filter = (props: props): JSX.Element => {
  const [asc, setAsc] = useState<string>();
  const [star, setStar] = useState<number>();

  const {order, rating, setOrder, setRating, setShowFilter} = props;

  const {isDarkMode} = useSelector((state: RootState) => state.auth);

  return (
   <Box isDarkMode={isDarkMode}>
	<div>
	 <Top>
	  <TopTitle isDarkMode={isDarkMode}>Filters</TopTitle>
	  <HiXMark
		name='x'
		cursor={"pointer"}
		size={28}
		color={"#f0f0f0"}
		onClick={() => setShowFilter(false)}
	  />
	 </Top>
	 <div style={{margin: "10px 0px"}}>
	  <Title isDarkMode={isDarkMode}>Ratings</Title>
	 <div style={{marginTop: "5px"}}>
	  {[4.5, 4.0, 3.0, 2.0, 1.0].map((o) => (
		<Holder key={String(Math.random())} isDarkMode={isDarkMode}>
		  <Input
			type='radio'
			name='rating'
			value={o}
			checked={star === o}
			style={{cursor: "pointer"}}
			onChange={(e) => {
			  setRating(o);
			  setStar(Number(e.target.value));
			}}
		  />
			  <p className='text-black/60 font-inter_500'>{o} & above</p>
		</Holder>
	  ))}
	 </div>
	</div>
	<div className='mt-2 space-y-1'>
	  <Title isDarkMode={isDarkMode}>Price</Title>
	  <div>
		{["Ascending", "Descending"].map((p) => (
		  <Holder isDarkMode={isDarkMode} key={String(Math.random())}>
			<Input
			  type='radio'
			  name='asc'
			  value={p}
			  checked={asc === p}
			  style={{cursor: "pointer"}}
			  onChange={(e) => {
				setOrder(p);
				setAsc(e.target.value);
			  }}
			/>
			<p className='text-black/60 font-inter_500'>{p}</p>
		  </Holder>
		))}
	  </div>
	</div>
  </div>
 </Box>
);
};

export default Filter;

const Box = styled.div<{isDarkMode: boolean}>`
	max-width: 300px;
	width: 100%;
	padding: 10px;
	border-radius: 7px;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: ${({isDarkMode}) => isDarkMode ? "#111" : "#fff"};
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const TopTitle = styled.span<{isDarkMode: boolean}>`
    color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#fff"};
	font-size: 20px;
	font-weight: 600;
`;

const Title = styled.span<{isDarkMode: boolean}>`
    color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#c6c6c6"};
    font-size: 16px;
	display: block;
	margin-bottom: 8px;
    font-weight: 600;
`;

const Holder = styled.div<{isDarkMode: boolean}>`
	display: flex;
	align-items: center;
	gap: 10px;
	color: ${({isDarkMode}) => !isDarkMode ? "#111" : "#fff"};
	margin-bottom: 8px;
`

const Input = styled.input`
	transform: scale(1.1);
`;
