import React, { Component } from 'react'
import { styles } from 'refire-app'
import { Card, Row, Col } from 'elemental'
import LockIcon from 'react-icons/lib/fa/lock'
import FAComment from 'react-icons/lib/fa/comment'

import ReplyToThread from './ReplyToThread'
import Posts from './Posts'
import ShowPagination from './ShowPagination'
import DeleteDialog from './DeleteDialog'
import LockDialog from './LockDialog'
import DeletePostDialog from './DeletePostDialog'
import TopToolbar from './TopToolbar'
import DeleteButton from './DeleteButton'
import LockButton from './LockButton'

class Thread extends Component {

  render() {
    const {
      threadKey,
      thread,
      posts,
      settings,
      pagedPosts,
      user,
      isAdmin,
      styles,
      theme,
      state: {
        currentPage,
        deleteDialogVisible,
        deletePostDialogVisible,
        lockDialogVisible,
        postKey,
        quote,
      },
      stateSetters: {
        deletePost,
        deleteThread,
        handlePageSelect,
        hideDeleteDialog,
        hideDeletePostDialog,
        hideLockDialog,
        selectLastPage,
        showDeleteDialog,
        showDeletePostDialog,
        showLockDialog,
        toggleLocked,
        updateQuote,
        toggleUpvote,
        saveEditedPost,
      },
    } = this.props
    const { THREAD_PAGE_SIZE, THREAD_PAGE_LIMIT } = settings
    const locked = thread.locked
      ? <LockIcon size="22px" />
      : <span />
    const image = thread.link
      ? <a href={thread.link}><img
          src={thread.imageUrl}
          className={styles.image}
          width={thread.imageWidth || '125px'}
        /></a>
      : <FAComment
          size="100px"
          color="#eeeeee"
          className={styles.comment}
        />
      const titleTag = thread.title.length > 30
        ? <h3 className={styles.header}>
            <a href={thread.link}>{thread.title}</a>
          </h3>
        : <h2 className={styles.header}>
            <a href={thread.link}>{thread.title}</a>
          </h2>
    return (
      <div>
        <DeleteDialog
          visible={deleteDialogVisible}
          hide={hideDeleteDialog}
          save={deleteThread}
          title={thread.title}
          styles={theme.DeleteDialog}
        />
        <LockDialog
          visible={lockDialogVisible}
          hide={hideLockDialog}
          save={toggleLocked}
          title={thread.title}
          locked={thread.locked}
          styles={theme.LockDialog}
        />
        <DeletePostDialog
          visible={deletePostDialogVisible}
          hide={hideDeletePostDialog}
          save={deletePost}
          styles={theme.DeletePostDialog}
        />
        <Card className={styles.container}>
          <div className={styles.paginationContainer}>
            <div className={styles.headerContainer}>
              <div className={styles.lockContainer}>
                {locked}
              </div>
              <Row>
                <Col sm="1/4">
                  {image}
                </Col>
                <Col sm="3/4">
                  <Row>
                    {titleTag}
                  </Row>
                  <Row>
                    {thread.description}
                  </Row>
                </Col>
              </Row>
            </div>
            <TopToolbar
              isAdmin={isAdmin}
              posts={posts}
              pageSize={THREAD_PAGE_SIZE}>
              <ShowPagination
                currentPage={currentPage}
                handlePageSelect={handlePageSelect}
                posts={posts}
                pageSize={THREAD_PAGE_SIZE}
                pageLimit={THREAD_PAGE_LIMIT}
              />
              <div className={styles.buttonsContainer}>
                <DeleteButton
                  visible={isAdmin}
                  confirmDelete={showDeleteDialog}
                />
                <LockButton
                  visible={isAdmin}
                  locked={thread.locked}
                  confirmLockedChange={showLockDialog}
                />
              </div>
            </TopToolbar>
          </div>
          <Posts
            posts={pagedPosts}
            deletePost={showDeletePostDialog}
            updateQuote={updateQuote}
            toggleUpvote={toggleUpvote}
            saveEditedPost={saveEditedPost}
            user={user}
            locked={thread.locked}
            isAdmin={isAdmin}
            theme={theme}
          />
          <div className={styles.paginationContainer}>
            <ShowPagination
              currentPage={currentPage}
              handlePageSelect={handlePageSelect}
              posts={posts}
              pageSize={THREAD_PAGE_SIZE}
              pageLimit={THREAD_PAGE_LIMIT}
            />
          </div>
        </Card>

        <ReplyToThread
          user={user}
          threadKey={threadKey}
          postKey={postKey}
          quote={quote}
          locked={thread.locked}
          selectLastPage={selectLastPage}
          styles={theme.ReplyToThread}
          theme={theme}
        />
      </div>
    )
  }
}

const css = {
  image: {
    margin: "10px",
  },
  comment: {
    margin: "10px",
  },
  container: {},
  headerContainer: {
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: "#eeeeee",
    marginBottom: "1em",
  },
  header: {
    minHeight: "28px",
    margin: "0em 0 1em 0",
    display: "inline-block",
  },
  lockContainer: {
    display: "inline-block",
    verticalAlign: "top",
    paddingTop: "4px",
    paddingRight: "5px",
  },
  paginationContainer: {
    position: "relative",
    minHeight: "32px",
  },
  buttonsContainer: {
    display: "inline-block",
  },
}

export default styles(css, Thread)
