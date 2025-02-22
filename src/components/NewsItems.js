import React from 'react'

const NewsItems =(props) => {
    let {title, description, imageUrl, newsUrl, author, date} = props;  
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="..." style={{height : "150px"}}/>
            <div className="card-body" style={{height : "auto"}}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p><small className="text-muted">By {author} on {date}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-primary">Read More..</a>
            </div>
            </div>
      </div>
    )
  
}

export default NewsItems;