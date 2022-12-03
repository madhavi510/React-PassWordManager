import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PassWordItem from '../PaassWordItem'
import './index.css'

const initialBgColors = [
  'Red',
  'cyan',
  'blue',
  'darkblue',
  'lightBlue',
  'purple',
  'yellow',
  'Lime',
  'Magenta',
  'Pink',
]

class PassWordManager extends Component {
  state = {
    userInput: '',
    passWordInput: '',
    WebsiteInput: '',
    passWordList: [],
    searchInput: '',
    isPasswordShow: false,
  }

  onChangeUsername = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({WebsiteInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitPassWords = event => {
    event.preventDefault()
    const {userInput, passWordInput, WebsiteInput} = this.state
    const initialBgClassName = `initial ${
      initialBgColors[Math.ceil(Math.random() * initialBgColors.length - 1)]
    }`
    const updatedPassWords = {
      id: uuidv4(),
      userInput,
      passWordInput,
      WebsiteInput,
      initialClassName: initialBgClassName,
    }
    this.setState(prevState => ({
      passWordList: [...prevState.passWordList, updatedPassWords],
    }))
  }

  deletePassWord = Id => {
    const {passWordList} = this.state
    this.setState({
      passWordList: passWordList.filter(eachPassWord => eachPassWord.id !== Id),
    })
  }

  isShowPassword = () => {
    this.setState(prev => ({isPasswordShow: !prev.isPasswordShow}))
  }

  renderPassWordItem = () => {
    const {passWordList, searchInput, isPasswordShow} = this.state
    const newPassWordList = passWordList.filter(eachPassword =>
      eachPassword.WebsiteInput.toLowerCase().includes(
        searchInput.toLowerCase(),
      ),
    )

    if (newPassWordList.length !== 0) {
      return (
        <ul className="passwords-list">
          {newPassWordList.map(eachPassWord => (
            <PassWordItem
              key={eachPassWord.id}
              PassWordDetails={eachPassWord}
              deletePassWord={this.deletePassWord}
              isPasswordShow={isPasswordShow}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="password-error">
        <img
          className="no-password-img"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
        />
        <p>No Passwords</p>
      </div>
    )
  }

  render() {
    const {passWordList, isPasswordShow} = this.state
    // console.log(passWordList)
    const count = passWordList.length
    const {userInput, passWordInput, WebsiteInput} = this.state
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="passWord-logo"
        />
        <div className="passWord-input-container">
          <form
            className="password-form-container"
            onSubmit={this.onSubmitPassWords}
          >
            <h1 className="title">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-img"
              />

              <input
                type="text"
                className="input-text"
                placeholder="Enter Website"
                value={WebsiteInput}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website-img"
              />

              <input
                type="text"
                className="input-text"
                placeholder="Enter Username"
                value={userInput}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website-img"
              />

              <input
                type="password"
                className="input-text"
                placeholder="Enter Password"
                value={passWordInput}
                autoComplete="on"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="password-app-image"
            alt="password manager"
          />
        </div>
        <div className="passwordItems">
          <div className="passwordCount">
            <div className="passwordCountNum">
              <h1 className="passwords">Your PassWords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="website-img"
              />

              <input
                type="search"
                className="input-text"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input
              type="checkbox"
              className="check"
              id="showPassword"
              checked={isPasswordShow}
              onChange={this.isShowPassword}
            />
            <label className="text" htmlFor="showPassword">
              Show Passwords
            </label>
          </div>
          {this.renderPassWordItem()}
        </div>
      </div>
    )
  }
}
export default PassWordManager
