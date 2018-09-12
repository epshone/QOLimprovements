class Request {
  constructor(type, data){
    this.type = type;
    this.data = data;
  }

  serialize(){
    return {
      type: this.type,
      data: this.data
    }
  }
}

Request.Type = {
  SET_ENVIRONMENT: 0,
  SET_LOCK: 1,
  KEY_PRESS: 2
}
