const bgColor = "#333"
const textColor = "#999"
const buttonBgColor = "#000"
const buttonTextColor = "#fff"
const linkColor = "#fff"

const buttonStyles = {
  background: buttonBgColor,
  border: `1px solid ${bgColor}`,
  color: buttonTextColor,
  textShadow: "none",
  "&:hover": {
    background: bgColor,
    border: "1px solid #555",
    color: linkColor,
  },
}

const linkStyles = {
  color: linkColor,
  "&:hover, &:active, &:focus": {
    color: linkColor,
  },
}

const dialogStyles = {
  container: {
    "& .Modal-content": {
      backgroundColor: bgColor,
    },
  },
  modal: {
    background: bgColor,
    color: textColor,
  },
}

export default {
  App: {
    App: {
      ":global": {
        body: {
          background: "#000",
        },
      },
    },
    Footer: {
      container: {
        background: bgColor,
        color: textColor,
      },
    },
    TopBar: {
      topBarContainer: {
        background: "#000",
      },
      link: linkStyles,
    },
    AuthenticationButton: {
      button: buttonStyles,
    },
    SettingsButton: {
      button: buttonStyles,
    },
    UserSettings: {
      ...dialogStyles,
    },
  },
  Categories: {
    Categories: {
      category: {
        background: bgColor,
      },
      header: {
        color: textColor,
      },
    },
    Boards: {
      link: linkStyles,
    },
  },
  Board: {
    Board: {
      container: {
        background: bgColor,
      },
      header: {
        color: textColor,
      },
    },
    BoardSettings: {
      ...dialogStyles,
    },
    Thread: {
      title: linkStyles,
      threadContainer: {
        color: linkColor,
      },
    },
    Threads: {
      noThreadsYet: {
        color: textColor,
      },
    },
    SettingsButton: {
      button: buttonStyles,
    },
    NewThreadButton: {
      button: buttonStyles,
    },
    PostNewThread: {
      container: {
        background: bgColor,
      },
      displayName: {
        color: linkColor,
      },
    },
    PreviewFields: {
      topicPreview: {
        color: linkColor,
      },
      textPreview: {
        color: linkColor,
      },
    },
    TextFields: {
      topic: {
        background: bgColor,
        color: linkColor,
      },
      text: {
        background: bgColor,
        color: linkColor,
      },
    },
  },
  Profile: {
    Profile: {
      container: {
        background: bgColor,
        color: linkColor,
      },
      header: {
        color: textColor,
      },
    },
    ThreadsStarted: {
      threadLink: linkStyles,
    },
  },
  Thread: {
    Thread: {
      container: {
        background: bgColor,
      },
      header: {
        color: textColor,
      },
      lockContainer: {
        color: linkColor,
      },
    },
    ReplyToThread: {
      container: {
        background: bgColor,
      },
      displayName: {
        color: textColor,
      },
    },
    PreviewFields: {
      textPreview: {
        color: linkColor,
      },
    },
    TextFields: {
      text: {
        background: bgColor,
        color: linkColor,
      },
    },
    Post: {
      container: {
        background: "#444",
      },
      bodyContainer: {
        color: linkColor,
      },
      nameContainer: {
        color: linkColor,
      },
      postDate: {
        color: linkColor,
      },
    },
    DeletePostButton: {
      button: {
        color: linkColor,
      },
    },
    ReplyButton: {
      button: {
        color: linkColor,
      },
    },
    QuoteButton: {
      button: {
        color: linkColor,
      },
    },
    DeletePostDialog: {
      ...dialogStyles,
    },
    DeleteDialog: {
      ...dialogStyles,
    },
    LockDialog: {
      ...dialogStyles,
    },
  },
}
