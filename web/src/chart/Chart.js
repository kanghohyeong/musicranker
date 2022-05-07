import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {COLOR, STYLE} from "../const/style";
import WantedForm from "./WantedForm";
import {ReactComponent as ThumbUp} from "../assets/thumb_up.svg";
import {ReactComponent as ThumbDown} from "../assets/thumb_down.svg";
import {ReactComponent as Home} from "../assets/home.svg";
import {useParams, useNavigate} from "react-router-dom";

function Chart(props) {

    const {chartId} = useParams();
    const navigate = useNavigate();

    const [chart, setChart] = useState({
        topMusics: [], title: "로딩중", wantedMusics: [], description: "로딩중.."
    });

    useEffect(() => {
        fetch("/api/chart/" + chartId)
            .then(res => {
                if (res.ok) {
                    res.json().then(response => {
                        setChart(response);
                    })
                } else {
                    alert("서버 애러. 연락 바랍니다")
                }
            });
    }, []);

    const vote = (type, musicId) => {
        fetch(`/api/music/${musicId}/${type}`, {
            method: 'PUT'
        }).then(res => {
            if (res.ok) {
                res.json().then(response => {
                    const topMusics = [...chart.topMusics];
                    const wantedMusics = [...chart.wantedMusics];

                    if (topMusics.some(music => music.id === musicId)) {
                        if (type === "like")
                            topMusics[topMusics.findIndex(music => music.id === musicId)].likeCount = response;
                        else if (type === "dislike")
                            topMusics[topMusics.findIndex(music => music.id === musicId)].dislikeCount = response;
                    }
                    if (wantedMusics.some(music => music.id === musicId)) {
                        if (type === "like")
                            wantedMusics[wantedMusics.findIndex(music => music.id === musicId)].likeCount = response;
                        else if (type === "dislike")
                            wantedMusics[wantedMusics.findIndex(music => music.id === musicId)].dislikeCount = response;
                    }

                    setChart({...chart, topMusics: [...topMusics], wantedMusics: [...wantedMusics]});
                })
            } else {
                alert("서버 애러");
            }
        })
    }


    return (
        <ContentSection>
            <h1 style={{margin: "0 10px"}}>{chart.title}</h1>
            <p style={{margin: "10px 10px"}}>{chart.description}</p>
            <Home fill={COLOR.COMPONENT_RED}
                  onClick={() => navigate("/chart")}
                  style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      transform: "scale(0.6)",
                      cursor: "pointer"
                  }}/>
            <ScrollContainer>
                <ChartTable>
                    <h3>Top 100</h3>
                    {chart.topMusics.map((topMusic, idx) => {
                        return (
                            <ChartRow key={idx}>
                                <div className={"rank-box"}>
                                    <p>{topMusic.rank}</p>
                                    {{
                                        'UP': <WaveIndicator color={"red"}>상승</WaveIndicator>,
                                        "STAY": <WaveIndicator color={"black"}>-</WaveIndicator>,
                                        "DOWN": <WaveIndicator color={"blue"}>하락</WaveIndicator>,
                                        "NEW": <WaveIndicator color={"green"}>신규</WaveIndicator>
                                    }[topMusic.wave]}
                                </div>
                                <div className={"iframe-box"}>
                                    <iframe width={"120px"} height={"80px"}
                                            src={"https://www.youtube.com/embed/" + topMusic.videoId}
                                            title={topMusic.title}/>
                                </div>
                                <div className={"info-box"}>
                                    <p style={{color: COLOR.PRIMARY_GOLD, fontWeight: "bold"}}>{topMusic.title}</p>
                                    <p style={{fontSize: "15px", fontWeight: "lighter"}}>{topMusic.singer}</p>
                                </div>
                                <div className={"vote-box"}>
                                    <Vote>
                                        <ThumbUp onClick={() => vote("like", topMusic.id)}/>
                                        <span>{topMusic.likeCount}</span>
                                    </Vote>
                                    <Vote>
                                        <ThumbDown onClick={() => vote("dislike", topMusic.id)}/>
                                        <span>{topMusic.dislikeCount}</span>
                                    </Vote>
                                </div>
                            </ChartRow>
                        )
                    })}
                </ChartTable>
                <ChartTable>
                    <h3>How About THIS SHIT?</h3>
                    {chart.wantedMusics.length ? chart.wantedMusics.map((wantedMusic, idx) => {
                        return (
                            <ChartRow key={idx}>
                                <div className={"rank-box"}>
                                    대기
                                </div>
                                <div className={"iframe-box"}>
                                    <iframe width={"120px"} height={"80px"}
                                            src={"https://www.youtube.com/embed/" + wantedMusic.videoId}
                                            title={wantedMusic.title}/>
                                </div>
                                <div className={"info-box"}>
                                    <p style={{color: COLOR.PRIMARY_GOLD, fontWeight: "bold"}}>{wantedMusic.title}</p>
                                    <p style={{fontSize: "15px", fontWeight: "lighter"}}>{wantedMusic.singer}</p>
                                </div>
                                <div className={"vote-box"}>
                                    <Vote>
                                        <ThumbUp onClick={() => vote("like", wantedMusic.id)}/>
                                        <span>{wantedMusic.likeCount}</span>
                                    </Vote>
                                    <Vote>
                                        <ThumbDown onClick={() => vote("dislike", wantedMusic.id)}/>
                                        <span>{wantedMusic.dislikeCount}</span>
                                    </Vote>
                                </div>
                            </ChartRow>
                        )
                    }) : <p style={{color: COLOR.PRIMARY_GOLD}}>"please introduce new shit"</p>}
                </ChartTable>
                <WantedForm/>
            </ScrollContainer>
        </ContentSection>
    );
}

