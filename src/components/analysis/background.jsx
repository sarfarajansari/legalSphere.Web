import React from "react";
import styled from "styled-components";
const Container = styled.div`
  .main {
    width: 100vw;
    height: 100vh;
    position: relative;
    padding: 15px;

    .content {
      position: absolute;
      top: 125px;
      left: 125px;
      right: 25px;
      bottom: 25px;

      &.map {
        top: 50px;
        border: 4px solid white;
        border-radius: 19px;
        overflow: hidden;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
  .blackbg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(117.34deg, #0e6660 5.21%, #082e45 94.77%);

    z-index: -1;
  }
  .topleft-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: max-content;
    height: max-content;
    z-index: 2;

    img {
      width: 405px;
      height: 653px;
    }
  }

  .topright-bg {
    position: fixed;
    img {
      width: 902.88px;
      height: 494.24px;
    }
    top: -365.45px;
    left: 801.83px;

    width: max-content;
    height: max-content;
    z-index: 2;
  }

  .right-bg {
    position: fixed;
    z-index: -1;

    top: 200px;
    right: -15px;

    img {
      height: 790px;
    }
  }
  .bottom-bg {
    position: fixed;
    z-index: -1;

    bottom: -15px;
    right: 20px;
    img {
      width: 790px;
    }
  }

  .logo {
    position: fixed;
    top: 0px;
    left: 10px;
    z-index: 2;

    img {
      width: 134px;
    }
  }
`;
const Background = ({ children, mode }) => {
  if (mode === "Map") {
    return (
      <Container>
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="blackbg"></div>
        <div className="topleft-bg">
          <img src="/frame1.png" alt="Frame1" />
        </div>

        <div className="main">
          <div className="content map">{children}</div>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="blackbg"></div>
      <div className="topleft-bg">
        <img src="/frame1.png" alt="Frame1" />
      </div>

      <div className="right-bg">
        <img src="/frame3.png" alt="Frame3" />
      </div>
      <div className="bottom-bg">
        <img src="/frame4.png" alt="Frame4" />
      </div>

      <div className="main">
        <img src="/mainbg.png" alt="Main" />
        <div className="content">{children}</div>
      </div>
    </Container>
  );
};

export default Background;
