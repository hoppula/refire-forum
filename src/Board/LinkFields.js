import React from 'react'
import { styles } from 'refire-app'
import { FormField, FormInput, Row, Col , Button, InputGroup } from 'elemental'
import LinkDisplay from './LinkDisplay'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../App/CodeBlock'

const LinkFields = ({
  visible,
  preview,
  loadingLink,
  loadedLink,
  inputRef,
  link,
  text,
  updateTitle,
  updateText,
  validateLink,
  scrapeLink,
  imageUrl,
  imageHeight,
  imageWidth,
  title,
  description,
  styles,
}) => {
  let op
  if (!preview) {
    op = (
      <FormField>
        <FormInput
          placeholder="OP Comment (markdown enabled)"
          value={text}
          multiline
          onChange={updateText}
          className={styles.text}
        />
      </FormField>
    )
  } else {
    op = (
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
    )
  }

  if (!visible) {
    return (<div></div>)
  } else {
    return (
      <div>
       <Row>
         <Col>
          <FormField>
            <InputGroup contiguous>
  	         <InputGroup.Section grow>
                <FormInput
                  ref={inputRef}
                  placeholder="Link"
                  onChange={validateLink}
                  className={styles.link}
                />
              </InputGroup.Section>
              <InputGroup.Section>
                <Button onClick={scrapeLink}>Go</Button>
              </InputGroup.Section>
            </InputGroup>
          </FormField>
        </Col>
      </Row>
      <Row>
       <Col sm="1/2">
         <LinkDisplay
            loadingLink={loadingLink}
            loadedLink={loadedLink}
            link={link}
            imageUrl={imageUrl}
            imageHeight={imageHeight}
            imageWidth={imageWidth}
            title={title}
            description={description}
         />
       </Col>
       <Col sm="1/2">
       <FormField>
         <FormInput
           ref={inputRef}
           placeholder="Link Title"
           value={title}
           onChange={updateTitle}
           className={styles.topic}
         />
       </FormField>
        {op}
        </Col>
       </Row>
      </div>
    )
  }
}


const css = {
  link: {},
  text: {
    height: "100%",
  },
}

export default styles(css, LinkFields)
