import React from "react"

import { Container, Title } from "./common"

import music from "../assets/image/music.png"
import camera from "../assets/image/camera.png"
import travelling from "../assets/image/travelling.svg"
import mountainhiking from "../assets/image/mountainhiking.svg"
import swimming from "../assets/image/swimming.svg"

import "./lovetodo.css"

const LoveToDo = () => {
  return (
    <div className="love-to-do-area">
      <Container>
        <Title side="right" title="Love To Do" />
        <div className="love-to-do">
          <div className="stickpad">
            <img alt="" src={camera} />
            <h4>Photography</h4>
          </div>
          <div className="stickpad">
            <img alt="" src={music} />
            <h4>Playing musical instruments</h4>
          </div>
          <div className="stickpad">
            <img alt="" src={mountainhiking} />
            <h4>Mountain Hiking</h4>
          </div>
          <div className="stickpad">
            <img alt="" src={swimming} />
            <h4>Swimming</h4>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { LoveToDo }
