import React from 'react'
import { Link, styles } from 'refire-app'
import find from 'lodash/find'

function findBoard(boards, boardId) {
  return find(boards, (board) => {
    return board.key === boardId
  }) || { value: {} }
}

const Boards = ({ boards, category, styles }) => {
  return (
    <div>
      {
        Object.keys(category.boards).map((boardId) => {
          const board = findBoard(boards, boardId)
          return (
            <h3 key={boardId} className={styles.header}>
              <Link to={`board/${board.key}`} className={styles.link}>
                {board.value.title}
              </Link>
            </h3>
          )
        })
      }
    </div>
  )
}

const css = {
  header: {},
  link: {},
}

export default styles(css, Boards)
