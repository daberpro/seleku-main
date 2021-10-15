(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // node_modules/@selekudev/core/core.js
  var Core = class {
    constructor() {
    }
    init() {
    }
    create() {
    }
    destroy() {
    }
    remove() {
    }
  };

  // node_modules/@selekudev/core/utility.js
  function checkBinding(text_node) {
    let allBindingValue = text_node == null ? void 0 : text_node.match(/\{{.*?\}}/igm);
    allBindingValue = [...new Set(allBindingValue)];
    let value = {};
    if (allBindingValue instanceof Array && allBindingValue.length !== 0) {
      for (let x2 of allBindingValue) {
        value = __spreadProps(__spreadValues({}, value), {
          [x2.replace(/\{{/igm, "").replace(/\}}/igm, "")]: x2
        });
      }
      return {
        binding: true,
        value
      };
    }
    return {
      binding: false,
      value
    };
  }
  function createElement(name, inner) {
    var _a;
    !inner.hasOwnProperty("inner") && inner instanceof Object ? inner["inner"] = "" : 0;
    let element = document.createElement(name);
    let _inner = document.createTextNode(inner);
    let copyValue = inner["inner"];
    if (!(inner instanceof Object)) {
      element.appendChild(_inner);
    } else {
      inner["inner"] = (_a = inner["inner"]) == null ? void 0 : _a.replace(/(\n|\t)/igm, " ");
      let bind = checkBinding(inner["inner"]);
      for (let x2 in inner["props"]) {
        if (bind.binding && x2 in bind.value) {
          copyValue = copyValue.replaceAll(bind.value[x2], inner["props"][x2]);
        }
      }
      let evaluation = "";
      for (let y in inner["props"]) {
        try {
          if (inner["props"][y] instanceof Object && typeof inner["props"][y] !== "function")
            evaluation += `let ${y} = ${JSON.stringify(inner["props"][y])};`;
          if (typeof inner["props"][y] === "number")
            evaluation += `let ${y} = ${inner["props"][y]};`;
          if (typeof inner["props"][y] === "string")
            evaluation += `let ${y} = "${inner["props"][y]}";`;
          if (typeof inner["props"][y] === "function")
            evaluation += `let ${y} = ${inner["props"][y]};`.replace(/(\n|\t)/igm, " ");
        } catch (err) {
          console.warn(err.message);
        }
      }
      for (let x in bind.value) {
        if (!(x in inner["props"])) {
          try {
            copyValue = copyValue.replaceAll(bind.value[x], eval(`${evaluation} ${x}`));
          } catch (err) {
            console.warn(err.message);
          }
        }
      }
      _inner = document.createTextNode(copyValue);
      element.appendChild(_inner);
      if (inner.hasOwnProperty("attribute"))
        for (let x2 in inner["attribute"]) {
          let bind2 = checkBinding(inner["attribute"][x2]);
          if (bind2.binding) {
            for (let y in bind2.value)
              if (inner["props"].hasOwnProperty(y)) {
                element.setAttribute(x2, inner["attribute"][x2].replaceAll(bind2.value[y], inner["props"][y]));
              } else {
                console.warn(y + " props not found!!");
                element.setAttribute(x2, void 0);
              }
          } else {
            element.setAttribute(x2, inner["attribute"][x2]);
          }
        }
    }
    let children = inner["children"] || [];
    let content = typeof inner === "string" ? inner : inner["inner"];
    return {
      name,
      _inner,
      element,
      content,
      children,
      attribute: inner["attribute"] || {},
      "@id": (() => {
        try {
          return eval(inner["@id"]) || null;
        } catch (err) {
          return inner["@id"];
        }
      })(),
      type: "ChildComponent",
      props: inner["props"] || {},
      update(callback = () => {
      }) {
        callback();
        let _inner = document.createTextNode(inner);
        if (inner.hasOwnProperty("attribute"))
          for (let x2 in inner["attribute"]) {
            let bind2 = checkBinding(inner["attribute"][x2]);
            if (bind2.binding) {
              for (let y in bind2.value)
                if (inner["props"].hasOwnProperty(y)) {
                  element.setAttribute(x2, inner["attribute"][x2].replaceAll(bind2.value[y], inner["props"][y]));
                } else {
                  console.warn(y + " props not found!!");
                  element.setAttribute(x2, void 0);
                }
            } else {
              element.setAttribute(x2, inner["attribute"][x2]);
            }
          }
        if (inner instanceof Object) {
          inner["inner"] = inner["inner"].replace(/(\n|\t)/igm, " ");
          let bind = checkBinding(inner["inner"]);
          let copyValue = inner["inner"];
          for (let x2 in this.props) {
            if (bind.binding && x2 in bind.value) {
              copyValue = copyValue.replaceAll(bind.value[x2], this.props[x2]);
            }
          }
          let evaluation = "";
          for (let y in this.props) {
            try {
              if (this.props[y] instanceof Object && typeof this.props[y] !== "function")
                evaluation += `let ${y} = ${JSON.stringify(this.props[y])};`;
              if (typeof this.props[y] === "number")
                evaluation += `let ${y} = ${this.props[y]};`;
              if (typeof this.props[y] === "string")
                evaluation += `let ${y} = "${this.props[y]}";`;
              if (typeof this.props[y] === "function")
                evaluation += `let ${y} = ${this.props[y]};`.replace(/(\n|\t)/igm, " ");
            } catch (err) {
              console.warn(err.message);
            }
          }
          for (let x in bind.value) {
            if (!(x in this.props)) {
              try {
                copyValue = copyValue.replaceAll(bind.value[x], eval(`${evaluation} ${x}`));
              } catch (err) {
                console.warn(err.message);
              }
            }
          }
          this._inner.replaceData(0, this._inner.length, copyValue);
        }
      }
    };
  }
  function rootElement(child2, parent) {
    parent.appendChild(child2.element);
    if (child2.children.length > 0) {
      for (let x2 of child2.children)
        rootElement(x2, child2.element);
    }
  }
  function toString(b) {
    let c = Object.keys(b).map((e) => {
      if (b[e] instanceof Array) {
        return `${e}:[${b[e]}]`;
      }
      if (b[e] instanceof Object && typeof b[e] !== "function") {
        return `${e}:${toString(b[e])}`;
      }
      return typeof b[e] === "number" ? `${e}:${b[e]}` : `${e}:"${b[e]}"`;
    });
    let g = "{";
    for (let x2 in c) {
      if (parseInt(x2) === c.length - 1) {
        g += c[x2] + "}";
      } else {
        g += c[x2] + ",";
      }
    }
    if (g === "{")
      return "{}";
    return g;
  }
  function toRawComponent(component, propsForAll = {}) {
    let children2 = [];
    if (component.children.length > 0) {
      for (let x2 of component.children) {
        children2.push(toRawComponent(x2, propsForAll));
      }
    }
    let template = ``;
    if (!component.hasOwnProperty("attribute"))
      component["attribute"] = {};
    if (component.type === "ChildComponent") {
      template = `

			createElement("${component.name}",{
				"@id": "${component["@id"] || null}",
				inner: "${component.content}",
				children: [${children2}],
				attribute: ${toString(component["attribute"])},
				props: ${toString(__spreadValues(__spreadValues({}, component.props), propsForAll))}
			})

		`;
    }
    if (component.type === "conditionComponent") {
      template = `

			conditionalComponent("${component.name}",{
				"@id": "${component["@id"] || null}",
				inner: "${component.content}",
				children: [${children2}],
				attribute: ${toString(component["attribute"])},
				props: ${toString(__spreadValues(__spreadValues({}, component.props), propsForAll))},
				condition: "${component.condition}"
			})

		`;
    }
    if (component.type === "LoopComponent") {
      template = `

			loopComponent("${component.name}",{
				"@id": "${component["@id"] || null}",
				inner: "${component.content}",
				child: ${toRawComponent(component.child)},
				attribute: ${toString(component["attribute"])},
				props: ${toString(__spreadValues(__spreadValues({}, component.props), propsForAll))},
				loop: "${component.loop}"
			})

		`;
    }
    return template;
  }
  function importComponent(child, props) {
    if (props !== void 0 && props !== null)
      child.props = props;
    if (child.props.hasOwnProperty("@id")) {
      child["@id"] = child.props["@id"];
      delete child.props["@id"];
    }
    try {
      return eval(toRawComponent(child, props));
    } catch (err) {
      console.warn(err.message);
    }
  }
  function loopComponent(name, inner) {
    const parentElement = createElement(name, inner);
    let token = inner["loop"].split(" ");
    if (token[2] in inner["props"]) {
      try {
        let allChildren = [];
        for (let x2 of inner["child"]["children"]) {
          allChildren.push(toRawComponent(x2));
        }
        if (inner["child"].type !== "conditionComponent")
          eval(`for(let ${token[0]} ${token[1]} inner["props"]["${token[2]}"]){

				parentElement["children"].push(createElement(inner["child"].name,{
					inner: inner["child"].content,
					props: {
						${token[0]} 
					},
					children: [${allChildren.join()}]
				}));

			}`);
        else
          eval(`for(let ${token[0]} ${token[1]} inner["props"]["${token[2]}"]){

				parentElement["children"].push(conditionalComponent(inner["child"].name,{
					inner: inner["child"].content,
					props: {
						${token[0]} 
					},
					children: [${allChildren.join()}]
				}));

			}`);
      } catch (err) {
        console.warn(err.message);
      }
    }
    return __spreadProps(__spreadValues({}, parentElement), {
      child: inner["child"],
      loop: inner["loop"],
      props: parentElement["props"],
      type: "LoopComponent",
      update(callback = () => {
      }) {
        callback();
        parentElement.update();
        let allElement = [];
        for (let x2 of this.children) {
          x2.element.remove();
        }
        this.children = [];
        if (token[2] in this.props) {
          try {
            let allChildren = [];
            let props = this.child["props"];
            let condition = this.child.condition;
            for (let x2 of this.child["children"]) {
              allChildren.push(toRawComponent(x2));
            }
            if (inner["child"].type !== "conditionComponent")
              eval(`for(let ${token[0]} ${token[1]} inner["props"]["${token[2]}"]){

						this.children.push(createElement(inner["child"].name,{
							inner: inner["child"].content,
							props: {
								...props,
								${token[0]}
							},
							children: [${allChildren.join()}]
						}));

					}`);
            else
              eval(`for(let ${token[0]} ${token[1]} inner["props"]["${token[2]}"]){

						this.children.push(conditionalComponent(inner["child"].name,{
							inner: inner["child"].content,
							props: {
								...props,
								${token[0]}
							},
							condition: "${condition}",
							children: [${allChildren.join()}]
						}));

					}`);
          } catch (err) {
            console.warn(err.message);
          }
        }
        for (let x2 of this.children) {
          rootElement(x2, parentElement.element);
        }
      }
    });
  }
  function desrtoyChild(child2) {
    child2.element.remove();
    if (child2.children.length > 0) {
      for (let x2 of child2.children)
        desrtoyChild(x2);
    }
  }
  function conditionalComponent(name, inner) {
    const parentElement = createElement(name, inner);
    if (eval(inner["props"][inner["condition"]])) {
      for (let x2 of parentElement.children) {
        rootElement(x2, parentElement.element);
      }
    } else {
      for (let x2 of parentElement.children) {
        desrtoyChild(x2);
      }
    }
    return __spreadProps(__spreadValues({}, parentElement), {
      type: "conditionComponent",
      condition: inner["condition"],
      update(callback2 = () => {
      }) {
        callback2();
        parentElement.update();
        if (this.props[this.condition]) {
          for (let x2 of parentElement.children) {
            rootElement(x2, parentElement.element);
          }
        } else {
          for (let x2 of parentElement.children) {
            desrtoyChild(x2);
          }
        }
      }
    });
  }

  // node_modules/@selekudev/core/reactivity.js
  var Reactivity = class {
    constructor(object, fragment = {}) {
      this.object = object;
      this.fragment = fragment;
    }
    create({ eventSetter, eventGetter }) {
      const fragment = this.fragment;
      const obj = this.object;
      return new Proxy(this.object, {
        set(args1, args2, args3, args4, obj2) {
          eventSetter([args1, args2, args3, args4, fragment]);
          return true;
        },
        get(args1, args2, args3, args4) {
          return eventGetter([args1, args2, args3, args4, fragment]);
        }
      });
    }
  };

  // node_modules/@selekudev/core/component.js
  function setProps(child2, props2, value) {
    if (child2.props[props2] !== void 0)
      child2.props[props2] = value;
    updateChild(child2);
    if (child2.children.length > 0)
      for (let x2 of child2.children) {
        setProps(x2, props2, value);
      }
    if (child2.hasOwnProperty("child") && child2.child.children.length > 0)
      for (let x2 of child2.child.children) {
        setProps(x2, props2, value);
      }
  }
  var ComponentClass = {};
  function registerComponentToClassArray(child2) {
    if (child2.hasOwnProperty("@id") && child2["@id"] !== null && ComponentClass.hasOwnProperty(child2["@id"])) {
      ComponentClass[child2["@id"]].push(child2);
    } else if (child2.hasOwnProperty("@id") && child2["@id"] !== null) {
      ComponentClass[child2["@id"]] = [];
      ComponentClass[child2["@id"]].push(child2);
    }
    if (child2.children.length > 0) {
      for (let x2 of child2.children)
        registerComponentToClassArray(x2);
    }
  }
  function getAllContextFrom(component, ctx) {
    ctx = __spreadValues({}, component.props);
    if (component.children.length > 0)
      for (let x2 of component.children) {
        ctx = Object.assign(ctx, getAllContextFrom(x2, ctx));
      }
    return ctx;
  }
  function find(id) {
    let context = {};
    if (id in ComponentClass)
      for (let x2 of ComponentClass[id]) {
        context = __spreadValues(__spreadValues(__spreadValues({}, context), x2.props), getAllContextFrom(x2));
      }
    else {
      console.warn(`@id "${id}" is unknown `);
    }
    return {
      state: new Reactivity(context).create({
        eventSetter(args) {
          if (id in ComponentClass)
            for (let x2 of ComponentClass[id]) {
              setProps(x2, args[1], args[2]);
            }
          else {
            console.warn(`@id "${id}" is unknown `);
          }
        },
        eventGetter(args) {
        }
      })
    };
  }
  function updateChild(child2) {
    child2.update();
    if (child2.children.length > 0)
      for (let x2 of child2.children) {
        updateChild(x2);
      }
  }
  var Component = class extends Core {
    constructor() {
      super();
      this.fragment = {};
      this.context = {};
      this.state = {};
    }
    create(name2, inner2) {
      this.fragment = __spreadProps(__spreadValues(__spreadValues({}, this.fragment), createElement(name2, inner2)), {
        type: "ParentComponent"
      });
      this.context = __spreadValues(__spreadValues({}, this.context), this.fragment.props);
      const fragment = this.fragment;
      this.state = new Reactivity(this.context).create({
        eventSetter(args) {
          if (args[0].hasOwnProperty(args[1])) {
            setProps(fragment, args[1], args[2]);
          } else {
            console.warn("props not found!");
          }
        },
        eventGetter(args) {
          return args[0][args[1]];
        }
      });
      return {
        fragment,
        type: "ParentComponent"
      };
    }
    createChild(name2, inner2, beParent = false) {
      let child2 = createElement(name2, inner2);
      if (beParent)
        this.fragment = __spreadProps(__spreadValues(__spreadValues({}, this.fragment), child2), {
          type: "ChildComponent"
        });
      this.context = __spreadValues(__spreadValues({}, this.context), child2.props);
      const fragment = this.fragment;
      this.state = new Reactivity(this.context).create({
        eventSetter(args) {
          if (args[0].hasOwnProperty(args[1])) {
            setProps(fragment, args[1], args[2]);
          } else {
            console.warn("props not found!");
          }
        },
        eventGetter(args) {
          return args[0][args[1]];
        }
      });
      return __spreadProps(__spreadValues({}, child2), {
        type: "ChildComponent"
      });
    }
    createLoop(name2, inner2) {
      let element2 = loopComponent(name2, inner2, this.rootElement);
      this.context = __spreadValues(__spreadValues({}, this.context), element2.props);
      const fragment = this.fragment;
      this.state = new Reactivity(this.context).create({
        eventSetter(args) {
          if (args[0].hasOwnProperty(args[1])) {
            setProps(fragment, args[1], args[2]);
          } else {
            console.warn("props not found!");
          }
        },
        eventGetter(args) {
          return args[0][args[1]];
        }
      });
      return __spreadProps(__spreadValues({}, element2), {
        type: "LoopComponent"
      });
    }
    importComponent(child2, props2) {
      let importCom = importComponent(child2.fragment, props2);
      this.context = __spreadValues(__spreadValues({}, this.context), child2.context);
      const fragment = this.fragment;
      this.state = new Reactivity(this.context).create({
        eventSetter(args) {
          if (args[0].hasOwnProperty(args[1])) {
            setProps(fragment, args[1], args[2]);
          } else {
            console.warn("props not found!");
          }
        },
        eventGetter(args) {
          return args[0][args[1]];
        }
      });
      return __spreadProps(__spreadValues({}, importCom), {
        type: "ChildComponent"
      });
    }
    createCondition(name2, inner2) {
      let element2 = conditionalComponent(name2, inner2);
      this.context = __spreadValues(__spreadValues({}, this.context), element2.props);
      const fragment = this.fragment;
      this.state = new Reactivity(this.context).create({
        eventSetter(args) {
          if (args[0].hasOwnProperty(args[1])) {
            setProps(fragment, args[1], args[2]);
          } else {
            console.warn("props not found!");
          }
        },
        eventGetter(args) {
          return args[0][args[1]];
        }
      });
      return __spreadProps(__spreadValues({}, element2), {
        type: "conditionComponent"
      });
    }
    rootElement(child2, parent) {
      if (child2.type === "conditionComponent") {
        parent.appendChild(child2.element);
        child2.update();
      } else {
        parent.appendChild(child2.element);
      }
      if (child2.children.length > 0) {
        for (let x2 of child2.children)
          this == null ? void 0 : this.rootElement(x2, child2.element);
      }
    }
    render(target, callback2 = () => {
    }) {
      callback2();
      for (let x2 of this.fragment.children) {
        this.rootElement(x2, this.fragment.element);
      }
      target.appendChild(this.fragment.element);
    }
    destroy(callback2 = () => {
    }) {
      callback2();
      desrtoyChild(this.fragment);
    }
  };

  // lib/card.js
  var card = new Component();
  card.createChild("h1", {
    inner: "hello {{nama}}",
    props: {
      nama: ""
    },
    children: [
      card.createChild("small", {
        inner: " by daber "
      })
    ]
  }, true);

  // lib/math/sum.js
  function sum(a, b) {
    return a + b;
  }

  // src/app.seleku
  var app = new Component();
  app.create("div", {
    inner: "",
    props: {},
    attribute: {
      id: "app"
    },
    children: [
      app.createChild("h1", {
        inner: "hallo {{nama}}",
        props: {
          nama: null
        },
        attribute: {},
        children: [],
        "@id": "h1"
      }),
      app.importComponent(card, {
        nama: null,
        "@id": "kl"
      })
    ],
    "@id": null
  });
  registerComponentToClassArray(app.fragment);
  app.render(document.body);
  find("h1").state.nama = "Seleku ";
  find("kl").state.nama = "daber";
  console.log(sum(90, 70));
})();
