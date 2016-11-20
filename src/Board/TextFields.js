import React from 'react'
import { styles } from 'refire-app'
import { FormField, FormInput } from 'elemental'

const TextFields = ({
  visible,
  preview,
  inputRef,
  title,
  text,
  updateTitle,
  updateText,
  styles,
}) => {
  if (preview || !visible) {
    return <div />
  } else {
    return (
      <div>
        <FormField>
          <FormInput
            ref={inputRef}
            placeholder="New topic"
            value={title}
            onChange={updateTitle}
            className={styles.title}
          />
        </FormField>
        <FormField>
          <FormInput
            placeholder="Text (markdown enabled)"
            value={text}
            multiline
            onChange={updateText}
            className={styles.text}
          />
        </FormField>
      </div>
    )
  }
}

const css = {
  title: {},
  text: {},
}

export default styles(css, TextFields)
