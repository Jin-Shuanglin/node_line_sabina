// 引用 linebot 套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'
// 讀取 .env 檔
dotenv.config()

// 宣告機器人的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
const date = new Date().getHours() + 8
let wait = false
const gethello = ['哈囉哈', '嘿', '嘿嘿', '哈囉', 'Yo', 'YO', 'yo', '早安', '早', '午安', '你好', '晚安', 'hello', 'Hello', 'hi', 'HI', 'Hi', '嗨']
const sendhello = ['找我有什麼事嗎？', '今天過得如何？', '你好嗎？']
const usertext = [['沒事，只是想聊天', '你在做什麼？', '有什麼八卦嗎？'], ['最棒的一天', '平凡的一天', '糟糕的一天'], ['很好啊！你呢？', '還不錯，你呢？', '不太好，你呢？']]
const robottext = [[['這樣啊！那你想聊什麼呢？'], ['我在讀《三十六計初級戰略》\n我是不推薦這本書啦！\n雖然它是初階\n但其實很難懂呢！', '我跟「果果」在櫻之島賞櫻\n真的很美很寧靜呢！\n有機會再一起邊賞櫻邊品茶吧！', '我在躲阿恰沙隊長\n她最近看到我就會考我《三十六計初級戰略》的內容\n要是被她發現我根本還沒看完就糟了'], ['傳說櫻之島住著一隻河童\n河童會給見到祂的人某樣東西\n不過沒有人知道是什麼', '醫務室的小菀跟妮妮雖然人怪怪的\n但醫術很厲害\n不過他們其實不是本地人\n而是來自人魚鎮\n似乎是在逃避什麼而來到村里', '你記得守門人「大野先生」嗎？\n就是上次差點把你打死的那位\n聽說他在單戀圖書館的管理員']],
  [['真是太好了！我也是\n今天沒有魔族襲擊\n對村裡來說是個平靜的一天\n而我則是跟果果一起到屋頂上看白雲', '真棒！你知道嗎？\n我今天去獵山豬，雖然過程艱辛\n不過最後還是順利擊倒\n晚餐的山豬很好吃呢！', '太好了！你知道嗎？\n今天雜貨店的老闆從星月鎮回來\n她帶了2支星月鎮餐廳的招牌紅酒來我們家\n真的很好喝呢！不愧是招牌'], ['是嗎？那我來說說我的日常吧！\n我的日常就是就是躲我母親\n雖然我理解她望女成鳳的心情\n但我實在對閱讀不在行呢！', '平凡的一天是嗎？其實有時候平凡的一天也是很棒的\n不曉得你是否能理解我的意思', '很不錯啊～至少不是糟糕的一天對吧！\n今天我嘗試挖了地洞\n明明才挖沒多少天就已經黑了\n不過我會持續努力的'], ['沒關係的！\n像我今天被一隻熊追著跑，很狼狽呢！\n不過總有一天我一定能打敗牠\n你也要加油喔！', '這樣啊～別氣餒\n每當我遇到糟糕的事時\n我都會想起我們造村者「咪咪」的名言\n「雖然我平時不強，但我只要在最後一刻強就行了」\n希望這句話對你有幫助', '我也是呢！今天我被瀧野隊長逮到\n上午是體能訓練\n下午則是阿恰沙隊長的戰略實際演練\n我已經身心俱疲\n需要先睡一覺\n改天聊囉！']],
  [['我也很好\n我在餐館吃綜合菇粥\n一如往常的美味', '還不錯\n只是被母親監督要讀完《基礎隱身術》才能出門', '我在朋友家閒聊\n順便更新村裡的八卦消息'], ['不好說呢！\n晚點要跟朋友去神社夜遊\n真心希望不會遇到鬼魂', '我很好\n那個小氣的餐館老闆今天居然請我吃蛋包飯\n說是為了要感謝果果幫他找出老鼠\n都是托果果的福', '我覺得累爆了\n今天的魔族襲擊事件比平常要難以應付\n看來我該多鍛鍊了'], ['人生不如意十之八九\n放寬心去睡一覺吧！我都是這樣過來的', '父親大人常跟我說「敵人不轉武器轉，武器不轉人轉」，希望你也能成功擊倒目標', '聽說吃了星月鎮的招牌蘋果派，再糟糕的心情都能瞬間變美麗\n有機會你一定要吃吃看']]]
