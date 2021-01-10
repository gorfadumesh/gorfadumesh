import React from "react"

import { Container, Title } from "./common"

import music from "../assets/image/music.png"
import camera from "../assets/image/camera.png"
import travelling from "../assets/image/travelling.svg"
import reading from "../assets/image/reading.png"
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
            <img alt="" src={reading} />
            <h4>Reading Books</h4>
          </div>
          <div className="stickpad">
            <img alt="" src={travelling} />
            <h4>travelling</h4>
          </div>
          <div className="stickpad">
            <img alt="" src={music} />
            <h4>Playing instruments</h4>
          </div>
        </div>
      </Container>
    </div>
  )
}

export { LoveToDo }
