


export  async function getArticles() {

const url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=25470e1aac5b44b889cf7bc59276e55a`
   
    let result = await fetch(url).then(response => response.json());
    return result.articles;
  
}

export  async function getTOS() {

    const url =`https://plustic.mokaal.com/api/v1/tos`
       
        let result = await fetch(url).then(response => response.json());
        return result.tos;
      
    }

    // export  async function getMessages() {

    //     const url = MESSAGEURL
           
    //         let result = await fetch(url).then(response => response.json());
    //         return result.messages;
          
    //     }


