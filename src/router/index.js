import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Account from '@/pages/account/Account'
import Login from '@/pages/account/components/Login'
import Register from '@/pages/account/components/Register'
import Personal from '@/pages/personal/Personal'
import ShoppingCar from '@/pages/shoppingCar/ShoppingCar'
import Commodity from '@/pages/commodity/Commodity'
import CollocetionPage from '@/pages/collocetion/CollocetionPage'
import SeahFrame from 'component/seach/seachFrame'
import SeachInterface from '@/pages/seach/SeachInterface'
import Dialogue from '@/pages/dialogue/Dialogue'
import DialogueBox from 'component/dialogueBox/DialogueBox'
import Order from '@/pages/order/Order'
import OrderPay from '@/pages/order/components/OrderPay'
import OrderReceiv from '@/pages/order/components/OrderReceiv'
import OrderEvaluate from '@/pages/order/components/OrderEvaluate'
import PasswordBtn from 'component/passwordBtn/PasswordBtn'
import EmitAddress from 'component/emitAddress/EmitAddress'
import orderDetalis from 'component/orderDetalis/orderDetalis'
import AddFriend from 'component/addFriend/AddFriend'
import PrivateInterFace from 'component/privateInterFace/PrivateInterFace'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        index: 0,
        keepAlive: false
      },
      component: Home
    }, {
      path: '/dialogue&user=' + ':userId',
      name: 'Dialogue',
      meta: {
        keepAlive: false,
        index: 1
      },
      component: Dialogue,
      children: [{
        name: 'DialogueBox',
        path: 'objectUserId=' + ':objectUserId' + '/dialogueBox',
        component: DialogueBox,
        meta: {
          keepAlive: true,
          index: 3
        }
      }, {
        path: 'AddFriend',
        name: 'AddFriend',
        meta: {
          keepAlive: true,
          index: 12
        },
        component: AddFriend
      }]
    }, {
      path: '/personal/user=:UserId',
      name: 'Personal',
      meta: {
        keepAlive: true,
        index: 2
      },
      component: Personal,
      children: [{
        path: 'shoppingCar',
        name: 'ShoppingCar',
        meta: {
          keepAlive: false,
          index: 4
        },
        component: ShoppingCar,
        children: [{
          path: 'passwordBtn/action=:action',
          name: 'OrderPayPasswordBtn',
          meta: {
            keepAlive: true,
            index: 16
          },
          component: PasswordBtn
        }, {
          path: 'orderDetalis/payId=:payId',
          name: 'orderDetalis',
          meta: {
            keepAlive: true,
            index: 17
          },
          component: orderDetalis,
          children: [{
            path: 'EmitAddress',
            name: 'EmitAddress',
            meta: {
              keepAlive: true,
              index: 19
            },
            component: EmitAddress
          }]
        }]
      }, {
        path: 'collocetion/collocetionId=:collocetionId',
        name: 'CollocetionPage',
        meta: {
          keepAlive: false,
          index: 5
        },
        component: CollocetionPage
      }, {
        path: 'commodityId=:commodityId',
        name: 'CollocetionPageCommodity',
        meta: {
          index: 7,
          keepAlive: true
        },
        component: Commodity
      }, {
        path: 'order',
        name: 'Order',
        meta: {
          keepAlive: false,
          index: 6
        },
        component: Order,
        children: [{
          path: 'orderPay',
          name: 'OrderPay',
          meta: {
            keepAlive: false,
            index: 13
          },
          component: OrderPay,
          children: [{
            path: 'passwordBtn/action=:action&number=:number',
            name: 'OrderPayPasswordBtn',
            meta: {
              keepAlive: true,
              index: 16
            },
            component: PasswordBtn
          }, {
            path: 'orderDetalis/payId=:payId',
            name: 'orderDetalis',
            meta: {
              keepAlive: true,
              index: 17
            },
            component: orderDetalis,
            children: [{
              path: 'EmitAddress',
              name: 'EmitAddress',
              meta: {
                keepAlive: true,
                index: 19
              },
              component: EmitAddress
            }]
          }]
        }, {
          path: 'orderReceiv',
          name: 'OrderReceiv',
          meta: {
            keepAlive: false,
            index: 14
          },
          component: OrderReceiv,
          children: [{
            path: 'passwordBtn/action=:action&number=:number',
            name: 'OrderReceivPasswordBtn',
            meta: {
              keepAlive: true,
              index: 17
            },
            component: PasswordBtn
          }]
        }, {
          path: 'orderEvaluate',
          name: 'OrderEvaluate',
          meta: {
            keepAlive: false,
            index: 15
          },
          component: OrderEvaluate
        }],
        redirect: 'Order/orderPay'
      }]
    }, {
      path: '/commodity/commodityId=' + ':commodityId',
      name: 'UserCommodity',
      meta: {
        index: 7,
        keepAlive: true
      },
      component: Commodity
    }, {
      path: '/commodity/commodityId=:commodityId/userId=:userId',
      name: 'Commodity',
      meta: {
        index: 7,
        keepAlive: false
      },
      component: Commodity,
      children: [{
        path: 'passwordBtn/action=:action&number=:number',
        name: 'CommodityPasswordBtn',
        meta: {
          keepAlive: true,
          index: 20
        },
        component: PasswordBtn
      }]
    }, {
      path: '/SeahFrame',
      name: 'SeahFrame',
      meta: {
        keepAlive: true,
        index: 8
      },
      component: SeahFrame,
      children: [{
        path: 'commodity/keyWord=' + ':seachKeyWord',
        name: 'SeachInterface',
        meta: {
          keepAlive: false,
          index: 10
        },
        component: SeachInterface
      }]
    }, {
      path: '/Account',
      name: 'Account',
      meta: {
        keepAlive: true,
        index: 9
      },
      component: Account,
      children: [{
        path: 'Login',
        name: 'Login',
        meta: {
          keepAlive: true,
          index: 11
        },
        component: Login
      }, {
        path: 'Register',
        name: 'Register',
        meta: {
          keepAlive: true,
          index: 12
        },
        component: Register
      }],
      redirect: 'Account/Login'
    }, {
      path: '/PrivateInterFace/Object=:objectChoice/selectAccountNumber=:selectAccountNumber',
      name: 'PrivateInterFace',
      meta: {
        keepAlive: false,
        index: 12
      },
      component: PrivateInterFace
    }]
})
