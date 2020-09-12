import { NextPage } from 'next'
import Parser from 'rss-parser'
import styles from '~/styles/Index.module.scss'
import Iframe from 'react-iframe'

interface Props {
  rssData: {
    items: [Object]
  }
}

const IndexPage: NextPage<Props> = ({ rssData }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.container__hero}>
          <div className={styles.container__hero__title}>
            keep-alive.fm
          </div>
        </div>
        <div className={styles.container__episodes}>
          { rssData.items.map((rss, index) => {

            const episodeId: string = rss['link'].split('/').slice(-1)[0]

            return <div key={index} className={styles.container__episodes__item}>
              <Iframe
                url={`https://anchor.fm/keep-alive-fm/embed/episodes/${episodeId}`}
                frameBorder={0}
                width="100%"
                className='myClassname'
                scrolling='no' />
              </div>
            })
          }
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer__host}>
          <div className={styles.footer__host__title}>
            Hosts
          </div>
          <div className={styles.footer__host__hosts}>
            <div className={styles.footer__host__hosts}>
              <div className={styles.footer__host__hosts__item}>
                <a href='https://twitter.com/mathetake'>@mathetake</a>
              </div>
              <div className={styles.footer__host__hosts__item}>
                <a href='https://twitter.com/ayemos_y'>@ayemos_y</a>
              </div>
              <div className={styles.footer__host__hosts__item}>
                <a href='https://twitter.com/guiltydammy'>@guiltydammy</a>
              </div>
              <div className={styles.footer__host__hosts__item}>
                <a href='https://twitter.com/crcrpar'>@crcrpar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage

export const getStaticProps = async ({ req }) => {
  const parser = new Parser()
  const rssData = await parser.parseURL('https://anchor.fm/s/2e9d2654/podcast/rss')

  return { props: { rssData: rssData } }
}
