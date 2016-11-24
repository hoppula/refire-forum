import React from 'react'
import { styles } from 'refire-app'
import FaPencilSquare from 'react-icons/lib/fa/pencil-square'

const EditButton = ({ user, isAdmin, mine, onClick, styles }) => {
  if (user) {
    if (mine) {
      return (
        <span onClick={onClick} title="Edit">
          <span className={styles.button}>
            <FaPencilSquare size="20px" />
          </span>
        </span>
      )
    } else if (isAdmin) {
      return (
        <span onClick={onClick} title="Edit">
          <span className={styles.buttonAdminOwned}>
            <FaPencilSquare size="20px" />
          </span>
        </span>
      )
    }
  }
  return <span />
}

const css = {
  button: {
    cursor: "pointer",
    color: "#555",
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px",
  },
  buttonAdminOwned: {
    cursor: "pointer",
    color: "#955",
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px",
  },
}

export default styles(css, EditButton)
