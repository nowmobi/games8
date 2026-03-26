window.__require = (function t(e, o, n) {
	function i(a, c) {
		if (!o[a]) {
			if (!e[a]) {
				var s = a.split('/');
				if (((s = s[s.length - 1]), !e[s])) {
					var m = 'function' == typeof __require && __require;
					if (!c && m) return m(s, !0);
					if (r) return r(s, !0);
					throw new Error("Cannot find module '" + a + "'");
				}
				a = s;
			}
			var l = (o[a] = { exports: {} });
			e[a][0].call(
				l.exports,
				function (t) {
					return i(e[a][1][t] || t);
				},
				l,
				l.exports,
				t,
				e,
				o,
				n
			);
		}
		return o[a].exports;
	}
	for (
		var r = 'function' == typeof __require && __require, a = 0;
		a < n.length;
		a++
	)
		i(n[a]);
	return i;
})(
	{
		ActionManager: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '15d89tB9OJDlpY35SYcTGN3', 'ActionManager'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.TAG_ACTION_WAITFOR_PAIRING = void 0);
				var n = t('./Comm');
				o.TAG_ACTION_WAITFOR_PAIRING = 3;
				var i = (function () {
					function t(t, e) {
						void 0 === e && (e = 1e3), (this.mCard = t);
					}
					return (
						(t.prototype.playHoming = function (t, e) {
							void 0 === t && (t = !0), void 0 === e && (e = 0.1);
							var o = this.mCard.getBoundPos();
							0 == e &&
								(e =
									cc.Vec2.distance(
										this.mCard.node.getPosition(cc.v2()),
										o
									) / this.mSpeed),
								cc
									.tween(this.mCard.node)
									.to(e, { x: o.x, y: o.y })
									.call(function () {
										t &&
											n.Comm.mPlatform.mPlatformUtil.playEffectMove();
									})
									.start();
						}),
						(t.prototype.playMove = function (t, e, o) {
							void 0 === e && (e = !0),
								void 0 === o && (o = 0.1),
								0 == o &&
									(o =
										cc.Vec2.distance(
											this.mCard.node.getPosition(
												cc.v2()
											),
											t
										) / this.mSpeed),
								cc
									.tween(this.mCard.node)
									.to(o, { x: t.x, y: t.y })
									.call(function () {
										e &&
											n.Comm.mPlatform.mPlatformUtil.playEffectMove();
									})
									.start();
						}),
						t
					);
				})();
				(o.default = i), cc._RF.pop();
			},
			{ './Comm': 'Comm' }
		],
		Auxiliary: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'c9a9bckDUdCtJeXzv8HybU4', 'Auxiliary');
				var n,
					i,
					r = t('./typeof'),
					a =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					c = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var s,
					m = t('./Comm'),
					l = t('./CustomMask'),
					p = t('./MyEnums'),
					u = t('./MyEvent'),
					d = t('./FrameGame');
				((s = i || (i = {}))[(s.EAT_None = 0)] = 'EAT_None'),
					(s[(s.EAT_No_Pairing = 1)] = 'EAT_No_Pairing'),
					(s[(s.EAT_Select_Pair = 2)] = 'EAT_Select_Pair');
				var h = cc._decorator,
					f = h.ccclass,
					_ = h.property,
					y = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_BtnGiveUp = null),
								(e.mNode_NoPairingText = null),
								(e.mNode_Hand = null),
								(e.mActPointerReminder = null),
								(e.mEat = i.EAT_None),
								e
							);
						}
						return (
							a(e, t),
							(e.prototype.init = function () {
								this.reset();
							}),
							(e.prototype.reset = function () {
								null == this.mGraphics &&
									(this.mGraphics = this.node.addComponent(
										cc.Graphics
									)),
									this.clearElements(),
									null != this.mGraphics &&
										this.mGraphics.clear(),
									(this.mNode_NoPairingText.active = !1),
									(this.mNode_BtnGiveUp.active = !1),
									(this.mNode_Hand.active = !1),
									(this.node.active = !1);
							}),
							(e.prototype.showNoPairing = function (t) {
								if (null != t) {
									this.reset(),
										(this.mEat = i.EAT_No_Pairing);
									for (var e = 0; e < t.length; e++)
										this.addElement(t[e].node);
									this.showMask(!0, !0, 0.5, !0, !0),
										(this.mNode_BtnGiveUp.active = !0),
										(this.mNode_NoPairingText.opacity = 0),
										(this.mNode_NoPairingText.active = !0),
										cc
											.tween(this.mNode_NoPairingText)
											.to(0.5, { opacity: 255 })
											.start();
								}
							}),
							(e.prototype.showSelectPair = function (t) {
								if (null != t) {
									this.reset(),
										(this.mEat = i.EAT_Select_Pair);
									for (var e = 0; e < t.length; e++)
										this.addElement(t[e].node);
									this.showMask(!0, !0, 0.5, !0, !0);
								}
							}),
							(e.prototype.pointerReminder = function (t, e, o) {
								void 0 === o && (o = !1),
									null != this.mActPointerReminder &&
										(this.mActPointerReminder.stop(),
										(this.mActPointerReminder = null));
								var n = t.y;
								this.mNode_Hand.scaleX = o ? -1 : 1;
								var i = o
										? t.x -
										  e / 2 -
										  5 -
										  this.mNode_Hand.width / 2
										: t.x +
										  e / 2 +
										  5 +
										  this.mNode_Hand.width / 2,
									r = o ? i - 100 : i + 100;
								(this.mNode_Hand.x = r),
									(this.mNode_Hand.y = n),
									(this.mNode_Hand.active = !0),
									(this.mActPointerReminder = cc
										.tween(this.mNode_Hand)
										.repeatForever(
											cc
												.tween()
												.to(0.5, { x: r })
												.to(0.5, { x: i })
										)),
									this.mActPointerReminder.start();
							}),
							(e.prototype.destroyPointerReminder = function () {
								this.mActPointerReminder.stop(),
									(this.mActPointerReminder = null),
									(this.mNode_Hand.active = !1);
							}),
							(e.prototype.callbackWhileShown = function () {
								this.mElementsRespondEvt = !0;
								var t = null,
									e = cc.Vec2.ZERO;
								switch (this.mEat) {
									case i.EAT_No_Pairing:
										if (
											(this.mElements.length >= 1 &&
												(t =
													1 == this.mElements.length
														? this.mElements[0]
														: this.mElements[
																this.mElements
																	.length - 1
														  ]),
											null == t)
										)
											return;
										(e = t.getPosition()),
											this.pointerReminder(
												e,
												t.mBoundNode.width
											);
								}
							}),
							(e.prototype.touchStart = function () {}),
							(e.prototype.touchMove = function () {}),
							(e.prototype.touchCancel = function () {}),
							(e.prototype.touchEnd = function () {
								switch (this.mEat) {
									case i.EAT_No_Pairing:
										this.mElementNode.emit(
											'EVT_USE_PROP_IN_AUXILIARY'
										),
											(this.mNode_NoPairingText.active =
												!1),
											(this.mNode_BtnGiveUp.active = !1),
											this.clearElements(),
											this.mGraphics.clear(),
											(this.node.active = !1);
										break;
									case i.EAT_Select_Pair:
										(this.mNode_BtnGiveUp.active = !1),
											this.clearElements(),
											this.mGraphics.clear(),
											(this.node.active = !1);
								}
							}),
							(e.prototype.onGiveUp = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								if (
									(m.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									d.default.mGameType ==
										p.EGameType.EPractice)
								)
									(this.mNode_NoPairingText.active = !1),
										(this.mNode_BtnGiveUp.active = !1),
										this.clearElements(),
										this.mGraphics.clear(),
										(this.node.active = !1),
										this.node.dispatchEvent(
											new u.EvtSubBtnClick(
												p.EBtnClickType.ECancel
											)
										);
								else {
									var o = this;
									this.node.dispatchEvent(
										new u.EvtWarningMsg(
											'        Abandoning this round will be deemed as a failure and a certain percentage of points will be deducted, which will affect your ranking! Are you sure you want to give up?',
											!1,
											!1,
											function () {
												(o.mNode_NoPairingText.active =
													!1),
													(o.mNode_BtnGiveUp.active =
														!1),
													o.clearElements(),
													o.mGraphics.clear(),
													(o.node.active = !1),
													m.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRoundOnce(
														!1
													),
													o.node.dispatchEvent(
														new u.EvtSubBtnClick(
															p.EBtnClickType.ECancel
														)
													);
											},
											null
										)
									);
								}
							}),
							(e.prototype.onLoad = function () {
								console.log('Auxiliary onLoad is calling!'),
									t.prototype.onLoad.call(this),
									this.mNode_BtnGiveUp.on(
										cc.Node.EventType.TOUCH_END,
										this.onGiveUp,
										this
									);
							}),
							(e.prototype.start = function () {}),
							c(
								[_(cc.Node)],
								e.prototype,
								'mNode_BtnGiveUp',
								void 0
							),
							c(
								[_(cc.Node)],
								e.prototype,
								'mNode_NoPairingText',
								void 0
							),
							c([_(cc.Node)], e.prototype, 'mNode_Hand', void 0),
							c([f], e)
						);
					})(l.default);
				(o.default = y), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./CustomMask': 'CustomMask',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./typeof': 'typeof'
			}
		],
		BackgroundAdapter: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '9b181IKrqxJbINgQ3qg7UcO', 'BackgroundAdapter');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass;
				c.property;
				var m = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						r(e, t),
						(e.prototype.onLoad = function () {
							var t = Math.min(
									cc.view.getCanvasSize().width /
										this.node.width,
									cc.view.getCanvasSize().height /
										this.node.height
								),
								e = this.node.width * t,
								o = this.node.height * t;
							this.node.scale = Math.max(
								cc.view.getCanvasSize().width / e,
								cc.view.getCanvasSize().height / o
							);
						}),
						a([s], e)
					);
				})(cc.Component);
				(o.default = m), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		CardCell: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '8ed90dulj1BxIuJnjwy504i', 'CardCell'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 });
				var n = t('./CardSrc'),
					i = t('./Comm'),
					r = (function () {
						function t(t, e, o) {
							(this.mBoundPos = cc.Vec2.ZERO),
								(this.mBoundCard = null),
								(this.mBoundPos = t),
								(this.mRowIndex = e),
								(this.mColIndex = o);
						}
						return (
							(t.prototype.destoryCard = function () {
								var t = this.mBoundCard;
								return this.unbind(), t;
							}),
							(t.prototype.resetCard = function (t) {
								if (
									((this.mBoundCard = t.getComponent(
										n.default
									)),
									null == this.mBoundCard)
								)
									throw 'CardCell->constructor:\u672a\u6302\u8f7d\u811a\u672c\uff01';
								this.mBoundCard.updateBindCell(
									this.mRowIndex,
									this.mColIndex
								);
							}),
							(t.prototype.toString = function () {
								return null == this.mBoundCard
									? '[' +
											this.mRowIndex +
											'|' +
											this.mColIndex +
											'-\u672a\u7ed1\u5b9a]'
									: '[' +
											this.mRowIndex +
											'|' +
											this.mColIndex +
											']';
							}),
							(t.prototype.Row = function () {
								return this.mRowIndex;
							}),
							(t.prototype.Column = function () {
								return this.mColIndex;
							}),
							(t.prototype.boundCard = function () {
								return this.mBoundCard;
							}),
							(t.prototype.inBounds = function (t) {
								var e = i.Comm.getDesignWidth() / 2,
									o = i.Comm.getDesignHeight() / 2;
								return (
									t.x >= this.mBoundPos.x - e &&
									t.x <= this.mBoundPos.x + e &&
									t.y >= this.mBoundPos.y - o &&
									t.y <= this.mBoundPos.y + e
								);
							}),
							(t.prototype.unbind = function () {
								var t = this.mBoundCard;
								(this.mBoundCard = null),
									t.updateBindCell(-1, -1);
							}),
							(t.prototype.bind = function (t) {
								(this.mBoundCard = t),
									t.updateBindCell(
										this.mRowIndex,
										this.mColIndex
									);
							}),
							(t.prototype.boundPos = function () {
								return this.mBoundPos.clone();
							}),
							t
						);
					})();
				(o.default = r), cc._RF.pop();
			},
			{ './CardSrc': 'CardSrc', './Comm': 'Comm', './typeof': 'typeof' }
		],
		CardSrc: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'a9c99Cy9NhOsZ28i5MBruO5', 'CardSrc');
				var n,
					i,
					r,
					a,
					c = t('./typeof'),
					s =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					m = function (t, e, o, n) {
						var i,
							r = arguments.length,
							a =
								r < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: c(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							a = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(a =
										(r < 3
											? i(a)
											: r > 3
											? i(e, o, a)
											: i(e, o)) || a);
						return r > 3 && a && Object.defineProperty(e, o, a), a;
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.TouchPos = void 0);
				var l,
					p = t('./Comm'),
					u = t('./MoveControl'),
					d = t('./ActionManager'),
					h = t('./GameDesk'),
					f = t('./MyEvent'),
					_ = t('./PlatformGeneralInterface'),
					y = cc._decorator,
					g = y.ccclass,
					E = y.property;
				((l = i || (i = {}))[(l.UnMatch = 0)] = 'UnMatch'),
					(l[(l.Matched = 1)] = 'Matched'),
					(function (t) {
						(t[(t.ENone = 0)] = 'ENone'),
							(t[(t.ESelecting = 1)] = 'ESelecting'),
							(t[(t.ESearching = 2)] = 'ESearching'),
							(t[(t.EExchanging = 3)] = 'EExchanging');
					})(r || (r = {})),
					(function (t) {
						(t[(t.None = 0)] = 'None'),
							(t[(t.Donw = 1)] = 'Donw'),
							(t[(t.Move = 2)] = 'Move');
					})(a || (a = {}));
				var v = (function () {
						function t(t) {
							var e = this;
							(this.mAct_Pair = cc
								.tween(t.node)
								.to(0.1, { scaleX: 0 })),
								this.mAct_Pair
									.call(function () {
										t.mNode_CardType.active = !1;
										var e = t.getComponent(cc.Sprite);
										null != e &&
											(e.spriteFrame = t.BGMatched);
									})
									.to(0.1, { scaleX: -1 }),
								(this.mAct_ReversePair = cc
									.tween(t.node)
									.to(0.1, { scaleX: 0 })
									.call(function () {
										t.mNode_CardType.active = !0;
										var e = t.getComponent(cc.Sprite);
										null != e &&
											(e.spriteFrame = t.BGUnMatch);
									})
									.to(0.1, { scaleX: 1 })),
								(this.mAct_Pairing = cc
									.tween(t.node)
									.to(0.5, { scale: 0.8 })
									.to(0.5, { scale: 1 })),
								this.mAct_Pairing.call(function () {
									e.mAct_Pairing.start();
								}),
								(this.mAct_Marking_Search = cc
									.tween(t.mNode_State)
									.to(1, { opacity: 0 })
									.to(1, {
										opacity: S.MAX_VAL_OPACITY_NODE_STATE
									})
									.call(function () {
										e.mAct_Marking_Search.start();
									}));
						}
						return (
							(t.prototype.playPairing = function (t) {
								void 0 === t && (t = !0),
									t
										? this.mAct_Pairing.start()
										: this.mAct_Pairing.stop();
							}),
							(t.prototype.playReversePair = function (t) {
								void 0 === t && (t = !0),
									t
										? this.mAct_ReversePair.start()
										: this.mAct_ReversePair.stop();
							}),
							(t.prototype.playPair = function (t) {
								void 0 === t && (t = !0),
									t
										? this.mAct_Pair.start()
										: this.mAct_Pair.stop();
							}),
							(t.prototype.playMarkingSearch = function (t) {
								t
									? this.mAct_Marking_Search.start()
									: this.mAct_Marking_Search.stop();
							}),
							t
						);
					})(),
					C = function () {
						(this.mPosStart = cc.Vec2.ZERO),
							(this.mPosNow = cc.Vec2.ZERO);
					};
				o.TouchPos = C;
				var S = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mNode_CardType = null),
							(e.mNode_Border = null),
							(e.mNode_State = null),
							(e.BGUnMatch = null),
							(e.BGMatched = null),
							(e.mCol = -1),
							(e.mRow = -1),
							(e.mMovingOutOfBounds = !1),
							(e.mIsPairing = !1),
							(e.flagIgnoreMove = !1),
							(e.flagSelectToPair = !1),
							(e.flagIgnoreRelease = !1),
							e
						);
					}
					var o;
					return (
						s(e, t),
						(o = e),
						(e.prototype.reuse = function (t) {
							this.node.setScale(-1),
								(this.mNode_Border.active = !1),
								(this.mNode_State.active = !1),
								(this.mNode_CardType.active = !0),
								this.setType(t),
								(this.mMarkState = r.ENone),
								(this.mState = i.UnMatch);
							var e = this.getComponent(cc.Sprite);
							null != e && (e.spriteFrame = this.BGUnMatch);
						}),
						(e.prototype.unuse = function () {
							this.mType = null;
						}),
						(e.prototype.init = function (t) {
							this.setType(t);
						}),
						(e.prototype.getType = function () {
							return this.mType;
						}),
						(e.prototype.updateBindCell = function (t, e) {
							(this.mRow = t), (this.mCol = e);
						}),
						(e.prototype.onLoad = function () {
							this.mTouchPos = new C();
							var t = this;
							(this.mActions = new v(this)),
								(this.mActionManager = new d.default(this)),
								this.node.on(
									cc.Node.EventType.TOUCH_START,
									this.onTouchEvt,
									this,
									!0
								),
								this.node.on(
									cc.Node.EventType.TOUCH_MOVE,
									this.onTouchEvt,
									this,
									!0
								),
								this.node.on(
									cc.Node.EventType.TOUCH_END,
									this.onTouchEvt,
									this,
									!0
								),
								this.node.on(
									cc.Node.EventType.TOUCH_CANCEL,
									this.onTouchEvt,
									this,
									!0
								),
								this.node.on(
									'TouchDown_From_Mask_Element',
									function (e, o) {
										t.touchStart(cc.v2(e, o));
									},
									this
								),
								this.node.on(
									'TouchMove_From_Mask_Element',
									function (e, o) {
										t.touchMove(cc.v2(e, o));
									},
									this
								),
								this.node.on(
									'TouchUp_From_Mask_Element',
									function () {
										t.touchRelease(!1);
									},
									this
								);
						}),
						(e.prototype.moveTo = function (t, e, o) {
							if (
								(void 0 === t && (t = null),
								void 0 === e && (e = !1),
								void 0 === o && (o = !0),
								null == t)
							)
								if (e) this.mActionManager.playHoming(o);
								else {
									var n = this.getBoundPos();
									(this.node.x = n.x), (this.node.y = n.y);
								}
							else
								e
									? this.mActionManager.playMove(t, o)
									: ((this.node.x = t.x),
									  (this.node.y = t.y));
						}),
						(e.prototype.setType = function (t) {
							this.mType = t;
							var e = p.Comm.getInstance().getResourcesManager();
							if (null != e.mSpriteAtlas) {
								var o = e.mSpriteAtlas.getSpriteFrame(
									p.Comm.ecard_type2name(t)
								);
								null != o
									? (this.mNode_CardType.getComponent(
											cc.Sprite
									  ).spriteFrame = o)
									: console.log(
											'\u56fe\u96c6\u8d44\u6e90\u4e2d\u672a\u627e\u5230\u6307\u5b9a\u540d\u5b57\u7684\u8d44\u6e90'
									  );
							} else
								console.log(
									'\u56fe\u96c6\u8d44\u6e90\u9519\u8bef\uff01'
								);
						}),
						(e.prototype.markingSearch = function (t) {
							void 0 === t && (t = !0),
								(this.mNode_State.active = t),
								(this.mNode_State.opacity =
									o.MAX_VAL_OPACITY_NODE_STATE),
								t
									? ((this.mMarkState = r.ESearching),
									  this.mActions.playMarkingSearch(!0))
									: ((this.mMarkState = r.ENone),
									  this.mActions.playMarkingSearch(!1));
						}),
						(e.prototype.markingExchange = function (t) {
							void 0 === t && (t = !0),
								(this.mNode_State.active = t),
								(this.mNode_State.opacity =
									o.MAX_VAL_OPACITY_NODE_STATE);
						}),
						(e.prototype.markingPairing = function (t) {
							void 0 === t && (t = !0),
								(this.mIsPairing = t),
								this.mActions.playPairing(t),
								t || this.node.setScale(1);
						}),
						(e.prototype.isSelecting = function () {
							return this.mNode_Border.active;
						}),
						(e.prototype.markingSelecte = function (t) {
							void 0 === t && (t = !0),
								(this.mNode_Border.active = t);
						}),
						(e.prototype.updateIgnoreMove = function (t) {
							this.flagIgnoreMove = t;
						}),
						(e.prototype.updateIgnoreRelease = function (t) {
							this.flagIgnoreRelease = t;
						}),
						(e.prototype.touchStart = function (t) {
							return (
								(this.mTouchPos.mPosStart = t),
								(this.flagIgnoreMove = !1),
								(this.flagIgnoreRelease = !1),
								(this.flagSelectToPair = !1),
								u.default.getInstance().exchangeIsEnabled()
									? (this.markingExchange(!0),
									  void (this.flagIgnoreMove = !0))
									: u.default.getInstance().isUsing()
									? ((this.flagIgnoreMove = !0),
									  void (this.flagIgnoreRelease = !0))
									: void (u.default
											.getInstance()
											.isMultiPairing() &&
									  u.default
											.getInstance()
											.multiPairedOpt() == this
											? this.node.dispatchEvent(
													new h.GameEvent_TouchEx(
														h.GameEvent_TouchEx.EVENT_TYPE,
														!0,
														this
													)
											  )
											: (u.default
													.getInstance()
													.initControl(this),
											  this.node.dispatchEvent(
													new h.GameEvent_TouchEx(
														h.GameEvent_TouchEx.EVENT_TYPE,
														!0,
														this
													)
											  )))
							);
						}),
						(e.prototype.touchMove = function (t) {
							this.node.dispatchEvent(new f.EvtTouchMove()),
								this.flagIgnoreMove ||
									((this.mTouchPos.mPosNow = t),
									u.default
										.getInstance()
										.moving(this.mTouchPos));
						}),
						(e.prototype.touchRelease = function (t) {
							if (u.default.getInstance().exchangeIsEnabled())
								if (t) {
									var e = u.default
										.getInstance()
										.cardToBeChanged();
									if (null == e)
										u.default
											.getInstance()
											.setupExchangedCard(this),
											this.node.dispatchEvent(
												new f.EvtPropExchangeState()
											);
									else {
										if (e == this) return;
										this.node.dispatchEvent(
											new f.EvtPropExchange(e, this)
										);
									}
								} else this.markingExchange(!1);
							else
								this.flagIgnoreRelease ||
									(this.flagSelectToPair
										? (u.default.getInstance().submitMove(),
										  p.Comm.mPlatform.mPlatformUtil.actionRecording(
												this,
												_.EActionStep.EStep_Touch_End,
												!0
										  ),
										  this.node.dispatchEvent(
												new f.EvtPairMulti(this)
										  ))
										: (p.Comm.mPlatform.mPlatformUtil.actionRecording(
												this,
												_.EActionStep.EStep_Touch_End
										  ),
										  this.node.dispatchEvent(
												new f.EvtMovingEndEx(
													this,
													this.mMovingOutOfBounds
												)
										  )));
						}),
						(e.prototype.onTouchEvt = function (t) {
							this.isPaired() ||
								(t.type == cc.Node.EventType.TOUCH_START
									? (p.Comm.mPlatform.mPlatformUtil.actionRecording(
											this,
											_.EActionStep.EStep_Touch_Start
									  ),
									  this.touchStart(t.getLocation()))
									: t.type == cc.Node.EventType.TOUCH_MOVE
									? this.touchMove(t.getLocation())
									: this.touchRelease(
											t.type ==
												cc.Node.EventType.TOUCH_END
									  ));
						}),
						(e.prototype.row = function () {
							return this.mRow;
						}),
						(e.prototype.col = function () {
							return this.mCol;
						}),
						(e.prototype.getBoundPos = function () {
							return p.Comm.cell(this.mRow, this.mCol).boundPos();
						}),
						(e.prototype.canPair = function (t) {
							return this.mType == t.mType;
						}),
						(e.prototype.isPaired = function () {
							return this.mState == i.Matched;
						}),
						(e.prototype.flipCard = function (t, e) {
							if ((void 0 === e && (e = !1), t)) {
								if (-1 == this.node.x) return;
								this.mActions.playPair();
							} else {
								if (1 == this.node.x) return;
								this.mActions.playReversePair();
							}
						}),
						(e.prototype.pair = function () {
							p.Comm.mPlatform.mPlatformUtil.actionRecording(
								this,
								_.EActionStep.EStep_Pairing
							),
								this.markingSelecte(!1),
								this.markingPairing(!1),
								(this.mState = i.Matched),
								this.node.setPosition(this.getBoundPos()),
								this.mActions.playPair();
						}),
						(e.prototype.realTimePos = function () {
							return this.node.getPosition(cc.v2());
						}),
						(e.prototype.bindInPlace = function () {
							var t = this.realTimePos(),
								e = p.Comm.calculationCellByPos(t);
							e.isValid() &&
								p.Comm.cell(e.row, e.column).bind(this);
						}),
						(e.MAX_VAL_OPACITY_NODE_STATE = 128),
						(e.ACTION_TAG_PAIRING = 1),
						m([E(cc.Node)], e.prototype, 'mNode_CardType', void 0),
						m([E(cc.Node)], e.prototype, 'mNode_Border', void 0),
						m([E(cc.Node)], e.prototype, 'mNode_State', void 0),
						m(
							[E(cc.SpriteFrame)],
							e.prototype,
							'BGUnMatch',
							void 0
						),
						m(
							[E(cc.SpriteFrame)],
							e.prototype,
							'BGMatched',
							void 0
						),
						(o = m([g], e))
					);
				})(cc.Component);
				(o.default = S), cc._RF.pop();
			},
			{
				'./ActionManager': 'ActionManager',
				'./Comm': 'Comm',
				'./GameDesk': 'GameDesk',
				'./MoveControl': 'MoveControl',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		Comm: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'ef93dGJ0EFG/7x+K08KqGgM', 'Comm'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.UniversalAction =
						o.Comm =
						o.EEnvCfgType =
						o.V2d =
						o.SoundEffectManager =
						o.GameConfig =
						o.ELayer =
							void 0);
				var n,
					i = t('./CardCell'),
					r = t('./GameDesk'),
					a = t('./MyEnums'),
					c = t('./PlatformMananger');
				((n = o.ELayer || (o.ELayer = {}))[
					(n.Z_INDEX_CARD_NORMAL = 0)
				] = 'Z_INDEX_CARD_NORMAL'),
					(n[(n.Z_INDEX_MOVE_PAIRED = 1)] = 'Z_INDEX_MOVE_PAIRED'),
					(n[(n.Z_INDEX_MOVE_NORMAL = 2)] = 'Z_INDEX_MOVE_NORMAL');
				var s = (function () {
					function t() {}
					return (
						(t.adUnitId_Interstitial_DY = '4b111bjbkj7859hli2'),
						(t.adUnitId_Interstitial_WX =
							'adunit-07b1012bc9d22a00'),
						(t.adUnitId_Energy_DY = '4d2bbss131i9fmsln1'),
						(t.adUnitId_RewardedAd_WX = 'adunit-7b588b363d502802'),
						(t.adUnitId_BannerAd_WX = 'adunit-bf6f8d3a2429df31'),
						(t.adUnitId_PropInGame_DY = '26pe2h5oj2bje0bh9d'),
						(t.adUnitId_DoubleIntegral_DY = '4lru1aj8haj15uhtpg'),
						(t.EMIT_FIELD_REWARDED_SWITCH_ENERGY =
							'Switch_RewardedVideoAd_Energy'),
						(t.EMIT_FIELD_REWARDED_SWITCH_PROP =
							'Switch_RewardedVideoAd_Prop'),
						(t.EMIT_FIELD_REWARDED_SWITCH_DOUBLE =
							'Switch_RewardedVideoAd_Double'),
						(t.EMIT_FIELD_FRAME_HOME_SWITCH_INFINITE =
							'Frame_Home_Switch_Infinite'),
						(t.EMIT_FIELD_FRAME_HOME_UPDATE_ENERGIES =
							'Frame_Home_Switch_Energies'),
						(t.EMIT_FIELD_FRAME_HOME_GUANZHU =
							'Frame_Home_Guanzhu'),
						(t.SHOW_SCORE_LIMIT_IN_WECHAT = 4e5),
						(t.DefaultCD_KEY = [
							{
								cd_key: 'DuiDui305A6K79',
								reward: {
									tip: 2,
									refresh: 1,
									infinity: 1,
									integral: 3e3
								}
							},
							{
								cd_key: 'DuiDui129c7Z55',
								reward: {
									tip: 3,
									refresh: 2,
									infinity: 0,
									integral: 3e3
								}
							},
							{
								cd_key: 'DuiDui407e30Z3',
								reward: {
									tip: 3,
									refresh: 2,
									infinity: 1,
									integral: 0
								}
							},
							{
								cd_key: 'DuiDui615z7CH8',
								reward: {
									tip: 1,
									refresh: 1,
									infinity: 0,
									integral: 500
								}
							},
							{
								cd_key: 'DuiDui0615ZCH8',
								reward: {
									tip: 3,
									refresh: 2,
									infinity: 0,
									integral: 3e4
								}
							}
						]),
						(t.NAME_DOUYIN = 'xxx'),
						(t.RestoreEnergy_Counter = 1800),
						(t.Max_Energy_Num = 5),
						(t.Max_InfiniteEnergy_RewardedAd_Count = 3),
						(t.MAX_DOUBLE_REWARD = 5),
						(t.DESIGN_WINDOW_WIDTH = 750),
						(t.DESIGN_WINDOW_HEIGHT = 1334),
						(t.GIVEN_ASSISTANT_TIMES_EVERY_DAY = 3),
						(t.PRICE_SEARCH = 50),
						(t.PRICE_EXCHANGE = 100),
						(t.PRICE_REFRESH = 200),
						(t.PRICE_TICKET = 100),
						(t.PRICE_ENERGY_S = 100),
						(t.PRICE_ENERGY_B = 400),
						(t.DESIGN_WIDTH = 70),
						(t.DESIGN_HEIGHT = 86),
						(t.SHUFFLE_TIMES = 1),
						(t.COLUMN_NUM = 10),
						(t.ROW_NUM_SHORT = 8),
						(t.ROW_NUM_LONG = 12),
						(t.HEIGHT_NODE_AD = 240),
						(t.MAX_SHARE_RECORDER_COUNT = 3),
						(t.MAX_RECV_EXTRA_REWARD_COUNT = 3),
						(t.MAX_SHARED = 10),
						(t.MAX_PLAY_REWARDED_VIDEO_AD = 15),
						(t.SHARING_INTERVAL_MINUTE = 600),
						(t.MIN_IN_GAME_BOTTOM_BAR = 80),
						(t.MAX_IN_GAME_BOTTOM_BAR = 120),
						(t.MIN_IN_GAME_TOP_BAR = 125),
						t
					);
				})();
				o.GameConfig = s;
				var m = (function () {
					function t() {
						(this.mSoundBGM = null),
							(this.mSoundClick = null),
							(this.mSoundPair = null),
							(this.mSoundMove = null),
							(this.mClickEffectId = null),
							(this.mMoveEffectId = null),
							(this.mPairEffectId = null),
							(this.mMinMoveSount = null),
							(this.mFlagLoaded = !1);
					}
					return (
						(t.prototype.isLoaded = function () {
							return this.mFlagLoaded;
						}),
						(t.prototype.preloadResource = function (t) {
							void 0 === t && (t = !0),
								(this.mFlagLoaded = !0),
								cc.audioEngine.setEffectsVolume(
									u.mPlatform.mStorageUtil.mSysCfg.volumeEffect()
								),
								cc.audioEngine.setMusicVolume(
									u.mPlatform.mStorageUtil.mSysCfg.volumeMusic()
								);
							var e = this;
							cc.resources.load(
								'audio/bgm',
								cc.AudioClip,
								function (o, n) {
									null == o
										? ((e.mSoundBGM = n),
										  e.enableBackgoundMusic(t))
										: u.mPlatform.mPlatformUtil.log(
												"\u58f0\u97f3'audio/bgm'\u6587\u4ef6\u52a0\u8f7d\u5931\u8d25!"
										  );
								}
							),
								cc.resources.load(
									'audio/click',
									cc.AudioClip,
									function (t, o) {
										null == t
											? (e.mSoundClick = o)
											: u.mPlatform.mPlatformUtil.log(
													"\u58f0\u97f3'audio/click'\u6587\u4ef6\u52a0\u8f7d\u5931\u8d25!"
											  );
									}
								),
								cc.resources.load(
									'audio/move',
									cc.AudioClip,
									function (t, o) {
										null == t
											? (e.mSoundMove = o)
											: u.mPlatform.mPlatformUtil.log(
													"\u58f0\u97f3'audio/move'\u6587\u4ef6\u52a0\u8f7d\u5931\u8d25!"
											  );
									}
								),
								cc.resources.load(
									'audio/pair',
									cc.AudioClip,
									function (t, o) {
										null == t
											? (e.mSoundPair = o)
											: u.mPlatform.mPlatformUtil.log(
													"\u58f0\u97f3'audio/pair'\u6587\u4ef6\u52a0\u8f7d\u5931\u8d25!"
											  );
									}
								);
						}),
						(t.prototype.enableBackgoundMusic = function (t) {
							void 0 === t && (t = !0),
								t
									? cc.audioEngine.playMusic(
											this.mSoundBGM,
											!0
									  )
									: cc.audioEngine.stopMusic();
						}),
						(t.prototype.playEffectBtnClick = function () {
							if (
								u.mPlatform.mStorageUtil.mSysCfg.enabledEffect()
							) {
								null != this.mClickEffectId &&
									cc.audioEngine.stopEffect(
										this.mClickEffectId
									),
									(this.mClickEffectId =
										cc.audioEngine.playEffect(
											this.mSoundClick,
											!1
										));
								var t = this;
								cc.audioEngine.setFinishCallback(
									this.mClickEffectId,
									function () {
										t.mClickEffectId = null;
									}
								);
							}
						}),
						(t.prototype.playEffectMoveByEngine = function () {
							if (
								u.mPlatform.mStorageUtil.mSysCfg.enabledEffect()
							) {
								null != this.mMoveEffectId &&
									cc.audioEngine.stopEffect(
										this.mMoveEffectId
									),
									(this.mMoveEffectId =
										cc.audioEngine.playEffect(
											this.mSoundMove,
											!1
										));
								var t = this;
								cc.audioEngine.setFinishCallback(
									this.mMoveEffectId,
									function () {
										t.mMoveEffectId = null;
									}
								);
							}
						}),
						(t.prototype.playEffectPairByEngine = function () {
							if (
								u.mPlatform.mStorageUtil.mSysCfg.enabledEffect()
							) {
								null != this.mPairEffectId &&
									cc.audioEngine.stopEffect(
										this.mPairEffectId
									),
									(this.mPairEffectId =
										cc.audioEngine.playEffect(
											this.mSoundPair,
											!1
										));
								var t = this;
								cc.audioEngine.setFinishCallback(
									this.mPairEffectId,
									function () {
										t.mPairEffectId = null;
									}
								);
							}
						}),
						t
					);
				})();
				o.SoundEffectManager = m;
				var l = function () {
					(this.mReady = !1), (this.mSpriteAtlas = null);
					var t = this;
					cc.resources.load('mj', cc.SpriteAtlas, function (e, o) {
						null == e
							? ((t.mSpriteAtlas = o), (t.mReady = !0))
							: console.log(
									'\u9ebb\u5c06\u56fe\u96c6\u8d44\u6e90\u52a0\u8f7d\u5931\u8d25:' +
										e.message
							  );
					});
				};
				o.default = l;
				var p = (function () {
					function t() {}
					return (
						(t.deg2Rad = function (t) {
							return (t * Math.PI) / 180;
						}),
						(t.rad2Deg = function (t) {
							return (180 * t) / Math.PI;
						}),
						t
					);
				})();
				(o.V2d = p),
					(function (t) {
						(t[(t.EECT_NormalEnv = 0)] = 'EECT_NormalEnv'),
							(t[(t.EECT_LocalEnv_NoOpenId = 1)] =
								'EECT_LocalEnv_NoOpenId'),
							(t[(t.EECT_LocalEnv = 2)] = 'EECT_LocalEnv');
					})(o.EEnvCfgType || (o.EEnvCfgType = {}));
				var u = (function () {
					function t() {
						(this.mResManager = null),
							(this.mSoundManager = null),
							(this.mFrameGame = null),
							(this.mSoundManager = new m());
					}
					return (
						(t.prototype.SpriteAtlasReady = function () {
							return this.mResManager.mReady;
						}),
						(t.prototype.preloadResources = function () {
							null == this.mResManager &&
								(this.mResManager = new l()),
								this.mSoundManager.isLoaded() ||
									this.mSoundManager.preloadResource(
										t.mPlatform.mStorageUtil.mSysCfg.enabledMusic()
									);
						}),
						(t.prototype.getResourcesManager = function () {
							return this.mResManager;
						}),
						(t.prototype.callbackUpload = function () {}),
						(t.getRandomNum = function (t, e) {
							var o = e - t,
								n = Math.random();
							return t + Math.round(n * o);
						}),
						(t.releaseTutorialCells = function (e) {
							for (var o = this.mCells.length, n = 0; n < o; n++)
								for (var i = 0; i < 8; i++) {
									var r = t.cell(n, i).destoryCard();
									null != r && e.put(r.node);
								}
						}),
						(t.totalCell = function () {
							if (null == this.mCells) return 0;
							for (var t = 0, e = 0; e < this.mCells.length; e++)
								t += this.rows(e).length;
							return t;
						}),
						(t.cellsIsValid = function (t) {
							return (
								null != this.mCells &&
								(this.mCells.length == s.ROW_NUM_SHORT ||
									this.mCells.length == s.ROW_NUM_LONG) &&
								(t == a.EGameType.EPractice ||
								t == a.EGameType.ERanking_JD
									? this.mCells.length == s.ROW_NUM_SHORT &&
									  this.totalCell() ==
											s.ROW_NUM_SHORT * s.COLUMN_NUM
									: this.mCells.length == s.ROW_NUM_LONG &&
									  this.totalCell() ==
											s.ROW_NUM_LONG * s.COLUMN_NUM)
							);
						}),
						(t.initCells = function (t) {
							var e =
									t == a.EGameType.EPractice ||
									t == a.EGameType.ERanking_JD
										? s.ROW_NUM_SHORT
										: s.ROW_NUM_LONG,
								o = s.COLUMN_NUM;
							if (e != this.mCells.length) {
								this.mCells = [];
								var n = s.DESIGN_WIDTH,
									r = s.DESIGN_HEIGHT,
									c = (-n * o) / 2,
									m = (r * e) / 2;
								for (
									c += o % 2 == 0 ? n / 2 : 0,
										m -= e % 2 == 0 ? r / 2 : 0,
										d = 0;
									d < e;
									d++
								) {
									var l = c,
										p = new Array();
									for (h = 0; h < o; h++) {
										var u = new i.default(
											cc.v2(l, m),
											d,
											h
										);
										p.push(u), (l += n);
									}
									(m -= r), this.mCells.push(p);
								}
							} else
								for (var d = 0; d < e; d++)
									for (var h = 0; h < o; h++)
										if (
											null !=
											this.mCells[d][h].boundCard()
										)
											throw (
												'\u7f51\u683c' +
												d +
												'|' +
												h +
												'\u4e2d\u7ed1\u5b9a\u7684\u5bf9\u8c61\u672a\u6b63\u786e\u7684\u6e05\u9664'
											);
						}),
						(t.createCards = function (e, o) {
							void 0 === o && (o = !1);
							for (
								var n = new Array(),
									i =
										e == a.EGameType.ERanking_JD ||
										e == a.EGameType.EPractice
											? a.ECard_Type.Feng_2
											: a.ECard_Type.Wan_9,
									r = 0;
								r <= i;
								r++
							)
								for (var c = 0; c < 4; c++) n.push(r);
							if (o) return n;
							var s = t.getShuffleTimes();
							return this.shuffle(n, s);
						}),
						(t.shuffle = function (t, e) {
							if ((void 0 === e && (e = 1), null == t))
								throw '\u53c2\u6570\u4e0d\u5141\u8bb8\u4e3a\u7a7a';
							for (; e--; ) {
								var o = t.length;
								if (0 == o) return null;
								for (var n = void 0, i = o; --i; ) {
									var r = Math.floor(Math.random() * o);
									(n = t[i]), (t[i] = t[r]), (t[r] = n);
								}
							}
							return t;
						}),
						(t.playersLoaded = function () {
							return t.mFlag_Players_Loaded;
						}),
						(t.calculationCellByPos = function (e) {
							var o = new r.StructRC(),
								n = Math.abs(e.x),
								i = Math.abs(e.y),
								a = t.getRow(),
								c = t.getColumn(),
								s = t.getDesignWidth(),
								m = t.getDesignHeight();
							a % 2 != 0 && (i -= t.getDesignHeight() / 2),
								c % 2 != 0 && (n -= t.getDesignWidth() / 2);
							var l = Math.floor(n / s) + (n % s == 0 ? 0 : 1),
								p = Math.floor(i / m) + (i % m == 0 ? 0 : 1);
							return (
								l >= 0 &&
									l <= Math.floor(c / 2) &&
									p >= 0 &&
									p <= Math.floor(a / 2) &&
									(e.x > 0
										? (o.column =
												c % 2 != 0
													? Math.floor(c / 2) + l
													: c / 2 - 1 + l)
										: (o.column =
												c % 2 != 0
													? Math.floor(c / 2) - l
													: c / 2 - l),
									e.y > 0
										? (o.row =
												a % 2 != 0
													? Math.floor(a / 2) - p
													: a / 2 - p)
										: (o.row =
												a % 2 != 0
													? Math.floor(a / 2) + p
													: a / 2 - 1 + p)),
								o
							);
						}),
						(t.cell = function (e, o) {
							if (e >= 0 && e < t.getRow()) {
								var n = this.mCells[e];
								if (o >= 0 && o < n.length)
									return this.mCells[e][o];
							}
							return null;
						}),
						(t.getInstance = function () {
							return (
								null == t.mInstance && (t.mInstance = new t()),
								t.mInstance
							);
						}),
						(t.getShuffleTimes = function () {
							return s.SHUFFLE_TIMES;
						}),
						(t.getPairCount = function () {
							var t = this.mCells.length * s.COLUMN_NUM;
							if (t % 2 == 0) return t / 2;
							throw '\u4e8c\u7ef4\u7f51\u683c\u6570\u7ec4\u7684\u603b\u6570\u4e3a\u57fa\u6570,\u4e0d\u7b26\u5408\u8981\u6c42\uff01';
						}),
						(t.getDesignWidth = function () {
							return s.DESIGN_WIDTH;
						}),
						(t.getDesignHeight = function () {
							return s.DESIGN_HEIGHT;
						}),
						(t.getDesignSize = function () {
							return cc.v2(s.DESIGN_WIDTH, s.DESIGN_HEIGHT);
						}),
						(t.rows = function (t) {
							return t < this.mCells.length ? this.mCells[t] : [];
						}),
						(t.getRow = function () {
							return this.mCells.length;
						}),
						(t.getColumn = function () {
							if (this.mCells.length > 0)
								return this.mCells[0].length;
							throw '\u7f51\u683c\u6570\u7ec4\u4e3anull';
						}),
						(t.ecard_type2name = function (t) {
							var e = '';
							switch (t) {
								case a.ECard_Type.Tong_1:
									e = 'b1';
									break;
								case a.ECard_Type.Tong_2:
									e = 'b2';
									break;
								case a.ECard_Type.Tong_3:
									e = 'b3';
									break;
								case a.ECard_Type.Tong_4:
									e = 'b4';
									break;
								case a.ECard_Type.Tong_5:
									e = 'b5';
									break;
								case a.ECard_Type.Tong_6:
									e = 'b6';
									break;
								case a.ECard_Type.Tong_7:
									e = 'b7';
									break;
								case a.ECard_Type.Tong_8:
									e = 'b8';
									break;
								case a.ECard_Type.Tong_9:
									e = 'b9';
									break;
								case a.ECard_Type.Tiao_1:
									e = 't1';
									break;
								case a.ECard_Type.Tiao_2:
									e = 't2';
									break;
								case a.ECard_Type.Tiao_3:
									e = 't3';
									break;
								case a.ECard_Type.Tiao_4:
									e = 't4';
									break;
								case a.ECard_Type.Tiao_5:
									e = 't5';
									break;
								case a.ECard_Type.Tiao_6:
									e = 't6';
									break;
								case a.ECard_Type.Tiao_7:
									e = 't7';
									break;
								case a.ECard_Type.Tiao_8:
									e = 't8';
									break;
								case a.ECard_Type.Tiao_9:
									e = 't9';
									break;
								case a.ECard_Type.Feng_1:
									e = 'f1';
									break;
								case a.ECard_Type.Feng_2:
									e = 'f2';
									break;
								case a.ECard_Type.Feng_3:
									e = 'f3';
									break;
								case a.ECard_Type.Wan_1:
									e = 'w1';
									break;
								case a.ECard_Type.Wan_2:
									e = 'w2';
									break;
								case a.ECard_Type.Wan_3:
									e = 'w3';
									break;
								case a.ECard_Type.Wan_4:
									e = 'w4';
									break;
								case a.ECard_Type.Wan_5:
									e = 'w5';
									break;
								case a.ECard_Type.Wan_6:
									e = 'w6';
									break;
								case a.ECard_Type.Wan_7:
									e = 'w7';
									break;
								case a.ECard_Type.Wan_8:
									e = 'w8';
									break;
								case a.ECard_Type.Wan_9:
									e = 'w9';
							}
							return e;
						}),
						(t.mInstance = null),
						(t.id_clip_payer_move = null),
						(t.mCells = new Array()),
						(t.mFlag_Players_Loaded = !1),
						(t.mEnvironmentCfg = 0),
						(t.mDebug = !1),
						(t.ENABLE_TIPS_IN_PRACTICE = !0),
						(t.mPlatform = new c.GeneralPlatform()),
						t
					);
				})();
				o.Comm = u;
				var d = (function () {
					function t() {}
					return (
						(t.increasingProps = function (t, e, o, n, i, r, a) {
							void 0 === r && (r = 0.5), void 0 === a && (a = !0);
							var c = t;
							a && ((c = cc.instantiate(t)).parent = t.parent);
							var s = cc.v2(c.x + e, c.y + o),
								m = null == n ? function () {} : n.bind(i);
							cc.tween(c)
								.to(r, { x: s.x, y: s.y })
								.call(function () {
									a
										? (c.parent.removeChild(c), c.destroy())
										: ((c.x = s.x - e),
										  (c.y = s.y - o),
										  (c.active = !1)),
										m();
								})
								.start();
						}),
						(t.increasingPropsEx = function (t, e, o, n, i, r, a) {
							if (
								(void 0 === a && (a = 0.5),
								null != e && null != t)
							) {
								var c = null,
									s = (c =
										e instanceof cc.Prefab
											? cc.instantiate(e)
											: e).getPosition();
								(c.parent = t.parent), (c.x = t.x), (c.y = t.y);
								var m = cc.v2(c.x + o, c.y + n),
									l = null == i ? function () {} : i.bind(r);
								cc.tween(c)
									.to(a, { x: m.x, y: m.y })
									.call(function () {
										e instanceof cc.Prefab
											? (c.parent.removeChild(c, !0),
											  c.destroy())
											: ((t.x = s.x),
											  (t.y = s.y),
											  (t.active = !1)),
											l();
									})
									.start();
							}
						}),
						t
					);
				})();
				(o.UniversalAction = d), cc._RF.pop();
			},
			{
				'./CardCell': 'CardCell',
				'./GameDesk': 'GameDesk',
				'./MyEnums': 'MyEnums',
				'./PlatformMananger': 'PlatformMananger',
				'./typeof': 'typeof'
			}
		],
		CompProp: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'd53be9qjBBO25YNnXdtOze9', 'CompProp');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MotionEfffectManager'),
					m = t('./MyEnums'),
					l = t('./MyEvent'),
					p = t('./PlatformGeneralInterface'),
					u = t('./FrameGame'),
					d = cc._decorator,
					h = d.ccclass,
					f = d.property,
					_ = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mLab_Count = null),
								(e.Mspt_Icon = null),
								(e.mSptF_None = null),
								(e.mSptF_wuxian = null),
								(e.mSrcGameDesk = null),
								(e.mCoolingTime_Cur = 0),
								(e.mEnabledUpdate = !1),
								(e.mCompBtn = null),
								e
							);
						}
						var o;
						return (
							r(e, t),
							(o = e),
							(e.prototype.onLoad = function () {
								(this.mCompBtn = this.getComponent(cc.Button)),
									this.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onClick,
										this
									),
									this.node.on(
										'EVT_USE_PROP_IN_AUXILIARY',
										this.usePropWhileAuxiliary,
										this
									),
									this.node.on(
										'UPDATE_PROP_INFO',
										this.updateInfo,
										this
									),
									c.GameConfig;
							}),
							(e.prototype.reset = function () {
								(this.Mspt_Icon.node.active = !1),
									(this.mLab_Count.node.active = !1);
							}),
							(e.prototype.setupProp = function (t, e) {
								(this.mPropType = t),
									(this.mSrcGameDesk = e),
									this.updateInfo();
							}),
							(e.prototype.isSpecialProp = function (t) {
								return t == this.mPropType ? this : null;
							}),
							(e.prototype.consumeProp = function () {
								return this.mPropType ==
									m.EPropType.EProp_Search
									? u.default.mGameType ==
									  m.EGameType.EPractice
										? (this.mSrcGameDesk.usingProp_Search(),
										  !0)
										: c.Comm.mPlatform.mStorageUtil.mUserInfo.getSearch() >
												0 &&
										  (c.Comm.mPlatform.mStorageUtil.mUserInfo.consumeProp(
												m.EPropType.EProp_Search
										  ),
										  this.mSrcGameDesk.usingProp_Search(),
										  !0)
									: this.mPropType ==
											m.EPropType.EProp_Refresh &&
											(u.default.mGameType ==
											m.EGameType.EPractice
												? (this.mSrcGameDesk.usingProp_Refresh(),
												  !0)
												: c.Comm.mPlatform.mStorageUtil.mUserInfo.getRefresh() >
														0 &&
												  (c.Comm.mPlatform.mStorageUtil.mUserInfo.consumeProp(
														m.EPropType
															.EProp_Refresh
												  ),
												  this.mSrcGameDesk.usingProp_Refresh(),
												  !0));
							}),
							(e.prototype.getWorldPos = function () {
								return this.node.convertToWorldSpaceAR(
									cc.Vec2.ZERO
								);
							}),
							(e.prototype.updateInfo = function () {
								if (
									u.default.mGameType == m.EGameType.EPractice
								)
									return (
										(this.mLab_Count.node.active = !1),
										(this.Mspt_Icon.node.active = !0),
										void (this.Mspt_Icon.spriteFrame =
											this.mSptF_wuxian)
									);
								var t = 0;
								if (this.mPropType == m.EPropType.EProp_Search)
									t =
										c.Comm.mPlatform.mStorageUtil.mUserInfo.getSearch();
								else {
									if (
										this.mPropType !=
										m.EPropType.EProp_Refresh
									)
										return;
									t =
										c.Comm.mPlatform.mStorageUtil.mUserInfo.getRefresh();
								}
								var e = 'x ';
								if (-1 == t)
									return (
										(this.mLab_Count.node.active = !1),
										(this.Mspt_Icon.node.active = !0),
										void (this.Mspt_Icon.spriteFrame =
											this.mSptF_wuxian)
									);
								t > 0
									? ((this.Mspt_Icon.node.active = !1),
									  (this.mLab_Count.node.active = !0),
									  (e += t.toString()),
									  (this.mLab_Count.string = e))
									: ((this.mLab_Count.node.active = !1),
									  (this.Mspt_Icon.node.active = !0),
									  (this.Mspt_Icon.spriteFrame =
											this.mSptF_None));
							}),
							(e.prototype.onClick = function (t) {
								var e = this;
								t.stopPropagation();
								var o = this.getComponent(cc.Button);
								if (null == o || o.enabled)
									if (
										(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
										this.consumeProp())
									)
										h5games.showInterstitial(function () {
											(e.mCompBtn.enabled = !1),
												(e.mEnabledUpdate = !0),
												(e.mCoolingTime_Cur = 0),
												e.updateInfo();
										});
									else {
										var n =
												this.mPropType ==
												m.EPropType.EProp_Search
													? p.ERewardedAdType.ERAT_Tip
													: p.ERewardedAdType
															.ERAT_Shuffle,
											i = this;
										c.Comm.mPlatform.mPlatformUtil.showRewardedVideoAD(
											n,
											this.node,
											function (t) {
												if (
													t ==
													p.ERewardedAdType.ERAT_Tip
												)
													i.node.dispatchEvent(
														new l.EvtMotionEffect(
															s.EMotionType.EMT_PropTip_1,
															null,
															new s.MotionInstance(
																i.node
															),
															function () {
																c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseSearch(),
																	i.updateInfo();
															}
														)
													);
												else {
													if (
														t !=
														p.ERewardedAdType
															.ERAT_Shuffle
													)
														throw (
															'CompProp \u8c03\u7528showRewardedVideoAD,\u56de\u8c03\u51fd\u6570\u8fd4\u56de\u503c\uff1a' +
															n +
															'!=' +
															t +
															';\u6b63\u5e38\u503c\u5e94\u8be5\u4e3a' +
															p.ERewardedAdType
																.ERAT_Tip +
															'\u6216' +
															p.ERewardedAdType
																.ERAT_Shuffle
														);
													i.node.dispatchEvent(
														new l.EvtMotionEffect(
															s.EMotionType.EMT_PropRefresh,
															null,
															new s.MotionInstance(
																i.node
															),
															function () {
																c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRefresh(),
																	i.updateInfo();
															}
														)
													);
												}
											},
											null,
											null
										);
									}
							}),
							(e.prototype.usePropWhileAuxiliary = function () {
								if (this.consumeProp())
									(this.mCompBtn.enabled = !1),
										(this.mEnabledUpdate = !0),
										(this.mCoolingTime_Cur = 0),
										this.updateInfo();
								else if (
									this.mPropType == m.EPropType.EProp_Refresh
								) {
									var t = this;
									c.Comm.mPlatform.mPlatformUtil.showRewardedVideoAD(
										p.ERewardedAdType.ERAT_Shuffle,
										this.node,
										function (e) {
											e ==
												p.ERewardedAdType
													.ERAT_Shuffle &&
												t.node.dispatchEvent(
													new l.EvtMotionEffect(
														s.EMotionType.EMT_PropRefresh,
														null,
														new s.MotionInstance(
															t.node
														),
														function () {
															c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRefresh(),
																t.updateInfo();
														}
													)
												);
										},
										null,
										null
									);
								}
							}),
							(e.prototype.start = function () {}),
							(e.prototype.update = function (t) {
								if (this.mEnabledUpdate)
									return !this.mCompBtn.enabled &&
										((this.mCoolingTime_Cur += t),
										this.mCoolingTime_Cur >=
											o.MAX_COOLING_TIME)
										? ((this.mCompBtn.enabled = !0),
										  void (this.mEnabledUpdate = !1))
										: void 0;
							}),
							(e.MAX_COOLING_TIME = 3),
							a([f(cc.Label)], e.prototype, 'mLab_Count', void 0),
							a([f(cc.Sprite)], e.prototype, 'Mspt_Icon', void 0),
							a(
								[f(cc.SpriteFrame)],
								e.prototype,
								'mSptF_None',
								void 0
							),
							a(
								[f(cc.SpriteFrame)],
								e.prototype,
								'mSptF_wuxian',
								void 0
							),
							(o = a([h], e))
						);
					})(cc.Component);
				(o.default = _), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./FrameGame': 'FrameGame',
				'./MotionEfffectManager': 'MotionEfffectManager',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		ContentAdapter: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '4c73bAgYKBEQaTiyAOYppL1', 'ContentAdapter');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass;
				c.property;
				var m = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						r(e, t),
						(e.prototype.onLoad = function () {
							var t = Math.min(
									cc.view.getCanvasSize().width /
										this.node.width,
									cc.view.getCanvasSize().height /
										this.node.height
								),
								e = this.node.width * t,
								o = this.node.height * t;
							(this.node.width =
								this.node.width *
								(cc.view.getCanvasSize().width / e)),
								(this.node.height =
									this.node.height *
									(cc.view.getCanvasSize().height / o));
						}),
						(e.prototype._updateAllChildNodeWidget = function (t) {
							var e = this;
							if (null != t) {
								var o = t.getComponent(cc.Widget);
								null != o && o.updateAlignment(),
									0 != t.childrenCount &&
										t.children.forEach(function (t) {
											e._updateAllChildNodeWidget(t);
										});
							}
						}),
						a([s], e)
					);
				})(cc.Component);
				(o.default = m), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		CustomMask: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'eaf45yKIs9DlKURXNj5FZB2', 'CustomMask');
				var n,
					i,
					r = t('./typeof'),
					a =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					c = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ElementRect =
						o.ElementRoundRect =
						o.EElementType =
							void 0);
				var s,
					m = t('./CardSrc'),
					l = cc._decorator,
					p = l.ccclass,
					u = l.property;
				((s = i = o.EElementType || (o.EElementType = {}))[
					(s.ERect = 0)
				] = 'ERect'),
					(s[(s.ERoundRect = 1)] = 'ERoundRect'),
					(s[(s.EEllipse = 2)] = 'EEllipse');
				var d = (function () {
						function t(t, e, o) {
							(this.mCenter = t),
								(this.mWidth = e),
								(this.mHeight = o);
							var n = e / 2,
								i = o / 2;
							(this.xl = this.mCenter.x - n),
								(this.xr = this.mCenter.x + n),
								(this.yt = this.mCenter.y + i),
								(this.yb = this.mCenter.y - i);
						}
						return (
							(t.createBy = function (e, o, n, i) {
								var r = Math.abs(o - e),
									a = Math.abs(n - i);
								return new t(cc.v2(e + r / 2, n - a / 2), r, a);
							}),
							(t.prototype.getXL = function () {
								return this.xl;
							}),
							(t.prototype.getXR = function () {
								return this.xr;
							}),
							(t.prototype.getYT = function () {
								return this.yt;
							}),
							(t.prototype.getYB = function () {
								return this.yb;
							}),
							t
						);
					})(),
					h = (function () {
						function t(t, e, o, n, i) {
							void 0 === n && (n = 0),
								void 0 === i && (i = 0),
								(this.mBoundNode = null),
								(this.mMaskNode = null),
								(this.mBoundNode = t),
								(this.mMaskNode = e),
								(this.mOffset_x = n),
								(this.mOffset_y = i),
								(this.mWidth = t.width),
								(this.mHeight = t.height),
								(this.mType = o);
						}
						return (
							(t.prototype.getType = function () {
								return this.mType;
							}),
							(t.prototype.filterRect = function () {
								var t = this.getPosition();
								return new d(t, this.mWidth, this.mHeight);
							}),
							(t.prototype.inBounds = function (t) {
								var e = this.getPosition(),
									o = this.mWidth / 2,
									n = this.mHeight / 2;
								return (
									t.x >= e.x - o &&
									t.x <= e.x + o &&
									t.y >= e.y - n &&
									t.y <= e.y + n
								);
							}),
							(t.prototype.getPosition = function () {
								var t = this.mMaskNode.convertToNodeSpaceAR(
									this.mBoundNode.parent.convertToWorldSpaceAR(
										this.mBoundNode.getPosition()
									)
								);
								return (
									(t.x += this.mOffset_x),
									(t.y += this.mOffset_y),
									t
								);
							}),
							(t.prototype.draw = function () {}),
							t
						);
					})(),
					f = (function (t) {
						function e(e, o, n, r, a) {
							void 0 === r && (r = 0), void 0 === a && (a = 0);
							var c =
								t.call(this, e, o, i.ERoundRect, r, a) || this;
							return (c.mRad = n), c;
						}
						return (
							a(e, t),
							(e.prototype.deg2Rad = function (t) {
								return (t * Math.PI) / 180;
							}),
							(e.prototype.rad2Deg = function (t) {
								return (180 * t) / Math.PI;
							}),
							(e.prototype.draw = function (t) {
								var e = this.getPosition(),
									o = e.x - this.mWidth / 2,
									n = e.x + this.mWidth / 2,
									i = e.y + this.mHeight / 2,
									r = e.y - this.mHeight / 2,
									a = this.mRad / 2;
								t.moveTo(o, i),
									t.lineTo(o + this.mRad, i),
									t.bezierCurveTo(
										o + a,
										i,
										o,
										i - a,
										o,
										i - this.mRad
									),
									t.close(),
									t.moveTo(n, i),
									t.lineTo(n - this.mRad, i),
									t.bezierCurveTo(
										n - a,
										i,
										n,
										i - a,
										n,
										i - this.mRad
									),
									t.close(),
									t.moveTo(n, r),
									t.lineTo(n - this.mRad, r),
									t.bezierCurveTo(
										n - a,
										r,
										n,
										r + a,
										n,
										r + this.mRad
									),
									t.close(),
									t.moveTo(o, r),
									t.lineTo(o, r + this.mRad),
									t.bezierCurveTo(
										o,
										r + a,
										o + a,
										r,
										o + this.mRad,
										r
									),
									t.close();
							}),
							e
						);
					})(h);
				o.ElementRoundRect = f;
				var _ = (function (t) {
					function e(e, o, n, r) {
						return (
							void 0 === n && (n = 0),
							void 0 === r && (r = 0),
							t.call(this, e, o, i.ERect, n, r) || this
						);
					}
					return a(e, t), (e.prototype.draw = function () {}), e;
				})(h);
				o.ElementRect = _;
				var y = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mGraphics = null),
							(e.mElementsRespondEvt = !1),
							(e.mElements = new Array()),
							(e.mElementNode = null),
							(e.mCbWaitWhileFadeIn = !0),
							(e.mEnableUpdate = !1),
							(e.mIsFadeOut = !1),
							(e.mIsFadeIn = !1),
							(e.mDuration = 0),
							(e.mApha = 178),
							(e.mFlag_cbIsExed = !1),
							e
						);
					}
					var o;
					return (
						a(e, t),
						(o = e),
						(e.prototype.addElement = function (t, e, o, n) {
							void 0 === e && (e = 0),
								void 0 === o && (o = 0),
								void 0 === n && (n = 0),
								this.mElements.push(
									new f(t, this.node, e, o, n)
								);
						}),
						(e.prototype.clearElements = function () {
							this.mElements = [];
						}),
						(e.prototype.showMask = function (t, e, n, i, r, a) {
							void 0 === e && (e = !1),
								void 0 === n && (n = 0),
								void 0 === i && (i = !0),
								void 0 === r && (r = !0),
								void 0 === a && (a = !0),
								a && (this.mFlag_cbIsExed = !1),
								null != t && (this.mElementsRespondEvt = !t),
								(this.mCbWaitWhileFadeIn = r),
								(this.node.active = !0),
								(this.mIsFadeIn = e),
								(this.mDuration = n),
								this.mGraphics.clear(),
								i
									? (r || this.callbackWhileShown(),
									  e
											? ((this.mApha = 0),
											  (this.mEnableUpdate = !0))
											: ((this.mApha =
													o.FILL_COLOR_APHA_MAX),
											  this.drawMask()))
									: ((this.mEnableUpdate = !1),
									  this.callbackWhileShown());
						}),
						(e.prototype.hideMask = function (t, e) {
							void 0 === t && (t = !1),
								void 0 === e && (e = 0),
								(this.mIsFadeOut = t),
								(this.mDuration = e),
								t
									? (this.mEnableUpdate = !0)
									: ((this.mEnableUpdate = !1),
									  (this.mApha = o.FILL_COLOR_APHA_MAX),
									  (this.node.active = !1));
						}),
						(e.prototype.callbackWhileShown = function () {
							this.mFlag_cbIsExed = !0;
						}),
						(e.prototype.isIntersecting = function (t, e) {
							var o = Math.abs(e.mCenter.x - t.mCenter.x),
								n = Math.abs(e.mCenter.y - t.mCenter.y),
								i = (t.mWidth + e.mWidth) / 2,
								r = (t.mHeight + e.mHeight) / 2;
							return o < i && n < r;
						}),
						(e.prototype.canDraw = function (t, e) {
							for (var o = 0; o < t.length; o++)
								if (this.isIntersecting(e, t[o])) return !1;
							return !0;
						}),
						(e.prototype.drawRectBy = function (t) {
							(this.mGraphics.strokeColor = cc.color(
								255,
								0,
								0,
								255
							)),
								this.mGraphics.moveTo(t.getXL(), t.getYT()),
								this.mGraphics.lineTo(t.getXR(), t.getYT()),
								this.mGraphics.lineTo(t.getXR(), t.getYB()),
								this.mGraphics.lineTo(t.getXL(), t.getYB()),
								this.mGraphics.close(),
								this.mGraphics.fill();
						}),
						(e.prototype.initGraphics = function () {
							(this.mGraphics.lineWidth = 1),
								(this.mGraphics.fillColor = cc.color(
									0,
									0,
									0,
									this.mApha
								));
						}),
						(e.prototype.drawMask = function () {
							this.mGraphics.clear();
							var t = cc.view.getCanvasSize().width,
								e = cc.view.getCanvasSize().height,
								o = -t / 2,
								n = o + t,
								i = e / 2,
								r = i - e,
								a = new Array(),
								c = new Set(),
								s = new Set();
							c.add(o), s.add(i);
							for (var m = 0; m < this.mElements.length; m++) {
								this.mElements[m].draw(this.mGraphics);
								var l = this.mElements[m].filterRect();
								c.add(l.getXL()),
									c.add(l.getXR()),
									s.add(l.getYT()),
									s.add(l.getYB()),
									a.push(l);
							}
							c.add(n), s.add(r);
							var p = Array.from(c),
								u = Array.from(s);
							for (
								p.sort(function (t, e) {
									return t - e;
								}),
									u.sort(function (t, e) {
										return e - t;
									}),
									this.initGraphics(),
									m = 0;
								m < p.length - 1;
								m++
							)
								for (var h = 0; h < u.length - 1; h++)
									(l = d.createBy(
										p[m],
										p[m + 1],
										u[h],
										u[h + 1]
									)),
										this.canDraw(a, l) &&
											this.drawRectBy(l);
						}),
						(e.prototype.calculationIncreasedApha = function (t) {
							var e = this.mDuration / t;
							return o.FILL_COLOR_APHA_MAX / e;
						}),
						(e.prototype.onTouchEvt = function (t) {
							t.stopPropagation(),
								console.log('CustomMask onClick calling!');
							var e = t.getLocation();
							if (this.mElementsRespondEvt) {
								var o = this.node.convertToNodeSpaceAR(
									t.getLocation()
								);
								if (t.type == cc.Node.EventType.TOUCH_START) {
									for (
										var n = 0;
										n < this.mElements.length;
										n++
									)
										if (this.mElements[n].inBounds(o)) {
											this.mElementNode =
												this.mElements[n].mBoundNode;
											var i =
												this.mElementNode.getComponent(
													m.default
												);
											return null != i && i.isPaired()
												? void (this.mElementNode =
														null)
												: (this.mElementNode.emit(
														'TouchDown_From_Mask_Element',
														e.x,
														e.y
												  ),
												  void this.touchStart());
										}
								} else {
									if (null == this.mElementNode) return;
									if (t.type == cc.Node.EventType.TOUCH_MOVE)
										return (
											this.touchMove(),
											void this.mElementNode.emit(
												'TouchMove_From_Mask_Element',
												e.x,
												e.y
											)
										);
									t.type == cc.Node.EventType.TOUCH_END &&
										(this.touchEnd(),
										this.mElementNode.emit(
											'TouchUp_From_Mask_Element',
											e.x,
											e.y
										));
								}
								this.mElementNode = null;
							}
						}),
						(e.prototype.onLoad = function () {
							this.node.on(
								cc.Node.EventType.TOUCH_START,
								this.onTouchEvt,
								this
							),
								this.node.on(
									cc.Node.EventType.TOUCH_MOVE,
									this.onTouchEvt,
									this
								),
								this.node.on(
									cc.Node.EventType.TOUCH_CANCEL,
									this.onTouchEvt,
									this
								),
								this.node.on(
									cc.Node.EventType.TOUCH_END,
									this.onTouchEvt,
									this
								),
								null == this.mGraphics &&
									(this.mGraphics = this.node.addComponent(
										cc.Graphics
									));
						}),
						(e.prototype.update = function (t) {
							if (this.mEnableUpdate)
								if (this.mIsFadeIn) {
									if (this.mApha < o.FILL_COLOR_APHA_MAX) {
										var e =
											this.calculationIncreasedApha(t);
										(this.mApha += e),
											this.mCbWaitWhileFadeIn ||
												this.callbackWhileShown(),
											this.mApha >=
												o.FILL_COLOR_APHA_MAX &&
												((this.mApha =
													o.FILL_COLOR_APHA_MAX),
												(this.mIsFadeIn = !1),
												(this.mEnableUpdate = !1),
												this.callbackWhileShown()),
											this.drawMask();
									}
								} else
									this.mIsFadeOut
										? this.mApha > 0 &&
										  ((e =
												this.calculationIncreasedApha(
													t
												)),
										  (this.mApha -= e),
										  this.mApha <= 0 &&
												((this.mApha = 0),
												(this.mIsFadeOut = !1),
												(this.mEnableUpdate = !1),
												(this.node.active = !1)),
										  this.drawMask())
										: (this.callbackWhileShown(),
										  (this.mEnableUpdate = !1));
						}),
						(e.FILL_COLOR_APHA_MAX = 178),
						c([u(cc.Graphics)], e.prototype, 'mGraphics', void 0),
						(o = c([p], e))
					);
				})(cc.Component);
				(o.default = y), cc._RF.pop();
			},
			{ './CardSrc': 'CardSrc', './typeof': 'typeof' }
		],
		Datas: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '127f7TZFfdBxL3YkLKM3q4t', 'Datas'),
					t('./typeof');
				var n,
					i,
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ScoreRankingItem =
						o.UserInfo =
						o.RoundsData =
						o.RewardedDataManager =
							void 0);
				var a,
					c = t('./Comm'),
					s = t('./FrameGame'),
					m = t('./MyEnums'),
					l = t('./Storage'),
					p = function () {};
				((a = i || (i = {}))[(a.EVU_Year = 0)] = 'EVU_Year'),
					(a[(a.EVU_Month = 1)] = 'EVU_Month'),
					(a[(a.EVU_Date = 2)] = 'EVU_Date'),
					(a[(a.EVU_Hour = 3)] = 'EVU_Hour');
				var u = (function (t) {
						function e(e, o) {
							var n = t.call(this) || this;
							return n.init(e, o, i.EVU_Date), n;
						}
						return (
							r(e, t),
							(e.prototype.resetedValue = function () {
								return 0;
							}),
							(e.prototype.setValue = function (t) {
								this.mTimes = t;
							}),
							(e.prototype.getValue = function () {
								return this.mTimes;
							}),
							e
						);
					})(
						(function () {
							function t() {}
							return (
								(t.prototype.init = function (t, e, o) {
									if (((this.mEvu = o), e)) {
										var n = new Date();
										this.compareTimes(n, e)
											? (this.setValue(t),
											  this.updateLastDate(e))
											: (this.setValue(
													this.resetedValue()
											  ),
											  this.updateLastDate(n));
									} else
										this.setValue(t),
											this.updateLastDate(e);
								}),
								(t.prototype.increaseValue = function (t) {
									if (this.mLastUpdateTime) {
										var e = new Date();
										if (this.compareTimes(e)) {
											var o = this.getValue();
											this.setValue(o + t);
										} else
											this.setValue(
												this.resetedValue() + t
											);
										this.updateLastDate(new Date());
									} else
										this.updateLastDate(new Date()),
											(o = this.getValue()),
											this.setValue(o + t);
								}),
								(t.prototype.getLastUpdateTime = function () {
									return this.mLastUpdateTime;
								}),
								(t.prototype.compareTimes = function (t, e) {
									void 0 === e && (e = null),
										null == e &&
											(e = this.getLastUpdateTime());
									var o = 0,
										n = 0;
									switch (this.mEvu) {
										case i.EVU_Year:
											(o = e.getFullYear()),
												(n = t.getFullYear());
											break;
										case i.EVU_Month:
											(o =
												e.getFullYear() + e.getMonth()),
												(n =
													t.getFullYear() +
													t.getMonth());
											break;
										case i.EVU_Date:
											(o =
												e.getFullYear() +
												e.getMonth() +
												e.getDate()),
												(n =
													t.getFullYear() +
													t.getMonth() +
													t.getDate());
											break;
										case i.EVU_Hour:
											(o =
												e.getFullYear() +
												e.getMonth() +
												e.getDate() +
												e.getHours()),
												(n =
													t.getFullYear() +
													t.getMonth() +
													t.getDate() +
													t.getHours());
									}
									return o == n;
								}),
								(t.prototype.updateLastDate = function (t) {
									this.mLastUpdateTime = t;
								}),
								t
							);
						})()
					),
					d = function () {
						(this.mSearch = 0), (this.mRefresh = 0);
					},
					h = (function () {
						function t() {
							(this.mReceivedCount_DoubleReward = 0),
								(this.mInfiniteEnergyValidity = 0),
								(this.mLastTime_DoubleReward = new Date()),
								(this.mReceivedCount_DoubleReward = 0),
								(this.mInfiniteEnergyValidity = 0);
						}
						return (
							(t.prototype.initByCache = function (t) {
								t && t.RewardDat
									? ((this.mReceivedCount_DoubleReward =
											t.RewardDat[0]),
									  (this.mLastTime_DoubleReward =
											y.timeStamp2Date(t.RewardDat[1])),
									  (this.mInfiniteEnergyValidity =
											t.RewardDat[2]))
									: console.log(
											'\u5b57\u6bb5\u9519\u8bef',
											t,
											t.RewardDat
									  );
							}),
							(t.prototype.generateCache = function () {
								return {
									RewardDat: [
										this.mReceivedCount_DoubleReward,
										this.mLastTime_DoubleReward.valueOf(),
										this.mInfiniteEnergyValidity
									]
								};
							}),
							(t.prototype.increaseCount_DoubleReward =
								function () {
									return (
										this.isSameDay() ||
											(this.mReceivedCount_DoubleReward = 0),
										(this.mLastTime_DoubleReward =
											new Date()),
										this.mReceivedCount_DoubleReward++,
										c.Comm.mPlatform.mStorageUtil.save2Cache(
											l.EStorageType
												.EST_Cache_RewardedData
										),
										this.mReceivedCount_DoubleReward
									);
								}),
							(t.prototype.previewedAdCount_DoubleReward =
								function () {
									return (
										this.isSameDay() ||
											(this.mReceivedCount_DoubleReward = 0),
										this.mReceivedCount_DoubleReward
									);
								}),
							(t.prototype.setupInfiniteEnergyValidity =
								function () {
									var t = new Date(),
										e = t.getDate();
									t.setDate(e + 1),
										(this.mInfiniteEnergyValidity =
											t.valueOf()),
										c.Comm.mPlatform.mStorageUtil.save2Cache(
											l.EStorageType
												.EST_Cache_RewardedData
										);
								}),
							(t.prototype.isInfiniteEnergyValidity =
								function () {
									return (
										0 != this.mInfiniteEnergyValidity &&
										this.mInfiniteEnergyValidity >
											new Date().valueOf()
									);
								}),
							(t.prototype.isSameDay = function () {
								var t = new Date();
								return (
									t.getFullYear() +
										t.getMonth() +
										t.getDate() ==
									this.mLastTime_DoubleReward.getFullYear() +
										this.mLastTime_DoubleReward.getMonth() +
										this.mLastTime_DoubleReward.getDate()
								);
							}),
							t
						);
					})();
				o.RewardedDataManager = h;
				var f = (function () {
					function t(t) {
						void 0 === t && (t = null),
							(this.mRounds_Total = 0),
							(this.mRoundWin_Total = 0),
							(this.mRounds_Daily = 0),
							(this.mRoundWin_Daily = 0),
							t
								? (this.mLastUpdateTime = t)
								: ((this.mLastUpdateTime = new Date()),
								  this.mLastUpdateTime.setFullYear(1980));
					}
					return (
						(t.prototype.init = function (t, e, o, n, i) {
							var r = new Date();
							i.getFullYear() + i.getMonth() + i.getDate() !=
							r.getFullYear() + r.getMonth() + r.getDate()
								? ((this.mRoundWin_Daily = 0),
								  (this.mRounds_Daily = 0))
								: ((this.mRoundWin_Daily = t),
								  (this.mRounds_Daily = e)),
								(this.mRoundWin_Total = o),
								(this.mRounds_Total = n),
								(this.mLastUpdateTime = r);
						}),
						(t.prototype.lastTime = function () {
							return this.mLastUpdateTime;
						}),
						(t.prototype.rateOfWinningDaily = function () {
							return this.mRounds_Daily > 0
								? this.mRoundWin_Daily / this.mRounds_Daily
								: 0;
						}),
						(t.prototype.rateOfWinningTotal = function () {
							return this.mRounds_Total > 0
								? this.mRoundWin_Total / this.mRounds_Total
								: 0;
						}),
						(t.prototype.roundsWinDaily = function () {
							return this.mRoundWin_Daily;
						}),
						(t.prototype.roundsWinTotal = function () {
							return this.mRoundWin_Total;
						}),
						(t.prototype.roundsDaily = function () {
							return this.mRounds_Daily;
						}),
						(t.prototype.roundsTotal = function () {
							return this.mRounds_Total;
						}),
						(t.prototype.increaseCount = function (t) {
							var e = new Date();
							this.mLastUpdateTime &&
								this.mLastUpdateTime.getFullYear() +
									this.mLastUpdateTime.getMonth() +
									this.mLastUpdateTime.getDate() !=
									e.getFullYear() +
										e.getMonth() +
										e.getDate() &&
								(console.log('\u91cd\u7f6eRateOfSuccess'),
								(this.mRoundWin_Daily = 0),
								(this.mRounds_Daily = 0)),
								t &&
									(this.mRoundWin_Daily++,
									this.mRoundWin_Total++),
								this.mRounds_Daily++,
								this.mRounds_Total++,
								(this.mLastUpdateTime = e);
						}),
						t
					);
				})();
				o.RoundsData = f;
				var _ = (function () {
						function t(t) {
							(this.mVersions = ['1.0.0']),
								(this.mPreVersion = null),
								(this.mPreVersion = t);
						}
						return (
							(t.prototype.initPreVersion = function (t) {
								this.mPreVersion = t;
							}),
							(t.prototype.lastVersion = function () {
								var t = this.mVersions.length;
								return t > 0 ? this.mVersions[t - 1] : null;
							}),
							(t.prototype.initEnergyByJson = function (t) {
								var e = new p();
								return (
									null === this.mPreVersion
										? ((e.mCounter = t.Energy.Counter),
										  (e.mUpdateDate = y.timeStamp2Date(
												t.Energy.LastUpdateTime,
												'\u4f53\u529b\u66f4\u65b0\u65f6\u95f4'
										  )))
										: ((e.mCounter = t.Energy[0]),
										  (e.mUpdateDate = t.Energy[1])),
									e
								);
							}),
							(t.prototype.initPropByJson = function (t) {
								var e = new d();
								return (
									null === this.mPreVersion
										? (t.Prop &&
										  t.Prop.Search &&
										  this.isNumber(t.Prop.Search)
												? (e.mSearch = t.Prop.Search)
												: (e.mSearch = 5),
										  t.Prop &&
										  t.Prop.Refresh &&
										  this.isNumber(t.Prop.Refresh)
												? (e.mRefresh = t.Prop.Refresh)
												: (e.mRefresh = 2))
										: t.Prop
										? ((e.mSearch = t.Prop[0]),
										  (e.mRefresh = t.Prop[1]))
										: ((e.mSearch = 5), (e.mRefresh = 2)),
									e
								);
							}),
							(t.prototype.initVideoPromotionLimitByJson =
								function (t) {
									return null === this.mPreVersion
										? t.ProfitLimit &&
										  t.ProfitLimit.LastSharedTime &&
										  t.ProfitLimit.Times
											? new u(
													t.ProfitLimit.Times,
													y.timeStamp2Date(
														t.ProfitLimit
															.LastSharedTime
													)
											  )
											: new u(0, new Date())
										: t.Integral
										? new u(
												t.VideoPromotion[0],
												y.timeStamp2Date(
													t.VideoPromotion[1]
												)
										  )
										: new u(0, new Date());
								}),
							(t.prototype.initRoundsDataByJson = function (t) {
								if (null == this.mPreVersion)
									return new f(new Date());
								var e = new f();
								return (
									e.init(
										t.Rounds[0],
										t.Rounds[1],
										t.Rounds[2],
										t.Rounds[3],
										y.timeStamp2Date(t.Rounds[4])
									),
									e
								);
							}),
							(t.prototype.generateCacheDate = function (
								t,
								e,
								o,
								n,
								i
							) {
								if (
									null === this.mPreVersion ||
									this.mPreVersion === this.mVersions[0]
								)
									return {
										Version: this.mVersions[0],
										Energy: [
											t.mCounter,
											t.mUpdateDate.valueOf()
										],
										Prop: [e.mSearch, e.mRefresh],
										VideoPromotion: [
											o.getValue(),
											o.getLastUpdateTime().valueOf()
										],
										Rounds: [
											n.roundsWinDaily(),
											n.roundsDaily(),
											n.roundsWinTotal(),
											n.roundsTotal(),
											n.lastTime().valueOf()
										],
										LastUpdateDate: i.valueOf()
									};
							}),
							(t.prototype.isNumber = function (t) {
								return 'number' == typeof t && !isNaN(t);
							}),
							t
						);
					})(),
					y = (function () {
						function t() {
							(this.mEnergy = null),
								(this.mProp = null),
								(this.mIntegral = null),
								(this.mVideoPromotionLimit = null),
								(this.mDataUpdated = !1),
								(this.mRounds = null),
								(this.mVersionManager = null),
								console.log('UserInfo constructor is calling!'),
								(this.mEnergy = new p()),
								(this.mEnergy.mCounter = 0),
								(this.mEnergy.mUpdateDate = new Date()),
								(this.mProp = new d()),
								(this.mProp.mSearch = 5),
								(this.mProp.mRefresh = 2);
							var t = new Date();
							t.setFullYear(1980),
								(this.mIntegral = 0),
								(this.mVideoPromotionLimit = new u(0, t)),
								(this.mRounds = new f()),
								(this.mLastUpdateDate = t),
								(this.mVersionManager = new _(null));
						}
						return (
							(t.prototype.initByJson = function (e, o) {
								void 0 === o && (o = null),
									console.log(e),
									this.mVersionManager.initPreVersion(
										e.Version ? e.Version : null
									),
									(this.mEnergy =
										this.mVersionManager.initEnergyByJson(
											e
										)),
									(this.mProp =
										this.mVersionManager.initPropByJson(e)),
									e.Integral &&
										(this.mIntegral = e.Integral[0]),
									(this.mVideoPromotionLimit =
										this.mVersionManager.initVideoPromotionLimitByJson(
											e
										)),
									e &&
										e.Rounds &&
										(this.mRounds =
											this.mVersionManager.initRoundsDataByJson(
												e
											)),
									(this.mLastUpdateDate = t.timeStamp2Date(
										e.LastUpdateDate,
										'\u6570\u636e\u66f4\u65b0\u7684\u65f6\u95f4'
									));
							}),
							(t.prototype.generateCacheDate = function () {
								return this.mVersionManager.generateCacheDate(
									this.mEnergy,
									this.mProp,
									this.mVideoPromotionLimit,
									this.mRounds,
									this.mLastUpdateDate
								);
							}),
							(t.prototype.increaseRoundOnce = function (t) {
								this.mRounds.increaseCount(t),
									t ||
										c.Comm.mPlatform.mPlatformUtil.updateRank_Integral(
											0,
											!1
										);
							}),
							(t.prototype.minimumForecastLengthInStartByRateOfSuccess =
								function () {
									if (
										s.default.mGameType ==
											m.EGameType.EPractice ||
										s.default.mGameType ==
											m.EGameType.ERanking_JD
									)
										return 5;
									var t = this.mRounds.roundsTotal();
									if (t <= 10) {
										if (
											(console.log(
												'\u65b0\u624b\u4fdd\u62a4\u4e2d...'
											),
											t <= 3)
										)
											return 15;
										var e =
											this.mRounds.rateOfWinningTotal();
										return (
											console.log(
												'\u5f53\u524d\u80dc\u7387(\u4ee5\u603b\u8ba1\u6570\u4e3a\u51c6):',
												100 * e
											),
											e < 0.3
												? 15
												: e < 0.5
												? 12
												: e >= 0.8
												? 5
												: 9
										);
									}
									console.log(
										'\u5df2\u8fc7\u65b0\u624b\u4fdd\u62a4\u671f...'
									);
									var o = this.mRounds.rateOfWinningDaily();
									return (
										console.log(
											'\u5f53\u524d\u80dc\u7387(\u4ee5\u6bcf\u65e5\u8ba1\u6570\u4e3a\u51c6):',
											100 * o
										),
										o > 0.5
											? o >= 0.8
												? (console.log(
														'\u80dc\u7387\u5927\u4e8e\u6216\u7b49\u4e8e0.8,\u6700\u5c0f\u503c\u4e3a\uff1a',
														2
												  ),
												  2)
												: (console.log(
														'\u80dc\u7387\u5c0f\u4e8e0.8\u4e14\u5927\u4e8e\u6216\u7b49\u4e8e0.5,\u6700\u5c0f\u503c\u4e3a\uff1a',
														5
												  ),
												  5)
											: o <= 0.2
											? (console.log(
													'\u80dc\u7387\u5c0f\u4e8e\u6216\u7b49\u4e8e0.3\u4e14\u5927\u4e8e0.2,\u6700\u5c0f\u503c\u4e3a\uff1a',
													15
											  ),
											  15)
											: o <= 0.3
											? (console.log(
													'\u80dc\u7387\u5c0f\u4e8e\u6216\u7b49\u4e8e0.2,\u6700\u5c0f\u503c\u4e3a\uff1a',
													12
											  ),
											  12)
											: (console.log(
													'\u80dc\u7387\u57280.3~0.5\u4e4b\u95f4,\u6700\u5c0f\u503c\u4e3a\uff1a',
													8
											  ),
											  8)
									);
								}),
							(t.prototype.extractIntegralVal = function () {
								var t = this.mIntegral;
								return (this.mIntegral = 0), t;
							}),
							(t.prototype.lastUpdateDateValue = function () {
								return this.mLastUpdateDate.valueOf();
							}),
							(t.timeStamp2Date = function (t, e) {
								void 0 === e && (e = '');
								var o = new Date();
								if ('string' == typeof t) {
									var n = +t;
									if (isNaN(n))
										return (
											c.Comm.mPlatform.mPlatformUtil.log(
												e +
													'\u65f6\u95f4\u6233\u683c\u5f0f\u9519\u8bef,\u975e\u6b63\u5e38\u7684\u65f6\u95f4\u6233[' +
													this.timeStamp2Date +
													']'
											),
											o
										);
									o.setTime(n);
								} else o.setTime(t);
								return o;
							}),
							(t.prototype.increaseShareBy = function () {
								this.mVideoPromotionLimit.increaseValue(1),
									(this.mDataUpdated = !0);
							}),
							(t.prototype.canSharByVideo = function () {
								return (
									this.mVideoPromotionLimit.getValue() <
									c.GameConfig.MAX_SHARE_RECORDER_COUNT
								);
							}),
							(t.prototype.saveDatas = function (t, e, o) {
								if (
									(void 0 === o && (o = !1),
									!this.mDataUpdated)
								)
									return (
										console.log(
											'\u6570\u636e\u672a\u66f4\u65b0,\u4e0d\u9700\u8981\u540c\u6b65'
										),
										void (t && t.bind(e)())
									);
								(this.mLastUpdateDate = new Date()),
									c.Comm.mPlatform.mStorageUtil.save2Cache(
										l.EStorageType.EST_Cache_UserInfo
									),
									o &&
										(console.log(
											'\u540c\u6b65\u6570\u636e\u5230\u4e91\u7aef'
										),
										(this.mDataUpdated = !1),
										c.Comm.mPlatform.mStorageUtil.save2Colud()),
									t && t.bind(e)();
							}),
							(t.prototype.getSearch = function () {
								return this.mProp.mSearch;
							}),
							(t.prototype.getRefresh = function () {
								return this.mProp.mRefresh;
							}),
							(t.prototype.remainderEnergy = function () {
								var t =
										(new Date().valueOf() -
											this.mEnergy.mUpdateDate.valueOf()) /
										1e3,
									e =
										this.mEnergy.mCounter >= t
											? this.mEnergy.mCounter - t
											: 0;
								return (
									c.GameConfig.Max_Energy_Num -
									Math.ceil(
										e / c.GameConfig.RestoreEnergy_Counter
									)
								);
							}),
							(t.prototype.count = function () {
								return this.mEnergy.mCounter;
							}),
							(t.prototype.energyTime = function () {
								return this.mEnergy.mUpdateDate.valueOf();
							}),
							(t.prototype.getCount = function () {
								var t =
									(new Date().valueOf() -
										this.mEnergy.mUpdateDate.valueOf()) /
									1e3;
								return this.mEnergy.mCounter >= t
									? this.mEnergy.mCounter - t
									: 0;
							}),
							(t.prototype.restoreEnergies = function () {
								(this.mEnergy.mCounter = 0),
									(this.mEnergy.mUpdateDate = new Date()),
									(this.mDataUpdated = !0);
							}),
							(t.prototype.increaseSearch = function (t) {
								void 0 === t && (t = 1),
									(this.mProp.mSearch += t),
									(this.mDataUpdated = !0);
							}),
							(t.prototype.increaseRefresh = function (t) {
								void 0 === t && (t = 1),
									(this.mProp.mRefresh += t),
									(this.mDataUpdated = !0);
							}),
							(t.prototype.increaseEnergy = function () {
								if (0 === this.mEnergy.mCounter) return -1;
								var t = new Date(),
									e =
										(t.valueOf() -
											this.mEnergy.mUpdateDate.valueOf()) /
										1e3,
									o = this.mEnergy.mCounter - e;
								return o > 0
									? ((this.mEnergy.mCounter =
											o -
											c.GameConfig.RestoreEnergy_Counter),
									  this.mEnergy.mCounter < 0 &&
											(this.mEnergy.mCounter = 0),
									  (this.mEnergy.mUpdateDate = t),
									  (this.mDataUpdated = !0),
									  this.mEnergy.mCounter)
									: ((this.mEnergy.mCounter = 0),
									  (this.mEnergy.mUpdateDate = t),
									  -1);
							}),
							(t.prototype.consumeProp = function (t) {
								(this.mDataUpdated = !0),
									t == m.EPropType.EProp_Search
										? this.mProp.mSearch--
										: t === m.EPropType.EProp_Refresh &&
										  this.mProp.mRefresh--;
							}),
							(t.prototype.consumeEnergy = function () {
								var t = new Date(),
									e =
										(t.valueOf() -
											this.mEnergy.mUpdateDate.valueOf()) /
										1e3,
									o =
										this.mEnergy.mCounter >= e
											? this.mEnergy.mCounter - e
											: 0;
								return o <=
									(c.GameConfig.Max_Energy_Num - 1) *
										c.GameConfig.RestoreEnergy_Counter
									? ((this.mEnergy.mCounter =
											o +
											c.GameConfig.RestoreEnergy_Counter),
									  (this.mEnergy.mUpdateDate = t),
									  (this.mDataUpdated = !0),
									  c.Comm.mPlatform.mStorageUtil.save2Cache(
											l.EStorageType.EST_Cache_UserInfo
									  ),
									  this.mEnergy.mCounter)
									: -1;
							}),
							t
						);
					})();
				o.UserInfo = y;
				var g = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return r(e, t), e;
				})(function () {});
				(o.ScoreRankingItem = g), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./Storage': 'Storage',
				'./typeof': 'typeof'
			}
		],
		DevStorage: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '8ebb3g519pJzq4OTflW3yj6', 'DevStorage'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.DevStorage = void 0);
				var r = t('./Storage'),
					a = (function (t) {
						function e() {
							return (
								(null !== t && t.apply(this, arguments)) || this
							);
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								return null;
							}),
							(e.prototype.validSeatAuth = function () {}),
							(e.prototype.isErrorEnv = function () {
								return !1;
							}),
							(e.prototype.seatSignIsValid = function () {
								return !1;
							}),
							(e.prototype.extractCachedData = function () {
								var t = cc.sys.localStorage.getItem(
										r.default.KEY_CACHE_USERINFO
									),
									e = cc.sys.localStorage.getItem(
										r.default.KEY_CACHE_SYS_CFG
									);
								console.log('usr_data', t),
									console.log('cfg', e),
									t
										? this.mUserInfo.initByJson(
												JSON.parse(t)
										  )
										: this.save2Cache(
												r.EStorageType
													.EST_Cache_UserInfo
										  ),
									e
										? this.mSysCfg.initByCache(
												JSON.parse(e)
										  )
										: this.save2Cache(
												r.EStorageType.EST_Cache_SysCfg
										  );
							}),
							(e.prototype.save2Cache = function (t) {
								var e = '',
									o = null;
								switch (t) {
									case r.EStorageType.EST_Cache_UserInfo:
										(e = r.default.KEY_CACHE_USERINFO),
											(o = JSON.stringify(
												this.mUserInfo.generateCacheDate()
											));
										break;
									case r.EStorageType.EST_Cache_SysCfg:
										(e = r.default.KEY_CACHE_SYS_CFG),
											(o = JSON.stringify(
												this.mSysCfg.generateCache()
											));
								}
								console.log(e, o),
									e && null != o
										? cc.sys.localStorage.getItem(e, o)
										: console.log(
												'\u6570\u636e\u5f02\u5e38,\u653e\u5f03\u5b58\u50a8key: %s, data:',
												e,
												o
										  );
							}),
							(e.prototype.save2Colud = function () {}),
							e
						);
					})(r.default);
				(o.DevStorage = a), cc._RF.pop();
			},
			{ './Storage': 'Storage', './typeof': 'typeof' }
		],
		DialogBase: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '61dbecHyw1Nt6b1mXkVNFgU', 'DialogBase');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass,
					m = c.property,
					l = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mBtnClose = null),
								(e.mSpt_Title = null),
								(e.mSF_Mask = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.onLoad = function () {
								var t = this.node.getComponent(cc.Sprite);
								null == t &&
									((t = this.node.addComponent(
										cc.Sprite
									)).spriteFrame = this.mSF_Mask),
									this.node.on(
										cc.Node.EventType.TOUCH_START,
										this.interceptTouch,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_MOVE,
										this.interceptTouch,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_END,
										this.interceptTouch,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_CANCEL,
										this.interceptTouch,
										this
									);
								var e = this.node.getComponent(cc.Widget);
								null == e &&
									(((e = this.node.addComponent(
										cc.Widget
									)).left = 0),
									(e.top = 0),
									(e.right = 0),
									(e.bottom = 0));
							}),
							(e.prototype.onEnable = function () {
								this.mBtnClose.node.active = !1;
							}),
							(e.prototype.interceptTouch = function (t) {
								t.stopPropagation();
							}),
							a([m(cc.Button)], e.prototype, 'mBtnClose', void 0),
							a(
								[m(cc.Sprite)],
								e.prototype,
								'mSpt_Title',
								void 0
							),
							a(
								[m(cc.SpriteFrame)],
								e.prototype,
								'mSF_Mask',
								void 0
							),
							a([s], e)
						);
					})(cc.Component);
				(o.default = l), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		DialogDuihuan: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'd516dtnw4FF2JGPnQXi49BA', 'DialogDuihuan');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEvent'),
					m = cc._decorator,
					l = m.ccclass,
					p = m.property,
					u = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mFrameHome = null),
								(e.mInput_CDKey = null),
								(e.mNode_BtnSubmit = null),
								(e.mNode_BtnClose = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.checkAndProvideReward = function (t) {
								var e = this,
									o = this.mFrameHome;
								c.Comm.mPlatform.mStorageUtil.useCDKey(
									t,
									function (n, i, r, a) {
										var m = '    Claimed! You got';
										n > 0 && (m += 'Tip*' + n),
											i > 0 && (m += ',Switch*' + i),
											r > 0 &&
												(m += ',Unlimited energy 24h'),
											a > 0 && (m += ',Score+' + a),
											(m += '\u3002'),
											e.node.dispatchEvent(
												new s.EvtWarningMsg(
													m,
													!1,
													!1,
													function () {
														n > 0 &&
															c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseSearch(
																n
															),
															i > 0 &&
																c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRefresh(
																	i
																),
															r > 0 &&
																o.emit(
																	c.GameConfig
																		.EMIT_FIELD_FRAME_HOME_SWITCH_INFINITE
																),
															a > 0 &&
																c.Comm.mPlatform.mPlatformUtil.updateRank_Integral(
																	a,
																	!0
																),
															c.Comm.mPlatform.mStorageUtil.realUseCDKey(
																t
															);
													},
													function () {}
												)
											);
									},
									function () {
										e.node.dispatchEvent(
											new s.EvtWarningMsg(
												'    \u793c\u5305\u7801\u65e0\u6548\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u793c\u5305\u7801\uff01'
											)
										);
									},
									function () {
										e.node.dispatchEvent(
											new s.EvtWarningMsg(
												'    \u793c\u5305\u7801\u5df2\u4f7f\u7528\uff0c\u65e0\u6cd5\u91cd\u590d\u4f7f\u7528\uff01'
											)
										);
									}
								);
							}),
							(e.prototype.onBtnClick = function (t) {
								t.stopPropagation();
								var e = t.target;
								if (e instanceof cc.Node) {
									var o = e.getComponent(cc.Button);
									if (null != o) {
										if (!o.enabled) return;
										(o.enabled = !1),
											o.scheduleOnce(function () {
												o.enabled = !0;
											}, 0.5);
									}
								}
								if (
									(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									e == this.mNode_BtnSubmit)
								) {
									var n = this.mInput_CDKey.string;
									console.log(n),
										0 == n.length
											? this.node.dispatchEvent(
													new s.EvtShowToast(
														'\u793c\u5305\u7801\u4e0d\u80fd\u4e3a\u7a7a'
													)
											  )
											: this.checkAndProvideReward(n);
								} else
									e == this.mNode_BtnClose &&
										(this.node.active = !1);
							}),
							(e.prototype.interceptTouch = function (t) {
								t.stopPropagation();
							}),
							(e.prototype.onLoad = function () {
								this.node.on(
									cc.Node.EventType.TOUCH_END,
									this.interceptTouch,
									this
								),
									this.mNode_BtnSubmit.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnClose.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									);
							}),
							(e.prototype.start = function () {}),
							a([p(cc.Node)], e.prototype, 'mFrameHome', void 0),
							a(
								[p(cc.EditBox)],
								e.prototype,
								'mInput_CDKey',
								void 0
							),
							a(
								[p(cc.Node)],
								e.prototype,
								'mNode_BtnSubmit',
								void 0
							),
							a(
								[p(cc.Node)],
								e.prototype,
								'mNode_BtnClose',
								void 0
							),
							a([l], e)
						);
					})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './Comm': 'Comm', './MyEvent': 'MyEvent', './typeof': 'typeof' }
		],
		DialogFailed: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '77513ZiIltDgadhz3AZ+ZF2', 'DialogFailed');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEnums'),
					m = t('./MyEvent'),
					l = t('./PlatformGeneralInterface'),
					p = t('./FrameGame'),
					u = t('./DialogBase'),
					d = cc._decorator,
					h = d.ccclass,
					f = d.property,
					_ = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_Root = null),
								(e.mLab_Con = null),
								(e.mNode_Sub = null),
								(e.mNode_GameOver = null),
								(e.mNode_BtnRewardAd = null),
								(e.mNode_BtnCancel = null),
								(e.mSPT_BtnIcon = null),
								(e.mSPF_AD = null),
								(e.mSPF_Share = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.onLoad = function () {
								t.prototype.onLoad.call(this),
									this.mNode_BtnRewardAd.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnAd,
										this
									),
									this.mNode_BtnCancel.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnCancel,
										this
									),
									this.mBtnClose.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClose,
										this
									);
							}),
							(e.prototype.showFailed = function () {
								(this.mNode_Sub.active = !1),
									(this.mLab_Con.node.active = !1),
									p.default.mGameType == s.EGameType.EPractice
										? ((this.mLab_Con.string =
												'     Unfortunately, there is no mahjong on the table that meets the elimination rules. Please try again!'),
										  (this.mLab_Con.node.active = !0))
										: (c.Comm.mPlatform.mPlatformUtil.updateFailDialog(),
										  (this.mNode_Sub.active = !0)),
									(this.mSPT_BtnIcon.spriteFrame =
										this.mSPF_AD),
									c.Comm.mPlatform.mPlatformUtil.stopRecorder(
										l.ERecordStopType.ERST_Fail
									),
									(this.mNode_GameOver.active = !0),
									(this.mBtnClose.node.active = !0),
									(this.mBtnClose.node.opacity = 255),
									(this.node.active = !0),
									c.Comm.mPlatform.mPlatformUtil.showInterstitialAd();
							}),
							(e.prototype.onBtnAd = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick();
								var o = this;
								c.Comm.mPlatform.mPlatformUtil.showRewardedVideoAD(
									l.ERewardedAdType.ERAT_Fuhuo,
									this.node,
									function (t) {
										if (t != l.ERewardedAdType.ERAT_Fuhuo)
											throw (
												'DialogFailed \u8c03\u7528showRewardedVideoAD,\u56de\u8c03\u51fd\u6570\u8fd4\u56de\u503c\uff1a' +
												l.ERewardedAdType.ERAT_Fuhuo +
												'!=' +
												t
											);
										o.node.dispatchEvent(new m.EvtFuhuo()),
											(o.node.active = !1);
									},
									null,
									null
								);
							}),
							(e.prototype.onBtnCancel = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									p.default.mGameType !=
										s.EGameType.EPractice &&
										c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRoundOnce(
											!1
										),
									this.node.dispatchEvent(
										new m.EvtSubBtnClick(
											s.EBtnClickType.ECancel
										)
									);
							}),
							(e.prototype.onBtnClose = function (t) {
								t.stopPropagation();
								var e = this.mBtnClose;
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									p.default.mGameType !=
										s.EGameType.EPractice &&
										c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRoundOnce(
											!1
										),
									this.node.dispatchEvent(
										new m.EvtSubBtnClick(
											s.EBtnClickType.ECancel
										)
									);
							}),
							(e.prototype.onDisable = function () {
								c.Comm.mPlatform.mPlatformUtil.hideInterstitialAd();
							}),
							a([f(cc.Node)], e.prototype, 'mNode_Root', void 0),
							a([f(cc.Label)], e.prototype, 'mLab_Con', void 0),
							a([f(cc.Node)], e.prototype, 'mNode_Sub', void 0),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_GameOver',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnRewardAd',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnCancel',
								void 0
							),
							a(
								[f(cc.Sprite)],
								e.prototype,
								'mSPT_BtnIcon',
								void 0
							),
							a(
								[f(cc.SpriteFrame)],
								e.prototype,
								'mSPF_AD',
								void 0
							),
							a(
								[f(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Share',
								void 0
							),
							a([h], e)
						);
					})(u.default);
				(o.default = _), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		DialogGuanzhu: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'adb7dHrBGtDEYCq6ekw5K2O', 'DialogGuanzhu');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEvent'),
					m = t('./Storage'),
					l = cc._decorator,
					p = l.ccclass,
					u = l.property,
					d = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_BtnSubmit = null),
								(e.mNode_BtnCancel = null),
								(e.mNode_BtnClose = null),
								(e.mNode_FrameHome = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.onBtnClick = function (t) {
								var e = this;
								t.stopPropagation();
								var o = t.target;
								if (o instanceof cc.Node) {
									var n = o.getComponent(cc.Button);
									if (null != n) {
										if (!n.enabled) return;
										(n.enabled = !1),
											n.scheduleOnce(function () {
												n.enabled = !0;
											}, 0.5);
									}
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									o == this.mNode_BtnSubmit
										? ((this.node.active = !1),
										  c.Comm.mPlatform.mPlatformUtil.guanzhuWhileDouyin(
												function (t) {
													t
														? c.Comm.mPlatform.mStorageUtil.mStatusManager.checkGuanzhuReward()
															? e.node.dispatchEvent(
																	new s.EvtWarningMsg(
																		'   \u5f88\u62b1\u6b49\uff01\u60a8\u5df2\u7ecf\u9886\u53d6\u8fc7\u5173\u6ce8\u5956\u52b1\uff0c\u91cd\u590d\u5173\u6ce8\u65e0\u6548\u3002\u5173\u6ce8\u6296\u97f3\u53f7\u540e\u7eed\u4f1a\u4e0d\u5b9a\u671f\u53d1\u653e\u793c\u5305\u7801\uff01'
																	)
															  )
															: (e.mNode_FrameHome.emit(
																	c.GameConfig
																		.EMIT_FIELD_FRAME_HOME_GUANZHU
															  ),
															  c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseSearch(
																	3
															  ),
															  c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRefresh(
																	2
															  ),
															  c.Comm.mPlatform.mStorageUtil.mStatusManager.setupGuanzhu(),
															  c.Comm.mPlatform.mStorageUtil.save2Cache(
																	m
																		.EStorageType
																		.EST_Cache_Status
															  ),
															  e.node.dispatchEvent(
																	new s.EvtWarningMsg(
																		'   \u5173\u6ce8\u6210\u529f\uff01\u9053\u5177\u5df2\u53d1\u653e\uff0c\u8bf7\u5728\u6e38\u620f\u4e2d\u67e5\u770b\uff01'
																	)
															  ))
														: e.node.dispatchEvent(
																new s.EvtShowToast(
																	'\u653e\u5f03\u5173\u6ce8'
																)
														  );
												},
												function (t) {
													10601 == t
														? e.node.dispatchEvent(
																new s.EvtShowToast(
																	'\u8bf7\u767b\u5f55\u6296\u97f3\u540e\u518d\u64cd\u4f5c\uff01'
																)
														  )
														: 10301 == t
														? e.node.dispatchEvent(
																new s.EvtShowToast(
																	'\u60a8\u5f53\u524dAPP\u4e0d\u652f\u6301'
																)
														  )
														: e.node.dispatchEvent(
																new s.EvtShowToast(
																	'\u5173\u6ce8\u5931\u8d25,\u8bf7\u7a0d\u540e\u518d\u8bd5'
																)
														  );
												}
										  ))
										: (o != this.mNode_BtnCancel &&
												o != this.mNode_BtnClose) ||
										  (this.node.active = !1);
							}),
							(e.prototype.interceptTouch = function (t) {
								t.stopPropagation();
							}),
							(e.prototype.onLoad = function () {
								this.node.on(
									cc.Node.EventType.TOUCH_END,
									this.interceptTouch,
									this
								),
									this.mNode_BtnSubmit.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnClose.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnCancel.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									);
							}),
							(e.prototype.start = function () {}),
							a(
								[u(cc.Node)],
								e.prototype,
								'mNode_BtnSubmit',
								void 0
							),
							a(
								[u(cc.Node)],
								e.prototype,
								'mNode_BtnCancel',
								void 0
							),
							a(
								[u(cc.Node)],
								e.prototype,
								'mNode_BtnClose',
								void 0
							),
							a(
								[u(cc.Node)],
								e.prototype,
								'mNode_FrameHome',
								void 0
							),
							a([p], e)
						);
					})(cc.Component);
				(o.default = d), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MyEvent': 'MyEvent',
				'./Storage': 'Storage',
				'./typeof': 'typeof'
			}
		],
		DialogMessage: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '169e3YJjC9HSL57+5+ZTn8E', 'DialogMessage');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = cc._decorator,
					m = s.ccclass,
					l = s.property,
					p = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_BtnSubmit = null),
								(e.mNode_BtnCancel = null),
								(e.mNode_Content = null),
								(e.mLab_Msg = null),
								(e.mWdt_Title = null),
								(e.mNode_Icon = null),
								(e.mCallbackSubmit = null),
								(e.mCallbackCanel = null),
								(e.mContentHeight_Hestory = 0),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showDialog = function (
								t,
								e,
								o,
								n,
								i,
								r
							) {
								void 0 === o && (o = !0),
									void 0 === n && (n = null),
									void 0 === i && (i = void 0),
									void 0 === r && (r = null);
								var a =
									null == t ? '\u65e0\u6548\u6587\u672c' : t;
								o && (a = '      ' + a),
									(this.mLab_Msg.string = t),
									(this.mNode_Icon.active = e),
									(this.mNode_BtnSubmit.active = !0),
									(this.mCallbackSubmit =
										null == n
											? function () {}
											: null == r
											? n
											: n.bind(r)),
									void 0 === i
										? ((this.mNode_BtnCancel.active = !1),
										  (this.mNode_BtnSubmit.x = 0))
										: ((this.mNode_BtnSubmit.x = -120),
										  (this.mNode_BtnCancel.x = 120),
										  (this.mNode_BtnCancel.active = !0),
										  null === i
												? (i = function () {})
												: (this.mCallbackCanel =
														null == r
															? i
															: i.bind(r))),
									(this.node.active = !0),
									(this.node.parent.active = !0);
							}),
							(e.prototype.onSubmit = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									this.mCallbackSubmit(),
									(this.node.parent.active = !1);
							}),
							(e.prototype.onCancel = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									null != this.mCallbackCanel &&
										this.mCallbackCanel(),
									(this.node.parent.active = !1);
							}),
							(e.prototype.onParentTouch = function (t) {
								t.stopPropagation();
							}),
							(e.prototype.onLoad = function () {
								this.mNode_BtnSubmit.on(
									cc.Node.EventType.TOUCH_END,
									this.onSubmit,
									this
								),
									this.mNode_BtnCancel.on(
										cc.Node.EventType.TOUCH_END,
										this.onCancel,
										this
									),
									this.node.parent.on(
										cc.Node.EventType.TOUCH_END,
										this.onParentTouch,
										this
									);
							}),
							(e.prototype.start = function () {}),
							(e.prototype.update = function () {
								this.mContentHeight_Hestory !=
									this.mNode_Content.height &&
									((this.mContentHeight_Hestory =
										this.mNode_Content.height),
									(this.node.height =
										this.mNode_Content.height + 90 + 50),
									this.mWdt_Title.updateAlignment());
							}),
							a(
								[l(cc.Node)],
								e.prototype,
								'mNode_BtnSubmit',
								void 0
							),
							a(
								[l(cc.Node)],
								e.prototype,
								'mNode_BtnCancel',
								void 0
							),
							a(
								[l(cc.Node)],
								e.prototype,
								'mNode_Content',
								void 0
							),
							a([l(cc.Label)], e.prototype, 'mLab_Msg', void 0),
							a(
								[l(cc.Widget)],
								e.prototype,
								'mWdt_Title',
								void 0
							),
							a([l(cc.Node)], e.prototype, 'mNode_Icon', void 0),
							a([m], e)
						);
					})(cc.Component);
				(o.default = p), cc._RF.pop();
			},
			{ './Comm': 'Comm', './typeof': 'typeof' }
		],
		DialogPause: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'f1ef0qwKd5Cj5i09d6wjTp2', 'DialogPause');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEnums'),
					m = t('./MyEvent'),
					l = t('./DialogBase'),
					p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mBtnContinue = null), (e.mBtnBack = null), e
							);
						}
						return (
							r(e, t),
							(e.prototype.onLoad = function () {
								var e = this;
								t.prototype.onLoad.call(this);
								var o = this;
								this.mBtnContinue.node.on(
									cc.Node.EventType.TOUCH_END,
									function (t) {
										h5games.showInterstitial(function () {
											t.stopPropagation();
											var e = o.mBtnContinue;
											if (null != e) {
												if (!e.enabled) return;
												(e.enabled = !1),
													e.scheduleOnce(function () {
														e.enabled = !0;
													}, 0.5);
											}
											c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
												o.node.dispatchEvent(
													new m.EvtSubBtnClick(
														s.EBtnClickType.EContinue
													)
												);
										});
									},
									this
								),
									this.mBtnBack.node.on(
										cc.Node.EventType.TOUCH_END,
										function (t) {
											h5games.showInterstitial(
												function () {
													t.stopPropagation();
													var n = e.mBtnBack;
													if (null != n) {
														if (!n.enabled) return;
														(n.enabled = !1),
															n.scheduleOnce(
																function () {
																	n.enabled =
																		!0;
																},
																0.5
															);
													}
													c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
														o.node.dispatchEvent(
															new m.EvtCancelFromPause()
														);
												}
											);
										},
										this
									);
							}),
							(e.prototype.start = function () {}),
							(e.prototype.onDisable = function () {
								c.Comm.mPlatform.mPlatformUtil.hideInterstitialAd();
							}),
							a(
								[d(cc.Button)],
								e.prototype,
								'mBtnContinue',
								void 0
							),
							a([d(cc.Button)], e.prototype, 'mBtnBack', void 0),
							a([u], e)
						);
					})(l.default);
				(o.default = h), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./typeof': 'typeof'
			}
		],
		DialogRestorByShare: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(
					e,
					'883a1rF+E1Gc4mtRUsv3JmA',
					'DialogRestorByShare'
				);
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MotionEfffectManager'),
					m = t('./MyEvent'),
					l = t('./PlatformGeneralInterface'),
					p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_Root = null),
								(e.mNode_EnergyRoot = null),
								(e.mLab_Context = null),
								(e.mBtn_Submit = null),
								(e.mBtn_Cancel = null),
								(e.mSpt_Title = null),
								(e.mSPF_Title_Energy = null),
								(e.mSPF_Title_Prop = null),
								(e.mNode_FrameHome = null),
								(e.mNode_FrameGame = null),
								(e.mTag = null),
								(e.mErat = l.ERewardedAdType.ERAT_None),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showDialog = function (t, e) {
								if (
									((this.mTag = e),
									(this.mErat = t),
									!c.Comm.mPlatform.mPlatformUtil.isWeChat())
								)
									throw '\u8be5\u7c7b\u4ec5\u5728\u5fae\u4fe1\u7aef\u4e14\u672a\u5f00\u901a\u5e7f\u544a\u65f6\u4f7f\u7528';
								if (t == l.ERewardedAdType.ERAT_Energy)
									(this.mLab_Context.string =
										'     \u5206\u4eab\u7ed9\u597d\u53cb\u6216\u5fae\u4fe1\u7fa4\uff0c\u53ef\u83b7\u5f97\u4e00\u70b9\u4f53\u529b\uff0c\u662f\u5426\u7ee7\u7eed\uff1f'),
										(this.mSpt_Title.spriteFrame =
											this.mSPF_Title_Energy);
								else {
									if (
										t != l.ERewardedAdType.ERAT_Tip &&
										t != l.ERewardedAdType.ERAT_Shuffle
									)
										throw '\u4e0d\u63a5\u53d7\u9664ERAT_Energy\u3001ERAT_Tip\u548cERAT_Shuffle\u4ee5\u5916\u7684\u503c';
									this.mSpt_Title.spriteFrame =
										this.mSPF_Title_Prop;
									var o =
										t == l.ERewardedAdType.ERAT_Tip
											? 'Tip'
											: 'Shuffle';
									this.mLab_Context.string =
										'     \u5206\u4eab\u7ed9\u597d\u53cb\u6216\u5fae\u4fe1\u7fa4\uff0c\u53ef\u83b7\u5f97\u4e00\u4e2a' +
										o +
										'\u9053\u5177\uff0c\u662f\u5426\u7ee7\u7eed\uff1f';
								}
								(this.mNode_Root.active = !0),
									(this.node.active = !0);
							}),
							(e.prototype.onSubmit = function (t) {
								t.stopPropagation();
								var e,
									o = t.target;
								if (o instanceof cc.Node) {
									var n = o.getComponent(cc.Button);
									if (null != n) {
										if (!n.enabled) return;
										(n.enabled = !1),
											n.scheduleOnce(function () {
												n.enabled = !0;
											}, 0.5);
									}
								}
								if (!c.Comm.mPlatform.mPlatformUtil.isWeChat())
									throw '\u8be5\u7c7b\u4ec5\u5728\u5fae\u4fe1\u7aef\u4e14\u672a\u5f00\u901a\u5e7f\u544a\u65f6\u4f7f\u7528';
								e =
									this.mErat == l.ERewardedAdType.ERAT_Energy
										? '\u8fd9\u6e38\u620f\u597d\u73a9\u5230\u505c\u4e0d\u4e0b\u6765,\u4f53\u529b\u90fd\u4e0d\u591f\u4e86,\u5feb\u6765\u52a9\u529b\u4e00\u4e0b\uff01'
										: '\u8fd9\u5173\u73a9\u4e0d\u8fc7\u53bb\u4e86,\u5feb\u6765\u52a9\u529b\u4e00\u4e0b\u5427\uff01';
								var i = this;
								c.Comm.mPlatform.mPlatformUtil.shareWhileWeChat(
									e,
									function () {
										(i.node.active = !1),
											i.mErat ==
											l.ERewardedAdType.ERAT_Energy
												? i.node.dispatchEvent(
														new m.EvtMotionEffect(
															s.EMotionType.EMT_Energy,
															null,
															new s.MotionInstance(
																i.mNode_EnergyRoot
															),
															function () {
																c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy(),
																	i.mNode_FrameHome.emit(
																		c
																			.GameConfig
																			.EMIT_FIELD_FRAME_HOME_UPDATE_ENERGIES
																	);
															}
														)
												  )
												: i.node.dispatchEvent(
														new m.EvtMotionEffect(
															i.mErat ==
															l.ERewardedAdType
																.ERAT_Tip
																? s.EMotionType
																		.EMT_PropTip_1
																: s.EMotionType
																		.EMT_PropRefresh,
															null,
															new s.MotionInstance(
																i.mTag
															),
															function () {
																i.mErat ==
																l
																	.ERewardedAdType
																	.ERAT_Tip
																	? c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseSearch()
																	: c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRefresh(),
																	i.mTag &&
																		i.mTag.emit(
																			'UPDATE_PROP_INFO'
																		);
															}
														)
												  );
									},
									function () {}
								);
							}),
							(e.prototype.onCancel = function (t) {
								t.stopPropagation(), (this.node.active = !1);
							}),
							(e.prototype.onMaskShield = function (t) {
								t.stopPropagation();
							}),
							(e.prototype.onLoad = function () {
								this.mBtn_Submit.node.on(
									cc.Node.EventType.TOUCH_END,
									this.onSubmit,
									this
								),
									this.mBtn_Cancel.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onCancel,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onMaskShield,
										this
									);
							}),
							(e.prototype.start = function () {}),
							a([d(cc.Node)], e.prototype, 'mNode_Root', void 0),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_EnergyRoot',
								void 0
							),
							a(
								[d(cc.Label)],
								e.prototype,
								'mLab_Context',
								void 0
							),
							a(
								[d(cc.Button)],
								e.prototype,
								'mBtn_Submit',
								void 0
							),
							a(
								[d(cc.Button)],
								e.prototype,
								'mBtn_Cancel',
								void 0
							),
							a(
								[d(cc.Sprite)],
								e.prototype,
								'mSpt_Title',
								void 0
							),
							a(
								[d(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Title_Energy',
								void 0
							),
							a(
								[d(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Title_Prop',
								void 0
							),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_FrameHome',
								void 0
							),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_FrameGame',
								void 0
							),
							a([u], e)
						);
					})(cc.Component);
				(o.default = h), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MotionEfffectManager': 'MotionEfffectManager',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		DialogRestoreEnergy: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(
					e,
					'cbf99uvG4VEaI8GlCE1o48z',
					'DialogRestoreEnergy'
				);
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MotionEfffectManager'),
					m = t('./MyEvent'),
					l = t('./PlatformGeneralInterface'),
					p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_Root = null),
								(e.mNode_EnergyRoot = null),
								(e.mLab_Context = null),
								(e.mLab_Describe = null),
								(e.mNode_TipCon = null),
								(e.mLab_Progress = null),
								(e.mLab_Tip = null),
								(e.mBtn_Submit = null),
								(e.mBtn_Cancel = null),
								(e.mSpt_Title = null),
								(e.mSPF_CWLB = null),
								(e.mSPF_TLBZ = null),
								(e.mNode_FrameHome = null),
								(e.mNode_FrameGame = null),
								(e.shownFromHome = !1),
								(e.mPreviewedAdCount = 0),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showDialog = function (t) {
								(this.shownFromHome = t),
									c.Comm.mPlatform.mPlatformUtil.isDouyinOrLite()
										? this.initDialogInByteDance()
										: c.Comm.mPlatform.mPlatformUtil.isWeChat() &&
										  this.initDialogInWeChat(),
									(this.mNode_Root.active = !0),
									(this.node.active = !0);
							}),
							(e.prototype.initDialogInWeChat = function () {
								(this.mNode_Root.height = 430),
									(this.mNode_TipCon.active = !1),
									(this.mLab_Describe.node.active = !1),
									(this.mLab_Progress.node.active = !1),
									(this.mLab_Context.string =
										'      Do you want to watch an ad to get 1 energy?');
							}),
							(e.prototype.initDialogInByteDance = function () {
								(this.mPreviewedAdCount = 0),
									(this.mNode_Root.height = 600),
									c.Comm.mPlatform.mPlatformUtil.isIOS()
										? ((this.mLab_Describe.string =
												'Watch ' +
												c.GameConfig
													.Max_InfiniteEnergy_RewardedAd_Count +
												' ads to get unlimited energy 24h'),
										  (this.mLab_Progress.node.active = !0),
										  (this.mLab_Progress.string =
												this.generateProgress()),
										  (this.mLab_Tip.string =
												'\u7279\u522b\u6ce8\u610f\uff1a\u9000\u51fa\u5f53\u524d\u7a97\u53e3\u540e\u89c2\u770b\u8fdb\u5ea6\u4f1a\u91cd\u7f6e'))
										: ((this.mLab_Describe.string =
												'Watch ' +
												c.GameConfig
													.Max_InfiniteEnergy_RewardedAd_Count +
												' ads to get unlimited energy 24h'),
										  (this.mLab_Progress.node.active = !1),
										  (this.mLab_Tip.string =
												'Tip: Start timing after use for 24h')),
									this.shownFromHome ||
										this.mNode_FrameHome.emit(
											c.GameConfig
												.EMIT_FIELD_REWARDED_SWITCH_ENERGY
										),
									0 ==
									c.Comm.mPlatform.mStorageUtil.mUserInfo.remainderEnergy()
										? (this.mSpt_Title.spriteFrame =
												this.mSPF_TLBZ)
										: (this.mSpt_Title.spriteFrame =
												this.mSPF_CWLB);
							}),
							(e.prototype.generateProgress = function () {
								return (
									'Loading: (' +
									this.mPreviewedAdCount +
									'/' +
									c.GameConfig
										.Max_InfiniteEnergy_RewardedAd_Count +
									')'
								);
							}),
							(e.prototype.onSubmit = function (t) {
								var e = this;
								t.stopPropagation();
								var o = t.target;
								if (o instanceof cc.Node) {
									var n = o.getComponent(cc.Button);
									if (null != n) {
										if (!n.enabled) return;
										(n.enabled = !1),
											n.scheduleOnce(function () {
												n.enabled = !0;
											}, 0.5);
									}
								}
								if (
									(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									c.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity())
								)
									this.node.dispatchEvent(
										new m.EvtWarningMsg(
											'\u5f88\u62b1\u6b49\u60a8\u80fd\u770b\u5230\u6211\uff0c\u56e0\u4e3a\u60a8\u770b\u5230\u6211\u8bf4\u660e\u6e38\u620f\u5b58\u5728\u4e00\u70b9\u5c0f\u95ee\u9898\uff0c\u4f46\u4e0d\u5f71\u54cd\u6b63\u5e38\u6e38\u620f\uff0c\u4e3a\u4f18\u5316\u6e38\u620f\u60a8\u53ef\u4ee5\u622a\u5c4f\u5e76\u5c06\u56fe\u7247\u53cd\u9988\u7ed9\u5f00\u53d1\u8005(\u9996\u9875\u5173\u6ce8\u53ef\u4ee5\u627e\u5230\u6211\u54df)\uff01 \u6700\u6700\u6700\u91cd\u8981\u7684\u662f\u60a8\u5f53\u524d\u5df2\u7ecf\u662f\u65e0\u9650\u4f53\u529b\u72b6\u6001\uff0c\u65e0\u9700\u518d\u6b21\u89c2\u770b\u5e7f\u544a\u3002',
											!1,
											!0,
											null
										)
									);
								else {
									var i = this;
									c.Comm.mPlatform.mPlatformUtil.isWeChat()
										? c.Comm.mPlatform.mPlatformUtil.showRewardedVideoAD(
												l.ERewardedAdType.ERAT_Energy,
												this.node,
												function () {
													c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy(),
														i.mNode_FrameHome.emit(
															c.GameConfig
																.EMIT_FIELD_FRAME_HOME_UPDATE_ENERGIES
														),
														(i.node.active = !1);
												}
										  )
										: c.Comm.mPlatform.mPlatformUtil.isDouyinOrLite() &&
										  c.Comm.mPlatform.mPlatformUtil.showRewardedVideoAD(
												l.ERewardedAdType.ERAT_Energy,
												this.node,
												function (t, o) {
													if (
														c.Comm.mPlatform.mPlatformUtil.isIOS()
													) {
														i.mPreviewedAdCount++;
														var n =
															c.GameConfig
																.Max_InfiniteEnergy_RewardedAd_Count -
															i.mPreviewedAdCount;
														(i.mLab_Describe.string =
															'Watch ' +
															n +
															' ads to get unlimited energy 24h'),
															i.mPreviewedAdCount >=
															c.GameConfig
																.Max_InfiniteEnergy_RewardedAd_Count
																? ((i.node.active =
																		!1),
																  i.node.dispatchEvent(
																		new m.EvtWarningMsg(
																			'   Congrats, you got unlimited energy 1 day'
																		)
																  ),
																  i.mNode_FrameHome.emit(
																		c
																			.GameConfig
																			.EMIT_FIELD_FRAME_HOME_SWITCH_INFINITE
																  ))
																: (i.node.dispatchEvent(
																		new m.EvtMotionEffect(
																			s.EMotionType.EMT_Energy,
																			null,
																			new s.MotionInstance(
																				i.mNode_EnergyRoot
																			),
																			function () {
																				c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy(),
																					i.mNode_FrameHome.emit(
																						c
																							.GameConfig
																							.EMIT_FIELD_FRAME_HOME_UPDATE_ENERGIES
																					);
																			}
																		)
																  ),
																  (i.mLab_Progress.string =
																		e.generateProgress()));
													} else
														(i.node.active = !1),
															o >=
															c.GameConfig
																.Max_InfiniteEnergy_RewardedAd_Count
																? (i.node.dispatchEvent(
																		new m.EvtWarningMsg(
																			'   Congrats\uff0cyou got unlimited energy 1 day'
																		)
																  ),
																  i.mNode_FrameHome.emit(
																		c
																			.GameConfig
																			.EMIT_FIELD_FRAME_HOME_SWITCH_INFINITE
																  ))
																: (i.node.dispatchEvent(
																		new m.EvtWarningMsg(
																			'  Add energy a bit, watch a whole ad to get unlimited energy'
																		)
																  ),
																  i.node.dispatchEvent(
																		new m.EvtMotionEffect(
																			s.EMotionType.EMT_Energy,
																			null,
																			new s.MotionInstance(
																				i.mNode_EnergyRoot
																			),
																			function () {
																				c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy(),
																					i.mNode_FrameHome.emit(
																						c
																							.GameConfig
																							.EMIT_FIELD_FRAME_HOME_UPDATE_ENERGIES
																					);
																			}
																		)
																  ));
												},
												null,
												null
										  );
								}
							}),
							(e.prototype.onCancel = function (t) {
								t.stopPropagation(), (this.node.active = !1);
							}),
							(e.prototype.onMaskShield = function (t) {
								t.stopPropagation();
							}),
							(e.prototype.onLoad = function () {
								this.mBtn_Submit.node.on(
									cc.Node.EventType.TOUCH_END,
									this.onSubmit,
									this
								),
									this.mBtn_Cancel.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onCancel,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onMaskShield,
										this
									);
							}),
							(e.prototype.onDisable = function () {
								this.shownFromHome ||
									this.mNode_FrameGame.emit(
										c.GameConfig
											.EMIT_FIELD_REWARDED_SWITCH_PROP
									);
							}),
							(e.prototype.start = function () {}),
							a([d(cc.Node)], e.prototype, 'mNode_Root', void 0),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_EnergyRoot',
								void 0
							),
							a(
								[d(cc.Label)],
								e.prototype,
								'mLab_Context',
								void 0
							),
							a(
								[d(cc.Label)],
								e.prototype,
								'mLab_Describe',
								void 0
							),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_TipCon',
								void 0
							),
							a(
								[d(cc.Label)],
								e.prototype,
								'mLab_Progress',
								void 0
							),
							a([d(cc.Label)], e.prototype, 'mLab_Tip', void 0),
							a(
								[d(cc.Button)],
								e.prototype,
								'mBtn_Submit',
								void 0
							),
							a(
								[d(cc.Button)],
								e.prototype,
								'mBtn_Cancel',
								void 0
							),
							a(
								[d(cc.Sprite)],
								e.prototype,
								'mSpt_Title',
								void 0
							),
							a(
								[d(cc.SpriteFrame)],
								e.prototype,
								'mSPF_CWLB',
								void 0
							),
							a(
								[d(cc.SpriteFrame)],
								e.prototype,
								'mSPF_TLBZ',
								void 0
							),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_FrameHome',
								void 0
							),
							a(
								[d(cc.Node)],
								e.prototype,
								'mNode_FrameGame',
								void 0
							),
							a([u], e)
						);
					})(cc.Component);
				(o.default = h), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MotionEfffectManager': 'MotionEfffectManager',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		DialogReward: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'c1bd2YFqdRBj5x6Y5LRaYie', 'DialogReward');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEnums'),
					m = t('./MyEvent'),
					l = t('./PlatformGeneralInterface'),
					p = t('./Storage'),
					u = t('./FrameGame'),
					d = t('./DialogBase'),
					h = t('./DialogSettlement'),
					f = t('./RewardOptions'),
					_ = cc._decorator,
					y = _.ccclass,
					g = _.property,
					E = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mSrc_DialogSettlement = null),
								(e.mBtnShare = null),
								(e.mBtnToSettlement = null),
								(e.mOption_1 = null),
								(e.mOption_2 = null),
								(e.mOption_3 = null),
								(e.mSPF_Search = null),
								(e.mPSF_Energy = null),
								(e.mSPF_Refresh = null),
								(e.mFlag_Load_Complete = !1),
								(e.mRewardedAdPlayed = !0),
								(e.mRecvExtraRewardCount = 0),
								(e.mIntegral = 0),
								(e.mFlagOnce = !1),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showReward = function (t) {
								void 0 === t && (t = 0),
									c.Comm.mPlatform.mPlatformUtil.stopRecorder(
										l.ERecordStopType.ERST_Success
									),
									(this.mIntegral = t),
									(this.mBtnClose.node.active = !1),
									(this.node.active = !0),
									this.mOption_1.init(
										s.ERewardType.EReward_Tip,
										1,
										this.mSPF_Search,
										!0
									),
									this.mOption_2.init(
										s.ERewardType.EReward_Tip,
										1,
										this.mSPF_Search,
										!1
									),
									this.mOption_3.init(
										s.ERewardType.EReward_Refresh,
										1,
										this.mSPF_Refresh,
										!1
									),
									u.default.mGameType !=
										s.EGameType.EPractice &&
										c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRoundOnce(
											!0
										),
									c.Comm.mPlatform.mPlatformUtil.showInterstitialAd();
							}),
							(e.prototype.onShare = function (t) {
								var e = this;
								t.stopPropagation();
								var o = this.mBtnShare;
								if (null != o) {
									if (!o.enabled) return;
									o.enabled = !1;
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick();
								var n = this;
								c.Comm.mPlatform.mPlatformUtil.isDouyinOrLite()
									? c.Comm.mPlatform.mPlatformUtil.shareWhileByteDance(
											function () {
												console.log(
													'\u5206\u4eab\u6210\u529f'
												),
													e.mOption_1.receiveReward(),
													e.mOption_2.receiveReward(),
													e.mOption_3.receiveReward();
											},
											function () {
												(o.enabled = !0),
													n.node.dispatchEvent(
														new m.EvtShowToast(
															'\u5206\u4eab\u5931\u8d25,\u65e0\u6cd5\u83b7\u5f97\u5956\u52b1'
														)
													);
											},
											function () {
												(o.enabled = !0),
													n.node.dispatchEvent(
														new m.EvtWarningMsg(
															'        \u540c\u4e00\u597d\u53cb\u6bcf\u5929\u6700\u591a\u53ea\u80fd\u5206\u4eab\u4e00\u6b21\uff0c\u5feb\u627e\u5176\u4ed6\u670b\u53cb\u8bd5\u8bd5\u5427\uff01',
															!1,
															!1,
															null
														)
													);
											}
									  )
									: (this.mOption_1.receiveReward(),
									  this.mOption_2.receiveReward(),
									  this.mOption_3.receiveReward());
							}),
							(e.prototype.toSettlement = function () {
								var t = this;
								this.node.dispatchEvent(
									new m.EvtDispatchLoading('Loading...')
								),
									(t.node.active = !1),
									(t.mFlagOnce = !1),
									t.mSrc_DialogSettlement.showSettlement(
										t.mIntegral
									),
									t.node.dispatchEvent(
										new m.EvtDispatchLoading(
											'',
											!0,
											function () {}
										)
									);
							}),
							(e.prototype.onBtnToSettlement = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								if (
									(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									this.mOption_1.isReceived())
								)
									this.toSettlement();
								else {
									var o = this;
									this.node.dispatchEvent(
										new m.EvtWarningMsg(
											'        Continue? Without getting the rewards',
											!1,
											!1,
											function () {
												o.toSettlement();
											},
											null
										)
									);
								}
							}),
							(e.prototype.onLoad = function () {
								t.prototype.onLoad.call(this),
									this.mBtnShare.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onShare,
										this
									),
									this.mBtnToSettlement.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnToSettlement,
										this
									);
							}),
							(e.prototype.onEnable = function () {
								t.prototype.onEnable.call(this),
									(this.mBtnShare.enabled = !0);
							}),
							(e.prototype.onDisable = function () {
								this.mOption_1.reset(),
									this.mOption_2.reset(),
									this.mOption_3.reset(),
									c.Comm.mPlatform.mStorageUtil.save2Cache(
										p.EStorageType.EST_Cache_UserInfo
									);
							}),
							(e.prototype.update = function () {
								if (
									!this.mFlagOnce &&
									this.mOption_1.isReceived() &&
									this.mOption_2.isReceived() &&
									this.mOption_3.isReceived()
								) {
									this.mFlagOnce = !0;
									var t = this;
									this.scheduleOnce(function () {
										t.toSettlement();
									}, 0.5);
								}
							}),
							a(
								[g({ type: h.default })],
								e.prototype,
								'mSrc_DialogSettlement',
								void 0
							),
							a([g(cc.Button)], e.prototype, 'mBtnShare', void 0),
							a(
								[g(cc.Button)],
								e.prototype,
								'mBtnToSettlement',
								void 0
							),
							a(
								[g({ type: f.default })],
								e.prototype,
								'mOption_1',
								void 0
							),
							a(
								[g({ type: f.default })],
								e.prototype,
								'mOption_2',
								void 0
							),
							a(
								[g({ type: f.default })],
								e.prototype,
								'mOption_3',
								void 0
							),
							a(
								[g(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Search',
								void 0
							),
							a(
								[g(cc.SpriteFrame)],
								e.prototype,
								'mPSF_Energy',
								void 0
							),
							a(
								[g(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Refresh',
								void 0
							),
							a([y], e)
						);
					})(d.default);
				(o.default = E), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./DialogSettlement': 'DialogSettlement',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./RewardOptions': 'RewardOptions',
				'./Storage': 'Storage',
				'./typeof': 'typeof'
			}
		],
		DialogSettlementWeChat: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(
					e,
					'40bf7oHQ9RJeZ2w4xT420vP',
					'DialogSettlementWeChat'
				);
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEnums'),
					m = t('./MyEvent'),
					l = t('./DialogBase'),
					p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mBtnHome = null),
								(e.mBtnNext = null),
								(e.mLabBCJF = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showSettlement = function (t) {
								var e = this;
								c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRoundOnce(
									!0
								),
									c.Comm.mPlatform.mPlatformUtil.showInterstitialAd(),
									(this.mLabBCJF.string = '' + t),
									c.Comm.mPlatform.mPlatformUtil.showRank(
										function () {},
										function () {
											e.node.dispatchEvent(
												new m.EvtShowToast(
													'\u6392\u884c\u699c\u5f02\u5e38,\u8bf7\u7a0d\u540e\u518d\u8bd5'
												)
											);
										},
										null
									),
									(this.node.active = !0);
							}),
							(e.prototype.callback = function () {
								var t = this;
								setTimeout(function () {
									t.node.dispatchEvent(
										new m.EvtDispatchLoading(
											'',
											!0,
											function () {}
										)
									),
										t.node.dispatchEvent(
											new m.EvtSubBtnClick(
												s.EBtnClickType.ECancel
											)
										);
								}, 1e3);
							}),
							(e.prototype.onClose = function (t) {
								t.stopPropagation();
								var e = this.mBtnClose;
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 1);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									this.node.dispatchEvent(
										new m.EvtDispatchLoading(
											'\u6570\u636e\u540c\u6b65\u4e2d,\u8bf7\u7a0d\u540e'
										)
									),
									c.Comm.mPlatform.mStorageUtil.mUserInfo.saveDatas(
										this.callback,
										this
									);
							}),
							(e.prototype.onBtnHome = function (t) {
								var e = this;
								t.stopPropagation();
								var o = t.target.getComponent(cc.Button);
								if (null != o) {
									if (!o.enabled) return;
									(o.enabled = !1),
										o.scheduleOnce(function () {
											o.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick();
								var n = this;
								this.node.dispatchEvent(
									new m.EvtDispatchLoading(
										'\u6570\u636e\u540c\u6b65\u4e2d,\u8bf7\u7a0d\u540e'
									)
								),
									c.Comm.mPlatform.mStorageUtil.mUserInfo.saveDatas(
										function () {
											e.scheduleOnce(function () {
												n.node.dispatchEvent(
													new m.EvtDispatchLoading(
														'',
														!0,
														function () {}
													)
												),
													n.node.dispatchEvent(
														new m.EvtSubBtnClick(
															s.EBtnClickType.ECancel
														)
													);
											}, 0.5);
										},
										this
									);
							}),
							(e.prototype.onBtnNext = function (t) {
								var e = this;
								t.stopPropagation();
								var o = t.target.getComponent(cc.Button);
								if (null != o) {
									if (!o.enabled) return;
									(o.enabled = !1),
										o.scheduleOnce(function () {
											o.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick();
								var n = this;
								this.node.dispatchEvent(
									new m.EvtDispatchLoading(
										'\u6570\u636e\u540c\u6b65\u4e2d,\u8bf7\u7a0d\u540e'
									)
								),
									c.Comm.mPlatform.mStorageUtil.mUserInfo.saveDatas(
										function () {
											e.scheduleOnce(function () {
												n.node.dispatchEvent(
													new m.EvtDispatchLoading(
														'',
														!0,
														function () {}
													)
												),
													n.node.dispatchEvent(
														new m.EvtSubBtnClick(
															s.EBtnClickType.ENext
														)
													);
											}, 0.5);
										},
										this
									);
							}),
							(e.prototype.onLoad = function () {
								t.prototype.onLoad.call(this),
									this.mBtnClose.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onClose,
										this
									),
									this.mBtnHome.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnHome,
										this
									),
									this.mBtnNext.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnNext,
										this
									);
							}),
							(e.prototype.onEnable = function () {
								t.prototype.onEnable.call(this),
									(this.mBtnClose.node.active = !1);
							}),
							(e.prototype.onDisable = function () {
								c.Comm.mPlatform.mPlatformUtil.hideInterstitialAd();
							}),
							(e.prototype.start = function () {}),
							a([d(cc.Button)], e.prototype, 'mBtnHome', void 0),
							a([d(cc.Button)], e.prototype, 'mBtnNext', void 0),
							a([d(cc.Label)], e.prototype, 'mLabBCJF', void 0),
							a([u], e)
						);
					})(l.default);
				(o.default = h), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./typeof': 'typeof'
			}
		],
		DialogSettlement: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '88b24lWBZNOJ5YuSP58iv14', 'DialogSettlement');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEnums'),
					m = t('./MyEvent'),
					l = t('./PlatformGeneralInterface'),
					p = t('./FrameGame'),
					u = t('./DialogBase'),
					d = cc._decorator,
					h = d.ccclass,
					f = d.property,
					_ = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mBtnHome = null),
								(e.mBtnNext = null),
								(e.mBtnDoubleReward = null),
								(e.mLabBtn_DoubleReward = null),
								(e.mLabDoubleDescribe = null),
								(e.mLabBCJF = null),
								(e.mNode_NotPractice = null),
								(e.mNode_Practice = null),
								(e.mScore_Now = 0),
								(e.mFlag_Load_Complete = !1),
								(e.mRewardedAdPlayed = !0),
								(e.mRecvExtraRewardCount = 0),
								(e.offset = 140),
								(e.duration = 0.3),
								(e.starAction = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showSettlement = function (t) {
								void 0 === t && (t = 0),
									console.log('show Settlement is calling!');
								var e = this;
								if (
									((this.node.active = !0),
									(this.mNode_Practice.active = !1),
									(this.mNode_NotPractice.active = !1),
									p.default.mGameType ==
										s.EGameType.EPractice)
								)
									this.mNode_Practice.active = !0;
								else if (
									((this.mNode_NotPractice.active = !0),
									(this.mBtnDoubleReward.node.active = !1),
									(this.mLabDoubleDescribe.node.active = !1),
									(this.mLabBCJF.string = '' + t),
									c.Comm.mPlatform.mStorageUtil.mRewardedDate.previewedAdCount_DoubleReward() <
										c.GameConfig.MAX_DOUBLE_REWARD)
								) {
									var o =
										c.GameConfig.MAX_DOUBLE_REWARD -
										c.Comm.mPlatform.mStorageUtil.mRewardedDate.previewedAdCount_DoubleReward();
									(this.mLabBtn_DoubleReward.string =
										'Watch ads to get reward x' + o),
										c.Comm.mPlatform.mPlatformUtil.CFGRewardedVideoAD(
											l.ERewardedAdScene
												.ERAS_Double_Integral,
											this.node,
											function () {
												var o =
													c.Comm.mPlatform.mStorageUtil.mRewardedDate.increaseCount_DoubleReward();
												c.Comm.mPlatform.mPlatformUtil.updateRank_Integral(
													t,
													!0
												),
													cc
														.tween(e.mLabBCJF.node)
														.to(0.2, {
															scaleX: 0,
															scaleY: 0
														})
														.call(function () {
															var o = 2 * t;
															e.mLabBCJF.string =
																'' + o;
														})
														.delay(0.1)
														.to(0.2, {
															scaleX: 1,
															scaleY: 1
														})
														.start(),
													(e.mBtnDoubleReward.node.active =
														!1);
												var n =
													c.GameConfig
														.MAX_DOUBLE_REWARD - o;
												(e.mLabDoubleDescribe.string =
													'    \u9886\u53d6\u6210\u529f,\u6392\u884c\u699c\u66f4\u65b0\u6709\u5ef6\u8fdf\uff0c\u53ef\u7a0d\u540e\u5237\u65b0\u6392\u884c\u699c\u67e5\u770b\uff0c\u4eca\u65e5\u8fd8\u53ef\u4ee5\u9886\u53d6' +
													n +
													'\u6b21\u3002'),
													(e.mLabDoubleDescribe.node.active =
														!0);
											},
											function () {
												e.node.dispatchEvent(
													new m.EvtShowToast(
														'\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u6709\u5956\u52b1!',
														1.5
													)
												);
											},
											function () {
												e.node.dispatchEvent(
													new m.EvtShowToast(
														'\u5e7f\u544a\u6b21\u6570\u8d85\u9650,\u6682\u65f6\u65e0\u6cd5\u89c2\u770b!',
														1.5
													)
												);
											}
										);
								} else
									(this.mLabDoubleDescribe.node.active = !0),
										(this.mLabDoubleDescribe.string =
											'    \u53cc\u500d\u79ef\u5206\u4e00\u5929\u6700\u591a\u9886\u53d6' +
											c.GameConfig.MAX_DOUBLE_REWARD +
											'\u6b21\uff0c\u8bf7\u5408\u7406\u5b89\u6392\uff0c\u9886\u53d6\u9650\u5236\u6b21\u65e5\u51cc\u6668\u6e05\u96f6\uff01');
							}),
							(e.prototype.callback = function () {
								var t = this;
								setTimeout(function () {
									t.node.dispatchEvent(
										new m.EvtDispatchLoading(
											'',
											!0,
											function () {}
										)
									),
										t.node.dispatchEvent(
											new m.EvtSubBtnClick(
												s.EBtnClickType.ECancel
											)
										);
								}, 1e3);
							}),
							(e.prototype.onDoubleReward = function (t) {
								t.stopPropagation();
								var e = this.getComponent(cc.Button);
								(null == e || e.enabled) &&
									(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									c.GameConfig.MAX_DOUBLE_REWARD,
									c.Comm.mPlatform.mStorageUtil.mRewardedDate.previewedAdCount_DoubleReward());
							}),
							(e.prototype.onClose = function (t) {
								t.stopPropagation();
								var e = this.mBtnClose;
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 1);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									this.node.dispatchEvent(
										new m.EvtDispatchLoading(
											'\u6570\u636e\u540c\u6b65\u4e2d,\u8bf7\u7a0d\u540e'
										)
									),
									c.Comm.mPlatform.mStorageUtil.mUserInfo.saveDatas(
										this.callback,
										this
									);
							}),
							(e.prototype.onBtnHome = function (t) {
								var e = this,
									o = this;
								h5games.showInterstitial(function () {
									t.stopPropagation();
									var n = t.target.getComponent(cc.Button);
									if (null != n) {
										if (!n.enabled) return;
										(n.enabled = !1),
											n.scheduleOnce(function () {
												n.enabled = !0;
											}, 0.5);
									}
									c.Comm.getInstance().mSoundManager.playEffectBtnClick();
									var i = e;
									e.node.dispatchEvent(
										new m.EvtDispatchLoading('Loading...')
									),
										c.Comm.mPlatform.mStorageUtil.mUserInfo.saveDatas(
											function () {
												o.scheduleOnce(function () {
													i.node.dispatchEvent(
														new m.EvtDispatchLoading(
															'',
															!0,
															function () {}
														)
													),
														i.node.dispatchEvent(
															new m.EvtSubBtnClick(
																s.EBtnClickType.ECancel
															)
														);
												}, 0.5);
											},
											e
										);
								});
							}),
							(e.prototype.onBtnNext = function (t) {
								var e = this,
									o = this;
								h5games.showInterstitial(function () {
									t.stopPropagation();
									var n = t.target.getComponent(cc.Button);
									if (null != n) {
										if (!n.enabled) return;
										(n.enabled = !1),
											n.scheduleOnce(function () {
												n.enabled = !0;
											}, 0.5);
									}
									c.Comm.getInstance().mSoundManager.playEffectBtnClick();
									var i = e;
									e.node.dispatchEvent(
										new m.EvtDispatchLoading('Loading...')
									),
										c.Comm.mPlatform.mStorageUtil.mUserInfo.saveDatas(
											function () {
												o.scheduleOnce(function () {
													i.node.dispatchEvent(
														new m.EvtDispatchLoading(
															'',
															!0,
															function () {}
														)
													),
														i.node.dispatchEvent(
															new m.EvtSubBtnClick(
																s.EBtnClickType.ENext
															)
														);
												}, 0.5);
											},
											e
										);
								});
							}),
							(e.prototype.onLoad = function () {
								t.prototype.onLoad.call(this),
									this.mBtnDoubleReward.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onDoubleReward,
										this
									),
									this.mBtnClose.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onClose,
										this
									),
									this.mBtnHome.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnHome,
										this
									),
									this.mBtnNext.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnNext,
										this
									);
							}),
							(e.prototype.onEnable = function () {
								t.prototype.onEnable.call(this),
									(this.mBtnClose.node.active = !1),
									(this.starAction = null);
							}),
							(e.prototype.onDisable = function () {
								(this.mScore_Now = 0),
									c.Comm.mPlatform.mPlatformUtil.hideInterstitialAd();
							}),
							(e.prototype.start = function () {}),
							a([f(cc.Button)], e.prototype, 'mBtnHome', void 0),
							a([f(cc.Button)], e.prototype, 'mBtnNext', void 0),
							a(
								[f(cc.Button)],
								e.prototype,
								'mBtnDoubleReward',
								void 0
							),
							a(
								[f(cc.Label)],
								e.prototype,
								'mLabBtn_DoubleReward',
								void 0
							),
							a(
								[f(cc.Label)],
								e.prototype,
								'mLabDoubleDescribe',
								void 0
							),
							a([f(cc.Label)], e.prototype, 'mLabBCJF', void 0),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_NotPractice',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_Practice',
								void 0
							),
							a([h], e)
						);
					})(u.default);
				(o.default = _), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		DialogSetup: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '25106GlrrFGloW3KApl6N7N', 'DialogSetup');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./Storage'),
					m = t('./DialogBase'),
					l = cc._decorator,
					p = l.ccclass;
				l.property;
				var u = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						r(e, t),
						(e.prototype.onClose = function (t) {
							t.stopPropagation();
							var e = this.mBtnClose;
							if (null != e) {
								if (!e.enabled) return;
								(e.enabled = !1),
									e.scheduleOnce(function () {
										e.enabled = !0;
									}, 0.5);
							}
							c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
								(this.node.active = !1),
								c.Comm.mPlatform.mStorageUtil.save2Cache(
									s.EStorageType.EST_Cache_SysCfg
								),
								console.log(
									'\u8bbe\u7f6e\u5b8c\u6210\uff0c\u540c\u7528\u6237\u4fe1\u606f\u4e00\u6837\uff0c\u5982\u679c\u6570\u636e\u6709\u53d8\u5316\u5219\u5c06\u914d\u7f6e\u4fe1\u606f\u66f4\u65b0\u5230\u7f13\u5b58!'
								);
						}),
						(e.prototype.onLoad = function () {
							t.prototype.onLoad.call(this),
								this.mBtnClose.node.on(
									cc.Node.EventType.TOUCH_END,
									this.onClose,
									this
								);
						}),
						(e.prototype.onEnable = function () {
							this.mBtnClose.node.active = !0;
						}),
						(e.prototype.start = function () {}),
						a([p], e)
					);
				})(m.default);
				(o.default = u), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./Storage': 'Storage',
				'./typeof': 'typeof'
			}
		],
		DialogShowWeChat: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'a1c13taNSdH5ZEnzOXMBH+D', 'DialogShowWeChat');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MyEnums'),
					m = t('./MyEvent'),
					l = t('./PlatformGeneralInterface'),
					p = t('./Storage'),
					u = t('./DialogBase'),
					d = t('./DialogSettlementWeChat'),
					h = t('./RewardOptions'),
					f = cc._decorator,
					_ = f.ccclass,
					y = f.property,
					g = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mSrc_DialogSettlementWeChat = null),
								(e.mLab_Describe = null),
								(e.mBtnShare = null),
								(e.mBtnToSettlement = null),
								(e.mOption_1 = null),
								(e.mOption_2 = null),
								(e.mOption_3 = null),
								(e.mSPF_Search = null),
								(e.mPSF_Energy = null),
								(e.mSPF_Refresh = null),
								(e.mFlag_Load_Complete = !1),
								(e.mRewardedAdPlayed = !0),
								(e.mRecvExtraRewardCount = 0),
								(e.mIntegral = 0),
								(e.mScore = 0),
								(e.mShared = !0),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showDialog = function (t, e) {
								void 0 === e && (e = 0),
									(this.mShared = !1),
									c.Comm.mPlatform.mPlatformUtil.stopRecorder(
										l.ERecordStopType.ERST_Success
									),
									(this.mLab_Describe.string =
										'      \u606d\u559c\u60a8\uff01\u5c45\u7136\u6253\u51fa' +
										t +
										'\u5206\u7684\u9ad8\u5206\u6210\u7ee9\uff0c\u5feb\u8ddf\u60a8\u7684\u597d\u53cb\u70ab\u8000\u4e00\u4e0b\u5427\uff0c\u8fd8\u53ef\u4ee5\u83b7\u5f97\u4ee5\u4e0b\u9053\u5177\u54df\uff01'),
									(this.mScore = t),
									(this.mIntegral = e),
									(this.mBtnClose.node.active = !1),
									(this.node.active = !0),
									this.mOption_1.init(
										s.ERewardType.EReward_Energy,
										1,
										this.mPSF_Energy,
										!0
									),
									this.mOption_2.init(
										s.ERewardType.EReward_Tip,
										1,
										this.mSPF_Search,
										!1
									),
									this.mOption_3.init(
										s.ERewardType.EReward_Tip,
										1,
										this.mSPF_Search,
										!1
									);
							}),
							(e.prototype.onShare = function (t) {
								t.stopPropagation();
								var e = this.mBtnShare;
								if (null != e) {
									if (!e.enabled) return;
									e.enabled = !1;
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick();
								var o = this;
								c.Comm.mPlatform.mPlatformUtil.shareWhileWeChat(
									'\u9ad8\u624b\u5bc2\u5bde,\u6211\u5728\u632a\u5bf9\u5bf9\u83b7\u5f97' +
										this.mScore +
										'\u5206,\u4e0d\u670d\u6765\u6218!',
									function () {
										o.mShared
											? o.node.dispatchEvent(
													new m.EvtShowToast(
														'Claimed'
													)
											  )
											: ((o.mShared = !0),
											  o.mOption_1.receiveReward(),
											  o.mOption_2.receiveReward(),
											  o.mOption_3.receiveReward());
									},
									function () {
										o.node.dispatchEvent(
											new m.EvtShowToast(
												'\u5206\u4eab\u5931\u8d25,\u8bf7\u7a0d\u540e\u518d\u8bd5!'
											)
										);
									}
								);
							}),
							(e.prototype.onBtnToSettlement = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								var o = window.wx,
									n = this;
								o.authorize({
									scope: 'scope.WxFriendInteraction',
									success: function () {
										n.mSrc_DialogSettlementWeChat.showSettlement(
											n.mIntegral
										),
											(n.node.active = !1);
									},
									fail: function () {
										n.node.dispatchEvent(
											new m.EvtWarningMsg(
												'        \u68c0\u6d4b\u5230\u60a8\u5c1a\u672a\u6388\u6743\u597d\u53cb\u6743\u9650,\u6e38\u620f\u4e2d\u5c06\u65e0\u6cd5\u67e5\u770b\u6392\u884c\u699c\u529f\u80fd\uff0c\u662f\u5426\u524d\u5f80\u6388\u6743\uff01\n       \u9700\u8981\u67e5\u770b\u6392\u540d\u8bf7\u542f\u7528"\u5fae\u4fe1\u670b\u53cb"\u9009\u9879\uff01',
												!1,
												!1,
												function () {
													o.openSetting({
														success: function (t) {
															console.log(t);
														},
														fail: function () {
															console.log(
																'\u6388\u6743\u5931\u8d25'
															);
														},
														complete: function () {
															n.mSrc_DialogSettlementWeChat.showSettlement(
																n.mIntegral
															),
																(n.node.active =
																	!1);
														}
													});
												},
												function () {
													n.mSrc_DialogSettlementWeChat.showSettlement(
														n.mIntegral
													),
														(n.node.active = !1);
												},
												n
											)
										);
									}
								});
							}),
							(e.prototype.onLoad = function () {
								t.prototype.onLoad.call(this),
									this.mBtnShare.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onShare,
										this
									),
									this.mBtnToSettlement.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnToSettlement,
										this
									);
							}),
							(e.prototype.onEnable = function () {
								t.prototype.onEnable.call(this),
									(this.mBtnShare.enabled = !0);
							}),
							(e.prototype.onDisable = function () {
								this.mOption_1.reset(),
									this.mOption_2.reset(),
									this.mOption_3.reset(),
									c.Comm.mPlatform.mStorageUtil.save2Cache(
										p.EStorageType.EST_Cache_UserInfo
									);
							}),
							a(
								[y({ type: d.default })],
								e.prototype,
								'mSrc_DialogSettlementWeChat',
								void 0
							),
							a(
								[y(cc.Label)],
								e.prototype,
								'mLab_Describe',
								void 0
							),
							a([y(cc.Button)], e.prototype, 'mBtnShare', void 0),
							a(
								[y(cc.Button)],
								e.prototype,
								'mBtnToSettlement',
								void 0
							),
							a(
								[y({ type: h.default })],
								e.prototype,
								'mOption_1',
								void 0
							),
							a(
								[y({ type: h.default })],
								e.prototype,
								'mOption_2',
								void 0
							),
							a(
								[y({ type: h.default })],
								e.prototype,
								'mOption_3',
								void 0
							),
							a(
								[y(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Search',
								void 0
							),
							a(
								[y(cc.SpriteFrame)],
								e.prototype,
								'mPSF_Energy',
								void 0
							),
							a(
								[y(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Refresh',
								void 0
							),
							a([_], e)
						);
					})(u.default);
				(o.default = g), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogBase': 'DialogBase',
				'./DialogSettlementWeChat': 'DialogSettlementWeChat',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./RewardOptions': 'RewardOptions',
				'./Storage': 'Storage',
				'./typeof': 'typeof'
			}
		],
		ENDevelopment: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '302c9ZAZSxLmq8TjyV9haRI', 'ENDevelopment'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ENDevelopment = void 0);
				var r = t('./Comm'),
					a = t('./MyEvent'),
					c = (function (t) {
						function e() {
							return t.call(this) || this;
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								return null;
							}),
							(e.prototype.initializationUtil = function () {
								console.log(
									'\u6267\u884c\u5e73\u53f0\u914d\u7f6e,\u5f53\u524d\u73af\u5883\u4e3a\u5f00\u53d1\u73af\u5883'
								),
									(cc.game.onStart = function () {
										console.log(
											'\u6e38\u620f\u542f\u52a8\u65f6\u7684\u56de\u8c03\u51fd\u6570'
										);
									}),
									cc.game.on(
										cc.game.EVENT_HIDE,
										function () {
											console.log(
												'\u6e38\u620f\u88ab\u9690\u85cf,\u51c6\u5907\u4fdd\u5b58\u6570\u636e'
											),
												cc.sys.localStorage.setItem(
													'user_info',
													JSON.stringify(
														r.Comm.mPlatform.mStorageUtil.mUserInfo.generateCacheDate()
													)
												);
										},
										this
									);
							}),
							(e.prototype.log = function (t) {
								console.log(t);
							}),
							(e.prototype.error = function (t) {
								console.error(t);
							}),
							(e.prototype.showRank = function (t) {
								t();
							}),
							(e.prototype.verifySignatureEx = function () {
								return null;
							}),
							(e.prototype.showRewardedVideoAD = function (
								t,
								e,
								o
							) {
								o(t, 1);
							}),
							(e.prototype.showToast = function (t) {
								console.log(t);
							}),
							(e.prototype.loadUserInfo = function () {}),
							(e.prototype.syncUserInfo2Database = function (
								t,
								e,
								o
							) {
								cc.sys.localStorage.setItem(
									'user_info',
									JSON.stringify(
										r.Comm.mPlatform.mStorageUtil.mUserInfo.generateCacheDate()
									)
								);
								var n = e.bind(o);
								t.dispatchEvent(
									new a.EvtDispatchLoading(
										'\u6570\u636e\u540c\u6b65\u4e2d,\u8bf7\u7a0d\u540e',
										!0,
										n
									)
								);
							}),
							(e.KEY_USER_INFO = 'user_info'),
							e
						);
					})(t('./PlatformGeneralInterface').GeneralInterface);
				(o.ENDevelopment = c), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		ENVByteDance: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '4e19bOdSuRFV6YkfCBI3LGl', 'ENVByteDance'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ENVByteDance = void 0);
				var r = t('./Comm'),
					a = t('./FrameGame'),
					c = t('./MyEnums'),
					s = t('./PlatformGeneralInterface'),
					m = t('./Storage'),
					l = (function () {
						function t(t) {
							(this.mRecorder = null),
								(this.mPairedCount = 0),
								(this.mRecordStopType =
									s.ERecordStopType.ERST_None),
								(this.mRecorderEnd = !1),
								(this.mRecorderPath = null),
								(this.mClips = null),
								(this.mLastClipEnd = 0),
								(this.mCurrentClipStart = 0),
								(this.mStartIdx_Part_2 = 0),
								(this.mIdTimeOut = null),
								(this.mIdInterval = null),
								(this.mCount_Second = 0),
								(this.mRecording = null),
								(this.mRecorder = t),
								(this.mPairedCount = 0),
								(this.mRecordStopType =
									s.ERecordStopType.ERST_None),
								(this.mRecorderEnd = !1),
								(this.mRecorderPath = null),
								(this.mClips = []);
							var e =
								(a.default.mGameType == c.EGameType.EPractice ||
								a.default.mGameType == c.EGameType.ERanking_JD
									? r.GameConfig.COLUMN_NUM *
									  r.GameConfig.ROW_NUM_SHORT
									: r.GameConfig.COLUMN_NUM *
									  r.GameConfig.ROW_NUM_LONG) / 2;
							this.mStartIdx_Part_2 = e / 2;
							var o = this;
							this.mRecorder.onStop(function (t) {
								clearInterval(o.mIdInterval),
									(o.mCount_Second = 0),
									(o.mIdInterval = null),
									(o.mRecorderEnd = !0),
									o.mRecordStopType ==
										s.ERecordStopType.ERST_OUT_TIME ||
									o.mRecordStopType ==
										s.ERecordStopType.ERST_Success
										? (o.mRecordStopType ==
												s.ERecordStopType
													.ERST_OUT_TIME &&
												console.log(
													'\u56e0\u8d85\u51fa\u6700\u5927\u5f55\u5236\u65f6\u95f4\u7ed3\u675f\u5f55\u5236'
												),
										  o.isCompleted() &&
												o.mRecorder.clipVideo({
													path: t.videoPath,
													clipRange: o.mClips,
													success: function (t) {
														o.mRecorderPath =
															t.videoPath;
													},
													fail: function () {
														o.mRecorderPath = null;
													}
												}))
										: console.log(
												'\u56e0\u8fd4\u56de\u4e3b\u9875\u6216\u95ef\u5173\u5931\u8d25\u7b49\u539f\u56e0\u4e0d\u9700\u8981\u5f55\u5236'
										  );
							});
						}
						return (
							(t.prototype.isCompleted = function () {
								return (
									this.mPairedCount >=
									this.mStartIdx_Part_2 +
										t.CLIP_COUNT_PART_2 -
										1
								);
							}),
							(t.prototype.isEnd = function () {
								return this.mRecorderEnd;
							}),
							(t.prototype.videoPath = function () {
								return this.mRecorderPath;
							}),
							(t.prototype.recordeClip = function (e, o, n) {
								void 0 === n && (n = !1);
								var i = this.mCount_Second;
								if (!this.mRecorderEnd && !this.isCompleted())
									if (o == s.EActionStep.EStep_Touch_Start) {
										if (
											this.mRecording &&
											this.mRecording.mIsMulti &&
											this.mRecording.mInstance.getType() ==
												e.getType()
										)
											return;
										(this.mRecording =
											new s.RecordingInstance(e)),
											(this.mRecording.mStart = i);
									} else if (
										o == s.EActionStep.EStep_Touch_End
									)
										n &&
											this.mRecording.mInstance.getType() ==
												e.getType() &&
											(this.mRecording.mIsMulti = !0);
									else if (
										o == s.EActionStep.EStep_Pairing &&
										this.mRecording.mInstance == e &&
										(this.mPairedCount++,
										this.mPairedCount <=
											t.CLIP_COUNT_PART_1 ||
											(this.mPairedCount >=
												this.mStartIdx_Part_2 &&
												this.mPairedCount <
													this.mStartIdx_Part_2 +
														t.CLIP_COUNT_PART_2))
									) {
										this.mIdTimeOut
											? (clearTimeout(this.mIdTimeOut),
											  (this.mIdTimeOut = null))
											: (this.mCurrentClipStart =
													this.mRecording.mStart >
													this.mLastClipEnd
														? this.mRecording.mStart
														: this.mLastClipEnd +
														  1);
										var r = this;
										this.mIdTimeOut = setTimeout(
											function () {
												r.mLastClipEnd =
													r.mCount_Second;
												var t =
													r.mLastClipEnd -
													r.mCurrentClipStart;
												r.mRecorder.recordClip({
													timeRange: [t, 0],
													success: function (t) {
														r.mClips.push(t.index);
													}
												}),
													(r.mIdTimeOut = null);
											},
											1e3 * t.OFFSET_BACKWARD_SEC
										);
									}
							}),
							(t.prototype.start = function (t, e) {
								var o = this;
								(this.mCount_Second = 0),
									(this.mLastClipEnd = 0),
									(this.mIdInterval = setInterval(
										function () {
											o.mCount_Second++;
										},
										1e3
									)),
									(this.mIdTimeOut = null),
									(this.mRecordStopType =
										s.ERecordStopType.ERST_OUT_TIME),
									this.mRecorder.start({
										duration: t,
										frameRate: e
									});
							}),
							(t.prototype.pause = function () {
								console.log('\u6682\u505c\u5f55\u5c4f'),
									this.mRecorder.pause();
							}),
							(t.prototype.resume = function () {
								console.log('\u7ee7\u7eed\u5f55\u5c4f'),
									this.mRecorder.resume();
							}),
							(t.prototype.stop = function (t) {
								this.mRecorderEnd ||
									(console.log('\u7ed3\u675f\u5f55\u5c4f'),
									(this.mRecordStopType = t),
									this.mRecorder.stop());
							}),
							(t.CLIP_COUNT_PART_1 = 8),
							(t.CLIP_COUNT_PART_2 = 8),
							(t.OFFSET_BACKWARD_SEC = 1),
							(t.RECORDER_TIME_MAX = 300),
							(t.RECORDER_FRAME_RATE = 25),
							t
						);
					})(),
					p = (function (t) {
						function e() {
							var e = t.call(this) || this;
							(e.mBannerAD = null),
								(e.mStorage = null),
								(e.mCountSharedByRewarded = 0),
								(e.mClipManager = null);
							var o = e.mPlatform.getMenuButtonLayout();
							return (
								o &&
									((e.mMenuArea = new s.MenuArea()),
									(e.mMenuArea.left = o.left),
									(e.mMenuArea.top = o.top),
									(e.mMenuArea.width = o.width),
									(e.mMenuArea.height = o.height)),
								e
							);
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								return window.tt;
							}),
							(e.prototype.devideInfo = function () {
								var t = new s.DeviceInfo();
								return (
									(t.width = this.mSystemInfo.screenWidth),
									(t.height = this.mSystemInfo.screenHeight),
									(t.pixelRatio =
										this.mSystemInfo.pixelRatio),
									(t.safAreaTop =
										this.mSystemInfo.safeArea.top),
									t
								);
							}),
							(e.prototype.safeAreaTop = function () {
								return this.mSystemInfo &&
									this.mSystemInfo.safeArea &&
									this.mSystemInfo.safeArea.top
									? this.mSystemInfo.safeArea.top
									: 0;
							}),
							(e.prototype.menuTop = function () {
								return this.mSystemInfo
									? this.mMenuArea && this.mMenuArea.top
										? this.mSystemInfo.safeArea.top +
										  this.mMenuArea.top
										: this.mSystemInfo.safeArea.top + 20
									: t.prototype.menuTop.call(this);
							}),
							(e.prototype.login = function (t, e) {
								var o = this;
								this.mPlatform.checkSession({
									success: function () {
										console.log(
											'session \u672a\u8fc7\u671f'
										);
									},
									fail: function () {
										o.mPlatform.login({
											success: function (e) {
												console.log(
													'\u767b\u5f55\u6210\u529f',
													e
												),
													t && t();
											},
											fail: function (t) {
												console.log(
													'\u767b\u5f55\u5931\u8d25',
													t
												),
													e && e();
											}
										});
									}
								});
							}),
							(e.prototype.authorize = function (t, e) {
								var o = this;
								this.mPlatform.getSetting({
									success: function (n) {
										console.log(n),
											console.log(n.authSetting),
											console.log(n.authSetting.scope),
											n.authSetting.scope.screenRecord
												? console.log(
														'\u5df2\u7ecf\u6388\u6743,\u65e0\u9700\u518d\u6b21\u6388\u6743'
												  )
												: o.mPlatform.authorize({
														scope: 'scope.screenRecord',
														success: function (e) {
															console.log(
																'\u6388\u6743\u6210\u529f',
																e
															),
																t && t(e);
														},
														fail: function (t) {
															console.log(
																'\u6388\u6743\u5931\u8d25',
																t
															),
																e && e(t);
														}
												  });
									},
									fail: function () {
										console.log(
											'\u83b7\u53d6\u6388\u6743\u8bbe\u7f6e\u5931\u8d25'
										);
									}
								});
							}),
							(e.prototype.initializationUtil = function () {
								this.mStorage = r.Comm.mPlatform.mStorageUtil;
								var t = this;
								this.mPlatform.onShow(function () {
									t.eventShow();
								}),
									this.mPlatform.onHide(function () {
										t.eventHide();
									});
							}),
							(e.prototype.eventShow = function () {}),
							(e.prototype.eventHide = function () {
								this.mStorage.save2Cache(
									m.EStorageType.EST_Cache_UserInfo
								),
									this.mStorage.save2Cache(
										m.EStorageType.EST_Cache_SysCfg
									),
									this.mStorage.save2Cache(
										m.EStorageType.EST_Cache_RewardedData
									),
									this.mStorage.save2Cache(
										m.EStorageType.EST_Cache_Status
									);
							}),
							(e.prototype.log = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.error = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.updateRank_Integral = function (t, e) {
								void 0 === e && (e = !0),
									('Douyin' != this.mSystemInfo.appName &&
										'douyin_lite' !=
											this.mSystemInfo.appName) ||
										!this.minimumVersion(23, 1, 0) ||
										(this.mOpenDataContext &&
											this.mOpenDataContext.postMessage(
												s.SubContextMessage.generateMsg(
													e
														? s.EMessageType
																.EMT_Integral_Jia
														: s.EMessageType
																.EMT_Integral_Jian,
													t
												)
											));
							}),
							(e.prototype.showRank = function (t, e) {
								'devtools' != this.mSystemInfo.appName
									? ('Douyin' != this.mSystemInfo.appName &&
											'douyin_lite' !=
												this.mSystemInfo.appName) ||
									  !this.minimumVersion(23, 1, 0)
										? e(!0)
										: this.mPlatform.getImRankList({
												relationType: 'default',
												dataType: 0,
												rankType: 'all',
												suffix: '\u5206',
												rankTitle:
													'\u79ef\u5206\u603b\u699c',
												success: function () {
													t();
												},
												fail: function () {
													e(!1);
												}
										  })
									: e(!0);
							}),
							(e.prototype.share = function (t, e, o, n) {
								void 0 === n && (n = !1);
								var i = null;
								if (
									(this.mClipManager &&
										(i = this.mClipManager.videoPath()),
									console.log(
										i,
										'\u662f\u5426\u80fd\u5206\u4eab\u89c6\u9891 = ',
										r.Comm.mPlatform.mStorageUtil.mUserInfo.canSharByVideo(),
										'\u5f3a\u5236\u5206\u4eab\u597d\u53cb=',
										n
									),
									i &&
										r.Comm.mPlatform.mStorageUtil.mUserInfo.canSharByVideo() &&
										!n)
								) {
									var a = this;
									this.mPlatform.shareAppMessage({
										channel: 'video',
										title: '\u632a\u5bf9\u5bf9|\u975e\u5e38\u706b\u7206\u7684\u4f11\u95f2\u70e7\u8111\u5c0f\u6e38\u620f',
										extra: {
											videoPath: i,
											videoTopics: [
												'\u632a\u5bf9\u5bf9',
												'\u89e3\u538b\u5c0f\u6e38\u620f',
												'\u6296\u97f3\u5c0f\u6e38\u620f'
											],
											hashtag_list: [
												'\u632a\u5bf9\u5bf9',
												'\u89e3\u538b\u5c0f\u6e38\u620f',
												'\u6296\u97f3\u5c0f\u6e38\u620f'
											]
										},
										success: function () {
											t();
										},
										fail: function () {
											a.share(t, e, o, !0);
										}
									});
								} else {
									var c = this;
									('Douyin' != this.mSystemInfo.appName &&
										'douyin_lite' !=
											this.mSystemInfo.appName) ||
									!this.minimumVersion(20, 6, 0)
										? this.mPlatform.shareAppMessage({
												templateId:
													'22cj1m67emg3cjpk25',
												title: '\u632a\u5bf9\u5bf9',
												desc: '\u9ad8\u667a\u5546\u624d\u80fd\u901a\u5173\u7684\u6e38\u620f\uff0c\u4f60\u4e5f\u5feb\u6765\u8bd5\u8bd5\u5427\uff01',
												imageUrl: '',
												success: function (e) {
													if (
														e.data &&
														e.data instanceof
															Array &&
														e.data.length > 0
													) {
														for (
															var n = !1, i = 0;
															i < e.data.length;
															i++
														) {
															var r = e.data[i]
																.name
																? e.data[i].name
																: 'None';
															if (
																c.mStorage.share2SpecialFriends(
																	r
																)
															) {
																n = !0;
																break;
															}
														}
														n ? t() : o();
													} else t();
												},
												fail: function () {
													e();
												}
										  })
										: this.mPlatform.shareAppMessage({
												channel: 'invite',
												templateId:
													'22cj1m67emg3cjpk25',
												success: function (e) {
													if (
														e.data &&
														e.data instanceof
															Array &&
														e.data.length > 0
													) {
														for (
															var n = !1, i = 0;
															i < e.data.length;
															i++
														) {
															var r = e.data[i]
																.name
																? e.data[i].name
																: 'None';
															if (
																c.mStorage.share2SpecialFriends(
																	r
																)
															) {
																n = !0;
																break;
															}
														}
														n ? t() : o();
													} else t();
												},
												fail: function () {
													e();
												}
										  });
								}
							}),
							(e.prototype.shareWhileByteDance = function (
								t,
								e,
								o,
								n
							) {
								void 0 === n && (n = !1),
									this.share(t, e, o, n);
							}),
							(e.prototype.actionRecording = function (t, e, o) {
								void 0 === o && (o = !1),
									this.mClipManager &&
										this.mClipManager.recordeClip(t, e, o);
							}),
							(e.prototype.startRecorder = function () {
								'devtools' != this.mSystemInfo.appName &&
									(this.mCountSharedByRewarded >= 3 ||
										((this.mClipManager = new l(
											this.mPlatform.getGameRecorderManager()
										)),
										this.mClipManager.start(
											l.RECORDER_TIME_MAX,
											l.RECORDER_FRAME_RATE
										)));
							}),
							(e.prototype.pauseRecorder = function () {
								this.mSystemInfo.appName;
							}),
							(e.prototype.resumeRecorder = function () {
								this.mSystemInfo.appName;
							}),
							(e.prototype.stopRecorder = function (t) {
								'devtools' != this.mSystemInfo.appName &&
									this.mClipManager.stop(t);
							}),
							(e.prototype.isDouyinOrLite = function (t) {
								if ((void 0 === t && (t = !0), t)) {
									if (
										'Douyin' == this.mSystemInfo.appName ||
										'douyin_lite' ==
											this.mSystemInfo.appName
									)
										return !0;
								} else if ('Douyin' == this.mSystemInfo.appName)
									return !0;
								return !1;
							}),
							(e.prototype.checkGuanzhuWhileDouyin = function (
								t,
								e
							) {
								this.mPlatform.checkFollowAwemeState({
									success: function (e) {
										t(e.hasFollowed);
									},
									fail: function (t) {
										e(t);
									}
								});
							}),
							(e.prototype.guanzhuWhileDouyin = function (t, e) {
								this.mPlatform.openAwemeUserProfile({
									success: function (e) {
										t(e.hasFollowed);
									},
									fail: function (t) {
										e(t);
									}
								});
							}),
							(e.prototype.isIOS = function () {
								return 'ios' == this.mSystemInfo.platform
									? (console.log('IOS\u5e73\u53f0'), !0)
									: (console.log('\u975eIOS\u5e73\u53f0'),
									  !1);
							}),
							(e.prototype.minimumVersion = function (
								t,
								e,
								o,
								n
							) {
								void 0 === n && (n = !0);
								for (
									var i = this.mSystemInfo.version.split('.'),
										r = [0, 0, 0],
										a = 0;
									a < i.length;
									a++
								)
									r[a] = parseInt(i[a]);
								var c = r[0];
								(c += r[1] / 100), (c += r[2] / 1e4);
								var s = t;
								return (
									(s += e / 100),
									(s += o / 1e4),
									n ? c >= s : c > s
								);
							}),
							e
						);
					})(s.GeneralInterface);
				(o.ENVByteDance = p), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./Storage': 'Storage',
				'./typeof': 'typeof'
			}
		],
		ENVWeChat: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'fd320WaNnlCK6y333QyMr3c', 'ENVWeChat'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ENVWeChat = void 0);
				var r = t('./Comm'),
					a = t('./PlatformGeneralInterface'),
					c = (function (t) {
						function e() {
							var e = t.call(this) || this;
							e.mStorage = null;
							var o =
								e.mPlatform.getMenuButtonBoundingClientRect();
							return (
								o &&
									((e.mMenuArea = new a.MenuArea()),
									(e.mMenuArea.left = o.left),
									(e.mMenuArea.top = o.top),
									(e.mMenuArea.width = o.width),
									(e.mMenuArea.height = o.height)),
								e.mPlatform.on,
								e
							);
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								return window.wx;
							}),
							(e.prototype.isWeChat = function () {
								return !0;
							}),
							(e.prototype.isIOS = function () {
								return 'ios' == this.mSystemInfo.platform
									? (console.log('IOS\u5e73\u53f0'), !0)
									: (console.log('\u975eIOS\u5e73\u53f0'),
									  !1);
							}),
							(e.prototype.devideInfo = function () {
								var t = new a.DeviceInfo();
								return (
									(t.width = this.mSystemInfo.screenWidth),
									(t.height = this.mSystemInfo.screenHeight),
									(t.pixelRatio =
										this.mSystemInfo.pixelRatio),
									(t.safAreaTop =
										this.mSystemInfo.safeArea.top),
									t
								);
							}),
							(e.prototype.safeAreaTop = function () {
								return this.mSystemInfo &&
									this.mSystemInfo.safeArea &&
									this.mSystemInfo.safeArea.top
									? this.mSystemInfo.safeArea.top
									: 0;
							}),
							(e.prototype.menuTop = function () {
								return this.mSystemInfo
									? this.mMenuArea && this.mMenuArea.top
										? this.mSystemInfo.safeArea.top +
										  this.mMenuArea.top
										: this.mSystemInfo.safeArea.top + 20
									: t.prototype.menuTop.call(this);
							}),
							(e.prototype.login = function (t, e) {
								var o = this;
								this.mPlatform.checkSession({
									success: function () {
										console.log(
											'session \u672a\u8fc7\u671f'
										);
									},
									fail: function () {
										o.mPlatform.login({
											success: function (e) {
												console.log(
													'\u767b\u5f55\u6210\u529f',
													e
												),
													t && t();
											},
											fail: function (t) {
												console.log(
													'\u767b\u5f55\u5931\u8d25',
													t
												),
													e && e();
											}
										});
									}
								});
							}),
							(e.prototype.authorize = function (t, e) {
								var o = this;
								this.mPlatform.getSetting({
									success: function (n) {
										console.log(n),
											console.log(n.authSetting),
											console.log(n.authSetting.scope),
											n.authSetting.scope.screenRecord
												? console.log(
														'\u5df2\u7ecf\u6388\u6743,\u65e0\u9700\u518d\u6b21\u6388\u6743'
												  )
												: o.mPlatform.authorize({
														scope: 'scope.screenRecord',
														success: function (e) {
															console.log(
																'\u6388\u6743\u6210\u529f',
																e
															),
																t && t(e);
														},
														fail: function (t) {
															console.log(
																'\u6388\u6743\u5931\u8d25',
																t
															),
																e && e(t);
														}
												  });
									},
									fail: function () {
										console.log(
											'\u83b7\u53d6\u6388\u6743\u8bbe\u7f6e\u5931\u8d25'
										);
									}
								});
							}),
							(e.prototype.eventShow = function () {}),
							(e.prototype.eventHide = function () {}),
							(e.prototype.initializationUtil = function () {
								this.mStorage = r.Comm.mPlatform.mStorageUtil;
								var t = this;
								this.mPlatform.onShow(function () {
									t.eventShow();
								}),
									this.mPlatform.onHide(function () {
										t.eventHide();
									});
							}),
							(e.prototype.log = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.error = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.showRank = function (t, e) {
								this.mOpenDataContext
									? (this.mOpenDataContext.postMessage(
											a.SubContextMessage.generateMsg(
												a.EMessageType.EMT_Rank_Show,
												1
											)
									  ),
									  t())
									: e(!1);
							}),
							(e.prototype.shareWhileWeChat = function (t, e) {
								this.mPlatform.shareAppMessage({ title: t }),
									setTimeout(function () {
										e();
									}, 1500);
							}),
							e
						);
					})(a.GeneralInterface);
				(o.ENVWeChat = c), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		ENWindows: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '4efb7T0VpxDCroUNJHVbLi8', 'ENWindows'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ENWindows = void 0);
				var r = t('./Comm'),
					a = t('./MyEvent'),
					c = (function (t) {
						function e() {
							return t.call(this) || this;
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								return null;
							}),
							(e.prototype.showRank = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.authorizationSeat = function () {}),
							(e.prototype.initializationUtil = function () {}),
							(e.prototype.log = function () {}),
							(e.prototype.error = function (t) {
								console.warn(t);
							}),
							(e.prototype.playEffectMove = function () {
								r.Comm.getInstance().mSoundManager.playEffectMoveByEngine();
							}),
							(e.prototype.playEffectPair = function () {
								r.Comm.getInstance().mSoundManager
									.playEffectPairByEngine;
							}),
							(e.prototype.setupVolume = function (t, e) {
								void 0 === t && (t = null),
									void 0 === e && (e = null),
									null != t &&
										cc.audioEngine.setEffectsVolume(t),
									null != e &&
										cc.audioEngine.setMusicVolume(e);
							}),
							(e.prototype.verifySignatureEx = function () {
								return null;
							}),
							(e.prototype.initUserData = function () {}),
							(e.prototype.showToast = function (t) {
								console.log(t);
							}),
							(e.prototype.loadUserInfo = function (t, o, n, i) {
								var r = cc.sys.localStorage.getItem(
									e.KEY_USER_INFO
								);
								console.log('loadUserInfo is calling!', r);
								var c = n.bind(i);
								t.dispatchEvent(
									new a.EvtDispatchLoading('', !0, c)
								);
							}),
							(e.prototype.syncUserInfo2Database =
								function () {}),
							(e.KEY_USER_INFO = 'user_info'),
							e
						);
					})(t('./PlatformGeneralInterface').GeneralInterface);
				(o.ENWindows = c), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		EvCommon2: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '7c88dNGg8dN7rtxynqaYq+2', 'EvCommon2'),
					Object.defineProperty(o, '__esModule', { value: !0 });
				var n = (function () {
					function t() {}
					var e = t.prototype;
					return (
						(e.isWeChat = function () {
							return !1;
						}),
						(e.CFGRewardedVideoAD = function () {}),
						(e.isDouyinOrLite = function () {
							return !1;
						}),
						(e.devideInfo = function () {
							return {};
						}),
						(e.cfgOpenDataContext = function () {}),
						(e.initializationUtil = function () {}),
						(e.menuTop = function () {}),
						(e.login = function (t) {
							t && t();
						}),
						(e.startRecorder = function () {}),
						(e.stopRecorder = function () {}),
						(e.actionRecording = function () {}),
						(e.playEffectMove = function () {}),
						(e.playEffectPair = function () {}),
						(e.pauseRecorder = function () {}),
						(e.resumeRecorder = function () {}),
						(e.showInterstitialAd = function () {}),
						(e.hideInterstitialAd = function () {}),
						(e.showRank = function () {}),
						(e.setupVolume = function (t, e) {
							null != t && cc.audioEngine.setEffectsVolume(t),
								null != e && cc.audioEngine.setMusicVolume(e);
						}),
						(e.initDataInOpenDataContext = function () {}),
						(e.updateRank_Integral = function () {}),
						(e.showRewardedVideoAD = function (t, e, o) {
							!h5games.rewardReady &&
								h5games.showToast('No Available Video'),
								h5games.rewardReady &&
									h5games.showReward(function () {
										o && o(t, e);
									});
						}),
						t
					);
				})();
				(o.EvCommon2 = n), cc._RF.pop();
			},
			{}
		],
		EvCommon: [
			function (t, e, o) {
				'use strict';
				var n;
				cc._RF.push(e, '6f9b1eLuU1NB6kLErK5r9m6', 'EvCommon');
				var i =
					((n = function (t, e) {
						return (n =
							Object.setPrototypeOf ||
							({ __proto__: [] } instanceof Array &&
								function (t, e) {
									t.__proto__ = e;
								}) ||
							function (t, e) {
								for (var o in e)
									Object.prototype.hasOwnProperty.call(
										e,
										o
									) && (t[o] = e[o]);
							})(t, e);
					}),
					function (t, e) {
						function o() {
							this.constructor = t;
						}
						n(t, e),
							(t.prototype =
								null === e
									? Object.create(e)
									: ((o.prototype = e.prototype), new o()));
					});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.CommonStorage = o.EvCommon = void 0);
				var r = t('./PlatformGeneralInterface'),
					a = t('./Storage'),
					c = (function (t) {
						function e() {
							return (
								(null !== t && t.apply(this, arguments)) || this
							);
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								throw null;
							}),
							(e.prototype.initializationUtil = function () {
								(cc.game.onStart = function () {
									console.log(
										'\u6e38\u620f\u542f\u52a8\u65f6\u7684\u56de\u8c03\u51fd\u6570'
									);
								}),
									cc.game.on(
										cc.game.EVENT_HIDE,
										function () {
											console.log(
												'\u6e38\u620f\u88ab\u9690\u85cf,\u51c6\u5907\u4fdd\u5b58\u6570\u636e'
											),
												window.mStorageUtil.save2Cache(
													a.EStorageType
														.EST_Cache_UserInfo
												),
												window.mStorageUtil.save2Cache(
													a.EStorageType
														.EST_Cache_SysCfg
												),
												window.mStorageUtil.save2Cache(
													a.EStorageType
														.EST_Cache_RewardedData
												);
										},
										this
									);
							}),
							(e.prototype.log = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.error = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.initUserData = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.showRank = function () {}),
							(e.prototype.playEffectMove = function () {}),
							(e.prototype.playEffectPair = function () {}),
							(e.prototype.setupVolume = function (t, e) {
								void 0 === t && (t = null),
									void 0 === e && (e = null),
									null != t &&
										cc.audioEngine.setEffectsVolume(t),
									null != e &&
										cc.audioEngine.setMusicVolume(e);
							}),
							(e.prototype.verifySignatureEx = function () {
								return null;
							}),
							e
						);
					})(r.GeneralInterface);
				o.EvCommon = c;
				var s = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						i(e, t),
						(e.prototype.isErrorEnv = function () {
							throw new Error('Method not implemented.');
						}),
						(e.prototype.createPlatform = function () {
							return null;
						}),
						(e.prototype.extractCachedData = function () {
							var t = cc.sys.localStorage.getItem(
									a.default.KEY_CACHE_USERINFO
								),
								e = cc.sys.localStorage.getItem(
									a.default.KEY_CACHE_SYS_CFG
								);
							console.log('usr_data', t),
								console.log('cfg', e),
								t
									? this.mUserInfo.initByJson(JSON.parse(t))
									: this.save2Cache(
											a.EStorageType.EST_Cache_UserInfo
									  ),
								e
									? this.mSysCfg.initByCache(JSON.parse(e))
									: this.save2Cache(
											a.EStorageType.EST_Cache_SysCfg
									  );
						}),
						(e.prototype.save2Cache = function (t) {
							var e = '',
								o = null;
							switch (t) {
								case a.EStorageType.EST_Cache_UserInfo:
									(e = a.default.KEY_CACHE_USERINFO),
										(o = JSON.stringify(
											this.mUserInfo.generateCacheDate()
										));
									break;
								case a.EStorageType.EST_Cache_SysCfg:
									(e = a.default.KEY_CACHE_SYS_CFG),
										(o = JSON.stringify(
											this.mSysCfg.generateCache()
										));
							}
							e && null != o
								? cc.sys.localStorage.getItem(e, o)
								: console.log(
										'\u6570\u636e\u5f02\u5e38,\u653e\u5f03\u5b58\u50a8key: %s, data:',
										e,
										o
								  );
						}),
						(e.prototype.save2Colud = function () {
							throw new Error('Method not implemented.');
						}),
						e
					);
				})(a.default);
				(o.CommonStorage = s), cc._RF.pop();
			},
			{
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./Storage': 'Storage'
			}
		],
		ExtraIntegral: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'f9f45P3klpNaJlx7Mrun6l6', 'ExtraIntegral');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./MyEvent'),
					s = cc._decorator,
					m = s.ccclass,
					l = s.property,
					p = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mLabValue = null),
								(e.mNodeTarget = null),
								(e.mNodeCon = null),
								(e.mNodeIcon = null),
								(e.mNodeBox = null),
								(e.mValue = 0),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.reset = function () {
								(this.mLabValue.string =
									this.mValue.toString()),
									(this.mNodeCon.scale = 0),
									(this.mNodeCon.opacity = 255),
									(this.mNodeCon.x = 0),
									(this.mNodeCon.y = 0),
									(this.mNodeBox.scale = 0),
									(this.mNodeIcon.x = 0),
									(this.mNodeIcon.y = -2.8),
									(this.mNodeIcon.scale = 0);
							}),
							(e.prototype.initExtra = function (t) {
								(this.mValue = t),
									(this.mNodeCon.opacity = 255),
									this.playEffect();
							}),
							(e.prototype.reached = function () {
								this.playEffect(!0);
							}),
							(e.prototype.playEffect = function (t) {
								var e = this;
								void 0 === t && (t = !1);
								var o = this;
								if (t) {
									cc.tween(this.mNodeCon)
										.to(0.5, {
											x: 20,
											y: 20,
											opacity: 0,
											scale: 2
										})
										.start();
									var n = this.node.convertToNodeSpaceAR(
										this.mNodeTarget.parent.convertToWorldSpaceAR(
											this.mNodeTarget.getPosition()
										)
									);
									cc.tween(this.mNodeBox)
										.to(0.2, { scale: 0.6 })
										.call(function () {
											cc.tween(e.mNodeIcon)
												.to(0.3, { x: n.x, y: n.y })
												.call(function () {
													(o.mNodeIcon.scale = 0),
														o.node.dispatchEvent(
															new c.EvtReachIntegral(
																o.mValue
															)
														);
												})
												.start();
										})
										.to(0.3, { scale: 0 })
										.start();
								} else
									this.reset(),
										cc
											.tween(this.mNodeBox)
											.to(0.3, { scale: 0.6 })
											.call(function () {
												cc.tween(e.mNodeIcon)
													.to(0.2, { scale: 1 })
													.start();
											})
											.to(0.2, { scale: 1 })
											.call(function () {
												cc.tween(e.mNodeCon)
													.to(0.2, { scale: 1 })
													.start();
											})
											.start();
							}),
							(e.prototype.onLoad = function () {}),
							(e.prototype.start = function () {}),
							a([l(cc.Label)], e.prototype, 'mLabValue', void 0),
							a([l(cc.Node)], e.prototype, 'mNodeTarget', void 0),
							a([l(cc.Node)], e.prototype, 'mNodeCon', void 0),
							a([l(cc.Node)], e.prototype, 'mNodeIcon', void 0),
							a([l(cc.Node)], e.prototype, 'mNodeBox', void 0),
							a([m], e)
						);
					})(cc.Component);
				(o.default = p), cc._RF.pop();
			},
			{ './MyEvent': 'MyEvent', './typeof': 'typeof' }
		],
		Forecast: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'bafafh0w0VA8JFQhDUcx8r0', 'Forecast'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.EAxis = o.ForecastStep = o.ForecastCell = void 0);
				var n,
					i = t('./Comm'),
					r = t('./MyException'),
					a = t('./MyEnums'),
					c = (function () {
						function t(t, e) {
							(this.mRow = t), (this.mCol = e);
						}
						return (
							(t.prototype.toString = function () {
								return '(' + this.mRow + ',' + this.mCol + ')';
							}),
							t
						);
					})();
				o.ForecastCell = c;
				var s,
					m = (function () {
						function t(t, e, o, n) {
							(this.mSource = null),
								(this.mTag = null),
								(this.mAxis = null),
								(this.mMovedSpan = 0),
								(this.mSource = new c(t.Row(), t.Column())),
								(this.mTag = new c(e.Row(), e.Column())),
								(this.mAxis = o),
								(this.mMovedSpan = n);
						}
						return (
							(t.prototype.toString = function () {
								return (
									'from:' +
									this.mSource.toString() +
									'to:' +
									this.mTag.toString() +
									'span:' +
									this.mMovedSpan
								);
							}),
							(t.getMovingCells = function (t, e, o) {
								var r = new Array(),
									a = 0,
									s = 0,
									m = 0,
									l = 0;
								o > 0
									? (e == n.E_x
											? ((a = 0), (s = 1))
											: ((a = 1), (s = 0)),
									  (m = i.Comm.getRow()),
									  (l = i.Comm.getColumn()))
									: (e == n.E_x
											? ((a = 0), (s = -1))
											: ((a = -1), (s = 0)),
									  (m = -1),
									  (l = -1));
								for (
									var p = t.mRow, u = t.mCol, d = !1;
									p != m && u != l;

								) {
									var h = i.Comm.cell(p, u);
									if (null != h) {
										var f = h.boundCard();
										if (null != f) {
											if (f.isPaired()) {
												d = !0;
												break;
											}
											r.push(new c(p, u));
										}
									}
									(p += a), (u += s);
								}
								return d || (r = []), r;
							}),
							(t.prototype.axis = function () {
								return this.mAxis;
							}),
							(t.prototype.from = function () {
								return this.mSource;
							}),
							(t.prototype.span = function () {
								return this.mMovedSpan;
							}),
							(t.prototype.tag = function () {
								return this.mTag;
							}),
							(t.prototype.checkMatrix3_3 = function () {}),
							(t.prototype.search = function () {
								for (
									var e = 0, o = new Map(), r = 0;
									r < i.Comm.getRow();
									r++
								)
									o.set(r, new Array());
								var a = new Array();
								if (
									(a.push(this.mTag),
									e++,
									0 == this.mMovedSpan)
								)
									e++,
										a.push(this.mSource),
										o
											.get(this.mSource.mRow)
											.push(this.mSource.mCol),
										e++;
								else {
									var s = 0,
										m = 0;
									this.mMovedSpan > 0
										? this.mAxis == n.E_x
											? ((s = 0), (m = 1))
											: ((s = 1), (m = 0))
										: this.mAxis == n.E_x
										? ((s = 0), (m = -1))
										: ((s = -1), (m = 0));
									var l = Math.abs(this.mMovedSpan);
									for (r = 0; r <= l; r++) {
										var p = this.mSource.mRow + r * s,
											u = this.mSource.mCol + r * m;
										a.push(new c(p, u)),
											o.get(p).push(u),
											e++;
									}
									var d =
											this.mAxis == n.E_x
												? this.mMovedSpan
												: 0,
										h =
											this.mAxis == n.E_y
												? this.mMovedSpan
												: 0,
										f = t.getMovingCells(
											this.mSource,
											this.mAxis,
											this.mMovedSpan
										);
									for (
										f.shift(), 0 == f.length && e++, r = 0;
										r < f.length;
										r++
									)
										o.get(f[r].mRow + h).push(
											f[r].mCol + d
										);
								}
								for (; a.length > 0; ) {
									var _ = a.shift();
									if (
										(o.get(_.mRow).push(_.mCol),
										(p = _.mRow),
										(u = _.mCol) - 1 >= 0 &&
											-1 == o.get(p).indexOf(u - 1))
									) {
										var y = u - 1;
										i.Comm.cell(p, y)
											.boundCard()
											.isPaired() &&
											(a.push(new c(p, y)),
											o.get(p).push(y),
											e++);
									}
									if (
										(u + 1 < i.Comm.getColumn() &&
											-1 == o.get(p).indexOf(u + 1) &&
											((y = u + 1),
											i.Comm.cell(p, y)
												.boundCard()
												.isPaired() &&
												(a.push(new c(p, y)),
												o.get(p).push(y),
												e++)),
										p - 1 >= 0 &&
											-1 == o.get(p - 1).indexOf(u))
									) {
										var g = p - 1;
										i.Comm.cell(g, u)
											.boundCard()
											.isPaired() &&
											(a.push(new c(g, u)),
											o.get(g).push(u),
											e++);
									}
									p + 1 < i.Comm.getRow() &&
										-1 == o.get(p + 1).indexOf(u) &&
										((g = p + 1),
										i.Comm.cell(g, u)
											.boundCard()
											.isPaired() &&
											(a.push(new c(g, u)),
											o.get(g).push(u),
											e++));
								}
								return e;
							}),
							t
						);
					})();
				(o.ForecastStep = m),
					((s = n = o.EAxis || (o.EAxis = {}))[(s.E_x = 0)] = 'E_x'),
					(s[(s.E_y = 1)] = 'E_y');
				var l = (function () {
					function t() {
						this.mCellMapped = new Map();
						for (var t = 0; t <= a.ECard_Type.Wan_9; t++)
							this.mCellMapped.set(t, new Array());
					}
					return (
						(t.prototype.init = function () {
							for (
								var t = this.mCellMapped.keys(), e = t.next();
								!e.done;

							)
								this.mCellMapped.set(e.value, new Array()),
									(e = t.next());
						}),
						(t.prototype.add = function (t) {
							var e = this.mCellMapped.get(t.getType());
							null == e &&
								r.default.throwError(
									'Forecast',
									'add',
									'\u5f53\u524d\u6620\u5c04\u5217\u8868\u4e2d\u4e0d\u5305\u542b\u5f53\u524d\u724c\u578b\u7684\u952e!' +
										i.Comm.ecard_type2name(t.getType())
								),
								e.push(t) > 4 &&
									r.default.throwError(
										'Forecast',
										'add',
										'\u6570\u7ec4\u957f\u5ea6\u5927\u4e8e4\uff0c\u6bcf\u5c40\u4e2d\u6bcf\u79cd\u724c\u578b\u53ea\u5141\u8bb8\u67094\u5f20!'
									);
						}),
						(t.prototype.findAllOperableEx = function () {
							for (
								var e = new Array(),
									o = Array.from(this.mCellMapped.values()),
									n = 0;
								n < o.length;
								n++
							)
								for (var r = o[n], a = 0; a < r.length - 1; a++)
									for (
										var c = r[a], s = a + 1;
										s < r.length;
										s++
									) {
										var m = r[s],
											l = t.forecastWithEx(
												i.Comm.cell(c.row(), c.col()),
												i.Comm.cell(m.row(), m.col())
											);
										l.length > 0 && (e = e.concat(l));
									}
							return e;
						}),
						(t.forecastWithEx = function (t, e) {
							var o = new Array();
							if (t.Column() == e.Column() && t.Row() == e.Row())
								throw '\u4e0d\u5141\u8bb8\u540c\u4e00\u4e2a\u7f51\u683c\u3001\u6216\u4e24\u4e2a\u91cd\u53e0\u7684\u7f51\u683c\u8fdb\u884c\u6bd4\u8f83';
							if ((console.log(), t.Column() == e.Column())) {
								if (this.pairedBetweenInAxis(n.E_y, t, e))
									return o.push(new m(t, e, n.E_y, 0)), o;
							} else if (t.Row() == e.Row()) {
								if (this.pairedBetweenInAxis(n.E_x, t, e))
									return o.push(new m(t, e, n.E_x, 0)), o;
							} else {
								var i = this.moveAndPair(n.E_x, t, e),
									r = this.moveAndPair(n.E_y, t, e),
									a = this.moveAndPair(n.E_x, e, t),
									c = this.moveAndPair(n.E_y, e, t);
								0 != i
									? o.push(new m(t, e, n.E_x, i))
									: 0 != c && o.push(new m(e, t, n.E_y, c)),
									0 != r
										? o.push(new m(t, e, n.E_y, r))
										: 0 != a &&
										  o.push(new m(e, t, n.E_x, a));
							}
							return o;
						}),
						(t.moveAndPair = function (t, e, o) {
							var r = this.canMoveToInAxis(t, e, o);
							if (0 != r) {
								var a = e.Row(),
									c = e.Column(),
									s = n.E_x;
								if (
									(t == n.E_x
										? ((s = n.E_y), (c += r))
										: (a += r),
									this.pairedBetweenInAxis(
										s,
										i.Comm.cell(a, c),
										o
									))
								)
									return r;
							}
							return 0;
						}),
						(t.pairedBetweenInAxis = function (t, e, o) {
							var r = 0,
								a = 0;
							t == n.E_x
								? (r = o.Column() > e.Column() ? 1 : -1)
								: (a = o.Row() > e.Row() ? 1 : -1);
							for (
								var c = e.Row() + a, s = e.Column() + r;
								i.Comm.cell(c, s) != o;

							) {
								if (!i.Comm.cell(c, s).boundCard().isPaired())
									return !1;
								(c += a), (s += r);
							}
							return !0;
						}),
						(t.canMoveToInAxis = function (t, e, o) {
							var r = 0,
								a = 0,
								c = 0,
								s = -1,
								m = -1;
							t == n.E_x
								? (r = o.Column() - e.Column()) > 0
									? ((a = 1),
									  (c = 0),
									  (s = i.Comm.getColumn()),
									  (m = i.Comm.getRow()))
									: ((a = -1),
									  (c = 0),
									  (s = -1),
									  (m = i.Comm.getRow()))
								: (r = o.Row() - e.Row()) > 0
								? ((a = 0),
								  (c = 1),
								  (s = i.Comm.getColumn()),
								  (m = i.Comm.getRow()))
								: ((a = 0),
								  (c = -1),
								  (s = i.Comm.getColumn()),
								  (m = -1));
							for (
								var l = e.Column() + a, p = e.Row() + c;
								s != l && m != p;

							) {
								if (i.Comm.cell(p, l).boundCard().isPaired()) {
									for (
										var u = Math.abs(r), d = 0;
										d < u - 1;
										d++
									) {
										if (((p += c), (l += a) == s || p == m))
											return 0;
										if (
											!i.Comm.cell(p, l)
												.boundCard()
												.isPaired()
										)
											return 0;
									}
									return r;
								}
								(l += a), (p += c);
							}
							return 0;
						}),
						t
					);
				})();
				(o.default = l), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MyEnums': 'MyEnums',
				'./MyException': 'MyException',
				'./typeof': 'typeof'
			}
		],
		FrameBase: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'f121dQXV9BNBY3Qh3QNnpyw', 'FrameBase');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./SceneGame'),
					s = cc._decorator,
					m = s.ccclass,
					l = s.property,
					p = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (e.mRootSrc = null), e;
						}
						return (
							r(e, t),
							(e.prototype.switchFrame = function (t, e) {
								null != t &&
									null != e &&
									((t.node.active = !1), (e.active = !0));
							}),
							a(
								[l({ type: c.default })],
								e.prototype,
								'mRootSrc',
								void 0
							),
							a([m], e)
						);
					})(cc.Component);
				(o.default = p), cc._RF.pop();
			},
			{ './SceneGame': 'SceneGame', './typeof': 'typeof' }
		],
		FrameGame: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'eea0eqNbeJFW5WkOjGsa9/2', 'FrameGame');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./GameDesk'),
					s = t('./Score'),
					m = t('./FrameBase'),
					l = t('./Timer'),
					p = t('./Comm'),
					u = t('./DialogSettlement'),
					d = t('./MyEnums'),
					h = t('./MyEvent'),
					f = t('./DialogFailed'),
					_ = t('./ToolBar'),
					y = t('./CompProp'),
					g = t('./Auxiliary'),
					E = t('./DialogReward'),
					v = t('./PlatformGeneralInterface'),
					C = t('./ScoreIndicator'),
					S = t('./DialogSettlementWeChat'),
					T = t('./DialogShowWeChat'),
					P = (function () {
						function t(t) {
							(this.mSpt_SuccessiveCondition = null),
								(this.mSuccessiveCount = 0),
								(this.mSuccessiveCondition =
									0.9 * l.default.Max_Count_Per_Step),
								(this.mEnabled = !1),
								(this.mSpt_SuccessiveCondition = t),
								this.reset();
						}
						return (
							(t.prototype.reset = function () {
								switch (
									((this.mSuccessiveCount = 0), N.mGameType)
								) {
									case d.EGameType.EPractice:
										this.mSuccessiveCondition =
											l.default.Max_Count_Per_Step - 3;
										break;
									case d.EGameType.ERanking_JD:
										this.mSuccessiveCondition =
											l.default.Max_Count_Per_Step - 2;
										break;
									case d.EGameType.ERanking_KN:
										this.mSuccessiveCondition =
											l.default.Max_Count_Per_Step - 3;
								}
								(this.mSpt_SuccessiveCondition.fillStart =
									this.mSuccessiveCondition /
									l.default.Max_Count_Per_Step),
									(this.mEnabled = !1);
							}),
							(t.prototype.detection = function (
								t,
								e,
								o,
								n,
								i,
								r,
								a
							) {
								if (this.mEnabled) {
									if (t >= this.mSuccessiveCondition) {
										this.mSuccessiveCount++;
										var c = Math.round(
											e * this.mSuccessiveCount * 0.5
										);
										return (
											i.bind(a, this.mSuccessiveCount)(),
											r.bind(
												a,
												c,
												o,
												n,
												s.EScoreType
													.ESTSuccessiveAddition
											)(),
											c
										);
									}
									return (this.mSuccessiveCount = 0), 0;
								}
								this.mEnabled = !0;
							}),
							t
						);
					})(),
					R = cc._decorator,
					w = R.ccclass,
					M = R.property,
					N = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mPfb_Score = null),
								(e.mFrame_Home = null),
								(e.mSrc_ToolBar = null),
								(e.mSrc_Auxiliary = null),
								(e.mLab_Successive = null),
								(e.mNode_SuccessiveEffect = null),
								(e.mNode_GameDesk = null),
								(e.mNode_Bottom = null),
								(e.mNode_MaskExchange = null),
								(e.mDialog_Pause = null),
								(e.mDialogSrc_Failed = null),
								(e.mNode_Settlement = null),
								(e.mSrc_SettlementWeChat = null),
								(e.mDialogSrc_ShowWeChat = null),
								(e.mDialogSrc_Reward = null),
								(e.mSrcPropSearch = null),
								(e.mSrcPropRefresh = null),
								(e.mSrcScoreIndicator = null),
								(e.mSrc_GameDesk = null),
								(e.mScore_Pool = null),
								(e.mSuccessiveMananger = null),
								(e.mAct_Successive_Pair = null),
								(e.mIsNew = !1),
								e
							);
						}
						var o;
						return (
							r(e, t),
							(o = e),
							(e.prototype.init = function () {
								this.mScore_Pool = new cc.NodePool('CompScore');
								for (var t = 0; t < 15; t++) {
									var e = cc.instantiate(this.mPfb_Score);
									this.mScore_Pool.put(e);
								}
								if (
									((this.mSuccessiveMananger = new P(
										this.mSrc_ToolBar.compSuccessiveLimit()
									)),
									(this.mSrc_GameDesk =
										this.mNode_GameDesk.getComponent(
											c.default
										)),
									null == this.mSrc_GameDesk)
								)
									throw 'Node GameDesk \u672a\u6302\u8f7d\u811a\u672c\u7ec4\u4ef6';
								var o =
										p.Comm.mPlatform.mPlatformUtil.devideInfo(),
									n = Math.min(
										cc.view.getCanvasSize().width /
											this.node.width,
										cc.view.getCanvasSize().height /
											this.node.height
									),
									i = o.pixelRatio;
								(this.mSrc_ToolBar.node.height / i) * n +
									(this.mSrc_GameDesk.calculateHeightByRow(
										p.GameConfig.ROW_NUM_LONG
									) /
										i) *
										n +
									(this.mNode_Bottom.height / i) * n +
									o.safAreaTop <
									o.height &&
									(this.mSrc_ToolBar.node.height +=
										o.safAreaTop),
									this.mSrc_GameDesk.init();
							}),
							(e.prototype.cfgGame = function (t, e) {
								if (
									(void 0 === e && (e = !1),
									(o.mGameType = t),
									t == d.EGameType.EPractice)
								)
									(this.mIsNew = e),
										(this.node.active = !0),
										this.reset(),
										this.mSrcPropSearch.setupProp(
											d.EPropType.EProp_Search,
											this.mSrc_GameDesk
										),
										this.mSrcPropRefresh.setupProp(
											d.EPropType.EProp_Refresh,
											this.mSrc_GameDesk
										),
										this.startGame(),
										(this.mSrc_Auxiliary.node.active = !1),
										this.mSrc_GameDesk.mSrc_Tips.enableTips(
											p.Comm.ENABLE_TIPS_IN_PRACTICE
										),
										this.mSrc_GameDesk.mSrc_Tips.startTips();
								else {
									(this.mIsNew = !1),
										(this.node.active = !0),
										this.reset(),
										this.mSrcPropSearch.setupProp(
											d.EPropType.EProp_Search,
											this.mSrc_GameDesk
										),
										this.mSrcPropRefresh.setupProp(
											d.EPropType.EProp_Refresh,
											this.mSrc_GameDesk
										);
									var n = this;
									p.Comm.mPlatform.mPlatformUtil.CFGRewardedVideoAD(
										v.ERewardedAdScene.ERAS_Prop,
										this.node,
										function () {},
										function () {
											n.node.dispatchEvent(
												new h.EvtShowToast(
													'\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u6709\u5956\u52b1!',
													1.5
												)
											);
										},
										function () {
											n.node.dispatchEvent(
												new h.EvtShowToast(
													'\u5e7f\u544a\u6b21\u6570\u8d85\u9650,\u6682\u65f6\u65e0\u6cd5\u89c2\u770b!',
													1.5
												)
											);
										}
									),
										this.startGame(),
										p.Comm.mPlatform.mPlatformUtil.initDataInOpenDataContext();
								}
							}),
							(e.prototype.pauseGame = function () {
								this.mSrc_GameDesk.pauseGame(!0),
									(this.mDialog_Pause.active = !0),
									p.Comm.mPlatform.mPlatformUtil.showInterstitialAd();
							}),
							(e.prototype.startGame = function () {
								this.node.dispatchEvent(new h.EvtShuffling(!0)),
									this.mSrc_GameDesk.mSrc_Tips.reset(),
									p.Comm.cellsIsValid(o.mGameType) ||
										p.Comm.initCells(o.mGameType),
									null == this.mCards &&
										(this.mCards = p.Comm.createCards(
											o.mGameType
										)),
									this.mSrcScoreIndicator.init(),
									this.mSrc_ToolBar.enableToolBar(),
									this.mSrc_GameDesk.startGame(this.mCards);
							}),
							(e.prototype.resetDirectSubNode = function () {
								this.mSrc_ToolBar.initToolBar(this),
									(this.mDialogSrc_Failed.node.active = !1),
									this.mSrc_Auxiliary.init(),
									(this.mSrc_ToolBar.node.active = !0),
									(this.mNode_MaskExchange.active = !1),
									(this.mSrc_GameDesk.node.active = !1),
									(this.mNode_SuccessiveEffect.active = !1),
									(this.mDialog_Pause.active = !1),
									(this.mNode_Settlement.node.active = !1),
									(this.mSrc_SettlementWeChat.node.active =
										!1),
									(this.mDialogSrc_ShowWeChat.node.active =
										!1),
									(this.mDialogSrc_Reward.node.active = !1);
							}),
							(e.prototype.resetAttributes = function () {
								this.mSuccessiveMananger.reset();
							}),
							(e.prototype.reset = function () {
								this.resetDirectSubNode(),
									this.resetAttributes();
							}),
							(e.prototype.plusScoreWithEffect = function (
								t,
								e,
								o,
								n
							) {
								var i = !0,
									r = this.mScore_Pool.get();
								null == r &&
									((i = !1),
									(r = cc.instantiate(this.mPfb_Score))),
									this.mSrcScoreIndicator.increaseScore(t),
									this.node.addChild(r);
								var a = r.getComponent(s.default);
								null != a &&
									a
										.init(n, t)
										.playAct(
											e,
											o,
											i ? this.mScore_Pool : null
										);
							}),
							(e.prototype.scoreRulePair = function (t) {
								var e =
									o.mGameType == d.EGameType.ERanking_KN
										? 100
										: 50;
								return t > 0 ? Math.round(e * t) : e;
							}),
							(e.prototype.successivePair = function (t) {
								(this.mLab_Successive.string = t.toString()),
									this.mNode_SuccessiveEffect.active ||
										(this.mNode_SuccessiveEffect.active =
											!0),
									o.mGameType != d.EGameType.EPractice &&
										this.mSrc_ToolBar.increaseIntegral(t),
									this.mNode_SuccessiveEffect.runAction(
										this.mAct_Successive_Pair
									);
							}),
							(e.prototype.onFuhuo = function (t) {
								t.stopPropagation(),
									this.mSrc_GameDesk.usingProp_Refresh();
							}),
							(e.prototype.onUpdateRefresh = function (t) {
								t.stopPropagation(),
									t.mEPropType == d.EPropType.EProp_Refresh
										? this.mSrcPropRefresh.updateInfo()
										: t.mEPropType ==
												d.EPropType.EProp_Search &&
										  this.mSrcPropSearch.updateInfo();
							}),
							(e.prototype.onSubBtnClick = function (t) {
								switch (t.mType) {
									case d.EBtnClickType.EContinue:
										this.continueGame();
										break;
									case d.EBtnClickType.ECancel:
										this.cancel();
										break;
									case d.EBtnClickType.ENext:
										this.next();
										break;
									case d.EBtnClickType.ERetry:
										this.retry();
								}
							}),
							(e.prototype.onCancelFromPause = function (t) {
								if (
									(t.stopPropagation(),
									o.mGameType == d.EGameType.EPractice)
								)
									this.cancel();
								else {
									var e = this;
									this.node.dispatchEvent(
										new h.EvtWarningMsg(
											"        If you quit, you'll lose some score.",
											!1,
											!1,
											function () {
												p.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRoundOnce(
													!1
												),
													e.cancel();
											},
											null
										)
									);
								}
							}),
							(e.prototype.onCardPair = function (t) {
								var e = this;
								t.stopPropagation(),
									this.mSrc_ToolBar.isTiming() ||
										this.mSrc_ToolBar.startTiming(!0);
								var n = t.getStartPos_1(),
									i = t.getStartPos_2();
								Math.abs(i.x - n.x) <
									2 * p.Comm.getDesignWidth() && (i.y += 30);
								var r = cc.v2(n.x, n.y + 20),
									a = cc.v2(i.x, i.y + 20),
									c = this.mSrc_ToolBar.remainderTime(),
									m = this.scoreRulePair(c);
								if (
									(this.plusScoreWithEffect(
										m,
										n,
										r,
										s.EScoreType.ESTPair
									),
									this.plusScoreWithEffect(
										m,
										i,
										a,
										s.EScoreType.ESTPair
									),
									this.mSuccessiveMananger.detection(
										c,
										m,
										o.posAdditionSuccessive_From,
										o.posAdditionSuccessive_To,
										this.successivePair,
										this.plusScoreWithEffect,
										this
									),
									t.getGameState() ==
										d.EGameState.EGS_End_Successful)
								)
									if (
										(this.mSrc_ToolBar.startTiming(!1),
										o.mGameType == d.EGameType.EPractice)
									)
										p.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy(),
											this.mDialogSrc_Reward.mSrc_DialogSettlement.showSettlement(
												0
											);
									else {
										var l =
												this.mSrc_ToolBar.totalIntegral(),
											u =
												this.mSrcScoreIndicator.totalScore();
										p.Comm.mPlatform.mPlatformUtil.updateRank_Integral(
											l
										);
										var f = this;
										this.scheduleOnce(function () {
											if (
												p.Comm.mPlatform.mPlatformUtil.isWeChat()
											)
												if (
													u >
													p.GameConfig
														.SHOW_SCORE_LIMIT_IN_WECHAT
												)
													f.mDialogSrc_ShowWeChat.showDialog(
														u,
														l
													);
												else {
													var t = window.wx,
														o = e;
													t.authorize({
														scope: 'scope.WxFriendInteraction',
														success: function () {
															o.mSrc_SettlementWeChat.showSettlement(
																l
															);
														},
														fail: function () {
															o.node.dispatchEvent(
																new h.EvtWarningMsg(
																	'        \u68c0\u6d4b\u5230\u60a8\u5c1a\u672a\u6388\u6743\u597d\u53cb\u6743\u9650,\u6e38\u620f\u4e2d\u5c06\u65e0\u6cd5\u67e5\u770b\u6392\u884c\u699c\u529f\u80fd\uff0c\u662f\u5426\u524d\u5f80\u6388\u6743\uff01\n       \u9700\u8981\u67e5\u770b\u6392\u540d\u8bf7\u542f\u7528"\u5fae\u4fe1\u670b\u53cb"\u9009\u9879\uff01',
																	!1,
																	!1,
																	function () {
																		t.openSetting(
																			{
																				success:
																					function (
																						t
																					) {
																						console.log(
																							t
																						);
																					},
																				fail: function () {
																					console.log(
																						'\u6388\u6743\u5931\u8d25'
																					);
																				},
																				complete:
																					function () {
																						o.mSrc_SettlementWeChat.showSettlement(
																							l
																						);
																					}
																			}
																		);
																	},
																	function () {
																		o.mSrc_SettlementWeChat.showSettlement(
																			l
																		);
																	},
																	o
																)
															);
														}
													});
												}
											else
												f.mDialogSrc_Reward.showReward(
													l
												);
										}, 0.6);
									}
							}),
							(e.prototype.continueGame = function () {
								(this.mDialog_Pause.active = !1),
									this.mSrc_ToolBar.startTiming(!0),
									this.mSrc_GameDesk.pauseGame(!1);
							}),
							(e.prototype.cancel = function () {
								p.Comm.mPlatform.mPlatformUtil.stopRecorder(
									v.ERecordStopType.ERST_Home
								);
								var t = this.mFrame_Home;
								this.switchFrame(this, t),
									(this.mCards = null),
									this.mSrc_GameDesk.recycleCard2Pool();
							}),
							(e.prototype.retry = function () {
								p.Comm.mPlatform.mPlatformUtil.stopRecorder(
									v.ERecordStopType.ERST_Fail
								),
									p.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity()
										? null == o.mGameType
											? this.cancel()
											: (this.mSrc_GameDesk.recycleCard2Pool(),
											  this.cfgGame(o.mGameType))
										: -1 ==
										  p.Comm.mPlatform.mStorageUtil.mUserInfo.consumeEnergy()
										? this.node.dispatchEvent(
												new h.EvtRestoreEnergy(!1)
										  )
										: null == o.mGameType
										? this.cancel()
										: (this.mSrc_GameDesk.recycleCard2Pool(),
										  this.cfgGame(o.mGameType));
							}),
							(e.prototype.next = function () {
								if (
									(p.Comm.mPlatform.mPlatformUtil.stopRecorder(
										v.ERecordStopType.ERST_Fail
									),
									p.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity())
								)
									return (
										this.mSrc_GameDesk.recycleCard2Pool(),
										(this.mCards = p.Comm.createCards(
											o.mGameType
										)),
										void this.cfgGame(o.mGameType)
									);
								-1 ==
								p.Comm.mPlatform.mStorageUtil.mUserInfo.consumeEnergy()
									? this.node.dispatchEvent(
											new h.EvtRestoreEnergy(!1)
									  )
									: (this.mSrc_GameDesk.recycleCard2Pool(),
									  (this.mCards = p.Comm.createCards(
											o.mGameType
									  )),
									  this.cfgGame(o.mGameType));
							}),
							(e.prototype.onNoPairs = function (t) {
								if (
									(t.stopPropagation(),
									p.Comm.mPlatform.mStorageUtil.mUserInfo.getRefresh() >
										0 ||
										o.mGameType == d.EGameType.EPractice)
								) {
									var e = [];
									e.push(this.mSrcPropRefresh),
										this.mSrc_Auxiliary.showNoPairing(e);
								} else this.mDialogSrc_Failed.showFailed();
							}),
							(e.prototype.onReachExtraIntegral = function (t) {
								t.stopPropagation(),
									this.mSrc_ToolBar.increaseIntegral(
										t.mValue
									);
							}),
							(e.prototype.getGameDesk = function () {
								return this.mSrc_GameDesk;
							}),
							(e.prototype.onDisable = function () {}),
							(e.prototype.onLoad = function () {
								p.Comm.getInstance().mFrameGame = this;
								var t = this,
									e = cc.callFunc(function () {
										t.mNode_SuccessiveEffect.active = !1;
									}, this);
								(this.mAct_Successive_Pair = cc.sequence(
									cc.scaleTo(0.2, 1.2),
									cc.scaleTo(0.2, 1),
									e
								)),
									this.node.on(
										h.EvtUpdateProp.EVENT_TYPE,
										this.onUpdateRefresh,
										this
									),
									this.node.on(
										h.EvtFuhuo.EVENT_TYPE,
										this.onFuhuo,
										this
									),
									this.node.on(
										h.EvtSubBtnClick.EVENT_TYPE,
										this.onSubBtnClick,
										this
									),
									this.node.on(
										h.EvtCancelFromPause.EVENT_TYPE,
										this.onCancelFromPause,
										this
									),
									this.node.on(
										h.EvtCardPair.EVENT_TYPE,
										this.onCardPair,
										this
									),
									this.node.on(
										h.EvtNoPairs.EVENT_TYPE,
										this.onNoPairs,
										this
									),
									this.node.on(
										h.EvtReachIntegral.EVENT_TYPE,
										this.onReachExtraIntegral,
										this
									);
							}),
							(e.mGameType = null),
							(e.posAdditionTimer = new cc.Vec2(-360, 500)),
							(e.posAdditionSuccessive_From = new cc.Vec2(
								-121,
								512
							)),
							(e.posAdditionSuccessive_To = new cc.Vec2(
								-121,
								550
							)),
							a(
								[M(cc.Prefab)],
								e.prototype,
								'mPfb_Score',
								void 0
							),
							a([M(cc.Node)], e.prototype, 'mFrame_Home', void 0),
							a(
								[M({ type: _.default })],
								e.prototype,
								'mSrc_ToolBar',
								void 0
							),
							a(
								[M({ type: g.default })],
								e.prototype,
								'mSrc_Auxiliary',
								void 0
							),
							a(
								[M(cc.Label)],
								e.prototype,
								'mLab_Successive',
								void 0
							),
							a(
								[M(cc.Node)],
								e.prototype,
								'mNode_SuccessiveEffect',
								void 0
							),
							a(
								[M(cc.Node)],
								e.prototype,
								'mNode_GameDesk',
								void 0
							),
							a(
								[M(cc.Node)],
								e.prototype,
								'mNode_Bottom',
								void 0
							),
							a(
								[M(cc.Node)],
								e.prototype,
								'mNode_MaskExchange',
								void 0
							),
							a(
								[M(cc.Node)],
								e.prototype,
								'mDialog_Pause',
								void 0
							),
							a(
								[M({ type: f.default })],
								e.prototype,
								'mDialogSrc_Failed',
								void 0
							),
							a(
								[M({ type: u.default })],
								e.prototype,
								'mNode_Settlement',
								void 0
							),
							a(
								[M({ type: S.default })],
								e.prototype,
								'mSrc_SettlementWeChat',
								void 0
							),
							a(
								[M({ type: T.default })],
								e.prototype,
								'mDialogSrc_ShowWeChat',
								void 0
							),
							a(
								[M({ type: E.default })],
								e.prototype,
								'mDialogSrc_Reward',
								void 0
							),
							a(
								[M({ type: y.default })],
								e.prototype,
								'mSrcPropSearch',
								void 0
							),
							a(
								[M({ type: y.default })],
								e.prototype,
								'mSrcPropRefresh',
								void 0
							),
							a(
								[M({ type: C.default })],
								e.prototype,
								'mSrcScoreIndicator',
								void 0
							),
							(o = a([w], e))
						);
					})(m.default);
				(o.default = N), cc._RF.pop();
			},
			{
				'./Auxiliary': 'Auxiliary',
				'./Comm': 'Comm',
				'./CompProp': 'CompProp',
				'./DialogFailed': 'DialogFailed',
				'./DialogReward': 'DialogReward',
				'./DialogSettlement': 'DialogSettlement',
				'./DialogSettlementWeChat': 'DialogSettlementWeChat',
				'./DialogShowWeChat': 'DialogShowWeChat',
				'./FrameBase': 'FrameBase',
				'./GameDesk': 'GameDesk',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./Score': 'Score',
				'./ScoreIndicator': 'ScoreIndicator',
				'./Timer': 'Timer',
				'./ToolBar': 'ToolBar',
				'./typeof': 'typeof'
			}
		],
		FrameHome: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '53e04GP7ZFJo4CXBoCNryqg', 'FrameHome');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./FrameBase'),
					s = t('./Comm'),
					m = t('./MyEvent'),
					l = t('./MotionEfffectManager'),
					p = t('./PlatformGeneralInterface'),
					u = t('./MyEnums'),
					d = cc._decorator,
					h = d.ccclass,
					f = d.property,
					_ = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mBtn_Restore = null),
								(e.mNode_BtnGuanzhu = null),
								(e.mNode_BtnSetup = null),
								(e.mNode_BtnSetupForWeChat = null),
								(e.mNode_BtnRank = null),
								(e.mNode_BtnDuihuan = null),
								(e.mNode_BtnStart_KN = null),
								(e.mNode_IconStart_KN = null),
								(e.mNode_BtnStart_JD = null),
								(e.mNode_IconStart_JD = null),
								(e.mNode_BtnPractice = null),
								(e.mNode_IconPractice = null),
								(e.mNode_DialogSetup = null),
								(e.mNode_DialogGuanzhu = null),
								(e.mNode_DialogDuihuan = null),
								(e.mNode_InfiniteEnergyTip = null),
								(e.mLab_Counter = null),
								(e.mEnergy_1 = null),
								(e.mEnergy_2 = null),
								(e.mEnergy_3 = null),
								(e.mEnergy_4 = null),
								(e.mEnergy_5 = null),
								(e.mWdt_Header = null),
								(e.mAnim = null),
								(e.mNode_DialogRestoreEnergy = null),
								(e.mSPF_Energy_Default = null),
								(e.mSPF_Energy_WX = null),
								(e.mFlagClosing = !1),
								(e.mCountText = ''),
								(e.mDt = 0),
								(e.mLocalCounter = 0),
								(e.flag_first = !1),
								(e.flag_full = !1),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.counterCB = function () {}),
							(e.prototype.getConsumeEnergiedNode = function () {
								var t =
										s.Comm.mPlatform.mStorageUtil.mUserInfo.getCount(),
									e = Math.ceil(
										t / s.GameConfig.RestoreEnergy_Counter
									);
								return e <= s.GameConfig.Max_Energy_Num && e > 0
									? this.mEnergies[e - 1].node
									: this.mEnergies[0].node;
							}),
							(e.prototype.getEnergyNode = function (t) {
								return t >= s.GameConfig.Max_Energy_Num
									? this.mEnergy_5.node
									: 2 == t
									? this.mEnergy_2.node
									: 3 == t
									? this.mEnergy_3.node
									: 4 == t
									? this.mEnergy_4.node
									: this.mEnergy_1.node;
							}),
							(e.prototype.onBtnClick = function (t) {
								var e = this;
								t.stopPropagation();
								var o = t.target;
								if (o instanceof cc.Node) {
									var n = o.getComponent(cc.Button);
									if (null != n) {
										if (!n.enabled) return;
										(n.enabled = !1),
											n.scheduleOnce(function () {
												n.enabled = !0;
											}, 0.5);
									}
								}
								if (
									(s.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									o == this.mNode_BtnPractice &&
										h5games.showInterstitial(function () {
											(e.node.active = !1),
												e.node.dispatchEvent(
													new m.EvtStartGame(
														u.EGameType.EPractice
													)
												);
										}),
									o == this.mNode_BtnStart_KN ||
										o == this.mNode_BtnStart_JD)
								)
									h5games.showInterstitial(function () {
										if (
											s.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity()
										) {
											var t = new l.MotionInstance(
													e.getEnergyNode(5),
													cc.Vec2.ONE
												),
												n = null,
												i = u.EGameType.ERanking_KN;
											o == e.mNode_BtnStart_JD
												? ((n = e.mNode_IconStart_JD),
												  (i = u.EGameType.ERanking_JD))
												: ((n = e.mNode_IconStart_KN),
												  (i =
														u.EGameType
															.ERanking_KN));
											var r = new l.MotionInstance(
												n,
												cc.Vec2.ONE
											);
											e.updateEnergy();
											var a = e;
											e.node.dispatchEvent(
												new m.EvtMotionEffect(
													l.EMotionType.EMT_Energy,
													t,
													r,
													function () {
														(a.node.active = !1),
															a.node.dispatchEvent(
																new m.EvtStartGame(
																	i
																)
															);
													}
												)
											);
										} else {
											var c =
												s.Comm.mPlatform.mStorageUtil.mUserInfo.remainderEnergy();
											if (
												-1 !=
												s.Comm.mPlatform.mStorageUtil.mUserInfo.consumeEnergy()
											) {
												(t = new l.MotionInstance(
													e.getEnergyNode(c),
													cc.Vec2.ONE
												)),
													(n = null);
												var p = u.EGameType.ERanking_KN;
												o == e.mNode_BtnStart_JD
													? ((n =
															e.mNode_IconStart_JD),
													  (p =
															u.EGameType
																.ERanking_JD))
													: ((n =
															e.mNode_IconStart_KN),
													  (p =
															u.EGameType
																.ERanking_KN)),
													(r = new l.MotionInstance(
														n,
														cc.Vec2.ONE
													)),
													e.updateEnergy();
												var d = e;
												e.node.dispatchEvent(
													new m.EvtMotionEffect(
														l.EMotionType.EMT_Energy,
														t,
														r,
														function () {
															(d.node.active =
																!1),
																d.node.dispatchEvent(
																	new m.EvtStartGame(
																		p
																	)
																);
														}
													)
												);
											} else
												e.node.dispatchEvent(
													new m.EvtRestoreEnergy(!0)
												);
										}
									});
								else if (o == this.mNode_BtnRank) {
									var i = this;
									s.Comm.mPlatform.mPlatformUtil.showRank(
										function () {},
										function (t) {
											t
												? i.node.dispatchEvent(
														new m.EvtWarningMsg(
															'\u5f88\u62b1\u6b49\uff01\u5f53\u524d\u5bbf\u4e3b\u7248\u672c\u8fc7\u4f4e\uff0c\u65e0\u6cd5\u83b7\u53d6\u6392\u884c\u699c\u529f\u80fd\uff01',
															!1,
															!0
														)
												  )
												: i.node.dispatchEvent(
														new m.EvtShowToast(
															'\u6392\u884c\u699c\u5f02\u5e38,\u8bf7\u7a0d\u540e\u518d\u8bd5'
														)
												  );
										},
										this
									);
								} else
									o == this.mNode_BtnSetup ||
									o == this.mNode_BtnSetupForWeChat
										? (this.mNode_DialogSetup.active = !0)
										: o == this.mNode_BtnDuihuan
										? (this.mNode_DialogDuihuan.active = !0)
										: o == this.mNode_BtnGuanzhu
										? (this.mNode_DialogGuanzhu.active = !0)
										: o == this.mBtn_Restore.node &&
										  (s.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity()
												? this.node.dispatchEvent(
														new m.EvtShowToast(
															'Unlimited energy'
														)
												  )
												: s.Comm.mPlatform.mPlatformUtil.isWeChat() &&
												  s.Comm.mPlatform.mStorageUtil.mUserInfo.remainderEnergy() ==
														s.GameConfig
															.Max_Energy_Num
												? this.node.dispatchEvent(
														new m.EvtShowToast(
															'Full'
														)
												  )
												: this.node.dispatchEvent(
														new m.EvtRestoreEnergy(
															!0
														)
												  ));
							}),
							(e.prototype.onCfgRewardedVideoAd = function () {
								this.createRewardedVideoComp();
							}),
							(e.prototype.restoreEnergies = function () {
								s.Comm.mPlatform.mStorageUtil.mUserInfo.restoreEnergies(),
									(this.mLocalCounter = 0);
								for (var t = 0; t < this.mEnergies.length; t++)
									this.mEnergies[t].fillRange = 1;
							}),
							(e.prototype.switchToInfiniteEnergy = function () {
								if (
									(this.restoreEnergies(),
									s.Comm.mPlatform.mStorageUtil.mRewardedDate.setupInfiniteEnergyValidity(),
									this.node.active)
								) {
									var t = this;
									cc
										.tween(this.mEnergy_1.node)
										.to(0.2, { scaleX: 0, scaleY: 0 })
										.call(function () {
											t.mEnergy_1.spriteFrame =
												t.mSPF_Energy_WX;
										})
										.delay(0.1)
										.to(0.2, { scaleX: 1, scaleY: 1 })
										.start(),
										this.scheduleOnce(function () {
											cc.tween(t.mEnergy_2.node)
												.to(0.2, {
													scaleX: 0,
													scaleY: 0
												})
												.call(function () {
													t.mEnergy_2.spriteFrame =
														t.mSPF_Energy_WX;
												})
												.delay(0.1)
												.to(0.2, {
													scaleX: 1,
													scaleY: 1
												})
												.start();
										}, 0.1),
										this.scheduleOnce(function () {
											cc.tween(t.mEnergy_3.node)
												.to(0.2, {
													scaleX: 0,
													scaleY: 0
												})
												.call(function () {
													t.mEnergy_3.spriteFrame =
														t.mSPF_Energy_WX;
												})
												.delay(0.1)
												.to(0.2, {
													scaleX: 1,
													scaleY: 1
												})
												.start();
										}, 0.2),
										this.scheduleOnce(function () {
											cc.tween(t.mEnergy_4.node)
												.to(0.2, {
													scaleX: 0,
													scaleY: 0
												})
												.call(function () {
													t.mEnergy_4.spriteFrame =
														t.mSPF_Energy_WX;
												})
												.delay(0.1)
												.to(0.2, {
													scaleX: 1,
													scaleY: 1
												})
												.start();
										}, 0.3),
										this.scheduleOnce(function () {
											cc.tween(t.mEnergy_5.node)
												.to(0.2, {
													scaleX: 0,
													scaleY: 0
												})
												.call(function () {
													t.mEnergy_5.spriteFrame =
														t.mSPF_Energy_WX;
												})
												.delay(0.1)
												.to(0.2, {
													scaleX: 1,
													scaleY: 1
												})
												.start();
										}, 0.4),
										this.updateEnergy();
								}
							}),
							(e.prototype.createRewardedVideoComp = function () {
								var t = this;
								s.Comm.mPlatform.mPlatformUtil.CFGRewardedVideoAD(
									p.ERewardedAdScene.ERAS_Energy,
									this.node,
									function (e, o) {
										if (
											((t.mNode_DialogRestoreEnergy.active =
												!1),
											o >=
												s.GameConfig
													.Max_InfiniteEnergy_RewardedAd_Count)
										)
											t.node.dispatchEvent(
												new m.EvtWarningMsg(
													'   Congrats\uff0cyou got unlimited energy 1 day'
												)
											),
												t.switchToInfiniteEnergy();
										else {
											var n =
													s.Comm.mPlatform.mStorageUtil.mUserInfo.remainderEnergy(),
												i = t.getEnergyNode(n + 1);
											t.node.dispatchEvent(
												new m.EvtWarningMsg(
													'  Add energy a bit, watch a whole ad to get unlimited energy'
												)
											),
												t.node.dispatchEvent(
													new m.EvtMotionEffect(
														l.EMotionType.EMT_Energy,
														null,
														new l.MotionInstance(i),
														function () {
															s.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy(),
																t.updateEnergy();
														}
													)
												);
										}
									},
									function () {
										t.node.dispatchEvent(
											new m.EvtShowToast(
												'\u89c2\u770b\u5b8c\u6574\u89c6\u9891\u624d\u6709\u5956\u52b1!',
												1.5
											)
										);
									},
									function () {
										t.node.dispatchEvent(
											new m.EvtShowToast(
												'\u5e7f\u544a\u6b21\u6570\u8d85\u9650,\u6682\u65f6\u65e0\u6cd5\u89c2\u770b!',
												1.5
											)
										);
									}
								);
							}),
							(e.prototype.updateEnergy = function () {
								if (this.node.active) {
									if (
										s.Comm.mPlatform.mPlatformUtil.isWeChat()
									)
										this.mNode_InfiniteEnergyTip.active =
											!1;
									else if (
										s.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity()
									) {
										this.restoreEnergies();
										for (
											var t = 0;
											t < this.mEnergies.length;
											t++
										)
											(this.mEnergies[t].node.scale = 1),
												(this.mEnergies[t].spriteFrame =
													this.mSPF_Energy_WX);
										(this.mBtn_Restore.node.scale = 0),
											(this.mNode_InfiniteEnergyTip.active =
												!1);
									} else {
										for (
											this.mEnergies =
												this.mEnergies || [],
												t = 0;
											t < this.mEnergies.length;
											t++
										)
											(this.mEnergies[t].node.scale = 1),
												(this.mEnergies[t].spriteFrame =
													this.mSPF_Energy_Default);
										(this.mBtn_Restore.node.scale = 1),
											(this.mNode_InfiniteEnergyTip.active =
												!0);
									}
									this.mLocalCounter =
										s.Comm.mPlatform.mStorageUtil.mUserInfo.getCount();
									var e =
										s.GameConfig.Max_Energy_Num -
										Math.ceil(
											this.mLocalCounter /
												s.GameConfig
													.RestoreEnergy_Counter
										);
									for (
										this.schedule(this.counterCB, 1), t = 0;
										t < this.mEnergies.length;
										t++
									)
										if (t < e)
											this.mEnergies[t].fillRange = 1;
										else if (t == e) {
											var o =
												this.mLocalCounter %
												s.GameConfig
													.RestoreEnergy_Counter;
											this.mEnergies[e].fillRange =
												0 == o
													? 0
													: (s.GameConfig
															.RestoreEnergy_Counter -
															o) /
													  s.GameConfig
															.RestoreEnergy_Counter;
										} else this.mEnergies[t].fillRange = 0;
								}
							}),
							(e.prototype.onGuanzhu = function () {
								this.switchToInfiniteEnergy(),
									(this.mNode_BtnGuanzhu.active = !1);
							}),
							(e.prototype.onLoad = function () {
								(this.mWdt_Header.top =
									s.Comm.mPlatform.mPlatformUtil.menuTop()),
									(this.mEnergies = new Array()),
									this.mEnergies.push(this.mEnergy_1),
									this.mEnergies.push(this.mEnergy_2),
									this.mEnergies.push(this.mEnergy_3),
									this.mEnergies.push(this.mEnergy_4),
									this.mEnergies.push(this.mEnergy_5),
									this.mBtn_Restore.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnStart_JD.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnStart_KN.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnPractice.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnSetup.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnSetupForWeChat.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnRank.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnGuanzhu.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.mNode_BtnDuihuan.on(
										cc.Node.EventType.TOUCH_END,
										this.onBtnClick,
										this
									),
									this.node.on(
										s.GameConfig
											.EMIT_FIELD_REWARDED_SWITCH_ENERGY,
										this.onCfgRewardedVideoAd,
										this
									),
									this.node.on(
										s.GameConfig
											.EMIT_FIELD_FRAME_HOME_SWITCH_INFINITE,
										this.switchToInfiniteEnergy,
										this
									),
									this.node.on(
										s.GameConfig
											.EMIT_FIELD_FRAME_HOME_UPDATE_ENERGIES,
										this.updateEnergy,
										this
									),
									this.node.on(
										s.GameConfig
											.EMIT_FIELD_FRAME_HOME_GUANZHU,
										this.onGuanzhu,
										this
									);
							}),
							(e.prototype.start = function () {
								TopGamesUtil.bodyStyle(750, 1334),
									TopGamesUtil.init(function () {
										s.Comm.getInstance(),
											s.Comm.mPlatform.mPlatformUtil.login(
												function () {},
												function () {}
											);
									});
							}),
							(e.prototype.onEnable = function () {
								var t = this;
								(this.flag_first = !0),
									(this.mNode_DialogSetup.active = !1),
									(this.mNode_DialogGuanzhu.active = !1),
									(this.mNode_DialogDuihuan.active = !1);
								var e = this.mAnim.getClips();
								null != e &&
									e.length > 0 &&
									((e[0].wrapMode = cc.WrapMode.Loop),
									this.mAnim.play(e[0].name)),
									s.Comm.mPlatform.mPlatformUtil.isWeChat()
										? ((this.mNode_BtnSetupForWeChat.active =
												!0),
										  (this.mNode_BtnDuihuan.active = !1),
										  (this.mNode_BtnRank.active = !1),
										  (this.mNode_BtnSetup.active = !1))
										: (this.mNode_BtnSetupForWeChat.active =
												!1),
									s.Comm.mPlatform.mStorageUtil.mRewardedDate.isInfiniteEnergyValidity() ||
										this.createRewardedVideoComp(),
									s.Comm.mPlatform.mPlatformUtil.isDouyinOrLite()
										? s.Comm.mPlatform.mPlatformUtil.checkGuanzhuWhileDouyin(
												function (e) {
													t.mNode_BtnGuanzhu.active =
														!e;
												},
												function () {
													t.mNode_BtnGuanzhu.active =
														!0;
												}
										  )
										: (this.mNode_BtnGuanzhu.active = !1),
									this.updateEnergy(),
									setTimeout(function () {
										if (document.createEvent) {
											var t =
												document.createEvent(
													'HTMLEvents'
												);
											t.initEvent('resize', !0, !0),
												window.dispatchEvent(t);
										} else document.createEventObject && window.fireEvent('onresize');
									}, 1e3);
                                    loadTop.hideLoading();
							}),
							(e.prototype.onDisable = function () {
								console.log('\u5378\u8f7d\u5b9a\u65f6\u5668'),
									this.unschedule(this.counterCB);
								var t = this.mAnim.getClips();
								null != t &&
									t.length > 0 &&
									this.mAnim.stop(t[0].name);
							}),
							(e.prototype.update = function (t) {
								if (
									((this.mDt += t),
									this.mDt >= 1 || this.flag_first)
								) {
									this.flag_first = !1;
									var e =
										s.GameConfig.Max_Energy_Num -
										Math.ceil(
											this.mLocalCounter /
												s.GameConfig
													.RestoreEnergy_Counter
										);
									if (this.mLocalCounter > 0) {
										this.flag_full = !1;
										var o =
											this.mLocalCounter %
											s.GameConfig.RestoreEnergy_Counter;
										this.mEnergies[e].fillRange =
											0 == o
												? 0
												: (s.GameConfig
														.RestoreEnergy_Counter -
														o) /
												  s.GameConfig
														.RestoreEnergy_Counter;
										var n = Math.floor(
												this.mLocalCounter % 60
											),
											i = Math.floor(
												(this.mLocalCounter % 3600) / 60
											),
											r = Math.floor(
												this.mLocalCounter / 3600
											);
										if (0 == n && 0 == i && 0 == r)
											return (
												(this.mLab_Counter.node.active =
													!1),
												void (this.flag_full = !0)
											);
										(this.mLab_Counter.node.active = !0),
											(this.mCountText = 'Refill in '),
											(this.mCountText +=
												(r < 10 ? '0' + r : r) + ':'),
											(this.mCountText +=
												(i < 10 ? '0' + i : i) + ':'),
											(this.mCountText +=
												n < 10 ? '0' + n : n),
											(this.mLab_Counter.string =
												this.mCountText);
									} else if (
										(this.mLab_Counter.node.active &&
											(this.mLab_Counter.node.active =
												!1),
										this.flag_full)
									) {
										this.flag_full = !1;
										for (
											var a = 0;
											a < this.mEnergies.length;
											a++
										)
											this.mEnergies[a].fillRange = 1;
									}
									this.mDt = 0;
								}
							}),
							a(
								[f(cc.Button)],
								e.prototype,
								'mBtn_Restore',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnGuanzhu',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnSetup',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnSetupForWeChat',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnRank',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnDuihuan',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnStart_KN',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_IconStart_KN',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnStart_JD',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_IconStart_JD',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_BtnPractice',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_IconPractice',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_DialogSetup',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_DialogGuanzhu',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_DialogDuihuan',
								void 0
							),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_InfiniteEnergyTip',
								void 0
							),
							a(
								[f(cc.Label)],
								e.prototype,
								'mLab_Counter',
								void 0
							),
							a([f(cc.Sprite)], e.prototype, 'mEnergy_1', void 0),
							a([f(cc.Sprite)], e.prototype, 'mEnergy_2', void 0),
							a([f(cc.Sprite)], e.prototype, 'mEnergy_3', void 0),
							a([f(cc.Sprite)], e.prototype, 'mEnergy_4', void 0),
							a([f(cc.Sprite)], e.prototype, 'mEnergy_5', void 0),
							a(
								[f(cc.Widget)],
								e.prototype,
								'mWdt_Header',
								void 0
							),
							a([f(cc.Animation)], e.prototype, 'mAnim', void 0),
							a(
								[f(cc.Node)],
								e.prototype,
								'mNode_DialogRestoreEnergy',
								void 0
							),
							a(
								[f(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Energy_Default',
								void 0
							),
							a(
								[f(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Energy_WX',
								void 0
							),
							a([h], e)
						);
					})(c.default);
				(o.default = _), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./FrameBase': 'FrameBase',
				'./MotionEfffectManager': 'MotionEfffectManager',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		FrameLoading: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '33bb4qVY5pBsqsMjU/9DJON', 'FrameLoading');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./TutorialCard'),
					s = cc._decorator,
					m = s.ccclass,
					l = s.property,
					p = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mSrc_CardLeft = null),
								(e.mSrc_CardRight = null),
								(e.mLab_Describe = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.showLoading = function (t) {
								(this.mLab_Describe.string = t),
									(this.node.active = !0);
							}),
							(e.prototype.hideLoading = function () {
								this.node.active = !1;
							}),
							(e.prototype.updateText = function (t) {
								this.mLab_Describe.string = t;
							}),
							(e.prototype.complecte = function (t) {
								t(), (this.node.active = !1);
							}),
							(e.prototype.init = function () {
								this.mSrc_CardLeft.initInLoading(!0),
									this.mSrc_CardRight.initInLoading(!1),
									(this.mLab_Describe.node.active = !0);
							}),
							(e.prototype.onLoad = function () {
								this.node.on(
									cc.Node.EventType.TOUCH_START,
									this.interceptTouch,
									this
								),
									this.node.on(
										cc.Node.EventType.TOUCH_MOVE,
										this.interceptTouch,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_END,
										this.interceptTouch,
										this
									),
									this.node.on(
										cc.Node.EventType.TOUCH_CANCEL,
										this.interceptTouch,
										this
									);
							}),
							(e.prototype.start = function () {}),
							(e.prototype.onEnable = function () {
								this.mSrc_CardLeft.startActionInLoading(),
									this.mSrc_CardRight.startActionInLoading();
							}),
							(e.prototype.interceptTouch = function (t) {
								t.stopPropagation();
							}),
							a(
								[l({ type: c.default })],
								e.prototype,
								'mSrc_CardLeft',
								void 0
							),
							a(
								[l({ type: c.default })],
								e.prototype,
								'mSrc_CardRight',
								void 0
							),
							a(
								[l(cc.Label)],
								e.prototype,
								'mLab_Describe',
								void 0
							),
							a([m], e)
						);
					})(cc.Component);
				(o.default = p), cc._RF.pop();
			},
			{ './TutorialCard': 'TutorialCard', './typeof': 'typeof' }
		],
		FrameShuffling: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '32adb7BupVK9b95U74gyc4L', 'FrameShuffling');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass;
				c.property;
				var m = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (e.mAnim = null), e;
					}
					return (
						r(e, t),
						(e.prototype.onLoad = function () {
							(this.mAnim = this.getComponent(cc.Animation)),
								this.node.on(
									cc.Node.EventType.TOUCH_START,
									this.interceptTouch,
									this
								),
								this.node.on(
									cc.Node.EventType.TOUCH_MOVE,
									this.interceptTouch,
									this
								),
								this.node.on(
									cc.Node.EventType.TOUCH_END,
									this.interceptTouch,
									this
								),
								this.node.on(
									cc.Node.EventType.TOUCH_CANCEL,
									this.interceptTouch,
									this
								);
						}),
						(e.prototype.onEnable = function () {
							if (this.mAnim) {
								var t = this.mAnim.getClips();
								null != t &&
									t.length > 0 &&
									((t[0].wrapMode = cc.WrapMode.Loop),
									this.mAnim.play(t[0].name));
							}
						}),
						(e.prototype.onDisable = function () {
							if (this.mAnim) {
								var t = this.mAnim.getClips();
								null != t &&
									t.length > 0 &&
									this.mAnim.stop(t[0].name);
							}
						}),
						(e.prototype.start = function () {}),
						(e.prototype.interceptTouch = function (t) {
							t.stopPropagation();
						}),
						a([s], e)
					);
				})(cc.Component);
				(o.default = m), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		GameDesk: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'da037bdCgREWKdBJ3D+I6qc', 'GameDesk');
				var n,
					i,
					r = t('./typeof'),
					a = { handleException: function () {} },
					c =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					s = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					},
					m = function (t, e, o, n) {
						return new (o || (o = Promise))(function (i, r) {
							function c(t) {
								try {
									m(n.next(t));
								} catch (e) {
									(e = a.handleException(e)), r(e);
								}
							}
							function s(t) {
								try {
									m(n.throw(t));
								} catch (e) {
									(e = a.handleException(e)), r(e);
								}
							}
							function m(t) {
								var e;
								t.done
									? i(t.value)
									: ((e = t.value),
									  e instanceof o
											? e
											: new o(function (t) {
													t(e);
											  })).then(c, s);
							}
							m((n = n.apply(t, e || [])).next());
						});
					},
					l = function (t, e) {
						var o,
							n,
							i,
							r,
							c = {
								label: 0,
								sent: function () {
									if (1 & i[0]) throw i[1];
									return i[1];
								},
								trys: [],
								ops: []
							};
						return (
							(r = { next: s(0), throw: s(1), return: s(2) }),
							'function' == typeof Symbol &&
								(r[Symbol.iterator] = function () {
									return this;
								}),
							r
						);
						function s(t) {
							return function (e) {
								return m([t, e]);
							};
						}
						function m(r) {
							if (o)
								throw new TypeError(
									'Generator is already executing.'
								);
							for (; c; )
								try {
									if (
										((o = 1),
										n &&
											(i =
												2 & r[0]
													? n.return
													: r[0]
													? n.throw ||
													  ((i = n.return) &&
															i.call(n),
													  0)
													: n.next) &&
											!(i = i.call(n, r[1])).done)
									)
										return i;
									switch (
										((n = 0),
										i && (r = [2 & r[0], i.value]),
										r[0])
									) {
										case 0:
										case 1:
											i = r;
											break;
										case 4:
											return (
												c.label++,
												{ value: r[1], done: !1 }
											);
										case 5:
											c.label++, (n = r[1]), (r = [0]);
											continue;
										case 7:
											(r = c.ops.pop()), c.trys.pop();
											continue;
										default:
											if (
												!(i =
													(i = c.trys).length > 0 &&
													i[i.length - 1]) &&
												(6 === r[0] || 2 === r[0])
											) {
												c = 0;
												continue;
											}
											if (
												3 === r[0] &&
												(!i ||
													(r[1] > i[0] &&
														r[1] < i[3]))
											) {
												c.label = r[1];
												break;
											}
											if (6 === r[0] && c.label < i[1]) {
												(c.label = i[1]), (i = r);
												break;
											}
											if (i && c.label < i[2]) {
												(c.label = i[2]), c.ops.push(r);
												break;
											}
											i[2] && c.ops.pop(), c.trys.pop();
											continue;
									}
									r = e.call(t, c);
								} catch (s) {
									(r = [6, (s = a.handleException(s))]),
										(n = 0);
								} finally {
									o = i = 0;
								}
							if (5 & r[0]) throw r[1];
							return { value: r[0] ? r[1] : void 0, done: !0 };
						}
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.GameEvent_TouchEx = o.StructRC = void 0);
				var p,
					u = t('./MoveControl'),
					d = t('./Forecast'),
					h = t('./MyEvent'),
					f = t('./MyEnums'),
					_ = t('./Comm'),
					y = t('./MaskExchange'),
					g = t('./FrameGame'),
					E = t('./TipsManager'),
					v = cc._decorator,
					C = v.ccclass,
					S = v.property,
					T = (function () {
						function t() {
							(this.row = null), (this.column = null);
						}
						return (
							(t.prototype.isValid = function () {
								return null != this.row && null != this.column;
							}),
							(t.prototype.toString = function () {
								return '(' + this.row + ',' + this.column + ')';
							}),
							t
						);
					})();
				(o.StructRC = T),
					((p = i || (i = {}))[(p.EDegree_1 = 0)] = 'EDegree_1'),
					(p[(p.EDegree_2 = 1)] = 'EDegree_2'),
					(p[(p.EDegree_3 = 2)] = 'EDegree_3'),
					(p[(p.EDegree_4 = 3)] = 'EDegree_4'),
					(p[(p.EDegree_5 = 4)] = 'EDegree_5'),
					(p[(p.EDegree_6 = 5)] = 'EDegree_6'),
					(p[(p.EDegree_7 = 6)] = 'EDegree_7'),
					(p[(p.EDegree_8 = 7)] = 'EDegree_8'),
					(p[(p.EDegree_9 = 8)] = 'EDegree_9');
				var P = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mPrefab_mj = null),
							(e.mSrc_MaskWhileExchange = null),
							(e.mSrc_FrameGame = null),
							(e.mSrc_Tips = null),
							(e.mCardPool = new cc.NodePool('CardSrc')),
							(e.mSearchingMarkedCards = []),
							(e.mPairing_Cards = new Array()),
							(e.mPairCount = 0),
							(e.isMarkingSearch = !1),
							(e._cards = []),
							(e._cells = []),
							(e._isTimeOut = !1),
							(e._count = 0),
							e
						);
					}
					var o;
					return (
						c(e, t),
						(o = e),
						(e.prototype.init = function () {
							this.mForecast = new d.default();
							for (var t = 0; t < 120; t++) {
								var e = cc.instantiate(this.mPrefab_mj);
								this.mCardPool.put(e);
							}
						}),
						(e.prototype.calculateHeightByRow = function (t) {
							var e = 2 * o.mPadding;
							return _.GameConfig.DESIGN_HEIGHT * t + e;
						}),
						(e.prototype.updateSize = function () {
							var t = _.Comm.getRow(),
								e = _.Comm.getColumn(),
								n = 2 * o.mPadding;
							(this.node.width =
								_.GameConfig.DESIGN_WIDTH * e + n),
								(this.node.height =
									this.calculateHeightByRow(t));
						}),
						(e.prototype.recycleCard2Pool = function () {
							for (var t = 0; t < _.Comm.getRow(); t++)
								for (
									var e = 0;
									e < _.Comm.rows(t).length;
									e++
								) {
									var o = _.Comm.cell(t, e).destoryCard();
									null != o && this.mCardPool.put(o.node);
								}
						}),
						(e.prototype.startGame = function (t, e) {
							var o;
							void 0 === e && (e = !1),
								_.Comm.mPlatform.mPlatformUtil.startRecorder(),
								this.updateSize(),
								(o = 120 == t.length ? -60 : 0),
								(this.node.y = o),
								(this.node.active = !0),
								(this.isMarkingSearch = !1),
								(this.mPairCount = 0),
								this.mForecast.init(),
								this.mSrc_Tips.init();
							for (
								var n = _.Comm.getRow(),
									i = _.Comm.getColumn(),
									r = 0;
								r < n;
								r++
							)
								for (var a = 0; a < i; a++) {
									var c = t[r * i + a],
										s = this.mCardPool.get(c);
									s.setPosition(0, 0),
										s.setScale(1),
										_.Comm.cell(r, a).resetCard(s),
										this.node.addChild(s),
										_.Comm.cell(r, a).boundCard().moveTo(),
										this.mForecast.add(
											_.Comm.cell(r, a).boundCard()
										);
								}
							var m =
								_.Comm.mPlatform.mStorageUtil.mUserInfo.minimumForecastLengthInStartByRateOfSuccess();
							if (this.checkContinueWhileStart(m))
								this.node.dispatchEvent(new h.EvtShuffling(!1));
							else {
								for (
									this._cards = [], this._cells = [], r = 0;
									r < _.Comm.getRow();
									r++
								)
									for (a = 0; a < _.Comm.getColumn(); a++) {
										var l = _.Comm.cell(r, a).boundCard();
										this._cards.push(l),
											this._cells.push(
												new d.ForecastCell(r, a)
											);
									}
								(this._count = 0),
									(this._isTimeOut = !1),
									this.shuffleUntillGreaterGiven(
										m,
										new Date().valueOf()
									);
							}
						}),
						(e.prototype.shuffleUntillGreaterGiven = function (
							t,
							e
						) {
							this._count++,
								(this._cards = _.Comm.shuffle(this._cards));
							for (var o = 0; o < this._cards.length; o++) {
								var n = this._cells[o];
								_.Comm.cell(n.mRow, n.mCol).bind(
									this._cards[o]
								),
									this._cards[o].moveTo();
							}
							var i = new Date().valueOf();
							if (
								(this._isTimeOut
									? i - e >= 300 && ((e = i), t--)
									: i - e > 1e3 &&
									  ((this._isTimeOut = !0), t--, (e = i)),
								this.checkContinueWhileStart(t))
							)
								this.node.dispatchEvent(new h.EvtShuffling(!1));
							else {
								var r = this;
								setTimeout(function () {
									r.shuffleUntillGreaterGiven(t, e);
								}, 0);
							}
						}),
						(e.prototype.operationBeforeUsingProp = function () {
							this.mSrc_Tips.stop(),
								u.default.getInstance().isUsing() &&
									this.mPairing_Cards.length > 2 &&
									(u.default.getInstance().exitMove(),
									this.resetPairingCards(),
									u.default.getInstance().releaseOperating());
						}),
						(e.prototype.pauseGame = function (t) {
							void 0 === t && (t = !0),
								t
									? (_.Comm.mPlatform.mPlatformUtil.pauseRecorder(),
									  this.mSrc_Tips.pause())
									: (_.Comm.mPlatform.mPlatformUtil.resumeRecorder(),
									  this.mSrc_Tips.continue());
							for (var e = 0; e < _.Comm.getRow(); e++)
								for (var o = 0; o < _.Comm.getColumn(); o++) {
									var n = _.Comm.cell(e, o).boundCard();
									n.isPaired() ||
										(n.mNode_CardType.active = !t);
								}
						}),
						(e.prototype.usingProp_Search = function () {
							this.operationBeforeUsingProp(),
								this.operationWhileIsSearching(),
								(this.mSearchingMarkedCards = []),
								(this.isMarkingSearch = !0);
							for (
								var t = 0;
								t < this.mForecastSteps.length;
								t++
							) {
								var e = this.mForecastSteps[t].from(),
									o = this.mForecastSteps[t].tag(),
									n = _.Comm.cell(e.mRow, e.mCol).boundCard(),
									i = _.Comm.cell(o.mRow, o.mCol).boundCard();
								n.markingSearch(),
									i.markingSearch(),
									this.mSearchingMarkedCards.push(n),
									this.mSearchingMarkedCards.push(i);
							}
						}),
						(e.prototype.usingProp_Exchange = function () {
							this.operationBeforeUsingProp(),
								this.operationWhileIsSearching(),
								(this.mSrc_MaskWhileExchange.node.active = !0),
								u.default.getInstance().enableExchange(!0);
						}),
						(e.prototype.operationWhileIsSearching = function () {
							if (this.isMarkingSearch)
								for (
									var t = 0;
									t < this.mSearchingMarkedCards.length;
									t++
								)
									this.mSearchingMarkedCards[t].markingSearch(
										!1
									);
						}),
						(e.prototype.usingProp_Refresh = function (t) {
							void 0 === t && (t = !1),
								this.operationBeforeUsingProp(),
								this.operationWhileIsSearching();
							for (
								var e = new Array(), o = new Array(), n = 0;
								n < _.Comm.getRow();
								n++
							)
								for (var i = 0; i < _.Comm.getColumn(); i++) {
									var r = _.Comm.cell(n, i).boundCard();
									r.isPaired() ||
										(e.push(r),
										o.push(new d.ForecastCell(n, i)));
								}
							if (!(e.length <= 0)) {
								for (n = 0; n < e.length; n++)
									e[n].flipCard(!0);
								this.node.dispatchEvent(new h.EvtShuffling(!0));
								var a = this;
								this.scheduleOnce(function () {
									do {
										console.log(
											'\u6267\u884c\u4e00\u6b21\u6d17\u724c,\u5e76\u5224\u65ad\u6d17\u724c\u540e\u662f\u5426\u6709\u9ebb\u5c06\u53ef\u4ee5\u914d\u5bf9\uff01'
										),
											(e = _.Comm.shuffle(e));
										for (var t = 0; t < e.length; t++) {
											var n = o[t];
											_.Comm.cell(n.mRow, n.mCol).bind(
												e[t]
											),
												e[t].moveTo();
										}
									} while (!a.checkContinueWhileRefresh());
									for (
										a.node.dispatchEvent(
											new h.EvtShuffling(!1)
										),
											t = 0;
										t < e.length;
										t++
									)
										e[t].flipCard(!1);
								}, 1);
							}
						}),
						(e.prototype.checkContinueWhileStart = function (t) {
							return (
								(this.mForecastSteps =
									this.mForecast.findAllOperableEx()),
								!(
									this.mForecastSteps.length < t ||
									(this.mForecastSteps.sort(function (t, e) {
										return e.search() - t.search();
									}),
									this.mSrc_Tips.configTips(
										this.mForecastSteps[0]
									),
									this.mSrc_Tips.startTips(),
									0)
								)
							);
						}),
						(e.prototype.checkContinueWhileRefresh = function () {
							return (
								(this.mForecastSteps =
									this.mForecast.findAllOperableEx()),
								0 != this.mForecastSteps.length &&
									(this.mForecastSteps.sort(function (t, e) {
										return e.search() - t.search();
									}),
									this.mSrc_Tips.configTips(
										this.mForecastSteps[0]
									),
									this.mSrc_Tips.startTips(),
									!0)
							);
						}),
						(e.prototype.pairSuccess = function (t, e) {
							t.pair(),
								e.pair(),
								_.Comm.mPlatform.mPlatformUtil.playEffectPair();
							for (
								var o = this.mForecast.mCellMapped.get(
										t.getType()
									),
									n = new Array(),
									i = 0;
								i < o.length;
								i++
							)
								o[i] != t && o[i] != e && n.push(o[i]);
							if (
								(this.mForecast.mCellMapped.set(t.getType(), n),
								this.mPairCount++,
								this.mPairCount != _.Comm.getPairCount())
							) {
								var r = t.getBoundPos(),
									a = e.getBoundPos();
								this.node.dispatchEvent(
									new h.EvtCardPair(
										r,
										a,
										f.EGameState.EGS_Playing
									)
								),
									this.cbCheckContinue();
							} else
								this.node.dispatchEvent(
									new h.EvtCardPair(
										t.getBoundPos(),
										e.getBoundPos(),
										f.EGameState.EGS_End_Successful
									)
								);
						}),
						(e.prototype.cbCheckContinue = function () {
							return m(this, void 0, void 0, function () {
								return l(this, function () {
									return (
										(this.mForecastSteps =
											this.mForecast.findAllOperableEx()),
										0 == this.mForecastSteps.length
											? (this.node.dispatchEvent(
													new h.EvtNoPairs()
											  ),
											  [2])
											: (this.mForecastSteps.sort(
													function (t, e) {
														return (
															e.search() -
															t.search()
														);
													}
											  ),
											  this.mSrc_Tips.configTips(
													this.mForecastSteps[0]
											  ),
											  this.mSrc_Tips.startTips(),
											  [2])
									);
								});
							});
						}),
						(e.prototype.pairDetection = function (t) {
							if (
								((this.mPairing_Cards = []),
								this.mPairing_Cards.push(t),
								_.Comm.cell(t.row(), t.col()).inBounds(
									t.realTimePos()
								))
							) {
								var e = t.row(),
									o = t.col();
								this.detectionL(t, e, o),
									this.detectionR(t, e, o),
									this.detectionT(t, e, o),
									this.detectionB(t, e, o);
							} else {
								var n = u.default.getInstance();
								if (n.getDir() == u.EMoveDir.None) return !1;
								if (!n.isOperatingCard(t))
									throw 'Comm->pairDetection: Detection object is not same as Operation card !';
								var i = this.calculationCellByPos(
									t.realTimePos()
								);
								i.isValid() &&
									((e = i.row),
									(o = i.column),
									n.getDir() == u.EMoveDir.L2R
										? (0 == n.lengthSlateCards() &&
												this.detectionR(t, e, o),
										  this.detectionT(t, e, o),
										  this.detectionB(t, e, o))
										: u.default.getInstance().getDir() ==
										  u.EMoveDir.R2L
										? (0 == n.lengthSlateCards() &&
												this.detectionL(t, e, o),
										  this.detectionT(t, e, o),
										  this.detectionB(t, e, o))
										: u.default.getInstance().getDir() ==
										  u.EMoveDir.T2B
										? (this.detectionL(t, e, o),
										  this.detectionR(t, e, o),
										  0 == n.lengthSlateCards() &&
												this.detectionB(t, e, o))
										: u.default.getInstance().getDir() ==
												u.EMoveDir.B2T &&
										  (this.detectionL(t, e, o),
										  this.detectionR(t, e, o),
										  0 == n.lengthSlateCards() &&
												this.detectionT(t, e, o)));
							}
							if (this.mPairing_Cards.length > 1) {
								if (this.mPairing_Cards.length > 2) {
									var r = new Array();
									this.mPairing_Cards.forEach(function (
										e,
										o
									) {
										e != t && e.markingPairing(),
											0 != o && r.push(e);
									}),
										this.mSrc_FrameGame.mSrc_Auxiliary.showSelectPair(
											r
										);
								}
								return !0;
							}
							return (this.mPairing_Cards = []), !1;
						}),
						(e.prototype.detectionL = function (t, e, o) {
							for (o--; o >= 0; ) {
								var n = _.Comm.cell(e, o).boundCard();
								if (!n.isPaired()) {
									t.canPair(n) &&
										this.addPairAntiDuplicate(n);
									break;
								}
								o--;
							}
						}),
						(e.prototype.detectionR = function (t, e, o) {
							for (o++; o < _.Comm.getColumn(); ) {
								var n = _.Comm.cell(e, o).boundCard();
								if (!n.isPaired()) {
									t.canPair(n) &&
										this.addPairAntiDuplicate(n);
									break;
								}
								o++;
							}
						}),
						(e.prototype.detectionT = function (t, e, o) {
							for (e--; e >= 0; ) {
								var n = _.Comm.cell(e, o).boundCard();
								if (!n.isPaired()) {
									t.canPair(n) &&
										this.addPairAntiDuplicate(n);
									break;
								}
								e--;
							}
						}),
						(e.prototype.detectionB = function (t, e, o) {
							for (e++; e < _.Comm.getRow(); ) {
								var n = _.Comm.cell(e, o).boundCard();
								if (!n.isPaired()) {
									t.canPair(n) &&
										this.addPairAntiDuplicate(n);
									break;
								}
								e++;
							}
						}),
						(e.prototype.addPairAntiDuplicate = function (t) {
							-1 == this.mPairing_Cards.indexOf(t) &&
								this.mPairing_Cards.push(t);
						}),
						(e.prototype.exePair = function () {
							if (
								(this.operationWhileIsSearching(),
								2 != this.mPairing_Cards.length)
							)
								throw (
									'Comm->exePair: \u5f85\u914d\u5bf9\u6570\u7ec4\u4e2d\u6709\u4e14\u53ea\u6709\u4e24\u4e2a\u5143\u7d20\u65f6\u624d\u53ef\u4ee5\u8c03\u7528\u8be5\u51fd\u6570-' +
									this.mPairing_Cards.length
								);
							this.pairSuccess(
								this.mPairing_Cards[0],
								this.mPairing_Cards[1]
							),
								(this.mPairing_Cards = []);
						}),
						(e.prototype.calculationCellByPos = function (t) {
							var e = new T(),
								o = Math.abs(t.x),
								n = Math.abs(t.y),
								i = _.Comm.getRow(),
								r = _.Comm.getColumn(),
								a = _.Comm.getDesignWidth(),
								c = _.Comm.getDesignHeight();
							i % 2 != 0 && (n -= _.Comm.getDesignHeight() / 2),
								r % 2 != 0 &&
									(o -= _.Comm.getDesignWidth() / 2);
							var s = Math.floor(o / a) + (o % a == 0 ? 0 : 1),
								m = Math.floor(n / c) + (n % c == 0 ? 0 : 1);
							return (
								s >= 0 &&
									s <= Math.floor(r / 2) &&
									m >= 0 &&
									m <= Math.floor(i / 2) &&
									(t.x > 0
										? (e.column =
												r % 2 != 0
													? Math.floor(r / 2) + s
													: r / 2 - 1 + s)
										: (e.column =
												r % 2 != 0
													? Math.floor(r / 2) - s
													: r / 2 - s),
									t.y > 0
										? (e.row =
												i % 2 != 0
													? Math.floor(i / 2) - m
													: i / 2 - m)
										: (e.row =
												i % 2 != 0
													? Math.floor(i / 2) + m
													: i / 2 - 1 + m)),
								e
							);
						}),
						(e.prototype.onOperatingEnd = function (t) {
							var e = t.mCardSrc;
							(e.mMovingOutOfBounds = !1),
								t.mMovingOutOfBounds
									? this.mSrc_Tips.continue()
									: this.pairDetection(e)
									? 2 == this.mPairing_Cards.length
										? (e
												.getBoundPos()
												.equals(e.realTimePos()) ||
												(u.default
													.getInstance()
													.lengthPairingCards() > 0
													? u.default
															.getInstance()
															.submitMove()
													: u.default
															.getInstance()
															.exitMove()),
										  this.exePair(),
										  u.default
												.getInstance()
												.releaseOperating())
										: this.mPairing_Cards.length > 2
										? u.default
												.getInstance()
												.markerMultiPairedOperation()
										: _.Comm.mPlatform.mPlatformUtil.error(
												'\u914d\u5bf9\u68c0\u6d4b\u6210\u529f\uff0c\u4f46\u5f85\u914d\u5bf9\u9ebb\u5c06\u6570\u7ec4\u7684\u957f\u5ea6\u4e0d\u5c0f\u4e8e2'
										  )
									: (u.default.getInstance().exitMove(),
									  this.mSrc_Tips.continue());
						}),
						(e.prototype.onUpdateExchangeState = function (t) {
							t.stopPropagation(),
								this.mSrc_MaskWhileExchange.exchangedCardSelected();
						}),
						(e.prototype.onTouchStart = function (t) {
							if (this.mPairing_Cards.length > 2) {
								var e = this.mPairing_Cards.indexOf(t.mTag);
								if (-1 == e)
									return (
										this.resetPairingCards(),
										u.default.getInstance().exitMove(),
										void u.default
											.getInstance()
											.initControl(t.mTag)
									);
								0 == e
									? (t.mTag.updateIgnoreMove(!0),
									  t.mTag.updateIgnoreRelease(!0))
									: (t.mTag.updateIgnoreMove(!0),
									  (t.mTag.flagSelectToPair = !0));
							}
							this.mSrc_Tips.pause();
						}),
						(e.prototype.onTouchMove = function (t) {
							t.stopPropagation(),
								this.mSrc_Tips.confirmNotExecuteAct();
						}),
						(e.prototype.resetPairingCards = function () {
							for (var t = 0; t < this.mPairing_Cards.length; t++)
								this.mPairing_Cards[t].markingPairing(!1);
							this.mPairing_Cards = [];
						}),
						(e.prototype.onLoad = function () {
							this.node.on(
								h.EvtPropExchangeState.EVENT_TYPE,
								this.onUpdateExchangeState,
								this
							),
								this.node.on(
									R.EVENT_TYPE,
									this.onTouchStart,
									this
								),
								this.node.on(
									h.EvtMovingEndEx.EVENT_TYPE,
									this.onOperatingEnd,
									this
								),
								this.node.on(
									h.EvtPairMulti.EVENT_TYPE,
									this.onPairMulti,
									this
								),
								this.node.on(
									h.EvtTouchMove.EVENT_TYPE,
									this.onTouchMove,
									this
								),
								cc.debug.setDisplayStats(!1);
						}),
						(e.prototype.start = function () {}),
						(e.prototype.onPairMulti = function (t) {
							t.stopPropagation(),
								this.operationWhileIsSearching();
							var e = this.mPairing_Cards[0];
							e.markingSelecte(!1);
							var o = t.mCardSrc;
							this.resetPairingCards(), this.pairSuccess(e, o);
						}),
						(e.mPadding = 20),
						(e.CardsFromServer = !1),
						s(
							[S({ type: cc.Prefab })],
							e.prototype,
							'mPrefab_mj',
							void 0
						),
						s(
							[S({ type: y.default })],
							e.prototype,
							'mSrc_MaskWhileExchange',
							void 0
						),
						s(
							[S({ type: g.default })],
							e.prototype,
							'mSrc_FrameGame',
							void 0
						),
						s(
							[S({ type: E.default })],
							e.prototype,
							'mSrc_Tips',
							void 0
						),
						(o = s([C], e))
					);
				})(cc.Component);
				o.default = P;
				var R = (function (t) {
					function e(e, o, n) {
						var i = t.call(this, e, o) || this;
						return (i.mTag = null), (i.mTag = n), i;
					}
					return c(e, t), (e.EVENT_TYPE = 'GAME_TOUCH'), e;
				})(cc.Event);
				(o.GameEvent_TouchEx = R), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./Forecast': 'Forecast',
				'./FrameGame': 'FrameGame',
				'./MaskExchange': 'MaskExchange',
				'./MoveControl': 'MoveControl',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./TipsManager': 'TipsManager',
				'./typeof': 'typeof'
			}
		],
		MaskExchange: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '218b4pWlRJHF58bt41qYxSd', 'MaskExchange');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MoveControl'),
					m = cc._decorator,
					l = m.ccclass,
					p = m.property,
					u = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_GameDesk = null),
								(e.mNode_BtnReSelect = null),
								(e.mNode_Describe = null),
								(e.mLab_Index = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.onLoad = function () {
								this.mNode_BtnReSelect.on(
									cc.Node.EventType.TOUCH_END,
									this.onClick,
									this
								);
							}),
							(e.prototype.onEnable = function () {
								var t = this.node.convertToNodeSpaceAR(
									this.mNode_GameDesk.parent.convertToWorldSpaceAR(
										this.mNode_GameDesk.getPosition()
									)
								);
								this.mNode_GameDesk.height;
								var e =
										t.y +
										this.mNode_GameDesk.height / 2 +
										20,
									o =
										t.x -
										this.mNode_GameDesk.width / 2 +
										this.mNode_BtnReSelect.width / 2;
								this.mNode_BtnReSelect.setPosition(cc.v2(o, e)),
									(this.mNode_Describe.y = e),
									(this.mNode_BtnReSelect.active = !1),
									(this.mLab_Index.string = '1');
							}),
							(e.prototype.exchangedCardSelected = function (t) {
								void 0 === t && (t = !0),
									(this.mNode_BtnReSelect.active = t),
									(this.mLab_Index.string = t ? '2' : '1');
							}),
							(e.prototype.onClick = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									s.default
										.getInstance()
										.setupExchangedCard(null),
									this.exchangedCardSelected(!1);
							}),
							a(
								[p(cc.Node)],
								e.prototype,
								'mNode_GameDesk',
								void 0
							),
							a(
								[p(cc.Node)],
								e.prototype,
								'mNode_BtnReSelect',
								void 0
							),
							a(
								[p(cc.Node)],
								e.prototype,
								'mNode_Describe',
								void 0
							),
							a([p(cc.Label)], e.prototype, 'mLab_Index', void 0),
							a([l], e)
						);
					})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MoveControl': 'MoveControl',
				'./typeof': 'typeof'
			}
		],
		MotionEfffectManager: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(
					e,
					'80da5Eh9R1NmLy9jFTb9imj',
					'MotionEfffectManager'
				);
				var n,
					i,
					r = t('./typeof'),
					a =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					c = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.MotionInstance = o.EMotionType = void 0);
				var s,
					m = cc._decorator,
					l = m.ccclass,
					p = m.property;
				((s = i = o.EMotionType || (o.EMotionType = {}))[
					(s.EMT_Energy = 0)
				] = 'EMT_Energy'),
					(s[(s.EMT_PropTip_1 = 1)] = 'EMT_PropTip_1'),
					(s[(s.EMT_PropTip_2 = 2)] = 'EMT_PropTip_2'),
					(s[(s.EMT_PropRefresh = 3)] = 'EMT_PropRefresh'),
					(o.MotionInstance = function (t, e) {
						void 0 === e && (e = cc.Vec2.ONE),
							(this.mNode = null),
							(this.mScale = null),
							(this.mNode = t),
							(this.mScale = e);
					});
				var u = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mNodeEnergy = null),
							(e.mNodeProp_Tip1 = null),
							(e.mNodeProp_Tip2 = null),
							(e.mNodeProp_Refresh = null),
							e
						);
					}
					return (
						a(e, t),
						(e.prototype.startMotion = function (t, e, o, n) {
							var r = null;
							switch (o) {
								case i.EMT_Energy:
									r = this.mNodeEnergy;
									break;
								case i.EMT_PropTip_1:
									r = this.mNodeProp_Tip1;
									break;
								case i.EMT_PropTip_2:
									r = this.mNodeProp_Tip2;
									break;
								case i.EMT_PropRefresh:
									r = this.mNodeProp_Refresh;
							}
							if (null != r) {
								var a;
								null == t
									? ((a = cc.v2(0, 0)), (r.scale = 1))
									: ((a = this.node.convertToNodeSpaceAR(
											t.mNode.parent.convertToWorldSpaceAR(
												t.mNode.getPosition()
											)
									  )),
									  (r.scaleX = t.mScale.x),
									  (r.scaleY = t.mScale.y)),
									(r.x = a.x),
									(r.y = a.y),
									(r.scaleX = e.mScale.x),
									(r.scaleY = e.mScale.y),
									(r.active = !0);
								var c = this.node.convertToNodeSpaceAR(
									e.mNode.parent.convertToWorldSpaceAR(
										e.mNode.getPosition()
									)
								);
								cc.tween(r)
									.to(0.3, {
										x: c.x,
										y: c.y,
										scaleX: e.mScale.x,
										scaleY: e.mScale.y
									})
									.delay(0.1)
									.call(function () {
										n(), (r.active = !1), (r.scale = 1);
									})
									.start();
							}
						}),
						(e.prototype.onLoad = function () {
							(this.mNodeEnergy.active = !1),
								(this.mNodeProp_Tip1.active = !1),
								(this.mNodeProp_Tip2.active = !1),
								(this.mNodeProp_Refresh.active = !1);
						}),
						(e.prototype.start = function () {}),
						c([p(cc.Node)], e.prototype, 'mNodeEnergy', void 0),
						c([p(cc.Node)], e.prototype, 'mNodeProp_Tip1', void 0),
						c([p(cc.Node)], e.prototype, 'mNodeProp_Tip2', void 0),
						c(
							[p(cc.Node)],
							e.prototype,
							'mNodeProp_Refresh',
							void 0
						),
						c([l], e)
					);
				})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		MoveControl: [
			function (t, e, o) {
				'use strict';
				var n, i;
				cc._RF.push(e, '6944cNt+axPhaIOhfx/X0Tg', 'MoveControl'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.EMoveDir = void 0);
				var r,
					a = t('./Comm');
				((r = n || (n = {}))[(r.None = 0)] = 'None'),
					(r[(r.CanMove = 1)] = 'CanMove'),
					(r[(r.CanNotMove = 2)] = 'CanNotMove'),
					(function (t) {
						(t[(t.None = 0)] = 'None'),
							(t[(t.L2R = 1)] = 'L2R'),
							(t[(t.R2L = 2)] = 'R2L'),
							(t[(t.T2B = 3)] = 'T2B'),
							(t[(t.B2T = 4)] = 'B2T');
					})((i = o.EMoveDir || (o.EMoveDir = {})));
				var c = (function () {
					function t() {
						(this.anti_shake_threshold = 15),
							(this.operatingCard = null),
							(this.mCardToBeExchanged = null),
							(this.m_slave_cards = new Array()),
							(this.m_paired_cards = new Array()),
							(this.m_moving_dir = i.None),
							(this.mMoveable = n.None),
							(this.mExchanged_cell_num = 0),
							(this.mIsEnabledExchange = !1),
							(this.mMultiPaired_Operation = null),
							(this.mFlag_ExecutedWhileOverStep = !1);
					}
					return (
						(t.getInstance = function () {
							return (
								null == this.m_instance &&
									(this.m_instance = new t()),
								this.m_instance
							);
						}),
						(t.prototype.enableExchange = function (t) {
							void 0 === t && (t = !1),
								(this.mIsEnabledExchange = t),
								t || (this.mCardToBeExchanged = null);
						}),
						(t.prototype.exchangeIsEnabled = function () {
							return this.mIsEnabledExchange;
						}),
						(t.prototype.setupExchangedCard = function (t) {
							null != this.mCardToBeExchanged &&
								this.mCardToBeExchanged.markingExchange(!1),
								(this.mCardToBeExchanged = t);
						}),
						(t.prototype.cardToBeChanged = function () {
							return this.mCardToBeExchanged;
						}),
						(t.prototype.getDir = function () {
							return this.m_moving_dir;
						}),
						(t.prototype.isUsing = function () {
							return null != this.operatingCard;
						}),
						(t.prototype.initControl = function (t) {
							if (null != this.operatingCard)
								throw '\u8c03\u8bd5\u7528\u4ee3\u7801: \u68c0\u6d4bthis.operatingCard\u662f\u5426\u6b63\u5e38\u91ca\u653e,\u5f53\u524d\u6267\u884c\u6d41\u7a0b\u672a\u6b63\u5e38\u91ca\u653eoperatingCard';
							if (null == t)
								throw 'MoveControl->initMoveControl: Parameter optCard not allowed null!';
							(this.operatingCard = t),
								(this.operatingCard.node.zIndex =
									a.ELayer.Z_INDEX_MOVE_NORMAL),
								this.operatingCard.markingSelecte();
						}),
						(t.prototype.forcedUpdateControl = function (t) {
							if (null == t)
								throw 'MoveControl->initMoveControl: Parameter optCard not allowed null!';
							this.operatingCard = t;
						}),
						(t.prototype.isMultiPairing = function () {
							return null != this.mMultiPaired_Operation;
						}),
						(t.prototype.multiPairedOpt = function () {
							return this.mMultiPaired_Operation;
						}),
						(t.prototype.markerMultiPairedOperation = function () {
							null != this.operatingCard &&
								((this.mMultiPaired_Operation =
									this.operatingCard),
								(this.operatingCard.node.zIndex =
									a.ELayer.Z_INDEX_MOVE_NORMAL)),
								(this.operatingCard = null),
								(this.m_moving_dir = i.None),
								(this.mMoveable = n.None),
								(this.mExchanged_cell_num = 0);
						}),
						(t.prototype.releaseOperating = function () {
							null != this.mMultiPaired_Operation &&
								((this.mMultiPaired_Operation.node.zIndex =
									a.ELayer.Z_INDEX_CARD_NORMAL),
								this.mMultiPaired_Operation.markingSelecte(!1),
								(this.mMultiPaired_Operation = null)),
								null != this.operatingCard &&
									((this.operatingCard.node.zIndex =
										a.ELayer.Z_INDEX_MOVE_NORMAL),
									this.operatingCard.markingSelecte(!1)),
								(this.operatingCard = null),
								(this.m_moving_dir = i.None),
								(this.mMoveable = n.None),
								(this.mExchanged_cell_num = 0),
								(this.m_slave_cards = []),
								(this.m_paired_cards = []);
						}),
						(t.prototype.isOperatingCard = function (t) {
							return this.operatingCard == t;
						}),
						(t.prototype.exitMove = function () {
							null != this.mMultiPaired_Operation
								? (this.mMultiPaired_Operation.moveTo(
										null,
										!0,
										!0
								  ),
								  this.mMultiPaired_Operation.markingSelecte(
										!1
								  ),
								  (this.mMultiPaired_Operation.node.zIndex =
										a.ELayer.Z_INDEX_CARD_NORMAL))
								: (this.operatingCard.moveTo(null, !0, !0),
								  this.operatingCard.markingSelecte(!1),
								  (this.operatingCard.node.zIndex =
										a.ELayer.Z_INDEX_CARD_NORMAL)),
								this.m_slave_cards.forEach(function (t) {
									t.moveTo(null, !0, !1),
										(t.node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL);
								}),
								this.m_paired_cards.forEach(function (t) {
									t.moveTo(null, !0, !1),
										(t.node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL);
								}),
								this.releaseOperating();
						}),
						(t.prototype.submitMove = function () {
							var t = this.movedCellNum();
							if (t < 0)
								throw (
									'\u79fb\u52a8\u7684\u8de8\u5ea6\u4e0d\u80fd\u5c0f\u4e8e0,\u5f53\u524d\u8de8\u5ea6\u4e3a' +
									t
								);
							var e =
									null != this.mMultiPaired_Operation
										? this.mMultiPaired_Operation.getBoundPos()
										: this.operatingCard.getBoundPos(),
								o = a.Comm.getDesignWidth(),
								n = a.Comm.getDesignHeight(),
								i =
									null != this.mMultiPaired_Operation
										? this.mMultiPaired_Operation
												.realTimePos()
												.sub(e)
										: this.operatingCard
												.realTimePos()
												.sub(e),
								r = 0,
								c = 0;
							if (
								(i.x > 0 ? (r = o) : i.x < 0 && (r = -o),
								i.y > 0 ? (c = n) : i.y < 0 && (c = -n),
								null != this.mMultiPaired_Operation
									? (this.mMultiPaired_Operation.bindInPlace(),
									  this.mMultiPaired_Operation.markingSelecte(
											!1
									  ),
									  (this.mMultiPaired_Operation.node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL))
									: (this.operatingCard.bindInPlace(),
									  this.operatingCard.markingSelecte(!1),
									  (this.operatingCard.node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL)),
								this.m_slave_cards.forEach(function (t) {
									t.bindInPlace(),
										t.moveTo(),
										(t.node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL);
								}),
								!(t <= this.m_paired_cards.length))
							)
								throw 'MoveControl->submitMove: The number of moved cell is greater than paired array!';
							for (
								var s = 0;
								s < this.m_paired_cards.length;
								s++
							) {
								var m = this.m_paired_cards[s];
								if (s < t) {
									var l = cc.v2(e.x + s * r, e.y + s * c);
									m.moveTo(l), m.bindInPlace();
								}
								m.moveTo(),
									(m.node.zIndex =
										a.ELayer.Z_INDEX_CARD_NORMAL);
							}
							this.releaseOperating();
						}),
						(t.prototype.configMovale = function () {
							this.operatingCard.node.zIndex =
								a.ELayer.Z_INDEX_MOVE_NORMAL;
							var t = this.operatingCard.row(),
								e = this.operatingCard.col();
							if (this.m_moving_dir == i.L2R) {
								for (
									var o = e + 1;
									o < a.Comm.getColumn() &&
									!(r = a.Comm.cell(
										t,
										o
									).boundCard()).isPaired();

								)
									this.m_slave_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_NORMAL),
										o++;
								if (o == a.Comm.getColumn()) {
									for (; this.m_slave_cards.length > 0; )
										(r =
											this.m_slave_cards.pop()).node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL;
									return void (this.mMoveable = n.CanNotMove);
								}
								for (
									this.mMoveable = n.CanMove;
									o < a.Comm.getColumn() &&
									(r = a.Comm.cell(
										t,
										o
									).boundCard()).isPaired();

								)
									this.m_paired_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_PAIRED),
										o++;
							} else if (this.m_moving_dir == i.R2L) {
								for (
									o = e - 1;
									o >= 0 &&
									!(r = a.Comm.cell(
										t,
										o
									).boundCard()).isPaired();

								)
									this.m_slave_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_NORMAL),
										o--;
								if (-1 == o) {
									for (; this.m_slave_cards.length > 0; )
										(r =
											this.m_slave_cards.pop()).node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL;
									return void (this.mMoveable = n.CanNotMove);
								}
								for (
									this.mMoveable = n.CanMove;
									o >= 0 &&
									(r = a.Comm.cell(
										t,
										o
									).boundCard()).isPaired();

								)
									this.m_paired_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_PAIRED),
										o--;
							} else if (this.m_moving_dir == i.T2B) {
								for (
									o = t + 1;
									o < a.Comm.getRow() &&
									!(r = a.Comm.cell(
										o,
										e
									).boundCard()).isPaired();

								)
									this.m_slave_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_NORMAL),
										o++;
								if (o == a.Comm.getRow()) {
									for (; this.m_slave_cards.length > 0; )
										(r =
											this.m_slave_cards.pop()).node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL;
									return void (this.mMoveable = n.CanNotMove);
								}
								for (
									this.mMoveable = n.CanMove;
									o < a.Comm.getRow() &&
									(r = a.Comm.cell(
										o,
										e
									).boundCard()).isPaired();

								)
									this.m_paired_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_PAIRED),
										o++;
							} else if (this.m_moving_dir == i.B2T) {
								for (
									o = t - 1;
									o >= 0 &&
									!(r = a.Comm.cell(
										o,
										e
									).boundCard()).isPaired();

								)
									this.m_slave_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_NORMAL),
										o--;
								if (-1 == o) {
									for (; this.m_slave_cards.length > 0; )
										(r =
											this.m_slave_cards.pop()).node.zIndex =
											a.ELayer.Z_INDEX_CARD_NORMAL;
									return void (this.mMoveable = n.CanNotMove);
								}
								for (this.mMoveable = n.CanMove; o >= 0; ) {
									var r;
									if (
										!(r = a.Comm.cell(
											o,
											e
										).boundCard()).isPaired()
									)
										break;
									this.m_paired_cards.push(r),
										(r.node.zIndex =
											a.ELayer.Z_INDEX_MOVE_PAIRED),
										o--;
								}
							}
						}),
						(t.prototype.movedCellNum = function () {
							var t =
									null != this.mMultiPaired_Operation
										? this.mMultiPaired_Operation
										: this.operatingCard,
								e = a.Comm.calculationCellByPos(
									t.realTimePos()
								);
							if (e.isValid()) {
								if (
									((e.row = Math.abs(e.row - t.row())),
									(e.column = Math.abs(e.column - t.col())),
									e.row > 0 && e.column > 0)
								)
									throw 'MoveControl->moveCellNum: \u6c34\u5e73\u3001\u6216\u5782\u76f4\u79fb\u52a8\uff0c\u4ec5\u5141\u8bb8\u884c\u6216\u5217\u4e2d\u7684\u4e00\u4e2a\u7684\u503c\u5927\u4e8e0';
								return e.row > e.column ? e.row : e.column;
							}
							return -1;
						}),
						(t.prototype.lengthPairingCards = function () {
							return this.m_paired_cards.length;
						}),
						(t.prototype.lengthSlateCards = function () {
							return this.m_slave_cards.length;
						}),
						(t.prototype.moving = function (t) {
							if (null == this.operatingCard)
								throw '\u64cd\u4f5c\u5bf9\u8c61\u4e0d\u5141\u8bb8\u4e3anull';
							if (this.m_moving_dir == i.None) {
								if (
									this.m_slave_cards.length > 0 &&
									this.m_paired_cards.length
								)
									throw '\u672a\u6b63\u786e\u91ca\u653e\u53ef\u79fb\u52a8\u5bf9\u8c61: \u672a\u660e\u786e\u65b9\u5411\u65f6\uff0c\u4e0d\u5e94\u8be5\u6709\u53ef\u79fb\u52a8\u5bf9\u8c61\u96c6\u5408';
								(this.mMoveable = n.None),
									this.exeLogicDirction(t);
							}
							if (this.m_moving_dir != i.None) {
								var e = t.mPosNow;
								this.mMoveable == n.None && this.configMovale();
								var o =
										this.operatingCard.node.parent.convertToNodeSpaceAR(
											e
										),
									r = this.operatingCard.getBoundPos(),
									c = o.sub(r),
									s = a.Comm.getDesignWidth(),
									m = a.Comm.getDesignHeight();
								this.mMoveable, n.CanNotMove;
								var l = 0,
									p = 0,
									u = 0,
									d = 0;
								if (this.m_moving_dir == i.L2R) {
									if (
										((d =
											Math.floor(c.x / s) +
											(c.x % s == 0 ? 0 : 1)),
										(l =
											Math.floor(c.x / s) +
											(c.x % s > s / 2 ? 1 : 0)),
										(p = s),
										(c.y = 0),
										c.x < 0)
									)
										return;
								} else if (
									this.m_moving_dir == i.R2L &&
									((d =
										Math.abs(Math.ceil(c.x / s)) +
										(c.x % s == 0 ? 0 : 1)),
									(l =
										Math.ceil(c.x / s) -
										(Math.abs(c.x % s) > s / 2 ? 1 : 0)),
									(p = -s),
									(c.y = 0),
									c.x > 0)
								)
									return;
								if (this.m_moving_dir == i.T2B) {
									if (
										((d =
											Math.abs(Math.ceil(c.y / m)) +
											(c.y % m == 0 ? 0 : 1)),
										(l =
											Math.ceil(c.y / m) -
											(Math.abs(c.y % m) > m / 2
												? 1
												: 0)),
										(u = -m),
										(c.x = 0),
										c.y > 0)
									)
										return;
								} else if (
									this.m_moving_dir == i.B2T &&
									((d =
										Math.floor(c.y / m) +
										(c.y % m == 0 ? 0 : 1)),
									(l =
										Math.floor(c.y / m) +
										(Math.abs(c.y % m) > m / 2 ? 1 : 0)),
									(u = m),
									(c.x = 0),
									c.y < 0)
								)
									return;
								if (
									((l = Math.abs(l)),
									d > this.m_paired_cards.length)
								) {
									if (this.mFlag_ExecutedWhileOverStep)
										return;
									this.mFlag_ExecutedWhileOverStep = !0;
									for (
										var h = 0;
										h < this.m_paired_cards.length;
										h++
									) {
										var f = r.x + h * p,
											_ = r.y + h * u;
										this.m_paired_cards[h].moveTo(
											cc.v2(f, _),
											!0,
											!1
										);
									}
									return (
										(this.mExchanged_cell_num =
											this.m_paired_cards.length),
										(c.x = this.m_paired_cards.length * p),
										(c.y = this.m_paired_cards.length * u),
										void this.updateMoving(c)
									);
								}
								if (d <= this.m_paired_cards.length) {
									if (
										((this.mFlag_ExecutedWhileOverStep =
											!1),
										l > this.mExchanged_cell_num)
									) {
										var y =
												l > this.m_paired_cards.length
													? this.m_paired_cards.length
													: l,
											g =
												this.operatingCard.getBoundPos();
										for (
											h = this.mExchanged_cell_num;
											h < y;
											h++
										)
											(g.x = g.x + h * p),
												(g.y = g.y + h * u),
												this.m_paired_cards[h].moveTo(
													g,
													!0
												);
										this.mExchanged_cell_num = y;
									} else if (l < this.mExchanged_cell_num) {
										for (
											h = l;
											h < this.mExchanged_cell_num;
											h++
										)
											this.m_paired_cards[h].moveTo(
												null,
												!0
											);
										this.mExchanged_cell_num = l;
									}
									this.updateMoving(c);
								}
							}
						}),
						(t.prototype.exeLogicDirction = function (t) {
							var e =
									this.operatingCard.node.parent.convertToNodeSpaceAR(
										t.mPosStart
									),
								o =
									this.operatingCard.node.parent.convertToNodeSpaceAR(
										t.mPosNow
									),
								n = o.x - e.x,
								r = o.y - e.y,
								a = Math.abs(n),
								c = Math.abs(r);
							(a >= this.anti_shake_threshold ||
								c >= this.anti_shake_threshold) &&
								(this.m_moving_dir =
									a > c
										? n > 0
											? i.L2R
											: i.R2L
										: r > 0
										? i.B2T
										: i.T2B);
						}),
						(t.prototype.updateMoving = function (t) {
							var e = t.x,
								o = t.y;
							this.m_moving_dir == i.L2R ||
							this.m_moving_dir == i.R2L
								? (o = 0)
								: (this.m_moving_dir != i.T2B &&
										this.m_moving_dir != i.B2T) ||
								  (e = 0);
							var n = this.operatingCard.getBoundPos();
							(this.operatingCard.node.x = n.x + e),
								(this.operatingCard.node.y = n.y + o),
								this.m_slave_cards.forEach(function (t) {
									var n = t.getBoundPos();
									(t.node.x = n.x + e), (t.node.y = n.y + o);
								});
						}),
						(t.m_instance = null),
						t
					);
				})();
				(o.default = c), cc._RF.pop();
			},
			{ './Comm': 'Comm', './typeof': 'typeof' }
		],
		MyBaseComponent: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'ff91430dsBIIr/lzHWWZ+tO', 'MyBaseComponent');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass;
				c.property;
				var m = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						r(e, t), (e.prototype.start = function () {}), a([s], e)
					);
				})(cc.Component);
				(o.default = m), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		MyDataStructure: [
			function (t, e) {
				'use strict';
				cc._RF.push(e, 'ab48cI4l4VLc41j54W2652Q', 'MyDataStructure'),
					t('./typeof'),
					cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		MyEnums: [
			function (t, e, o) {
				'use strict';
				var n;
				cc._RF.push(e, '3323c3qGU1Ex6O46TAfM3qP', 'MyEnums'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.ECard_Type =
						o.EGameState =
						o.EDialogType =
						o.EBtnClickType =
						o.EManagedKey =
						o.ERewardType =
						o.EGameType =
						o.EPropType =
							void 0),
					((n = o.EPropType || (o.EPropType = {}))[
						(n.EProp_None = 0)
					] = 'EProp_None'),
					(n[(n.EProp_Search = 1)] = 'EProp_Search'),
					(n[(n.EProp_Refresh = 2)] = 'EProp_Refresh'),
					(function (t) {
						(t[(t.EPractice = 0)] = 'EPractice'),
							(t[(t.ERanking_JD = 1)] = 'ERanking_JD'),
							(t[(t.ERanking_KN = 2)] = 'ERanking_KN');
					})(o.EGameType || (o.EGameType = {})),
					(function (t) {
						(t[(t.EReward_None = 0)] = 'EReward_None'),
							(t[(t.EReward_Energy = 1)] = 'EReward_Energy'),
							(t[(t.EReward_Tip = 2)] = 'EReward_Tip'),
							(t[(t.EReward_Refresh = 3)] = 'EReward_Refresh');
					})(o.ERewardType || (o.ERewardType = {})),
					(function (t) {
						(t[(t.EEnergy = 0)] = 'EEnergy'),
							(t[(t.EHighestScore = 1)] = 'EHighestScore'),
							(t[(t.EMerit = 2)] = 'EMerit'),
							(t[(t.EIntegral = 3)] = 'EIntegral'),
							(t[(t.EProp_Search = 4)] = 'EProp_Search'),
							(t[(t.EProp_Exchange = 5)] = 'EProp_Exchange'),
							(t[(t.EProp_Refresh = 6)] = 'EProp_Refresh'),
							(t[(t.EArenaTimesTotal = 7)] = 'EArenaTimesTotal'),
							(t[(t.EArenaTimesWin = 8)] = 'EArenaTimesWin'),
							(t[(t.EArenaData = 9)] = 'EArenaData');
					})(o.EManagedKey || (o.EManagedKey = {})),
					(function (t) {
						(t[(t.ECancel = 0)] = 'ECancel'),
							(t[(t.EContinue = 1)] = 'EContinue'),
							(t[(t.ENext = 2)] = 'ENext'),
							(t[(t.ERetry = 3)] = 'ERetry');
					})(o.EBtnClickType || (o.EBtnClickType = {})),
					(function (t) {
						(t[(t.EDT_Failed = 0)] = 'EDT_Failed'),
							(t[(t.EDT_Pause = 1)] = 'EDT_Pause'),
							(t[(t.EDT_Settlement = 2)] = 'EDT_Settlement');
					})(o.EDialogType || (o.EDialogType = {})),
					(function (t) {
						(t[(t.EGS_Playing = 0)] = 'EGS_Playing'),
							(t[(t.EGS_End_Failed = 1)] = 'EGS_End_Failed'),
							(t[(t.EGS_End_Successful = 2)] =
								'EGS_End_Successful');
					})(o.EGameState || (o.EGameState = {})),
					(function (t) {
						(t[(t.Tong_1 = 0)] = 'Tong_1'),
							(t[(t.Tong_2 = 1)] = 'Tong_2'),
							(t[(t.Tong_3 = 2)] = 'Tong_3'),
							(t[(t.Tong_4 = 3)] = 'Tong_4'),
							(t[(t.Tong_5 = 4)] = 'Tong_5'),
							(t[(t.Tong_6 = 5)] = 'Tong_6'),
							(t[(t.Tong_7 = 6)] = 'Tong_7'),
							(t[(t.Tong_8 = 7)] = 'Tong_8'),
							(t[(t.Tong_9 = 8)] = 'Tong_9'),
							(t[(t.Tiao_1 = 9)] = 'Tiao_1'),
							(t[(t.Tiao_2 = 10)] = 'Tiao_2'),
							(t[(t.Tiao_3 = 11)] = 'Tiao_3'),
							(t[(t.Tiao_4 = 12)] = 'Tiao_4'),
							(t[(t.Tiao_5 = 13)] = 'Tiao_5'),
							(t[(t.Tiao_6 = 14)] = 'Tiao_6'),
							(t[(t.Tiao_7 = 15)] = 'Tiao_7'),
							(t[(t.Tiao_8 = 16)] = 'Tiao_8'),
							(t[(t.Tiao_9 = 17)] = 'Tiao_9'),
							(t[(t.Feng_1 = 18)] = 'Feng_1'),
							(t[(t.Feng_2 = 19)] = 'Feng_2'),
							(t[(t.Feng_3 = 20)] = 'Feng_3'),
							(t[(t.Wan_1 = 21)] = 'Wan_1'),
							(t[(t.Wan_2 = 22)] = 'Wan_2'),
							(t[(t.Wan_3 = 23)] = 'Wan_3'),
							(t[(t.Wan_4 = 24)] = 'Wan_4'),
							(t[(t.Wan_5 = 25)] = 'Wan_5'),
							(t[(t.Wan_6 = 26)] = 'Wan_6'),
							(t[(t.Wan_7 = 27)] = 'Wan_7'),
							(t[(t.Wan_8 = 28)] = 'Wan_8'),
							(t[(t.Wan_9 = 29)] = 'Wan_9');
					})(o.ECard_Type || (o.ECard_Type = {})),
					cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		MyEvent: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '8f758a69S1F1YAAl8wb2Do2', 'MyEvent'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.EvtReachIntegral =
						o.EvtStartChallenge =
						o.EvtShowToast =
						o.EvtWarningMsg =
						o.EvtRestoreEnergy =
						o.EvtShareInWeChat =
						o.EvtMotionEffect =
						o.EvtUpdateProp =
						o.EvtTouchMove =
						o.EvtStartTutorial =
						o.EvtUpdateExchangeable =
						o.EvtDispatchLoading =
						o.EvtShuffling =
						o.EvtRoutineStatisticsOver =
						o.EvtPairMulti =
						o.EvtFuhuo =
						o.EvtPropExchangeState =
						o.EvtPropExchange =
						o.EvtMovingEndEx =
						o.EvtMovingEnd =
						o.EvtStartGame =
						o.EvtLoadingPageEnd =
						o.EvtCancelFromPause =
						o.EvtSubBtnClick =
						o.EvtCardPair =
						o.EvtNoPairs =
							void 0);
				var r = t('./MyEnums'),
					a = t('./PlatformGeneralInterface'),
					c = (function (t) {
						function e(o) {
							return (
								void 0 === o && (o = !0),
								t.call(this, e.EVENT_TYPE, o) || this
							);
						}
						return i(e, t), (e.EVENT_TYPE = 'Evt_No_Pairs'), e;
					})(cc.Event);
				o.EvtNoPairs = c;
				var s = (function (t) {
					function e(o, n, i, a) {
						void 0 === i && (i = r.EGameState.EGS_Playing),
							void 0 === a && (a = !0);
						var c = t.call(this, e.EVENT_TYPE, a) || this;
						return (
							(c.mPos_1 = o),
							(c.mPos_2 = n),
							(c.mGameState = i),
							c
						);
					}
					return (
						i(e, t),
						(e.prototype.getGameState = function () {
							return this.mGameState;
						}),
						(e.prototype.getStartPos_1 = function () {
							return this.mPos_1;
						}),
						(e.prototype.getStartPos_2 = function () {
							return this.mPos_2;
						}),
						(e.EVENT_TYPE = 'Event_Card_Pair'),
						e
					);
				})(cc.Event);
				o.EvtCardPair = s;
				var m = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mType = o), i;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Sub_Btn_Click'), e;
				})(cc.Event);
				o.EvtSubBtnClick = m;
				var l = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Cancel_From_Pause'), e;
				})(cc.Event);
				o.EvtCancelFromPause = l;
				var p = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Loading_Page_End'), e;
				})(cc.Event);
				o.EvtLoadingPageEnd = p;
				var u = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mEGameType = o), i;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Start_Game'), e;
				})(cc.Event);
				o.EvtStartGame = u;
				var d = (function (t) {
					function e(e, o, n) {
						void 0 === o && (o = null), void 0 === n && (n = !0);
						var i = t.call(this, e, n) || this;
						return (i.mCardSrc = null), (i.mCardSrc = o), i;
					}
					return i(e, t), e;
				})(cc.Event);
				o.EvtMovingEnd = d;
				var h = (function (t) {
					function e(o, n, i) {
						void 0 === i && (i = !0);
						var r = t.call(this, e.EVENT_TYPE, o, i) || this;
						return (
							(r.mMovingOutOfBounds = !1),
							(r.mMovingOutOfBounds = n),
							r
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Moving_End_Ex'), e;
				})(d);
				o.EvtMovingEndEx = h;
				var f = (function (t) {
					function e(o, n, i) {
						void 0 === i && (i = !0);
						var r = t.call(this, e.EVENT_TYPE, i) || this;
						if (null == o || null == n)
							throw '\u53c2\u6570c1\u548cc2\u4e0d\u5141\u8bb8\u4e3a\u7a7a!';
						return (r.card1 = o), (r.card2 = n), r;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Prop_Exchange'), e;
				})(cc.Event);
				o.EvtPropExchange = f;
				var _ = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return (
						i(e, t), (e.EVENT_TYPE = 'Evt_Prop_Exchange_State'), e
					);
				})(cc.Event);
				o.EvtPropExchangeState = _;
				var y = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Fuhuo'), e;
				})(cc.Event);
				o.EvtFuhuo = y;
				var g = (function (t) {
					function e(o, n) {
						return (
							void 0 === n && (n = !0),
							t.call(this, e.EVENT_TYPE, o, n) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Pair_Multi'), e;
				})(d);
				o.EvtPairMulti = g;
				var E = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mTotalScore = 0), (i.mTotalScore = o), i;
					}
					return (
						i(e, t),
						(e.EVENT_TYPE = 'Evt_Routine_Statistics_Over'),
						e
					);
				})(cc.Event);
				o.EvtRoutineStatisticsOver = E;
				var v = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mShuffling = o), i;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Shuffling'), e;
				})(cc.Event);
				o.EvtShuffling = v;
				var C = (function (t) {
					function e(o, n, i, r) {
						void 0 === n && (n = !1),
							void 0 === i && (i = null),
							void 0 === r && (r = !0);
						var a = t.call(this, e.EVENT_TYPE, r) || this;
						return (
							(a.mDescribe = o),
							(a.mCompleted = n),
							(a.mCallbackWhileCompleted = i),
							a
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Dispatch_Loading'), e;
				})(cc.Event);
				o.EvtDispatchLoading = C;
				var S = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return (
						i(e, t), (e.EVENT_TYPE = 'Evt_Update_Exchangeable'), e
					);
				})(cc.Event);
				o.EvtUpdateExchangeable = S;
				var T = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Start_Tutorial'), e;
				})(cc.Event);
				o.EvtStartTutorial = T;
				var P = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Touch_Move'), e;
				})(cc.Event);
				o.EvtTouchMove = P;
				var R = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mEPropType = o), i;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Update_Prop'), e;
				})(cc.Event);
				o.EvtUpdateProp = R;
				var w = (function (t) {
					function e(o, n, i, r, a) {
						void 0 === a && (a = !0);
						var c = t.call(this, e.EVENT_TYPE, a) || this;
						return (
							(c.mFrom = null),
							(c.mTo = null),
							(c.mEMT = o),
							(c.mFrom = n),
							(c.mTo = i),
							(c.mCallback = r),
							c
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Motion_Effect'), e;
				})(cc.Event);
				o.EvtMotionEffect = w;
				var M = (function (t) {
					function e(o, n, i) {
						void 0 === i && (i = !0);
						var r = t.call(this, e.EVENT_TYPE, i) || this;
						return (
							(r.mErat = a.ERewardedAdType.ERAT_None),
							(r.mTag = null),
							(r.mErat = o),
							(r.mTag = n),
							r
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Share_In_WeChat'), e;
				})(cc.Event);
				o.EvtShareInWeChat = M;
				var N = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mFromHome = !1), (i.mFromHome = o), i;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Restore_Energy'), e;
				})(cc.Event);
				o.EvtRestoreEnergy = N;
				var I = (function (t) {
					function e(o, n, i, r, a, c, s) {
						void 0 === n && (n = !1),
							void 0 === i && (i = !1),
							void 0 === r && (r = null),
							void 0 === a && (a = void 0),
							void 0 === c && (c = null),
							void 0 === s && (s = !0);
						var m = t.call(this, e.EVENT_TYPE, s) || this;
						return (
							(m.mUseIcon = null),
							(m.mMsg = o),
							(m.mText_indent = i),
							(m.mUseIcon = n),
							(m.mCb_submit = r),
							(m.mCb_cancel = a),
							(m.mCb_this = c),
							m
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Warning_Msg'), e;
				})(cc.Event);
				o.EvtWarningMsg = I;
				var b = (function (t) {
					function e(o, n, i, r, a) {
						void 0 === n && (n = 1.5),
							void 0 === i && (i = !0),
							void 0 === r && (r = !0),
							void 0 === a && (a = !0);
						var c = t.call(this, e.EVENT_TYPE, a) || this;
						return (
							(c.mTitle = ''),
							(c.mTitle = o),
							(c.mDuration = n),
							(c.mShowInMiddle = i),
							(c.mIsFadeIn = r),
							c
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Show_Toast'), e;
				})(cc.Event);
				o.EvtShowToast = b;
				var D = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Start_Challenge'), e;
				})(cc.Event);
				o.EvtStartChallenge = D;
				var O = (function (t) {
					function e(o, n) {
						void 0 === n && (n = !0);
						var i = t.call(this, e.EVENT_TYPE, n) || this;
						return (i.mValue = 0), (i.mValue = o), i;
					}
					return i(e, t), (e.EVENT_TYPE = 'Evt_Reach_Integral'), e;
				})(cc.Event);
				(o.EvtReachIntegral = O), cc._RF.pop();
			},
			{
				'./MyEnums': 'MyEnums',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		MyException: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '1903ewrT6hDAp7Dhg54030L', 'MyException'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 });
				var n = (function () {
					function t(t) {
						(this.mClassName = ''), (this.mClassName = t);
					}
					return (
						(t.prototype.log = function (t) {
							console.log(t);
						}),
						(t.prototype.error = function (t, e) {
							console.error(
								'******** %s->%s:%s ********',
								this.mClassName,
								t,
								e
							);
						}),
						(t.throwError = function (t, e, o) {
							console.error(
								'******** %s->%s:%s ********',
								t,
								e,
								o
							);
						}),
						t
					);
				})();
				(o.default = n), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		PageLoading: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '646dfPojnVChbabOtZ1BTZw', 'PageLoading');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./FrameLoading'),
					m = t('./MyEvent'),
					l = t('./FrameGame'),
					p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mFrame_Game = null),
								(e.mSrc_Loading = null),
								(e.mProgress = null),
								(e.mProgressVal = 0),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.onEnable = function () {
								(this.mProgressVal = 0),
									(this.mProgress.progress =
										this.mProgressVal),
									c.Comm.mPlatform.mPlatformUtil.cfgOpenDataContext(),
									c.Comm.mPlatform.mStorageUtil.extractCachedData(),
									c.Comm.mPlatform.mPlatformUtil.initializationUtil(),
									c.Comm.getInstance().preloadResources();
								var t = this.mFrame_Game.getComponent(
									l.default
								);
								if (null == t)
									throw 'Node Frame_Game\u672a\u6302\u8f7d\u811a\u672c';
								t.init(), this.mSrc_Loading.init();
							}),
							(e.prototype.start = function () {}),
							(e.prototype.update = function (t) {
								this.mProgress.progress >= 1
									? (this.node.dispatchEvent(
											new m.EvtLoadingPageEnd()
									  ),
									  (this.node.active = !1))
									: (this.mProgressVal >= 0.9
											? c.Comm.getInstance().SpriteAtlasReady() &&
											  (this.mProgressVal += t)
											: (this.mProgressVal += t),
									  (this.mProgress.progress =
											this.mProgressVal));
							}),
							a([d(cc.Node)], e.prototype, 'mFrame_Game', void 0),
							a(
								[d({ type: s.default })],
								e.prototype,
								'mSrc_Loading',
								void 0
							),
							a(
								[d(cc.ProgressBar)],
								e.prototype,
								'mProgress',
								void 0
							),
							a([u], e)
						);
					})(cc.Component);
				(o.default = h), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./FrameGame': 'FrameGame',
				'./FrameLoading': 'FrameLoading',
				'./MyEvent': 'MyEvent',
				'./typeof': 'typeof'
			}
		],
		PanelRanking: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '4b16b1d01hELY8hOwvJmLfk', 'PanelRanking');
				var n,
					i,
					r = t('./typeof'),
					a =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					c = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var s,
					m = cc._decorator,
					l = m.ccclass,
					p = m.property;
				((s = i || (i = {}))[(s.Tab_Score = 0)] = 'Tab_Score'),
					(s[(s.Tab_Level = 1)] = 'Tab_Level');
				var u = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mTabNodeScore = null),
							(e.mTabNodeLevel = null),
							(e.mCompScore = null),
							(e.mCompLevel = null),
							(e.mContentScore = null),
							(e.mContentLevel = null),
							(e.mTabCur = i.Tab_Score),
							e
						);
					}
					return (
						a(e, t),
						(e.prototype.onLoad = function () {
							(this.mCompScore.active = !0),
								(this.mCompLevel.active = !1),
								null != this.mTabNodeLevel &&
									this.mTabNodeLevel.on(
										cc.Node.EventType.TOUCH_END,
										function () {},
										this
									),
								null != this.mTabNodeScore &&
									this.mTabNodeScore.on(
										cc.Node.EventType.TOUCH_END,
										function () {},
										this
									);
						}),
						(e.prototype.start = function () {}),
						(e.prototype.switchTab = function () {}),
						c([p(cc.Node)], e.prototype, 'mTabNodeScore', void 0),
						c([p(cc.Node)], e.prototype, 'mTabNodeLevel', void 0),
						c([p(cc.Node)], e.prototype, 'mCompScore', void 0),
						c([p(cc.Node)], e.prototype, 'mCompLevel', void 0),
						c([p(cc.Node)], e.prototype, 'mContentScore', void 0),
						c([p(cc.Node)], e.prototype, 'mContentLevel', void 0),
						c([l], e)
					);
				})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		PlatformGeneralInterface: [
			function (t, e, o) {
				'use strict';
				var n, i;
				cc._RF.push(
					e,
					'46b25My64lARZsmQAYXfqsy',
					'PlatformGeneralInterface'
				),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.GeneralInterface =
						o.SubContextMessage =
						o.EMessageType =
						o.DeviceInfo =
						o.MenuArea =
						o.RecordingInstance =
						o.ERewardedAdType =
						o.ERewardedAdScene =
						o.EActionStep =
						o.ERecordStopType =
						o.EShareSceneType =
							void 0);
				var r,
					a,
					c = t('./Comm'),
					s = t('./MyEvent');
				((r = o.EShareSceneType || (o.EShareSceneType = {}))[
					(r.ESST_Shared_Prop = 0)
				] = 'ESST_Shared_Prop'),
					(r[(r.ESST_Shared_Energy = 1)] = 'ESST_Shared_Energy'),
					(r[(r.ESST_Shared_For_Provocate = 2)] =
						'ESST_Shared_For_Provocate'),
					(function (t) {
						(t[(t.ERST_None = 0)] = 'ERST_None'),
							(t[(t.ERST_OUT_TIME = 1)] = 'ERST_OUT_TIME'),
							(t[(t.ERST_Home = 2)] = 'ERST_Home'),
							(t[(t.ERST_Fail = 3)] = 'ERST_Fail'),
							(t[(t.ERST_Success = 4)] = 'ERST_Success');
					})(o.ERecordStopType || (o.ERecordStopType = {})),
					(function (t) {
						(t[(t.EStep_Touch_Start = 0)] = 'EStep_Touch_Start'),
							(t[(t.EStep_Touch_End = 1)] = 'EStep_Touch_End'),
							(t[(t.EStep_Pairing = 2)] = 'EStep_Pairing');
					})(o.EActionStep || (o.EActionStep = {})),
					(function (t) {
						(t[(t.ERAS_None = 0)] = 'ERAS_None'),
							(t[(t.ERAS_Energy = 1)] = 'ERAS_Energy'),
							(t[(t.ERAS_Prop = 2)] = 'ERAS_Prop'),
							(t[(t.ERAS_Double_Integral = 3)] =
								'ERAS_Double_Integral');
					})((n = o.ERewardedAdScene || (o.ERewardedAdScene = {}))),
					(function (t) {
						(t[(t.ERAT_None = 0)] = 'ERAT_None'),
							(t[(t.ERAT_Energy = 1)] = 'ERAT_Energy'),
							(t[(t.ERAT_Tip = 2)] = 'ERAT_Tip'),
							(t[(t.ERAT_Shuffle = 3)] = 'ERAT_Shuffle'),
							(t[(t.ERAT_Fuhuo = 4)] = 'ERAT_Fuhuo'),
							(t[(t.ERAT_Double = 5)] = 'ERAT_Double');
					})((i = o.ERewardedAdType || (o.ERewardedAdType = {}))),
					(o.RecordingInstance = function (t) {
						(this.mInstance = null),
							(this.mStart = 0),
							(this.mIsMulti = !1),
							(this.mInstance = t);
					}),
					(o.MenuArea = function () {});
				var m = (function () {
					function t() {}
					return (
						(t.prototype.toString = function () {
							return (
								'[w-' +
								this.width +
								',h-' +
								this.height +
								',pr-' +
								this.pixelRatio +
								',sat-' +
								this.safAreaTop +
								']'
							);
						}),
						t
					);
				})();
				(o.DeviceInfo = m),
					(function (t) {
						(t[(t.EMT_None = 0)] = 'EMT_None'),
							(t[(t.EMT_Init = 1)] = 'EMT_Init'),
							(t[(t.EMT_Integral_Jia = 2)] = 'EMT_Integral_Jia'),
							(t[(t.EMT_Integral_Jian = 3)] =
								'EMT_Integral_Jian'),
							(t[(t.EMT_ShowMsgInFail = 4)] =
								'EMT_ShowMsgInFail'),
							(t[(t.EMT_Rank_Show = 5)] = 'EMT_Rank_Show');
					})((a = o.EMessageType || (o.EMessageType = {})));
				var l = (function () {
					function t() {
						(this.mMsgType = a.EMT_None), (this.mIntegral = 0);
					}
					return (
						(t.prototype.parseMsg = function (t) {
							if (t && t.type) {
								var e = t.type;
								if (e == a.EMT_Integral_Jia)
									return (
										(this.mIntegral = t.value),
										a.EMT_Integral_Jia
									);
								if (e == a.EMT_Integral_Jian)
									return (
										(this.mIntegral = t.value),
										a.EMT_Integral_Jian
									);
								if (e == a.EMT_ShowMsgInFail)
									return a.EMT_ShowMsgInFail;
								if (e == a.EMT_Rank_Show)
									return a.EMT_Rank_Show;
							} else
								console.log(
									'\u6570\u636e\u683c\u5f0f\u4e0d\u6b63\u786e\uff1a',
									t
								);
							return a.EMT_None;
						}),
						(t.generateMsg = function (t, e) {
							void 0 === e && (e = null);
							var o = 0;
							switch (t) {
								case a.EMT_Init:
									o = 1;
									break;
								case a.EMT_Integral_Jia:
									o = 2;
									break;
								case a.EMT_Integral_Jian:
									o = 3;
									break;
								case a.EMT_ShowMsgInFail:
									o = 4;
									break;
								case a.EMT_Rank_Show:
									o = 5;
							}
							return { type: o, value: e };
						}),
						t
					);
				})();
				o.SubContextMessage = l;
				var p = (function () {
					function t() {
						(this.logger = null),
							(this.mMenuArea = null),
							(this.mLastTime_InterstitialAd = 0),
							(this.mPlatform = null),
							(this.mSystemInfo = null),
							(this.mRewardedVideoAd = null),
							(this.mInterstitialAd = null),
							(this.mBannerAd = null),
							(this.mOpenDataContext = null),
							(this.mRewardedAdScene = n.ERAS_None),
							(this.mRewardedAdType = i.ERAT_None),
							(this.mRewardedVideoShown = !1),
							(this.mRewardedADCB_IsEnded = null),
							(this.mRewardedADCB_NotEnded = null),
							(this.mRewardedADCB_Max = null),
							(this.mNode_Scene = null),
							(this.mIsInterstitialShowing = !1),
							(this.mBannerShown = !1),
							(this.mLastTime_InterstitialAd =
								new Date().valueOf()),
							(this.mPlatform = this.createPlatform()),
							this.mPlatform &&
								((this.mSystemInfo =
									this.mPlatform.getSystemInfoSync()),
								(this.mOpenDataContext =
									this.mPlatform.getOpenDataContext()));
					}
					return (
						(t.prototype.createRewardedAdOption = function (t) {
							var e = null;
							return (
								t == n.ERAS_Energy
									? (e = this.isWeChat()
											? {
													adUnitId:
														c.GameConfig
															.adUnitId_RewardedAd_WX
											  }
											: this.isIOS()
											? {
													adUnitId:
														c.GameConfig
															.adUnitId_Energy_DY
											  }
											: {
													adUnitId:
														c.GameConfig
															.adUnitId_Energy_DY,
													multiton: !0,
													multitonRewardMsg: [
														'Unlimited 24h'
													],
													multitonRewardTimes:
														c.GameConfig
															.Max_InfiniteEnergy_RewardedAd_Count -
														1,
													progressTip: !0
											  })
									: t == n.ERAS_Prop
									? (e = this.isWeChat()
											? {
													adUnitId:
														c.GameConfig
															.adUnitId_RewardedAd_WX
											  }
											: {
													adUnitId:
														c.GameConfig
															.adUnitId_PropInGame_DY
											  })
									: t == n.ERAS_Double_Integral &&
									  (e = this.isWeChat()
											? {
													adUnitId:
														c.GameConfig
															.adUnitId_RewardedAd_WX
											  }
											: {
													adUnitId:
														c.GameConfig
															.adUnitId_DoubleIntegral_DY
											  }),
								e
							);
						}),
						(t.prototype.rewardedVideoListener = function () {
							var t = this,
								e = this;
							this.mRewardedVideoAd.onClose(function (o) {
								console.log(
									'\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u5173\u95ed\u65f6\u8fd4\u56de\u7684\u7ed3\u679c:',
									o
								),
									t.isWeChat()
										? o.isEnded
											? e.mRewardedVideoShown
												? e.mRewardedADCB_IsEnded(
														e.mRewardedAdType,
														1
												  )
												: (console.log(
														'\u8865\u5145104\u7b49\u95ee\u9898\u7684\u4e1a\u52a1\u903b\u8f91'
												  ),
												  e.mRewardedADCB_IsEnded(
														e.mRewardedAdType,
														1
												  ))
											: e.mRewardedADCB_NotEnded()
										: o.isEnded || o.count > 0
										? e.mRewardedVideoShown
											? e.mRewardedADCB_IsEnded(
													e.mRewardedAdType,
													o.count
											  )
											: (console.log(
													'\u8865\u5145104\u7b49\u95ee\u9898\u7684\u4e1a\u52a1\u903b\u8f91'
											  ),
											  e.mRewardedADCB_IsEnded(
													e.mRewardedAdType,
													o.count
											  ))
										: e.mRewardedADCB_NotEnded();
							}),
								this.mRewardedVideoAd.onError(function (e) {
									var o = e.errCode;
									if (1e3 == o)
										t.mNode_Scene.dispatchEvent(
											new s.EvtShowToast(
												'\u5e7f\u544a\u7ec4\u4ef6\u5f02\u5e38,\u8bf7\u7a0d\u540e\u518d\u8bd5',
												2
											)
										);
									else if (1001 == o) {
										var n =
											'        \u5e7f\u544a\u7ec4\u4ef6\u53c2\u6570\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u552f\u4e00\u5b98\u65b9\u6296\u97f3\u53f7' +
											c.GameConfig.NAME_DOUYIN +
											'\u53cd\u9988\u7801E01\uff0c\u5c4a\u65f6\u5c06\u83b7\u53d6\u4e30\u539a\u5956\u52b1\uff01\u8c22\u8c22\u60a8\u7684\u652f\u6301!';
										t.mNode_Scene.dispatchEvent(
											new s.EvtWarningMsg(n, !1, !1, null)
										);
									} else
										1002 == o
											? ((n =
													'        \u5e7f\u544a\u7ec4\u4ef6\u53c2\u6570\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u552f\u4e00\u5b98\u65b9\u6296\u97f3\u53f7' +
													c.GameConfig.NAME_DOUYIN +
													'\u53cd\u9988\u7801E02\uff0c\u5c4a\u65f6\u5c06\u83b7\u53d6\u4e30\u539a\u5956\u52b1\uff01\u8c22\u8c22\u60a8\u7684\u652f\u6301!'),
											  t.mNode_Scene.dispatchEvent(
													new s.EvtWarningMsg(
														n,
														!1,
														!1,
														null
													)
											  ))
											: 1004 == o
											? t.mNode_Scene.dispatchEvent(
													new s.EvtWarningMsg(
														'        \u5f53\u524d\u6ca1\u6709\u5408\u9002\u7684\u5e7f\u544a,\u5207\u6362\u81f3\u5206\u4eab\u754c\u9762\u3002\u6210\u529f\u5206\u4eab\u597d\u53cb\u4ecd\u53ef\u83b7\u53d6\u5956\u52b1\uff01\u540c\u4e00\u597d\u53cb\u4e00\u5929\u5185\u6700\u591a\u5206\u4eab\u4e00\u6b21\uff0c\u591a\u6b21\u5206\u4eab\u65e0\u4efb\u4f55\u5956\u52b1\u3002',
														!1,
														!1,
														null
													)
											  )
											: 1005 == o ||
											  1006 == o ||
											  1007 == o
											? ((n =
													'        \u5e7f\u544a\u7ec4\u4ef6\u72b6\u6001\u9519\u8bef\uff0c\u8bf7\u8054\u7cfb\u552f\u4e00\u5b98\u65b9\u6296\u97f3\u53f7' +
													c.GameConfig.NAME_DOUYIN +
													'\u53cd\u9988\u7801E03\uff0c\u5c4a\u65f6\u5c06\u83b7\u53d6\u4e30\u539a\u5956\u52b1\uff01\u8c22\u8c22\u60a8\u7684\u652f\u6301!'),
											  t.mNode_Scene.dispatchEvent(
													new s.EvtWarningMsg(
														n,
														!1,
														!1,
														null
													)
											  ))
											: 120002 == o &&
											  t.mRewardedADCB_Max();
								});
						}),
						(t.prototype.CFGRewardedVideoAD = function (
							t,
							e,
							o,
							i,
							r,
							a
						) {
							var s = this;
							if (
								(void 0 === a && (a = !1),
								!(t != n.ERAS_None && e && o && i && r))
							)
								throw '\u914d\u7f6e\u6fc0\u52b1\u89c6\u9891\u7ec4\u4ef6\u65f6\u53c2\u6570\u9519\u8bef';
							(this.mRewardedADCB_IsEnded = o),
								(this.mRewardedADCB_NotEnded = i),
								(this.mRewardedADCB_Max = r),
								(this.mNode_Scene = e);
							var m = this;
							if (this.mRewardedVideoAd) {
								if (c.Comm.mPlatform.mPlatformUtil.isWeChat())
									return;
								this.mRewardedAdScene != t
									? this.mRewardedVideoAd
											.destroy()
											.then(function () {
												console.log(
													'\u9500\u6bc1\u6210\u529f'
												),
													(m.mRewardedVideoAd =
														m.mPlatform.createRewardedVideoAd(
															s.createRewardedAdOption(
																t
															)
														)),
													m.rewardedVideoListener(),
													a &&
														m.mRewardedVideoAd
															.show()
															.then(function () {
																m.mRewardedVideoShown =
																	!0;
															}),
													(s.mRewardedAdScene = t);
											})
											.catch(function (e) {
												console.log(
													'\u9500\u6bc1\u5931\u8d25',
													e
												),
													(m.mRewardedVideoAd =
														m.mPlatform.createRewardedVideoAd(
															s.createRewardedAdOption(
																t
															)
														)),
													m.rewardedVideoListener(),
													a &&
														m.mRewardedVideoAd
															.show()
															.then(function () {
																m.mRewardedVideoShown =
																	!0;
															}),
													(s.mRewardedAdScene = t);
											})
									: console.log(
											'\u6fc0\u52b1\u89c6\u9891\u7ec4\u4ef6\u4e0e\u5f53\u524d\u573a\u666f\u9700\u6c42\u4e00\u81f4'
									  );
							} else
								(m.mRewardedVideoAd =
									m.mPlatform.createRewardedVideoAd(
										this.createRewardedAdOption(t)
									)),
									m.rewardedVideoListener(),
									a &&
										m.mRewardedVideoAd
											.show()
											.then(function () {
												m.mRewardedVideoShown = !0;
											}),
									(this.mRewardedAdScene = t);
						}),
						(t.prototype.showRewardedVideoAD = function (
							t,
							e,
							o,
							n,
							i
						) {
							if (
								(void 0 === o && (o = null),
								void 0 === n && (n = null),
								void 0 === i && (i = null),
								o)
							)
								this.mRewardedADCB_IsEnded = o;
							else if (!this.mRewardedADCB_IsEnded)
								throw (
									'\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u7684\u56de\u8c03\u51fd\u6570IsEnded\u672a\u6307\u5b9a\uff0c\u573a\u666f\u4ee3\u7801\u4e3a' +
									this.mRewardedAdType +
									'-' +
									t
								);
							if (n) this.mRewardedADCB_NotEnded = n;
							else if (!this.mRewardedADCB_NotEnded)
								throw (
									'\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u7684\u56de\u8c03\u51fd\u6570NotEnded\u672a\u6307\u5b9a\uff0c\u573a\u666f\u4ee3\u7801\u4e3a' +
									this.mRewardedAdType +
									'-' +
									t
								);
							if (i) this.mRewardedADCB_Max = i;
							else if (!this.mRewardedADCB_Max)
								throw (
									'\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u7684\u56de\u8c03\u51fd\u6570Max\u672a\u6307\u5b9a\uff0c\u573a\u666f\u4ee3\u7801\u4e3a' +
									this.mRewardedAdType +
									'-' +
									t
								);
							if (e) this.mNode_Scene = e;
							else if (this.mNode_Scene)
								throw (
									'\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u7684\u6d88\u606f\u6e90\u7ec4\u4ef6\u672a\u6307\u5b9a\uff0c\u573a\u666f\u4ee3\u7801\u4e3a' +
									this.mRewardedAdType +
									'-' +
									t
								);
							if (
								((this.mLastTime_InterstitialAd =
									new Date().valueOf()),
								'devtools' == this.mSystemInfo.appName)
							)
								return (
									console.log(
										'\u5b57\u8282\u5f00\u53d1\u73af\u5883,\u76f4\u63a5\u83b7\u53d6\u5956\u52b1'
									),
									void this.mRewardedADCB_IsEnded(t, 1)
								);
							(this.mRewardedVideoShown = !1),
								(this.mRewardedAdType = t);
							var r = this;
							this.mRewardedVideoAd
								? this.mRewardedVideoAd
										.show()
										.then(function () {
											r.mRewardedVideoShown = !0;
										})
								: this.mNode_Scene.dispatchEvent(
										new s.EvtShowToast(
											'\u5e7f\u544a\u7ec4\u4ef6\u5f02\u5e38\uff0c\u65e0\u6cd5\u83b7\u5f97\u5e7f\u544a\u5956\u52b1'
										)
								  );
						}),
						(t.prototype.showInterstitialAd = function () {
							if ('devtools' == this.mSystemInfo.appName)
								console.log(
									'\u5f53\u524d\u5bbf\u4e3b\u73af\u5883\u4e3a\u5b57\u8282\u8df3\u52a8\u5f00\u53d1\u8005\u5de5\u5177'
								);
							else if (
								(new Date().valueOf() -
									this.mLastTime_InterstitialAd) /
									1e3 >
								60
							) {
								var t = this,
									e = !0;
								this.mInterstitialAd
									? this.mInterstitialAd.load()
									: (c.Comm.mPlatform.mPlatformUtil.isWeChat()
											? (this.mInterstitialAd =
													this.mPlatform.createInterstitialAd(
														{
															adUnitId:
																c.GameConfig
																	.adUnitId_Interstitial_WX
														}
													))
											: (this.mInterstitialAd =
													this.mPlatform.createInterstitialAd(
														{
															adUnitId:
																c.GameConfig
																	.adUnitId_Interstitial_DY
														}
													)),
									  this.mInterstitialAd.onLoad(function () {
											t.mInterstitialAd
												.show()
												.then(function () {
													(t.mIsInterstitialShowing =
														!0),
														(t.mLastTime_InterstitialAd =
															new Date().valueOf());
												});
									  }),
									  this.mInterstitialAd.onClose(function () {
											t.mInterstitialAd &&
												(t.mInterstitialAd.destroy(),
												(t.mIsInterstitialShowing = !1),
												(t.mInterstitialAd = null));
									  }),
									  this.mInterstitialAd.onError(function () {
											e &&
												t.mInterstitialAd &&
												(t.mInterstitialAd.load(),
												(e = !1));
									  }));
							}
						}),
						(t.prototype.hideInterstitialAd = function () {
							this.mIsInterstitialShowing &&
								this.mInterstitialAd &&
								(console.log(
									'\u9500\u6bc1\u63d2\u5c4f\u5e7f\u544a'
								),
								(this.mLastTime_InterstitialAd =
									new Date().valueOf()),
								this.mInterstitialAd.destroy(),
								(this.mInterstitialAd = null));
						}),
						(t.prototype.cfgOpenDataContext = function () {
							console.log(this.mOpenDataContext),
								this.mOpenDataContext &&
									this.mOpenDataContext.postMessage(
										'OpenDataContext Ready'
									);
						}),
						(t.prototype.initDataInOpenDataContext = function () {
							this.mOpenDataContext &&
								this.mOpenDataContext.postMessage(
									l.generateMsg(a.EMT_Init)
								);
						}),
						(t.prototype.login = function () {}),
						(t.prototype.authorize = function () {}),
						(t.prototype.updateFailDialog = function () {
							this.mOpenDataContext &&
								this.mOpenDataContext.postMessage(
									l.generateMsg(a.EMT_ShowMsgInFail, 0)
								);
						}),
						(t.prototype.updateRank_Integral = function (t, e) {
							void 0 === e && (e = !0),
								this.mOpenDataContext &&
									this.mOpenDataContext.postMessage(
										l.generateMsg(
											e
												? a.EMT_Integral_Jia
												: a.EMT_Integral_Jian,
											t
										)
									);
						}),
						(t.prototype.devideInfo = function () {
							var t = new m();
							return (
								(t.width = c.GameConfig.DESIGN_WINDOW_WIDTH),
								(t.height = c.GameConfig.DESIGN_WINDOW_HEIGHT),
								(t.pixelRatio = 1),
								(t.safAreaTop = 0),
								t
							);
						}),
						(t.prototype.safeAreaTop = function () {
							return 0;
						}),
						(t.prototype.menuTop = function () {
							return 20;
						}),
						(t.prototype.shareWhileByteDance = function (
							t,
							e,
							o,
							n
						) {
							void 0 === n && (n = !1);
						}),
						(t.prototype.shareWhileWeChat = function () {}),
						(t.prototype.playEffectMove = function () {
							c.Comm.getInstance().mSoundManager.playEffectMoveByEngine();
						}),
						(t.prototype.playEffectPair = function () {
							c.Comm.getInstance().mSoundManager.playEffectPairByEngine();
						}),
						(t.prototype.setupVolume = function (t, e) {
							null != t && cc.audioEngine.setEffectsVolume(t),
								null != e && cc.audioEngine.setMusicVolume(e);
						}),
						(t.prototype.actionRecording = function (t, e, o) {
							void 0 === o && (o = !1);
						}),
						(t.prototype.startRecorder = function () {}),
						(t.prototype.pauseRecorder = function () {}),
						(t.prototype.resumeRecorder = function () {}),
						(t.prototype.stopRecorder = function () {}),
						(t.prototype.isWeChat = function () {
							return !1;
						}),
						(t.prototype.isDouyinOrLite = function (t) {
							return void 0 === t && (t = !0), !1;
						}),
						(t.prototype.checkGuanzhuWhileDouyin = function () {}),
						(t.prototype.guanzhuWhileDouyin = function () {}),
						(t.prototype.isIOS = function () {
							return !1;
						}),
						t
					);
				})();
				(o.GeneralInterface = p), cc._RF.pop();
			},
			{ './Comm': 'Comm', './MyEvent': 'MyEvent', './typeof': 'typeof' }
		],
		PlatformMananger: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '1a79917EnpMM5hmybAAg2Z/', 'PlatformMananger'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.GeneralPlatform = o.EPlatform = void 0);
				var n = t('./ENVByteDance'),
					i = t('./StorageByteDance');
				t('./DevStorage'), t('./ENDevelopment');
				var r,
					a = t('./EvCommon'),
					c = t('./EvCommon2'),
					s = t('./ENVWeChat'),
					m = t('./StorageWeChat'),
					l = t('./ENWindows');
				((r = o.EPlatform || (o.EPlatform = {}))[
					(r.EP_Development = 0)
				] = 'EP_Development'),
					(r[(r.EP_PC = 1)] = 'EP_PC'),
					(r[(r.EP_WX = 2)] = 'EP_WX'),
					(r[(r.EP_DY = 3)] = 'EP_DY'),
					(o.GeneralPlatform = function () {
						switch (
							(console.log(
								'\u6267\u884c\u8fd0\u884c\u73af\u5883\u68c0\u6d4b\uff01',
								cc.sys.platform
							),
							cc.sys.platform)
						) {
							case cc.sys.WECHAT_GAME:
								console.log('\u5fae\u4fe1\u5e73\u53f0'),
									(this.mStorageUtil = new m.StorageWeChat()),
									(this.mPlatformUtil = new s.ENVWeChat());
								break;
							case cc.sys.BYTEDANCE_GAME:
								console.log(
									'\u5b57\u8282\u7cfb\u5e73\u53f0-\u521b\u5efa\u5b57\u8282\u7cfb\u5b58\u50a8\u5de5\u5177\u548c\u73af\u5883\u5de5\u5177'
								),
									(this.mStorageUtil =
										new i.StorageByteDance()),
									(this.mPlatformUtil = new n.ENVByteDance());
								break;
							case cc.sys.WIN32:
								console.log(
									'PC-\u521b\u5efaWIN32\u5b58\u50a8\u5de5\u5177\u548c\u73af\u5883\u5de5\u5177'
								),
									(this.mPlatformUtil = new l.ENWindows());
								break;
							default:
								console.log(
									'\u901a\u7528\u5e73\u53f0-\u521b\u5efa\u901a\u7528\u5e73\u53f0\u5b58\u50a8\u5de5\u5177\u548c\u73af\u5883\u5de5\u5177'
								),
									(this.mStorageUtil = new a.CommonStorage()),
									(window.mStorageUtil = this.mStorageUtil),
									(this.mPlatformUtil = new c.EvCommon2());
						}
					}),
					cc._RF.pop();
			},
			{
				'./DevStorage': 'DevStorage',
				'./ENDevelopment': 'ENDevelopment',
				'./ENVByteDance': 'ENVByteDance',
				'./ENVWeChat': 'ENVWeChat',
				'./ENWindows': 'ENWindows',
				'./EvCommon': 'EvCommon',
				'./EvCommon2': 'EvCommon2',
				'./StorageByteDance': 'StorageByteDance',
				'./StorageWeChat': 'StorageWeChat',
				'./typeof': 'typeof'
			}
		],
		RankingItem_Routine: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(
					e,
					'6173bzie5JBwbWQmDOxYJQk',
					'RankingItem_Routine'
				);
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass,
					m = c.property,
					l = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mSpt_HeaderPic = null),
								(e.mLab_No = null),
								(e.mLab_Name = null),
								(e.mLab_Score = null),
								(e.mSF_HeadNone = null),
								(e.mId = 1),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.init = function (t, e) {
								if (
									((this.mLab_No.string = t.toString()),
									null != e)
								) {
									(this.mLab_Name.string = e.NickName),
										(this.mLab_Score.string =
											e.HighestScore.toString());
									var o = this;
									cc.assetManager.loadRemote(
										e.AvatarUrl,
										function (t, e) {
											o.mSpt_HeaderPic.spriteFrame =
												null == t && null == t
													? new cc.SpriteFrame(e)
													: o.mSF_HeadNone;
										}
									);
								}
							}),
							(e.prototype.start = function () {}),
							a(
								[m(cc.Sprite)],
								e.prototype,
								'mSpt_HeaderPic',
								void 0
							),
							a([m(cc.Label)], e.prototype, 'mLab_No', void 0),
							a([m(cc.Label)], e.prototype, 'mLab_Name', void 0),
							a([m(cc.Label)], e.prototype, 'mLab_Score', void 0),
							a(
								[m(cc.SpriteFrame)],
								e.prototype,
								'mSF_HeadNone',
								void 0
							),
							a([s], e)
						);
					})(cc.Component);
				(o.default = l), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		RankingSrc: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '3e7e8lUwFhNsofz28RCAH+T', 'RankingSrc');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass,
					m = c.property,
					l = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mCompIconRankingId = null),
								(e.mCompTextRankingId = null),
								(e.mCompHeaderBox = null),
								(e.mCompName = null),
								(e.mCompScore = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.start = function () {}),
							a(
								[m(cc.Sprite)],
								e.prototype,
								'mCompIconRankingId',
								void 0
							),
							a(
								[m(cc.Label)],
								e.prototype,
								'mCompTextRankingId',
								void 0
							),
							a(
								[m(cc.Node)],
								e.prototype,
								'mCompHeaderBox',
								void 0
							),
							a([m(cc.Label)], e.prototype, 'mCompName', void 0),
							a([m(cc.Label)], e.prototype, 'mCompScore', void 0),
							a([s], e)
						);
					})(cc.Component);
				(o.default = l), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		Recorder: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '0c703m8aAFIFbjAl04QaxTW', 'Recorder'),
					t('./typeof'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.default = function () {}),
					cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		RewardOptions: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '2b898kgFgtDaIXU38mqdGmY', 'RewardOptions');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./MotionEfffectManager'),
					m = t('./MyEnums'),
					l = t('./MyEvent'),
					p = t('./PlatformGeneralInterface'),
					u = cc._decorator,
					d = u.ccclass,
					h = u.property,
					f = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mLab_Describe = null),
								(e.mSp_Type = null),
								(e.mSp_State = null),
								(e.mNode_Video = null),
								(e.mSPF_Receive = null),
								(e.mSPF_Received = null),
								(e.mNode_MotionTo = null),
								(e.mIsFree = !0),
								(e.mReceived = !1),
								(e.mIsClicking = !1),
								(e.mRewardType = m.ERewardType.EReward_None),
								(e.mRewardCount = 0),
								(e.mAct_CompState_Click = null),
								(e.mAct_CompVideo_Click = null),
								(e.mAct_StateReceiving = null),
								(e.mAct_SwitchState = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.continueStateReceiving = function () {
								this.mAct_StateReceiving.start();
							}),
							(e.prototype.isReceived = function () {
								return this.mReceived;
							}),
							(e.prototype.init = function (t, e, o, n) {
								void 0 === n && (n = !1),
									(this.mRewardType = t),
									(this.mRewardCount = e),
									(this.mSp_Type.spriteFrame = o),
									c.Comm.mPlatform.mPlatformUtil.isWeChat()
										? ((this.mNode_Video.active = !1),
										  (this.mSp_State.node.active = !1))
										: ((this.mIsFree = n),
										  (this.mReceived = !1),
										  (this.mNode_Video.active =
												!this.mIsFree),
										  (this.mSp_State.spriteFrame =
												this.mSPF_Receive));
								var i = '???';
								switch (t) {
									case m.ERewardType.EReward_Energy:
										(this.mSp_Type.node.scale = 1.2),
											(i = 'Energy');
										break;
									case m.ERewardType.EReward_Refresh:
										i = 'Shuffle';
										break;
									case m.ERewardType.EReward_Tip:
										i = 'Tip';
								}
								(this.mLab_Describe.string = i + 'x' + e),
									this.mAct_StateReceiving.start();
							}),
							(e.prototype.reset = function () {
								(this.mReceived = !1),
									(this.mSp_Type.node.scale = 1),
									(this.mSp_Type.spriteFrame = null),
									(this.mSp_State.spriteFrame =
										this.mSPF_Receive),
									(this.mRewardType =
										m.ERewardType.EReward_None),
									(this.mLab_Describe.node.active = !0),
									(this.mSp_Type.node.active = !0),
									(this.mSp_State.node.active = !0),
									(this.mNode_Video.scale = 1),
									(this.mSp_State.node.scale = 1),
									(this.mNode_Video.active = !1),
									this.mAct_CompState_Click.stop(),
									this.mAct_CompVideo_Click.stop(),
									this.mAct_StateReceiving.stop(),
									this.mAct_SwitchState.stop();
							}),
							(e.prototype.receiveReward = function () {
								if (!this.mReceived) {
									this.mAct_CompState_Click.stop(),
										this.mAct_CompVideo_Click.stop(),
										this.mAct_SwitchState.start();
									var t = this;
									switch (this.mRewardType) {
										case m.ERewardType.EReward_Energy:
											this.node.dispatchEvent(
												new l.EvtMotionEffect(
													s.EMotionType.EMT_Energy,
													new s.MotionInstance(
														this.mSp_Type.node,
														cc.v2(
															this.mSp_Type.node
																.scaleX,
															this.mSp_Type.node
																.scaleY
														)
													),
													new s.MotionInstance(
														this.mNode_MotionTo
													),
													function () {
														(t.mReceived = !0),
															c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseEnergy();
													}
												)
											);
											break;
										case m.ERewardType.EReward_Tip:
											(this.mReceived = !0),
												cc
													.tween(this.mNode_Video)
													.to(0.2, { scale: 0 })
													.start(),
												this.node.dispatchEvent(
													new l.EvtMotionEffect(
														s.EMotionType.EMT_PropTip_1,
														new s.MotionInstance(
															t.mSp_Type.node
														),
														new s.MotionInstance(
															t.mNode_MotionTo
														),
														function () {
															c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseSearch(
																1
															),
																t.node.dispatchEvent(
																	new l.EvtUpdateProp(
																		m.EPropType.EProp_Search
																	)
																);
														}
													)
												),
												this.mRewardCount > 1 &&
													this.scheduleOnce(
														function () {
															t.node.dispatchEvent(
																new l.EvtMotionEffect(
																	s.EMotionType.EMT_PropTip_2,
																	new s.MotionInstance(
																		t.mSp_Type.node
																	),
																	new s.MotionInstance(
																		t.mNode_MotionTo
																	),
																	function () {
																		c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseSearch(
																			1
																		),
																			t.node.dispatchEvent(
																				new l.EvtUpdateProp(
																					m.EPropType.EProp_Search
																				)
																			);
																	}
																)
															);
														},
														0.2
													);
											break;
										case m.ERewardType.EReward_Refresh:
											cc
												.tween(t.mNode_Video)
												.to(0.2, { scale: 0 })
												.start(),
												this.node.dispatchEvent(
													new l.EvtMotionEffect(
														s.EMotionType.EMT_PropRefresh,
														new s.MotionInstance(
															t.mSp_Type.node
														),
														new s.MotionInstance(
															t.mNode_MotionTo
														),
														function () {
															(t.mReceived = !0),
																c.Comm.mPlatform.mStorageUtil.mUserInfo.increaseRefresh(
																	t.mRewardCount
																),
																t.node.dispatchEvent(
																	new l.EvtUpdateProp(
																		m.EPropType.EProp_Refresh
																	)
																);
														}
													)
												);
									}
								}
							}),
							(e.prototype.onClick = function (t) {
								var e = this;
								if (
									(t.stopPropagation(),
									!c.Comm.mPlatform.mPlatformUtil.isWeChat() &&
										!this.mReceived &&
										!this.mIsClicking)
								)
									if (
										(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
										(this.mIsClicking = !0),
										this.scheduleOnce(function () {
											e.mIsClicking = !1;
										}, 0.5),
										this.mAct_StateReceiving.stop(),
										this.mIsFree)
									)
										this.receiveReward();
									else {
										this.mAct_CompState_Click.start(),
											this.mAct_CompVideo_Click.start();
										var o =
												this.mRewardType ==
												m.ERewardType.EReward_Tip
													? p.ERewardedAdType.ERAT_Tip
													: p.ERewardedAdType
															.ERAT_Shuffle,
											n = this;
										c.Comm.mPlatform.mPlatformUtil.showRewardedVideoAD(
											o,
											this.node,
											function (t) {
												if (o != t)
													throw (
														'RewardOptions \u8c03\u7528showRewardedVideoAD,\u56de\u8c03\u51fd\u6570\u8fd4\u56de\u503c\uff1a' +
														o +
														'!=' +
														t
													);
												n.receiveReward();
											},
											null,
											null
										);
									}
							}),
							(e.prototype.onLoad = function () {
								var t = this;
								(this.mAct_StateReceiving = cc
									.tween(this.mSp_State.node)
									.to(0.5, { scale: 1.15 })
									.to(0.5, { scale: 1 })),
									this.mAct_StateReceiving.call(function () {
										t.mAct_StateReceiving.start();
									}),
									(this.mAct_SwitchState = cc
										.tween(this.mSp_State.node)
										.to(0.2, { scale: 0 })
										.delay(0.1)
										.call(function () {
											t.mSp_State.spriteFrame =
												t.mSPF_Received;
										})
										.to(0.2, { scale: 1 })),
									(this.mAct_CompState_Click = cc
										.tween(this.mSp_State.node)
										.to(0.1, { scale: 0.8 })
										.to(0.1, { scale: 1 })),
									(this.mAct_CompVideo_Click = cc
										.tween(this.mNode_Video)
										.to(0.1, { scale: 0.8 })
										.to(0.1, { scale: 1 })),
									this.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onClick,
										this
									);
							}),
							(e.prototype.start = function () {}),
							a(
								[h(cc.Label)],
								e.prototype,
								'mLab_Describe',
								void 0
							),
							a([h(cc.Sprite)], e.prototype, 'mSp_Type', void 0),
							a([h(cc.Sprite)], e.prototype, 'mSp_State', void 0),
							a([h(cc.Node)], e.prototype, 'mNode_Video', void 0),
							a(
								[h(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Receive',
								void 0
							),
							a(
								[h(cc.SpriteFrame)],
								e.prototype,
								'mSPF_Received',
								void 0
							),
							a(
								[h(cc.Node)],
								e.prototype,
								'mNode_MotionTo',
								void 0
							),
							a([d], e)
						);
					})(cc.Component);
				(o.default = f), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./MotionEfffectManager': 'MotionEfffectManager',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PlatformGeneralInterface': 'PlatformGeneralInterface',
				'./typeof': 'typeof'
			}
		],
		SceneGame: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '9e651VwxGNOQKRLo+4i5LL3', 'SceneGame');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.FrameEvent = o.EFrame = void 0);
				var c,
					s = t('./Comm'),
					m = t('./DialogMessage'),
					l = t('./DialogRestorByShare'),
					p = t('./DialogRestoreEnergy'),
					u = t('./FrameLoading'),
					d = t('./FrameGame'),
					h = t('./FrameShuffling'),
					f = t('./MotionEfffectManager'),
					_ = t('./MyEnums'),
					y = t('./MyEvent'),
					g = t('./PageLoading'),
					E = t('./Toast'),
					v = cc._decorator,
					C = v.ccclass,
					S = v.property;
				((c = o.EFrame || (o.EFrame = {}))[(c.EHome = 0)] = 'EHome'),
					(c[(c.EArena = 1)] = 'EArena'),
					(c[(c.ESelectMode = 2)] = 'ESelectMode'),
					(c[(c.EGame = 3)] = 'EGame');
				var T = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						r(e, t),
						(e.getFrameType = function () {
							return '';
						}),
						e
					);
				})(cc.Event);
				o.FrameEvent = T;
				var P = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mFrame_Home = null),
							(e.mFrame_Game = null),
							(e.mSrc_DialogRestoreEnergy = null),
							(e.mSrc_DialogRestoreByShare = null),
							(e.mSrc_PageLoading = null),
							(e.mSrc_Loading = null),
							(e.mSrc_Shuffling = null),
							(e.mSrc_Motion = null),
							(e.mSrc_DialogMsg = null),
							(e.mSrc_Toast = null),
							(e.mSrc_Game = null),
							(e.loadingWhileNew = !1),
							(e.mRewardedMax = !1),
							e
						);
					}
					return (
						r(e, t),
						(e.prototype.onShowWarningMsg = function (t) {
							t.stopPropagation(),
								this.mSrc_DialogMsg.showDialog(
									t.mMsg,
									t.mUseIcon,
									t.mText_indent,
									t.mCb_submit,
									t.mCb_cancel,
									t.mCb_this
								);
						}),
						(e.prototype.onShowToast = function (t) {
							t.stopPropagation(),
								this.mSrc_Toast.show(
									t.mTitle,
									t.mDuration,
									t.mShowInMiddle,
									t.mIsFadeIn
								);
						}),
						(e.prototype.onMotionEvent = function (t) {
							t.stopPropagation(),
								this.mSrc_Motion.startMotion(
									t.mFrom,
									t.mTo,
									t.mEMT,
									t.mCallback
								);
						}),
						(e.prototype.onRestoreEnergy = function (t) {
							t.stopPropagation(),
								this.mSrc_DialogRestoreEnergy.showDialog(
									t.mFromHome
								);
						}),
						(e.prototype.onShareForWeChat = function (t) {
							t.stopPropagation(),
								this.mSrc_DialogRestoreByShare.showDialog(
									t.mErat,
									t.mTag
								);
						}),
						(e.prototype.onLoadingEnd = function (t) {
							if (
								(t.stopPropagation(),
								(this.mSrc_Game = this.mFrame_Game.getComponent(
									d.default
								)),
								null == this.mSrc_Game)
							)
								throw 'Node Frame_Game\u672a\u6302\u8f7d\u811a\u672c';
							s.Comm.mPlatform.mStorageUtil.isNew()
								? ((this.loadingWhileNew = !0),
								  (this.mSrc_Shuffling.node.active = !0))
								: (this.mFrame_Home.active = !0);
						}),
						(e.prototype.onLoad = function () {
							if (
								((this.mFrame_Home.active = !1),
								(this.mFrame_Game.active = !1),
								(this.mSrc_Loading.node.active = !1),
								(this.mSrc_Shuffling.node.active = !1),
								(this.mSrc_DialogMsg.node.parent.active = !1),
								(this.mSrc_DialogRestoreEnergy.node.active =
									!1),
								(this.mSrc_DialogRestoreByShare.node.active =
									!1),
								(this.mSrc_Toast.node.active = !1),
								(this.mSrc_PageLoading.node.active = !1),
								!s.Comm.mPlatform.mPlatformUtil.isWeChat())
							) {
								s.Comm.mPlatform.mPlatformUtil.cfgOpenDataContext(),
									s.Comm.mPlatform.mStorageUtil.extractCachedData(),
									s.Comm.mPlatform.mPlatformUtil.initializationUtil(),
									s.Comm.getInstance().preloadResources();
								var t =
									s.Comm.mPlatform.mStorageUtil.mUserInfo.extractIntegralVal();
								t > 0 &&
									this.scheduleOnce(function () {
										s.Comm.mPlatform.mPlatformUtil.updateRank_Integral(
											t,
											!0
										);
									}, 0.2);
							}
							this.node.on(
								y.EvtMotionEffect.EVENT_TYPE,
								this.onMotionEvent,
								this
							),
								this.node.on(
									y.EvtStartGame.EVENT_TYPE,
									this.onStartGame,
									this
								),
								this.node.on(
									y.EvtDispatchLoading.EVENT_TYPE,
									this.onLoading,
									this
								),
								this.node.on(
									y.EvtShuffling.EVENT_TYPE,
									this.onShuffling,
									this
								),
								this.node.on(
									y.EvtWarningMsg.EVENT_TYPE,
									this.onShowWarningMsg,
									this
								),
								this.node.on(
									y.EvtRestoreEnergy.EVENT_TYPE,
									this.onRestoreEnergy,
									this
								),
								this.node.on(
									y.EvtShareInWeChat.EVENT_TYPE,
									this.onShareForWeChat,
									this
								),
								this.node.on(
									y.EvtShowToast.EVENT_TYPE,
									this.onShowToast,
									this
								),
								this.node.on(
									y.EvtLoadingPageEnd.EVENT_TYPE,
									this.onLoadingEnd,
									this
								);
						}),
						(e.prototype.onEnable = function () {
							if (s.Comm.mPlatform.mPlatformUtil.isWeChat())
								this.mSrc_PageLoading.node.active = !0;
							else {
								if (
									((this.mSrc_Game =
										this.mFrame_Game.getComponent(
											d.default
										)),
									null == this.mSrc_Game)
								)
									throw 'Node Frame_Game\u672a\u6302\u8f7d\u811a\u672c';
								s.Comm.mPlatform.mStorageUtil.isNew()
									? ((this.loadingWhileNew = !0),
									  (this.mSrc_Shuffling.node.active = !0))
									: (this.mFrame_Home.active = !0),
									this.mSrc_Game.init(),
									this.mSrc_Loading.init();
							}
						}),
						(e.prototype.start = function () {}),
						(e.prototype.onStartGame = function (t) {
							t.stopPropagation(),
								this.mSrc_Game.cfgGame(t.mEGameType);
						}),
						(e.prototype.onShuffling = function (t) {
							t.stopPropagation(),
								(this.mSrc_Shuffling.node.active =
									t.mShuffling);
						}),
						(e.prototype.onLoading = function (t) {
							t.stopPropagation(),
								t.mCompleted
									? this.mSrc_Loading.node.active &&
									  (t.mCallbackWhileCompleted
											? this.mSrc_Loading.complecte(
													t.mCallbackWhileCompleted
											  )
											: this.mSrc_Loading.complecte(
													function () {}
											  ))
									: this.mSrc_Loading.showLoading(
											t.mDescribe
									  );
						}),
						(e.prototype.update = function () {
							this.loadingWhileNew &&
								s.Comm.getInstance().SpriteAtlasReady() &&
								(this.mSrc_Game.cfgGame(
									_.EGameType.EPractice,
									!0
								),
								(this.loadingWhileNew = !1));
						}),
						a([S(cc.Node)], e.prototype, 'mFrame_Home', void 0),
						a([S(cc.Node)], e.prototype, 'mFrame_Game', void 0),
						a(
							[S({ type: p.default })],
							e.prototype,
							'mSrc_DialogRestoreEnergy',
							void 0
						),
						a(
							[S({ type: l.default })],
							e.prototype,
							'mSrc_DialogRestoreByShare',
							void 0
						),
						a(
							[S({ type: g.default })],
							e.prototype,
							'mSrc_PageLoading',
							void 0
						),
						a(
							[S({ type: u.default })],
							e.prototype,
							'mSrc_Loading',
							void 0
						),
						a(
							[S({ type: h.default })],
							e.prototype,
							'mSrc_Shuffling',
							void 0
						),
						a(
							[S({ type: f.default })],
							e.prototype,
							'mSrc_Motion',
							void 0
						),
						a(
							[S({ type: m.default })],
							e.prototype,
							'mSrc_DialogMsg',
							void 0
						),
						a(
							[S({ type: E.default })],
							e.prototype,
							'mSrc_Toast',
							void 0
						),
						a([C], e)
					);
				})(cc.Component);
				(o.default = P), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./DialogMessage': 'DialogMessage',
				'./DialogRestorByShare': 'DialogRestorByShare',
				'./DialogRestoreEnergy': 'DialogRestoreEnergy',
				'./FrameGame': 'FrameGame',
				'./FrameLoading': 'FrameLoading',
				'./FrameShuffling': 'FrameShuffling',
				'./MotionEfffectManager': 'MotionEfffectManager',
				'./MyEnums': 'MyEnums',
				'./MyEvent': 'MyEvent',
				'./PageLoading': 'PageLoading',
				'./Toast': 'Toast',
				'./typeof': 'typeof'
			}
		],
		ScoreIndicator: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '99f5auWWNJAzLRG9QVc/r7n', 'ScoreIndicator');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./ExtraIntegral'),
					m = t('./FrameGame'),
					l = t('./MyEnums'),
					p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mLab_Score = null),
								(e.mNode_Icon = null),
								(e.mSpt_Progress_1 = null),
								(e.mSpt_Progress_2 = null),
								(e.mSrc_Integral_1 = null),
								(e.mSrc_Integral_2 = null),
								(e.mSrc_Integral_3 = null),
								(e.mSrc_Integral_4 = null),
								(e.mScore = 0),
								(e.mCountIdx_Progress = 0),
								(e.mTotalScoreList = []),
								(e.mReachedList = [!1, !1, !1, !1]),
								(e.mExtraIntegrals = []),
								(e.mColors = [
									cc.color(255, 255, 255, 255),
									cc.color(155, 255, 213, 255),
									cc.color(255, 66, 66, 255)
								]),
								e
							);
						}
						var o;
						return (
							r(e, t),
							(o = e),
							(e.prototype.totalScore = function () {
								return this.mScore;
							}),
							(e.prototype.init = function () {
								(this.mScore = 0),
									(this.mCountIdx_Progress = 0),
									(this.mSpt_Progress_1.fillRange = 0),
									(this.mSpt_Progress_1.node.color =
										this.mColors[0]),
									(this.mSpt_Progress_1.node.zIndex =
										o.ZIdx_Progress_Top),
									(this.mSpt_Progress_2.node.zIndex =
										o.ZIdx_progress_Normal),
									(this.mSpt_Progress_1.node.active = !0),
									(this.mSpt_Progress_2.node.active = !1),
									(this.mSrc_Integral_1.node.active =
										m.default.mGameType !=
										l.EGameType.EPractice),
									(this.mSrc_Integral_2.node.active =
										m.default.mGameType !=
										l.EGameType.EPractice),
									(this.mSrc_Integral_3.node.active =
										m.default.mGameType !=
										l.EGameType.EPractice),
									(this.mSrc_Integral_4.node.active =
										m.default.mGameType !=
										l.EGameType.EPractice),
									(this.mLab_Score.string = '0');
								var t = this.node.width;
								(this.mSrc_Integral_1.node.x = 0.1 * t),
									(this.mSrc_Integral_2.node.x = 0.4 * t),
									(this.mSrc_Integral_3.node.x = 0.7 * t),
									(this.mSrc_Integral_4.node.x = t);
								for (var e = 0; e < 4; e++)
									this.mReachedList[e] = !1;
								this.totalScoreRules(),
									this.setupExtraIntegral();
							}),
							(e.prototype.increaseScore = function (t) {
								(this.mScore += t),
									(this.mLab_Score.string =
										this.mScore.toString());
								for (
									var e, o = 0, n = 0;
									n < this.mCountIdx_Progress;
									n++
								)
									o += this.mTotalScoreList[n];
								if (
									((e =
										(this.mScore - o) /
										this.mTotalScoreList[
											this.mCountIdx_Progress
										]),
									this.mCountIdx_Progress % 2 == 0
										? (this.mSpt_Progress_1.fillRange = e)
										: (this.mSpt_Progress_2.fillRange = e),
									e >= 1 && !this.mReachedList[3])
								) {
									(this.mReachedList[3] = !0),
										m.default.mGameType !=
											l.EGameType.EPractice &&
											this.mSrc_Integral_4.reached(),
										this.mCountIdx_Progress++;
									var i = this;
									this.scheduleOnce(function () {
										i.setupProgress(),
											i.setupExtraIntegral();
									}, 0.5);
								} else
									e >= 0.7 && !this.mReachedList[2]
										? ((this.mReachedList[2] = !0),
										  m.default.mGameType !=
												l.EGameType.EPractice &&
												this.mSrc_Integral_3.reached())
										: e >= 0.4 && !this.mReachedList[1]
										? ((this.mReachedList[1] = !0),
										  m.default.mGameType !=
												l.EGameType.EPractice &&
												this.mSrc_Integral_2.reached())
										: e >= 0.1 &&
										  !this.mReachedList[0] &&
										  ((this.mReachedList[0] = !0),
										  m.default.mGameType !=
												l.EGameType.EPractice &&
												this.mSrc_Integral_1.reached());
							}),
							(e.prototype.setupExtraIntegral = function () {
								for (
									var t = 5, e = 0;
									e < this.mCountIdx_Progress;
									e++
								)
									t *= 4;
								var o = t;
								for (
									e = 0;
									e < this.mExtraIntegrals.length;
									e++
								)
									e > 0 && (o *= 2),
										this.mExtraIntegrals[e].initExtra(o);
							}),
							(e.prototype.setupProgress = function () {
								for (
									var t = 0;
									t < this.mReachedList.length;
									t++
								)
									this.mReachedList[t] = !1;
								1 == this.mCountIdx_Progress &&
									(this.mSpt_Progress_2.node.active = !0),
									this.mCountIdx_Progress % 2 == 0
										? ((this.mSpt_Progress_1.fillRange = 0),
										  (this.mSpt_Progress_1.node.color =
												this.mColors[
													this.mCountIdx_Progress % 3
												]),
										  (this.mSpt_Progress_1.node.zIndex =
												o.ZIdx_Progress_Top),
										  (this.mSpt_Progress_2.node.zIndex =
												o.ZIdx_progress_Normal))
										: ((this.mSpt_Progress_2.fillRange = 0),
										  (this.mSpt_Progress_2.node.color =
												this.mColors[
													this.mCountIdx_Progress % 3
												]),
										  (this.mSpt_Progress_1.node.zIndex =
												o.ZIdx_progress_Normal),
										  (this.mSpt_Progress_2.node.zIndex =
												o.ZIdx_Progress_Top));
							}),
							(e.prototype.totalScoreRules = function () {
								this.mTotalScoreList = [];
								for (var t = 0; t < o.PROGRESS_IDX_MAX; t++) {
									var e;
									(e =
										0 == t
											? c.GameConfig.COLUMN_NUM *
											  c.GameConfig.ROW_NUM_SHORT *
											  3e3
											: c.GameConfig.COLUMN_NUM *
											  c.GameConfig.ROW_NUM_SHORT *
											  3e3 *
											  t *
											  o.RULES_FACTOR),
										this.mTotalScoreList.push(e);
								}
							}),
							(e.prototype.onLoad = function () {
								(this.mLab_Score.node.zIndex = o.ZIdx_Score),
									(this.mNode_Icon.zIndex = o.ZIdx_Icon),
									this.mExtraIntegrals.push(
										this.mSrc_Integral_1
									),
									this.mExtraIntegrals.push(
										this.mSrc_Integral_2
									),
									this.mExtraIntegrals.push(
										this.mSrc_Integral_3
									),
									this.mExtraIntegrals.push(
										this.mSrc_Integral_4
									);
								for (
									var t = 0;
									t < this.mExtraIntegrals.length;
									t++
								)
									this.mExtraIntegrals[t].reset();
							}),
							(e.prototype.start = function () {}),
							(e.ZIdx_Progress_Top = 1),
							(e.ZIdx_progress_Normal = 0),
							(e.ZIdx_Score = 2),
							(e.ZIdx_Icon = 2),
							(e.RULES_FACTOR = 3),
							(e.PROGRESS_IDX_MAX = 9),
							(e.EXTRA_INTEGRAL_BASE = 5),
							a([d(cc.Label)], e.prototype, 'mLab_Score', void 0),
							a([d(cc.Node)], e.prototype, 'mNode_Icon', void 0),
							a(
								[d(cc.Sprite)],
								e.prototype,
								'mSpt_Progress_1',
								void 0
							),
							a(
								[d(cc.Sprite)],
								e.prototype,
								'mSpt_Progress_2',
								void 0
							),
							a(
								[d({ type: s.default })],
								e.prototype,
								'mSrc_Integral_1',
								void 0
							),
							a(
								[d({ type: s.default })],
								e.prototype,
								'mSrc_Integral_2',
								void 0
							),
							a(
								[d({ type: s.default })],
								e.prototype,
								'mSrc_Integral_3',
								void 0
							),
							a(
								[d({ type: s.default })],
								e.prototype,
								'mSrc_Integral_4',
								void 0
							),
							(o = a([u], e))
						);
					})(cc.Component);
				(o.default = h), cc._RF.pop();
			},
			{
				'./Comm': 'Comm',
				'./ExtraIntegral': 'ExtraIntegral',
				'./FrameGame': 'FrameGame',
				'./MyEnums': 'MyEnums',
				'./typeof': 'typeof'
			}
		],
		Score: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '37739ph7YdIbakr/VY/WAts', 'Score');
				var n,
					i,
					r = t('./typeof'),
					a =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					c = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.EScoreType = void 0);
				var s,
					m = cc._decorator,
					l = m.ccclass,
					p = m.property;
				((s = i = o.EScoreType || (o.EScoreType = {}))[
					(s.ESTPair = 0)
				] = 'ESTPair'),
					(s[(s.ESTSuccessiveAddition = 1)] =
						'ESTSuccessiveAddition');
				var u = (function (t) {
					function e() {
						var e =
							(null !== t && t.apply(this, arguments)) || this;
						return (
							(e.mSpt_Describe = null),
							(e.mSpt_Symbot = null),
							(e.mLab_ScoreValue = null),
							e
						);
					}
					return (
						a(e, t),
						(e.prototype.init = function (t, e) {
							return (
								t == i.ESTSuccessiveAddition
									? (this.mSpt_Describe.node.active = !0)
									: (this.mSpt_Describe.node.active = !1),
								(this.mLab_ScoreValue.string = e.toString()),
								this
							);
						}),
						(e.prototype.playAct = function (t, e, o) {
							this.node.setPosition(t.x, t.y),
								(this.node.opacity = 255);
							var n = this,
								i = cc.tween(this.node);
							i.parallel(
								i.to(0.5, { x: e.x, y: e.y }),
								i.to(0.5, { opacity: 0 })
							)
								.call(function () {
									null != o && o.put(n.node);
								})
								.start();
						}),
						(e.prototype.initNumSize = function (t, e, o) {
							o.width = 1 == e ? 15 : 25;
						}),
						(e.prototype.start = function () {}),
						(e.WIDTH_DEFAULT_NUM_ONE = 7.5),
						(e.WIDTH_DEFAULT_NUM_OTH = 11.25),
						c([p(cc.Sprite)], e.prototype, 'mSpt_Describe', void 0),
						c([p(cc.Node)], e.prototype, 'mSpt_Symbot', void 0),
						c(
							[p(cc.Label)],
							e.prototype,
							'mLab_ScoreValue',
							void 0
						),
						c([l], e)
					);
				})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		SoundSetup: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '6107eVG8l9KdYQr1hDKTeJ5', 'SoundSetup');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = cc._decorator,
					m = s.ccclass,
					l = s.property,
					p = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mTgl_Music = null),
								(e.mTgl_Effect = null),
								(e.mBtn_Plus_Music = null),
								(e.mBtn_Reduce_Music = null),
								(e.mBtn_Plus_Effect = null),
								(e.mBtn_Reduce_Effect = null),
								(e.mProgress_Music = null),
								(e.mNode_Bar_Music = null),
								(e.mProgress_Effect = null),
								(e.mNode_Bar_Effect = null),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.enableItem = function (t, e, o, n) {
								(e.active = t),
									(o.enabled = t),
									(n.enabled = t);
							}),
							(e.prototype.onToggleMusic = function () {
								c.Comm.mPlatform.mStorageUtil.mSysCfg.setup(
									null,
									null,
									this.mTgl_Music.isChecked,
									null
								),
									c.Comm.getInstance().mSoundManager.enableBackgoundMusic(
										this.mTgl_Music.isChecked
									),
									this.enableItem(
										this.mTgl_Music.isChecked,
										this.mNode_Bar_Music,
										this.mBtn_Reduce_Music,
										this.mBtn_Plus_Music
									);
							}),
							(e.prototype.onToggleEffect = function () {
								c.Comm.mPlatform.mStorageUtil.mSysCfg.setup(
									null,
									null,
									null,
									this.mTgl_Effect.isChecked
								),
									this.enableItem(
										this.mTgl_Effect.isChecked,
										this.mNode_Bar_Effect,
										this.mBtn_Reduce_Effect,
										this.mBtn_Plus_Effect
									);
							}),
							(e.prototype.onPlusMusic = function (t) {
								if (
									(t.stopPropagation(),
									this.mTgl_Music.isChecked &&
										(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
										!c.Comm.mPlatform.mStorageUtil.mSysCfg.max()))
								) {
									c.Comm.mPlatform.mStorageUtil.mSysCfg.changeVolume();
									var e =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.volumeMusic();
									c.Comm.mPlatform.mPlatformUtil.setupVolume(
										null,
										e
									),
										(this.mProgress_Music.progress = e);
								}
							}),
							(e.prototype.onReduceMusic = function (t) {
								if (
									(t.stopPropagation(),
									this.mTgl_Music.isChecked &&
										(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
										!c.Comm.mPlatform.mStorageUtil.mSysCfg.min()))
								) {
									c.Comm.mPlatform.mStorageUtil.mSysCfg.changeVolume(
										!0,
										!1
									);
									var e =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.volumeMusic();
									c.Comm.mPlatform.mPlatformUtil.setupVolume(
										null,
										e
									),
										(this.mProgress_Music.progress = e);
								}
							}),
							(e.prototype.onPlusEffect = function (t) {
								if (
									(t.stopPropagation(),
									this.mTgl_Effect.isChecked &&
										(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
										!c.Comm.mPlatform.mStorageUtil.mSysCfg.max(
											!1
										)))
								) {
									c.Comm.mPlatform.mStorageUtil.mSysCfg.changeVolume(
										!1
									);
									var e =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.volumeEffect();
									c.Comm.mPlatform.mPlatformUtil.setupVolume(
										e,
										null
									),
										(this.mProgress_Effect.progress = e);
								}
							}),
							(e.prototype.onReduceEffect = function (t) {
								if (
									(t.stopPropagation(),
									this.mTgl_Effect.isChecked &&
										(c.Comm.getInstance().mSoundManager.playEffectBtnClick(),
										!c.Comm.mPlatform.mStorageUtil.mSysCfg.min(
											!1
										)))
								) {
									c.Comm.mPlatform.mStorageUtil.mSysCfg.changeVolume(
										!1,
										!1
									);
									var e =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.volumeEffect();
									c.Comm.mPlatform.mPlatformUtil.setupVolume(
										e,
										null
									),
										(this.mProgress_Effect.progress = e);
								}
							}),
							(e.prototype.onLoad = function () {
								this.mTgl_Music.node.on(
									'toggle',
									this.onToggleMusic,
									this
								),
									this.mTgl_Effect.node.on(
										'toggle',
										this.onToggleEffect,
										this
									),
									this.mBtn_Plus_Music.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onPlusMusic,
										this
									),
									this.mBtn_Reduce_Music.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onReduceMusic,
										this
									),
									this.mBtn_Plus_Effect.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onPlusEffect,
										this
									),
									this.mBtn_Reduce_Effect.node.on(
										cc.Node.EventType.TOUCH_END,
										this.onReduceEffect,
										this
									);
							}),
							(e.prototype.onEnable = function () {
								(this.mTgl_Music.isChecked =
									c.Comm.mPlatform.mStorageUtil.mSysCfg.enabledMusic()),
									(this.mTgl_Effect.isChecked =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.enabledEffect()),
									(this.mProgress_Music.progress =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.volumeMusic()),
									(this.mProgress_Effect.progress =
										c.Comm.mPlatform.mStorageUtil.mSysCfg.volumeEffect()),
									this.enableItem(
										this.mTgl_Music.isChecked,
										this.mNode_Bar_Music,
										this.mBtn_Reduce_Music,
										this.mBtn_Plus_Music
									),
									this.enableItem(
										this.mTgl_Effect.isChecked,
										this.mNode_Bar_Effect,
										this.mBtn_Reduce_Effect,
										this.mBtn_Plus_Effect
									);
							}),
							(e.prototype.start = function () {}),
							a(
								[l(cc.Toggle)],
								e.prototype,
								'mTgl_Music',
								void 0
							),
							a(
								[l(cc.Toggle)],
								e.prototype,
								'mTgl_Effect',
								void 0
							),
							a(
								[l(cc.Button)],
								e.prototype,
								'mBtn_Plus_Music',
								void 0
							),
							a(
								[l(cc.Button)],
								e.prototype,
								'mBtn_Reduce_Music',
								void 0
							),
							a(
								[l(cc.Button)],
								e.prototype,
								'mBtn_Plus_Effect',
								void 0
							),
							a(
								[l(cc.Button)],
								e.prototype,
								'mBtn_Reduce_Effect',
								void 0
							),
							a(
								[l(cc.ProgressBar)],
								e.prototype,
								'mProgress_Music',
								void 0
							),
							a(
								[l(cc.Node)],
								e.prototype,
								'mNode_Bar_Music',
								void 0
							),
							a(
								[l(cc.ProgressBar)],
								e.prototype,
								'mProgress_Effect',
								void 0
							),
							a(
								[l(cc.Node)],
								e.prototype,
								'mNode_Bar_Effect',
								void 0
							),
							a([m], e)
						);
					})(cc.Component);
				(o.default = p), cc._RF.pop();
			},
			{ './Comm': 'Comm', './typeof': 'typeof' }
		],
		StorageByteDance: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '31003eL7UtOz5c2VtOPnemY', 'StorageByteDance'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.StorageByteDance = void 0);
				var r = t('./Storage'),
					a = (function (t) {
						function e() {
							var e = t.call(this) || this;
							return (e.mOpenId = null), e;
						}
						return (
							i(e, t),
							(e.prototype.createPlatform = function () {
								return window.tt;
							}),
							(e.prototype.isErrorEnv = function () {
								throw new Error('Method not implemented.');
							}),
							(e.prototype.share2SpecialFriends = function (t) {
								var e = this.mShareManager.share2Special(t);
								return (
									this.save2Cache(
										r.EStorageType.EST_Cache_SharedFriends
									),
									e
								);
							}),
							(e.prototype.save2Colud = function () {}),
							e
						);
					})(r.default);
				(o.StorageByteDance = a), cc._RF.pop();
			},
			{ './Storage': 'Storage', './typeof': 'typeof' }
		],
		StorageWeChat: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '518bae2qD1BvpkY9eUrVO5d', 'StorageWeChat'),
					t('./typeof');
				var n,
					i =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						});
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.StorageWeChat = void 0);
				var r = (function (t) {
					function e() {
						return (null !== t && t.apply(this, arguments)) || this;
					}
					return (
						i(e, t),
						(e.prototype.createPlatform = function () {
							return window.wx;
						}),
						(e.prototype.isErrorEnv = function () {
							throw new Error('Method not implemented.');
						}),
						(e.prototype.save2Colud = function () {}),
						e
					);
				})(t('./Storage').default);
				(o.StorageWeChat = r), cc._RF.pop();
			},
			{ './Storage': 'Storage', './typeof': 'typeof' }
		],
		Storage: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '21eb96yW89I77Wr5jneRjv2', 'Storage'),
					Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.EStorageType =
						o.ShareCacheManager =
						o.StatusManager =
						o.SystemConfig =
							void 0);
				var n = t('./Comm'),
					i = t('./Datas'),
					r = (function () {
						function t() {
							(this.mValuesChanged = !1),
								(this.mIsEnabledMusic = !0),
								(this.mIsEnabledEffect = !0),
								(this.mVolumeMusic = 1),
								(this.mVolumeEffect = 5);
						}
						return (
							(t.prototype.initByCache = function (e) {
								null != e.MusicEnabled &&
									null != e.EffectEnabled &&
									null != e.MusicVolume &&
									null != e.EffectVolume &&
									((this.mIsEnabledMusic =
										1 == e.MusicEnabled),
									(this.mIsEnabledEffect =
										1 == e.EffectEnabled),
									(this.mVolumeMusic = e.MusicVolume),
									(this.mVolumeEffect = e.EffectVolume),
									n.Comm.mPlatform.mPlatformUtil.setupVolume(
										this.mVolumeEffect / t.MaxVolume,
										this.mVolumeMusic / t.MaxVolume
									));
							}),
							(t.prototype.generateCache = function () {
								return {
									MusicEnabled: this.mIsEnabledMusic ? 1 : 0,
									EffectEnabled: this.mIsEnabledEffect
										? 1
										: 0,
									MusicVolume: this.mVolumeMusic,
									EffectVolume: this.mVolumeEffect
								};
							}),
							(t.prototype.setup = function (t, e, o, n) {
								null != o && (this.mIsEnabledMusic = o),
									null != n && (this.mIsEnabledEffect = n),
									null != t && (this.mVolumeMusic = t),
									null != e && (this.mVolumeEffect = e);
							}),
							(t.prototype.max = function (e) {
								return (
									void 0 === e && (e = !0),
									e
										? !(this.mVolumeMusic < t.MaxVolume)
										: !(this.mVolumeEffect < t.MaxVolume)
								);
							}),
							(t.prototype.min = function (t) {
								return (
									void 0 === t && (t = !0),
									t
										? !(this.mVolumeMusic > 0)
										: !(this.mVolumeEffect > 0)
								);
							}),
							(t.prototype.changeVolume = function (t, e) {
								void 0 === t && (t = !0),
									void 0 === e && (e = !0);
								var o = e ? 1 : -1;
								t
									? (this.mVolumeMusic += o)
									: (this.mVolumeEffect += o);
							}),
							(t.prototype.enabledMusic = function () {
								return this.mIsEnabledMusic;
							}),
							(t.prototype.enabledEffect = function () {
								return this.mIsEnabledEffect;
							}),
							(t.prototype.volumeMusic = function () {
								return this.mVolumeMusic / t.MaxVolume;
							}),
							(t.prototype.volumeEffect = function () {
								return this.mVolumeEffect / t.MaxVolume;
							}),
							(t.MaxVolume = 10),
							t
						);
					})();
				o.SystemConfig = r;
				var a,
					c = (function () {
						function t() {
							(this.mStatus_GuanzhuReward = !1),
								(this.mStatus_GuanzhuReward = !1);
						}
						return (
							(t.prototype.initByJson = function (t) {
								t &&
									t.GuanzhuReward &&
									(0 == t.GuanzhuReward ||
									0 == t.GuanzhuReward
										? (this.mStatus_GuanzhuReward = !1)
										: (this.mStatus_GuanzhuReward = !0));
							}),
							(t.prototype.generateCacheDate = function () {
								return {
									GuanzhuReward: this.mStatus_GuanzhuReward
										? 1
										: 0
								};
							}),
							(t.prototype.setupGuanzhu = function () {
								this.mStatus_GuanzhuReward = !0;
							}),
							(t.prototype.checkGuanzhuReward = function () {
								return this.mStatus_GuanzhuReward;
							}),
							t
						);
					})();
				o.StatusManager = c;
				var s,
					m = (function () {
						function t(t, e) {
							(this.mSharedNames = []), this.init(t, e);
						}
						return (
							(t.prototype.init = function (t, e) {
								var o = new Date(),
									n =
										e.getFullYear() +
										e.getMonth() +
										e.getDate(),
									i =
										o.getFullYear() +
										o.getMonth() +
										o.getDate();
								(this.mSharedNames = n != i ? [] : t),
									(this.mLastUpdateTime = o);
							}),
							(t.prototype.share2Special = function (t) {
								if (-1 == this.mSharedNames.indexOf(t)) {
									var e = new Date();
									return (
										this.mLastUpdateTime
											? (console.log(
													'\u672c\u6b21\u65f6\u95f4\uff1a',
													e
											  ),
											  this.mLastUpdateTime.getFullYear() +
													this.mLastUpdateTime.getMonth() +
													this.mLastUpdateTime.getDate() !=
													e.getFullYear() +
														e.getMonth() +
														e.getDate() &&
													(this.mSharedNames = []),
											  this.mSharedNames.push(t),
											  (this.mLastUpdateTime = e))
											: (this.mSharedNames.push(t),
											  (this.mLastUpdateTime = e)),
										!0
									);
								}
								return !1;
							}),
							(t.prototype.generateCacheData = function () {
								return {
									Names: this.mSharedNames,
									LastUpdateTime:
										this.mLastUpdateTime.valueOf()
								};
							}),
							t
						);
					})();
				(o.ShareCacheManager = m),
					((s = a = o.EStorageType || (o.EStorageType = {}))[
						(s.EST_Cache_UserInfo = 0)
					] = 'EST_Cache_UserInfo'),
					(s[(s.EST_Cache_SysCfg = 1)] = 'EST_Cache_SysCfg'),
					(s[(s.EST_Cache_RewardedData = 2)] =
						'EST_Cache_RewardedData'),
					(s[(s.EST_Cache_Status = 3)] = 'EST_Cache_Status'),
					(s[(s.EST_Cache_SharedFriends = 4)] =
						'EST_Cache_SharedFriends'),
					(s[(s.EST_Cache_CDKeys = 5)] = 'EST_Cache_CDKeys'),
					(s[(s.EST_Cache_Temp_IOSBC = 6)] = 'EST_Cache_Temp_IOSBC');
				var l = (function () {
					function t() {
						(this.mUserInfo = null),
							(this.mSysCfg = null),
							(this.mStatusManager = null),
							(this.mRewardedDate = null),
							(this.mShareManager = null),
							(this.mCDKeys = []),
							(this.mIOS_Buchang = !0),
							(this.mIsNew = !1),
							(this.mPlatform = this.createPlatform()),
							(this.mUserInfo = new i.UserInfo()),
							(this.mSysCfg = new r()),
							(this.mRewardedDate = new i.RewardedDataManager()),
							(this.mStatusManager = new c()),
							(this.mShareManager = new m([], new Date()));
					}
					return (
						(t.prototype.isIOSBuChang = function () {
							return this.mIOS_Buchang;
						}),
						(t.prototype.iosBuChang = function () {
							(this.mIOS_Buchang = !0),
								this.save2Cache(a.EST_Cache_Temp_IOSBC);
						}),
						(t.prototype.isCDKeyUsed = function (t) {
							return this.mCDKeys.includes(t);
						}),
						(t.prototype.realUseCDKey = function (t) {
							this.mCDKeys.push(t),
								this.save2Cache(a.EST_Cache_CDKeys);
						}),
						(t.prototype.useCDKey = function (t, e, o, i) {
							var r = -1;
							if (this.isCDKeyUsed(t)) i();
							else {
								for (
									var a = 0;
									a < n.GameConfig.DefaultCD_KEY.length;
									a++
								)
									if (
										t ==
										n.GameConfig.DefaultCD_KEY[a].cd_key
									) {
										r = a;
										break;
									}
								r >= 0
									? e(
											n.GameConfig.DefaultCD_KEY[r].reward
												.tip,
											n.GameConfig.DefaultCD_KEY[r].reward
												.refresh,
											n.GameConfig.DefaultCD_KEY[r].reward
												.infinity,
											n.GameConfig.DefaultCD_KEY[r].reward
												.integral
									  )
									: o();
							}
						}),
						(t.prototype.extractCachedData = function () {
							var e = this.mPlatform.getStorageSync(
								t.KEY_CACHE_USERINFO
							);
							e
								? (this.mUserInfo.initByJson(e),
								  (this.mIsNew = !1))
								: (this.save2Cache(a.EST_Cache_UserInfo),
								  (this.mIsNew = !0));
							var o = this.mPlatform.getStorageSync(
								t.KEY_CACHE_CD_KEY
							);
							o
								? (this.mCDKeys = o)
								: this.save2Cache(a.EST_Cache_CDKeys);
							var i = this.mPlatform.getStorageSync(
								t.KEY_CACHE_TEMP_IOS_BUCHANG_01
							);
							i
								? (this.mIOS_Buchang = i)
								: (this.mIsNew || (this.mIOS_Buchang = !1),
								  this.save2Cache(a.EST_Cache_Temp_IOSBC));
							var r = this.mPlatform.getStorageSync(
								t.KEY_CACHE_SHARED
							);
							if (r && r.Names && r.LastUpdateTime) {
								var c = this.timeStamp2Date(r.LastUpdateTime);
								this.mShareManager = new m(r.Names, c);
							} else this.save2Cache(a.EST_Cache_SharedFriends);
							var s = this.mPlatform.getStorageSync(
								t.KEY_CACHE_REWARDED
							);
							s
								? this.mRewardedDate.initByCache(s)
								: this.save2Cache(a.EST_Cache_RewardedData);
							var l = this.mPlatform.getStorageSync(
								t.KEY_CACHE_STATUS
							);
							l
								? this.mStatusManager.initByJson(l)
								: this.save2Cache(a.EST_Cache_Status);
							var p = this.mPlatform.getStorageSync(
								t.KEY_CACHE_SYS_CFG
							);
							p
								? this.mSysCfg.initByCache(p)
								: this.save2Cache(a.EST_Cache_SysCfg),
								console.log(
									'\u7528\u6237\u4fe1\u606f',
									n.Comm.mPlatform.mStorageUtil.mUserInfo
								);
						}),
						(t.prototype.save2Cache = function (e) {
							var o = '',
								n = null;
							switch (e) {
								case a.EST_Cache_UserInfo:
									(o = t.KEY_CACHE_USERINFO),
										(n =
											this.mUserInfo.generateCacheDate());
									break;
								case a.EST_Cache_SysCfg:
									(o = t.KEY_CACHE_SYS_CFG),
										(n = this.mSysCfg.generateCache());
									break;
								case a.EST_Cache_RewardedData:
									(o = t.KEY_CACHE_REWARDED),
										(n =
											this.mRewardedDate.generateCache());
									break;
								case a.EST_Cache_Status:
									(o = t.KEY_CACHE_STATUS),
										(n =
											this.mStatusManager.generateCacheDate());
									break;
								case a.EST_Cache_SharedFriends:
									(o = t.KEY_CACHE_SHARED),
										(n =
											this.mShareManager.generateCacheData());
									break;
								case a.EST_Cache_CDKeys:
									(o = t.KEY_CACHE_CD_KEY),
										(n = this.mCDKeys);
									break;
								case a.EST_Cache_Temp_IOSBC:
									(o = t.KEY_CACHE_TEMP_IOS_BUCHANG_01),
										(n = this.mIOS_Buchang);
							}
							o && null != n
								? (console.log(
										o + ':',
										n,
										'\u5b58\u50a8\u5230\u7f13\u5b58'
								  ),
								  this.mPlatform.setStorage({
										key: o,
										data: n
								  }))
								: console.log(
										'\u6570\u636e\u5f02\u5e38,\u653e\u5f03\u5b58\u50a8key: %s, data:',
										o,
										n
								  );
						}),
						(t.prototype.isNew = function () {
							return this.mIsNew;
						}),
						(t.prototype.resetIsNew = function () {
							this.mIsNew = !1;
						}),
						(t.prototype.timeStamp2Date = function (t) {
							var e = new Date();
							if ('string' == typeof t) {
								var o = +t;
								if (isNaN(o)) return e;
								e.setTime(o);
							} else e.setTime(t);
							return e;
						}),
						(t.KEY_CACHE_USERINFO = '_user_data'),
						(t.KEY_CACHE_SYS_CFG = 'sys_cfg'),
						(t.KEY_CACHE_REWARDED = 'rewarded_data'),
						(t.KEY_CACHE_STATUS = 'game_status'),
						(t.KEY_CACHE_SHARED = 'shared_friends'),
						(t.KEY_CACHE_CD_KEY = 'cd_keys'),
						(t.KEY_CACHE_TEMP_IOS_BUCHANG_01 = 'ios_buchang'),
						t
					);
				})();
				(o.default = l), cc._RF.pop();
			},
			{ './Comm': 'Comm', './Datas': 'Datas' }
		],
		Timer: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '8eac8qJ7uJFKKymxMKiDMo6', 'Timer');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass,
					m = c.property,
					l = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mComp_Timer = null),
								(e.mCurrent_Count = o.Max_Count_Per_Step),
								(e.mFlag_Start_Timing = !1),
								(e.mAssistantDispatched = !1),
								e
							);
						}
						var o;
						return (
							r(e, t),
							(o = e),
							(e.prototype.isTiming = function () {
								return this.mFlag_Start_Timing;
							}),
							(e.prototype.startTiming = function () {
								this.mFlag_Start_Timing = !0;
							}),
							(e.prototype.stopTiming = function () {
								this.mFlag_Start_Timing = !1;
							}),
							(e.prototype.init = function () {
								this.stopTiming(),
									(this.mCurrent_Count =
										o.Max_Count_Per_Step),
									(this.mComp_Timer.fillRange = 1);
							}),
							(e.prototype.reset = function () {
								this.mCurrent_Count = o.Max_Count_Per_Step;
							}),
							(e.prototype.getRemainderTime = function () {
								var t =
									Math.round(100 * this.mCurrent_Count) / 100;
								return this.reset(), t;
							}),
							(e.prototype.start = function () {}),
							(e.prototype.update = function (t) {
								this.mFlag_Start_Timing &&
									(this.mCurrent_Count > 0
										? ((this.mCurrent_Count -= t),
										  (this.mComp_Timer.fillRange =
												this.mCurrent_Count /
												o.Max_Count_Per_Step))
										: (this.mCurrent_Count = 0));
							}),
							(e.Max_Count_Per_Step = 30),
							a(
								[m(cc.Sprite)],
								e.prototype,
								'mComp_Timer',
								void 0
							),
							(o = a([s], e))
						);
					})(cc.Component);
				(o.default = l), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		TipsManager: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'e0a70h2hpNCh7raa9it/e9i', 'TipsManager');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./Forecast'),
					m = cc._decorator,
					l = m.ccclass,
					p = m.property,
					u = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mPfb_Card = null),
								(e.mLayout = null),
								(e.mCursor = null),
								(e.cardPair_1 = null),
								(e.cardPair_2 = null),
								(e.mCardPool = null),
								(e.mTimer = null),
								(e.mCards = []),
								(e.mPosSource = cc.Vec2.ZERO),
								(e.mPosTag = cc.Vec2.ZERO),
								(e.mDuration = 0),
								(e.mAction = null),
								(e.mUpdateEnabled = !1),
								(e.mEnabled = !1),
								(e.mTimeOutId = null),
								(e.mDelayTips = o.DEFAULT_TIPS_DELAY),
								e
							);
						}
						var o;
						return (
							r(e, t),
							(o = e),
							(e.prototype.initTipsCard = function (t, e, o) {
								if (0 != e) {
									var n = 0,
										i = 0,
										r = 0,
										a = 0;
									e > 0
										? (o == s.EAxis.E_x
												? ((n = 0), (i = 1))
												: ((n = 1), (i = 0)),
										  (r = c.Comm.getRow()),
										  (a = c.Comm.getColumn()))
										: (o == s.EAxis.E_x
												? ((n = 0), (i = -1))
												: ((n = -1), (i = 0)),
										  (r = -1),
										  (a = -1));
									for (
										var m = t.mRow, l = t.mCol;
										m != r && l != a;

									) {
										var p = c.Comm.cell(m, l);
										if (null != p) {
											var u = p.boundCard();
											if (null != u) {
												if (u.isPaired()) break;
												var d = this.mCardPool.get(
													u.getType()
												);
												this.mCards.push(d);
											}
										}
										(m += n), (l += i);
									}
								}
							}),
							(e.prototype.initTransform = function (t, e, o) {
								var n = 0,
									i = 0,
									r = t.mRow,
									a = t.mCol;
								if (e == s.EAxis.E_y) {
									(this.mLayout.type =
										cc.Layout.Type.VERTICAL),
										(this.mLayout.verticalDirection =
											o > 0
												? cc.Layout.VerticalDirection
														.TOP_TO_BOTTOM
												: cc.Layout.VerticalDirection
														.BOTTOM_TO_TOP),
										(this.node.width =
											c.GameConfig.DESIGN_WIDTH),
										(this.node.height =
											this.mCards.length *
											c.GameConfig.DESIGN_HEIGHT);
									var m =
										this.node.height / 2 -
										c.GameConfig.DESIGN_HEIGHT / 2;
									(i = o > 0 ? -m : m),
										(this.mCursor.x = 5),
										(this.mCursor.y =
											o > 0
												? this.node.height / 2 -
												  c.GameConfig.DESIGN_HEIGHT
												: -this.node.height / 2),
										(r += o);
								} else
									(this.mLayout.type =
										cc.Layout.Type.HORIZONTAL),
										(this.mLayout.horizontalDirection =
											o > 0
												? cc.Layout.HorizontalDirection
														.LEFT_TO_RIGHT
												: cc.Layout.HorizontalDirection
														.RIGHT_TO_LEFT),
										(this.node.width =
											this.mCards.length *
											c.GameConfig.DESIGN_WIDTH),
										(this.node.height =
											c.GameConfig.DESIGN_HEIGHT),
										(m =
											this.node.width / 2 -
											c.GameConfig.DESIGN_WIDTH / 2),
										(n = o > 0 ? m : -m),
										(this.mCursor.x =
											o > 0
												? -this.node.width / 2 +
												  this.mCursor.width / 2 +
												  10
												: this.node.width / 2 -
												  this.mCursor.width / 2 -
												  10),
										(this.mCursor.y =
											-this.mCursor.height / 2),
										(a += o);
								var l = c.Comm.cell(t.mRow, t.mCol).boundCard(),
									p = c.Comm.cell(r, a).boundCard();
								(this.mPosSource =
									this.node.parent.convertToNodeSpaceAR(
										l.node.parent.convertToWorldSpaceAR(
											l.getBoundPos()
										)
									)),
									(this.mPosTag =
										this.node.parent.convertToNodeSpaceAR(
											p.node.parent.convertToWorldSpaceAR(
												p.getBoundPos()
											)
										)),
									(this.mPosSource.x += n),
									(this.mPosSource.y += i),
									(this.mPosTag.x += n),
									(this.mPosTag.y += i);
							}),
							(e.prototype.tips = function () {
								(this.mUpdateEnabled = !1),
									(this.mAction = cc
										.tween(this.node)
										.repeatForever(
											cc
												.tween()
												.to(0.1, {
													x: this.mPosSource.x,
													y: this.mPosSource.y
												})
												.to(0.2, { opacity: 255 })
												.to(this.mDuration, {
													x: this.mPosTag.x,
													y: this.mPosTag.y
												})
												.delay(1)
												.to(0.1, { opacity: 0 })
										)),
									this.mAction.start(),
									this.markPairingCards();
							}),
							(e.prototype.markPairingCards = function (t) {
								void 0 === t && (t = !0),
									this.cardPair_1 &&
										this.cardPair_1.markingSearch(t),
									this.cardPair_2 &&
										this.cardPair_2.markingSearch(t);
							}),
							(e.prototype.init = function () {
								if (
									((this.node.active = !1),
									(this.mEnabled = !1),
									(this.mUpdateEnabled = !1),
									(this.mTimeOutId = null),
									(this.mAction = null),
									(this.mTimer = null),
									(this.mDuration = 0),
									(this.node.opacity = 0),
									null == this.mCardPool)
								) {
									this.mCardPool = new cc.NodePool(
										'TutorialCard'
									);
									for (var t = 0; t < 12; t++) {
										var e = cc.instantiate(this.mPfb_Card);
										this.mCardPool.put(e);
									}
								}
							}),
							(e.prototype.reset = function () {
								this.unscheduleAllCallbacks(),
									(this.node.active = !1),
									(this.mEnabled = !1),
									(this.mUpdateEnabled = !1),
									null != this.mTimeOutId &&
										clearTimeout(this.mTimeOutId),
									null != this.mAction &&
										(this.mAction.stop(),
										(this.mAction = null)),
									(this.mTimer = null),
									(this.mDuration = 0),
									(this.node.opacity = 0),
									(this.mDelayTips = o.DEFAULT_TIPS_DELAY),
									this.markPairingCards(!1),
									(this.cardPair_1 = null),
									(this.cardPair_2 = null);
							}),
							(e.prototype.enableTips = function (t, e) {
								void 0 === t && (t = !0),
									void 0 === e && (e = o.DEFAULT_TIPS_DELAY),
									(this.node.active = t),
									(this.mDelayTips = e),
									(this.mEnabled = t);
							}),
							(e.prototype.configTips = function (t) {
								if (
									(null != this.mAction &&
										(this.mAction.stop(),
										(this.mAction = null)),
									(this.mTimer = this.mDelayTips),
									this.unschedule(this.tips),
									this.mCards.length > 0)
								) {
									for (var e = 0; e < this.mCards.length; e++)
										this.mCardPool.put(this.mCards[e]);
									this.mCards = [];
								}
								var o = t.from(),
									n = t.tag();
								(this.cardPair_1 = c.Comm.cell(
									o.mRow,
									o.mCol
								).boundCard()),
									(this.cardPair_2 = c.Comm.cell(
										n.mRow,
										n.mCol
									).boundCard());
								var i = t.span(),
									r = t.axis();
								for (
									this.node.opacity = 0,
										this.mDuration = 0.3 * Math.abs(i),
										this.initTipsCard(o, i, r),
										this.initTransform(o, r, i),
										e = 0;
									e < this.mCards.length;
									e++
								)
									this.mLayout.node.addChild(this.mCards[e]);
							}),
							(e.prototype.startTips = function () {
								this.mEnabled &&
									(this.scheduleOnce(this.tips, this.mTimer),
									(this.mUpdateEnabled = !0));
							}),
							(e.prototype.pause = function () {
								this.mEnabled &&
									(this.markPairingCards(!1),
									null != this.mAction
										? (null != this.mTimeOutId &&
												clearTimeout(this.mTimeOutId),
										  (this.node.opacity = 0),
										  this.mAction.stop())
										: ((this.mUpdateEnabled = !1),
										  this.unschedule(this.tips)));
							}),
							(e.prototype.stop = function () {
								this.unscheduleAllCallbacks(),
									this.markPairingCards(!1),
									null != this.mAction &&
										(null != this.mTimeOutId &&
											clearTimeout(this.mTimeOutId),
										(this.node.opacity = 0),
										this.mAction.stop()),
									(this.mAction = null);
							}),
							(e.prototype.confirmNotExecuteAct = function () {
								(this.node.opacity = 0),
									null != this.mAction && this.mAction.stop();
							}),
							(e.prototype.continue = function () {
								var t = this;
								if (this.mEnabled)
									if (null != this.mAction) {
										var e = this;
										this.mTimeOutId = setTimeout(
											function () {
												(e.node.opacity = 0),
													e.mAction.start(),
													e.markPairingCards(),
													(t.mTimeOutId = null);
											},
											1e3
										);
									} else
										this.scheduleOnce(
											this.tips,
											this.mTimer
										),
											(this.mUpdateEnabled = !0);
							}),
							(e.prototype.update = function (t) {
								this.mUpdateEnabled && (this.mTimer -= t);
							}),
							(e.DEFAULT_TIPS_DELAY = 3),
							a([p(cc.Prefab)], e.prototype, 'mPfb_Card', void 0),
							a([p(cc.Layout)], e.prototype, 'mLayout', void 0),
							a([p(cc.Node)], e.prototype, 'mCursor', void 0),
							(o = a([l], e))
						);
					})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './Comm': 'Comm', './Forecast': 'Forecast', './typeof': 'typeof' }
		],
		Toast: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '617fc1DHrVM2bTKxov/ztly', 'Toast');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = cc._decorator,
					s = c.ccclass,
					m = c.property,
					l = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mLab_Title = null),
								(e.mLabWidth_Hestory = 0),
								(e.mAct_FadeIn = null),
								e
							);
						}
						var o;
						return (
							r(e, t),
							(o = e),
							(e.prototype.show = function (t, e, o, n) {
								var i = this;
								if (
									(void 0 === e && (e = 1),
									void 0 === o && (o = !0),
									void 0 === n && (n = !1),
									this.node.active &&
										(null != this.mAct_FadeIn &&
											this.mAct_FadeIn.stop(),
										this.unscheduleAllCallbacks(),
										(this.node.active = !1)),
									(this.node.y = o
										? 0
										: -this.node.parent.height / 2 +
										  60 +
										  this.node.height / 2),
									n)
								) {
									(this.node.opacity = 0),
										(this.mAct_FadeIn = cc
											.tween(this.node)
											.to(0.3, { opacity: 255 })
											.start());
									var r = this;
									this.scheduleOnce(function () {
										r.mAct_FadeIn = cc
											.tween(i.node)
											.to(0.3, { opacity: 0 })
											.call(function () {
												r.node.active = !1;
											})
											.start();
									}, e);
								}
								(this.mLab_Title.string = t),
									(this.node.active = !0);
							}),
							(e.prototype.start = function () {}),
							(e.prototype.update = function () {
								this.mLabWidth_Hestory !=
									this.mLab_Title.node.width &&
									((this.mLabWidth_Hestory =
										this.mLab_Title.node.width),
									(this.node.width =
										this.mLab_Title.node.width +
										2 * o.Margin_Hor));
							}),
							(e.Margin_Hor = 20),
							a([m(cc.Label)], e.prototype, 'mLab_Title', void 0),
							(o = a([s], e))
						);
					})(cc.Component);
				(o.default = l), cc._RF.pop();
			},
			{ './typeof': 'typeof' }
		],
		ToolBar: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '6f137c0uCdMLZR1dbffpPHB', 'ToolBar');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./Comm'),
					s = t('./Timer'),
					m = cc._decorator,
					l = m.ccclass,
					p = m.property,
					u = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mSrc_Timer = null),
								(e.mSpt_SuccessiveLimit = null),
								(e.mBtn_Pause = null),
								(e.mLab_Integral = null),
								(e.mInstace_FrameGame = null),
								(e.mCompProps = new Array()),
								(e.mIntegral = 0),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.totalIntegral = function () {
								return this.mIntegral;
							}),
							(e.prototype.initToolBar = function (t) {
								(this.mInstace_FrameGame = t),
									(this.mIntegral = 0),
									this.mSrc_Timer.init(),
									(this.mBtn_Pause.enabled = !1);
								for (var e = 0; e < this.mCompProps.length; e++)
									this.mCompProps[e].reset(),
										(this.mCompProps[e].getComponent(
											cc.Button
										).enabled = !1);
								this.mLab_Integral.string =
									this.mIntegral.toString();
							}),
							(e.prototype.enableToolBar = function () {
								console.log('\u542f\u52a8\u5de5\u5177\u680f'),
									(this.mBtn_Pause.enabled = !0);
								for (var t = 0; t < this.mCompProps.length; t++)
									this.mCompProps[t].getComponent(
										cc.Button
									).enabled = !0;
							}),
							(e.prototype.canContinueByProps = function () {
								return (
									c.Comm.mPlatform.mStorageUtil.mUserInfo.getRefresh() >
									0
								);
							}),
							(e.prototype.getSpecialProp = function (t) {
								for (
									var e = null, o = 0;
									o < this.mCompProps.length &&
									null ==
										(e =
											this.mCompProps[o].isSpecialProp(
												t
											));
									o++
								);
								return e;
							}),
							(e.prototype.startTiming = function (t) {
								t
									? this.mSrc_Timer.startTiming()
									: this.mSrc_Timer.stopTiming();
							}),
							(e.prototype.remainderTime = function () {
								return this.mSrc_Timer.getRemainderTime();
							}),
							(e.prototype.isTiming = function () {
								return this.mSrc_Timer.isTiming();
							}),
							(e.prototype.compSuccessiveLimit = function () {
								return this.mSpt_SuccessiveLimit;
							}),
							(e.prototype.onPause = function (t) {
								t.stopPropagation(),
									this.mBtn_Pause.enabled &&
										(this.mSrc_Timer.stopTiming(),
										this.mInstace_FrameGame.pauseGame());
							}),
							(e.prototype.increaseIntegral = function (t) {
								(this.mIntegral += t),
									(this.mLab_Integral.string =
										this.mIntegral.toString());
							}),
							(e.prototype.onLoad = function () {
								this.mBtn_Pause.node.on(
									cc.Node.EventType.TOUCH_END,
									this.onPause,
									this
								);
							}),
							(e.prototype.start = function () {}),
							a(
								[p({ type: s.default })],
								e.prototype,
								'mSrc_Timer',
								void 0
							),
							a(
								[p(cc.Sprite)],
								e.prototype,
								'mSpt_SuccessiveLimit',
								void 0
							),
							a(
								[p(cc.Button)],
								e.prototype,
								'mBtn_Pause',
								void 0
							),
							a(
								[p(cc.Label)],
								e.prototype,
								'mLab_Integral',
								void 0
							),
							a([l], e)
						);
					})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './Comm': 'Comm', './Timer': 'Timer', './typeof': 'typeof' }
		],
		TopGamesUtil: [
			function (t, e) {
				'use strict';
				var o;
				cc._RF.push(e, 'af36f5UmoxEn5e7PxwYS+3V', 'TopGamesUtil'),
					(window.TopGamesUtil =
						((o = function (t, e) {
							var o = document.createElement('script');
							o.setAttribute('type', 'text/javascript'),
								o.setAttribute('src', t),
								document
									.getElementsByTagName('body')[0]
									.appendChild(o),
								e && (o.onload = e);
						}),
						{
							init: function (t) {
								o(
									'https://h5gamessdk.yyggames.com/sdk/h5games.js',
									function () {
										var e = this;
										h5games.init({
											gd: '765061e024104d46aff7c5f9939dfe1a',
											gm: '8wlb1qscl61s3my6mw855eakvdfmlaka',
											cb: function () {
												h5games.addEventListener(
													h5games.events.beforeShowAd,
													e,
													function () {
														cc.game.pause();
													}
												),
													h5games.addEventListener(
														h5games.events
															.afterShowAd,
														e,
														function () {
															cc.game.resume();
														}
													),
													h5games.addEventListener(
														h5games.events
															.rewardDismissed,
														e,
														function () {
															h5games.showToast(
																'Pls watch the ad completely, so that you can claim your reward'
															);
														}
													),
													t();
											}
										});
									}
								);
							},
							bodyStyle: function (t, e) {
								var o = document.createElement('style');
								(o.innerText =
									'#Game,#GameDiv {position: absolute;margin: 0;overflow: hidden;width: ' +
									t +
									'px;height: ' +
									e +
									'px;left: 50%;top: 50%;transform: translate(-50%, -50%);}'),
									document.head.appendChild(o);
							}
						})),
					cc._RF.pop();
			},
			{}
		],
		TutorialCard: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, '86d7fcC4TRHvo6pS20xDiyR', 'TutorialCard');
				var n,
					i = t('./typeof'),
					r =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					a = function (t, e, o, n) {
						var r,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: i(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(r = t[s]) &&
									(c =
										(a < 3
											? r(c)
											: a > 3
											? r(e, o, c)
											: r(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 });
				var c = t('./MyEnums'),
					s = t('./Comm'),
					m = cc._decorator,
					l = m.ccclass,
					p = m.property,
					u = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mSpt_CardType = null),
								(e.mSF_Front = null),
								(e.mSF_Back = null),
								(e.mSpt = null),
								(e.mType = 0),
								(e.Start_JustForLoading = 0),
								(e.End_JustForLoading = 0),
								(e.isLeftJustForLoading = null),
								(e.mAct_JustForLoading = null),
								(e.mInited_JustForLoading = !1),
								e
							);
						}
						return (
							r(e, t),
							(e.prototype.unuse = function () {
								(this.node.opacity = 255),
									(this.mSpt_CardType.node.active = !1);
							}),
							(e.prototype.reuse = function (t) {
								this.node.setPosition(cc.Vec2.ZERO),
									(this.node.opacity = 178),
									(this.mSpt_CardType.node.active = !0);
								var e =
									s.Comm.getInstance().getResourcesManager();
								if (null != e.mSpriteAtlas) {
									var o = e.mSpriteAtlas.getSpriteFrame(
										s.Comm.ecard_type2name(t)
									);
									null != o
										? (this.mSpt_CardType.spriteFrame = o)
										: console.log(
												'\u56fe\u96c6\u8d44\u6e90\u4e2d\u672a\u627e\u5230\u6307\u5b9a\u540d\u5b57\u7684\u8d44\u6e90'
										  );
								} else
									console.log(
										'\u56fe\u96c6\u8d44\u6e90\u9519\u8bef!'
									);
							}),
							(e.prototype.updateType = function () {
								this.mSpt_CardType.node.active = !0;
								var t =
									s.Comm.getInstance().getResourcesManager();
								if (null != t.mSpriteAtlas) {
									var e = t.mSpriteAtlas.getSpriteFrame(
										s.Comm.ecard_type2name(this.mType)
									);
									null != e
										? (this.mSpt_CardType.spriteFrame = e)
										: console.log(
												'\u56fe\u96c6\u8d44\u6e90\u4e2d\u672a\u627e\u5230\u6307\u5b9a\u540d\u5b57\u7684\u8d44\u6e90'
										  );
								} else
									console.log(
										'\u56fe\u96c6\u8d44\u6e90\u9519\u8bef!'
									);
							}),
							(e.prototype.initInLoading = function (t) {
								(this.mInited_JustForLoading = !0),
									(this.isLeftJustForLoading = t);
								var e =
									this.node.parent.width / 2 -
									5 -
									this.node.width / 2;
								t
									? ((this.Start_JustForLoading = -e),
									  (this.End_JustForLoading =
											-this.node.width / 2 - 2))
									: ((this.Start_JustForLoading = e),
									  (this.End_JustForLoading =
											this.node.width / 2 + 2)),
									(this.node.x = this.Start_JustForLoading),
									(this.node.opacity = 255),
									(this.node.scale = 1),
									(this.mSpt_CardType.node.active = !0),
									(this.mSpt = this.node.getComponent(
										cc.Sprite
									)),
									null != this.mSpt &&
										(this.mSpt.spriteFrame =
											this.mSF_Front);
							}),
							(e.prototype.startActionInLoading = function () {
								var t = this;
								if (!this.mInited_JustForLoading)
									throw '\u6ca1\u6709\u8fdb\u884c\u521d\u59cb\u5316,\u65e0\u6cd5\u6267\u884cstartActionInLoading';
								(this.node.x = this.Start_JustForLoading),
									(this.mType = c.ECard_Type.Feng_1),
									this.updateType(),
									(this.node.opacity = 255),
									(this.node.scale = 1),
									(this.mSpt_CardType.node.active = !0),
									(this.mSpt = this.node.getComponent(
										cc.Sprite
									)),
									(this.mSpt.spriteFrame = this.mSF_Front);
								var e = this;
								this.mAct_JustForLoading = cc
									.tween(this.node)
									.to(1, { x: this.End_JustForLoading })
									.to(0.2, { scaleX: 0 })
									.call(function () {
										null != t.mSpt &&
											((e.mSpt.spriteFrame = t.mSF_Back),
											(e.mSpt_CardType.node.active = !1));
									})
									.to(0.2, { scaleX: -1 })
									.to(0.3, { opacity: 0 })
									.call(function () {
										e.nextInLoading(),
											e.mAct_JustForLoading.start();
									})
									.start();
							}),
							(e.prototype.nextInLoading = function () {
								null != this.mSpt &&
									(this.mSpt.spriteFrame = this.mSF_Front),
									(this.mType += 1),
									this.mType > c.ECard_Type.Feng_3 &&
										(this.mType = c.ECard_Type.Feng_1),
									this.updateType(),
									(this.node.x = this.Start_JustForLoading),
									(this.mSpt_CardType.node.active = !0),
									(this.node.scaleX = 1),
									(this.node.opacity = 255);
							}),
							(e.prototype.start = function () {}),
							a(
								[p(cc.Sprite)],
								e.prototype,
								'mSpt_CardType',
								void 0
							),
							a(
								[p(cc.SpriteFrame)],
								e.prototype,
								'mSF_Front',
								void 0
							),
							a(
								[p(cc.SpriteFrame)],
								e.prototype,
								'mSF_Back',
								void 0
							),
							a([l], e)
						);
					})(cc.Component);
				(o.default = u), cc._RF.pop();
			},
			{ './Comm': 'Comm', './MyEnums': 'MyEnums', './typeof': 'typeof' }
		],
		TutorialGuide: [
			function (t, e, o) {
				'use strict';
				cc._RF.push(e, 'c9e73ODSwVFTrLKxArvcJTz', 'TutorialGuide');
				var n,
					i,
					r = t('./typeof'),
					a =
						((n = function (t, e) {
							return (n =
								Object.setPrototypeOf ||
								({ __proto__: [] } instanceof Array &&
									function (t, e) {
										t.__proto__ = e;
									}) ||
								function (t, e) {
									for (var o in e)
										Object.prototype.hasOwnProperty.call(
											e,
											o
										) && (t[o] = e[o]);
								})(t, e);
						}),
						function (t, e) {
							function o() {
								this.constructor = t;
							}
							n(t, e),
								(t.prototype =
									null === e
										? Object.create(e)
										: ((o.prototype = e.prototype),
										  new o()));
						}),
					c = function (t, e, o, n) {
						var i,
							a = arguments.length,
							c =
								a < 3
									? e
									: null === n
									? (n = Object.getOwnPropertyDescriptor(
											e,
											o
									  ))
									: n;
						if (
							'object' ==
								('undefined' == typeof Reflect
									? 'undefined'
									: r(Reflect)) &&
							'function' == typeof Reflect.decorate
						)
							c = Reflect.decorate(t, e, o, n);
						else
							for (var s = t.length - 1; s >= 0; s--)
								(i = t[s]) &&
									(c =
										(a < 3
											? i(c)
											: a > 3
											? i(e, o, c)
											: i(e, o)) || c);
						return a > 3 && c && Object.defineProperty(e, o, c), c;
					};
				Object.defineProperty(o, '__esModule', { value: !0 }),
					(o.EvtGuideExit = void 0);
				var s,
					m = t('./Comm');
				((s = i || (i = {}))[(s.EGT_1 = 0)] = 'EGT_1'),
					(s[(s.EGT_2 = 1)] = 'EGT_2'),
					(s[(s.EGT_3 = 2)] = 'EGT_3');
				var l = (function (t) {
					function e(o) {
						return (
							void 0 === o && (o = !0),
							t.call(this, e.EVENT_TYPE, o) || this
						);
					}
					return a(e, t), (e.EVENT_TYPE = 'Evt_Guide_Exit'), e;
				})(cc.Event);
				o.EvtGuideExit = l;
				var p = cc._decorator,
					u = p.ccclass,
					d = p.property,
					h = (function (t) {
						function e() {
							var e =
								(null !== t && t.apply(this, arguments)) ||
								this;
							return (
								(e.mNode_Guide_1 = null),
								(e.mNode_Guide_2 = null),
								(e.mNode_Guide_3 = null),
								(e.mNode_Btn_Next = null),
								(e.mNode_Cursor = null),
								(e.mNode_Touch = null),
								(e.mAnim = null),
								(e.mEGT = i.EGT_1),
								e
							);
						}
						return (
							a(e, t),
							(e.prototype.onNext = function (t) {
								t.stopPropagation();
								var e = t.target.getComponent(cc.Button);
								if (null != e) {
									if (!e.enabled) return;
									(e.enabled = !1),
										e.scheduleOnce(function () {
											e.enabled = !0;
										}, 0.5);
								}
								m.Comm.getInstance().mSoundManager.playEffectBtnClick(),
									this.switchGuide(this.mEGT);
							}),
							(e.prototype.fadeInBtn = function () {
								cc.tween(this.mNode_Btn_Next)
									.to(0.2, { opacity: 255 })
									.start();
							}),
							(e.prototype.fadeOutBtn = function () {
								cc.tween(this.mNode_Btn_Next)
									.to(0.2, { opacity: 0 })
									.start();
							}),
							(e.prototype.switchGuide = function (t) {
								this.unscheduleAllCallbacks(),
									(this.mNode_Touch.opacity = 0),
									(this.mNode_Cursor.opacity = 0);
								var e = null,
									o = null;
								switch (t) {
									case i.EGT_1:
										(e = this.mNode_Guide_1),
											(o = this.mNode_Guide_2);
										break;
									case i.EGT_2:
										(e = this.mNode_Guide_2),
											(o = this.mNode_Guide_3);
										break;
									case i.EGT_3:
										return void this.node.dispatchEvent(
											new l()
										);
								}
								this.mAnim.stop(this.mAnim.getClips()[t].name),
									cc
										.tween(e)
										.to(0.3, { x: -this.node.width })
										.call(function () {
											e.active = !1;
										})
										.start(),
									(o.active = !0),
									(o.x = this.node.width);
								var n = this;
								cc.tween(o)
									.to(0.3, { x: 0 })
									.call(function () {
										t++,
											(n.mEGT = t),
											n.fadeInBtn(),
											n.scheduleOnce(function () {
												(n.mAnim.getClips()[
													t
												].wrapMode = cc.WrapMode.Loop),
													n.mAnim.play(
														n.mAnim.getClips()[t]
															.name
													);
											}, 1);
									})
									.start();
							}),
							(e.prototype.onLoad = function () {
								(this.mAnim = this.getComponent(cc.Animation)),
									this.mNode_Btn_Next.on(
										cc.Node.EventType.TOUCH_END,
										this.onNext,
										this
									);
							}),
							(e.prototype.onEnable = function () {
								(this.mEGT = i.EGT_1),
									(this.mNode_Guide_1.x = 0),
									(this.mNode_Guide_1.active = !0),
									(this.mNode_Guide_2.active = !1),
									(this.mNode_Guide_3.active = !1),
									(this.mNode_Btn_Next.opacity = 0);
								var t = this;
								this.scheduleOnce(function () {
									t.fadeInBtn(),
										(t.mAnim.getClips()[0].wrapMode =
											cc.WrapMode.Loop),
										t.mAnim.play(
											t.mAnim.getClips()[0].name
										);
								}, 1);
							}),
							(e.prototype.start = function () {}),
							c(
								[d(cc.Node)],
								e.prototype,
								'mNode_Guide_1',
								void 0
							),
							c(
								[d(cc.Node)],
								e.prototype,
								'mNode_Guide_2',
								void 0
							),
							c(
								[d(cc.Node)],
								e.prototype,
								'mNode_Guide_3',
								void 0
							),
							c(
								[d(cc.Node)],
								e.prototype,
								'mNode_Btn_Next',
								void 0
							),
							c(
								[d(cc.Node)],
								e.prototype,
								'mNode_Cursor',
								void 0
							),
							c([d(cc.Node)], e.prototype, 'mNode_Touch', void 0),
							c([u], e)
						);
					})(cc.Component);
				(o.default = h), cc._RF.pop();
			},
			{ './Comm': 'Comm', './typeof': 'typeof' }
		],
		typeof: [
			function (t, e) {
				'use strict';
				function o(t) {
					return (
						'function' == typeof Symbol &&
						'symbol' == typeof Symbol.iterator
							? (e.exports = o =
									function (t) {
										return typeof t;
									})
							: (e.exports = o =
									function (t) {
										return t &&
											'function' == typeof Symbol &&
											t.constructor === Symbol &&
											t !== Symbol.prototype
											? 'symbol'
											: typeof t;
									}),
						o(t)
					);
				}
				cc._RF.push(e, 'ad4ffb3FINDN7qS3/ey6XPl', 'typeof'),
					(e.exports = o),
					cc._RF.pop();
			},
			{}
		]
	},
	{},
	[
		'TopGamesUtil',
		'ActionManager',
		'Auxiliary',
		'BackgroundAdapter',
		'CardCell',
		'CardSrc',
		'Comm',
		'CompProp',
		'ContentAdapter',
		'CustomMask',
		'Datas',
		'DevStorage',
		'DialogBase',
		'DialogDuihuan',
		'DialogFailed',
		'DialogGuanzhu',
		'DialogMessage',
		'DialogPause',
		'DialogRestorByShare',
		'DialogRestoreEnergy',
		'DialogReward',
		'DialogSettlement',
		'DialogSettlementWeChat',
		'DialogSetup',
		'DialogShowWeChat',
		'ENDevelopment',
		'ENVByteDance',
		'ENVWeChat',
		'ENWindows',
		'EvCommon',
		'EvCommon2',
		'ExtraIntegral',
		'Forecast',
		'FrameBase',
		'FrameGame',
		'FrameHome',
		'FrameLoading',
		'FrameShuffling',
		'GameDesk',
		'MaskExchange',
		'MotionEfffectManager',
		'MoveControl',
		'MyBaseComponent',
		'MyDataStructure',
		'MyEnums',
		'MyEvent',
		'MyException',
		'PageLoading',
		'PanelRanking',
		'PlatformGeneralInterface',
		'PlatformMananger',
		'RankingItem_Routine',
		'RankingSrc',
		'Recorder',
		'RewardOptions',
		'SceneGame',
		'Score',
		'ScoreIndicator',
		'SoundSetup',
		'Storage',
		'StorageByteDance',
		'StorageWeChat',
		'Timer',
		'TipsManager',
		'Toast',
		'ToolBar',
		'TutorialCard',
		'TutorialGuide',
		'typeof'
	]
);
