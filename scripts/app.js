angular.module('app', [])
	.controller("mainCtrl", [function(){
		var $ctrl = this;
		$ctrl.index = 0;
		$ctrl.data = localStorage.getItem("data")
				? JSON.parse(localStorage.getItem("data"))
				: [];

		$ctrl.comments = $ctrl.data[0] && $ctrl.data[0].comments.length
				? $ctrl.data[0].comments
				: [];

		$ctrl.addItem = function(el){
			$ctrl.data.push({ value:el, comments:[] });
			localStorage.setItem("data", JSON.stringify($ctrl.data));
			$ctrl.itemValue = "";

			if($ctrl.data.length == 1){
				$ctrl.comments = $ctrl.data[0].comments;
			};
		};

		$ctrl.rmItem = function(i){
			$ctrl.data.splice(i, 1);
			localStorage.setItem("data", JSON.stringify($ctrl.data));
		};

		$ctrl.showComments = function(i){
			$ctrl.index = i;
			$ctrl.comments = $ctrl.data[i].comments;
		};

		$ctrl.addComment = function(text){
			$ctrl.data[$ctrl.index].comments.push(text);
			localStorage.setItem("data", JSON.stringify($ctrl.data));
			$ctrl.comment = "";
		};
	}])
	.directive('ngEnter', function() {
		return function(scope, element, attrs) {
			element.bind("keydown", function(e) {
				if(e.which === 13) {
					scope.$apply(function(){
						scope.$eval(attrs.ngEnter, {'e': e});
					});
					e.preventDefault();
				}
			});
		};
	});