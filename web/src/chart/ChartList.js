import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {STYLE} from "../const/style";
import {useNavigate} from "react-router-dom";

function ChartList(props) {

    const [chartList, setChartList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/charts")
            .then(res => {
                if (res.ok) {
                    res.json().then(response => {
                        setChartList(response);
                    })
                } else {
                    alert("서버 애러. 연락 바랍니다")
                }
            })
    }, []);

    return (
        <ChartListBackground>
            <h1>차트 목록</h1>
            <ChartListTable>
                {chartList.map((chart, idx) => {
                    return (
                        <ChartListRow onClick={()=>navigate(`/chart/${chart.id}`)}>
                            <span>{chart.title}</span>
                        </ChartListRow>
                    )
                })}
            </ChartListTable>
        </ChartListBackground>
    );
}

const ChartListBackground = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${STYLE.MIN_WIDTH};
  width: 100vw;
  justify-content: center;
  align-items: center;
`

const ChartListTable = styled.div`
  width: ${STYLE.MIN_WIDTH};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid darkgrey;
  padding: 10px 0;
`

const ChartListRow = styled.div`
  border: 1px solid darkgrey;
  border-radius: 10px;
  width: calc(${STYLE.MIN_WIDTH} - 10px);
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: slategrey;
  cursor: pointer;
`

export default ChartList;