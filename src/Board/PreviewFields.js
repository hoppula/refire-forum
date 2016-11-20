import React from 'react'
import { styles } from 'refire-app'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../App/CodeBlock'

const PreviewFields = ({
  preview,
  visible,
  title,
  text,
  styles,
}) => {
  if (preview && visible) {
    if (!title.length && !text.length) {
      return (
        <div>
          <h3 className={styles.titlePreview}>
            Nothing to preview yet
          </h3>
        </div>
      )
    }

    return (
      <div>
        <h3 className={styles.titlePreview}>
          {title}
        </h3>
        <div className={styles.textPreview}>
          <ReactMarkdown
            escapeHtml={true}
            source={text}
            renderers={
              {
                ...ReactMarkdown.renderers,
                ...{ CodeBlock },
              }
            }
          />
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

const css = {
  titlePreview: {
    padding: "10px 0 10px 0",
  },
  textPreview: {
    "& p": {
      margin: "0 0 30px 0",
    },
  },
}

export default styles(css, PreviewFields)
