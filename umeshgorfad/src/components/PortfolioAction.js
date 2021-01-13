import React, { useState } from "react"

import "./portfolioaction.css"
import { Button } from "./common"

const PortfolioAction = () => {
  let showMoreTimeOut
  let moreTimeOut
  const [title, setTitle] = useState("More")
  const handleMouseOver = () => {
    clearTimeout(moreTimeOut)
    showMoreTimeOut = setTimeout(() => {
      setTitle("Show More")
    }, 100)
  }
  const handleOnMouseOut = () => {
    clearTimeout(showMoreTimeOut)
    moreTimeOut = setTimeout(() => {
      setTitle("More")
    }, 100)
  }
  const handleClick = e => {
    e.preventDefault()
    clearTimeout()
    setTitle("Showing More...")
    setTimeout(() => {}, 1000)
  }
  return (
    <div className="portfolio-action">
      <Button
        target="__blank"
        link="https://github.com/gorfadumesh"
        onMouseOver={handleMouseOver}
        onMouseOut={handleOnMouseOut}
        onClick={handleClick}
        title={title}
        mt="15px"
      />
    </div>
  )
}

export default PortfolioAction
