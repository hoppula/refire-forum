import React, { Component } from 'react'
import { Button, Card, Form } from 'elemental'
import { FirebaseWrite, styles } from 'refire-app'
import PlusIcon from 'react-icons/lib/fa/plus'

import { replaceEmojis } from '../utils'
import { newThread } from '../updates'

import PreviewButton from '../App/PreviewButton'
import PreviewFields from './PreviewFields'
import LinkFields from './LinkFields'
import TextFields from './TextFields'

const maxTitleLength = 80

function jsonp(url, callback) {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random())
    window[callbackName] = function(data) {
        delete window[callbackName]
        document.body.removeChild(script)
        callback(data)
    }

    const script = document.createElement('script')
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName
    document.body.appendChild(script)
}

class NewThread extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      topic: "",
      title: "",
      text: "",
      link: "",
      imageUrl: "",
      imageHeight: "",
      imageWidth: "",
      previewEnabled: false,
      loadedLink: false,
      loadingLink: false,
      showLinkFields: false,
      showTextFields: false,
    }
  }

  submit = (event) => {
    event.preventDefault()
    const { user, boardId, submit, showNewThreads } = this.props

    const update = this.state.showLinkFields ?
      newThread({
        boardId,
        user,
        title: this.state.title,
        description: this.state.description,
        link: this.state.link,
        imageUrl: this.state.imageUrl,
        text: this.state.text,
      }) :
      newThread({
        boardId,
        user,
        topic: this.state.topic,
        text: this.state.text,
      })

    submit(update).then(() => {
      showNewThreads()
    })

    this.setState({
      showLinkFields: false,
      showTextFields: false,
      link: "",
      title: "",
      imageUrl: "",
      topic: "",
      text: "",
    })
  }

  updateField = (field) => {
    return (event) => {
       event.preventDefault()
       const value = field === 'topic' || field === 'title'
        ? event.target.value.substring(0, maxTitleLength)
        : event.target.value

       this.setState({ [field]: replaceEmojis(value) })
    }
  }

  validateLink = () => {
    return (event) => {
      //event.preventDefault()
      // TODO check regex to see if entered text is valid url
      if (event.target.value) {
        this.setState({
          validLinkEntered: true,
          link: event.target.value,
        })
      }
    }
  }

  scrapeLink = () => {
    this.setState({
      loadingLink: true,
      loadedLink: false,
    })

    let yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('SELECT * FROM html WHERE url = ') + '%27' + encodeURIComponent(this.state.link) +  '%27' + encodeURIComponent(' AND xpath=') + '%27' + encodeURIComponent('descendant-or-self::meta') + '%27' + '&format=json&diagnostics=true'

    const _this = this

    jsonp(yql, function(o) {
       const items = o.query.results.meta
       const no_items=items.length
       let title ='', link, imageUrl, description
       for(let i=0;i<no_items;i++) {
         if (items[i].property === 'og:title') {
           title = items[i].content
         }
         if (items[i].property === 'og:url') {
           link = items[i].content
         }
         if (items[i].property === 'og:image') {
           imageUrl = items[i].content
         }
         if (items[i].property === 'og:description') {
           description = items[i].content
         }
       }

       _this.setState({
         title: title.substring(0,maxTitleLength),
         link: link,
         imageUrl: imageUrl,
         description: description,
         loadingLink: false,
         loadedLink: true,
       })
     })
  }

  togglePreview = () => {
    this.setState({ previewEnabled: !this.state.previewEnabled })
  }

  showLinkPanel = () => {
    this.setState({
      showLinkFields: true,
      showTextFields: false,
      previewEnabled: false,
      title: "",
      text: "",
      link: "",
      imageUrl: "",
      description: "",
    })
  }

  showTextPanel = () => {
    this.setState({
      showLinkFields: false,
      showTextFields: true,
      previewEnabled: false,
      topic: "",
      text: "",
      link: "",
      imageUrl: "",
      description: "",
    })
  }

  render() {
    const { user, styles, theme, inputRef } = this.props
    const submitEnabled = ((this.state.topic || this.state.title) && this.state.text)

    const buttons = this.state.showLinkFields || this.state.showTextFields ?
    (<div><Button
      disabled={!submitEnabled}
      type="success"
      onClick={this.submit}
      >
        <PlusIcon
          className={styles.plusIcon}
          /> Post new thread
      </Button>
      <PreviewButton
        enabled={this.state.previewEnabled}
        togglePreview={this.togglePreview}
      /></div>) :
      ( <div></div> )

    if (!user) return <div />
    return (
      <Card className={styles.container}>
        <span className={styles.userProfile}>
          <img
            className={styles.profileImage}
            src={user.profileImageURL}
          />
          <strong className={styles.displayName}>
            {user.displayName}
          </strong>
        </span>
        <span>
          <span className={styles.postNewSpan}>Post new:</span>
          <Button
            type="link-primary"
            onClick={this.showLinkPanel}
          >Link</Button>
          <Button
            type="link-primary"
            onClick={this.showTextPanel}
          >Text</Button>
        </span>
        <Form>
          <LinkFields
            preview={this.state.previewEnabled}
            visible={this.state.showLinkFields}
            inputRef={inputRef}
            link={this.state.link}
            title={this.state.title}
            description={this.state.description}
            imageUrl={this.state.imageUrl}
            text={this.state.text}
            updateText={this.updateField("text")}
            updateTitle={this.updateField("title")}
            validateLink={this.validateLink()}
            scrapeLink={this.scrapeLink}
            loadingLink={this.state.loadingLink}
            loadedLink={this.state.loadedLink}
            styles={theme.TextFields}
          />
          <TextFields
            visible={this.state.showTextFields}
            preview={this.state.previewEnabled}
            inputRef={inputRef}
            topic={this.state.topic}
            text={this.state.text}
            updateTopic={this.updateField("topic")}
            updateText={this.updateField("text")}
            styles={theme.TextFields}
          />
          <PreviewFields
            preview={this.state.previewEnabled}
            visible={this.state.showTextFields}
            topic={this.state.topic}
            text={this.state.text}
            styles={theme.PreviewFields}
          />
          {buttons}
        </Form>
      </Card>
    )
  }
}

const css = {
  container: {},
  postNewSpan: {
    marginLeft: "20px",
  },
  userProfile: {
    margin: "0 0 10px 0",
  },
  profileImage: {
    borderRadius: "20px",
    height: "40px",
    width: "40px",
    margin: "0 10px 0 0",
  },
  displayName: {},
  plusIcon: {
    marginRight: "10px",
  },
}

export default styles(
  css,
  FirebaseWrite({ method: "update" })(NewThread),
)