const usertext2 = ['神社', '忍者村', '警備區', '櫻之島', '種植區', '夢想']
const robottext2 = ['神社是為了紀念忍者村過去的人們所建造的\n其中造村者「咪咪」\n一直到現在都還是村民們心中所憧憬的英雄', '忍者村雖然位於深山裡\n但是我們在世界的位置是最靠近魔域的\n因此常常有魔族襲擊事件\n另外深山裡還有其他野獸需要注意', '警備區是由瀧野及阿恰沙兩位隊長率領小隊\n負責巡邏忍者村的東邊與西邊各5公里內的範圍\n主要是確保忍者村的周圍安全', '櫻之島是個湖中島\n這裡的村民最常去的地方就是那裡\n算是忍者村的熱門景點', '忍者村一直都是自給自足，所以種植區非常重要\n主要是種植稻米和香菇，尤其是香菇\n受歡迎到連外地的商人都會來這裡買', '我的夢想是想像「咪咪」一樣\n成為櫻花一刀流的高手\n為此我必須多加鍛鍊才行']
// 當收到訊息時
bot.on('message', async (event) => {
  let message = ''
  let aa = []
  if (date >= 6 && date <= 21 && !wait) {
    for (let i = 0; i < gethello.length; i++) {
      if (event.message.text === gethello[i]) {
        const hello = random(sendhello)
        if (date >= 6 && date <= 11) {
          message = '早安～\n' + hello
        } else if (date >= 12 && date <= 18) {
          message = '午安～\n' + hello + date
        } else {
          message = '晚安～\n' + hello
        }
        if (hello === sendhello[0]) {
          aa = [
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[0][0],
                text: usertext[0][0]
              }
            },
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[0][1],
                text: usertext[0][1]
              }
            },
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[0][2],
                text: usertext[0][2]
              }
            }
          ]
        } else if (hello === sendhello[1]) {
          aa = [
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[1][0],
                text: usertext[1][0]
              }
            },
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[1][1],
                text: usertext[1][1]
              }
            },
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[1][2],
                text: usertext[1][2]
              }
            }
          ]
        } else {
          aa = [
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[2][0],
                text: usertext[2][0]
              }
            },
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[2][1],
                text: usertext[2][1]
              }
            },
            {
              type: 'button',
              height: 'md',
              action: {
                type: 'message',
                label: usertext[2][2],
                text: usertext[2][2]
              }
            }
          ]
        }
        event.reply([
          {
            type: 'text',
            text: message
          },
          {
            type: 'flex',
            altText: '莎鑌娜傳訊息給你',
            contents: {
              type: 'bubble',
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: '選擇回覆',
                    size: 'xxl',
                    align: 'center',
                    weight: 'bold'
                  }
                ]
              },
              footer: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: aa,
                flex: 0
              }
            }
          }
        ])
      }
    }
    for (let i = 0; i < usertext.length; i++) {
      for (let j = 0; j < robottext.length; j++) {
        if (event.message.text === usertext[i][j]) {
          if (event.message.text === usertext[0][0]) {
            for (let ut2 = 0; ut2 < usertext2.length; ut2++) {
              aa.push({
                type: 'button',
                height: 'md',
                action: {
                  type: 'message',
                  label: usertext2[ut2],
                  text: usertext2[ut2]
                }
              })
            }
            event.reply([
              {
                type: 'text',
                text: random(robottext[i][j])
              },
              {
                type: 'flex',
                altText: '莎鑌娜傳訊息給你',
                contents: {
                  type: 'bubble',
                  body: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: '選擇回覆',
                        size: 'xxl',
                        align: 'center',
                        weight: 'bold'
                      }
                    ]
                  },
                  footer: {
                    type: 'box',
                    layout: 'vertical',
                    spacing: 'sm',
                    contents: aa,
                    flex: 0
                  }
                }
              }
            ])
          } else {
            event.reply(
              {
                type: 'text',
                text: random(robottext[i][j])
              }
            )
            // wait = true
          }
        }
      }
    }
    for (let i = 0; i < usertext2.length; i++) {
      if (event.message.text === usertext2[i]) {
        event.reply(
          {
            type: 'text',
            text: robottext2[i]
          }
        )
      }
    }
  } else if (wait) {
    event.reply([
      {
        type: 'text',
        text: '很抱歉～\n我在忙！請一個小時後再與我聯絡'
      },
      {
        type: 'sticker',
        packageId: '11538',
        stickerId: '51626533'
      }
    ])
  } else {
    event.reply([
      {
        type: 'text',
        text: '我平常早上6點到晚上10點會在\n現在我要睡了\n晚安～'
      },
      {
        type: 'sticker',
        packageId: '11539',
        stickerId: '52114121'
      }
    ])
  }
})
// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
const random = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}
