import emojilib from 'emojilib'
import includes from 'lodash/includes'
import moment from 'moment'

const emojis = Object.keys(emojilib.lib).reduce((result, key) => {
  result[key] = result[key] || emojilib.lib[key].char
  emojilib.lib[key].keywords.forEach(keyword => {
    result[keyword] = result[keyword] || emojilib.lib[key].char
  })
  return result
}, {})

export function replaceEmojis(str) {
  const re = /\:(\w+)\:/g
  return (str.match(re) || []).reduce((str, match) => {
    const keyword = match.replace(/\:/g,"")
    if (emojis[keyword]) {
      return str.replace(match, emojis[keyword])
    } else {
      return str
    }
  }, str)
}

export function quote(str) {
  if (str === "") return str
  return "> ".concat(str).split("\n").join("\n> ").concat("\n\n")
}

export function isUserAdmin(adminUsers, user) {
  return includes(
    (adminUsers || { value: [] }).value.map((user) => user.key),
    (user || {}).uid
  )
}

export function momentLocaleSetup() {
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s: '<1m',
      ss: '%ss',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1m',
      MM: '%dM',
      y: '1y',
      yy: '%dY',
    },
  })
}

export function fromNow(timestamp) {
  const momentTime = moment(timestamp, "x")
  if (moment().diff(momentTime, 'years') >= 1) {
    return momentTime.format('MMM \'YY')
  } else if (moment().diff(momentTime, 'days') >= 14) {
    return momentTime.format('MMM D')
  } else {
    return momentTime.fromNow()
  }
}
