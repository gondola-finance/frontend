import "./Footer.scss"

import React, { ReactElement } from "react"
import { SOCIALS } from "../constants"

function Footer(): ReactElement {
  return (
    <div className="footer">
      <span>© 2021 by Gondola Finance</span>
      <br />
      <ul>
        {SOCIALS.map((social) => (
          <li key={social.url}>
            <a href={social.url} target="blank">
              <img className="logo" alt="logo" src={social.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
