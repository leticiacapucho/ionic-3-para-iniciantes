import { Injectable } from '@angular/core';

let config_key_name ="config" //constante

@Injectable() // Essa notação diz que será inserido/via uma injeção de dependencia, ou seja, dentro de outra classe. 
export class ConfigProvider {

  private config = {
    showSlide: false, //objeto de configuração
    name: "",
    username: ""
  }
  
  constructor() {
    
  }
  // Recupera os dados do localstorage
  getConfigData(): any{
    return localStorage.getItem(config_key_name);
  }
  // Grava os dados localstorage
  setConfigData(showSlide?: boolean, name?: string, username?: string){
    let config = {
      showSlide: false,
      name: "",
      username: ""
    };

    if(showSlide){
      config.showSlide = showSlide;
    }

    if(name){
      config.name = name;
    }

    if(username){
      config.username = username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config)); //gravando o config
  }
}
