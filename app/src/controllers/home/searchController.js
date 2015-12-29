(function () { 
    function SearchController($q, $log, $http){
      var self = this;
      self.isDisabled    = false;

      self.suggestQuerySearch   = suggestQuerySearch;
      self.selectedItemChange = selectedItemChange;
      self.searchTextChange   = searchTextChange;
      self.youtubeApiKey = "AIzaSyBMtaUJklrz3hy49XTMI1T8CxwWOx4CWR4";
      self.resultValid = false;
      self.resultItems = [];

      function suggestQuerySearch (query) 
      {
        var deferred = $q.defer();
        if(query && query.length>2)
        {
          var url = "http://suggestqueries.google.com/complete/search?q="+query+"&client=firefox&ds=yt&callback=JSON_CALLBACK";
          
          $http.jsonp(url)
            .success(function(data)
            {
              var result = data[1].map(function(item){
                return {value:encodeURIComponent(item), display:item};
              });
              deferred.resolve(result);
            
            }).error(function(err)
            {
              deferred.reject(false);
            });

        }
        return deferred.promise;
      }

      function searchTextChange(text) {
        $log.info('Text changed to ' + text);

      }
      function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
        if(item && item.value){
          var url = 'https://www.googleapis.com/youtube/v3/search?key='+self.youtubeApiKey+'&part=snippet&q='+item.value+'&maxResults=10&order=date';
          $http.get(url)
            .success(function(d){
              if(d.items.length>0){
                self.resultValid = true;
                self.resultItems = d.items;
                $log.log(self.resultItems);
              }
            })
            .error(function(err){
              console.log('err ', err);
              self.resultValid = false;
            });
        }
      }

    } 
    app.controller('SearchController', SearchController);
})();
