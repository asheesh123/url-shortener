import Head from 'next/head';
import Image from 'next/image';
import connectMongo from '../utils/connectMongo';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [shortUrls, setShortUrls] = useState([]);
  const [fullUrl, setFullUrl] = useState('')
  const getAllUrls = async () => {
    fetch(`/api/url-shortener/get-all`).then((response) => response.json()).then((data) => {
      console.log(data)
      setShortUrls(data.shortUrls)
    })
  }
  useEffect(() => {
    getAllUrls()
  }, [])
  const createShortenUrl = async () => {
    const res = await fetch('/api/url-shortener/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full: fullUrl
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Url Shortener</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
      </Head>

      <div className="container">
        <h1>URL Shrinker</h1>
        <form className="my-4 form-inline" onSubmit={(e) => {
          e.preventDefault()
          createShortenUrl()
        }}>
          <label htmlFor="fullUrl" className="sr-only">Url</label>
          <input required value={fullUrl} placeholder="Enter your url here..." type="url" name="fullUrl" className="form-control col mr-2" onChange={(e) => { setFullUrl(e.target.value) }} />
          <button className="btn btn-success" type="submit">Shrink</button>
        </form>

        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {shortUrls?.map((shortUrl: any) => {
              return <tr key={shortUrl.short}>
                <td><a href={shortUrl.full}>{shortUrl.full}</a></td>
                <td><a href={shortUrl.short}>{shortUrl.short}</a></td>
                <td>{shortUrl.clicks}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>


    </div>
  );
}
