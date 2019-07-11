'use strict';
let env = 'dev';

let props = {
  dev: {
    port: 3002,
    mongodb: "mongodb://localhost:27017/pizza_chain",
    rpc: "http://127.0.0.1:8545",
    clienturl: 'http://localhost:3000'
  }
};


let setEnv = environment => {
  if (props[environment]) {
    env = environment;
  }
};

let getProps = () => {
  return props[env];
};

module.exports.setEnv = setEnv;
module.exports.getProps = getProps;