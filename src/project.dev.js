require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BadGuy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42a1dALJC1EUKdr0vgQh0YM", "BadGuy");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "00239TaACpEmJ9C2QcR8MlP", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      ctor: function ctor() {
        this.rockPool = new cc.NodePool();
        this.starPool = new cc.NodePool();
      },
      properties: {
        rockPrefab: cc.Prefab,
        starPrefab: cc.Prefab,
        player: {
          default: null,
          type: cc.Node
        },
        ground: cc.Node
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        console.log("collision open!");
        this.initPool(10, this.rockPrefab, this.rockPool);
        this.initPool(5, this.starPrefab, this.starPool);
        this.schedule(function() {
          var num = 7;
          if (this.rockPool.size() > 0) for (var i = 0; i < num; i++) this.createRock(-20, -8);
          if (this.starPool.size() > 0) for (var i = 0; i < 5; i++) this.createStar(-10, 0);
        }, 1);
        for (var i = 0; i < 10; i++) this.createRock(-8, 0);
        this.player.getComponent("Player").init();
        this.touchEve();
      },
      start: function start() {},
      initPool: function initPool(Count, prefab, objPool) {
        var initCount = Count;
        for (var i = 0; i < initCount; i++) {
          var obj = cc.instantiate(prefab);
          objPool.put(obj);
        }
      },
      createRock: function createRock() {
        var minY = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -8;
        var maxY = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var rock = null;
        if (this.rockPool.size() > 1) {
          rock = this.rockPool.get();
          rock.parent = this.ground;
          rock.getComponent("Rock").game = this;
          rock.getComponent("Rock").init(minY, maxY);
        }
      },
      createStar: function createStar() {
        var minY = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -8;
        var maxY = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var star = null;
        if (this.starPool.size() > 1) {
          star = this.starPool.get();
          star = cc.instantiate(this.starPrefab);
          star.parent = this.ground;
          star.getComponent("Rock").game = this;
          star.getComponent("Rock").init(minY, maxY);
        }
      },
      touchEve: function touchEve() {
        var ontouch = null, endtouch = null, squareWith = this.node.width / 8, sideLoc = this.node.width / 8 * -1.5;
        this.node.on("touchstart", function(event) {
          ontouch = event.getLocationX();
        });
        this.node.on("touchend", function(event) {
          endtouch = event.getLocationX();
          ontouch - endtouch > 10 && this.getChildByName("player").x > sideLoc + 20 ? this.getChildByName("player").x -= squareWith : ontouch - endtouch < -5 && this.getChildByName("player").x < -sideLoc - 20 && (this.getChildByName("player").x += squareWith);
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  Ground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "582b5z7yWVK5p1AgUwwJGkP", "Ground");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 200
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35a88Jz1KxMGajI03ZNpNPA", "Player");
    "use strict";
    cc.Class({
      extends: cc.Component,
      ctor: function ctor() {
        this.jump = cc.jumpBy(1, 0, 0, 100, 1);
        this.flag = 0;
        this.case = 0;
      },
      properties: {
        positionY: 0,
        speed: 0,
        ground: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        console.log(this.ground.children);
      },
      start: function start() {},
      update: function update(dt) {},
      init: function init() {
        var squareWidth = this.node.parent.width / 8, onY = this.positionY, jp = this.jump;
        console.log(squareWidth);
        this.node.x = this.randomIntEx0() * squareWidth;
        console.log(this.node.x);
        this.node.y = this.positionY;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on("touchstart", function() {
          console.log("我被点了", this);
          if (Math.round(this.y) === onY) {
            this.runAction(jp);
            console.log("action", jp.isDone());
            this.getComponent("Player").flag = 1;
          }
        });
      },
      randomIntEx0: function randomIntEx0() {
        var min = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -2;
        var max = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var flagNum = Math.random(), returnInt = Math.floor(Math.random() * (max - min)) + min + .5;
        return flagNum < .5 ? returnInt : -returnInt;
      },
      onKeyDown: function onKeyDown(event) {
        var squareWidth = this.node.parent.width / 8;
        var sideLoc = this.node.parent.width / 8 * -1.5;
        switch (event.keyCode) {
         case cc.KEY.a:
          if (this.node.x > sideLoc + 20) {
            this.node.x -= squareWidth;
            console.log("Press a" + this.node.x + sideLoc);
          }
          break;

         case cc.KEY.d:
          if (this.node.x < -sideLoc - 20) {
            this.node.x += squareWidth;
            console.log("Press d" + this.node.x + sideLoc);
          }
          break;

         case cc.KEY.s:
          console.log(this.node.y);
          console.log(this.positionY);
          if (Math.round(this.node.y) === this.positionY) {
            this.node.runAction(this.jump);
            this.flag = 1;
          }
        }
      },
      onRock: function onRock(other, self) {
        if ("Rock" === other.node.name) {
          this.ground.getComponent("Ground").speed = 0;
          this.scheduleOnce(function() {
            this.node.parent.getComponent("Game").rockPool.put(other.node);
            this.ground.getComponent("Ground").speed = 200;
          }, 1);
        } else if ("star" === other.node.name) {
          this.ground.getComponent("Ground").speed += 400;
          console.log("我确实碰到了星星，加速");
          this.node.parent.getComponent("Game").starPool.put(other.node);
          this.scheduleOnce(function() {
            this.ground.getComponent("Ground").speed = 200;
          }, 1);
        } else console.log("我确实碰到了星星但是函数没起作用");
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        console.log("on collision enter");
        if (1 === this.flag) if (this.jump.isDone()) {
          this.onRock(other, self);
          console.log("我跳完之后, 碰到了石头");
        } else {
          this.case = 1;
          console.log("这次就看碰撞结束函数了");
        } else {
          this.onRock(other, self);
          console.log("我一次也没跳过，就这样碰上了石头");
        }
      },
      onCollisionExit: function onCollisionExit(other, self) {
        console.log("on collision exit");
        if (1 === this.case) if (this.jump.isDone()) {
          this.onRock(other, self);
          console.log("我撞上了石头");
          this.case = 0;
        } else console.log("我跨过了石头");
      }
    });
    cc._RF.pop();
  }, {} ],
  Rock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34290zxHm9PHKnWDfjOG45g", "Rock");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        positionX: 0,
        positionY: 0,
        speed: 200
      },
      onLoad: function onLoad() {},
      start: function start() {},
      update: function update(dt) {
        this.node.y -= dt * this.node.parent.getComponent("Ground").speed;
        this.node.y < -this.node.parent.parent.height / 2 && ("Rock" === this.node.name ? this.destorySelf(this.game.rockPool) : "star" === this.node.name && this.destorySelf(this.game.starPool));
      },
      init: function init() {
        var min = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -8;
        var max = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        var playerCom = this.game.player.getComponent("Player");
        var canvasNode = this.node.parent.parent;
        this.node.x = playerCom.randomIntEx0() * canvasNode.width / 8;
        this.node.y = Math.abs(playerCom.randomIntEx0(min, max)) * canvasNode.height / 16;
      },
      destorySelf: function destorySelf(Pool) {
        Pool.put(this.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  Scroll: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2fdf7XGEGFHspOysoAF2gdy", "Scroll");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollSpeed: 200,
        offsetY: 0
      },
      start: function start() {},
      update: function update(dt) {
        this.node.y -= dt * this.node.parent.getComponent("Ground").speed;
        this.node.y < -this.offsetY && (this.node.y += this.node.height);
      }
    });
    cc._RF.pop();
  }, {} ],
  Star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2139Q34+ZBarLgUaB4zMb9", "Star");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "BadGuy", "Game", "Ground", "Player", "Rock", "Scroll", "Star" ]);