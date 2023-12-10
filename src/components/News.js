import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    console.log("I am a constructor from news component")
    this.state={
      articles :[],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    console.log("cdm");
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=0582a434075445fd94b856325d93ce72&page=1&pagesize=20"
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }


  handlenextClick = async()=>{
    console.log("next");
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=0582a434075445fd94b856325d93ce72&page=${ this.state.page+1}&pagesize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
         articles: parsedData.articles,
        page: this.state.page+1,
    })
  }
  }
  handleprevtClick = async()=>{
    console.log("previous");
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=0582a434075445fd94b856325d93ce72&page=${ this.state.page-1}&pagesize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
         articles: parsedData.articles,
        page: this.state.page-1,
    })
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>NewsNest - Top Headlines</h2>
        {this.state.articles.map((element)=>{console.log(element)})}
        <div className='row'>
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem  title = {element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
            
             
        </div>  
        <div className='container d-flex justify-content-between my-4' >
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevtClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handlenextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
