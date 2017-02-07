 function requestHistoryData(callhistorydata) {
                var cleartimeout;
                var url = "https://ratesjson2.fxcm.com/DataDisplayer";
                   $.ajax({
                        cache: false,
                        crossDomain: true,
                        dataType: "jsonp",
                        jsonp: "callback",
                        type: "GET",
                        url: url,
                        success: function (jsonObj) {
                            timeout = setTimeout(function() {requestHistoryData(callhistorydata)}, 2000);
                            callhistorydata(jsonObj);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            clearTimeout(cleartimeout);
                            console.log(XMLHttpRequest + ":errorThrown=" + errorThrown + ":textStatus = " + textStatus + ": url = " + url);
                        }
                    });
    };

    updateHistoryData = function (objJson) {
                $.each(objJson.Rates, function (index, data) {
                               var symbol = data.Symbol;
                               var bid = data.Bid;
                               var ask = data.Ask;
                               //var volume = getPrice(symbol);
                               var spread = data.Spread;
                               var lastclose = data.LastClose;
                               var lasthigh = data.CurrentHigh;
                               var lastlow = data.CurrentLow;
                               var pricechange = data.PriceChange;
                               var percentchange = data.PercentChange;
                               var ftweekhigh = data["52WeekHigh"];
                               var ftweeklow = data["52WeekLow"];
                               var pricebar = Math.abs((((ask-lastlow)/(lasthigh-lastlow)).toFixed(2))*100);
                               var ftpricebar = Math.abs((((ask-ftweeklow)/(ftweekhigh-ftweeklow)).toFixed(2))*100);
                               //console.log(changePrice);
                               var currentAsk = $('#'+symbol+'-ask').html();
                               var difAsk = currentAsk - ask;

                               if (difAsk > 0 ) {
                                    $('.price-bar-realtime').css("color", "#ff4866");
                               }
                               if (difAsk < 0 ) {
                                    $('.price-bar-realtime').css("color", "#32a6e7");
                               }
                               if (difAsk == 0 ) {
                                    $('.price-bar-realtime').css("color", "#4b5566");
                               }
                               //$('#'+symbol+'-bid').html('$'+bid);
                               $('#'+symbol+'-ask').html(ask);
                               //$('#'+symbol+'-volume').html(volume);
                               //$('#'+symbol+'-spread').html('Spread:'+spread);
                               $('#'+symbol+'-lastclose').html('$'+lastclose);
                               $('#'+symbol+'-lasthigh').html('$'+lasthigh);
                               $('#'+symbol+'-lastlow').html('$'+lastlow);

                               if (pricechange >= 0) {
                                    $('#'+symbol+'-pricechange').html('+'+pricechange).addClass('bullish-color');
                               } else {
                                    $('#'+symbol+'-pricechange').html(pricechange).addClass('bearish-color');
                               }

                               //$('#'+symbol+'-percentchange').html(percentchange+'%');
                               $('#'+symbol+'-ftweekhigh').html('$'+ftweekhigh);
                               $('#'+symbol+'-ftweeklow').html('$'+ftweeklow);
                               $('#'+symbol+'-pricebar').css('width', pricebar+'%');
                               $('#'+symbol+'-ftpricebar').css('width', ftpricebar+'%');

                            });
    };
    requestHistoryData(updateHistoryData);