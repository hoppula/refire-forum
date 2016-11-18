import React from 'react'
import { styles } from 'refire-app'
import { Spinner, Row, Col, Card } from 'elemental'
import FAChain from 'react-icons/lib/fa/chain'

const LinkDisplay = ({
  loadingLink,
  loadedLink,
  imageUrl,
  imageHeight,
  imageWidth,
  title,
  description,
  styles,
}) => {
  if (loadingLink) {
    return (
      <div>
        <Spinner size="md" className={styles.spinner}/>
      </div>
    )
  } else if (!loadedLink) {
    return (
    <Card>
      <Row>
        <Col sm="1/3">
          <FAChain
            size="100px"
            color="#eeeeee"
            className={styles.chain}
          />
        </Col>
        <Col sm="2/3">
          <Row>
            <div className={styles.noTitle}>&nbsp;</div>
          </Row>
          <Row>
            <div className={styles.noDescription}>&nbsp;</div>
          </Row>
        </Col>
      </Row>
    </Card>
   )
  } else {
    return (
      <Card>
        <Row>
          <Col sm="1/3" className={styles.box}>
            <a href={imageUrl}>
              <img
                className={styles.image}
                src={imageUrl}
                height={imageHeight}
                width={imageWidth || '125px'}>
              </img>
            </a>
          </Col>
          <Col sm="2/3" className={styles.box}>
            <Row>
              <div className={styles.title}>{title}</div>
            </Row>
            <Row>
              <div className={styles.description}>{description}</div>
            </Row>
          </Col>
        </Row>
      </Card>
    )
  }
}

const css = {
  link: {
  },
  chain: {
    marginTop: "20px",
  },
  image: {
    border: "1px",
  },
  title: {
    margin: "0 10px 10px 0",
    fontWeight: "bold",
    width: "100%",
  },
  noTitle: {
    margin: "0 10px 10px 0",
    background: "#eeeeee",
    minHeight: "2.0em",
    width: "100%",
  },
  noDescription: {
    margin: "0 10px 10px 0",
    background: "#eeeeee",
    minHeight: "6em",
    width: "100%",
  },
  description: {},
  text: {},
  box: {
    minHeight: "8em",
  },
  spinner: {
    display: "block",
    margin: "auto",
  },
}

export default styles(css, LinkDisplay)
