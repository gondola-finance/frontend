import github from "../assets/icons/social/github.png"
import githubDark from "../assets/icons/social/github_darkmode.png"
import gondolaLogo from "../assets/icons/brand_logo.png"
import gondolaLogoDark from "../assets/icons/brand_logo_darkmode.png"
import telegram from "../assets/icons/social/telegram.png"
import twitter from "../assets/icons/social/twitter.png"

export class Social {
  readonly url: string
  readonly icon: string
  readonly iconDark: string

  constructor(url: string, icon: string, iconDark?: string) {
    this.url = url
    this.icon = icon
    this.iconDark = iconDark ? iconDark : icon
  }
}
export const SOCIALS: Social[] = [
  new Social("https://gondola.finance", gondolaLogo, gondolaLogoDark),
  new Social("https://t.me/gondola_finance", telegram),
  new Social("https://twitter.com/GondolaFinance", twitter),
  new Social("https://github.com/gondola-finance", github, githubDark),
]
