'use strict';

exports.__esModule = true;
exports.ActionType = exports.Monster3DProfile = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enums = require('./utils/enums');

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _GLTFLoader = require('./utils/GLTFLoader');

var _GLTFLoader2 = _interopRequireDefault(_GLTFLoader);

var _OrbitControls = require('./utils/OrbitControls');

var _OrbitControls2 = _interopRequireDefault(_OrbitControls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster3DProfile = function (_Component) {
  _inherits(Monster3DProfile, _Component);

  function Monster3DProfile() {
    var _temp, _this, _ret;

    _classCallCheck(this, Monster3DProfile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.start = function () {
      if (!_this.frameId) {
        _this.frameId = requestAnimationFrame(_this.animate);
      }
    }, _this.stop = function () {
      cancelAnimationFrame(_this.frameId);
    }, _this.animate = function () {
      _this.renderScene();
      _this.frameId = window.requestAnimationFrame(_this.animate);
    }, _this.renderScene = function () {
      _this.renderer.render(_this.scene, _this.camera);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Monster3DProfile.prototype.componentDidMount = function componentDidMount() {
    var width = this.mount.clientWidth;
    var height = this.mount.clientHeight;

    // add scene
    this.scene = new THREE.Scene();

    // add camera
    this.camera = new THREE.PerspectiveCamera(90, width / height, 0.25, 20);
    this.camera.position.set(0, 0, 1.5);

    // setting controls
    var controls = new _OrbitControls2.default(this.camera, this.mount);
    controls.target.set(0, -0.2, -0.2);
    controls.autoRotate = false;
    controls.autoRotateSpeed = -10;
    controls.screenSpacePanning = true;
    controls.update();

    // add renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#322e3a');
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.gammaOutput = true;
    this.mount.appendChild(this.renderer.domElement);

    var light = new THREE.AmbientLight(0xffffff, 1.1);
    light.position.set(0, 1, 0);
    this.scene.add(light);

    // loading monster with GLTF loader
    var loader = new _GLTFLoader2.default();

    loader.load(this.props.path, function (gltf) {
      var monster = gltf.scene.children[0];

      monster.updateMatrixWorld();

      var box = new THREE.Box3().setFromObject(monster);
      var center = box.getCenter(new THREE.Vector3());

      controls.reset();

      monster.position.x += monster.position.x - center.x;
      monster.position.y += monster.position.y - center.y;
      monster.position.z += monster.position.z - center.z;

      this.scene.add(gltf.scene);
    }.bind(this), undefined, function (e) {
      console.error(e);
    });

    this.start();
  };

  Monster3DProfile.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  };

  Monster3DProfile.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement('div', {
      style: { width: '600px', height: '600px' },
      ref: function ref(mount) {
        _this2.mount = mount;
      }
    });
  };

  return Monster3DProfile;
}(_react.Component);

Monster3DProfile.propTypes = process.env.NODE_ENV !== "production" ? {
  typeId: _propTypes2.default.string.isRequired,
  action: _propTypes2.default.oneOf(Object.keys(_enums.ActionType).map(function (key) {
    return _enums.ActionType[key];
  })),
  path: _propTypes2.default.string.isRequired
} : {};

Monster3DProfile.defaultProps = {
  action: _enums.ActionType.SLEEPING
};

exports.Monster3DProfile = Monster3DProfile;
exports.ActionType = _enums.ActionType;