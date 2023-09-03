module.exports.config = {
  name: 'setmoney',
  version: '1.0.0',
  hasPermssion: 3,
  credits: 'CatalizCS',
  description: 'Điều chỉnh thông tin của người dùng',
  commandCategory: 'system',
  usages: '[add/set/clean] [Số tiền] [Tag người dùng]',
  cooldowns: 5,
  dependencies: { axios: '' },
}

module.exports.run = async function ({ event, api, Currencies, args }) {
  const { threadID, messageID, senderID } = event
  /*if (!global.paid || !global.paid[global.config.keyActive].setmoney) {
    return api.sendMessage(
      '[ Donate System ] Bạn chưa kích hoạt module!',
      threadID,
      messageID
    )
  }*/
  const { throwError } = global.utils
  const mentionID = Object.keys(event.mentions),
    money = parseInt(args[1])
  var message = [],
    error = []
  switch (args[0]) {
    case 'add': {
      if (mentionID.length != 0) {
        for (singleID of mentionID) {
          if (!money || isNaN(money)) {
            return throwError(this.config.name, threadID, messageID)
          }
          try {
            await Currencies.increaseMoney(singleID, money)
            message.push(singleID)
          } catch (_0x16d2f3) {
            error.push(_0x16d2f3)
            console.log(_0x16d2f3)
          }
        }
        return api.sendMessage(
          '[Money] Đã cộng thêm ' +
            money +
            '$ cho ' +
            message.length +
            ' người',
          threadID,
          function () {
            if (error.length != 0) {
              return api.sendMessage(
                '[Error] Không thể thể cộng thêm tiền cho ' +
                  error.length +
                  ' người!',
                threadID
              )
            }
          },
          messageID
        )
      } else {
        if (!money || isNaN(money)) {
          return throwError(this.config.name, threadID, messageID)
        }
        try {
          await Currencies.increaseMoney(senderID, money)
          message.push(senderID)
        } catch (_0x9440c6) {
          error.push(_0x9440c6)
        }
        return api.sendMessage(
          '[Money] Đã cộng thêm ' + money + '$ cho bản thân',
          threadID,
          function () {
            if (error.length != 0) {
              return api.sendMessage(
                '[Error] Không thể thể cộng thêm tiền cho bản thân!',
                threadID
              )
            }
          },
          messageID
        )
      }
    }
    case 'set': {
      if (mentionID.length != 0) {
        for (singleID of mentionID) {
          if (!money || isNaN(money)) {
            return throwError(this.config.name, threadID, messageID)
          }
          try {
            const _0x11c9aa = { money: money }
            await Currencies.setData(singleID, _0x11c9aa)
            message.push(singleID)
          } catch (_0x274eda) {
            error.push(_0x274eda)
          }
        }
        return api.sendMessage(
          '[Money] Đã set thành công ' +
            money +
            '$ cho ' +
            message.length +
            ' người',
          threadID,
          function () {
            if (error.length != 0) {
              return api.sendMessage(
                '[Error] Không thể set tiền cho ' + error.length + ' người!',
                threadID
              )
            }
          },
          messageID
        )
      } else {
        if (!money || isNaN(money)) {
          return throwError(this.config.name, threadID, messageID)
        }
        try {
          const _0x5eb1bf = { money: money }
          await Currencies.setData(senderID, _0x5eb1bf)
          message.push(senderID)
        } catch (_0x44bf22) {
          error.push(_0x44bf22)
        }
        return api.sendMessage(
          '[Money] Đã set thành công ' + money + '$ cho bản thân',
          threadID,
          function () {
            if (error.length != 0) {
              return api.sendMessage(
                '[Error] Không thể set tiền cho bản thân!',
                threadID
              )
            }
          },
          messageID
        )
      }
    }
    case 'clean': {
      if (mentionID.length != 0) {
        for (singleID of mentionID) {
          try {
            await Currencies.setData(singleID, _0x181992)
            message.push(singleID)
          } catch (_0x523be7) {
            error.push(_0x523be7)
          }
        }
        return api.sendMessage(
          '[Money] Đã xóa thành công toàn bộ tiền của ' +
            message.length +
            ' người',
          threadID,
          function () {
            if (error.length != 0) {
              return api.sendMessage(
                '[Error] Không thể xóa toàn bộ tiền của ' +
                  error.length +
                  ' người!',
                threadID
              )
            }
          },
          messageID
        )
      } else {
        try {
          await Currencies.setData(senderID, _0x2766de)
          message.push(senderID)
        } catch (_0x2dfacd) {
          error.push(_0x2dfacd)
        }
        return api.sendMessage(
          '[Money] Đã xóa thành công tiền của cho bản thân',
          threadID,
          function () {
            if (error.length != 0) {
              return api.sendMessage(
                '[Error] Không thể xóa toàn bộ tiền của bản thân!',
                threadID
              )
            }
          },
          messageID
        )
      }
    }
    default: {
      return global.utils.throwError(this.config.name, threadID, messageID)
    }
  }
}
