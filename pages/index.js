import Head from 'next/head'
import Divider from "@material-ui/core/Divider";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Scheemy - Shopify schema builder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Create <a href={"https://www.shopify.com/"} target={"_blank"} style={{color: "#95bf46"}}>Shopify</a> schema 70% faster with Scheemy
        </h1>

        <ul>
          <li>Intuitive drag and drop builder</li>
          <li>Never have to write Shopify schema by hand again</li>
          <li>... by developers, for developers ❤</li>
        </ul>

        <a className="button primary" href="/app">TRY SCHEEMY FOR FREE</a>

        <hr/>

        <section>
          <h2 className="sectionTitle">Why Scheemy?</h2>
          <p>It can easily take a couple of hours to write a more complex schema, say for a page builder, by hand.</p>
          <p><b>With Scheemy you can cut down that time by more then 70%.</b></p>
        </section>

        <section>
          <h2 className="sectionTitle">How does it do that?</h2>
          <p>1. Scheemy cuts down the mountain of errors that come up from writing the Schema by hand</p>
          <p>2. Scheemy allows you to easily duplicate / remove / add options anywhere within your schema</p>
          <p>3. Scheemy tracks and saves the progress of your scheema, so your hard work will never be lost</p>
        </section>


      </main>

      <footer>

      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        hr {
            border: none;
            height: 1px;
            margin: 0;
            flex-shrink: 0;
            background-color: rgba(0, 0, 0, 0.12);
            width: 100%;
            margin: 48px 0;
           
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
        
        a.button {
          display: flex;
              display: inline-flex;
          font-size: 14px;
          letter-spacing: 0px;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 16px;
          text-decoration: none !important;
          background-color: #fff;
          color: #4950F6 !important;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          justify-content: center;
          padding: 16px 32px;
          height: 48px;
          text-align: center;
          white-space: nowrap;
          background: #4950F6;
          color: #fff !important;
          transition: background .15s ease; 
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          letter-spacing: 1px;
          margin: 0;
          margin-bottom: 24px;
          line-height: 1.15;
          font-size: 2.5rem;
        }
        
        section + section {
          margin-top: 24px;
        }
        
        .sectionTitle {
          letter-spacing: 1px;
          margin: 0;
          margin-bottom: 24px;
          line-height: 1.15;
          font-size: 1.5rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
        }

        .card {
          margin-bottom: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }
        
        ul {
              color: #565678;
              margin: 24px 0;
              padding-left: 24px;
        }
        
        ul li {
          font-size: 1.2rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
