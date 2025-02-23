import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Loader from './loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props) => {
  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(false);
  const[page, setPage] = useState(1);
  const[totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    console.log('Fetching news...');
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    console.log('URL:', url);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log('Received data:', parsedData);
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    }, [])

    // const previousClick = async () => {
    //   setPage(page - 1);
    //   updateNews();
    // }

  // const nextclick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // } 
  
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
    setLoading(false);
    
  }

    return (
      <div className="container my-3" >
        <h1 className="container d-flex justify-content-center" style={{marginTop: '90px'}}>News Bee - Top {props.category} Headlines</h1>
        {loading && <Loader /> }
        {/* <div className="row my-3">
          {!state.loading && state.articles.map((element) => {
            // console.log(element); 
              return <div className="col-md-4 my-3" key={element.url}>
                  <NewsItems title={element.title?element.title.slice(0,44) : " "} description={element.description?element.description.slice(0,88) : " "} imageUrl={!element.urlToImage? "https://img.etimg.com/thumb/msid-117913280,width-1200,height-630,imgsize-32428,overlay-economictimes/articleshow.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
        
              </div>
          })}
        </div> */}

        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <NewsItems 
                    title={element.title ? element.title.slice(0,44) : ""} 
                    description={element.description ? element.description.slice(0,88) : ""} 
                    imageUrl={element.urlToImage || "https://img.etimg.com/thumb/msid-117913280,width-1200,height-630,imgsize-32428,overlay-economictimes/articleshow.jpg"} 
                    newsUrl={element.url} 
                    author={element.author} 
                    date={element.publishedAt}
                  />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* For next and Previous button*/}

        {/* <div className="container d-flex justify-content-between">
          <button disabled={state.page <= 1} type="button" className="btn btn-dark" onClick={previousClick} > &larr; Previous</button>
          <button disabled={(state.page + 1 > Math.ceil(state.totalResults/props.pageSize))} type="button" className="btn btn-dark" onClick={nextclick}>Next &rarr;</button>
        </div> */}
      </div>
    )
}

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
