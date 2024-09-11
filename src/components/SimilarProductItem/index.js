import './index.css'

const SimilarProductItem = props => {
  const {similarProducts} = props
  const {imageUrl, title, brand, rating, price} = similarProducts

  return (
    <>
      <div className="similar-product-container">
        <img
          src={imageUrl}
          alt={`similar product ${title}`}
          className="similar-image"
        />
        <p className="similar-product-title">{title}</p>
        <p className="similar-product-brand">{brand}</p>
        <div className="similar-product-price-container">
          <p className="similar-product-price">Rs{price}/-</p>
          <div className="similar-product-rating-containeSimilarProductItemr">
            <p className="similar-product-rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png "
              alt="star"
              className="similar-star-image"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SimilarProductItem
