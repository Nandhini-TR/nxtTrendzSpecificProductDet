import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstantsProductItem = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productList: {},
    count: 1,
    apiStatus: apiStatusConstantsProductItem.initial,
  }

  componentDidMount() {
    this.getProductItemData()
  }

  getProductItemData = async () => {
    this.setState({apiStatus: apiStatusConstantsProductItem.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const modifiedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products.map(eachItem => ({
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          title: eachItem.title,
          style: eachItem.style,
          price: eachItem.price,
          description: eachItem.description,
          brand: eachItem.brand,
          totalReviews: eachItem.total_reviews,
          rating: eachItem.rating,
        })),
      }

      this.setState({
        productList: modifiedData,
        apiStatus: apiStatusConstantsProductItem.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstantsProductItem.failure,
      })
    }
  }

  onIncreaseCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecreaseCount = () => {
    this.setState(prevState => ({
      count: prevState.count > 1 ? prevState.count - 1 : 1,
    }))
  }

  renderProductData = () => {
    const {productList, count} = this.state
    console.log(productList)
    console.log(productList.similarProducts)
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productList
    return (
      <>
        <Header />
        <div className="current-product-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="current-product-description-container">
            <h1 className="current-product-title">{title}</h1>
            <p className="current-product-price">Rs {price}/-</p>
            <div className="current-product-rating-reviews-container">
              <div className="current-product-rating-container">
                <p className="current-product-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                  alt="star"
                  className="star-image"
                />
              </div>
              <p className="current-product-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="current-product-description">{description}</p>
            <p className="current-product-available">
              Available: {availability}
            </p>
            <p className="current-product-available">Brand: {brand}</p>
            <hr />
            <div className="button-container">
              <button
                data-testid="plus"
                type="button"
                className="plus-minus-button"
                onClick={this.onIncreaseCount}
              >
                <BsPlusSquare className="plus-minus-icon" />
              </button>
              <p className="count">{count}</p>
              <button
                data-testid="minus"
                type="button"
                className="plus-minus-button"
                onClick={this.onDecreaseCount}
              >
                <BsDashSquare className="plus-minus-icon" />
              </button>
            </div>
            <button className="cart-button" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-product-heading">Similar Products</h1>
        <ul className="similar-products-ul-list">
          {productList.similarProducts.map(eachItem => (
            <SimilarProductItem key={eachItem.id} similarProducts={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureStatus = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-view"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="continue-shopping-button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let category
    switch (apiStatus) {
      case apiStatusConstantsProductItem.success:
        category = this.renderProductData()
        break
      case apiStatusConstantsProductItem.failure:
        category = this.renderFailureStatus()
        break
      case apiStatusConstantsProductItem.inProgress:
        category = this.renderLoader()
        break
      default:
        category = null
    }
    return <>{category}</>
  }
}
export default ProductItemDetails
