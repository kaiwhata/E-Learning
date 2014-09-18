'use strict';

var questionList = angular.module('questionList', []);

questionList.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
            $scope.$watch($attrs.mathjaxBind, function(texExpression) {
                var texScript = angular.element("<script type='math/tex'>")
                    .html(texExpression ? texExpression :  "");
                $element.html("");
                $element.append(texScript);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
console.log("ggtehrtgregrerwgrfwfwf");
            });
        }]
    };
});
function MyCtrl($scope, $element) {
    $scope.expression = "\\frac{5}{4} \\div \\frac{1}{6}";
}

