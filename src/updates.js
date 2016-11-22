import { firebase } from 'refire-app'
import includes from 'lodash/includes'

export function newThread({ boardId, link, imageUrl, title, description, text, user }) {
  const ref = firebase.database().ref()
  const threadKey = ref.child("threads").push().key
  const postKey = ref.child("posts").push().key
  let retval = {
    [`boards/${boardId}/threads/${threadKey}`]: true,
    [`posts/${postKey}`]: {
      body: text,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      threadId: threadKey,
      user: {
        displayName: user.displayName,
        image: user.profileImageURL,
        id: user.uid,
      },
    },
    [`users/${user.uid}/threadsStarted/${threadKey}`]: true,
    [`users/${user.uid}/posts/${postKey}`]: true,
  }
  if (link) {
    retval[`threads/${threadKey}`] = {
        title: title,
        boardId: boardId,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        lastPostAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          displayName: user.displayName,
          image: user.profileImageURL,
          id: user.uid,
        },
        posts: {
          [postKey]: true,
        },
        link: link,
    }
    if (description) {
      retval[`threads/${threadKey}`].description = description
    }
    if (imageUrl) {
      retval[`threads/${threadKey}`].imageUrl = imageUrl
    }
  } else {
      retval[`threads/${threadKey}`] = {
          title: title,
          boardId: boardId,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          lastPostAt: firebase.database.ServerValue.TIMESTAMP,
          user: {
            displayName: user.displayName,
            image: user.profileImageURL,
            id: user.uid,
          },
          posts: {
            [postKey]: true,
          },
        }
    }

    return retval
}

export function deleteThread({ threadKey, thread }) {
  const posts = Object.keys(thread.posts).reduce((paths, postId) => {
    return {
      ...paths,
      [`posts/${postId}`]: null,
      [`users/${thread.user.id}/posts/${postId}`]: null,
    }
  }, {})

  return {
    ...posts,
    [`threads/${threadKey}`]: null,
    [`boards/${thread.boardId}/threads/${threadKey}`]: null,
    [`users/${thread.user.id}/threadsStarted/${threadKey}`]: null,
  }
}

export function toggleThreadLocked({ threadKey, thread }) {
  return {
    [`threads/${threadKey}/locked`]: !thread.locked,
  }
}

export function replyToThread({ threadKey, text, replyToKey, user }) {
  const ref = firebase.database().ref()
  const postKey = ref.child("posts").push().key
  replyToKey = replyToKey === undefined ? null : replyToKey

  return {
    [`threads/${threadKey}/posts/${postKey}`]: true,
    [`threads/${threadKey}/lastPostAt`]: firebase.database.ServerValue.TIMESTAMP,
    [`posts/${postKey}`]: {
      body: text,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      threadId: threadKey,
      replyTo: replyToKey,
      user: {
        displayName: user.displayName,
        image: user.profileImageURL,
        id: user.uid,
      },
    },
    [`users/${user.uid}/posts/${postKey}`]: true,
  }
}

export function deletePost({ postKey, post }) {
  return {
    [`threads/${post.threadId}/posts/${postKey}`]: null,
    [`posts/${postKey}`]: null,
    [`users/${post.user.id}/posts/${postKey}`]: null,
  }
}

export function saveSetting({ userId, setting, value }) {
  return {
    [`users/${userId}/settings/${setting}`]: value,
  }
}

export function toggleUpvote({ postKey, post, user }) {
  const value = includes(Object.keys(post.value.likes || {}),user.uid) ? null : true
  return {
    [`posts/${postKey}/likes/${user.uid}`]: value,
    [`users/${user.uid}/likes/${postKey}`]: value,
  }
}

export function savePost({ postKey, post, text, user }) {
  return {
    [`posts/${postKey}`]: {
      body: text,
      createdAt: post.createdAt,
      threadId: post.threadId,
      replyTo: post.replyTo || null,
      user: post.user,
      edited: true,
      editedLast: firebase.database.ServerValue.TIMESTAMP,
      editedBy: user.uid,
    },
  }
}
