import './index.css'

const PassWordItem = props => {
  const {PassWordDetails, isPasswordShow, deletePassWord} = props
  const {
    userInput,
    initialClassName,
    passWordInput,
    WebsiteInput,
    id,
  } = PassWordDetails

  const onDeletePassWord = () => {
    deletePassWord(id)
  }

  const renderShowPassWord = isPasswordShow ? (
    <p className="text">{passWordInput}</p>
  ) : (
    <img
      className="stars"
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )

  const FirstLetter = userInput ? userInput[0].toUpperCase() : ''

  return (
    <li className="passWordsList">
      <div className="passWordsListItem">
        <div className={initialClassName}>
          <p className="firstLetter">{FirstLetter}</p>
        </div>
        <div className="input-item-container">
          <p className="text">{WebsiteInput}</p>
          <p className="text">{userInput}</p>
          {renderShowPassWord}
        </div>
        <button
          className="btn-delete"
          testid="delete"
          type="button"
          onClick={onDeletePassWord}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}
export default PassWordItem
