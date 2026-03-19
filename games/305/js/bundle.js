! function() {
    "use strict";
    class t {
        constructor() {}
        static init() {
            Laya.ClassUtils.regClass
        }
    }
    t.width = 750, t.height = 1334, t.scaleMode = "fixedwidth", t.screenMode = "none", t.alignV = "top", t.alignH = "left", t.startScene = "", t.sceneRoot = "", t.debug = !1, t.stat = !1, t.physicsDebug = !1, t.exportSceneToJson = !0, t.init();
    class e extends Laya.Script3D {
        constructor() {
            super(...arguments), this.looktime = 1, this.cameramove = !1, this.followplayer = 1, this.mousedown = !1, this.mousetime = 0
        }
        init() {
            this.looktime = 1, this.cameramove = !1, this.mousedown = !1, this.mousetime = 0, this.followplayer = 1;
            var t = new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20),
                e = u.GameStorage_Ins().bae1(this.owner.transform.position, t, this.followplayer),
                i = new Laya.Vector3(u.gameplayer.transform.position.x, u.gameball.transform.position.y + 10, u.gameplayer.transform.position.z - 15);
            this.owner.transform.position = i, this.owner.transform.lookAt(e, new Laya.Vector3(0, 1, 0)), this.baepos = this.owner.transform.position.clone()
        }
        onLateUpdate() {
            if (0 != u.inplaygame) {
                if (1 == this.mousedown) {
                    if (this.mousetime += 2 * Laya.lateTimer.delta / 1e3, this.mousetime < 1) {
                        new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20);
                        this.owner.transform.translate(new Laya.Vector3(0, 0, 20 * Laya.lateTimer.delta / 1e3), !0)
                    } else if (this.mousetime < 2) {
                        new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20);
                        this.owner.transform.translate(new Laya.Vector3(0, 20 * Laya.lateTimer.delta / 1e3, 0), !1)
                    } else this.mousedown = !1, this.mousetime = 0;
                    this.baepos = this.owner.transform.position.clone()
                }
                1 == this.cameramove && (this.looktime < 1 ? this.followball() : this.followplayer < 1 && this.followplay())
            } else u.iswin && this.followplayer < 1 && this.followplay()
        }
        followball() {
            if (this.looktime += Laya.lateTimer.delta / 1e3, this.looktime > 1) return this.looktime = 1, this.followplayer = 0, void(this.baepos = this.owner.transform.position.clone());
            var t = new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20);
            u.middleselectindex >= u.middlelistpos.length - 2 && (t = new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z));
            var e = u.GameStorage_Ins().bae1(this.owner.transform.position, t, this.looktime);
            if (this.owner.transform.lookAt(e, new Laya.Vector3(0, 1, 0)), u.middleselectindex < u.middlelistpos.length - 2) {
                if (this.looktime >= .6 && this.looktime < 1) {
                    var i = (this.looktime - .6) / 2,
                        a = u.GameStorage_Ins().bae1(this.baepos, e, i);
                    this.owner.transform.position = new Laya.Vector3(a.x, this.owner.transform.position.y, a.z)
                }
            } else if (this.looktime >= .3 && this.looktime < 1) {
                var s = this.looktime - .3,
                    o = u.GameStorage_Ins().bae1(this.baepos, e, s);
                this.owner.transform.position = new Laya.Vector3(o.x, o.y, o.z)
            }
        }
        followplay() {
            if (this.followplayer += Laya.lateTimer.delta / 1e3 * 2, this.followplayer > 1) return this.followplayer = 1, this.cameramove = !1, u.gameAIactivegroup++, this.baepos = this.owner.transform.position.clone(), void(u.inplaygame && (u.canmouse = !0));
            var t = u.gameplayer.transform.position,
                e = new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20),
                i = new Laya.Vector3(u.gameplayer.transform.position.x, u.gameball.transform.position.y + 10, u.gameplayer.transform.position.z - 15),
                a = this.owner.transform.position;
            u.iswin && (a = new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20), e = new Laya.Vector3(t.x, t.y + 2, t.z), i = new Laya.Vector3(t.x, t.y + 2, t.z - 5));
            var s = u.GameStorage_Ins().bae1(a, e, this.followplayer),
                o = u.GameStorage_Ins().bae1(this.baepos, i, this.followplayer);
            this.owner.transform.lookAt(s, new Laya.Vector3(0, 1, 0)), this.owner.transform.position = new Laya.Vector3(o.x, o.y, o.z)
        }
    }
    class i {
        constructor(t) {
            this._scale = new Laya.Vector3(1, 1, 1), this._centerMatrix = new Laya.Matrix4x4, this._attatched = !1, this._indexInCompound = -1, this._compoundParent = null, this._attatchedCollisionObject = null, this._referenceCount = 0, this._localOffset = new Laya.Vector3(0, 0, 0), this._localRotation = new Laya.Quaternion(0, 0, 0, 1), this.needsCustomCollisionCallback = !1, this._scale = new Laya.Vector3(1, 1, 1), this._centerMatrix = new Laya.Matrix4x4, this._attatched = !1, this._indexInCompound = -1, this._compoundParent = null, this._attatchedCollisionObject = null, this._referenceCount = 0, this._localOffset = new Laya.Vector3(0, 0, 0), this._localRotation = new Laya.Quaternion(0, 0, 0, 1), this.needsCustomCollisionCallback = !1, this._mass = t || 0
        }
        static __init__() {}
        static _createAffineTransformation(t, e, i) {
            var a = e.x,
                s = e.y,
                o = e.z,
                n = e.w,
                r = a + a,
                l = s + s,
                h = o + o,
                c = a * r,
                d = a * l,
                m = a * h,
                p = s * l,
                _ = s * h,
                g = o * h,
                y = n * r,
                u = n * l,
                w = n * h;
            i[0] = 1 - (p + g), i[1] = d + w, i[2] = m - u, i[3] = 0, i[4] = d - w, i[5] = 1 - (c + g), i[6] = _ + y, i[7] = 0, i[8] = m + u, i[9] = _ - y, i[10] = 1 - (c + p), i[11] = 0, i[12] = t.x, i[13] = t.y, i[14] = t.z, i[15] = 1
        }
        get type() {
            return this._type
        }
        get localOffset() {
            return this._localOffset
        }
        set localOffset(t) {
            this._localOffset = t, this._compoundParent && this._compoundParent._updateChildTransform(this)
        }
        get localRotation() {
            return this._localRotation
        }
        set localRotation(t) {
            this._localRotation = t, this._compoundParent && this._compoundParent._updateChildTransform(this)
        }
        set mass(t) {
            this._mass = t;
            let e = this._shapeBody;
            e && (e.mass = t, 0 == t && (e.type, CANNON.Body.STATIC))
        }
        get mass() {
            return this._mass
        }
        _setBodyType(t) {
            let e = this._shapeBody;
            e && (e.type = t)
        }
        _setScale(t) {
            this._compoundParent && this.updateLocalTransformations()
        }
        _addReference() {
            this._referenceCount++
        }
        _removeReference() {
            this._referenceCount--
        }
        updateLocalTransformations() {
            if (this._compoundParent) {
                var t = i._tempVector30;
                Laya.Vector3.multiply(this.localOffset, this._scale, t), i._createAffineTransformation(t, this.localRotation, this._centerMatrix.elements)
            } else i._createAffineTransformation(this.localOffset, this.localRotation, this._centerMatrix.elements)
        }
        cloneTo(t) {
            var e = t;
            this._localOffset.cloneTo(e.localOffset), this._localRotation.cloneTo(e.localRotation), e.localOffset = e.localOffset, e.localRotation = e.localRotation
        }
        clone() {
            return null
        }
        destroy() {}
    }
    i.SHAPEORIENTATION_UPX = 0, i.SHAPEORIENTATION_UPY = 1, i.SHAPEORIENTATION_UPZ = 2, i.SHAPETYPES_BOX = 0, i.SHAPETYPES_SPHERE = 1, i.SHAPETYPES_CYLINDER = 2, i.SHAPETYPES_CAPSULE = 3, i.SHAPETYPES_CONVEXHULL = 4, i.SHAPETYPES_COMPOUND = 5, i.SHAPETYPES_STATICPLANE = 6, i.SHAPETYPES_CONE = 7, i._tempVector30 = new Laya.Vector3;
    class a extends i {
        constructor(t = 1, e = 1, a = 1, s) {
            super(s), this._sizeX = 0, this._sizeY = 0, this._sizeZ = 0, this._sizeX = t, this._sizeY = e, this._sizeZ = a, this._type = i.SHAPETYPES_BOX;
            var o = new CANNON.Body({
                mass: s || 0,
                shape: new CANNON.Box(new CANNON.Vec3(t / 2, e / 2, a / 2))
            });
            this._shapeBody = o
        }
        static __init__() {}
        get sizeX() {
            return this._sizeX
        }
        get sizeY() {
            return this._sizeY
        }
        get sizeZ() {
            return this._sizeZ
        }
        clone() {
            var t = new a(this._sizeX, this._sizeY, this._sizeZ, this._mass);
            return this.cloneTo(t), t
        }
    }
    class s extends i {
        constructor(t = .5, e) {
            super(e), this._radius = 0, this._radius = t, this._type = i.SHAPETYPES_SPHERE;
            var a = new CANNON.Body({
                mass: e || 0,
                shape: new CANNON.Sphere(t)
            });
            this._shapeBody = a
        }
        get radius() {
            return this._radius
        }
        clone() {
            var t = new s(this._radius, this._mass);
            return this.cloneTo(t), t
        }
    }
    class o extends i {
        constructor(t, e) {
            super(t), this._convex = !1, this._mesh = null, this._convex = !1, this._mass = t || 0, this._scale = e
        }
        get mesh() {
            return this._mesh
        }
        set mesh(t) {
            if (this._mesh !== t) {
                if (this._mesh, t) {
                    var e = [];
                    t.getPositions(e);
                    let i = t.getIndices(),
                        a = this._scale.x,
                        s = this._scale.y,
                        o = this._scale.z,
                        n = [];
                    for (let t = 0; t < e.length; t++) {
                        let i = e[t];
                        n.push(i.x * a, i.y * s, i.z * o)
                    }
                    let r = [];
                    for (let t = 0; t < i.length; t += 3) r.push(i[t], i[t + 2], i[t + 1]);
                    let l = new(0, CANNON.Trimesh)(n, r);
                    this._shapeBody = new CANNON.Body({
                        mass: this._mass,
                        shape: l
                    })
                }
                this._mesh = t
            }
        }
        get convex() {
            return this._convex
        }
        set convex(t) {
            this._convex = t
        }
        _setScale(t) {
            this._compoundParent && this.updateLocalTransformations()
        }
        cloneTo(t) {
            var e = t;
            e.convex = this._convex, e.mesh = this._mesh, super.cloneTo(t)
        }
        clone() {
            var t = new o(this._mass);
            return this.cloneTo(t), t
        }
        destroy() {
            this._shapeBody && (this._shapeBody = null)
        }
    }
    class n extends Laya.Component {
        constructor(t, e) {
            super(), this._restitution = 0, this._friction = .5, this._rollingFriction = 0, this._ccdMotionThreshold = 0, this._ccdSweptSphereRadius = 0, this._collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, this._canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, this._transformFlag = 2147483647, this._enableProcessCollisions = !0, this._inPhysicUpdateListIndex = -1, this.canScaleShape = !0, this._enabled = !0, this._restitution = 0, this._friction = .5, this._rollingFriction = 0, this._ccdMotionThreshold = 0, this._ccdSweptSphereRadius = 0, this._collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, this._canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, this._colliderShape = null, this._transformFlag = 2147483647, this._enableProcessCollisions = !0, this._inPhysicUpdateListIndex = -1, this.canScaleShape = !0, this._collisionGroup = t, this._canCollideWith = e
        }
        static __init__() {}
        static _createAffineTransformationArray(t, e, i, a, s, o, n, r, l) {
            var h = a + a,
                c = s + s,
                d = o + o,
                m = a * h,
                p = a * c,
                _ = a * d,
                g = s * c,
                y = s * d,
                u = o * d,
                w = n * h,
                L = n * c,
                f = n * d,
                S = r[0],
                C = r[1],
                v = r[2];
            l[0] = (1 - (g + u)) * S, l[1] = (p + f) * S, l[2] = (_ - L) * S, l[3] = 0, l[4] = (p - f) * C, l[5] = (1 - (m + u)) * C, l[6] = (y + w) * C, l[7] = 0, l[8] = (_ + L) * v, l[9] = (y - w) * v, l[10] = (1 - (m + g)) * v, l[11] = 0, l[12] = t, l[13] = e, l[14] = i, l[15] = 1
        }
        static _creatShape(t, e, n) {
            var r;
            switch (t.type) {
                case "BoxColliderShape":
                    var l = t.size;
                    r = l ? new a(l[0] * n.x, l[1] * n.y, l[2] * n.z, e) : new a;
                    break;
                case "SphereColliderShape":
                    r = new s(t.radius * n.x, e);
                    break;
                case "MeshColliderShape":
                    var h = new o(e, n);
                    t.mesh && (h.mesh = Laya.Loader.getRes(t.mesh)), r = h;
                    break;
                default:
                    console.error("CannonPhysicsComponent._creatShape: unknown shape type.", t.type), r = new i(e)
            }
            if (t.center && r) {
                var c = r.localOffset;
                c.fromArray(t.center), r.localOffset = c
            }
            return r
        }
        static physicVector3TransformQuat(t, e, i, a, s, o) {
            var n = t.x,
                r = t.y,
                l = t.z,
                h = s * n + i * l - a * r,
                c = s * r + a * n - e * l,
                d = s * l + e * r - i * n,
                m = -e * n - i * r - a * l;
            o.x = h * s + m * -e + c * -a - d * -i, o.y = c * s + m * -i + d * -e - h * -a, o.z = d * s + m * -a + h * -i - c * -e
        }
        static physicQuaternionMultiply(t, e, i, a, s, o) {
            var n = s.x,
                r = s.y,
                l = s.z,
                h = s.w,
                c = e * l - i * r,
                d = i * n - t * l,
                m = t * r - e * n,
                p = t * n + e * r + i * l;
            o.x = t * h + n * a + c, o.y = e * h + r * a + d, o.z = i * h + l * a + m, o.w = a * h - p
        }
        get restitution() {
            return this._restitution
        }
        set restitution(t) {
            this._restitution = t
        }
        get friction() {
            return this._friction
        }
        set friction(t) {
            this._friction = t
        }
        get rollingFriction() {
            return this._rollingFriction
        }
        set rollingFriction(t) {
            this._rollingFriction = t
        }
        get ccdMotionThreshold() {
            return this._ccdMotionThreshold
        }
        set ccdMotionThreshold(t) {
            this._ccdMotionThreshold = t
        }
        get ccdSweptSphereRadius() {
            return this._ccdSweptSphereRadius
        }
        set ccdSweptSphereRadius(t) {
            this._ccdSweptSphereRadius = t
        }
        get isActive() {
            return !1
        }
        get enabled() {
            return super.enabled
        }
        set enabled(t) {
            this._enabled != t && (this._simulation && this._colliderShape && (t ? (this._derivePhysicsTransformation(!0), this._addToSimulation()) : this._removeFromSimulation()), super.enabled = t)
        }
        get colliderShape() {
            return this._colliderShape
        }
        set colliderShape(t) {
            var e = this._colliderShape;
            if (e && (e._attatched = !1, e._attatchedCollisionObject = null), this._colliderShape = t, t) {
                if (t._attatched) throw "CannonPhysicsComponent: this shape has attatched to other entity.";
                t._attatched = !0, t._attatchedCollisionObject = this
            }
        }
        get simulation() {
            return this._simulation
        }
        get collisionGroup() {
            return this._collisionGroup
        }
        set collisionGroup(t) {
            this._collisionGroup !== t && (this._collisionGroup = t, this._simulation && this._colliderShape && this._enabled && (this._removeFromSimulation(), this._addToSimulation(), this.colliderShape._shapeBody && (this.colliderShape._shapeBody.collisionFilterGroup = this._collisionGroup)))
        }
        get canCollideWith() {
            return this._canCollideWith
        }
        set canCollideWith(t) {
            this._canCollideWith !== t && (this._canCollideWith = t, this._simulation && this._colliderShape && this._enabled && (this._removeFromSimulation(), this._addToSimulation(), this.colliderShape._shapeBody && (this.colliderShape._shapeBody.collisionFilterMask = this._canCollideWith)))
        }
        _parseShape(t, e) {
            let i = this.owner.transform.getWorldLossyScale();
            if (1 === t.length) {
                var a = n._creatShape(t[0], e, i);
                this.colliderShape = a
            } else console.log("TODO: CompoundColliderShape");
            this.colliderShape._shapeBody && (n._physicObjectsMap[this.colliderShape._shapeBody.id] = this)
        }
        _onScaleChange(t) {
            this._colliderShape._setScale(t)
        }
        _onEnable() {
            let t = this.owner.scene;
            this._simulation = t.cannonSimulation, this.colliderShape._shapeBody && (this._simulation.addCannonBody(this.colliderShape._shapeBody), this._bodyInit())
        }
        _bodyInit() {
            let t = this.owner,
                e = t.transform.position,
                i = t.transform.rotation,
                a = this.colliderShape._shapeBody,
                s = this.colliderShape.localOffset;
            this.colliderShape._shapeBody.shapeOffsets = [new CANNON.Vec3(s.x, s.y, s.z)], a.position = new CANNON.Vec3(e.x, e.y, e.z), a.quaternion = new CANNON.Quaternion(i.x, i.y, i.z, i.w), a.computeAABB()
        }
        addTriggerEvent() {
            let t = this.colliderShape._shapeBody;
            this.funcTriggered = this._onTriggered.bind(this);
            for (let e = 0; e < t.shapes.length; e++) t.shapes[e].addEventListener("triggered", this.funcTriggered)
        }
        addColliderEvent() {
            this.funcCollide = this._onCollde.bind(this), this.colliderShape._shapeBody.addEventListener("collide", this.funcCollide)
        }
        removeEvent() {
            let t = this.colliderShape._shapeBody;
            if (this.funcTriggered) {
                for (let e = 0; e < t.shapes.length; e++) t.shapes[e].removeEventListener("triggered", this.funcTriggered);
                this.funcTriggered = null
            }
            this.funcCollide && (this.colliderShape._shapeBody.removeEventListener("collide", this.funcCollide), this.funcCollide = null)
        }
        _onTriggered(t) {
            let e = n._physicObjectsMap[t.selfShape.body.id],
                i = n._physicObjectsMap[t.otherShape.body.id];
            this.simulation.emitEvent(e, i, t.event)
        }
        _onCollde(t) {
            let e = n._physicObjectsMap[t.selfShape.body.id],
                i = n._physicObjectsMap[t.otherShape.body.id];
            this.simulation.emitEvent(e, i, t.event)
        }
        _onDisable() {
            this._colliderShape && this._enabled && (this._removeFromSimulation(), -1 !== this._inPhysicUpdateListIndex && this._simulation._physicsUpdateList.remove(this))
        }
        _onDestroy() {
            this._colliderShape._shapeBody && (this.removeEvent(), delete n._physicObjectsMap[this._colliderShape._shapeBody.id], this.simulation.world.remove(this._colliderShape._shapeBody)), this._colliderShape.destroy(), this._colliderShape = null, this._simulation = null, this.owner.transform.off(Laya.Event.TRANSFORM_CHANGED, this, this._onTransformChanged)
        }
        _isValid() {
            return this._simulation && this._colliderShape && this._enabled
        }
        _parse(t) {
            null != t.collisionGroup && (this.collisionGroup = t.collisionGroup), null != t.canCollideWith && (this.canCollideWith = t.canCollideWith), null != t.ccdMotionThreshold && (this.ccdMotionThreshold = t.ccdMotionThreshold), null != t.ccdSweptSphereRadius && (this.ccdSweptSphereRadius = t.ccdSweptSphereRadius)
        }
        _setTransformFlag(t, e) {
            e ? this._transformFlag |= t : this._transformFlag &= ~t
        }
        _getTransformFlag(t) {
            return 0 != (this._transformFlag & t)
        }
        _addToSimulation() {}
        _removeFromSimulation() {}
        _derivePhysicsTransformation(t) {
            this._innerDerivePhysicsTransformationCannon(t)
        }
        _innerDerivePhysicsTransformationCannon(t) {
            var e = this.owner;
            let i = Laya.Transform3D;
            var a = e._transform;
            let s = this.colliderShape._shapeBody;
            if (s) {
                if (t || this._getTransformFlag(i.TRANSFORM_WORLDPOSITION)) {
                    var o = this._colliderShape.localOffset,
                        n = a.position;
                    0 !== o.x || 0 !== o.y || o.z, s.position = new CANNON.Vec3(n.x, n.y, n.z), this._setTransformFlag(i.TRANSFORM_WORLDPOSITION, !1)
                }
                if (t || this._getTransformFlag(i.TRANSFORM_WORLDQUATERNION)) {
                    var r = this._colliderShape.localRotation,
                        l = a.rotation;
                    0 !== r.x || 0 !== r.y || 0 !== r.z || r.w, s.quaternion = new CANNON.Quaternion(l.x, l.y, l.z, l.w), this._setTransformFlag(i.TRANSFORM_WORLDQUATERNION, !1)
                }(t || this._getTransformFlag(i.TRANSFORM_WORLDSCALE)) && (this._onScaleChange(a.getWorldLossyScale()), this._setTransformFlag(i.TRANSFORM_WORLDSCALE, !1)), s.computeAABB()
            }
        }
        _updateTransformComponent() {
            let t = this.owner,
                e = this._colliderShape._shapeBody;
            if (e && !e.isSleeping()) {
                let o = e.position,
                    n = e.quaternion;
                var i = t._transform,
                    a = i.position,
                    s = i.rotation;
                a.x = o.x, a.y = o.y, a.z = o.z, s.x = n.x, s.y = n.y, s.z = n.z, s.w = n.w, i.position = a, i.rotation = s
            }
        }
        _onShapeChange(t) {}
        _onAdded() {
            this.enabled = this._enabled, this.restitution = this._restitution, this.friction = this._friction, this.rollingFriction = this._rollingFriction, this.ccdMotionThreshold = this._ccdMotionThreshold, this.ccdSweptSphereRadius = this._ccdSweptSphereRadius, this.owner.transform.on(Laya.Event.TRANSFORM_CHANGED, this, this._onTransformChanged)
        }
        _onTransformChanged(t) {
            if (n._addUpdateList) {
                let e = Laya.Transform3D;
                (t &= e.TRANSFORM_WORLDPOSITION | e.TRANSFORM_WORLDQUATERNION | e.TRANSFORM_WORLDSCALE) && (this._transformFlag |= t, this._isValid() && -1 === this._inPhysicUpdateListIndex && this._simulation._physicsUpdateList.add(this))
            }
        }
        _cloneTo(t) {
            var e = t;
            e.restitution = this._restitution, e.friction = this._friction, e.rollingFriction = this._rollingFriction, e.ccdMotionThreshold = this._ccdMotionThreshold, e.ccdSweptSphereRadius = this._ccdSweptSphereRadius, e.collisionGroup = this._collisionGroup, e.canCollideWith = this._canCollideWith, e.canScaleShape = this.canScaleShape, this._colliderShape && (e.colliderShape = this._colliderShape.clone()), e.colliderShape._shapeBody && (n._physicObjectsMap[e.colliderShape._shapeBody.id] = e)
        }
    }
    n._physicObjectsMap = {}, n._addUpdateList = !0;
    class r extends n {
        constructor(t, e) {
            super(t, e), this._isTrigger = !1, this._isTrigger = !1
        }
        get isTrigger() {
            return this._isTrigger
        }
        set isTrigger(t) {
            this._isTrigger = t, this.colliderShape && this.colliderShape._shapeBody && (this.colliderShape._shapeBody.hasTrigger = t, this.colliderShape._shapeBody.collisionResponse = !t)
        }
        _onEnable() {
            super._onEnable(), this.isTrigger = this._isTrigger, this._isTrigger ? this.addTriggerEvent() : this.addColliderEvent()
        }
        _cloneTo(t) {
            super._cloneTo(t), t.isTrigger = this._isTrigger
        }
    }
    class l extends r {
        constructor(t = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, e = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            super(t, e), this._isKinematic = !1, this._mass = 1, this._gravity = new Laya.Vector3(0, -10, 0), this._angularDamping = 0, this._linearDamping = 0, this._overrideGravity = !1, this._totalTorque = new Laya.Vector3(0, 0, 0), this._totalForce = new Laya.Vector3(0, 0, 0), this._linearVelocity = new Laya.Vector3, this._angularVelocity = new Laya.Vector3, this._linearFactor = new Laya.Vector3(1, 1, 1), this._angularFactor = new Laya.Vector3(1, 1, 1), this._detectCollisions = !0, this._isKinematic = !1, this._mass = 1, this._gravity = new Laya.Vector3(0, -10, 0), this._angularDamping = 0, this._linearDamping = 0, this._overrideGravity = !1, this._totalTorque = new Laya.Vector3(0, 0, 0), this._totalForce = new Laya.Vector3(0, 0, 0), this._linearVelocity = new Laya.Vector3, this._angularVelocity = new Laya.Vector3, this._linearFactor = new Laya.Vector3(1, 1, 1), this._angularFactor = new Laya.Vector3(1, 1, 1), this._detectCollisions = !0
        }
        static __init__() {}
        get mass() {
            return this._mass
        }
        set mass(t) {
            t = Math.max(t, 1e-7), this._mass = t, this._isKinematic || this._updateMass(t)
        }
        get isKinematic() {
            return this._isKinematic
        }
        set isKinematic(t) {
            this._isKinematic = t, 0 == this._mass ? this.colliderShape._setBodyType(CANNON.Body.STATIC) : t ? this.colliderShape._setBodyType(CANNON.Body.KINEMATIC) : this.colliderShape._setBodyType(CANNON.Body.DYNAMIC)
        }
        get linearDamping() {
            return this._linearDamping
        }
        set linearDamping(t) {
            this._linearDamping = t;
            let e = this.colliderShape._shapeBody;
            e && (e.linearDamping = t)
        }
        get angularDamping() {
            return this._angularDamping
        }
        set angularDamping(t) {
            this._angularDamping = t;
            let e = this.colliderShape._shapeBody;
            e && (e.angularDamping = t)
        }
        get overrideGravity() {
            return this._overrideGravity
        }
        set overrideGravity(t) {
            this._overrideGravity = t, this.colliderShape && this.colliderShape._shapeBody && (this.colliderShape._shapeBody.useGravity = !t)
        }
        get gravity() {
            return this._gravity
        }
        set gravity(t) {
            this._gravity = t
        }
        get totalForce() {
            return null
        }
        get linearFactor() {
            return this._linearFactor
        }
        set linearFactor(t) {
            this._linearFactor = t, this.colliderShape && this.colliderShape._shapeBody && (this.colliderShape._shapeBody.linearFactor = new CANNON.Vec3(t.x, t.y, t.z))
        }
        get linearVelocity() {
            return this._linearVelocity
        }
        set linearVelocity(t) {
            this._linearVelocity = t
        }
        get angularFactor() {
            return this._angularFactor
        }
        set angularFactor(t) {
            this._angularFactor = t;
            let e = this.colliderShape._shapeBody;
            e && (e.angularFactor = new CANNON.Vec3(t.x, t.y, t.z))
        }
        get angularVelocity() {
            let t = this.colliderShape._shapeBody;
            return t && (this._angularVelocity = new Laya.Vector3(t.angularVelocity.x, t.angularVelocity.y, t.angularVelocity.z)), this._angularVelocity
        }
        set angularVelocity(t) {
            this._angularVelocity = t;
            let e = this.colliderShape._shapeBody;
            e && (e.angularVelocity = new CANNON.Vec3(t.x, t.y, t.z))
        }
        get totalTorque() {
            return null
        }
        get detectCollisions() {
            return this._detectCollisions
        }
        set detectCollisions(t) {
            this._detectCollisions !== t && (this._detectCollisions = t, this._colliderShape && this._enabled && this._simulation && (this._simulation._removeRigidBody(this), this._simulation._addRigidBody(this, this._collisionGroup, t ? this._canCollideWith : 0)))
        }
        get isSleeping() {
            let t = this.colliderShape._shapeBody;
            return !!t && t.isSleeping()
        }
        get sleepLinearVelocity() {
            return null
        }
        set sleepLinearVelocity(t) {}
        get sleepAngularVelocity() {
            return null
        }
        set sleepAngularVelocity(t) {}
        _updateMass(t) {
            this._colliderShape && (this._colliderShape.mass = t)
        }
        _onScaleChange(t) {
            super._onScaleChange(t), this._updateMass(this._isKinematic ? 0 : this._mass)
        }
        _onAdded() {
            super._onAdded()
        }
        _onEnable() {
            super._onEnable(), this._simulation._characters.push(this), this.mass = this._mass, this.linearFactor = this._linearFactor, this.angularFactor = this._angularFactor, this.linearDamping = this._linearDamping, this.angularDamping = this._angularDamping, this.overrideGravity = this._overrideGravity, this.gravity = this._gravity, this.isKinematic = this._isKinematic
        }
        _onShapeChange(t) {
            super._onShapeChange(t), this._isKinematic ? this._updateMass(0) : this._updateMass(this._mass)
        }
        _parse(t) {
            if (super._parse(t), this._parseShape(t.shapes, this._mass), null != t.friction && (this.friction = t.friction), null != t.rollingFriction && (this.rollingFriction = t.rollingFriction), null != t.restitution && (this.restitution = t.restitution), null != t.isTrigger && (this.isTrigger = t.isTrigger), null != t.mass && (this.mass = t.mass), null != t.isKinematic && (this.isKinematic = t.isKinematic), null != t.linearDamping && (this.linearDamping = t.linearDamping), null != t.angularDamping && (this.angularDamping = t.angularDamping), null != t.overrideGravity && (this.overrideGravity = t.overrideGravity), null != t.linearFactor) {
                var e = this.linearFactor;
                e.fromArray(t.linearFactor), this.linearFactor = e
            }
            if (null != t.angularFactor) {
                var i = this.angularFactor;
                i.fromArray(t.angularFactor), this.angularFactor = i
            }
            t.gravity && (this.gravity.fromArray(t.gravity), this.gravity = this.gravity)
        }
        _onDestroy() {
            super._onDestroy(), this._gravity = null, this._totalTorque = null, this._linearVelocity = null, this._angularVelocity = null, this._linearFactor = null, this._angularFactor = null
        }
        _addToSimulation() {
            this._simulation._addRigidBody(this, this._collisionGroup, this._detectCollisions ? this._canCollideWith : 0)
        }
        _removeFromSimulation() {
            this._simulation._removeRigidBody(this)
        }
        _cloneTo(t) {
            super._cloneTo(t);
            var e = t;
            e.isKinematic = this._isKinematic, e.mass = this._mass, e.gravity = this._gravity, e.angularDamping = this._angularDamping, e.linearDamping = this._linearDamping, e.overrideGravity = this._overrideGravity, e.linearVelocity = this._linearVelocity, e.angularVelocity = this._angularVelocity, e.linearFactor = this._linearFactor, e.angularFactor = this._angularFactor, e.detectCollisions = this._detectCollisions
        }
        applyForce(t, e = null) {}
        applyTorque(t) {}
        applyImpulse(t, e = null) {}
        applyTorqueImpulse(t) {}
        wakeUp() {}
        clearForces() {}
    }
    l.TYPE_STATIC = 0, l.TYPE_DYNAMIC = 1, l.TYPE_KINEMATIC = 2, l._BT_DISABLE_WORLD_GRAVITY = 1, l._BT_ENABLE_GYROPSCOPIC_FORCE = 2;
    class h extends Laya.Script3D {
        constructor() {
            super(), this.ismove = !1, this.speed = 1, this.ismove = !1
        }
        run() {
            this.owner.getComponent(Laya.Animator).play("run"), u.gameball.getComponent(l).linearFactor = new Laya.Vector3(0, 0, 1), this.ismove = !0
        }
        stop() {
            this.ismove = !1
        }
        onUpdate() {
            this.ismove && (this.owner.transform.position.z > u.Middlelist.getChildByName("End").transform.position.z && (this.ismove = !1), this.owner.transform.translate(new Laya.Vector3(0, 0, this.speed * Laya.timer.delta / 1e3), !1), u.gamecamera.transform.translate(new Laya.Vector3(0, 0, this.speed * Laya.timer.delta / 1e3), !1))
        }
    }
    class c {
        constructor() {
            this.IOSAudio = null, this.Base_nc_Path = "res/sound/", this.Music_nc_Ctxs = [], this.Music_nc_Files = ["bg", "win", "win2", "btn", "lose", "jie", "ti"]
        }
        static get Ins() {
            return c._Ins || (c._Ins = new c), c._Ins
        }
        init() {
            for (var t = "", e = this.Music_nc_Files, i = this.Music_nc_Files.length, a = 0; a < i; a++) {
                t = e[a];
                var s = new Laya.SoundChannel;
                s.url = this.Base_nc_Path + t + ".mp3", "ride" == t && (s.loops = 0), Laya.SoundManager.addChannel(s), this.Music_nc_Ctxs[t] = !0
            }
        }
        play_Sound(t, e = 1) {
            this.Music_nc_Ctxs[t] && u.GameStorage_Ins().get_isopensound() && (Laya.WebAudioSound.webAudioEnabled ? (console.log("是WebAudio"), Laya.SoundManager.playSound(this.Base_nc_Path + t + ".mp3", e, null, Laya.WebAudioSound, 0)) : (console.log("不是WebAudio"), Laya.SoundManager.playSound(this.Base_nc_Path + t + ".mp3", e, null, null, 0)))
        }
        stop_Sound(t) {
            this.Music_nc_Ctxs[t] && Laya.SoundManager.stopSound(this.Base_nc_Path + t + ".mp3")
        }
    }
    class d extends Laya.Script {
        constructor() {
            super(), this.daltatime = 0, this.mouselimit = 25, this.looktime = 0, this.onmousedown = !1, this.initdata(), this.init_Event()
        }
        initdata() {
            this.daltatime = 0
        }
        init_Event() {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown)
        }
        onMouseDown(t) {
            if (0 != u.canmouse) {
                window.wx && u.GameStorage_Ins().get_isopenshock() && window.wx.vibrateLong(), this.onmousedown = !0, Laya.timer.scale = .2, this.daltatime = 0, this.mousepos = new Laya.Vector2(t.stageX, t.stageY), u.gameposlist = [], u.startselectpos = u.gameplayer.transform.position, u.endselectpos = u.middlelistpos[u.middleselectindex + 1], u.mouseselectstartpos = new Laya.Vector3(u.startselectpos.x, u.startselectpos.y, u.startselectpos.z), u.mouseselectendpos = new Laya.Vector3(u.endselectpos.x, u.endselectpos.y, u.endselectpos.z);
                for (var i = u.gamescene3d.getChildByName("dian"), a = u.GameStorage_Ins().bae3list(u.startselectpos, u.mouseselectstartpos, u.mouseselectendpos, u.endselectpos, 20, 0), s = 0; s < a.length - 1; s++) {
                    var o = i.clone();
                    o.transform.position = new Laya.Vector3(a[s].x, o.transform.position.y, a[s].z), u.gameposobjlist.addChild(o), u.gameposlist.push(o)
                }
                this.looktime = 0, u.gamecamera.getComponent(e).mousedown = !0, Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp)
            }
        }
        onMouseMove(t) {
            if (0 != u.canmouse) {
                if (u.middleselectindex + 1 == u.middlelistpos.length - 1) {
                    var e = u.endselectpos.x + (t.stageX - this.mousepos.x) / 40;
                    e > 5 ? e = 5 : e < -5 && (e = -5), u.endselectpos = new Laya.Vector3(e, u.endselectpos.y, u.endselectpos.z)
                }
                var i = u.mouseselectstartpos.x + (t.stageX - this.mousepos.x) / 10;
                i < -this.mouselimit ? i = -this.mouselimit : i > this.mouselimit && (i = this.mouselimit), u.mouseselectstartpos = new Laya.Vector3(i, u.mouseselectstartpos.y, u.mouseselectstartpos.z);
                var a = u.mouseselectendpos.x + (t.stageX - this.mousepos.x) / 10;
                a < -this.mouselimit ? a = -this.mouselimit : a > this.mouselimit && (a = this.mouselimit), u.mouseselectendpos = new Laya.Vector3(a, u.mouseselectendpos.y, u.mouseselectendpos.z), this.mousepos = new Laya.Vector2(t.stageX, t.stageY)
            } else this.mousepos = new Laya.Vector2(t.stageX, t.stageY)
        }
        onMouseUp() {
            this.onmousedown = !1, 0 != u.canmouse && (u.gamecamera.getComponent(e).mousedown = !1, u.middleselectindex + 1 == u.middlelistpos.length - 1 ? (Laya.timer.scale = .5, Laya.lateTimer.scale = .5) : Laya.timer.scale = 1, u.gameposobjlist.removeChildren(), u.gameplayer.getComponent(h).stop(), u.gameplayer.getComponent(Laya.Animator).play("shemen"), Laya.timer.once(500, this, function() {
                u.gamecamera.getComponent(e).looktime = 0, u.gamecamera.getComponent(e).cameramove = !0, u.ballismove = !0, c.Ins.play_Sound("ti")
            }), u.canmouse = !1, Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUp))
        }
        onLateUpdate() {
            if (this.daltatime += Laya.lateTimer.delta / 1e3 * 2, this.daltatime > 1 && (this.daltatime = 0), u.gameposlist.length > 0)
                for (var t = u.GameStorage_Ins().bae3list(u.startselectpos, u.mouseselectstartpos, u.mouseselectendpos, u.endselectpos, 20, this.daltatime), e = 0; e < u.gameposlist.length; e++) u.gameposlist[e].transform.position = new Laya.Vector3(t[e].x, u.gameposlist[e].transform.position.y, t[e].z);
            if (this.onmousedown && u.mouseselectendpos) {
                this.looktime += Laya.lateTimer.delta / 1e3, this.looktime > 1 && (this.looktime = 1);
                var i = new Laya.Vector3(u.gameball.transform.position.x, u.gameball.transform.position.y, u.gameball.transform.position.z + 20),
                    a = u.GameStorage_Ins().bae1(i, u.mouseselectendpos, this.looktime);
                u.gamecamera.transform.lookAt(a, new Laya.Vector3(0, 1, 0))
            }
        }
        onUpdate() {}
    }
    class m extends Laya.Script3D {
        constructor() {
            super(), this.ismove = !1, this.movetype = 0, this.speed = 1, this.defensivetime = 0, this.seeball = !1, this.isstop = !1, this.ActionGroup = 0, this.attackball = 0
        }
        init(t, e, i) {
            this.ismove = !1, this.seeball = !1, this.movetype = e, this.isstop = !1, this.speed = t, this.attackball = 0, this.ActionGroup = i, this.defensivetime = 0
        }
        attacttype() {
            var t = new Laya.Vector3(u.gameball.transform.position.x, this.owner.transform.position.y, u.gameball.transform.position.z);
            this.owner.transform.lookAt(t, new Laya.Vector3(0, 1, 0)), this.owner.transform.rotationEuler = new Laya.Vector3(this.owner.transform.rotationEuler.x, this.owner.transform.rotationEuler.y + 180, this.owner.transform.rotationEuler.z), this.owner.transform.translate(new Laya.Vector3(0, 0, this.speed * Laya.timer.delta / 1e3), !0), this.owner.getComponent(Laya.Animator).play("run")
        }
        idletype() {}
        defensivetype() {
            this.defensivetime += Laya.timer.delta / 1e3, this.defensivetime > 2 && (this.defensivetime = -2, this.speed = -this.speed), this.speed > 0 ? this.owner.getComponent(Laya.Animator).play("turn right") : this.speed < 0 && this.owner.getComponent(Laya.Animator).play("turn left"), this.owner.transform.translate(new Laya.Vector3(this.speed * Laya.timer.delta / 1e3, 0, 0), !0)
        }
        onUpdate() {
            if (0 != u.inplaygame && 0 == this.isstop && this.ActionGroup == u.gameAIactivegroup)
                if (0 == this.seeball) {
                    if (Laya.Vector3.distance(this.owner.transform.position, u.gameball.transform.position) < 6 + u.GameStorage_Ins().get_gameid() % 4) {
                        this.seeball = !0;
                        var t = 1;
                        return 2 == this.movetype && (t = 0), this.lookatball = new Laya.Vector3(u.gameball.transform.position.x, this.owner.transform.position.y, u.gameball.transform.position.z + t), this.owner.transform.lookAt(this.lookatball, new Laya.Vector3(0, 1, 0)), this.owner.transform.rotationEuler = new Laya.Vector3(this.owner.transform.rotationEuler.x, this.owner.transform.rotationEuler.y + 180, this.owner.transform.rotationEuler.z), this.attackball = 0, void this.owner.getComponent(Laya.Animator).crossFade("chanqiu", .5)
                    }
                    switch (this.movetype) {
                        case 0:
                            this.idletype();
                            break;
                        case 1:
                            this.defensivetype();
                            break;
                        case 2:
                            this.attacttype()
                    }
                } else this.attackball <= .5 ? (this.attackball += Laya.timer.delta / 1e3, this.owner.transform.translate(new Laya.Vector3(0, 0, (10 + u.GameStorage_Ins().get_gameid() % 4 * 2) * Laya.timer.delta / 1e3), !0)) : this.isstop = !0
        }
    }
    class p extends Laya.Script3D {
        constructor() {
            super(), this.movetype = 0, this.speed = 1, this.defensivetime = 0, this.ActionGroup = 0, this.seeball = !1, this.isstop = !1
        }
        init(t, e, i) {
            this.movetype = e, this.speed = t, this.seeball = !1, this.isstop = !1, this.ActionGroup = i, this.defensivetime = 0
        }
        onUpdate() {
            if (0 == this.isstop && this.ActionGroup == u.gameAIactivegroup) {
                var t = Laya.Vector3.distance(this.owner.transform.position, u.gameball.transform.position);
                if (0 == this.seeball) {
                    if (t < 15) return this.seeball = !0, this.attackball = 0, void(this.owner.transform.position.x < u.endselectpos.x ? this.owner.getComponent(Laya.Animator).crossFade("puqiu2", .5) : this.owner.getComponent(Laya.Animator).crossFade("puqiu", .5));
                    if (this.owner.transform.position.x - u.endselectpos.x > 1) this.speed = Math.abs(this.speed), this.speed > 0 ? this.owner.getComponent(Laya.Animator).play("turn right") : this.speed < 0 && this.owner.getComponent(Laya.Animator).play("turn left"), this.owner.transform.translate(new Laya.Vector3(this.speed * Laya.timer.delta / 1e3, 0, 0), !0);
                    else if (this.owner.transform.position.x - u.endselectpos.x < -1) this.speed = -Math.abs(this.speed), this.speed > 0 ? this.owner.getComponent(Laya.Animator).play("turn right") : this.speed < 0 && this.owner.getComponent(Laya.Animator).play("turn left"), this.owner.transform.translate(new Laya.Vector3(this.speed * Laya.timer.delta / 1e3, 0, 0), !0);
                    else if (0 == this.seeball) switch (this.movetype) {
                        case 0:
                            this.idletype();
                            break;
                        case 1:
                            this.defensivetype();
                            break;
                        case 2:
                            this.attacttype()
                    }
                } else if (this.attackball <= .7) {
                    if (this.attackball += Laya.timer.delta / 1e3, Math.abs(this.owner.transform.position.x - u.endselectpos.x) > Math.abs(this.speed)) {
                        var e = this.speed;
                        this.seeball && (e = 3 * this.speed)
                    } else {
                        e = this.owner.transform.position.x - u.endselectpos.x;
                        this.seeball && (e = 3 * (this.owner.transform.position.x - u.endselectpos.x))
                    }
                    this.owner.transform.translate(new Laya.Vector3(-e * Laya.timer.delta / 1e3, 0, 0), !1)
                } else this.isstop = !0
            }
        }
        attacttype() {
            this.owner.transform.lookAt(u.gameball.transform.position, new Laya.Vector3(0, 1, 0)), this.owner.transform.translate(new Laya.Vector3(0, 0, -this.speed * Laya.timer.delta / 1e3), !0)
        }
        idletype() {}
        defensivetype() {
            this.defensivetime += Laya.timer.delta / 1e3, this.defensivetime > 2 && (this.defensivetime = -2, this.speed = -this.speed), this.speed > 0 ? this.owner.getComponent(Laya.Animator).play("turn right") : this.speed < 0 && this.owner.getComponent(Laya.Animator).play("turn left");
            var t = this.speed;
            this.owner.transform.translate(new Laya.Vector3(t * Laya.timer.delta / 1e3, 0, 0), !0)
        }
    }
    class _ extends r {
        constructor(t = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, e = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            super(t, e), this._enableProcessCollisions = !1
        }
        _addToSimulation() {
            this._simulation._addPhysicsCollider(this, this._collisionGroup, this._canCollideWith)
        }
        _removeFromSimulation() {
            this._simulation._removePhysicsCollider(this)
        }
        _parse(t) {
            null != t.friction && (this.friction = t.friction), null != t.rollingFriction && (this.rollingFriction = t.rollingFriction), null != t.restitution && (this.restitution = t.restitution), null != t.isTrigger && (this.isTrigger = t.isTrigger), super._parse(t), this._parseShape(t.shapes)
        }
        _onAdded() {
            super._onAdded()
        }
    }
    class g {
        static CreateAI_Ins() {
            return null == g.Ins && (g.Ins = new g), g.Ins
        }
        createteam() {
            for (var t = 0; t < u.Middlelist.numChildren - 2; t++) {
                var e = "Player" + (Math.floor(5 * Math.random()) + 1),
                    i = u.gamescene3d.getChildByName(e),
                    a = new Laya.Sprite3D;
                if (u.AIlist.addChild(a), t == u.Middlelist.numChildren - 3) {
                    a.transform.localPosition = new Laya.Vector3(0, 0, 31 * (t + 1));
                    var s = new Laya.Vector3(0, 0, 0),
                        o = Laya.Sprite3D.instantiate(i);
                    a.addChild(o), o.transform.localPosition = s, o.transform.rotationEuler = new Laya.Vector3(0, 180, 0), o.name = "AI_G" + t + "_0", o.addComponent(p).init(2, 1, t)
                } else {
                    switch (a.transform.localPosition = new Laya.Vector3(0, 0, 32 * t + 10), Math.floor(5 * Math.random())) {
                        case 0:
                            this.create1(a, i, t);
                            break;
                        case 1:
                            this.create2(a, i, t);
                            break;
                        case 2:
                            this.create3(a, i, t);
                            break;
                        case 3:
                            this.create4(a, i, t);
                            break;
                        case 4:
                            this.create5(a, i, t);
                            break;
                        case 5:
                            this.create1(a, i, t)
                    }
                }
            }
        }
        create1(t, e, i) {
            for (var a = 0; a < 5; a++) {
                var s = new Laya.Vector3(7 * (a - 2), 0, a + 5),
                    o = Laya.Sprite3D.instantiate(e);
                t.addChild(o), o.transform.localPosition = s, o.transform.rotationEuler = new Laya.Vector3(0, 180, 0), o.name = "AI" + i + "_" + a, o.addComponent(m).init(2, 0, i), o.getComponent(Laya.Animator).play("stand"), o.getChildByName("Role_01").getComponent(_).collisionGroup = 2, o.getChildByName("Role_01").getComponent(_).canCollideWith = 1
            }
        }
        create2(t, e, i) {
            for (var a = 0; a < 8; a++) {
                var s = new Laya.Vector3(10 * (a % 4 - 1.5), 0, 3 * Math.floor(a / 4)),
                    o = Laya.Sprite3D.instantiate(e);
                t.addChild(o), o.transform.localPosition = s, o.transform.rotationEuler = new Laya.Vector3(0, 180, 0), o.name = "AI" + i + "_" + a;
                var n = o.addComponent(m);
                Math.floor(a / 5) % 2 == 0 ? n.init(2, 1, i) : n.init(-2, 1, i), o.getComponent(Laya.Animator).play("stand"), o.getChildByName("Role_01").getComponent(_).collisionGroup = 2, o.getChildByName("Role_01").getComponent(_).canCollideWith = 1
            }
        }
        create3(t, e, i) {
            for (var a = 0; a < 8; a++) {
                var s = new Laya.Vector3(8 * (Math.floor(a / 2) - 1.5), 0, (a % 2 - 2) * (2 + Math.floor(a / 2) % 2) + 5),
                    o = Laya.Sprite3D.instantiate(e);
                t.addChild(o), o.transform.localPosition = s, o.transform.rotationEuler = new Laya.Vector3(0, 180, 0), o.name = "AI" + i + "_" + a;
                var n = o.addComponent(m);
                Math.floor(a / 5) % 2 == 0 ? n.init(2, 1, i) : n.init(-2, 1, i), o.getComponent(Laya.Animator).play("stand"), o.getChildByName("Role_01").getComponent(_).collisionGroup = 2, o.getChildByName("Role_01").getComponent(_).canCollideWith = 1
            }
        }
        create4(t, e, i) {
            for (var a = 0; a < 6; a++) {
                var s = new Laya.Vector3;
                s = a % 2 == 0 ? new Laya.Vector3(5 * (3 - Math.floor(a / 2)), 0, 3 * Math.floor(a / 2)) : new Laya.Vector3(-5 * (3 - Math.floor(a / 2)), 0, 3 * Math.floor(a / 2));
                var o = Laya.Sprite3D.instantiate(e);
                t.addChild(o), o.transform.localPosition = s, o.transform.rotationEuler = new Laya.Vector3(0, 180, 0), o.name = "AI" + i + "_" + a;
                var n = o.addComponent(m);
                4 == a || 9 == a ? n.init(2, 2, i) : Math.floor(a / 5) % 2 == 0 ? n.init(2, 1, i) : n.init(-2, 1, i), o.getComponent(Laya.Animator).play("stand"), o.getChildByName("Role_01").getComponent(_).collisionGroup = 2, o.getChildByName("Role_01").getComponent(_).canCollideWith = 1
            }
        }
        create5(t, e, i) {
            for (var a = 0; a < 15; a++) {
                var s = new Laya.Vector3(6 * (a % 5 - 2), 0, 3 * Math.floor(a / 5)),
                    o = Laya.Sprite3D.instantiate(e);
                t.addChild(o), o.transform.localPosition = s, o.transform.rotationEuler = new Laya.Vector3(0, 180, 0), o.name = "AI" + i + "_" + a;
                var n = o.addComponent(m);
                a < 5 ? n.init(2, 2, i) : Math.floor(a / 5) % 2 == 0 ? n.init(2, 1, i) : n.init(-2, 1, i), o.getComponent(Laya.Animator).play("stand"), o.getChildByName("Role_01").getComponent(_).collisionGroup = 2, o.getChildByName("Role_01").getComponent(_).canCollideWith = 1
            }
        }
        createplays() {
            for (var t = 0; t < u.Middlelist.numChildren - 2; t++) {
                var e = Laya.Sprite3D.instantiate(u.gamerole);
                u.Playerlist.addChild(e);
                var i = 10 * Math.random();
                Math.random() < .5 && (i = -i), 0 == t && (i = 0), e.transform.localPosition = new Laya.Vector3(i, 0, 32 * t), e.transform.rotationEuler = new Laya.Vector3(0, 0, 0), e.name = "player" + t, e.getComponent(Laya.Animator).play("fanxiang idle"), e.addComponent(h), 0 == t && (u.gameplayer = e, e.getComponent(Laya.Animator).play("idle")), e.getChildByName("Role_01").getComponent(_).collisionGroup = 2, e.getChildByName("Role_01").getComponent(_).canCollideWith = 1
            }
        }
    }
    class y extends Laya.Script3D {
        constructor() {
            super(), this.movetime = 0, this.wintime = 0
        }
        init() {
            this.owner.getComponent(l).linearFactor = new Laya.Vector3(0, 0, 1), this.owner.getComponent(l).linearDamping = .9, this.owner.transform.position = new Laya.Vector3(u.middlelistpos[0].x, this.owner.transform.position.y, u.middlelistpos[0].z + 1), this.turntime = 1, this.isturn = !1, this.wintime = 0
        }
        movepos(t) {
            if (t > 1)
                if (t = 1, this.movetime = 0, u.ballismove = !1, u.middleselectindex < u.middlelistpos.length - 2) u.gamecamera.getComponent(d).onmousedown = !1, u.middleselectindex++;
                else {
                    u.inplaygame = !1, u.canmouse = !1, u.middleselectindex = 0, u.gamecamera.getComponent(e).followplayer = 0;
                    for (var i = 0; i < u.AIlist.numChildren; i++)
                        for (var a = 0; a < u.AIlist.getChildAt(i).numChildren; a++) u.AIlist.getChildAt(i).getChildAt(a).getComponent(Laya.Animator).crossFade("lose", .5);
                    u.gameplayer.getComponent(Laya.Animator).crossFade("win", .5);
                    var s = Laya.Sprite3D.instantiate(u.FX_win);
                    u.Middlelist.getChildByName("End").addChild(s), s.transform.localPosition = new Laya.Vector3(0, 0, 10), console.log("过关"), u.GameStorage_Ins().set_win(u.GameStorage_Ins().get_win() + 1), u.GameStorage_Ins().get_win() >= 3 && (u.GameStorage_Ins().set_lose(0), u.GameStorage_Ins().set_win(0), u.GameStorage_Ins().set_gameid(u.GameStorage_Ins().get_gameid() + 1)), Laya.timer.scale = 1, Laya.lateTimer.scale = 1, window.wx && u.GameStorage_Ins().get_isopenshock() && window.wx.vibrateLong(), this.owner.getChildByName("Fx_FireGoal").particleSystem.play();
                    var o = function() {
                        this.owner.transform.translate(new Laya.Vector3(0, 0, 2 * Laya.timer.delta / 1e3), !1)
                    };
                    Laya.timer.loop(1, this, o), c.Ins.play_Sound("win2"), Laya.timer.once(2e3, this, function() {
                        Laya.timer.clear(this, o), u.iswin = !0, Laya.SoundManager.stopAll(), c.Ins.play_Sound("win"), Laya.timer.once(3e3, this, function() {
                            u.chenggongview.view.visible = !0, u.chenggongview.init_Is_Data()
                        }), u.gameview.view.visible = !1, u.gameplayer.transform.rotationEuler = new Laya.Vector3(u.gameplayer.transform.rotationEuler.x, u.gameplayer.transform.rotationEuler.y + 180, u.gameplayer.transform.rotationEuler.z), u.gameplayer.getComponent(Laya.Animator).crossFade("stop idle01", .5)
                    })
                }
            var n = u.GameStorage_Ins().bae3(u.startselectpos, u.mouseselectstartpos, u.mouseselectendpos, u.endselectpos, t);
            u.gameball.transform.position = new Laya.Vector3(n.x, u.gameball.transform.position.y, n.z)
        }
        onUpdate() {
            u.ballismove && (this.owner.getChildByName("FX_ball").particleSystem.isEmitting || this.owner.getChildByName("FX_ball").particleSystem.play(), this.movetime += Laya.timer.delta / 1e3, this.movepos(this.movetime)), this.isturn && this.turntime < 1 && (this.turntime += Laya.timer.delta / 1e3 * 2, this.owner.transform.position = u.GameStorage_Ins().bae2(this.turnp1, this.turnp2, this.turnp3, this.turntime), this.turntime >= 1 && (this.isturn = !1, u.gameplayer.getComponent(h).run(), this.owner.getChildByName("FX_ball").particleSystem.isEmitting && this.owner.getChildByName("FX_ball").particleSystem.stop()))
        }
        onDestroy() {
            Laya.timer.clearAll(this)
        }
        onCollisionEnter(t) {
            if (0 != u.inplaygame)
                if (t.owner.parent.name.indexOf("AI") > -1) {
                    this.owner.getComponent(l).linearFactor = new Laya.Vector3(1, 0, 1), u.ballismove = !1, u.inplaygame = !1, u.canmouse = !1, this.owner.getChildByName("FX_ball").particleSystem.isEmitting && this.owner.getChildByName("FX_ball").particleSystem.stop(), u.gameplayer.getComponent(h).stop(), Laya.timer.scale = 1, u.gameposobjlist.removeChildren();
                    for (var e = 0; e < u.AIlist.numChildren; e++)
                        for (var i = 0; i < u.AIlist.getChildAt(e).numChildren; i++) {
                            var a = "stop idle0" + (Math.floor(3 * Math.random()) + 1);
                            u.AIlist.getChildAt(e).getChildAt(i) == t.owner.parent ? (u.AIlist.getChildAt(e).getChildAt(i).getComponent(Laya.Animator).crossFade("dangqiu", .5), u.blockAI = u.AIlist.getChildAt(e).getChildAt(i), Laya.timer.once(1e3, this, function() {
                                u.blockAI && u.blockAI.getComponent(Laya.Animator).crossFade(a, .5)
                            })) : u.AIlist.getChildAt(e).getChildAt(i).getComponent(Laya.Animator).crossFade(a, .5)
                        }
                    u.gameplayer.getComponent(Laya.Animator).play("jinqiudaiqi"), window.wx && u.GameStorage_Ins().get_isopenshock() && window.wx.vibrateLong(), this.movetime = 0, u.gameview.view.visible = !1, Laya.SoundManager.stopAll(), u.GameStorage_Ins().set_lose(u.GameStorage_Ins().get_lose() + 1), u.GameStorage_Ins().get_lose() >= 3 && (u.GameStorage_Ins().set_lose(0), u.GameStorage_Ins().set_win(0), u.GameStorage_Ins().set_gameid(0)), c.Ins.play_Sound("lose"), Laya.timer.once(2e3, this, function() {
                        u.shibaiview.view.visible = !0, u.shibaiview.init_Is_Data()
                    })
                } else if (t.owner.parent.name.indexOf("player") > -1) {
                if (u.gameplayer.name == t.owner.parent.name) return;
                c.Ins.play_Sound("jie"), u.gameplayer = t.owner.parent, u.gameplayer.getComponent(Laya.Animator).play("turn"), this.owner.getComponent(l).linearFactor = new Laya.Vector3(0, 0, 0), this.owner.transform.position = new Laya.Vector3(u.gameplayer.transform.position.x, this.owner.transform.position.y, u.gameplayer.transform.position.z - 1), this.turnp1 = new Laya.Vector3(u.gameplayer.transform.position.x, this.owner.transform.position.y, u.gameplayer.transform.position.z - 1), this.turnp2 = new Laya.Vector3(u.gameplayer.transform.position.x - 1, this.owner.transform.position.y, u.gameplayer.transform.position.z), this.turnp3 = new Laya.Vector3(u.gameplayer.transform.position.x, this.owner.transform.position.y, u.gameplayer.transform.position.z + 1), this.turntime = 0, this.isturn = !0, window.wx && u.GameStorage_Ins().get_isopenshock() && window.wx.vibrateLong()
            }
        }
        onTriggerEnter() {}
        onTriggerExit() {}
    }
    class u {
        constructor() {
            this.useData_tzq_Key = "PerfectRide_key"
        }
        static GameStorage_Ins() {
            return null == u.Ins && (u.Ins = new u), u.Ins
        }
        CameraInit() {
            u.gamecamera.addComponent(d), u.gamecamera.addComponent(e), u.gamecamera.getComponent(e).init()
        }
        LoadScene() {
            u.Middlelist.removeChildren();
            for (var t = 0; t < u.AIlist.numChildren; t++) {
                for (; u.AIlist.getChildAt(t).numChildren > 0;) u.AIlist.getChildAt(t).getChildAt(0).destroy();
                u.AIlist.getChildAt(t).removeChildren()
            }
            for (u.AIlist.removeChildren(); u.Playerlist.numChildren > 0;) u.Playerlist.getChildAt(0).destroy();
            u.Playerlist.removeChildren(), Laya.timer.scale = 1, Laya.lateTimer.scale = 1, u.middleselectindex = 0, u.gameAIactivegroup = 0, u.ballismove = !1, u.blockAI = null, u.inplaygame = !1, u.canmouse = !1, u.iswin = !1, u.gameball.getChildByName("FX_ball").particleSystem.stop(), u.gameball.getChildByName("Fx_FireGoal").particleSystem.stop();
            var i = u.Startobj.clone();
            u.Middlelist.addChild(i), i.transform.position = new Laya.Vector3(0, 0, -32);
            var a = Math.floor(2 * Math.random()) + 3 + u.GameStorage_Ins().get_gameid() % 4;
            for (t = 0; t < a; t++) {
                Math.floor(2 * Math.random());
                0;
                var s = u.Middleobjs[0].clone();
                u.Middlelist.addChild(s), s.transform.position = new Laya.Vector3(0, 0, 32 * t), s.name = "Middle" + (t + 1)
            }
            var o = u.Endobj.clone();
            u.Middlelist.addChild(o), o.transform.position = new Laya.Vector3(0, 0, 32 * a), g.CreateAI_Ins().createteam(), g.CreateAI_Ins().createplays(), this.getmiddlelistpos(), u.gameball.getComponent(y) && u.gameball.getComponent(y).init(), u.gamecamera.getComponent(e) && u.gamecamera.getComponent(e).init()
        }
        getmiddlelistpos() {
            u.middlelistpos = [];
            for (var t = 0; t < u.Middlelist.numChildren - 1; t++) t == u.Middlelist.numChildren - 2 ? u.middlelistpos.push(u.Middlelist.getChildByName("End").transform.position.clone()) : u.middlelistpos.push(u.Playerlist.getChildAt(t).transform.position.clone())
        }
        bae1(t, e, i) {
            var a = t.x * (1 - i) + e.x * i,
                s = t.y * (1 - i) + e.y * i,
                o = t.z * (1 - i) + e.z * i;
            return new Laya.Vector3(a, s, o)
        }
        bae2(t, e, i, a) {
            var s = t.x * Math.pow(1 - a, 2) + 2 * e.x * a * (1 - a) + i.x * Math.pow(a, 2),
                o = t.y * Math.pow(1 - a, 2) + 2 * e.y * a * (1 - a) + i.y * Math.pow(a, 2),
                n = t.z * Math.pow(1 - a, 2) + 2 * e.z * a * (1 - a) + i.z * Math.pow(a, 2);
            return new Laya.Vector3(s, o, n)
        }
        bae3(t, e, i, a, s) {
            var o = t.x * Math.pow(1 - s, 3) + 3 * e.x * Math.pow(1 - s, 2) * s + 3 * i.x * Math.pow(s, 2) * (1 - s) + a.x * Math.pow(s, 3),
                n = t.y * Math.pow(1 - s, 3) + 3 * e.y * Math.pow(1 - s, 2) * s + 3 * i.y * Math.pow(s, 2) * (1 - s) + a.y * Math.pow(s, 3),
                r = t.z * Math.pow(1 - s, 3) + 3 * e.z * Math.pow(1 - s, 2) * s + 3 * i.z * Math.pow(s, 2) * (1 - s) + a.z * Math.pow(s, 3);
            return new Laya.Vector3(o, n, r)
        }
        bae2list(t, e, i, a, s) {
            for (var o = [], n = 1; n <= a; n++) {
                var r = (n + s) / a;
                r > 1 && (r = 1);
                var l = this.bae2(t, e, i, r);
                o.push(l)
            }
            return o
        }
        bae3list(t, e, i, a, s, o) {
            for (var n = [], r = 1; r <= s; r++) {
                var l = (r + o) / s;
                l > 1 && (l = 1);
                var h = this.bae3(t, e, i, a, l);
                n.push(h)
            }
            return n
        }
        initdata() {
            this.User_tzq_Data = {
                gameid: 0,
                gold: 0,
                skinlist: [1],
                skinplay: 1,
                isopensound: !0,
                isopenshock: !0,
                win: 0,
                lose: 0
            }, this.get_Storage()
        }
        get_Storage() {
            var t = Laya.LocalStorage.getItem(this.useData_tzq_Key),
                e = null;
            if (t && (e = JSON.parse(t)), null != e)
                for (var i in e)
                    for (var a in this.User_tzq_Data) i == a && (this.User_tzq_Data[a] = e[i])
        }
        init_xtc_UserData() {
            this.User_tzq_Data.gameid || (this.User_tzq_Data.gameid = 1), this.set_Storage()
        }
        set_Storage() {
            this.User_tzq_Data && Laya.LocalStorage.setItem(this.useData_tzq_Key, JSON.stringify(this.User_tzq_Data))
        }
        get_gameid() {
            return this.User_tzq_Data.gameid
        }
        set_gameid(t) {
            this.User_tzq_Data.gameid = t, this.set_Storage()
        }
        get_win() {
            return this.User_tzq_Data.win
        }
        set_win(t) {
            this.User_tzq_Data.win = t, this.set_Storage()
        }
        get_lose() {
            return this.User_tzq_Data.lose
        }
        set_lose(t) {
            this.User_tzq_Data.lose = t, this.set_Storage()
        }
        get_gold() {
            return this.User_tzq_Data.gold
        }
        set_gold(t) {
            this.User_tzq_Data.gold += t, this.set_Storage()
        }
        get_skinlist() {
            return this.User_tzq_Data.skinlist
        }
        set_skinlist(t) {
            -1 == this.User_tzq_Data.skinlist.indexOf(t) && (this.User_tzq_Data.skinlist.push(t), this.set_Storage())
        }
        get_skinplay() {
            return this.User_tzq_Data.skinplay
        }
        set_skinplay(t) {
            this.User_tzq_Data.skinplay = t, this.set_Storage()
        }
        get_isopenshock() {
            return this.User_tzq_Data.isopenshock
        }
        set_isopenshock(t) {
            this.User_tzq_Data.isopenshock = t, this.set_Storage()
        }
        get_isopensound() {
            return this.User_tzq_Data.isopensound
        }
        set_isopensound(t) {
            this.User_tzq_Data.isopensound = t, this.set_Storage()
        }
    }
    u.gameposlist = [], u.ballismove = !1;
    class w extends Laya.Sprite {
        constructor(t) {
            super(), this.view = t, this.init_Is_UI(), this.init_Is_Event(), this.init_Is_Data()
        }
        init_Is_UI() {
            c.Ins.play_Sound("bg", 0), this.playbtn = this.view.getChild("n102").asButton, this.shopbtn = this.view.getChild("btnSkin").asButton, this.moreGame = this.view.getChild("n12"), this.goldtxt = this.view.getChild("textCoin").asTextInput
        }
        init_Is_Data() {
            this.goldtxt.text = u.GameStorage_Ins().get_gold().toString()
        }
        init_Is_Event() {
            this.playbtn.onClick(this, this.Gameplay), this.shopbtn.onClick(this, this.shop_btn_click), this.moreGame.onClick(this, this.onMoreGameBtn)
        }
        Gameplay() {
            u.inplaygame = !0, u.canmouse = !0, u.mainview.view.visible = !1, u.gameview.view.visible = !0, u.gameview.init_Is_Data()
        }
        shop_btn_click() {
            c.Ins.play_Sound("btn"), u.mainview.view.visible = !1, u.shopview.view.visible = !0, u.shopview.init_Is_Data()
        }
        set_btn_click() {
            c.Ins.play_Sound("btn"), u.setview.view.visible = !0
        }
        onMoreGameBtn() {
            window.adsMgr && window.adsMgr.showMoreGame()
        }
    }
    class L {
        static show(t, e = NaN, i = NaN) {
            if (!L.tipsView) {
                var a = fgui.UIPackage.createObjectFromURL(L.URL);
                a && (L.tipsView = a, L.tipsView.touchable = !1, L.tipsView.displayObject.zOrder = 99999)
            }
            L.tipsView && (L.tipsView.getChild("title").text = t, fgui.GRoot.inst.addChild(L.tipsView), L.tipsView.center(), isNaN(i) || (L.tipsView.y = i), isNaN(e) || (L.tipsView.x = e), L.tipsView.getTransition("show").stop(), L.tipsView.getTransition("show").play(Laya.Handler.create(this, () => {
                L.tipsView.removeFromParent()
            })), console.log("tip: " + t), Laya.timer.once(2e3, fgui.GRoot.inst, fgui.GRoot.inst.removeChild, [L.tipsView]))
        }
    }
    L.URL = "ui://s3tw0s73jpiga46";
    class f extends Laya.Sprite {
        constructor(t) {
            super(), this.view = t, this.init_Is_UI(), this.init_Is_Event()
        }
        init_Is_UI() {
            this.btnBack = this.view.getChild("btnBack").asButton, this.obtaingoldbtn = this.view.getChild("n45").asButton, this.goldtxt = this.view.getChild("textCoin").asTextInput, this.skinlist = this.view.getChild("list").asList, this.lunziimg = this.view.getChild("n55").asImage
        }
        init_Is_Data() {
            this.goldtxt.text = u.GameStorage_Ins().get_gold().toString(), this.skin_item()
        }
        init_Is_Event() {
            this.btnBack.onClick(this, this.back_btn_click), this.obtaingoldbtn.onClick(this, this.obtaingold_btn_click)
        }
        skin_item() {
            for (var t = u.GameStorage_Ins().get_skinlist(), e = u.GameStorage_Ins().get_skinplay(), i = 0; i < this.skinlist.numChildren; i++) this.skinlist.getChildAt(i).skinid = i + 1, t.indexOf(i + 1) > -1 ? this.skinlist.getChildAt(i).controllers[0].selectedIndex = e == i + 1 ? 2 : 1 : this.skinlist.getChildAt(i).controllers[0].selectedIndex = 0, this.skinlist.getChildAt(i).getChild("icon").asImage.url = "img/" + (i + 1) + ".png", this.skinlist.getChildAt(i).asButton.onClick(this, this.skin_item_click, [i + 1]), this.skinlist.getChildAt(i).getChild("n7").text = (200 * Math.pow(2, i + 1)).toString();
            this.lunziimg.url = "img/" + e + ".png"
        }
        skin_item_click(t, e) {
            if (c.Ins.play_Sound("btn"), -1 != u.GameStorage_Ins().get_skinlist().indexOf(t)) {
                for (u.GameStorage_Ins().set_skinplay(t), u.gamerole = u.gamescene3d.getChildByName("Player" + t); u.Playerlist.numChildren > 0;) u.Playerlist.getChildAt(0).destroy();
                u.Playerlist.removeChildren(), g.CreateAI_Ins().createplays(), u.GameStorage_Ins().getmiddlelistpos(), this.skin_item()
            } else {
                var i = parseInt(this.skinlist.getChildAt(t - 1).getChild("n7").asTextInput.text);
                this.buy_btn_click(i, t), this.init_Is_Data()
            }
            console.log("fffff")
        }
        buy_btn_click(t, e) {
            c.Ins.play_Sound("btn");
            for (var i = [], a = u.GameStorage_Ins().get_skinlist(), s = 0; s < this.skinlist.numChildren; s++) a.indexOf(s + 1) <= -1 && i.push(s + 1);
            if (console.log(a), console.log(i), i.length <= 0) L.show("You Owned.");
            else {
                var o = t;
                u.GameStorage_Ins().get_gold() < o ? L.show("Need Coins.") : (u.GameStorage_Ins().set_skinlist(e), u.GameStorage_Ins().set_gold(-o), this.init_Is_Data())
            }

        }
        back_btn_click() {
            c.Ins.play_Sound("btn"), u.shopview.view.visible = !1, u.mainview.view.visible = !0, u.mainview.init_Is_Data(), console.log("continue...")
            console.log("fffffddd")
        }
        obtaingold_btn_click() {
            c.Ins.play_Sound("btn");
            var t = this;
            window.adsMgr && window.adsMgr.showVideoAd(function() {
                u.GameStorage_Ins().set_gold(300), t.init_Is_Data(), c.Ins.play_Sound("bg", 0)
            }, function() {
                c.Ins.play_Sound("bg", 0), console.log("视频未播放完整")
            })
            console.log("rrrrr")
            if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
                sdk.showBanner();
            }
        }
    }
    class S extends Laya.Sprite {
        constructor(t) {
            super(), this.view = t, this.init_Is_UI(), this.init_Is_Event()
        }
        init_Is_UI() {
            this.backbtn = this.view.getChild("n73").asButton, this.fuhuobtn = this.view.getChild("n72").asButton, this.goldtxt = this.view.getChild("textCoin").asTextInput
        }
        init_Is_Data() {
            this.goldtxt.text = u.GameStorage_Ins().get_gold().toString()
        }
        init_Is_Event() {
            this.backbtn.onClick(this, this.back_btn_click), this.fuhuobtn.onClick(this, this.fuhuo_btn_click)
        }
        back_btn_click() {
            c.Ins.play_Sound("btn"), u.GameStorage_Ins().LoadScene(), u.shibaiview.view.visible = !1, u.mainview.view.visible = !0, u.mainview.init_Is_Data(), c.Ins.play_Sound("bg", 0)
        }
        fuhuo_btn_click() {
            c.Ins.play_Sound("btn");
            var t = this;
            window.adsMgr && window.adsMgr.showVideoAd(function() {
                u.GameStorage_Ins().set_lose(0), t.back_btn_click()
            }, function() {
                console.log("视频未播放完整")
            })
            console.log("flj")
            if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
                sdk.showBanner();
            }
        }
    }
    class C extends Laya.Sprite {
        constructor(t) {
            super(), this.view = t, this.init_Is_UI(), this.init_Is_Event()
        }
        init_Is_UI() {
            this.backbtn = this.view.getChild("n65").asButton, this.doublebtn = this.view.getChild("n63").asButton, this.cointxt = this.view.getChild("coin").asTextInput, this.goldtxt = this.view.getChild("textCoin").asTextInput
        }
        init_Is_Data() {
            this.doublebtn.enabled = !0, this._coinsNum = Math.floor(50 * Math.random()) + 20, this.cointxt.text = this._coinsNum, this.goldtxt.text = u.GameStorage_Ins().get_gold().toString()
        }
        init_Is_Event() {
            this.backbtn.onClick(this, this.back_btn_click), this.doublebtn.onClick(this, this.double_btn_click)
        }
        back_btn_click() {
            c.Ins.play_Sound("btn"), u.GameStorage_Ins().LoadScene(), u.GameStorage_Ins().set_gold(this._coinsNum), u.chenggongview.view.visible = !1, u.mainview.view.visible = !0, c.Ins.play_Sound("bg", 0), u.mainview.init_Is_Data()
        }
        double_btn_click() {
            c.Ins.play_Sound("btn");
            window.adsMgr && window.adsMgr.showVideoAd(function() {
                u.GameStorage_Ins().LoadScene(), u.GameStorage_Ins().set_gold(300), u.chenggongview.view.visible = !1, u.mainview.view.visible = !0, u.mainview.init_Is_Data()
            }, function() {
                console.log("视频未播放完整")
            })

            if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
                sdk.showBanner();
            }
        }
    }
    class v extends Laya.Sprite {
        constructor(t) {
            super(), this.view = t, this.init_Is_UI(), this.init_Is_Event(), this.init_Is_Data()
        }
        init_Is_UI() {
            this.goldtxt = this.view.getChild("textCoin").asTextInput, this.wintxt = this.view.getChild("n62").asTextInput, this.losetxt = this.view.getChild("n61").asTextInput
        }
        init_Is_Data() {
            this.goldtxt.text = u.GameStorage_Ins().get_gold().toString(), this.wintxt.text = u.GameStorage_Ins().get_win().toString(), this.losetxt.text = u.GameStorage_Ins().get_lose().toString()
        }
        init_Is_Event() {}
    }
    class b {
        constructor() {
            Laya.loader.load([{
                url: "res/fgui/ui_race.txt",
                type: Laya.Loader.BUFFER
            }, {
                url: "res/fgui/ui_race_atlas0.png",
                type: Laya.Loader.IMAGE
            }], Laya.Handler.create(this, function(t) {
                Laya.stage.addChild(fgui.GRoot.inst.displayObject), fgui.UIPackage.addPackage("res/fgui/ui_race"), u.GameStorage_Ins().initdata(), c.Ins.init();
                var e = fgui.UIPackage.createObject("ui_race", "loading").asCom;
                e.visible = !0, e.scaleX = 1, e.scaleY = 1, fgui.GRoot.inst.addChildAt(e, 0);
                var i = fgui.UIPackage.createObject("ui_race", "main").asCom;
                i.visible = !1;
                var a = new w(i);
                u.mainview = a, i.scaleX = 1, i.scaleY = 1, fgui.GRoot.inst.addChildAt(i, 0);
                var s = fgui.UIPackage.createObject("ui_race", "shop").asCom;
                s.visible = !1;
                var o = new f(s);
                u.shopview = o, s.scaleX = 1, s.scaleY = 1, fgui.GRoot.inst.addChildAt(s, 2);
                var n = fgui.UIPackage.createObject("ui_race", "shibai").asCom;
                n.visible = !1;
                var r = new S(n);
                u.shibaiview = r, n.scaleX = 1, n.scaleY = 1, fgui.GRoot.inst.addChildAt(n, 3);
                var h = fgui.UIPackage.createObject("ui_race", "chenggong").asCom;
                h.visible = !1;
                var d = new C(h);
                u.chenggongview = d, h.scaleX = 1, h.scaleY = 1, fgui.GRoot.inst.addChildAt(h, 4);
                var m = fgui.UIPackage.createObject("ui_race", "mai2").asCom;
                m.visible = !1;
                var p = new v(m);
                u.gameview = p, m.scaleX = 1, m.scaleY = 1, fgui.GRoot.inst.addChildAt(m, 0), Laya.loader.create("subpack/LayaScene_new_game/Conventional/new_game.ls", Laya.Handler.create(this, function(t) {
                    var a = t;
                    Laya.stage.addChild(a), Laya.stage.setChildIndex(a, 0), u.gamescene3d = a, u.gameposobjlist = a.getChildByName("poslist"), u.gameball = a.getChildByName("ball_new"), u.gameball.getComponent(l).collisionGroup = 1, u.gameball.getComponent(l).canCollideWith = 2, u.gamecamera = a.getChildByName("GameCamera"), u.AIlist = a.getChildByName("AIlist"), u.Playerlist = a.getChildByName("Playerlist"), u.gamerole = a.getChildByName("Player" + u.GameStorage_Ins().get_skinplay()), u.Startobj = u.gamescene3d.getChildByName("Start"), u.Endobj = u.gamescene3d.getChildByName("End"), u.FX_win = u.gamescene3d.getChildByName("FX_win"), u.Middleobjs = [];
                    for (var s = 1; s < 4; s++) u.Middleobjs.push(u.gamescene3d.getChildByName("Middle" + s));
                    u.Middlelist = u.gamescene3d.getChildByName("Middlelist"), u.GameStorage_Ins().LoadScene(), u.gameball.addComponent(y).init(), u.GameStorage_Ins().CameraInit(), e.visible = !1, i.visible = !0
                }))
            }))
        }
    }
    class I {
        constructor(t, e = 0) {
            this._gravity = new Laya.Vector3(0, -10, 0), this._physicsUpdateList = new Laya.PhysicsUpdateList, this._characters = [], this._updatedRigidbodies = 0, this.maxSubSteps = 1, this.fixedTimeStep = 1 / 60, this.maxSubSteps = t.maxSubSteps, this.fixedTimeStep = t.fixedTimeStep, this.createCannonWorld()
        }
        static __init__() {}
        static createConstraint() {}
        get continuousCollisionDetection() {
            return !1
        }
        set continuousCollisionDetection(t) {}
        get gravity() {
            return this._gravity
        }
        set gravity(t) {
            this._gravity = t, this.world.gravity.set(this._gravity.x, this._gravity.y, this._gravity.z)
        }
        get speculativeContactRestitution() {
            return !1
        }
        set speculativeContactRestitution(t) {}
        createCannonWorld() {
            let t = new CANNON.World;
            t.allowSleep = !1, t.gravity.set(this._gravity.x, this._gravity.y, this._gravity.z), this.world = t
        }
        setAllowSleep(t) {
            this.world && (this.world.allowSleep = t)
        }
        addCannonBody(t) {
            t && this.world.addBody(t)
        }
        _simulate(t) {
            this.world.step(this.fixedTimeStep, t, this.maxSubSteps)
        }
        _destroy() {}
        _addPhysicsCollider(t, e, i) {}
        _removePhysicsCollider(t) {}
        _addRigidBody(t, e, i) {}
        _removeRigidBody(t) {}
        _addCharacter(t, e, i) {}
        _removeCharacter(t) {}
        raycastFromTo(t, e, i = null, a = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, s = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            let o = new CANNON.Vec3(t.x, t.y, t.z),
                r = new CANNON.Vec3(e.x, e.y, e.z),
                l = new CANNON.RaycastResult,
                h = {
                    collisionFilterMask: s,
                    collisionFilterGroup: a,
                    skipBackFaces: !1,
                    checkCollisionResponse: !1
                };
            if (this.world.raycastClosest(o, r, h, l), l.hasHit) {
                if (i) {
                    let t = l.hitPointWorld,
                        e = l.hitNormalWorld;
                    i.point.x = t.x, i.point.y = t.y, i.point.z = t.z, i.normal.x = e.x, i.normal.y = e.y, i.normal.z = e.z, i.succeeded = !0, i.collider = n._physicObjectsMap[l.body.id]
                }
                return !0
            }
            return i && (i.succeeded = !1), !1
        }
        raycastAllFromTo(t, e, i, a = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, s = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            return !1
        }
        rayCast(t, e = null, i = 2147483647, a = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, s = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            var o = t.origin,
                n = I._tempVector30;
            return Laya.Vector3.normalize(t.direction, n), Laya.Vector3.scale(n, i, n), Laya.Vector3.add(o, n, n), this.raycastFromTo(o, n, e, a, s)
        }
        rayCastAll(t, e, i = 2147483647, a = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, s = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER) {
            var o = t.origin,
                n = I._tempVector30;
            return Laya.Vector3.normalize(t.direction, n), Laya.Vector3.scale(n, i, n), Laya.Vector3.add(o, n, n), this.raycastAllFromTo(o, n, e, a, s)
        }
        shapeCast(t, e, i, a = null, s = null, o = null, n = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, r = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, l = 0) {
            return !1
        }
        shapeCastAll(t, e, i, a, s = null, o = null, n = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, r = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER, l = 0) {
            return !1
        }
        addConstraint(t, e = !1) {}
        removeConstraint(t) {}
        _updatePhysicsTransformFromRender() {
            for (var t = this._physicsUpdateList.elements, e = 0, i = this._physicsUpdateList.length; e < i; e++) {
                var a = t[e];
                a._derivePhysicsTransformation(!1), a._inPhysicUpdateListIndex = -1
            }
            this._physicsUpdateList.length = 0
        }
        _updateCharacters() {
            for (var t = 0, e = this._characters.length; t < e; t++) {
                this._characters[t]._updateTransformComponent()
            }
        }
        _updateCollisions() {}
        _eventScripts() {
            this.world.emitTriggeredEvents(), this.world.emitCollisionEvents()
        }
        emitEvent(t, e, i) {
            var a = t.owner,
                s = a._scripts || a._components;
            if (s)
                for (var o = 0, n = s.length; o < n; o++) {
                    var r = s[o][i];
                    r && r.call(s[o], e)
                }
        }
        clearForces() {}
    }
    I._tempVector30 = new Laya.Vector3, I.disableSimulation = !1;
    class A extends Laya.Scene3D {
        constructor() {
            super(), this._init()
        }
        _init() {
            this.cannonSimulation = new I(new Laya.PhysicsSettings, 0)
        }
        _update() {
            var t = this.timer.delta / 1e3;
            this._time += t, this._shaderValues.setNumber(Laya.Scene3D.TIME, this._time), this._input._update(), this._clearScript(), this._updateScript(), Laya.Animator._update(this), this._lateUpdateScript();
            var e = this.cannonSimulation;
            e._updatePhysicsTransformFromRender(), n._addUpdateList = !1, e._simulate(t), e._updateCharacters(), n._addUpdateList = !0, e._updateCollisions(), e._eventScripts()
        }
        destroy() {
            this.cannonSimulation && this.cannonSimulation._destroy()
        }
    }
    class T {
        static registCannon() {
            Laya.ClassUtils.regClass("PhysicsCollider", _), Laya.ClassUtils.regClass("Rigidbody3D", l), T.registCannonScene3d()
        }
        static registCannonScene3d() {
            let t = Laya.Scene3DUtils;
            t._createSprite3DInstance = function(e, i, a) {
                var s;
                switch (e.type) {
                    case "Scene3D":
                        s = new A;
                        break;
                    case "Sprite3D":
                        s = new Laya.Sprite3D;
                        break;
                    case "MeshSprite3D":
                        s = new Laya.MeshSprite3D, a && e.props.isStatic && a.push(s);
                        break;
                    case "SkinnedMeshSprite3D":
                        s = new Laya.SkinnedMeshSprite3D;
                        break;
                    case "ShuriKenParticle3D":
                        s = new Laya.ShuriKenParticle3D;
                        break;
                    case "Camera":
                        s = new Laya.Camera;
                        break;
                    case "DirectionLight":
                        s = new Laya.DirectionLight;
                        break;
                    case "PointLight":
                        s = new Laya.PointLight;
                        break;
                    case "SpotLight":
                        s = new Laya.SpotLight;
                        break;
                    case "TrailSprite3D":
                        s = new Laya.TrailSprite3D;
                        break;
                    default:
                        throw new Error("Utils3D:unidentified class type in (.lh) file.")
                }
                var o = e.child;
                if (o)
                    for (var n = 0, r = o.length; n < r; n++) {
                        var l = t._createSprite3DInstance(o[n], i, a);
                        s.addChild(l)
                    }
                return i[e.instanceID] = s, s
            }, t._createNodeByJson = function(e, i) {
                var a;
                switch (e.type) {
                    case "Scene3D":
                        a = new A;
                        break;
                    case "Sprite3D":
                        a = new Laya.Sprite3D;
                        break;
                    case "MeshSprite3D":
                        a = new Laya.MeshSprite3D, i && e.props.isStatic && i.push(a);
                        break;
                    case "SkinnedMeshSprite3D":
                        a = new Laya.SkinnedMeshSprite3D;
                        break;
                    case "ShuriKenParticle3D":
                        a = new Laya.ShuriKenParticle3D;
                        break;
                    case "Camera":
                        a = new Laya.Camera;
                        break;
                    case "DirectionLight":
                        a = new Laya.DirectionLight;
                        break;
                    case "PointLight":
                        a = new Laya.PointLight;
                        break;
                    case "SpotLight":
                        a = new Laya.SpotLight;
                        break;
                    case "TrailSprite3D":
                        a = new Laya.TrailSprite3D;
                        break;
                    default:
                        throw new Error("Utils3D:unidentified class type in (.lh) file.")
                }
                var s = e.child;
                if (s)
                    for (var o = 0, n = s.length; o < n; o++) {
                        var r = t._createNodeByJson(s[o], i);
                        a.addChild(r)
                    }
                var l = e.components;
                if (l)
                    for (var h = 0, c = l.length; h < c; h++) {
                        var d = l[h],
                            m = Laya.ClassUtils.getRegClass(d.type);
                        if (m) a.addComponent(m)._parse(d);
                        else console.warn("Unkown component type.")
                    }
                return a._parse(e.props, null), a
            }
        }
    }
    new class {
        constructor() {
            window.Laya3D ? Laya3D.init(t.width, t.height) : Laya.init(t.width, t.height, Laya.WebGL), Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(), Laya.stage.scaleMode = t.scaleMode, Laya.stage.screenMode = t.screenMode, Laya.stage.alignV = t.alignV, Laya.stage.alignH = t.alignH, Laya.URL.exportSceneToJson = t.exportSceneToJson, (t.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(), t.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(), t.stat && Laya.Stat.show(), Laya.alertGlobalError = !0, Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION), T.registCannon(), this.init4399Ad()
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded))
        }
        onConfigLoaded() {
            new b
        }
        init4399Ad() {
            window.adsMgr = {
                showVideoAd(t, e) {

                    Laya.SoundManager.setMusicVolume(0), Laya.SoundManager.setSoundVolume(0)


                    t && t(), e = t = null


                },
                showInsertAd() {},
                showBanner() {},
                hideBanner() {},
                showMoreGame() {
                    //window.h5api.showRecommend()
                }
            }
            console.log("init")
            if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
                sdk.showBanner();
            }
        }
    }
}();