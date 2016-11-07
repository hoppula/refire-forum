import React from 'react'
import { styles } from 'refire-app'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../App/CodeBlock'

const PostBody = ({
      post,
      hide,
      styles,
    }) => {

  if (hide || !post) {
    return ( <div></div> )
  } else {
    return (
      <div
        className={styles.bodyContainer}>
        <ReactMarkdown
          className={styles.markdown}
          escapeHtml={true}
          source={post.body}
          renderers={
            {
              ...ReactMarkdown.renderers,
              ...{ CodeBlock },
            }
          }
        />
      </div>
    )
  }
}

const css = {
  bodyContainer: {
    margin: "0 0 10px 0",
  },

}

export default styles(css, PostBody)
