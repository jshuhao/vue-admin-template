import moment from "moment"

import {
  notification
} from 'ant-design-vue'

import {
  axios
} from "./request"


export const permissionList = ['sl', 'zdy']

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    (event) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function getAssignTimeScope(scope = 15) {
  const timeArr = []
  const fillArr = Array(scope).fill(0)
  for (let item of fillArr.keys()) {
    const currentTime = moment(moment.now()).subtract(item, 'days').format('YYYY-MM-DD')
    timeArr.push(currentTime)
  }
  return timeArr
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}


export function openNotification({
  type = 'success',
  message = '',
  description = ''
} = {}) {
  notification[type]({
    key: 'updatable',
    message,
    description,
    // icon: function (h) {
    // 	console.log()
    //   return h('a-icon', {
    //     props: {
    // 			type:'smile'
    // 		}
    //   },)
    // }
  });
}

export function debounce(fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  var delay = delay || 200;
  return function () {
    var args = arguments;
    var that = this;
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, args)
    }, delay);
  }
}


export async function requestAxios({
  url = '',
  method = 'post',
  data = {}
} = {}) {
  const keyName = method === 'post' ? 'data' : 'params'
  const res = await axios({
    url,
    method,
    [keyName]: data
  })
  if (res.code === 0) {
    return Promise.resolve(res)
  } else {
    openNotification({
      type: 'error',
      message: res.message,
    })
    return Promise.reject(res)
  }
}