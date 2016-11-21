import React, { Component } from 'react'
import { styles } from 'refire-app'
import { Card } from 'elemental'
import sortBy from 'lodash/sortBy'
import drop from 'lodash/drop'
import take from 'lodash/take'
import find from 'lodash/find'
import { isUserAdmin } from '../utils'

import NewThreadsAvailable from './NewThreadsAvailable'
import NewThreadButton from './NewThreadButton'
import PostNewThread from './PostNewThread'
import Threads from './Threads'
import ShowPagination from './ShowPagination'
import SettingsButton from './SettingsButton'
import BoardSettings from './Settings'

class Board extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1,
      threads: null,
      settingsVisible: false,
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.focusNewThread = this.focusNewThread.bind(this)
    this.showNewThreads = this.showNewThreads.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
  }

  componentWillMount() {
    if (this.props.boardThreads) {
      this.setState({ threads: this.props.boardThreads })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boardThreads) {
      if (this.state.threads) {
        const nextThreads = nextProps.boardThreads
        this.setState({
          threads: this.state.threads.reduce((result, thread) => {
            const nextThread = find(nextThreads, (next) => thread.key === next.key)
            if (nextThread && nextThread.value) {
                // update only posts count
                // TODO: update timestamp, but how to keep the sorting?
                return [
                  ...result,
                  {
                    ...thread,
                    value: {
                      ...thread.value,
                      posts: nextThread.value.posts,
                    },
                  },
                ]
            } else {
              return result
            }
          }, []),
        })
      } else {
        this.setState({
          threads: nextProps.boardThreads,
        })
      }
    }
  }

  handlePageSelect(page) {
    this.setState({ currentPage: page })
  }

  focusNewThread() {
    if (this.titleInput) {
      this.titleInput.focus()
    }
  }

  showNewThreads() {
    this.setState({
      threads: this.props.boardThreads,
      currentPage: 1,
    })
  }

  toggleSettings() {
    this.setState({
      settingsVisible: !this.state.settingsVisible,
    })
  }

  render() {
    const {
      adminUsers,
      boardId,
      board,
      boardThreads,
      settings,
      user,
      styles,
      theme,
    } = this.props
    const { BOARD_PAGE_SIZE } = settings
    const threads = this.state.threads || []
    const isAdmin = isUserAdmin(adminUsers, user)

    const pagedThreads = take(
      drop(
        sortBy(
          threads,
          (thread) => (thread.value || {}).lastPostAt
        ).reverse(),
        (this.state.currentPage - 1) * BOARD_PAGE_SIZE
      ),
      BOARD_PAGE_SIZE
    )

    return (
      <div>
        <BoardSettings
          visible={this.state.settingsVisible}
          toggleVisible={this.toggleSettings}
          styles={theme.BoardSettings}
        />
        <Card className={styles.container}>
          <div className={styles.headerContainer}>
            <h2 className={styles.header}>
              {board.title}
            </h2>
            <div className={styles.buttonsContainer}>
              <SettingsButton
                visible={isAdmin}
                toggleVisible={this.toggleSettings}
                styles={theme.SettingsButton}
              />
              <NewThreadButton
                user={user}
                newThread={this.focusNewThread}
                styles={theme.NewThreadButton}
              />
            </div>
          </div>
          <NewThreadsAvailable
            threads={threads}
            nextThreads={boardThreads}
            showNewThreads={this.showNewThreads}
          />
          <Threads
            boardId={boardId}
            threads={pagedThreads}
            loaded={!!boardThreads}
            theme={theme}
            styles={theme.Threads}
          />
          <ShowPagination
            currentPage={this.state.currentPage}
            handlePageSelect={this.handlePageSelect}
            threads={threads}
            pageSize={BOARD_PAGE_SIZE}
          />
        </Card>
        <PostNewThread
          boardId={boardId}
          user={user}
          inputRef={(input) => { this.titleInput = input}}
          showNewThreads={this.showNewThreads}
          styles={theme.PostNewThread}
          theme={theme}
        />
      </div>
    )
  }
}

const css = {
  container: {},
  buttonsContainer: {
    "@media (min-width: 480px)": {
      position: "absolute",
      right: "0px",
      top: "0px",
    },
  },
  headerContainer: {
    position: "relative",
  },
  header: {
    minHeight: "28px",
    "@media (min-width: 480px)": {
      display: "inline-block",
    },
  },
}

export default styles(css, Board)
