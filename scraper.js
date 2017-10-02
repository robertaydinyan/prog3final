var jsonfile = require('jsonfile')
var file = 'db.json'
const scrapeIt = require("scrape-it");
var pages = 1;
var arr = { articles: [] };
var a;
var number1 = 0;
var number2 = 0;
var p = 0;
var urlNumber = 0

function scraper(pageNumber) {
    url = jobCategories[urlNumber] + "?page=" + pageNumber
    scrapeIt(url, {
        pages: {
            selector: "#wrap > .padtop > .row > .span6"
        },
        articles: {
            listItem: ".job",
            data: {
                title: "li > a",
                url: {
                    selector: "li > a",
                    attr: "href"
                },
                comp: ".comp",
                host: {
                    selector: ".src",
                    convert: function (x) {
                        var y = x.match(/\S+/g) || []
                        return y[0]
                    }
                },
                date: {
                    selector: ".src",
                    convert: function (x) {
                        var y = x.match(/\S+/g) || []
                        var date = y[2] + y[3]
                        return date

                    }
                },
            }
        }
    }, (err, page) => {
        arr.articles.push(...page.articles);
        //qw=page.pages
        console.log("datax " + page.articles.length)
        console.log(url)

        if (page.articles.length == 0) {
            if (urlNumber == jobCategories.length - 1) {
                jsonfile.writeFile(file, arr, { spaces: 2 }, function (err) {
                    console.error(err)
                });
            }
            pageNumber = 1;
            urlNumber++;
        }

        setTimeout(
            function () {
                console.log(pageNumber)
                pageNumber++;
                scraper(pageNumber);
            }, 3000
        );


    });
}

var jobCategories = [
    "http://jobspider.am/category/17/Information_Technologies",
    "http://jobspider.am/category/3/Office",
    "http://jobspider.am/category/11/Security",
    "http://jobspider.am/category/9/Health",
    "http://jobspider.am/category/15/Art_Journalism_Media",
    "http://jobspider.am/category/18/Science_Education",
    "http://jobspider.am/category/2/Advertisement_PR",
    "http://jobspider.am/category/14/Legal_Services_Insurance",
    "http://jobspider.am/category/6/Services",
    "http://jobspider.am/category/4/Accounting_Finance_Banking",
    "http://jobspider.am/category/12/Management_Top_Executive",
    "http://jobspider.am/category/5/Sales",
    "http://jobspider.am/category/10/Travel_Restaurants_Hotels",
    "http://jobspider.am/category/http://jobspider.am/category/1/Other"
];

scraper(pages);