import React from 'react';
import styled from "styled-components";
import {COLOR, STYLE} from "./const/style";
import {useNavigate} from "react-router-dom";

function Welcome(props) {

    const navigate = useNavigate();

    return (
        <>
            <ContentSection>
                <TitleContainer>
                    <TitleTextBox>
                        <strong>S</strong><span>peedy</span>
                    </TitleTextBox>
                    <TitleTextBox>
                        <strong>P</strong><span>rivate</span>
                    </TitleTextBox>
                    <TitleTextBox>
                        <strong>C</strong><span>hart</span>
                    </TitleTextBox>
                </TitleContainer>
                <EnterButton onClick={()=>navigate("/chart")}>
                    enter
                </EnterButton>
                <DescriptionContainer>
                    <DescriptionTextBox>
                        <span>ranking is updated</span>
                        <strong>Every 5 Minutes</strong>
                    </DescriptionTextBox>
                    <DescriptionTextBox>
                        <span>based on Like/Dislike of</span>
                        <strong>Your Friends</strong>
                    </DescriptionTextBox>
                </DescriptionContainer>
            </ContentSection>
        </>
    );
}

const ContentSection = styled.div`
  background-color: ${COLOR.PRIMARY_BLACK};
  width: ${STYLE.MIN_WIDTH};
  height: inherit;
  margin: 0 auto;
  position: relative;
`

const TitleContainer = styled.div`
  margin-left: 10px;
`

const TitleTextBox = styled.div`
  color: white;

  strong {
    color: ${COLOR.PRIMARY_GOLD};
    font-size: 100px;
    font-weight: bold;
  }

  span {
    font-size: 80px;
  }
`

const DescriptionContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`

const DescriptionTextBox = styled.div`
  color: white;
  text-align: right;
  margin-top: 10px;

  strong {
    font-size: 60px;
    font-weight: bold;
    display: block;
    right: 0;
  }

  span {
    font-size: 30px;
  }
`

const EnterButton = styled.div`
  border: 10px solid ${COLOR.PRIMARY_GOLD};
  border-radius: 30px;
  width: 200px;
  height: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 100px);
  text-align: center;
  line-height: 50px;
  color: ${COLOR.PRIMARY_GOLD};
  cursor: pointer;
  font-size: 40px;
  
  &:hover{
    background-color: ${COLOR.SECONDARY_BLACK};
  }
`

export default Welcome;