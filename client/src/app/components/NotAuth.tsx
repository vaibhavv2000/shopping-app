"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { AiFillShopping } from "react-icons/ai";
import { useSelector } from "react-redux";
import styled from "styled-components";

interface props {
  title?: string;
}

const NotAuth = (props: props): JSX.Element => {
  const { isDarkMode } = useSelector((state: RootState) => state.auth);

  return (
    <Main bg={isDarkMode ? "#181818" : "#fff"}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AiFillShopping size={70} color={isDarkMode ? "#fff" : "#111"} />
      </div>
      <Title cl={isDarkMode ? "#fff" : "#111"}>
        {props.title ? props.title : "Not Logged In"}
      </Title>
    </Main>
  );
};

export default NotAuth;

const Main = styled.div<{ bg: string }>`
  display: grid;
  place-content: center;
  height: calc(100vh - 60px);
  background-color: ${({ bg }) => bg};
`;

const Title = styled.h1<{ cl: string }>`
  color: ${({ cl }) => cl};
  text-align: center;
  margin: 8px 0;
`;
