import fetch from "node-fetch";

const getRawData = async (URL) => {
   return await fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://time.com";

// start of the program
const getTitleAndLink = async () => {

   return new Promise(async (resolve, reject) => {
      const rawData = await getRawData(URL);

      if (rawData.length) {

         var data = rawData.split('<section class="homepage-module latest"')[1]
            .split('<div class="homepage-module voices">')[0];

         var finalData = [];

         while (data.includes('</a></h2>')) {
            var str = data.substring(data.indexOf('<h2 class="title">') + '<h2 class="title">'.length, data.indexOf('</a></h2>'));

            finalData.push({
               link: 'https://time.com' + str.substring(str.indexOf('<a href=') + '<a href='.length, str.indexOf('/>')),
               title: str.substring(str.indexOf('/>') + '/>'.length)
            });
            data = data.slice(data.indexOf('</a></h2>') + '</a></h2>'.length);
         }
         resolve(finalData);
      }
      else {
         reject("Unable to fetch data");
      }
   });
   // return finalData;
};


// Here your api hits for latest 5 stories

// async function getTimeStories(req, res) {
   getTitleAndLink().then((res) => {
      console.log(JSON.stringify(res));

      // here you will get a list of 5 stories in the format as pr requested 
      // res.JSON(res);
   }).catch((error) => {
      console.log("error - ", error);
   });
// }

