/*
 * @author t@tabalt.net
 */

var apiQueryPetsOnSale = 'https://pet-chain.baidu.com/data/market/queryPetsOnSale';
var apiTxnCreate = 'https://pet-chain.baidu.com/data/txn/create';

function getBaiduDogs(degreeConf,intervalObj) {
    // 等级配置
    //var degreeConf = options.getDegreeConf();
    $.ajax({
        type: 'POST',
        url: apiQueryPetsOnSale,
        contentType: 'application/json',
        data: JSON.stringify({
            "pageNo": 1,
            "pageSize": 20,
            "querySortType": "AMOUNT_ASC",
            "petIds": [],
            "lastAmount": null,
            "lastRareDegree": null,
            "requestId": new Date().getTime(),
            "appId": 1,
            "tpl": ""
        }),
        success: function (res) {
            var petsOnSale = res.data.petsOnSale || [];
            console.clear();
            console.table(res.data.petsOnSale);
            $('.sort span:nth-child(2)').trigger("click");

            $.each(petsOnSale, function (index, item) {
                var degree = degreeConf[item.rareDegree] || { desc: '未知', buyAmount: 5 };
                var buyAmount = degree.buyAmount || 5;
                if (parseFloat(item.amount) <= parseFloat(buyAmount)) {
                    var paddedid = pad_with_zeroes(item.id);
                    $('.dog-wrapper h3 span:nth-child(2)').each(function () {
                        if (paddedid == $(this).html()) {
                            //console.log(paddedid);
                            $(this).trigger("click");
/*                             console.log($(".sms-img img").attr('src'));
                            clearInterval(intervalObj); */
                        }
                        /*                         var catId = $('h3 span:nth-child(2)').html(); */
                        /*                         if (catId == paddedid) {
                                                    console.log(catId);
                                                } */
                    });
                    /*                     $.ajax({
                                            type: 'POST',
                                            url: apiTxnCreate,
                                            contentType: 'application/json',
                                            data: JSON.stringify({
                                                "petId": item.petId,
                                                "requestId": new Date().getTime(),
                                                "amount": item.amount,
                                                "appId": 1,
                                                "tpl": ""
                                            }),
                                            success: function (res2) {
                                                console.log("尝试购买：ID[" + item.id + "],级别[" + item.rareDegree + "],价格[" + item.amount + ']')
                                                console.log("命中策略：等级[" + degree.desc + "],最高价格[" + degree.buyAmount + ']')
                                                if (res2.errorNo == 0) {
                                                    console.log("抢到啦！！！！！")
                                                } else {
                                                    console.log("没抢到：错误码[" + res2.errorNo + '],错误信息[' + res2.errorMsg + ']')
                                                }
                                            }
                                        }); */
                }
            });
        }
    });
}
function pad_with_zeroes(number, length = 8) {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}