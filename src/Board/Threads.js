import React from 'react'
import { Spinner } from 'elemental'
import { styles } from 'refire-app'

import Thread from './Thread'

const Threads = ({ boardId, threads, loaded, styles, theme }) => {
  if (!threads.length) {
    if (!loaded) {
      return (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )
    } else {
      return (
        <div className={styles.noThreadsYet}>
          No threads here yet
        </div>
      )
    }
  } else {
    return (
      <div>
        {
          threads.map(({ key, value: thread }) => {
            return (
              <Thread
                key={key}
                threadKey={key}
                thread={thread}
                boardId={boardId}
                styles={theme.Thread} />
            )
          })
        }
      </div>
    )
  }
}

const css = {
  spinnerContainer: {
    padding: "30px 0",
  },
  noThreadsYet: {},
}

export default styles(css, Threads)
