import React from 'react'
import EditPost from './EditPost'
import { Card } from 'elemental'
import { FirebaseWrite, styles } from 'refire-app'
import { quote } from '../utils'


const ReplyToThread = ({
    user,
    threadKey,
    postKey,
    quote,
    locked,
    selectLastPage,
    styles,
    theme,
  }) => {

    if (!user || locked) return <div />
    return (
      <Card className={styles.container}>
        <EditPost
          buttonCaption={'Post'}
          showEdit={true}
          user={user}
          threadKey={threadKey}
          replyToKey={postKey}
          quote={quote}
          locked={locked}
          cancelable={false}
          editing={false}
          selectLastPage={selectLastPage}
          styles={theme.ReplyToThread}
          theme={theme}
        />
      </Card>
    )
  }


const css = {
  container: {},
  displayName: {},
  userProfile: {
    margin: "0 0 10px 0",
  },
  profileImage: {
    borderRadius: "20px",
    height: "40px",
    width: "40px",
    margin: "0 10px 0 0",
  },
  plusIcon: {
    marginRight: "10px",
  },
}

export default styles(
  css,
  FirebaseWrite({ method: "update" })(ReplyToThread)
)
