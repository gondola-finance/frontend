import discord from "../assets/icons/social/discord.svg"
import gitbook from "../assets/icons/social/gitbook.png"
import github from "../assets/icons/social/github.png"
import githubDark from "../assets/icons/social/github_darkmode.png"
import gondolaLogo from "../assets/icons/brand_logo.png"
import gondolaLogoDark from "../assets/icons/brand_logo_darkmode.png"
import medium from "../assets/icons/social/medium.svg"
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
  new Social("https://twitter.com/gondola_finance", twitter),
  new Social("https://discord.gg/u7dHynaqVz", discord),
  new Social("https://github.com/gondola-finance", github, githubDark),
  new Social("https://gondola-finance.medium.com/", medium),
  new Social("https://gondola-finance.gitbook.io/gondola-finance/", gitbook),
]
