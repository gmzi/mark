import Head from 'next/head'
import styles from './layout.module.css'
// import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
// import Logo from '../components/logo'
// import LogoAdmin from '../components/logo-admin'

const name = "Mark"
export const siteTitle = 'etf and stock screener'

export default function Layout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <Head>
                    <link rel="icon" href="/favicon4.ico" />
                    <meta
                        name="description"
                        content="etf and stock screener"
                    />
                    <meta
                        property="og:image"
                        content={`https://og-image.vercel.app/reflexi%C3%B3n%20en%20m%C3%BAsica.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`}
                    />
                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <main className={styles.main}>
                    {children}
                </main>
                <footer className={styles.footer}>
                    <span className={styles.logo}>made for academic purposes only, repo on </span>
                    <a
                        href="https://github.com/gmzi/mark.git"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles.logo}>
                            github
                        </span>
                    </a>
                </footer>
            </div>
        </>
    )

}