const ContentSection = styled.div`
  background-color: ${COLOR.PRIMARY_BLACK};
  width: ${STYLE.MIN_WIDTH};
  height: 100%;
  margin: 0 auto;
  position: relative;
  color: white;

  h1 {
    color: ${COLOR.PRIMARY_GOLD};
    font-size: 40px;
    height: 40px;
  }

  p {
    font-size: 20px;
  }
`

const ScrollContainer = styled.div`
  width: ${STYLE.MIN_WIDTH};
  height: calc(100% - 100px);
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`

const ChartTable = styled.div`
  width: calc(${STYLE.MIN_WIDTH} - 20px);
  margin: 10px auto;
  background-color: ${COLOR.SECONDARY_BLACK};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;

  h3 {
    color: ${COLOR.COMPONENT_RED};
  }
`

const ChartRow = styled.div`
  width: calc(${STYLE.MIN_WIDTH} - 20px);
  height: ${STYLE.MUSIC_ROW_HEIGHT};
  display: flex;
  align-items: center;
  border-top: 0.5px solid darkgrey;

  &:last-child {
    border-bottom: 0.5px solid darkgrey;
  }

  &:hover {
    background-color: darkgrey;
  }

  .rank-box {
    width: calc((${STYLE.MIN_WIDTH} - 20px) * 0.12);
    text-align: center;

    p {
      font-size: 30px;
    }
  }

  .iframe-box {
    width: calc((${STYLE.MIN_WIDTH} - 20px) * 0.33);
  }

  .info-box {
    width: calc((${STYLE.MIN_WIDTH} - 20px) * 0.33);
    padding-left: 5px;
  }

  .vote-box {
    width: calc((${STYLE.MIN_WIDTH} - 20px) * 0.18);
  }
`

const Vote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
    transform: scale(0.6);
    fill: white;
  }

  svg:hover {
    fill: red;
  }
`

const WaveIndicator = styled.p`
  color: ${props => props.color};
  font-size: 15px !important;
`

export default Chart;