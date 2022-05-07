import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {COLOR, STYLE} from "../const/style";
import {useNavigate} from "react-router-dom";
import {ReactComponent as LibraryAdd} from "../assets/library_add.svg";
import {ReactComponent as LibraryMusic} from "../assets/library_music.svg";
import {ReactComponent as LibraryVideo} from "../assets/library_video.svg";

function ChartList(props) {

    const [chartList, setChartList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/charts")
            .then(res => {
                if (res.ok) {
                    res.json().then(response => {
                        setChartList(response);
                        console.log(response)
                    })
                } else {
                    alert("서버 애러. 연락 바랍니다")
                }
            })
    }, []);

    return (<ContentSection>
        <h1>Collections</h1>
        <ChartListContainer>
            {chartList.map((chart, idx) => {
                return (<ChartItem onClick={() => navigate(`/chart/${chart.id}`)} key={idx}>
                    {{
                        "MUSIC": <LibraryIcon color={COLOR.COMPONENT_GREEN}>
                            <LibraryMusic fill={"white"}/>
                        </LibraryIcon>,
                        "VIDEO": <LibraryIcon color={COLOR.COMPONENT_RED}>
                            <LibraryVideo fill={"white"}/>
                        </LibraryIcon>
                    }[chart.chartType]}

                    <ChartText>
                        <strong>{chart.title}</strong>
                        <p>{chart.description}</p>
                    </ChartText>
                </ChartItem>)
            })}
        </ChartListContainer>
    </ContentSection>);
}

const ContentSection = styled.div`
  background-color: ${COLOR.PRIMARY_BLACK};
  width: ${STYLE.MIN_WIDTH};
  height: 100%;
  margin: 0 auto;
  position: relative;

  h1 {
    color: white;
    font-size: 60px;
    height: 60px;
    margin-bottom: 20px;
  }
`

const ChartListContainer = styled.div`
  width: ${STYLE.MIN_WIDTH};
  height: calc(100vh - 80px);
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

`

const ChartItem = styled.div`
  border-radius: 10px;
  width: calc(${STYLE.MIN_WIDTH} - 50px);
  height: 100px;
  background-color: ${COLOR.SECONDARY_BLACK};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  margin-bottom: 20px;
`

const LibraryIcon = styled.div`
  background-color: ${props => props.color};
  width: 60px;
  height: 60px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChartText = styled.div`
  width: 250px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    width: 250px;
    font-size: 20px;
    display: block;
    color: ${COLOR.PRIMARY_GOLD};
  }

  p {
    color: white;
    width: 250px;
    font-weight: lighter;
    line-break: anywhere;
  }
`

export default ChartList;