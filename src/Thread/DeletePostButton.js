import React from 'react'
import { styles } from 'refire-app'
import TrashIcon from 'react-icons/lib/fa/trash'

const DeletePostButton = ({ user, isAdmin, onClick, styles }) => {
  if (user && isAdmin) {
    return (
      <span onClick={onClick} title="Delete">
        <span className={styles.button}>
          <TrashIcon size="16px" />
        </span>
      </span>
    )
  } else {
    return <span />
  }
}

const css = {
  button: {
    cursor: "pointer",
    verticalAlign: "top",
    display: "inline-block",
    paddingRight: "20px",
    verticalAlign: "top",
    color: "#955",
  },
}

export default styles(css, DeletePostButton)
