import React from "react";
import styled from "styled-components";

function ProgressBar({ title, width, text }) {
  return (
    <ProgressBarStyled>
      <h6>{title}</h6>
      <div className="progress-bar">
        <p>{text}</p>
        <div className="progress">
          <span style={{ width: width }}></span>
        </div>
      </div>
    </ProgressBarStyled>
  );
}

const ProgressBarStyled = styled.div`
  .progress-bar {
    display: flex;
    align-items: center;
    background-color: white;
    p {
      padding-right: 1.1rem;
    }
    .progress {
      position: relative;
      width: 100%;
      height: 0.4rem;
      background-color: #f1f1f1;
      span {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
        background-color: #87ceea;
      }
    }
  }
`;

export default ProgressBar;
